import { logger } from './Logger.js'

const SOCKET_EVENTS = {
  connection: 'connection',
  connected: 'connected',
  disconnect: 'disconnect',
  authenticate: 'authenticate',
  authenticated: 'authenticated',
  userConnected: 'userConnected',
  userDisconnected: 'userDisconnected',
  error: 'error'
}

export class SocketHandler {
  /**
   * @param {String} url
   */
  // constructor(requiresAuth = false, url = baseURL) {
  //   // @ts-ignore
  //   // eslint-disable-next-line no-undef
  //   this.socket = io(url || baseURL)
  //   this.requiresAuth = requiresAuth
  //   this.queue = []
  //   this.authenticated = false
  //   this
  //     .on(SOCKET_EVENTS.connected, this.onConnected)
  //     .on(SOCKET_EVENTS.authenticated, this.onAuthenticated)
  //     .on(SOCKET_EVENTS.error, this.onError)
  // }

  on(event, fn) {
    this.socket.on(event, fn.bind(this))
    return this
  }

  onConnected(connection) {
    logger.log('[SOCKET_CONNECTION]', connection)
    this.connected = true
    this.playback()
  }

  onAuthenticated(auth) {
    logger.log('[SOCKET_AUTHENTICATED]', auth)
    this.authenticated = true
    this.playback()
  }

  authenticate(bearerToken) {
    this.socket.emit(SOCKET_EVENTS.authenticate, bearerToken)
  }

  onError(error) {
    logger.error('[SOCKET_ERROR]', error)
  }

  enqueue(action, payload) {
    logger.log('[ENQUEING_ACTION]', { action, payload })
    this.queue.push({ action, payload })
  }

  playback() {
    logger.log('[SOCKET_PLAYBACK]')
    const playback = [...this.queue]
    this.queue = []
    playback.forEach(e => {
      this.emit(e.action, e.payload)
    })
  }

  emit(action, payload = undefined) {
    if (this.requiresAuth && !this.authenticated) {
      return this.enqueue(action, payload)
    }
    if (!this.connected) {
      return this.enqueue(action, payload)
    }
    this.socket.emit(action, payload)
  }
}
