import {connect} from './connect/mongodb.connect'
import {initAuthRoutes} from './services/auth'
import { publishPost } from './services/publish'
import { connectTwitter } from './connect/twitter.connect'
import scheduler from 'node-schedule'

async function main(){
  const mongo = await connect()
  const twitterClient = connectTwitter()
  const tokensCollection = mongo.db('auth').collection('tokens')
  initAuthRoutes(tokensCollection, twitterClient)
  scheduler.scheduleJob('0 0 * * *', () => {
    const numberOfPostsToday = Math.floor(Math.random() * 3)
    for (let i of [...Array(numberOfPostsToday).keys()])
      scheduler.scheduleJob(new Date(Number(new Date()) + 1000 * 60 * 60 * 24 * Math.random()), async () => {
        await publishPost(tokensCollection, twitterClient)
      })
  })
  
}

main()