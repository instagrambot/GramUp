// Inspired with Instabot API:
// https://github.com/instagrambot/instabot/blob/master/instabot/api/api.py
import { generate_uuid } from './helpers'
import querystring from 'querystring'

function is_user_id (user_id_or_username) {
  return !isNaN(user_id_or_username)
}

export const get_user_info = (self, user_id_or_username) => {
  if (is_user_id(user_id_or_username)) {
    const user_id = user_id_or_username
    return self.send_request(`users/${user_id}/info/`)
  } else {
    const username = user_id_or_username
    return self.send_request(`users/${username}/usernameinfo/`)
  }
}

export const logout = async (self) => {
  if (!self.is_logged_in) {
    return true
  }

  const result = await self.send_request('accounts/logout/')

  self.is_logged_in = !result
  return result
}

export const get_user_followers = (self, user_id, search_query = '', max_id = '') => {
  const rank_token = self.rank_token()

  const query_str = querystring.stringify({
    max_id,
    rank_token,
    query: search_query,
  })

  const url = `friendships/${user_id}/followers/?${query_str}`

  // const url = `friendships/${user_id}/followers/?max_id=${max_id}&rank_token=${rank_token}&`
  return self.send_request(url)
}

export const get_user_followings = (self, user_id, search_query = '', max_id = '') => {
  const rank_token = self.rank_token()
  const query_str = querystring.stringify({
    max_id,
    rank_token,
    query: search_query,
  })

  // `max_id=${max_id}&rank_token=${rank_token}&`
  // console.log('query_str', query_str)

  const url = `friendships/${user_id}/following/?${query_str}`

  return self.send_request(url)
}

export const get_user_feed = (self, user_id, max_id = '') => {
  const rank_token = self.rank_token()
  const url = `feed/user/${user_id}/?max_id=${max_id}&rank_token=${rank_token}&ranked_content=true&`
  return self.send_request(url)
}

export const search_hashtag = (self, hashtag) => {
  return self.send_request(`tags/search?q=${hashtag}`)
}

export const get_hashtag_feed = (self, hashtag, max_id = '') => {
  const rank_token = self.rank_token()
  const url = `feed/tag/${hashtag}/?max_id=${max_id}&rank_token=${rank_token}&ranked_content=true&`
  return self.send_request(url)
}

export const get_location_feed = (self, location_id, max_id = '') => {
  const rank_token = self.rank_token()
  const url = `feed/location/${location_id}/?max_id=${max_id}&rank_token=${rank_token}&ranked_content=true&`
  return self.send_request(url)
}

export const get_location_info = (self, location_id) => {
  return self.send_request(`locations/${location_id}/location_info/`)
}

export const get_location_story = (self, location_id) => {
  return self.send_request(`locations/${location_id}/story/`)
}

export const media_info = (self, media_id) => {
  return self.send_request(`media/${media_id}/info/`)
}

export const like = (self, media_id) => {
  return self.send_request(`media/${media_id}/like/`, {})
}

export const unlike = (self, media_id) => {
  return self.send_request(`media/${media_id}/unlike/`, {})
}

export const follow = (self, user_id) => {
  return self.send_request(`friendships/create/${user_id}/`, {})
}

export const unfollow = (self, user_id) => {
  return self.send_request(`friendships/destroy/${user_id}/`, {})
}

export const user_friendship = (self, user_id) => {
  return self.send_request(`friendships/show/${user_id}`, { user_id })
}

export const user_friendships = async (self, user_ids = []) => {
  const data = { user_ids: user_ids.join(',') }

  const default_data = await self.default_data()

  const _data = {
    ...default_data,
    ...data,
  }

  return self.send_request('friendships/show_many/', _data, { with_signature: false, form: true })
}

export const get_media_comments = (self, media_id, max_id='') => {
  const url = `media/${media_id}/comments/?max_id=${max_id}`

  return self.send_request(url)
}

export const comment = (self, media_id, comment_text) => {
  return self.send_request(`media/${media_id}/comment/`, { comment_text })
}

export const reply_to_comment = (self, media_id, comment_text, replied_to_comment_id) => {
  return self.send_request(`media/${media_id}/comment/`, { comment_text, replied_to_comment_id })
}

export const delete_comment = (self, media_id, comment_id) => {
  return self.send_request(`media/${media_id}/comment/${comment_id}/delete/`, {})
}

