import { Request, Response, Router } from 'express'

const exampleController = Router()

exampleController.get('/get', (req: Request, res: Response) => {
  res.status(200).send()
})

export default exampleController
