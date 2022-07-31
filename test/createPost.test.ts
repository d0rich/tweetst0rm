import { createPost } from "../src/services/createPost";

async function main(){
  console.log(await createPost())
}

main()