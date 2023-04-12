# tweetst0rm 🐔

tweetst0rm is a simple app that uses GPT-3 for generating tweets.

## Download program

Clone repository with source code:

```bash
git clone https://github.com/d0rich/tweetst0rm.git
```

Install dependencies:

```bash
npm install
```

## Configuration

Create `.env` file in root directory to define environment variables:

```bash
MONGODB_HOST=XXXXXXXX
MONGODB_USER=XXXXXXXX
MONGODB_PASSWORD=XXXXXXXX

TWITTER_CLIENT_ID=XXXXXXXX
TWITTER_CLIENT_SECRET=XXXXXXXX

OPENAI_ORG=XXXXXXXX
OPENAI_KEY=XXXXXXXX

CHANCE=0.5
```

### MongoDB

tweetst0rm uses MongoDB for storing OAuth tokens for accessing Twitter API. As free solution you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). In order to configure MongoDB connection you need to define following environment variables:

- `MONGODB_HOST` - MongoDB host
- `MONGODB_USER` - MongoDB user
- `MONGODB_PASSWORD` - MongoDB password

### Twitter

tweetst0rm uses Twitter API for posting tweets. In order to configure Twitter API you need to create [Twitter app](https://developer.twitter.com/en/apps) and define following environment variables:

- `TWITTER_CLIENT_ID` - Twitter app client ID
- `TWITTER_CLIENT_SECRET` - Twitter app client secret

### OpenAI

tweetst0rm uses GPT-3 model via OpenAI API for generating tweets. In order to configure OpenAI API you need to create [OpenAI API key](https://beta.openai.com/account/api-keys) and define following environment variables:

- `OPENAI_ORG` - OpenAI organization ID
- `OPENAI_KEY` - OpenAI API key

### Customization

Script `publish-post-random` can succeed with probability defined by `CHANCE` environment variable. By default it is set to `0.5` which means that script will succeed with 50% probability.

### Tweets content

In order to customize tweets content you need to edit `prompts.ts` file in root directory. It contains following arrays:

- `sentenceTypes` - array of sentence types
- `topics` - array of topics
- `wildcards` - list additional actions here

```ts
export const sentenceTypes: string[] = [
  'something',
  'funny fact',
  'concern'

]

export const topics: string[] = [
  'Vuejs',
  'React is bad',
  'Vue is better than React'
]

export const wildcards: string[] = [
  'use a lot of emojis',
  'ask people to follow your account'
]
```

## Usage

You can run permanent process which will generate and publish tweets in random moments during day:

Build project:

```bash
npm run build
```

Run process:

```bash
npm run start
```

Keep in mind that you need to authorize with OAuth. For that go to `http://localhost:3000/auth` and follow instructions. Reminder about authorization will be also displayed in terminal.

> As OAuth token is stored in MongoDB you need to authorize only once and it will also work in different scripts.

### Scripts

You also can configure some cron jobs to run scripts in specific moments of day.

Before configuring cron jobs you need to authorize in Twitter with OAuth. For that run `npm run auth` and go to `http://localhost:3000/auth`.

```bash
npm run auth
```

`publish-post` - generates and publishes tweet:

```bash
npm run publish-post
```

`publish-post-random` - generates and publishes tweet with probability defined by `CHANCE` environment variable:

```bash
npm run publish-post-random
```

