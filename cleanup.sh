#! /bin/bash

# Clean up all processes or containers that might have been left dangling after
# a failed run.

docker ps | grep ihum | xargs docker kill

lsof -i TCP:3000 -t | xargs kill
lsof -i TCP:8080 -t | xargs kill

docker container prune
