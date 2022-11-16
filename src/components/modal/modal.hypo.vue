<script setup>
import { CommonInput, CommonSelect, CommonButton } from '../common'
import { onMounted, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
  },
})

const form = ref({
  hypo: '',
  by_hand: '',
})

const selected_item = ref(null)

const emit = defineEmits(['change-item', 'close'])

const submit = () => {
  emit('change-item', selected_item.value)
  emit('close')
}

const changeInit = (item) => {
  selected_item.value = item
  emit('change-item', selected_item.value)
}

const change = (item) => {
  selected_item.value = item
}
</script>

<template>
  <div class="modal">
    <div class="modal__content">
      <label class="modal__label">
        <h4 class="modal__subtitle">Выберите СПГЗ:</h4>
        <common-select
          :items="items"
          :selected-item="selected_item"
          @change-item="change"
          @change-init="changeInit"
        />
      </label>
      <label class="modal__label">
        <h4 class="modal__subtitle">Или введите вручную:</h4>
        <common-input v-model="form.by_hand" :value="form.by_hand" />
      </label>
    </div>
    <common-button class="modal__button" @click="submit">Выбрать</common-button>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: relative;
  background: $primary-white;
  padding: 20px;
  border-radius: 5px;
  padding: 20px;
  height: 100%;
  &__button {
    padding: 10px 80px;
    margin: 20px auto 0 auto;
  }
  &__content {
    display: flex;
  }
  &__label {
    display: block;
    margin-bottom: 10px;
    &:not(:last-child) {
      margin-right: 35px;
    }
  }
  &__subtitle {
    margin-bottom: 10px;
  }
}
</style>
