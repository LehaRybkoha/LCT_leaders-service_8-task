<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const emit = defineEmits(['open_category'])

const selectItem = (item) => {
  emit('open_category', item)
}

const props = defineProps({
  idx: {
    type: Number,
  },
  item: {
    type: Object,
  },
})
</script>

<template>
  <li
    class="table__item"
    :class="{ table__item_even: idx % 2 === 0 }"
    @click="selectItem(item)"
  >
    <span class="table__text">{{ idx + 1 }}</span>
    <span class="table__text">{{ item.name }}</span>
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
  }
  &__text {
    @include tg-12-medium;
  }
}
</style>
