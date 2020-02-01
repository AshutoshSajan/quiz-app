const initialState = {
  isLoading: true,
  quiz: []
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_QUIZZES':
      return {
        ...state,
        isLoading: false,
          quiz: action.payload,
          category: ['all', ...new Set(action.payload.map(quiz => quiz.category))]
      };

    case 'CREATE_QUIZ':
      return {
        ...state,
        isLoading: false,
          quiz: [...state.quiz, action.payload],
          category: ['all', ...new Set([...state.quiz, action.payload].map(quiz => quiz.category))]
      };
    case 'UPDATE_QUIZ':
      return {
        ...state,
        isLoading: false,
          quiz: [...state.quiz, action.payload],
          category: ['all', ...new Set([...state.quiz, action.payload].map(quiz => quiz.category))]
      };

    case 'DELETE_QUIZ':
      return {
        ...state,
        isLoading: false,
          quiz: state.quiz.filter(question => question._id !== action.payload),
          category: ['all', ...new Set(state.quiz.filter(question => question._id !== action.payload).map(quiz => quiz.category))]
      };

    default:
      return state;
  }
}