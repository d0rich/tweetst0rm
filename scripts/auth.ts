import {connect} from '../src/connect/mongodb.connect'
import {initAuthRoutes} from '../src/services/auth'
import { initHelthzService } from '../src/services/healthz'
import { publishPost } from '../src/services/publish'
import { connectTwitter } from '../src/connect/twitter.connect'
import scheduler from 'node-schedule'

async function main(){
  const mongo = await connect()
  const twitterClient = connectTwitter()
  const tokensCollection = mongo.db('auth').collection('tokens')
  initAuthRoutes(tokensCollection, twitterClient, (server) => {
    mongo.close()
    server.close()
  })
  
}

main()