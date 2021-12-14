const express = require('express');
const router = express.Router();

const {
  getAllQuizzes,
  createQuiz,
  createQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
} = require('../controllers/quizController');
const jwtAuth = require('../utils/jwtAuth');

router.get('/', jwtAuth.verifyToken, getAllQuizzes);

router.post('/', jwtAuth.verifyToken, jwtAuth.isAdmin, createQuiz);

router.post(
  '/create-many',
  jwtAuth.verifyToken,
  jwtAuth.isAdmin,
  createQuizzes,
);

router.get('/:id', jwtAuth.verifyToken, getQuiz);

router.put('/:id/update', jwtAuth.verifyToken, jwtAuth.isAdmin, updateQuiz);

router.delete('/:id/delete', jwtAuth.verifyToken, jwtAuth.isAdmin, deleteQuiz);

module.exports = router;
