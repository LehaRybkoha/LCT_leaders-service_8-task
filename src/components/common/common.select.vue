<script setup></script>

<template>
  <div class="select">
    <div class="select__input">
      <p class="select__filled">FILLED TEXT</p>
    </div>
    <ul class="select__list">
      <li class="select__item">kjhjkhkj</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.select {
  position: relative;
  &__input {
    border: 1px solid #000000;
    border-radius: 5px;
    padding: 10px 20px;
    text-align: center;
  }
  &__list {
    position: absolute;
    width: 100%;
    border: 1px solid #000000;
    border-radius: 5px;
    left: 0;
    right: 0;
  }
}
</style>