export const get_user_story_feed = (self, user_id) => {
  return self.send_request(`feed/user/${user_id}/story/`)
}

export const search_location = (self, query, lat = '', lng = '') => {
  const rank_token = self.rank_token()
  return self.send_request(`fbsearch/places/?rank_token=${rank_token}&query=${query}&lat=${lat}&lng=${lng}`)
}

export const __DEPRECATED__get_timeline = (self) => {
  return self.send_request(`feed/timeline/?rank_token=${self.rank_token()}&ranked_content=true`)
}

export const get_timeline = (self) => {
  const data = { is_prefetch: '0', is_pull_to_refresh: '0' }
  return self.send_request('feed/timeline/', data, { with_signature: false })
}

export const get_popular_feed = (self) => {
  return self.send_request(`feed/popular/?people_teaser_supported=1&rank_token=${self.rank_token()}&ranked_content=true`)
}

export const get_comment_likers = (self, comment_id) => {
  return self.send_request(`media/${comment_id}/comment_likers`)
}

export const get_media_likers = (self, media_id) => {
  return self.send_request(`media/${media_id}/likers`)
}

// DIRECT
export const get_inbox = (self) => {
  return self.send_request('direct_v2/inbox/?')
}

export const get_thread = (self, thread_id, cursor_id = '') => {
  return self.send_request(`direct_v2/threads/${thread_id}/?use_unified_inbox=true&${cursor_id ? `cursor=${cursor_id}` : ''}`)
}

export const get_direct_share = (self) => {
  return self.send_request('direct_share/inbox/?')
}

export const get_pending_inbox = (self) => {
  return self.send_request('direct_v2/pending_inbox/?persistentBadging=true&use_unified_inbox=true')
}

export const approve_pending_thread = async (self, thread_id) => {
  const data = await self.default_data()

  return self.send_request(`direct_v2/threads/${thread_id}/approve/`, data)
}

const _prepare_recipients = (users, thread_id = null, use_quotes = false) => {
  const result = {}

  if (users && users.join) {
    result.users = `[[${users.join(',')}]]`
  }

  if (thread_id) {
    result.thread = use_quotes ? `["${thread_id}"]` : `[${thread_id}]`
  }

  return result
}

export const send_direct_item = async (self, item_type = 'text', options = {}) => {
  const mutation_token = generate_uuid(true)

  const data = {
    // mutation_token,
    client_context: mutation_token,
    action: 'send_item',
  }

  const text = options.text || ''

  if (item_type === 'link') {
    data.link_text = text
    data.link_urls = JSON.stringify(options.urls) // json.dumps(options.get('urls'))
  } else if (item_type === 'text') {
    data.text = text
  } else if (item_type === 'media_share') {
    data.text = text
    data.media_type = options.media_type || 'photo' // options.get('media_type', 'photo')
    data.media_id = options.media_id || ''
  } else if (item_type === 'hashtag') {
    data.text = text
    data.Hashtag = options.hashtag || ''
  } else if (item_type === 'profile') {
    data.text = text
    data.profile_user_id = options.profile_user_id || ''
  }

  const { thread, users } = _prepare_recipients(options.users, options.thread, false)

  if (thread) {
    data.thread_ids = thread
  } else if (users) {
    data.recipient_users = users
  } else {
    return false
  }

  // data.update(self.default_data)
  const default_data = await self.default_data()

  const _data = {
    ...default_data,
    ...data,
  }

  console.log('_data', _data)

  return self.send_request(`direct_v2/threads/broadcast/${item_type}/`, _data, { with_signature: false, form: true })
}

export const mark_direct_seen = async (self, thread_id, thread_item_id) => {
  const data = {
    action: 'mark_seen',
    use_unified_inbox: true,
    thread_id: thread_id,
    item_id: thread_item_id,
  }

  const default_data = await self.default_data()

  const _data = {
    ...default_data,
    ...data,
  }

  return self.send_request(`direct_v2/threads/${thread_id}/items/${thread_item_id}/seen/`, _data, { with_signature: false, form: true })
}

// STORIES
export const get_user_reel = (self, user_id) => {
  const url = `feed/user/${user_id}/reel_media/`
  return self.send_request(url)
}

