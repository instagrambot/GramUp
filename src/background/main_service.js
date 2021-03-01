import instagram from './instagram'
import ChromeStorage from './storage/chrome_storage'
import ChromeHistory from './storage/chrome_history'

import stats from './storage/instagram_stats'
import { getCredentials, clearCredentials } from '../shared/credentials'

import { DEFAULT_EXTENSION_CONFIG } from '../shared/constants'
import { tryCatch } from '../shared/helpers'

import { connectWebsocket } from './ws'
import processMessage from './process'

window.instagram = instagram
window.instagram.history = new ChromeHistory()
window.stats = stats

const replyToRequest = (sender, req_id, data) => {
  console.log('reply to', req_id, data)
  if (sender.tab) {
    return chrome.tabs.sendMessage(sender.tab.id, { req_id, ...data })
  } else {
    return chrome.runtime.sendMessage(sender.id, { req_id, ...data })
  }
}

(async () => {
  const { config = DEFAULT_EXTENSION_CONFIG } = await tryCatch(
    () => ChromeStorage.get('config'),
    (err) => null,
  )

  chrome.runtime.onConnectExternal.addListener(async port => {
    console.log('connect', port)

    port.onMessage.addListener(async (message, sender) => {
      console.log('message', message)
      console.log('sender', sender)

      const { req_id } = message

      const sendResponse = data => port.postMessage({ req_id, ...data })

      await processMessage(instagram, config, message, sendResponse)
    })
  })

  chrome.runtime.onMessageExternal.addListener(
    async (message, sender, sendResponse) => {
      console.log('message', message)
      console.log('sender', sender)

      await processMessage(instagram, config, message, sendResponse)
    },
  )

  chrome.runtime.onMessage.addListener(async (message, sender) => {
    console.log('message', message)
    console.log('sender', sender)

    const { req_id } = message

    const sendResponse = data => replyToRequest(sender, req_id, data)

    await processMessage(instagram, config, message, sendResponse)
  })

  const { username, password } = await getCredentials() || {}

  if (!username || !password) {
    console.log('No credentials!')
    await clearCredentials()

    const user = await instagram.login_via_cookie()
    console.log('user', user)

    instagram._init_handler()
  } else {
    try {
      const user = await instagram.login(username, password)
      console.log('user', user)
    } catch (err) {
      console.log('clearing wrong credentials for', username)
      await clearCredentials()
    } finally {
      instagram._init_handler()
    }
  }

  const { connection } = await connectWebsocket(instagram, config)

  window.connection = connection
})()
