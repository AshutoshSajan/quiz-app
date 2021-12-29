const Post = require('../models/Post');

module.exports = {
  createPost: async (req, res) => {
    const post = await Post.create(req.body);

    if (!post) {
      return res.status(500).json({
        success: false,
        error: 'err',
        message: 'internal server error',
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  },

  getPost: async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(500).json({
        success: false,
        error: 'err',
        message: 'server error',
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  },

  getAllPosts: async (req, res) => {
    const { skip, limit } = req.query;
    const posts = await Post.find({}, {}, { skip, limit });

    if (!posts) {
      return res.status(500).json({
        success: false,
        error: 'err',
        message: 'server error',
      });
    }

    return res.status(200).json({
      success: true,
      posts,
    });
  },

  updatePost: async (req, res) => {
    const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
      upsert: true,
      new: true,
    });

    if (!post) {
      return res.status(500).json({
        success: false,
        error: 'err',
        message: 'server error',
      });
    }

    return res.status(200).json({
      success: true,
      post,
      message: 'update successful',
    });
  },

  createPosts: async (req, res) => {
    const posts = await Post.insertMany(req.body.posts);

    if (!posts) {
      return res.status(500).json({
        success: false,
        error: 'err',
        message: 'server error',
      });
    }

    return res.status(200).json({
      success: true,
      posts,
      message: 'multiple post created',
    });
  },

  deletePost: (req, res) => {
    const post = Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(500).json({
        success: false,
        error: 'err',
        message: 'server error',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'post deleted',
    });
  },
};
