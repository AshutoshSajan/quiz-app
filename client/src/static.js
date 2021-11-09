export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://quiz-app-node-react.herokuapp.com/api/v1"
    : "http://localhost:8000/api/v1";
