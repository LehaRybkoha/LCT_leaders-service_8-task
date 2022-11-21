<script setup></script>

<template>
  <div class="loader">
    <div class="loader__element">
      <div class="loader__circle"></div>
      <div class="loader__spin"></div>
      <div class="loader__spin"></div>
      <div class="loader__spin"></div>
      <div class="loader__spin"></div>
      <div class="loader__spin"></div>
      <div class="loader__spin"></div>
      <div class="loader__spin"></div>
      <div class="loader__spin"></div>
      <div class="loader__spin"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotate(0deg) scale(1);
  }
  to {
    transform: rotate(360deg) scale(1.3);
  }
}
.loader {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &__element {
    position: relative;
    width: 80px;
    height: 80px;
    background: $accent-purple;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: spin 2s ease-in-out infinite alternate;
  }
  &__circle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #ffffff;
    position: absolute;
  }
  &__spin {
    background: #ffffff;
    width: 10px;
    height: 95px;
    z-index: 1;
    position: absolute;
    // &:nth-child(2) {
    //   transform: rotate(40deg);
    // }
    @for $i from 2 through 9 {
      &:nth-child(#{$i}) {
        transform: rotate(#{$i * 30}deg);
      }
    }
  }
}
</style>
