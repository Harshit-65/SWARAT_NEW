const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, chatController.createChat); // Creates a new chat room
router.get("/", protect, chatController.getUserChats); // Get chats the user is a member of
router.get("/:chatId", protect, chatController.getChatById); // Get messages for a specific chat
router.post("/:chatId/messages", protect, chatController.addMessage);
router.put("/:chatId", protect, chatController.updateChat); // Example: Update group name, close the chat
router.delete("/:chatId", protect, chatController.deleteChat);
router.get("/post/:postId", protect, chatController.getChatByPostId);
router.post("/:chatId/addUser", protect, chatController.addUserToChat);

module.exports = router;
