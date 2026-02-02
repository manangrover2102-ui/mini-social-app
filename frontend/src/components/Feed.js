import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";

function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        "https://mini-social-backend-lzfb.onrender.com/api/posts?page=1&limit=5"
      );
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("Fetch posts failed", err);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    await fetch(`https://mini-social-backend-lzfb.onrender.com/api/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username }),
    });

    fetchPosts();
  };

  const handleComment = async (postId, text, clearInput) => {
    if (!text) return;

    await fetch(`https://mini-social-backend-lzfb.onrender.com/api/posts/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        text,
      }),
    });

    clearInput("");
    fetchPosts();
  };

  return (
    <div>
      <CreatePost user={user} onPostCreated={fetchPosts} />

      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            background: "#ffffff",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "14px",
            boxShadow: "0 8px 22px rgba(0,0,0,0.06)",
            border: "1px solid #edf2f7",
          }}
        >
          <strong>{post.username}</strong>

          {post.text && <p>{post.text}</p>}

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="post"
              style={{ width: "100%", marginTop: "10px" }}
            />
          )}

          <div style={{ marginTop: "8px" }}>
            <button
              onClick={() => handleLike(post._id)}
              style={{ marginRight: "10px" }}
            >
              ❤️ {post.likesCount}
            </button>
            💬 {post.commentsCount}
          </div>

          <CommentBox postId={post._id} onComment={handleComment} />

          {post.comments?.map((c, i) => (
            <div
              key={i}
              style={{
                marginTop: "6px",
                background: "#f8fafc",
                padding: "6px 10px",
                borderRadius: "10px",
              }}
            >
              <strong>{c.username}</strong>: {c.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CommentBox({ postId, onComment }) {
  const [comment, setComment] = useState("");

  return (
    <div style={{ marginTop: "8px" }}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ width: "70%", padding: "6px" }}
      />
      <button
        onClick={() => onComment(postId, comment, setComment)}
        style={{ marginLeft: "8px" }}
      >
        Comment
      </button>
    </div>
  );
}

export default Feed;
