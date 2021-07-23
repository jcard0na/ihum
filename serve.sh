#! /bin/bash

# Starts a ihum backend server and an ihum application server
#
# If invoked with `devel` argument, backend and app server will run natively.
# The ihum app will be served by the react development server, whatever that
# is.
#
# If invoked with `prod` argument, backend and ihum app will run locally as
# containers.  The app will be served by nginx webserver.  This requires docker
# to be running on your host.
#
# Variable below determines the default behavior, when invoked without arguments.

DEFAULT_MODE="devel"

[ "$1" = "devel" ] && RUN_MODE="devel"
[ "$1" = "prod" ] && RUN_MODE="prod"
[ "$1" = "" ] && RUN_MODE=${DEFAULT_MODE}

cd backend
if [ ${RUN_MODE} = "prod" ]
then
    docker build -t ihum-backend .
    CID1=$(docker run -dp 8080:8080 --name backend ihum-backend)
elif [ ${RUN_MODE} = "devel" ]
then
    node index.js &
    PID1=$!
fi
cd ..

cd client
if [ ${RUN_MODE} = "prod" ]
then
    # Bake the backend URL into the react app at build time.  All the
    # process.env variables are replaced at this time, this why we cannot
    # configure at runtime, like we do when using the development server.
    #
    # Making this runtime configurable requires tedious changes.  See
    # https://github.com/facebook/create-react-app/issues/2353
    #
    REACT_APP_BACKEND="http://localhost:8080" npm run build
    docker build -t ihum-appserver .
    CID2=$(docker run -dp 3000:80 --name web ihum-appserver)
elif [ ${RUN_MODE} = "devel" ]
then
    # Runtime configuration of backend server.
    REACT_APP_BACKEND="http://localhost:8080" npm run start &
    PID2=$!
fi
cd ..

echo 'Hit any key to stop the services'
read X

if [ ${RUN_MODE} = "prod" ]
then
    docker stop backend
    docker stop web
    docker rm ${CID1}
    docker rm ${CID2}
elif [ ${RUN_MODE} = "devel" ]
then
    kill $PID1
    kill $PID2
    lsof -i TCP:3000 -t | xargs kill
    lsof -i TCP:8080 -t | xargs kill
fi
