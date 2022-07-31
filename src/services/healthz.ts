import express, { Request, Response } from 'express'

const PORT = Number(process.env.PORT) || 8080
const HOST = '0.0.0.0'

export function initHelthzService(){
  const app = express()
  app.get('/healthz', (req: Request, res: Response) => {
    res.status(200).send()
  })
  app.listen(PORT, HOST, () => {
    'Health service is online'
  })
}