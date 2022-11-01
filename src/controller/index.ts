import { Router } from 'express'
import exampleController from './example.controller'

const controller = Router()

controller.use('/example', exampleController)

export default controller
