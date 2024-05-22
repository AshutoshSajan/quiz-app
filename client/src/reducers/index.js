import { createStore, applyMiddleware, combineReducers } from 'redux';
import Thunk from 'redux-thunk';
import usersReducer from './users';
import quizReducer from './quiz';

const rootReducer = combineReducers({
  user: usersReducer,
  quiz: quizReducer,
});

export const store = createStore(rootReducer, applyMiddleware(Thunk));
