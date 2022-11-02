import { Server } from 'socket.io'
import { Server as httpServer } from 'http'

export let wsServer: Server

export const initializeWsServer = (httpServer: httpServer): void => {
  wsServer = new Server(httpServer, {
    path: '/api/',
  })
}
