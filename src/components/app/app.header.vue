<script setup>
import { IconLogout } from '~/components/icons'
</script>

<template>
  <header class="header">
    <h1 class="header__title">Сервис для парсинга смет</h1>
    <div class="user">
      <h3 class="user__name">TEST NME</h3>
      <div class="user__logout">
        <icon-wrapper width="30" height="30">
          <icon-logout />
        </icon-wrapper>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: $primary-white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__title {
    margin-left: 50px;
    @include tg-18-normal;
  }
}
.user {
  display: flex;
  align-items: center;
  &__name {
    @include tg-14-medium;
    margin-right: 32px;
  }
  &__logout {
    cursor: pointer;
    padding: 32px 20px;
    background-color: $accent-purple;
  }
}
</style>
