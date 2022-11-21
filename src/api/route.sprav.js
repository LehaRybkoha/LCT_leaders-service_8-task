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
  return xfetch.$get(`${SERVER_ENDPOINT}/sprav/tsn/${id}`, { token })
}

export const getSnId = async (token, id) => {
  return xfetch.$get(`${SERVER_ENDPOINT}/sprav/sn/${id}`, { token })
}

export const getSpgzId = async (token, id) => {
  return xfetch.$get(`${SERVER_ENDPOINT}/sprav/spgz/${id}`, { token })
}

export const getKpgzId = async (token, id) => {
  return xfetch.$get(`${SERVER_ENDPOINT}/sprav/kpgz/${id}`, { token })
}

export const editSn = async (
  token,
  user_id,
  { id, code, text, price, uom }
) => {
  return xfetch.$post(
    `${SERVER_ENDPOINT}/sprav/sn/${user_id}/edit`,
    { id, code, text, price, uom },
    { token }
  )
}

export const editKpgz = async (token, user_id, { id, name }) => {
  return xfetch.$post(
    `${SERVER_ENDPOINT}/sprav/kpgz/${user_id}/edit`,
    { id, name },
    { token }
  )
}

export const editSpgz = async (
  token,
  user_id,
  { id, name, okpd, okpd2, uom, description, data_id }
) => {
  return xfetch.$post(
    `${SERVER_ENDPOINT}/sprav/spgz/${user_id}/edit`,
    { id, name, okpd: '', okpd2, uom, description, data_id },
    { token }
  )
}

export const editTsn = async (
  token,
  user_id,
  { id, code, text, price, uom }
) => {
  return xfetch.$post(
    `${SERVER_ENDPOINT}/sprav/tsn/${user_id}/edit`,
    { id, code, text, price, uom },
    { token }
  )
}
