import express, { Request, Response } from 'express'

const PORT = Number(process.env.PORT) || 8080
const HOST = '0.0.0.0'
const START_DATE = new Date()

export function initHelthzService(){
  const app = express()
  app.get('/healthz', (req: Request, res: Response) => {
    res.status(200).send(`Service is online since ${START_DATE.toLocaleString()}`)
  })
  app.listen(PORT, HOST, () => {
    console.log(`Health service is online: http://${HOST}:${PORT}/healthz`)
  })
}