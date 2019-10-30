# React Twitter Deck

Demo : http://react-twitter-deck.herokuapp.com

## Setup Guide

First of all, git clone this repo and initialize .git

```
$ make init
```

Install client & server dependencies.

```
$ make install
```

### 1. Twitter OAuth Configuration

#### 1) Development: Local Server

- Go to [Twitter's developer page](https://developer.twitter.com/en/account/get-started) and create a new app.
- Get Consumer API key and API secret key in `Apps > [your-twitter-app-name] > Keys and tokens` tab.
- Create `.env` file in `server` directory. Update `your-twitter-api-key` and `your-twitter-api-secret-key`.

```
TWITTER_KEY=your-twitter-api-key
TWITTER_SECRET=your-twitter-api-secret-key
CALLBACK_URL=http://localhost:5000/twitter/callback
NODE_ENV=development
```

#### 2) Production: Heroku

- Create [new Heroku app](ttps://dashboard.heroku.com/new-app).
- Download and install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
- Log in to your Heroku account.

```babel-eslint
$ heroku login
```

- Set Heroku git repository.

```
$ heroku git:remote -a <your-heroku-app-name/>
```

- Go to app setting page and config env vars in `Settings > Config Vars` tab.

```
TWITTER_KEY: your-twitter-api-key
TWITTER_SECRET: your-twitter-api-secret-key
CALLBACK_URL: https://<your-heroku-app-name>.herokuapp.com/twitter/callback
NODE_ENV: production
```

### 2. Development

- Run server with `yarn dev`

- Open the brower and go to http://localhost:3000/. Node.js server lives on http://localhost:5000/.

### 3. Depolyment method

There are two ways to deploy application. ;

#### 1) Heroku CLI

Initialize a git repository in a new or existing directory

```
$ heroku git:clone -a <your-heroku-app-name/>
```

Deploy your application.

```
$ make heroku
```

#### 2) GitHub

- Create new github repo and set remote url.

```
git remote add origin <your-git-repo-url>.git
```

- Push changes.

```
$ make git m="your message"
```

- Go to app `Settings > Deploy` tab and connect this app to GitHub.
