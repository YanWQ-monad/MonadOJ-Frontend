export const websocket = (url, data) => {
  const secure = location.protocol === 'https:' ? 's' : ''
  let uri = 'ws' + secure + '://' + location.host + url
  if (data) {
    const params = new URLSearchParams(Object.entries(data))
    uri = uri + '?' + params.toString()
  }
  let ws = new WebSocket(uri)
  return ws
}

export const ajax = (url, method, data, options) => {
  let body = Object.assign({
    method: method,
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {}
  }, options)

  if (method === 'POST' || method === 'PUT') {
    if (data instanceof FormData) {
      body.body = data
    } else {
      body.body = JSON.stringify(data)
      body.headers['content-type'] = 'application/json'
    }
  } else if (data) {
    const params = new URLSearchParams(Object.entries(data))
    url = url + '?' + params.toString()
  }

  return fetch(url, body).then(resp => resp.json()).then(data => {
    if (data.error !== null) {
      return Promise.reject(data)
    }
    return data
  }, reason => {
    return Promise.reject(reason)
  })
}
