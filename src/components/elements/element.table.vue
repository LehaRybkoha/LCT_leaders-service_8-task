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
import { useStore } from '~/stores/stores.main'
import { SERVER_ENDPOINT } from '~/api/_global'
import { ModalHypo } from '../modal'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
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
const by_hand = ref([])

const emit = defineEmits([
  'open_category',
  'submit',
  'add-more',
  'back',
  'update_patches',
  'save',
])

const selectItem = (item, idx) => {
  emit('open_category', item, idx)
}

const createPatch = (line_number, spgz_id) => {
  return {
    line_number,
    spgz_id,
  }
}

const deletePatch = (line_number) => {
  patches.value = patches.value.filter(
    (item) => item.line_number !== line_number
  )
}

const submitItems = () => {
  emit('update_patches', [...patches.value])
}

const changeItem = (line_number, spgz_id, idx) => {
  patches.value[idx] = createPatch(line_number, spgz_id)
}

const chooseKey = (key) => {
  emit('choose-key', key, props.table.idx)
}

const addMore = () => {
  emit('add-more')
}

const back = () => {
  emit('back')
  router.push('/')
}

const save = () => {
  emit('save')
  router.push('/')
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

const showModal = ref(false)

const chosen_hypos = ref(null)
const chosen_idx = ref(null)
const chosen_line = ref(null)
const spgz_id = ref(null)

const choose = (hypo, idx, line_number, id) => {
  chosen_hypos.value = null
  chosen_hypos.idx = null
  chosen_hypos.line_number = null
  spgz_id.value = null
  setTimeout(() => {
    chosen_hypos.value = hypo
    chosen_idx.value = idx
    chosen_line.value = line_number
    spgz_id.value = id
  }, 0)
  showModal.value = true
}

const chooseItem = (item) => {
  changeItem(chosen_line.value, item.spgz_piece.id, chosen_idx.value)
}

const chooseItemHand = (item, hand_info) => {
  changeItem(chosen_line.value, hand_info, chosen_idx.value)
}

const findPatch = (item) => {
  return patches.value.find((patch) => {
    return patch.line_number === item.line_number
  })
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
      <div class="table__block table__block_flex-btw">
        <div class="table__title">
          <h1 class="table__title-text">{{ table.name }}</h1>
          <p class="table__desc" v-if="table.address">
            ??????????: <span class="table__desc_bold">{{ table.address }}</span>
          </p>
          <p class="table__desc" v-if="table.address">
            ?????????????????? ??????????????????, ??????.:
            <span class="table__desc_bold">{{ table.total_price }}</span>
          </p>
        </div>
        <div class="table__buttons">
          <common-button
            @click="back"
            v-if="type === 'lines'"
            class="table__button table__button_exit"
            >???? ?????????????????? ?? ?????????????????? ?? ????????????????</common-button
          >
          <common-button
            @click="submitItems"
            v-if="type === 'lines'"
            class="table__button"
            >?????????????????? ?? ?????????????????? ?? ????????????????</common-button
          >
          <common-button
            @click="addMore"
            v-if="type === 'categories'"
            class="table__button table__button_new"
            >?????????????????? ?????????? ????????</common-button
          >
          <common-button
            @click="save"
            v-if="type === 'categories'"
            class="table__button"
            >?????????????????? ??????????</common-button
          >
        </div>
      </div>
      <div class="table__block table__block_flex" v-if="type === 'lines'"></div>
      <div class="table__block table__block_flex" v-if="type === 'lines'">
        <div class="table__color">
          <div class="table__checkbox">
            <div class="table__checkbox-checked"></div>
          </div>
          ?????????????????? ???????????????? ????????????
        </div>
        <p class="table__info">
          - ?????????????? ???? ???????????? ?????? ???????????? ???????????????? ????????????
        </p>
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
          :is="computedRow"
          :item="item"
          :key="idx"
          :idx="idx"
          :key-line="table.key_line"
          :patche="findPatch(item)"
          @choose-key="chooseKey"
          @change-item="changeItem"
          @open_category="selectItem(item, idx)"
          @choose-hypo="choose"
        />
      </ul>
    </div>
    <teleport to=".app-modal-container">
      <vue-final-modal
        v-model="showModal"
        classes="f-modal-container"
        content-class="modal-content"
      >
        <modal-hypo
          v-if="chosen_hypos"
          :items="chosen_hypos"
          :spgz_id="spgz_id"
          @change-item="chooseItem"
          @change-item-hand="chooseItemHand"
          @close="showModal = false"
        />
      </vue-final-modal>
    </teleport>
  </div>
</template>

<style>
.f-modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style lang="scss" scoped>
.table {
  &__block {
    margin-bottom: 20px;
    &_flex {
      display: flex;
      align-items: center;
      @include tg-16-medium;
    }
    &_flex-btw {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__color {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    color: #ffffff;
    background: #9d78eb;
    border-radius: 5px;
    margin-right: 15px;
  }
  &__checkbox {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    border: 1px solid #ffffff;
    position: relative;
    margin-right: 10px;
    &-checked {
      transition: opacity 0.3s ease;
      opacity: 1;
      width: 12px;
      height: 12px;
      border-radius: 2px;
      background-color: #ffffff;
      position: absolute;
      left: 3px;
      top: 3px;
    }
  }
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
  }
  &__title {
    &-text {
      margin-bottom: 10px;
      font-size: 32px;
      font-weight: bold;
    }
  }
  &__desc {
    @include tg-18-normal;
    margin-bottom: 5px;
    &_bold {
      @include tg-18-bold;
    }
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
