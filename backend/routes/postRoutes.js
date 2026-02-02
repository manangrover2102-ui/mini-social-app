const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

/* =========================
   CREATE POST
========================= */
router.post("/", async (req, res) => {
  try {
    const { userId, username, text, imageUrl } = req.body;

    if (!text && !imageUrl) {
      return res.status(400).json({
        message: "Post must contain text or image",
      });
    }

    const post = await Post.create({
      userId,
      username,
      text: text || "",
      imageUrl: imageUrl || "",
      likes: [],          // ✅ IMPORTANT
      comments: [],       // ✅ IMPORTANT
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("CREATE POST ERROR:", error.message);
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
});

/* =========================
   GET POSTS (PAGINATION)
========================= */
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPosts = await Post.countDocuments();

    const formattedPosts = posts.map((post) => ({
      ...post,
      likesCount: post.likes?.length || 0,
      commentsCount: post.comments?.length || 0,
    }));

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      posts: formattedPosts,
    });
  } catch (error) {
    console.error("FETCH POSTS ERROR:", error.message);
    res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
});

/* =========================
   LIKE POST
========================= */
router.post("/:id/like", async (req, res) => {
  try {
    const { username } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(username)) {
      post.likes.push(username);
      await post.save();
    }

    res.json(post);
  } catch (error) {
    console.error("LIKE ERROR:", error.message);
    res.status(500).json({
      message: "Failed to like post",
      error: error.message,
    });
  }
});

/* =========================
   COMMENT POST
========================= */
router.post("/:id/comment", async (req, res) => {
  try {
    const { username, text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ username, text });
    await post.save();

    res.json(post);
  } catch (error) {
    console.error("COMMENT ERROR:", error.message);
    res.status(500).json({
      message: "Failed to add comment",
      error: error.message,
    });
  }
});

module.exports = router;
