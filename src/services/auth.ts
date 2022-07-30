import { Collection } from "mongodb";
import express, { Response, Request } from 'express'
import { OAuth2Tokens } from '../types/mongo.model';
import { TwitterApi } from "twitter-api-v2";

const DOC_ID = 'OAuth2 tokens'
const callbackUrl = 'http://127.0.0.1:3000/auth/callback'

export function initAuthRoutes(tokensCollection: Collection, twitterClient: TwitterApi){
  const app = express()
  const port = 3000

  app.get('/auth', async (req: Request, res: Response) => {
    console.log(await tokensCollection.countDocuments())
    const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
      callbackUrl,
      { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
    )

    await tokensCollection.updateOne(
      { id: DOC_ID }, 
      { $set: { codeVerifier, state } }, 
      { upsert: true }
    )

    res.redirect(url)
  })

  app.get('/auth/callback', async (req: Request, res: Response) => {
    const { state, code } = req.query
    if (!state || !code) 
      return res.status(400).send()
    const existingTokens = await tokensCollection.findOne<OAuth2Tokens>({ id: DOC_ID })
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
      // @ts-ignore
      code,
      codeVerifier: existingTokens.codeVerifier,
      redirectUri: callbackUrl
    })

    await tokensCollection.updateOne(
      { id: DOC_ID }, 
      { 
        $set: { accessToken, refreshToken },
        $unset: { codeVerifier: null, state: null }
      },
      { upsert: true }
    )

    res.status(200).send()
  })

  app.listen(port, () => {
    console.log(`Go to http://localhost:3000/auth to authorize`)
  })

  return app
}