import { connect } from '../src/connect/mongodb.connect'
import { connectTwitter } from '../src/connect/twitter.connect'
import { publishPost } from '../src/services/publish'

async function main(){
  const mongo = await connect()
  const twitterClient = connectTwitter()
  const tokensCollection = mongo.db('auth').collection('tokens')
  await publishPost(tokensCollection, twitterClient)
  mongo.close()
}

main()