<script setup>
import { CommonButton, CommonSelect } from '~/components/common'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  idx: {
    type: Number,
  },
  item: {
    type: Object,
  },
})

const selectedSpgz = props.item.hypothesises.length
  ? props.item.hypothesises[0].spgz_piece.id
  : ''
const modelSpgz = ref(selectedSpgz)

const emit = defineEmits(['change-item'])

const changeItem = (item) => {
  emit('change-item', item.line_number, modelSpgz.value, props.idx)
}

watch(modelSpgz, (val) => {
  changeItem(props.item, val)
})
</script>

<template>
  <li class="table__item" :class="{ table__item_sure: item.spgz_defined }">
    <span class="table__text">{{ idx }}</span>
    <span class="table__text">{{ item.code }}</span>
    <span class="table__text">{{ item.name }}</span>
    <span class="table__text">{{ item.uom }}</span>
    <span class="table__text">{{ item.amount }}</span>
    <span class="table__text">{{ item.price }}</span>
    <common-select />
    <!-- <select v-model="modelSpgz" class="table__select" name="hypothesises">
      <option
        v-for="(option, idx) of item.hypothesises"
        :key="idx"
        :value="option.spgz_piece.id"
      >
        СПГЗ: {{ option.spgz_piece.name }}
      </option>
    </select> -->
  </li>
</template>

<style lang="scss" scoped>
.table {
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
}
</style>
