<script setup>
import { ElementTable } from '~/components/elements'
import { createTable } from '~/core/table'
import { getAllUsers, getUserById, editUser } from '~/api/route.users'
import { onMounted, ref, computed } from 'vue'
import { useStore } from '~/stores/stores.main'
import { get_token } from '~/api/route.auth'
import { useRoute } from 'vue-router'
import { CommonButton } from '~/components/common'

const props = defineProps({
  userId: {
    type: String,
  },
  token: {
    type: String,
  },
  level: {
    type: Number,
  },
})

const table = ref(null)
const store = useStore()

const route = useRoute()

const form = ref({
  email: null,
  level: 1,
})

const emit = defineEmits(['close'])

const saveUser = async () => {
  await editUser(props.token, props.userId, form.value.level)

  emit('close')
}

onMounted(async () => {
  const data = await getUserById(props.token, props.userId)
  form.value.email = data.email
  form.value.level = data.level
})
</script>

<template>
  <div class="edit" v-if="form.email">
    <div class="edit__title">Изменить пользователя</div>
    <div class="edit__form">
      <label for="" class="edit__label">
        <span class="edit__subtitle">Email:</span>
        <p class="edit__text">{{ form.email }}</p>
      </label>
      <label class="edit__label">
        <span class="edit__subtitle">Уровень пользователя:</span>
        <select
          :class="{ disabled: form.level === store.$state.level }"
          v-model="form.level"
          class="edit__select"
        >
          <option value="1">Обычный</option>
          <option value="2">Модератор</option>
          <option value="3">Администратор</option>
        </select>
      </label>
      <common-button @click="saveUser" class="edit__button"
        >Сохранить</common-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit {
  padding: 40px;
  &__title {
    @include tg-h5-bold;
    color: #000000;
    margin-bottom: 30px;
  }
  &__text {
    margin-bottom: 20px;
    @include tg-16-semibold-poppins;
  }
  &__subtitle {
    margin-bottom: 10px;
    display: block;
  }
  &__select {
    border: 1px solid #b2b2b2;
    border-radius: 5px;
    width: 300px;
    height: 50px;
    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
  &__input {
    border: 1px solid #b2b2b2;
    border-radius: 5px;
    display: block;
    height: 50px;
    padding: 0 10px;
    width: 100%;
    margin-bottom: 20px;
    max-width: 300px;
  }
  &__button {
    margin-top: 50px;
  }
}
</style>
