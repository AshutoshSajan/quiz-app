export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://node-react-quiz-app.onrender.com/api/v1'
    : 'http://localhost:3000/api/v1';
