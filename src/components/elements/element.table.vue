<script setup>
import { CommonButton } from '~/components/common'
import { onMounted, ref } from 'vue'
import {
  ElementRowLines,
  ElementRowTeam,
  ElementRowTsn,
  ElementRowSn,
  ElementRowKpgz,
  ElementRowSpgz,
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

const submitItems = async () => {
  try {
    let filename = ''
    const url = `${SERVER_ENDPOINT}/smeta/patch_smeta/${store.$state.user_id}`
    fetch(url, {
      headers: {
        Authorization: 'Bearer ' + store.$state.access_token,
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        patches: [...patches.value],
      }),
      token: store.$state.access_token,
    })
      .then((res) => {
        const disposition = res.headers.get('content-disposition')
        filename = disposition.split(/;(.+)/)[1].split(/=(.+)/)[1]
        console.log(filename, 'NAME')
        if (filename.toLowerCase().startsWith("utf-8''"))
          filename = decodeURIComponent(filename.replace("utf-8''", ''))
        else filename = filename.replace(/['"]/g, '')
        return res.blob()
      })
      .then((blob) => {
        var url = window.URL.createObjectURL(blob)
        var a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a) // append the element to the dom
        a.click()
        a.remove() // afterwards, remove the element
        emit('submit')
      })
  } catch (e) {
    console.log(e)
  }
}

const submitItemsV2 = () => {
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
      <h1 class="table__title">
        {{ title }}<span v-if="table.address"> - {{ table.address }}</span>
      </h1>
      <div class="table__buttons">
        <common-button
          @click="back"
          v-if="type === 'lines'"
          class="table__button table__button_exit"
          >Выйти</common-button
        >
        <common-button
          @click="submitItemsV2"
          v-if="type === 'lines'"
          class="table__button"
          >Подтвердить</common-button
        >
        <common-button
          @click="addMore"
          v-if="type === 'categories'"
          class="table__button"
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

      <ul v-if="type === 'categories'" class="table__list">
        <li
          class="table__item"
          :class="{ table__item_even: idx % 2 === 0 }"
          v-for="(item, idx) of table.items"
          :key="idx"
          @click="selectItem(item)"
        >
          <span class="table__text">{{ idx }}</span>
          <span class="table__text">{{ item.name }}</span>
        </li>
      </ul>
      <ul v-else-if="type === 'lines'" class="table__list">
        <element-row-lines
          v-for="(item, idx) of table.items"
          @change-item="changeItem"
          class="table__item"
          :class="{ table__item_sure: item.spgz_defined }"
          :item="item"
          :key="idx"
          :idx="idx"
        />
      </ul>
      <ul v-else-if="type === 'team'" class="table__list">
        <element-row-team
          v-for="(item, idx) of table.items"
          class="table__item"
          :class="{ table__item_even: item.spgz_defined }"
          :item="item"
          :key="item.id"
          :idx="idx"
        />
      </ul>
      <ul v-else-if="type === 'sn'" class="table__list">
        <element-row-sn
          v-for="(item, idx) of table.items"
          class="table__item"
          :class="{ table__item_even: item.spgz_defined }"
          :item="item"
          :key="item.id"
          :idx="idx"
        />
      </ul>
      <ul v-else-if="type === 'tsn'" class="table__list">
        <element-row-tsn
          v-for="(item, idx) of table.items"
          class="table__item"
          :class="{ table__item_even: item.spgz_defined }"
          :item="item"
          :key="item.id"
          :idx="idx"
        />
      </ul>
      <ul v-else-if="type === 'kpgz'" class="table__list">
        <element-row-kpgz
          v-for="(item, idx) of table.items"
          class="table__item"
          :class="{ table__item_even: item.spgz_defined }"
          :item="item"
          :key="item.id"
          :idx="idx"
        />
      </ul>
      <ul v-else-if="type === 'spgz'" class="table__list">
        <element-row-spgz
          v-for="(item, idx) of table.items"
          class="table__item"
          :class="{ table__item_even: item.spgz_defined }"
          :item="item"
          :key="item.id"
          :idx="idx"
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
    &_exit {
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
