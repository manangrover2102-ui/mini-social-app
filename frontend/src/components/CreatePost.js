import React, { useState } from "react";

function CreatePost({ user, onPostCreated }) {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id || !user.username) {
      alert("User not ready. Please re-login.");
      return;
    }

    if (!text && !imageUrl) {
      alert("Post must have text or image");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          username: user.username,
          text,
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Post failed");
      }

      // clear inputs ONLY after success
      setText("");
      setImageUrl("");

      // force feed refresh
      onPostCreated();
    } catch (err) {
      alert("Something went wrong while posting");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "28px",
        background: "linear-gradient(180deg, #f9fbff 0%, #f1f5f9 100%)",
        padding: "20px",
        borderRadius: "22px",
        border: "1px solid #e6ecf5",
      }}
    >
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
        style={{
          width: "100%",
          padding: "4px",
          borderRadius: "6px",
          border: "1px solid #dbe3ec",
          outline: "none",
          resize: "none",
        }}
      />

      <div style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
        Share a thought or drop an image link — keep it meaningful ✨
      </div>

      <input
        type="text"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{
          width: "100%",
          borderRadius: "6px",
          border: "1px solid #dbe3ec",
          outline: "none",
          padding: "4px",
          marginTop: "10px",
        }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: "12px",
          background: "#4f46e5",
          color: "#ffffff",
          border: "none",
          borderRadius: "999px",
          padding: "10px 18px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: "500",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Posting..." : "🚀 Share"}
      </button>
    </form>
  );
}

export default CreatePost;
