# React Webpack Base

## Run the development server in Docker

This will provide you with a running server hosting the SPA which will auto update
as you make change to the code

```
docker compose up -d --build
```

## Run Unit Tests

```
npm run test
```

## Run Code Linter

```
npm run lint
```

## Run the development server on the command line (instead of Docker)

```
npm run dev
```

## Build and run Docker image locally

```
docker build -t react-webpack-base .
docker run -p 80:80 react-webpack-base
```
