import { connectOpenai } from "../connect/openai.connect";

export async function createPost(){
  const openai = connectOpenai()

  const { data: newText } = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: 'tweet something cool for #techtwitter',
    n: 1,
    max_tokens: 64
  })

  if (!newText){
    console.error('No text generated')
    return
  }
  // @ts-ignore
  return newText?.choices[0].text
}