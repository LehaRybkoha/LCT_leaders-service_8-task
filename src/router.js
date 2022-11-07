import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '~/views/home'
import Auth from '~/views/auth'
import Team from '~/views/team'
import Spravs from '~/views/spravs'

export default createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes: [...HomeView, ...Auth, ...Team, ...Spravs],
})
