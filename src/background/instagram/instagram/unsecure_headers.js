export const FORBIDDEN_HEADERS = [
  'Accept-Encoding',
  'Connection',
  'Cookie2',
  'User-Agent',
  'Origin',
  'Referer',
  'sec-fetch-dest',
  'sec-fetch-mode',
  'sec-fetch-site',
  'sec-gpc',
  'dnt',
]

export const PREFIX = 'X-Instaweb-'

export const prefixUnsecureHeaders = (headers, params) => {
  for (const header in headers) {
    if (FORBIDDEN_HEADERS.includes(header)) {
      const prefixedHeader = PREFIX + header

      headers[prefixedHeader] = headers[header]

      if (params === 'replace') {
        delete headers[header]
      }
    }
  }
  return headers
}

export default prefixUnsecureHeaders
