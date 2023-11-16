FROM node:12-alpine
WORKDIR /usr/quiz-app
COPY ./ /usr/quiz-app/
RUN npm install
CMD ["npm", "start"]
