import { Collection } from "mongodb";
import express, { Response, Request } from 'express'
import { OAuth2TokensVerifier } from '../types/mongo.model';
import { TwitterApi } from "twitter-api-v2";
import { Server } from 'http'

const PORT = 3000
const HOST = '127.0.0.1'
const CALLBACK_ADDRESS = 'callback'
const callbackUrl = `http://${HOST}:${PORT}/auth/${CALLBACK_ADDRESS}`

export function initAuthRoutes(
  tokensCollection: Collection, 
  twitterClient: TwitterApi, 
  authCallback: (server: Server) => void = () => {}){
  const app = express()
  let server: Server

  app.get('/auth', async (req: Request, res: Response) => {
    const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
      callbackUrl,
      { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
    )

    await tokensCollection.updateOne(
      {}, 
      { $set: { codeVerifier, state } }, 
      { upsert: true }
    )

    res.redirect(url)
  })

  app.get(`/auth/${CALLBACK_ADDRESS}`, async (req: Request, res: Response) => {
    // @ts-ignore
    const { state, code }: {state: string | undefined, code: string | undefined} = req.query
    if (!state || !code) 
      return res.status(400).send()
    const existingTokens = await tokensCollection.findOne<OAuth2TokensVerifier>()
    if (!existingTokens) {
      return res.status(400).send({ error: 'Tokens do not exist!' })
    }
    if (existingTokens.state !== state) {
      return res.status(400).send({ error: 'Stored tokens do not match!' })
    }

    const {
      client: loggedClient,
      accessToken,
      refreshToken
    } = await twitterClient.loginWithOAuth2({
      code,
      codeVerifier: existingTokens.codeVerifier,
      redirectUri: callbackUrl
    })

    await tokensCollection.updateOne(
      {}, 
      { 
        $set: { accessToken, refreshToken },
        $unset: { codeVerifier: null, state: null }
      },
      { upsert: true }
    )
    
    res.status(200).send('You have been authorized!')

    authCallback(server)
  })

  server = app.listen(PORT, HOST, () => {
    console.log(`Go to http://${HOST}:${PORT}/auth to authorize`)
    console.log(`Callback URL: ${callbackUrl}`)
  })

  return app
}