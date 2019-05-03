FROM node:latest

RUN mkdir /git
ADD . /git
WORKDIR /git
RUN git clone https://github.com/fabiosv/DeX-Burguers-frontend
RUN git clone https://github.com/fabiosv/DeX-Burguers-backend
WORKDIR /git/DeX-Burguers-backend
RUN yarn install
WORKDIR /git/DeX-Burguers-frontend
RUN yarn install

EXPOSE 3001
EXPOSE 3000

CMD ["yarn", "start"]