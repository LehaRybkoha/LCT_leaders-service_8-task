import { xfetch } from '~/core/fetch-system'
import { SERVER_ENDPOINT } from './_global'

/**
 * @param {file} file
 */
export function upload_smeta(id, file, token) {
  return xfetch.$post(`${SERVER_ENDPOINT}/smeta/parse_smeta/${id}`, file, {
    token,
  })
}

export function patch_smeta(id, patches, token) {
  return xfetch.$post(
    `${SERVER_ENDPOINT}/smeta/patch_smeta/${id}`,
    { patches: [...patches] },
    {
      token,
    }
  )
}
