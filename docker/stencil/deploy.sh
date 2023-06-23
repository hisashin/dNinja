docker login
docker build -t dninja-stencil .
docker tag dninja-stencil hisashin/dninja-stencil:latest
docker push hisashin/dninja-stencil
