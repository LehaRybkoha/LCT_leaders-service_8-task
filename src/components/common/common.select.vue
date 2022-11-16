<script setup></script>

<template>
  <div class="select">
    <div class="select__input">
      <p class="select__filled">FILLED TEXT</p>
    </div>
    <ul class="select__list">
      <li class="select__item">
        <p class="select__text">TTTEEEST TEEEXT</p>
      </li>
      <li class="select__item">
        <p class="select__text">TTTEEEST TEEEXT TEEEXTTEEEXT TEEEXT</p>
      </li>

      <li class="select__item">
        <p class="select__text">TTTEEEST TEEEXT</p>
      </li>
      <li class="select__item">
        <p class="select__text">TTTEEEST TEEEXT</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.select {
  position: relative;
  &__input {
    border: 1px solid $primary-grey;
    border-radius: 5px 5px 0 0;
    padding: 10px 20px;
    text-align: center;
    border-bottom: none;
    color: $accent-purple;
  }
  &__item {
    padding: 10px 20px;
    border-bottom: 1px solid $border-color;
    color: $primary-grey;
    background: #ffffff;
  }
  &__list {
    position: absolute;
    width: 100%;
    border: 1px solid $primary-grey;
    border-top: none;
    border-radius: 0 0 5px 5px;
    left: 0;
    right: 0;
  }
}
</style>
