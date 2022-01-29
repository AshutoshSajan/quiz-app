FROM node:12-alpine
WORKDIR /usr/quiz-app
COPY . .
RUN npm install
CMD ["npm", "start"]