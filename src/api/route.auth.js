import { xfetch } from '~/core/fetch-system'
import { SERVER_ENDPOINT } from './_global'

/**
 * @param {string} username
 * @param {string} surname
 */
export function get_token(formBody) {
  console.log(formBody)
  return xfetch.$post(`${SERVER_ENDPOINT}/auth/get_token`, formBody, {
    type: 'application/x-www-form-urlencoded;charset=UTF-8',
  })
}

/**
 * @param {string} username
 * @param {string} surname
 */
export function register(email, password, level) {
  return xfetch.$post(
    `${SERVER_ENDPOINT}/auth/sign_up`,
    {
      email,
      password,
      level,
    },
    { token: null }
  )
}
