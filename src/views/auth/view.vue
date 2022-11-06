<script setup>
import { CommonButton } from '~/components/common'
import { useStore } from '~/stores/stores.main'
import { computed, ref } from 'vue'
import { get_token, register } from '~/api/route.auth'
import router from '~/router'

const store = useStore()

// await register('1232111', '123456789', 3)
//   const { access_token, user_id } = await get_token(makeFormData())
//   store.$state.access_token = access_token
//   store.$state.user_id = user_id

const form = ref({
  username: '',
  password: '',
})

const makeFormData = () => {
  console.log(form.value.username)
  const user_data = {
    username: form.value.username,
    password: form.value.password,
    level: 1,
  }

  const formBody = []
  if (!user_data.password) {
    return null
  }
  for (let property in user_data) {
    let encodedKey = encodeURIComponent(property)
    let encodedValue = encodeURIComponent(user_data[property])
    formBody.push(encodedKey + '=' + encodedValue)
  }
  return formBody.join('&')
}

const registerUser = async () => {
  const { username, password } = form.value
  await register(username, password, 1)

  const d = await get_token(makeFormData())
  store.$state.access_token = d.access_token
  store.$state.user_id = d.user_id
  store.$state.username = form.value.username
  store.$state.password = form.value.password

  localStorage.setItem('username', JSON.stringify(form.value.username))
  localStorage.setItem('password', JSON.stringify(form.value.password))

  if (store.$state.access_token && store.$state.user_id) {
    router.push('/')
  }
}

const loginUser = async () => {
  const { access_token, user_id } = await get_token(makeFormData())
  store.$state.access_token = access_token
  store.$state.user_id = user_id
  store.$state.username = form.value.username
  store.$state.password = form.value.password

  localStorage.setItem('username', JSON.stringify(form.value.username))
  localStorage.setItem('password', JSON.stringify(form.value.password))

  if (store.$state.access_token && store.$state.user_id) {
    router.push('/')
  }
}

const isRegistration = ref(false)
</script>

<template>
  <div class="auth">
    <div class="auth__content">
      <h1 class="auth__title" v-if="isRegistration">Регистрация</h1>
      <h1 class="auth__title" v-else>Войти</h1>
      <label class="auth__label">
        <div class="auth__subtitle">Имя пользователя:</div>
        <input v-model="form.username" type="text" class="auth__input" />
      </label>
      <label class="auth__label">
        <div class="auth__subtitle">Пароль:</div>
        <input v-model="form.password" type="text" class="auth__input" />
      </label>
      <!-- <label class="auth__label">
        <div class="auth__subtitle">Уовень пользователя:</div>
        <input type="text" class="auth__input" />
      </label> -->
      <common-button
        @click="registerUser"
        class="auth__button"
        v-if="isRegistration"
        >Зарегистрироваться</common-button
      >
      <common-button class="auth__button" @click="loginUser" v-else
        >Войти</common-button
      >

      <div class="auth__switch" @click="isRegistration = !isRegistration">
        <common-button class="auth__button-sw" v-if="isRegistration"
          >Уже есть аккаунт?</common-button
        >
        <common-button class="auth__button-sw" v-else
          >Нет аккаунта?</common-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  background: #f5f5f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &__button {
    margin: 0 auto;
    &-sw {
      background-color: #f5f5f5;
      color: #000000;
      border: 1px solid $accent-purple;
    }
  }
  &__switch {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__title {
    @include tg-h5-bold;
    color: #000000;
    text-align: center;
    margin-bottom: 30px;
  }
  &__subtitle {
    margin-bottom: 10px;
  }
  &__content {
    border: 1px solid #b2b2b2;
    border-radius: 5px;
    padding: 20px;
    width: 500px;
    flex-direction: column;
  }
  &__input {
    border: 1px solid #b2b2b2;
    border-radius: 5px;
    display: block;
    padding: 10px;
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
