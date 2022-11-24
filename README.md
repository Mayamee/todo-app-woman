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
Add a secret password file to **docker/mongo/secrets** which is called ***db_pass***

Then create ***prod.env*** file in **app/env** directory

Example [here](https://gist.githubusercontent.com/Mayamee/5c3668bccde12035a1226b04f146f3ff/raw/d381be326618bf9d6083c403e2f62d9862b9bd77/prod.env)

Warning ⚠️

The contents of the file ***db_pass*** is a password, and it must be in the string *DB_CONNECTION_STRING*, which is included in the files ***dev.env*** or ***prod.env***

Example:

mongodb://user:<span style="color:#e66e0b">**here**</span>@host:port

### Development
To develop this project you can run
```sh
yarn dev
```

### Production
Build the project
```sh
yarn build
```
Then run docker-compose to deploy
```sh
docker-compose up -d
```
## Dependency graph

![Deps graph](https://raw.githubusercontent.com/Mayamee/todo-app-woman/main/docs/depsGraph/dependency-graph.svg)

## Todo model
![Model](https://raw.githubusercontent.com/Mayamee/todo-app-woman/main/docs/todoModel/todo.svg)
