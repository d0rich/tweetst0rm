import { createPost } from "../src/services/createPost";

async function main(){
  for (let i of [...Array(5).keys()]) {
    console.log('======start========')
    console.log(await createPost())
    console.log('======end==========')
  }
}

main()