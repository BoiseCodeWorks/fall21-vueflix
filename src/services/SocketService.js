import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  // NOTE remove comments to enable sockets
  // constructor() {
  //   super()
  //   this
  //     .on('error', this.onError)
  // }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()
