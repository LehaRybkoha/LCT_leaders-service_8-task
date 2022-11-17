<script setup>
import { ref, computed, onMounted, nextTick, toRaw } from 'vue'
import { CommonButton, CommonInput, CommonLoader } from '~/components/common'
import { useRoute, useRouter } from 'vue-router'
import { patch_smeta, parse_smeta } from '~/api/route.home'
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
const key_lines = ref([])

const setUser = (data) => {
  store.$state.username = data.username
  store.$state.password = data.password
}

const submitItems = async () => {
  await patch_smeta(
    store.$state.user_id,
    patches.value,
    key_lines.value,
    store.$state.access_token
  )
}

const patches = ref([])

const step = ref(0)

const form = ref({
  name: '',
  address: '',
})

const createPatch = (line_number, spgz_id) => {
  return {
    line_number,
    spgz_id,
  }
}

const clearPage = () => {
  form.value.name = ''
  form.value.address = ''
  step.value = 0
  categoriesData.value = null
  table.value = null
  table_cat.value = null
  isLoaded.value = false
  store.$state.categoriesData = null
}

const initPage = () => {
  if (!store.$state.categoriesData) {
    return
  }
  categoriesData.value = store.$state.categoriesData

  const headings = [
    '№',
    'Наименование раздела',
    'Стоимость всего раздела, руб.',
    'Ключевая работа',
    'Шифр',
  ]

  table.value = createTable(headings, categoriesData.value.categories, {
    address: categoriesData.value.address,
    name: 'Название: ' + categoriesData.value.name,
    total_price: categoriesData.value.total_price,
  })
  table_cat.value = createTable(headings, categoriesData.value.categories, {
    address: categoriesData.value.address,
  })

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
    key_lines.value.push(item.key_line.line_number)

    isLoaded.value = true
  })
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
        `${SERVER_ENDPOINT}/smeta/save_smeta/${store.$state.user_id}`,
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

      categoriesData.value = await parse_smeta(
        store.$state.access_token,
        store.$state.user_id,
        form.value.name,
        form.value.address
      )

      store.$state.categoriesData = categoriesData.value

      initPage()
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

const chooseKey = async (key, idx) => {
  table_cat.value.items[idx].key_line = key
  chosen_cat.value.key_line = key

  key_lines.value = []

  table_cat.value.items.forEach((item) => {
    key_lines.value.push(item.key_line.line_number)
  })
}

const open_category = (category, idx) => {
  const headings = [
    '№',
    'Шифр',
    'Наименование работы',
    'Кол-во',
    'Ед. изм.',
    'Цена, руб.',
    'Соответствующее СПГЗ из справочника',
  ]

  console.log(category, 'CREATION')

  chosen_cat.value = createTable(headings, category.lines, {
    name: 'Состав раздела',
    key_line: category.key_line,
    idx: idx,
  })
  title.value = category.name

  router.push({ query: { row: 'line' } })
}

const back = () => {
  table.value = table_cat.value
  chosen_cat.value = null
}

const addMore = () => {
  clearPage()
}

const next = () => {
  const { name, address } = form.value
  if (name.length && address.length) {
    step.value = 1
  }
}

onMounted(() => {
  initPage()
})
</script>

<template>
  <div class="home">
    <div class="home__content" v-if="!isLoaded">
      <div v-if="step === 0" class="home__content">
        <div class="home__form form">
          <div class="form__item">
            <p class="form__title">Введите название сметы:</p>
            <common-input v-model="form.name" :value="form.name" />
          </div>
          <div class="form__item">
            <p class="form__title">Введите адрес:</p>
            <common-input v-model="form.address" :value="form.address" />
          </div>
          <common-button @click="next">Далее</common-button>
        </div>
      </div>
      <label v-else class="home__label">
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
      @choose-key="chooseKey"
      :title="title"
      :table="chosen_cat"
      class="table-lines"
      type="lines"
    />
    <common-loader v-else />
  </div>
</template>

<style scoped lang="scss">
.form {
  &__title {
    @include tg-16-medium;
    margin-bottom: 8px;
  }
  &__item {
    margin-bottom: 15px;
  }
}
.home {
  min-height: calc(100% - 100px);
  background-color: #ffffff;
  border-radius: 10px;
  position: relative;
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
  &-main {
    @include deep('.table__heading') {
      grid-template-columns: 1fr 4fr 2fr 3fr 2fr;
    }
    @include deep('.table__item') {
      grid-template-columns: 1fr 4fr 2fr 3fr 2fr;
    }
  }
  &-lines {
    @include deep('.table__heading') {
      grid-template-columns: 1fr 1fr 3fr 1fr 1fr 1fr 2fr 2fr;
    }
    @include deep('.table__item') {
      grid-template-columns: 1fr 1fr 3fr 1fr 1fr 1fr 2fr 2fr;
    }
  }
}
</style>
