const express = require('express');

const router = express.Router();

const {
  createPosts,
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
// const jwtAuth = require('../utils/jwtAuth');

router.get(
  '/',
  // jwtAuth.verifyToken,
  getAllPosts,
);

router.post(
  '/',
  // jwtAuth.verifyToken,
  //  jwtAuth.isAdmin,
  createPost,
);

router.post(
  '/create-many',
  // jwtAuth.verifyToken,
  // jwtAuth.isAdmin,
  createPosts,
);

router.get(
  '/:id',
  // jwtAuth.verifyToken,
  getPost,
);

router.put(
  '/:id/update',
  // jwtAuth.verifyToken,
  // jwtAuth.isAdmin,
  updatePost,
);

router.delete(
  '/:id/delete',
  // jwtAuth.verifyToken,
  // jwtAuth.isAdmin,
  deletePost,
);

module.exports = router;
