<script setup>
import { ref, computed, onMounted } from 'vue'
import { CommonButton } from '~/components/common'
import { useRoute, useRouter } from 'vue-router'
import { upload_smeta } from '~/api/route.home'
import { ElementTable } from '~/views/home/elements'

import { SERVER_ENDPOINT } from '~/api/_global'

import { useStore } from '~/stores/stores.main'

import { get_token, register } from '~/api/route.auth'

import { createTable } from '~/core/table'

const router = useRouter()
const route = useRoute()

const store = useStore()

const isLoaded = ref(false)

const categoriesData = ref(null)

const title = ref('Категории')

const table = ref(null)
const chosen_cat = ref(null)

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
    }
  } catch (e) {
    console.log(e)
  }
}

const user_data = ref({
  username: '1232111',
  password: '123456789',
  level: 3,
})

const makeFormData = () => {
  const formBody = []
  for (let property in user_data.value) {
    let encodedKey = encodeURIComponent(property)
    let encodedValue = encodeURIComponent(user_data.value[property])
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

const addMore = () => {
  isLoaded.value = false
}

onMounted(async () => {
  await register('1232111', '123456789', 3)
  const { access_token, user_id } = await get_token(makeFormData())
  store.$state.access_token = access_token
  store.$state.user_id = user_id
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
      class="table-main"
      type="categories"
      :title="title"
      :table="table"
      v-else-if="table && !chosen_cat"
    />
    <element-table
      class="table-lines"
      :title="title"
      type="lines"
      :table="chosen_cat"
      @submit="chosen_cat = null"
      v-else-if="chosen_cat && table"
    />
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
