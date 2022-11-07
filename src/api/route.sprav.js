import { xfetch } from '~/core/fetch-system'
import { SERVER_ENDPOINT } from './_global'

export const getTsn = async (token, offset = 0, limit = 100) => {
  return xfetch.$get(
    `${SERVER_ENDPOINT}/sprav/tsn?offset=${offset}&limit=${limit}`,
    { token }
  )
}

export const getSn = async (token, offset = 0, limit = 100) => {
  return xfetch.$get(
    `${SERVER_ENDPOINT}/sprav/sn?offset=${offset}&limit=${limit}`,
    { token }
  )
}

export const getSpgz = async (token, offset = 0, limit = 100) => {
  return xfetch.$get(
    `${SERVER_ENDPOINT}/sprav/spgz?offset=${offset}&limit=${limit}`,
    { token }
  )
}

export const getKpgz = async (token, offset = 0, limit = 100) => {
  return xfetch.$get(
    `${SERVER_ENDPOINT}/sprav/kpgz?offset=${offset}&limit=${limit}`,
    { token }
  )
}
