<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const returnLevel = (level) => {
  switch (level) {
    case 1:
      return 'Обычный'
    case 2:
      return 'Модератор'
    case 3:
      return 'Администратор'
  }
}

defineProps({
  idx: {
    type: Number,
  },
  item: {
    type: Object,
  },
})
</script>

<template>
  <li class="table__item" @click="router.push({ query: { user_id: item.id } })">
    <span class="table__text">{{ item.id }}</span>
    <span class="table__text">{{ item.email }}</span>
    <span class="table__text">{{ returnLevel(item.level) }}</span>
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
