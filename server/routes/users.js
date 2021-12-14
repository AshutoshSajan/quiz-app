const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
  updateUser,
  updateUserScore,
  deleteScore,
  deleteUser,
} = require('../controllers/userController');

const jwtAuth = require('../utils/jwtAuth');

// get all users
router.get('/', jwtAuth.verifyToken, jwtAuth.isAdmin, getAllUsers);

// token login
router.get('/me', jwtAuth.verifyToken, getUser);

// get single user
router.get('/:id', jwtAuth.verifyToken, jwtAuth.isAdmin, getUser);

// login user
router.post('/login', loginUser);

// register user
router.post('/register', registerUser);

// update user
router.put('/update', jwtAuth.verifyToken, updateUser);

// new route
router.put('/score/update', jwtAuth.verifyToken, updateUserScore);

// delete score
router.delete('/score/:id/delete', jwtAuth.verifyToken, deleteScore);

// delete user
router.delete('/delete', jwtAuth.verifyToken, deleteUser);

module.exports = router;
