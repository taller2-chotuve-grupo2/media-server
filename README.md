# Media Server


### INSTRUCTIONS


## build
docker build -t chotuve/media_server .


## test
docker run chotuve/media_server yarn test

## run
docker run -p 8082:3030 juand/media_server 