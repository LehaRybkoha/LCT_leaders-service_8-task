<script setup>
import { ElementTable } from '~/components/elements'
import { createTable } from '~/core/table'
import { getAllUsers } from '~/api/route.users'
import { onMounted, ref, computed } from 'vue'
import { useStore } from '~/stores/stores.main'
import { get_token } from '~/api/route.auth'
import { useRoute } from 'vue-router'
import { CommonButton } from '~/components/common'

const props = defineProps({
  user: {
    type: Object,
  },
})

const table = ref(null)
const store = useStore()

const route = useRoute()

const form = ref({
  email: '',
  level: 1,
})

onMounted(() => {
  if (props.user) {
    form.value.email = user.email
    form.value.level = user.level
  }
})
</script>

<template>
  <div class="edit">
    <div class="edit__title">Изменить пользователя</div>
    <form class="edit__form">
      <label for="" class="edit__label">
        <span class="edit__subtitle">Email:</span>
        <input v-model="form.email" type="text" class="edit__input" />
      </label>
      <label class="edit__label">
        <span class="edit__subtitle">Уровень пользователя:</span>
        <select v-model="form.level" class="edit__select">
          <option value="1">Обычный</option>
          <option value="2">Модератор</option>
          <option value="3">Администратор</option>
        </select>
      </label>
      <common-button class="edit__button">Сохранить</common-button>
    </form>
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
  &__subtitle {
    margin-bottom: 10px;
    display: block;
  }
  &__select {
    border: 1px solid #b2b2b2;
    border-radius: 5px;
    width: 300px;
    height: 50px;
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
