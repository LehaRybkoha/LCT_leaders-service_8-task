<script setup>
import { Default, Empty } from '~/layout'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const layouts = {
  default: Default,
  empty: Empty,
}

const route = useRoute()
const computedLayout = computed(() => {
  return layouts[route.meta.layout || 'default']
})
</script>

<template>
  <component :is="computedLayout">
    <router-view />
  </component>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
