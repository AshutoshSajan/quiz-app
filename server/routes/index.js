const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const quizRouter = require('./quizzes');
const postRouter = require('./posts');

router.use('/users', usersRouter);
router.use('/quizzes', quizRouter);
router.use('/posts', postRouter);

module.exports = router;
