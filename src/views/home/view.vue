<script setup>
import { ref, computed, onMounted } from 'vue'
import { CommonButton } from '~/components/common'
import { useRoute, useRouter } from 'vue-router'
import { upload_smeta, patch_smeta } from '~/api/route.home'
import { ElementTable } from '~/components/elements'
import { get_token, register } from '~/api/route.auth'

import { SERVER_ENDPOINT } from '~/api/_global'

import { useStore } from '~/stores/stores.main'

import { createTable } from '~/core/table'

const router = useRouter()
const route = useRoute()

const store = useStore()

const isLoaded = ref(false)

const categoriesData = ref(null)

const title = ref('Категории')

const table = ref(null)
const chosen_cat = ref(null)
const table_cat = ref(null)

const setUser = (data) => {
  store.$state.username = data.username
  store.$state.password = data.password
}

const setUserInfo = (data) => {
  store.$state.access_token = data.access_token
  store.$state.refresh_token = data.refresh_token
  store.$state.level = data.level
  store.$state.user_id = data.user_id
}

const submitItems = async () => {
  await patch_smeta(
    store.$state.user_id,
    patches.value,
    store.$state.access_token
  )
}

const patches = ref([])

const createPatch = (line_number, spgz_id) => {
  return {
    line_number,
    spgz_id,
  }
}

const changeFiles = async (e) => {
  try {
    const files = e.target.files

    if (files.length) {
      isLoaded.value = true

      let file = files[0]
      let formData = new FormData()

      formData.append('file', file)

      //TODO - make as route in api
      let data = await fetch(
        `${SERVER_ENDPOINT}/smeta/parse_smeta/${store.$state.user_id}`,
        {
          headers: {
            Authorization: 'Bearer ' + store.$state.access_token,
            Accept: 'application/json',
          },
          method: 'POST',
          body: formData,
          token: store.$state.access_token,
        }
      )
      categoriesData.value = await data.json()

      const headings = ['№', 'Наименование']

      table.value = createTable(
        headings,
        categoriesData.value.categories,
        categoriesData.value.address
      )
      table_cat.value = createTable(
        headings,
        categoriesData.value.categories,
        categoriesData.value.address
      )

      console.log(table.value.items)

      table.value.items.forEach((item) => {
        item.lines.forEach((item_two) => {
          if (item_two.hypothesises.length) {
            patches.value.push(
              createPatch(
                item_two.line_number,
                item_two.hypothesises[0].spgz_piece.id
              )
            )
          }
        })
      })
    }
  } catch (e) {
    console.log(e)
  }
}

const updatePatches = (items) => {
  items.forEach((item) => {
    patches.value.forEach((item_patch) => {
      if (item_patch.line_number === item.line_number) {
        item_patch.spgz_id = item.spgz_id
      }
    })
  })
  back()
}

const makeFormData = () => {
  console.log(store.$state.username)
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

const open_category = (category) => {
  const headings = [
    '№',
    'Код',
    'Наименование',
    'Ед. изм.',
    'Кол-во',
    'Цена',
    'Гипотезы',
  ]

  chosen_cat.value = createTable(headings, category.lines)
  title.value = category.name
}

const back = () => {
  table.value = table_cat.value
  chosen_cat.value = null
}

const addMore = () => {
  isLoaded.value = false
}

onMounted(async () => {
  console.log(makeFormData())
  if (!makeFormData()) {
    router.push('/auth')
  } else {
    const data = await get_token(makeFormData())
    setUserInfo(data)
  }
})
</script>

<template>
  <div class="home">
    <div class="home__content" v-if="!isLoaded">
      <label class="home__label">
        <span>Загрузить смету</span>
        <input
          ref="uploadInput"
          class="home__input"
          type="file"
          @change="changeFiles"
        />
      </label>
    </div>
    <element-table
      @open_category="open_category"
      @add-more="addMore"
      @save="submitItems"
      class="table-main"
      type="categories"
      :title="title"
      :table="table"
      v-else-if="table && !chosen_cat"
    />
    <element-table
      v-else-if="chosen_cat && table"
      @back="back"
      @submit="chosen_cat = null"
      @update_patches="updatePatches"
      @save="submitItems"
      :title="title"
      :table="chosen_cat"
      class="table-lines"
      type="lines"
    />
    <div v-else>Загрузка....</div>
  </div>
</template>

<style scoped lang="scss">
.home {
  min-height: calc(100% - 100px);
  background-color: #ffffff;
  border-radius: 10px;
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 200px);
  }

  &__input {
    display: none;
  }
  &__label {
    background: $accent-purple;
    color: $primary-white;
    padding: 20px 40px;
    border-radius: 5px;
    cursor: pointer;
  }
}

.table {
  &-lines {
    @include deep('.table__heading') {
      grid-template-columns: 1fr 1fr 3fr 1fr 1fr 1fr 2fr;
    }
    @include deep('.table__item') {
      grid-template-columns: 1fr 1fr 3fr 1fr 1fr 1fr 2fr;
    }
  }
}
</style>
