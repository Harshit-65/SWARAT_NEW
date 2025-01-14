const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, userController.getAllUsers);
router.get("/:userId", protect, userController.getUserById);
router.put("/:userId", protect, userController.updateUser); // Update user profile
router.delete("/:userId", protect, userController.deleteUser);

module.exports = router;
