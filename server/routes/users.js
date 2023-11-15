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

const { verifyToken, isAdmin } = require('../utils/jwtAuth');

// get all users
router.get('/', verifyToken, isAdmin, getAllUsers);

// token login
router.get('/me', verifyToken, getUser);

// get single user
router.get('/:id', verifyToken, isAdmin, getUser);

// login user
router.post('/login', loginUser);

// register user
router.post('/register', registerUser);

// update user
router.put('/update', verifyToken, updateUser);

// new route
router.put('/score/update', verifyToken, updateUserScore);

// delete score
router.delete('/score/:id/delete', verifyToken, deleteScore);

// delete user
router.delete('/delete', verifyToken, deleteUser);

module.exports = router;
