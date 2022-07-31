import { Collection } from "mongodb";
import { TwitterApi } from "twitter-api-v2";
import { OAuth2Tokens } from "../types/mongo.model";
import { createPost } from "./createPost";

export async function publishPost(tokensCollection: Collection, twitterClient: TwitterApi) {
  const tokensState = await tokensCollection.findOne<OAuth2Tokens>()
  if (!tokensState) {
    console.error('Tokens was not found')
    return
  }

  const { refreshToken } = tokensState

  const {
    client: refreshedClient,
    accessToken,
    refreshToken: newRefreshToken
  } = await twitterClient.refreshOAuth2Token(refreshToken)

  await tokensCollection.updateOne(
    {}, 
    { 
      $set: { accessToken, refreshToken: newRefreshToken },
      $unset: { codeVerifier: null, state: null }
    },
    { upsert: true }
  )

  const newPost = await createPost()

  if (!newPost) return

  const { data } = await refreshedClient.v2.tweet(newPost)
  console.log(`${new Date().toLocaleString()} - new post!`)
  console.log(newPost)
}