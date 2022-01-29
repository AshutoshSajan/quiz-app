FROM node:12-alpine
WORKDIR /user/quiz-app
COPY . .
RUN npm install
CMD ["npm", "start"]