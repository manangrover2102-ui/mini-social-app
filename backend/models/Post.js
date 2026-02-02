const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    likes: {
      type: [String],
      default: [],           // 🔴 REQUIRED
    },
    comments: {
      type: [
        {
          username: String,
          text: String,
        },
      ],
      default: [],           //  REQUIRED
    },
  },
  { timestamps: true }        //  REQUIRED
);

module.exports = mongoose.model("Post", postSchema);

