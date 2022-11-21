<script setup>
import { CommonButton, CommonInput } from '~/components/common'
import { useStore } from '~/stores/stores.main'
import { computed, ref } from 'vue'
import { get_token, register } from '~/api/route.auth'
import router from '~/router'

const store = useStore()

const form = ref({
  username: '',
  password: '',
})

const is_error_user = computed(() => !!form.value.username.length)
const is_error_pass = computed(() => !!form.value.password.length)
const isFetchError = ref(false)

const makeFormData = () => {
  console.log(form.value.username)
  const user_data = {
    username: form.value.username,
    password: form.value.password,
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
  store.$state.level = d.level
  store.$state.username = form.value.username
  store.$state.password = form.value.password

  localStorage.setItem('username', JSON.stringify(form.value.username))
  localStorage.setItem('password', JSON.stringify(form.value.password))
  localStorage.setItem('level', JSON.stringify(d.level))

  if (store.$state.access_token && store.$state.user_id) {
    router.push('/')
  }
}

const loginUser = async () => {
  if (!is_error_user.value || !is_error_pass.value) {
    return
  }

  const data = await get_token(makeFormData())

  if (!data) {
    isFetchError.value = true
  } else {
    isFetchError.value = false
  }

  const { access_token, user_id, level } = data

  store.$state.access_token = access_token
  store.$state.user_id = user_id
  store.$state.level = level
  store.$state.username = form.value.username
  store.$state.password = form.value.password

  localStorage.setItem('username', JSON.stringify(form.value.username))
  localStorage.setItem('password', JSON.stringify(form.value.password))
  localStorage.setItem('level', JSON.stringify(level))

  if (store.$state.access_token && store.$state.user_id) {
    router.push('/')
  }
}

const isRegistration = ref(false)
</script>

<template>
  <div class="auth">
    <div class="auth__content">
      <p>SUPER USER: email - admin password - 12345678</p>
      <p>Moderator: email - moderator password - 12345678</p>
      <p>Simple user: email - user password - 12345678</p>
      <h1 class="auth__title" v-if="isRegistration">Регистрация</h1>
      <h1 class="auth__title" v-else>Войти</h1>
      <label class="auth__label">
        <div class="auth__subtitle">Email:</div>
        <common-input
          v-model="form.username"
          :is-errored="!is_error_user"
          :value="form.username"
          class="auth__input"
        />
      </label>
      <label class="auth__label">
        <div class="auth__subtitle">Пароль:</div>
        <common-input
          v-model="form.password"
          :is-errored="!is_error_user"
          :value="form.password"
          class="auth__input"
        />
      </label>
      <p class="auth__error" v-if="isFetchError">
        Пожалуйста, проверьте правильность введенных данных
      </p>
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
  &__error {
    color: red;
    margin: 20px 0;
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
    border: 1px solid $border-color;
    border-radius: 5px;
    padding: 20px;
    width: 500px;
    flex-direction: column;
  }
  &__input {
    border: 1px solid $border-color;
    border-radius: 5px;
    display: block;
    padding: 10px;
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
