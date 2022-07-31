import { connectOpenai } from "../connect/openai.connect";
import { topics, wildcards } from "../../prompts";

function randomArrayItem(array: any[]){
  return array[Math.floor(Math.random() * array.length)]
}

export async function createPost(){
  const openai = connectOpenai()

  const { data: newText } = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `tweet something about ${ randomArrayItem(topics) } and ${randomArrayItem(wildcards)}.`,
    temperature: 1,
    max_tokens: 64
  })

  if (!newText){
    console.error('No text generated')
    return
  }
  // @ts-ignore
  return newText?.choices[0].text
}