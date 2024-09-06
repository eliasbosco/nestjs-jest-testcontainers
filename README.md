
# Coding Challenge Backend Development: API Development

1. Project Description
Develop a CRUD service for managing Points of Interest (POIs), specifically focusing on
petrol stations. Each POI encapsulates detailed information about the petrol station's
operational status, location, available fuel pumps and products, and varied opening
hours schedules.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

To run this project in a docker-compose env, run the following commands:

```bash
$ cd infra
$ docker-compose build
$ docker-compose up -d

# For logs visualization
$ docker-compose logs -f
```
Next step is to run migration for populating database with initial data information
```bash
$ docker-compose exec -it app yarn run migration:run
```

## Support

Check out the documentation and Postman collection in /doc folder

## Stay in touch

- Author - [Elias Bosco](https://www.linkedin.com/in/eliasbosco)
