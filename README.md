# Media Server


### INSTRUCTIONS


## build
docker build -t chotuve/media-server .


## test
docker run chotuve/media-server yarn test

## run
docker run -p 8082:3030 juand/media-server 