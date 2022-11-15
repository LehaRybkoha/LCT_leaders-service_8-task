<script setup>
import { useRouter } from 'vue-router'
import { IconEdit } from '../icons'

const router = useRouter()

const edit = (item) => {
  router.push({ query: { sn: item.id, sprav: 'sn' } })
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
  <li class="table__item" @click="edit(item)">
    <span class="table__text">{{ item.text }}</span>
    <span class="table__text">{{ item.code }}</span>
    <span class="table__text">{{ item.price }}</span>
    <span class="table__text">{{ item.uom }}</span>
    <div class="table__icon">
      <div class="table__icon-wrapper">
        <icon-wrapper width="20" height="20">
          <icon-edit />
        </icon-wrapper>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.table {
  &__icon {
    opacity: 0;
    position: absolute;
    right: 10px;
    bottom: 0;
    top: 0;
    display: flex;
    align-items: center;
    transition: opacity 0.3s ease;
    &-wrapper {
      background: $accent-purple;
      border-radius: 5px;
      padding: 8px;
    }
  }
  &__item {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 4fr;
    padding: 20px 30px;
    transition: border 0.3s ease;
    border: 1px solid transparent;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      border: 1px solid $accent-purple;
      .table__icon {
        opacity: 1;
      }
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
