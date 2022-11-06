<script setup>
import { ElementTable } from '~/components/elements'
import { createTable } from '~/core/table'
import { getAllUsers } from '~/api/route.users'
import { onMounted, ref, computed } from 'vue'
import { useStore } from '~/stores/stores.main'
import { get_token } from '~/api/route.auth'
import { useRoute } from 'vue-router'
import { ElementEdit } from './elements'

const table = ref(null)
const store = useStore()

const route = useRoute()

const setUser = (data) => {
  store.$state.username = data.user_id
  store.$state.password = data.user_id
}

const setUserInfo = (data) => {
  store.$state.access_token = data.access_token
  store.$state.refresh_token = data.refresh_token
  store.$state.user_id = data.user_id
}

const makeFormData = () => {
  const username = JSON.parse(localStorage.getItem('username') ?? null)
  const password = JSON.parse(localStorage.getItem('password') ?? null)

  const user_data = {
    username: username ?? store.$state.username,
    password: password ?? store.$state.password,
    level: store.$state.level,
  }

  setUserInfo(user_data)

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

onMounted(async () => {
  if (!makeFormData()) {
    router.push('/auth')
  } else {
    const data = await get_token(makeFormData())
    setUser(data)
    setUserInfo(data)
  }

  const data = await getAllUsers(store.$state.access_token)
  const heading = ['ID', 'Email', 'Уровень доступа']
  table.value = createTable(heading, [...data])
})
</script>

<template>
  <div class="team">
    <div class="team__content">
      <element-table
        title="Список пользователей"
        class="team__table"
        v-if="table && !user_id"
        :table="table"
        type="team"
      />
      <element-edit class="team__edit" v-else />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.team {
  min-height: calc(100% - 100px);
  background-color: #ffffff;
  border-radius: 10px;
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
