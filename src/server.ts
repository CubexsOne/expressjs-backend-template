import 'reflect-metadata'
import express from 'express'
import controller from './controller'
import logger from './utils/logger'
import { AppDataSource } from './utils/typeorm'

const App = express()
App.use(express.json())

App.use('/api', controller)
App.listen(3000, () => {
  AppDataSource.initialize()
  logger.info('Server is running...')
})
