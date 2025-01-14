const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin only - You might want to add a check for admin role)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password"); // Exclude passwords
  res.json(users);
});

// @desc    Get a user by ID
// @route   GET /api/users/:userId
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId).select("-password"); // Exclude password
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/:userId
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const updates = req.body;
  const loggedInUserId = req.user._id; // Assuming you have authMiddleware

  // Only allow updating own profile or if admin
  if (userId.toString() !== loggedInUserId.toString()) {
    res.status(403); // Forbidden
    throw new Error("You are not authorized to update this profile");
  }

  // Find user and update
  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
  });

  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete a user (Admin only - Add admin check)
// @route   DELETE /api/users/:userId
// @access  Private (Admin only)
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  if (user) {
    if (user._id.toString() === req.user._id.toString()) {
      // Don't allow deleting own account
      res.status(400);
      throw new Error("You cannot delete your own account.");
    }
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
