import {connect} from './connect/mongodb.connect'
import {initAuthRoutes} from './services/auth'
import { initHelthzService } from './services/healthz'
import { publishPost } from './services/publish'
import { connectTwitter } from './connect/twitter.connect'
import scheduler from 'node-schedule'

async function main(){
  initHelthzService()
  const mongo = await connect()
  const twitterClient = connectTwitter()
  const tokensCollection = mongo.db('auth').collection('tokens')
  initAuthRoutes(tokensCollection, twitterClient)

  function scheduleForToday() {
    const numberOfPostsToday = Math.floor(Math.random() * 5)
    console.log(`${new Date().toLocaleString()} | Number of posts today: ${numberOfPostsToday}`)
    console.log('Publish timestamps: ')
    for (let i of [...Array(numberOfPostsToday).keys()]){
      const publishTimestamp = new Date(Number(new Date()) + 1000 * 60 * 60 * 24 * Math.random())
      console.log(publishTimestamp.toLocaleString())
      scheduler.scheduleJob(publishTimestamp, async () => {
        await publishPost(tokensCollection, twitterClient)
      })
    }
      
  }

  scheduleForToday()

  scheduler.scheduleJob('0 0 * * *', () => {
    scheduleForToday()
  })
  
}

main()