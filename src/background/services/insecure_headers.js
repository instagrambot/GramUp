import { MODIFIED_HEADERS_URLS } from '../../shared/constants'

const PREFIX = 'X-Instaweb-'

chrome.webRequest.onHeadersReceived.addListener(
  function (info) {
    console.log('info receive headers', info)

    const headers = info.responseHeaders

    const origin = headers.find(header => header.name === 'cross-origin-opener-policy')

    origin && (origin.value = 'same-origin-allow-popups;report-to="coop"')

    console.log('info receive headers', headers)

    return {
      responseHeaders: headers,
    }
  },
  // Request filter
  {
    // Modify the headers for these pages
    urls: [
      ...MODIFIED_HEADERS_URLS,
    ],
  },
  ['blocking', 'responseHeaders'],
)

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (info) {
    // xhr.js:126 Refused to set unsafe header "User-Agent"
    // xhr.js:126 Refused to set unsafe header "Connection"
    // xhr.js:126 Refused to set unsafe header "Accept-Encoding"
    // xhr.js:126 Refused to set unsafe header "Cookie2"

    const headers = info.requestHeaders

    console.log('headers', headers)

    const new_headers = headers
      .filter(header => header.name.includes(PREFIX))
      .map(header => {
        return {
          name: header.name.replace(PREFIX, ''),
          value: header.value,
        }
      })

    console.log('new headers', new_headers)

    headers.forEach(header => {
      const new_header = new_headers.find(_ => _.name.toLowerCase() === header.name.toLowerCase())

      if (new_header) {
        console.log(`changing header '${header.name}' to '${new_header.name}':`, header.value, new_header.value)
        header.value = new_header.value
      }
    })

    console.log('edited headers', headers)

    return {
      requestHeaders: headers,
    }
  },
  // Request filter
  {
    // Modify the headers for these pages
    urls: [
      ...MODIFIED_HEADERS_URLS,
    ],
  },
  ['blocking', 'requestHeaders'],
)
