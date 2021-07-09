#! /bin/bash

if [ "$1" = "local" ]
then
    # Run backend locally
    cd functions
    npm run start-dev &
    SERVER_PID=$!
    cd ..
    cd client
    REACT_APP_BACKEND=local npm run start
    wait $SERVER_PID
else
    # Connect to backend hosted in firebase
    cd client
    npm run build
    cd ..
    firebase serve
fi
