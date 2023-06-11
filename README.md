# todo-app-woman

## How to deploy and use

Clone this repo

```sh
git clone https://github.com/Mayamee/todo-app-woman
```

Install dependencies

```sh
yarn install
```

Add a secret password file to **secrets/mongo** which is called **_db_pass_**

Then place **_prod.env_** file in **root (/) of directory**

Example [here](https://gist.githubusercontent.com/Mayamee/5c3668bccde12035a1226b04f146f3ff/raw/d381be326618bf9d6083c403e2f62d9862b9bd77/prod.env)

Warning ⚠️

The contents of the file **_db_pass_** is a password, and it must be in the string _DB_CONNECTION_STRING_, which is included in the files **_dev.env_** or **_prod.env_**

Example:

mongodb://user:<span style="color:#e66e0b">**here**</span>@host:port

### Development

```sh
yarn dev
```

### Production

```sh
yarn build
```

Then run docker-compose to deploy

```sh
docker-compose up -d
```

## Dependency graph

![Deps graph](https://raw.githubusercontent.com/Mayamee/todo-app-woman/main/docs/depsGraph/dependency-graph.svg)
