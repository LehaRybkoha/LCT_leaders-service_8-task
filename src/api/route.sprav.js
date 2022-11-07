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

export const getTsnId = async (token, id) => {
  return xfetch.$get(`${SERVER_ENDPOINT}/sprav/tsn?id=${id}`, { token })
}

export const getSnId = async (token, id) => {
  return xfetch.$get(`${SERVER_ENDPOINT}/sprav/sn?id=${id}`, { token })
}

export const getSpgzId = async (token, id) => {
  return xfetch.$get(`${SERVER_ENDPOINT}/sprav/spgz?id=${id}`, { token })
}

export const getKpgzId = async (token, id) => {
  return xfetch.$get(`${SERVER_ENDPOINT}/sprav/kpgz?id=${id}`, { token })
}
