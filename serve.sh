#! /bin/bash

cd client
npm run build 
cd ..
firebase serve
