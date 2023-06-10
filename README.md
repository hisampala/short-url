## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Setup Environment

```bash
Create a file .env and use the example Key in .env.dev to change it as needed.
DATABASE_URL=<<databseurl>> ##example  file:./dev.db
PORT= <<port as required>>   ##example  3000
BASE_URL= <<baseas required>> ##example http://localhost:3000
```

## Installation

```bash
$ npm install
```

## Installation database

```bash
$ npx prisma migrate dev --name="init"
$ npx prisma generate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
