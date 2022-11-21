<script setup>
import { CommonInput, CommonSelect, CommonButton } from '../common'
import { onMounted, ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
  },
  spgz_id: {
    type: [Number, String],
  },
})

const form = ref({
  hypo: '',
  by_hand: '',
})

const selected_item = ref(null)

const emit = defineEmits(['change-item', 'close'])

const submit = () => {
  if (form.value.by_hand.length) {
    emit('change-item-hand', selected_item.value, form.value.by_hand)
    emit('close')
    return
  }
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

const clearHand = () => {
  form.value.by_hand = ''
}

const is_by_hand = computed(() => {
  return !!form.value.by_hand.length
})

onMounted(() => {
  if (typeof props.spgz_id === 'string') {
    form.value.by_hand = props.spgz_id
  }
})
</script>

<template>
  <div class="modal">
    <div class="modal__content">
      <label class="modal__label">
        <h4 class="modal__subtitle">Выберите СПГЗ из выпадающего списка:</h4>
        <common-select
          :items="items"
          :is-by-hand="is_by_hand"
          :selected-item="selected_item"
          :spgz-id="spgz_id"
          @clear-hand="clearHand"
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
