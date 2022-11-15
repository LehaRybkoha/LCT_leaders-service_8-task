<script setup>
defineProps({
  value: {
    type: String,
  },
})

const emit = defineEmits(['update:modelValue'])

const updateInput = (ev) => {
  emit('update:modelValue', ev.target.value)
}
</script>

<template>
  <textarea class="textarea" :value="value" @updateInput="updateInput" />
</template>

<style lang="scss" scoped>
.textarea {
  border: 1px solid $border-color;
  padding: 10px 20px;
  border-radius: 5px;
  transition: border 0.3s ease;
  color: #000000;
  width: 350px;
  min-height: 300px;
  resize: none;
  &:hover {
    border: 1px solid $accent-purple;
  }
}
</style>
