import 'dotenv/config'

import { Configuration, OpenAIApi } from 'openai'

export function connectOpenai(){
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
  })
  return new OpenAIApi(configuration)
}