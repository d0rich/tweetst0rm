import 'dotenv/config'
import { MongoClient } from 'mongodb'
const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_HOST}/`, 
  { 
    auth: {
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD
    },
    retryWrites: true,
    w: 'majority'
  });


export async function connect(){
  await client.connect()
  console.log('MongoDB connected')
  return client
}