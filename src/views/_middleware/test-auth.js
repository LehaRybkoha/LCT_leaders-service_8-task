import { get_token } from '~/api/route.auth'
import { useStore } from '~/stores/stores.main'

export default async ({ to, from, next, redirect }) => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  const level = localStorage.getItem('level')

  const store = useStore()

  const makeFormData = () => {
    const user_data = {
      username: JSON.parse(username),
      password: JSON.parse(password),
    }

    const formBody = []
    if (!user_data.password || !user_data.username) {
      return null
    }
    for (let property in user_data) {
      let encodedKey = encodeURIComponent(property)
      let encodedValue = encodeURIComponent(user_data[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    return formBody.join('&')
  }

  if (!username || !password || !level) {
    redirect('/auth')
  } else if (username && password && level) {
    const data = await get_token(makeFormData())
    const { access_token, user_id, level } = data

    store.$state.access_token = access_token
    store.$state.user_id = user_id
    store.$state.level = level
    store.$state.username = JSON.parse(username)
    store.$state.password = JSON.parse(password)
  }
}
