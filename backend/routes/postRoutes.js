const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:postId", postController.getPostById);
router.put("/:postId", protect, postController.updatePost); // Example: Only the creator can update
router.delete("/:postId", protect, postController.deletePost); // Example: Only the creator can delete
router.post("/upload", protect, postController.uploadImage);

module.exports = router;
