// Create web server

// Import express
const express = require('express');
const router = express.Router();
const db = require('../models');
const Comment = db.Comment;
const User = db.User;
const Post = db.Post;
const { authenticated } = require('../config/auth');
const helpers = require('../_helpers');
const moment = require('moment');

// Create comment
router.post('/', authenticated, (req, res) => {
  const { text, postId } = req.body;
  const userId = helpers.getUser(req).id;
  Comment.create({
    text,
    userId,
    postId
  }).then(comment => {
    return res.redirect(`/posts/${postId}`);
  });
});

// Update comment
router.put('/:id', authenticated, (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  Comment.findByPk(id).then(comment => {
    comment.update({
      text
    }).then(() => {
      return res.redirect(`/posts/${comment.PostId}`);
    });
  });
});

// Delete comment
router.delete('/:id', authenticated, (req, res) => {
  const { id } = req.params;
  Comment.findByPk(id).then(comment => {
    comment.destroy().then(() => {
      return res.redirect(`/posts/${comment.PostId}`);
    });
  });
});

module.exports = router;