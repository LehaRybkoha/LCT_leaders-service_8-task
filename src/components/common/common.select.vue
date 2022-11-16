<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
  },
  selectedItem: Object,
})

const emit = defineEmits(['change-item', 'change-init'])

const is_opened = ref(false)

const select = (item) => {
  emit('change-item', item)
  is_opened.value = false
}

onMounted(() => {
  if (props.items.length) {
    console.log('INIT', props.items[0])
    emit('change-init', props.items[0])
  }
})
</script>

<template>
  <div class="select" v-if="selectedItem">
    <div class="select__wrapper">
      <div
        class="select__input"
        :class="{ opened: is_opened }"
        @click="is_opened = !is_opened"
      >
        <p class="select__filled">{{ selectedItem.spgz_piece.name }}</p>
      </div>
      <ul class="select__list" :class="{ opened: is_opened }">
        <li
          @click="select(item)"
          class="select__item"
          v-for="(item, idx) of items"
          :key="idx"
        >
          <p class="select__text">{{ item.spgz_piece.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select {
  position: relative;
  max-width: 300px;
  width: 100%;
  &__filled {
    line-height: 20px;
  }
  &__input {
    border: 1px solid $primary-grey;
    border-radius: 5px;
    padding: 10px 20px;
    text-align: center;
    color: $accent-purple;
    cursor: pointer;
    &.opened {
      border-radius: 5px 5px 0 0;
    }
  }
  &__item {
    padding: 10px 20px;
    border-bottom: 1px solid $border-color;
    color: $primary-grey;
    background: #ffffff;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      border-bottom: 1px solid $accent-purple;
      color: $accent-purple;
    }
  }
  &__list {
    position: absolute;
    width: 100%;
    border: 1px solid $primary-grey;
    border-top: none;
    border-radius: 0 0 5px 5px;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: scroll;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    &.opened {
      pointer-events: all;
      opacity: 1;
    }
  }
  &__text {
    @include tg-12-bold;
  }
}
</style>
