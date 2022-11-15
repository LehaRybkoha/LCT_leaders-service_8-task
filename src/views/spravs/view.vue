<script setup>
import { ElementTable } from '~/components/elements'
import { createTable } from '~/core/table'
import { getAllUsers } from '~/api/route.users'
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import { useStore } from '~/stores/stores.main'
import { get_token } from '~/api/route.auth'
import { useRoute, useRouter } from 'vue-router'
import { ElementEdit } from './elements'
import { CommonButton } from '~/components/common'
import {
  getTsn,
  getSn,
  getSpgz,
  getKpgz,
  getTsnId,
  getSnId,
  getSpgzId,
  getKpgzId,
} from '~/api/route.sprav'

const table = ref(null)
const store = useStore()

const route = useRoute()
const router = useRouter()

const setUser = (data) => {
  store.$state.username = data.username
  store.$state.password = data.password
}

const setUserInfo = (data) => {
  store.$state.access_token = data.access_token
  store.$state.refresh_token = data.refresh_token
  store.$state.login = data.login
  store.$state.user_id = data.user_id
}

const makeFormData = () => {
  const username = JSON.parse(localStorage.getItem('username') ?? null)
  const password = JSON.parse(localStorage.getItem('password') ?? null)
  const level = JSON.parse(localStorage.getItem('level') ?? null)

  const user_data = {
    username: username ?? store.$state.username,
    password: password ?? store.$state.password,
    level: level ?? store.$state.level,
  }

  setUser(user_data)

  const formBody = []
  if (!user_data.password) {
    return null
  }
  for (let property in user_data) {
    let encodedKey = encodeURIComponent(property)
    let encodedValue = encodeURIComponent(user_data[property])
    formBody.push(encodedKey + '=' + encodedValue)
  }
  return formBody.join('&')
}

const user_id = computed(() => {
  return route.query.user_id
})

const categories = ['СН', 'ТСН', 'КПГЗ', 'СПГЗ']

const chosen_cat = ref(categories[0])

const chooseCat = async (cat) => {
  chosen_cat.value = cat

  const token = store.$state.access_token
  if (cat === 'ТСН') {
    const data = await getTsn(token)
    const heading = ['Наименование', 'Шифр', 'Цена, руб.', 'Ед. изм.']
    table.value = createTable(heading, data)
  }
  if (cat === 'КПГЗ') {
    const data = await getKpgz(token)
    const heading = ['Наименование']
    table.value = createTable(heading, data)
  }
  if (cat === 'СПГЗ') {
    const data = await getSpgz(token)
    const heading = ['ID', 'Наименование', 'Шифр']
    table.value = createTable(heading, data)
  }
  if (cat === 'СН') {
    const data = await getSn(token)
    const heading = ['Наименование', 'Шифр', 'Цена, руб.', 'Ед. изм.']
    table.value = createTable(heading, data)
  }
  router.replace('/setup')
}

const spgz_id = computed(() => {
  return route.query.spgz
})

const kpgz_id = computed(() => {
  return route.query.kpgz
})

const sn_id = computed(() => {
  return route.query.sn
})

const tsn_id = computed(() => {
  return route.query.tsn
})

const isEdit = computed(() => {
  return spgz_id.value || kpgz_id.value || sn_id.value || tsn_id.value
})

const chosen_item = ref(null)

watch(spgz_id, async () => {
  chosen_item.value = null
  if (isEdit.value) {
    chosen_item.value = await getSpgzId(
      store.$state.access_token,
      spgz_id.value
    )
  }
})

watch(kpgz_id, async () => {
  chosen_item.value = null
  if (isEdit.value) {
    chosen_item.value = await getKpgzId(
      store.$state.access_token,
      kpgz_id.value
    )
  }
})

watch(sn_id, async () => {
  chosen_item.value = null
  if (isEdit.value) {
    chosen_item.value = await getSnId(store.$state.access_token, sn_id.value)
  }
})

watch(tsn_id, async () => {
  chosen_item.value = null
  if (isEdit.value) {
    chosen_item.value = await getTsnId(store.$state.access_token, tsn_id.value)
  }
})

const back = () => {
  router.replace('/setup')
}

onMounted(async () => {
  if (!makeFormData()) {
    router.push('/auth')
  } else {
    const data = await get_token(makeFormData())
    setUserInfo(data)
    chooseCat(chosen_cat.value)
  }
})
</script>

<template>
  <div class="sprav">
    <div class="sprav__switch">
      <common-button
        @click="chooseCat(category)"
        :variant="chosen_cat === category ? 'primary' : 'outlined'"
        v-for="(category, idx) of categories"
        :key="idx"
        class="sprav__button"
        >{{ category }}</common-button
      >
    </div>
    <div class="sprav__content" v-if="!isEdit">
      <element-table
        :title="chosen_cat"
        class="sprav__table-tsn"
        v-if="table && !user_id && chosen_cat === 'ТСН'"
        :table="table"
        type="tsn"
      />
      <element-table
        :title="chosen_cat"
        class="sprav__table-sn"
        v-else-if="table && !user_id && chosen_cat === 'СН'"
        :table="table"
        type="sn"
      />
      <element-table
        :title="chosen_cat"
        class="sprav__table-kpgz"
        v-else-if="table && !user_id && chosen_cat === 'КПГЗ'"
        :table="table"
        type="kpgz"
      />
      <element-table
        :title="chosen_cat"
        class="sprav__table-spgz"
        v-else-if="table && !user_id && chosen_cat === 'СПГЗ'"
        :table="table"
        type="spgz"
      />
    </div>
    <div class="sprav__content" v-else>
      <element-edit v-if="chosen_item" :item="chosen_item" @back="back" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sprav {
  min-height: calc(100% - 100px);
  background-color: #ffffff;
  border-radius: 10px;
  &__table {
    &-tsn {
      @include deep('.table__heading') {
        grid-template-columns: 4fr 1fr 1fr 1fr;
      }
      @include deep('.table__item') {
        grid-template-columns: 4fr 1fr 1fr 1fr;
      }
    }
    &-sn {
      @include deep('.table__heading') {
        grid-template-columns: 4fr 1fr 1fr 1fr;
      }
      @include deep('.table__item') {
        grid-template-columns: 4fr 1fr 1fr 1fr;
      }
    }
    &-kpgz {
      @include deep('.table__heading') {
        grid-template-columns: 4fr;
      }
      @include deep('.table__item') {
        grid-template-columns: 4fr;
      }
    }
    &-spgz {
      @include deep('.table__heading') {
        grid-template-columns: 1fr 4fr 4fr;
      }
      @include deep('.table__item') {
        grid-template-columns: 1fr 4fr 4fr;
      }
    }
  }
  &__button {
    margin: 0 10px;
  }
  &__switch {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 20px 0 20px;
    justify-content: center;
  }
  &__table {
    @include deep('.table__heading') {
      grid-template-columns: 1fr 4fr 1fr;
    }
    @include deep('.table__item') {
      grid-template-columns: 1fr 4fr 1fr;
    }
  }
}
</style>
