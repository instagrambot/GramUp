export const API_URL = 'https://i.instagram.com/api/v1/'
export const API_URL_v2 = 'https://i.instagram.com/api/v2/'
export const API_URL_web = 'https://www.instagram.com/web/'

export const LOGIN_URL = API_URL + 'accounts/login/'

// # I have more devices here:
// # https://github.com/instagrambot/instabot/blob/72d10447986db39ac95f3d0980936d9c08428b02/instabot/api/devices.py
// # idk which to use, let's for now use this one, because it is just works

export const DEFAULT_DEVICE = 'one_plus_7'

export const DEVICES = {
  // Released on August 2019
  one_plus_7: {
    instagram_version: '103.1.0.15.119',
    android_version: 28,
    android_release: '9.0',
    dpi: '420dpi',
    resolution: '1080x2260',
    manufacturer: 'OnePlus',
    device: 'GM1903',
    model: 'OnePlus7',
    cpu: 'qcom',
  },
  // Released on March 2016
  samsung_galaxy_s7: {
    instagram_version: '26.0.0.10.86',
    android_version: 24,
    android_release: '7.0',
    dpi: '640dpi',
    resolution: '1440x2560',
    manufacturer: 'samsung',
    device: 'SM-G930F',
    model: 'herolte',
    cpu: 'samsungexynos8890',
  },
  // Released on January 2017
  huawei_mate_9_pro: {
    instagram_version: '26.0.0.10.86',
    android_version: 24,
    android_release: '7.0',
    dpi: '640dpi',
    resolution: '1440x2560',
    manufacturer: 'HUAWEI',
    device: 'LON-L29',
    model: 'HWLON',
    cpu: 'hi3660',
  },
  // Released on February 2018
  samsung_galaxy_s9_plus: {
    instagram_version: '96.0.0.28.114',
    android_version: 24,
    android_release: '7.0',
    dpi: '640dpi',
    resolution: '1440x2560',
    manufacturer: 'samsung',
    device: 'SM-G965F',
    model: 'star2qltecs',
    cpu: 'samsungexynos9810',
  },
  // Released on November 2016
  one_plus_3t: {
    instagram_version: '26.0.0.10.86',
    android_version: 24,
    android_release: '7.0',
    dpi: '380dpi',
    resolution: '1080x1920',
    manufacturer: 'OnePlus',
    device: 'ONEPLUS A3010',
    model: 'OnePlus3T',
    cpu: 'qcom',
  },
  // Released on April 2016
  lg_g5: {
    instagram_version: '26.0.0.10.86',
    android_version: 23,
    android_release: '6.0.1',
    dpi: '640dpi',
    resolution: '1440x2392',
    manufacturer: 'LGE/lge',
    device: 'RS988',
    model: 'h1',
    cpu: 'h1',
  },
  // Released on June 2016
  zte_axon_7: {
    instagram_version: '26.0.0.10.86',
    android_version: 23,
    android_release: '6.0.1',
    dpi: '640dpi',
    resolution: '1440x2560',
    manufacturer: 'ZTE',
    device: 'ZTE A2017U',
    model: 'ailsa_ii',
    cpu: 'qcom',
  },
  // Released on March 2016
  samsung_galaxy_s7_edge: {
    instagram_version: '26.0.0.10.86',
    android_version: 23,
    android_release: '6.0.1',
    dpi: '640dpi',
    resolution: '1440x2560',
    manufacturer: 'samsung',
    device: 'SM-G935',
    model: 'hero2lte',
    cpu: 'samsungexynos8890',
  },
}

export const DEVICE = DEVICES[DEFAULT_DEVICE]

export const REQUEST_HEADERS = {
  'X-IG-Capabilities': '3brTBw==', // base64.b64encode(struct.pack('<i', 131316445)).decode('ascii')
  'X-IG-Connection-Type': 'WIFI',
  'X-FB-HTTP-Engine': 'Liger',
  Accept: '*/*',
  Origin: 'https://www.instagram.com',
  Referer: 'https://www.instagram.com',

  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'sec-gpc': 1,
  'dnt': 1,

  'Accept-Language': 'en-US',
  'Content-type': 'application/json; charset=utf-8',

  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',

  'cross-origin-opener-policy': 'same-origin-allow-popups;report-to="coop"',
  'Accept-Encoding': 'gzip,deflate',
  Connection: 'Keep-Alive',
  Cookie2: '$Version=1',

  // xhr.js:126 Refused to set unsafe header "User-Agent"
  // xhr.js:126 Refused to set unsafe header "Connection"
  // xhr.js:126 Refused to set unsafe header "Accept-Encoding"
  // xhr.js:126 Refused to set unsafe header "Cookie2"

  // 'X-Instaweb-Accept-Encoding': 'gzip,deflate',
  // 'X-Instaweb-Connection': 'Keep-Alive',
  // 'X-Instaweb-Cookie2': '$Version=1',
}

// Instagram Signature Key (v117.0.0.28.123) ARM and x86
// from https://github.com/itsMoji/Instagram_SSL_Pinning
// v117.0.0.28.123: a86109795736d73c9a94172cd9b736917d7d94ca61c9101164894b3f0d43bef4
// v130.0.0.31.121: f0bdfd5332d66a64d5e04965e6a7ade67c4e2cfc57ea38f0083c0400640a5e20
export const IG_SIG_KEY = 'f0bdfd5332d66a64d5e04965e6a7ade67c4e2cfc57ea38f0083c0400640a5e20'

export const IG_VERSION = '130.0.0.31.121'

// console.log(" ---> Preparing consts:")

export const USER_AGENT_BASE = (params) =>
    `Instagram ${IG_VERSION} ` +
  `Android (${params.android_version}/${params.android_release}; ` +
  `${params.dpi}; ${params.resolution}; ${params.manufacturer}; ` +
  `${params.device}; ${params.model}; ${params.cpu}; en_US)`
