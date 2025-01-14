const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat");

// @desc    Add user to chat
// @route   POST /api/chats/:chatId/addUser
// @access  Private
const addUserToChat = asyncHandler(async (req, res) => {
  console.log("inside addUserToChat");
  const chatId = req.params.chatId;
  const userId = req.body.userId; // Get user ID to add

  const chat = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Chat not found");
  }

  // Add user to members array if not already present
  if (!chat.members.includes(userId)) {
    chat.members.push(userId);
    await chat.save();
  }

  const updatedChat = await Chat.findById(chatId).populate(
    "members",
    "username"
  );
  res.json(updatedChat);
});

// @desc    Create a new chat
// @route   POST /api/chats
// @access  Private
const createChat = asyncHandler(async (req, res) => {
  const { groupName, postId } = req.body;
  const userId = req.user._id;

  // Check if chat already exists for this post
  const existingChat = await Chat.findOne({ postId });
  if (existingChat) {
    return res.status(200).json(existingChat);
  }

  // Create new chat if none exists
  const newChat = await Chat.create({
    groupName,
    postId,
    members: [userId],
    admin: userId,
  });

  if (newChat) {
    const populatedChat = await Chat.findById(newChat._id)
      .populate("members", "username")
      .populate("admin", "username");
    res.status(201).json(populatedChat);
  } else {
    res.status(400);
    throw new Error("Invalid chat data");
  }
});

// @desc    Get chats for a user
// @route   GET /api/chats
// @access  Private
const getUserChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const chats = await Chat.find({ members: userId })
    .populate("members", "username")
    .populate("admin", "username");

  res.json(chats);
});

// @desc    Get chat by ID
// @route   GET /api/chats/:chatId
// @access  Private
const getChatById = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;

  const chat = await Chat.findById(chatId)
    .populate("members", "username")
    .populate("admin", "username")
    .populate("messages.sender", "username"); // Populate message sender details

  if (chat) {
    res.json(chat);
  } else {
    res.status(404);
    throw new Error("Chat not found");
  }
});

// @desc    Add a message to a chat
// @route   POST /api/chats/:chatId/messages
// @access  Private
const addMessage = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;
  const userId = req.user._id;
  const { content } = req.body;

  // Find the chat
  const chat = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Chat not found");
  }

  // Add the message to the chat
  chat.messages.push({
    sender: userId,
    content,
  });

  // Save the updated chat
  await chat.save();

  // You might want to emit a socket.io event here to update the chat in real-time

  res.status(201).json(chat);
});

// @desc    Update a chat (for example, close the chat)
// @route   PUT /api/chats/:chatId
// @access  Private
const updateChat = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;
  const userId = req.user._id;
  const updates = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Chat not found");
  }

  // Check if the user is the admin of the chat
  if (chat.admin.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("Only the admin can update this chat");
  }

  // Update and return the chat
  const updatedChat = await Chat.findByIdAndUpdate(chatId, updates, {
    new: true,
  })
    .populate("members", "username")
    .populate("admin", "username");

  res.json(updatedChat);
});

// @desc    Delete a chat (only the admin can delete)
// @route   DELETE /api/chats/:chatId
// @access  Private
const deleteChat = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;
  const userId = req.user._id;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Chat not found");
  }

  if (chat.admin.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("Only the admin can delete this chat");
  }

  await chat.remove();

  res.json({ message: "Chat deleted successfully" });
});

const getChatByPostId = asyncHandler(async (req, res) => {
  const postId = req.params.postId;

  const chat = await Chat.findOne({ postId: postId }).populate(
    "members",
    "username"
  );

  if (chat) {
    res.json(chat);
  } else {
    res.status(404).json({ message: "Chat not found for this post" });
  }
});

module.exports = {
  createChat,
  getUserChats,
  getChatById,
  addMessage,
  updateChat,
  deleteChat,
  getChatByPostId,
  addUserToChat,
};
