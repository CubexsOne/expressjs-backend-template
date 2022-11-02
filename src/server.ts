import 'reflect-metadata'
import express from 'express'
import { createServer } from 'http'
import logger from './utils/logger'
import { AppDataSource } from './utils/typeorm'
import controller from './controller'
import { initializeWsServer } from './utils/ws-server'

const App = express()
const httpServer = createServer(App)
initializeWsServer(httpServer)

App.use(express.json())
App.use('/api', controller)

httpServer.listen(3000, () => {
  AppDataSource.initialize()
  logger.info('Server is running...')
})
