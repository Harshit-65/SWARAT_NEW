const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const multer = require("multer");

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log("post created");
  const { location, description, images } = req.body;
  const userId = req.user._id;

  // Format the location data into GeoJSON format

  const geoJSONLocation =
    location?.lat && location?.lng
      ? {
          type: "Point",
          coordinates: [location.lng, location.lat], // Note: GeoJSON format is [longitude, latitude]
        }
      : {
          type: "Point",
          coordinates: [],
        };

  const newPost = await Post.create({
    location: geoJSONLocation,
    description,
    images,
    createdBy: userId,
  });

  if (newPost) {
    res.status(201).json(newPost);
  } else {
    res.status(400);
    throw new Error("Invalid post data");
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "photos/"); // Destination folder to store uploaded images
  },
  filename: function (req, file, cb) {
    // Customize the filename if needed (e.g., add timestamps)
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// @desc    Upload an image
// @route   POST /api/posts/upload
// @access  Private
// @desc    Upload an image
// @route   POST /api/posts/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  // console.log("Upload endpoint hit");
  // console.log(req.body);

  upload.single("image")(req, res, async (err) => {
    // Correct placement
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error uploading image" });
    } else {
      if (!req.file) {
        return res.status(400).send({ message: "No image file provided" });
      }

      // Assuming you want to return the image URL
      const imageUrl = `/photos/${req.file.filename}`;
      res.status(200).send({ imageUrl });
    }
  });
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("createdBy", "username");
  console.log(
    "Sending posts with images:",
    posts.map((p) => p.images)
  ); // Populate user details
  res.json(posts);
});

// @desc    Get a post by ID
// @route   GET /api/posts/:postId
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId).populate("createdBy", "username"); // Populate user details
  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    Update a post (Only the creator can update)
// @route   PUT /api/posts/:postId
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;
  const updates = req.body;

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Authorization: Only the creator can update the post
  if (post.createdBy.toString() !== userId.toString()) {
    res.status(403); // Forbidden
    throw new Error("You are not authorized to update this post");
  }

  // Update the post
  const updatedPost = await Post.findByIdAndUpdate(postId, updates, {
    new: true,
  });

  res.json(updatedPost);
});

// @desc    Delete a post (Only the creator can delete)
// @route   DELETE /api/posts/:postId
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Authorization: Only the creator can delete
  if (post.createdBy.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("You are not authorized to delete this post");
  }

  await post.remove();
  res.json({ message: "Post removed" });
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  uploadImage,
};
