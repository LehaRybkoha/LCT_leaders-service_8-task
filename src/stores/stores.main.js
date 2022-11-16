import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    access_token: null,
    user_id: null,
    username: null,
    password: null,
    level: 1,
    categoriesData: null,
  }),
  actions: {},
})
