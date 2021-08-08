#! /bin/bash
#
# Builds and deploys to Google clould the backend and the app 
#

# Tell the app where to find the backend.  Change as needed.
API_URL=https://backend-l7bccxltpa-lz.a.run.app

PROJECT_ID=$(gcloud config get-value project)
REGION=europe-north1

if [ "$1" = "backend" -o "$1" = "" ]; then
cd backend
SERVICE=backend
docker build --tag gcr.io/${PROJECT_ID}/${SERVICE} .
docker push gcr.io/${PROJECT_ID}/${SERVICE}
gcloud run deploy --image gcr.io/${PROJECT_ID}/${SERVICE} --region=${REGION} --allow-unauthenticated ${SERVICE}
cd ..
fi

if [ "$1" = "app" -o "$1" = "" ]; then
cd app
SERVICE=app
docker build --tag gcr.io/${PROJECT_ID}/${SERVICE} \
        --build-arg API_URL=${API_URL} \
        .
docker push gcr.io/${PROJECT_ID}/${SERVICE}
gcloud run deploy --image gcr.io/${PROJECT_ID}/${SERVICE} --region=${REGION} --allow-unauthenticated ${SERVICE}
cd ..
fi
