FROM woorank/docker-node-base

ENV APP_NAME shotgun

RUN apt-get update
RUN apt-get install -y libpng12-dev libjpeg8-dev libfreetype6-dev libjasper-dev fontconfig
RUN apt-get install -y graphicsmagick imagemagick libmagickwand-dev

EXPOSE 3000
