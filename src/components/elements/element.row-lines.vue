<script setup>
import { CommonButton, CommonSelect } from '~/components/common'
import { onMounted, ref, watch, toRaw, computed } from 'vue'

const props = defineProps({
  idx: {
    type: Number,
  },
  item: {
    type: Object,
  },
  patche: {
    type: Object,
  },
})

const selectedSpgz = props.item.hypothesises.length
  ? props.item.hypothesises[0].spgz_piece.id
  : ''
const modelSpgz = ref(selectedSpgz)

const emit = defineEmits(['change-item', 'choose-hypo'])

const changeItem = (item) => {
  emit('change-item', item.line_number, modelSpgz.value, props.idx)
}

const choose = () => {
  emit(
    'choose-hypo',
    props.item.hypothesises,
    props.idx,
    props.item.line_number
  )
}

const change = (id) => {
  modelSpgz.value = id
}

const chosen_computed_hypo = computed(() => {
  if (props.item.hypothesises && props.patche) {
    return props.item.hypothesises.find(
      (item) => item.spgz_piece.id === props.patche.spgz_id
    )
  }
})

watch(modelSpgz, (val) => {
  changeItem(props.item, val)
})
</script>

<template>
  <li
    v-if="chosen_computed_hypo"
    class="table__item"
    :class="{ table__item_sure: item.spgz_defined }"
  >
    <span class="table__text">{{ idx + 1 }}</span>
    <span class="table__text">{{ item.code }}</span>
    <span class="table__text">{{ item.name }}</span>
    <span class="table__text">{{ item.amount }}</span>
    <span class="table__text">{{ item.uom }}</span>
    <span class="table__text">{{ item.price }}</span>
    <span
      class="table__text"
      v-if="item.hypothesises.length && chosen_computed_hypo"
      >{{ chosen_computed_hypo.spgz_piece.name }}</span
    >
    <span class="table__text" v-else>Гипотеза не выбрана</span>
    <div class="table__wrapper">
      <common-button @click="choose" @change-item="change" class="table__button"
        >Изменить СПГЗ</common-button
      >
    </div>
  </li>
</template>

<style lang="scss" scoped>
.table {
  &__wrapper {
    margin-left: 30px;
  }
  &__item {
    display: grid;
    grid-template-columns: 1fr 4fr;
    padding: 20px 30px;
    transition: border 0.3s ease;
    border: 1px solid transparent;
    border-radius: 2px;
    cursor: pointer;
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
    width: 100px;
  }
  &__text {
    @include tg-12-medium;
  }
  &__button {
    font-size: 10px;
    padding: 5px 10px;
  }
}
</style>
