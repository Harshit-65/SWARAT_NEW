import React, { useState } from "react";
import { MapPin, Image, Upload } from "lucide-react";

const UploadComponent = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Create New Post</h2>

        {/* Image Upload */}
        <div className="mb-6">
          <button className="flex items-center space-x-2 w-full border-2 border-dashed border-gray-300 p-4 rounded-lg hover:bg-gray-50">
            <Image size={24} />
            <span>Add Pictures</span>
          </button>
        </div>

        {/* Location */}
        <button className="flex items-center space-x-2 mb-6 text-green-600">
          <MapPin size={20} />
          <span>Add Location</span>
        </button>

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add description..."
          className="w-full p-3 border rounded-lg mb-6 h-32 resize-none"
        />

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadComponent;
