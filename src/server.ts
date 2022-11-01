import express from 'express'
import controller from './controller'
import logger from './utils/logger'

const App = express()
App.use(express.json())

App.use('/api', controller)
App.listen(3000, () => {
  logger.info('Server is running...')
})
