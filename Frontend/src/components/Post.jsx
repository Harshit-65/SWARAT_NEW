import React, { useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";

const Post = ({ images, location, description, onChatClick }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
      {/* Image Carousel */}
      <div className="relative h-[400px]">
        <img
          src={images[currentImage]}
          alt={`Slide ${currentImage}`}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Location */}
      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={20} className="mr-2" />
          <span>{location}</span>
        </div>

        {/* Description */}
        <p className="text-gray-800 mb-4">{description}</p>

        {/* Chat Button */}
        <button
          onClick={onChatClick}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <MessageCircle size={20} />
          <span>Join Chat Room</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
