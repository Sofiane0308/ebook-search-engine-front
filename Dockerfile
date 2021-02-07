FROM mhart/alpine-node:11
WORKDIR /app
COPY . .

ENV API_HOST=localhost
ENV ES_HOST=localhost

# compile with new environement variables because they change at each deployment
CMD touch .env && echo REACT_APP_API_HOST=${API_HOST} >> .env && echo REACT_APP_ES_HOST=${ES_HOST} >> .env && yarn start
