<script setup>
import { CommonButton } from '~/components/common'
import { onMounted, ref, computed } from 'vue'
import {
  ElementRowLines,
  ElementRowTeam,
  ElementRowTsn,
  ElementRowSn,
  ElementRowKpgz,
  ElementRowSpgz,
  ElementRowCategories,
} from '~/components/elements'
import { patch_smeta } from '~/api/route.home'
import { useStore } from '~/stores/stores.main'
import { SERVER_ENDPOINT } from '~/api/_global'

const store = useStore()

const props = defineProps({
  title: {
    type: String,
  },
  table: {
    type: Object,
  },
  type: {
    type: String,
    default: () => 'categories',
  },
})

const patches = ref([])

const emit = defineEmits([
  'open_category',
  'submit',
  'add-more',
  'back',
  'update_patches',
  'save',
])

const selectItem = (item) => {
  emit('open_category', item)
}

const createPatch = (line_number, spgz_id) => {
  return {
    line_number,
    spgz_id,
  }
}

const submitItems = () => {
  emit('update_patches', [...patches.value])
}

const changeItem = (line_number, spgz_id, idx) => {
  patches.value[idx] = createPatch(line_number, spgz_id)
}

const addMore = () => {
  emit('add-more')
}

const back = () => {
  emit('back')
}

const save = () => {
  emit('save')
}

const rows = {
  lines: ElementRowLines,
  team: ElementRowTeam,
  tsn: ElementRowTsn,
  sn: ElementRowSn,
  kpgz: ElementRowKpgz,
  spgz: ElementRowSpgz,
  categories: ElementRowCategories,
}

const computedRow = computed(() => {
  return rows[props.type]
})

onMounted(() => {
  const table = [...props.table.items]

  if (table.length && props.type === 'lines') {
    table.forEach((item) => {
      if (item.hypothesises.length) {
        patches.value.push(
          createPatch(item.line_number, item.hypothesises[0].spgz_piece.id)
        )
      }
    })
  }
})
</script>

<template>
  <div class="table">
    <div class="table__header">
      <div class="table__title">
        <h1 class="table__title-text">{{ title }}</h1>
        <p class="table__address" v-if="table.address">
          Адрес: {{ table.address }}
        </p>
      </div>
      <div class="table__buttons">
        <common-button
          @click="back"
          v-if="type === 'lines'"
          class="table__button table__button_exit"
          >Вернуться к разделам</common-button
        >
        <common-button
          @click="submitItems"
          v-if="type === 'lines'"
          class="table__button"
          >Подтвердить</common-button
        >
        <common-button
          @click="addMore"
          v-if="type === 'categories'"
          class="table__button table__button_new"
          >Загрузить новый файл</common-button
        >
        <common-button
          @click="save"
          v-if="type === 'categories'"
          class="table__button"
          >Сохранить смету</common-button
        >
      </div>
    </div>
    <div class="table__content">
      <ul class="table__heading">
        <li
          class="table__heading-item"
          v-for="(heading, idx) of table.headings"
          :key="idx"
        >
          <span class="table__heading-text">{{ heading }}</span>
        </li>
      </ul>
      <ul class="table__list">
        <component
          v-for="(item, idx) of table.items"
          class="table__item"
          :item="item"
          :key="idx"
          :idx="idx"
          @change-item="changeItem"
          @open_category="selectItem"
          :is="computedRow"
        />
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table {
  &__buttons {
    display: flex;
  }
  &__button {
    &_exit,
    &_new {
      margin-right: 10px;
    }
  }
  &__header {
    @include tg-h4-bold;
    padding: 30px 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__item {
    display: grid;
    grid-template-columns: 1fr 4fr;
    padding: 20px 30px;
    transition: border 0.3s ease;
    border: 1px solid transparent;
    border-radius: 2px;
    cursor: pointer;
    &_sure {
      background-color: #d5c440;
    }
    &:hover {
      border: 1px solid $accent-purple;
    }
    &_even {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  &__select {
    height: 80px;
    border-radius: 4px;
  }
  &__text {
    @include tg-12-medium;
  }
  &__heading {
    display: grid;
    grid-template-columns: 1fr 4fr;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 30px;
  }
}
</style>
