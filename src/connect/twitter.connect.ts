import 'dotenv/config'
import {TwitterApi} from 'twitter-api-v2'

export function connectTwitter(){
  const client = new TwitterApi({
    clientId: process.env.TWITTER_CLIENT_ID || '',
    clientSecret: process.env.TWITTER_CLIENT_SECRET || ''
  })
  console.log('Twitter connected')
  return client
} 