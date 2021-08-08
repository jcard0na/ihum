# ihum
[https://app-l7bccxltpa-lz.a.run.app](https://app-l7bccxltpa-lz.a.run.app)

## Node version

Using version 16

## Testing

### Backend
```
cd backend
npm test
```

### Frontend
```
cd client
npm test
```

## Deploy

Before building, make sure you can build and run containers locally.  The
helper script `serve.sh` will do that.  Without arguments, it will run node.js
development server.  This is the fastest, useful for development.

```
./serve.sh
```

When passed `prod` as argument, the script will build both backend and app
containers and run them locally.  This is useful to test the deployment
pipeline.

```
./serve.sh prod
```

At this time we are running `ihum` on Google Cloud Platform.  The `backend`
and `app` are separate services under the same project in Google Cloud (`ihum`).

In order to deploy, you will need to find out the project id
```
PROJECT_ID=$(gcloud config get-value project)
```

If you need to set the active project, you can do that with:
```
gcloud config set project ihum-c73d9
```

### Backend

Build container locally with docker, push to Google Cloud Registry and deploy to Google Cloud Run.
See the provided script `deploy.sh`

Take note of the service URL (e.g. `https://backend-l7bccxltpa-lz.a.run.app`)
as you will need it to configure the `app` (next section).

### App 

Currently the front end configures the backend URL at build time.  You can pass the
live backend URL to `docker build` as an argument as:

```
    docker build --build-arg API_URL="https://..." ...
```

See the provided script `deploy.sh`

## Links
* [https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/](https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/)
* [https://cloud.google.com/run/docs/building/containers](https://cloud.google.com/run/docs/building/containers)
