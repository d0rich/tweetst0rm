import {connect} from './mongodb.connect'
import {initAuthRoutes} from './services/auth'
import { connectTwitter } from './twitter.connect'

async function main(){
  const mongo = await connect()
  const twitterClient = connectTwitter()
  const tokensCollection = mongo.db('auth').collection('tokens')
  initAuthRoutes(tokensCollection, twitterClient)
}

main()