export const get_users_reel = async (self, user_ids) => {
  /*
  Input: user_ids - a list of user_id
  Output: dictionary: user_id - stories data.
  Basically, for each user output the same as after self.get_user_reel
  */
  const url = 'feed/reels_media/'
  user_ids = user_ids.map(id => `${id}`)
  return self.send_request(url, { user_ids })
}
//
// if (res) {
//   if (res.reels) {
//     return res.reels
//   } else {
//     return []
//   }
// } else {}
// if res:
//     if "reels" in self.last_json:
//         return self.last_json["reels"]
//     return []
// return []

export const see_reels = async (self, reels = []) => {
  /*
  Input - the list of reels jsons
  They can be aquired by using get_users_reel() or get_user_reel() methods
  */
  if (reels && !reels.join) {
    reels = [reels]
  }

  const story_seen = {}
  // now = int(time.time())
  const now = Math.floor(Date.now() / 1000)
  const randint = (a, b) => Math.floor(a + (b - a) * Math.random())

  // for i, story in enumerate(sorted(reels, key=lambda m: m['taken_at'], reverse=True)):
  //   story_seen_at = now - min(i + 1 + random.randint(0, 2), max(0, now - story['taken_at']))

  reels
    .sort((story1, story2) => story1.taken_at - story2.taken_at)
    .forEach((story, index) => {
      const story_seen_at = now - Math.min(index + 1 + randint(0, 2), Math.max(0, now - story.taken_at))

      story_seen[
        `${story.id}_${story.user.pk}`
        // '{0!s}_{1!s}'.format(story['id'], story['user']['pk'])
      ] = [
        `${story.taken_at}_${story_seen_at}`,
        // '{0!s}_{1!s}'.format(story['taken_at'], story_seen_at)
      ]
    })

  const default_data = await self.default_data()

  const _data = {
    ...default_data,
    reels: story_seen,
  }

  // data = self.json_data({
  //     'reels': story_seen,
  //     '_csrftoken': self.token,
  //     '_uuid': self.uuid,
  //     '_uid': self.user_id
  // })

  return self.send_request('media/seen/', _data, { with_signature: true, v2: true })
}

export const get_user_stories = (self, user_id) => {
  const url = `feed/user/${user_id}/story/`
  return self.send_request(url)
}

export const get_self_story_viewers = (self, story_id) => {
  const config = {} // ???
  const url = `media/${story_id}/list_reel_media_viewer/?supported_capabilities_new=${config.SUPPORTED_CAPABILITIES}`
  return self.send_request(url)
}

export const get_tv_suggestions = (self) => {
  const url = 'igtv/tv_guide/'
  return self.send_request(url)
}

export const get_hashtag_stories = (self, hashtag) => {
  const url = `tags/${hashtag}/story/`
  return self.send_request(url)
}

export const report = async (self, user_id, source_name = 'profile') => {
  const default_data = await self.default_data()

  const _data = {
    ...default_data,
    reason_id: 1,
    user_id: user_id,
    source_name: source_name,
    is_spam: true,
  }

  return self.send_request(`users/${user_id}/flag_user/`, _data, { with_signature: false, form: true })
}
//
// const search_users = (self, query) => {
//
//   url = (
//   "users/search/?ig_sig_key_version={sig_key}"
//   "&is_typeahead=true&query={query}&rank_token={rank_token}"
//   )
//   return self.send_request(
//   url.format(
//   sig_key=config.SIG_KEY_VERSION,
//   query=query,
//   rank_token=self.rank_token
//   )
// )
// }


// Save Bookmark

export const get_saved_medias = (self) => {
  return self.send_request(`feed/saved`)
}

// From profile => "module_name":"feed_contextual_profile"
// From home/feed => "module_name":"feed_timeline"
export const save_media = (self, media_id, module_name = 'feed_timeline') => {
  // const data = {"module_name": module_name}
  return self.send_request(`media/${media_id}/save/`, { module_name })
}

export const unsave_media = (self, media_id) => {
  return self.send_request(`media/${media_id}/unsave/`, {})
}

export const get_url = (self, url) => {
  return self.send_request(url, null, { doAppendRootURL: false })
}

export const like_web = (self, media_id) => {
  return self.send_request(`likes/${media_id}/like/`, {}, { web: true, doPrefix: false })
}

export const reels_tray = (self, url) => {
  return self.send_request('feed/reels_tray/', null, { doPrefix: true })
}