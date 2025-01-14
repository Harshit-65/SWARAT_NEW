const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  postId: {
    // Add this field
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
