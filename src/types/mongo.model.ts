export interface OAuth2TokensVerifier {
  codeVerifier: string, 
  state: string
}

export interface OAuth2Tokens {
  accessToken: string, 
  refreshToken: string
}