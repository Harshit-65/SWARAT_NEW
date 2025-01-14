import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { postService } from "../services/postService";

const UploadComponent = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleImageChange = (e) => {
    // console.log("Image change");
    const files = Array.from(e.target.files);
    setImages(files);
    // console.log(files);
  };

  const handleUseMyLocation = () => {
    // console.log("Use my location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    // console.log("Submit");
    e.preventDefault();
    // console.log("images state changed", images);
    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          // const formData = new FormData();
          // console.log("image", image);
          // formData.append("image", image);
          // console.log(formData);

          // console.log("FormData content:", formData.get("image"));
          const response = await postService.uploadImage(image);
          return response.imageUrl;
        })
      );
      // console.log("image urls", imageUrls); // Use imageUrls instead
      const newPost = {
        description,
        images: imageUrls,
        location,
        createdBy: user._id,
      };

      await postService.createPost(newPost);
      onClose();
      setDescription("");
      setImages([]);
      setLocation(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-gray-700 font-bold mb-2"
            >
              Images:
            </label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Location:
            </label>
            <button
              type="button"
              onClick={handleUseMyLocation}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white"
            >
              Use My Current Location
            </button>
            {location && (
              <div className="mt-2 text-gray-700">
                Latitude: {location.lat}, Longitude: {location.lng}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-700 text-white"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadComponent;
