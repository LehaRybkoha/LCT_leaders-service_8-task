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

export function patch_smeta_api(id, patches, token) {
  return xfetch.$post(
    `${SERVER_ENDPOINT}/smeta/patch_smeta/${id}`,
    { patches: [...patches] },
    {
      token,
      is_file: true,
    }
  )
}

export const patch_smeta = async (id, patches, token) => {
  const parseFile = (res) => {
    console.log('res', res)
    let filename = ''
    const disposition = res.headers.get('content-disposition')
    filename = disposition.split(/;(.+)/)[1].split(/=(.+)/)[1]
    if (filename.toLowerCase().startsWith("utf-8''"))
      filename = decodeURIComponent(filename.replace("utf-8''", ''))
    else filename = filename.replace(/['"]/g, '')
    return filename
  }

  const downloadFile = (blob, filename) => {
    let url = window.URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const res = await patch_smeta_api(id, patches, token)

  if (res.status !== 200) return

  const filename = parseFile(res)

  const blob = await res.blob()

  downloadFile(blob, filename)
}
