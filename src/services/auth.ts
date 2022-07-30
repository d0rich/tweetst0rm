import 'dotenv/config'
import { Collection, MongoClient } from "mongodb";
import {TwitterApi} from 'twitter-api-v2'

const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID || '',
  clientSecret: process.env.TWITTER_CLIENT_SECRET || ''
})
const callbackUrl = 'https://127.0.0.1:3000/auth/callback'

export async function twitterAuth(tokensCollection: Collection) {
  console.log(await tokensCollection.countDocuments())
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    callbackUrl,
    { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
  )

  await tokensCollection.updateOne(
    { id: 'OAuth2 tokens' }, 
    { $set: { codeVerifier, state } }, 
    {upsert: true}
  )

  console.log(url)
}