import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '~/views/home'
import Auth from '~/views/auth'
import Team from '~/views/team'

export default createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes: [...HomeView, ...Auth, ...Team],
})
