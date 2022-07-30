import {connect} from './mongodb.connect'
import {twitterAuth} from './services/auth'

async function main(){
  const mongo = await connect()
  const tokensCollection = mongo.db('auth').collection('tokens')
  await twitterAuth(tokensCollection)
}

main()