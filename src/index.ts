import {connect} from './mongodb.connect'

async function main(){
  const mongo = await connect()
}

main()