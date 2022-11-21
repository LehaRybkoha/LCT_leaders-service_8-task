import { xfetch } from '~/core/fetch-system'
import { SERVER_ENDPOINT } from './_global'

export const getAllUsers = async (token, offset = 0, limit = 100) => {
  return xfetch.$get(
    `${SERVER_ENDPOINT}/admin/users?offset=${offset}&limit=${limit}`,
    { token }
  )
}

export const getUserById = async (token, id) => {
  return xfetch.$get(`${SERVER_ENDPOINT}/admin/users/${id}`, { token })
}

export const editUser = async (token, id, level) => {
  return xfetch.$post(
    `${SERVER_ENDPOINT}/admin/users/${id}/edit?level=${level}`,
    {},
    { token }
  )
}
