# Multi-stage build: build on node, serve on nginx
FROM node:16-slim

ARG API_URL

# Build prod client
WORKDIR /usr/src/app
COPY package* ./
COPY public ./public
COPY src ./src
RUN npm ci --only=production
RUN REACT_APP_BACKEND=$API_URL npm run build

# Move to nginx root directory
FROM nginx:latest
COPY --from=0 /usr/src/app/build/* /usr/share/nginx/html/
COPY --from=0 /usr/src/app/build/static /usr/share/nginx/html/static/
COPY config/default.conf.template /etc/nginx/templates/
