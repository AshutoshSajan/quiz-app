FROM node:12-alpine
WORKDIR /usr/quiz-app
COPY ./package.json package-lock.json ./
COPY ./ ./
RUN npm install
CMD ["npm", "start"]