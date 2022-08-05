import { connect } from '../src/connect/mongodb.connect'
import { connectTwitter } from '../src/connect/twitter.connect'
import { publishPost } from '../src/services/publish'

async function main(){
  const luck = Math.random()
  console.log(`Luck is ${luck}`)
  if (luck > (1 - 1/24)){
    console.log('Post will be published')
    const mongo = await connect()
    const twitterClient = connectTwitter()
    const tokensCollection = mongo.db('auth').collection('tokens')
    await publishPost(tokensCollection, twitterClient)
    mongo.close()
  }
  else
    console.log('Post won\'t be published')
  
}

main()