FROM node:0.10.32

ENV APP_NAME shotgun

RUN apt-get update
RUN apt-get install -y libpng12-dev libjpeg8-dev libfreetype6-dev libjasper-dev fontconfig
RUN apt-get install -y graphicsmagick imagemagick libmagickwand-dev
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD . /var/www
WORKDIR /var/www

RUN npm install --production

CMD ["npm", "start"]
