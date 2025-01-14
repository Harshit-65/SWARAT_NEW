import React, { useState, useEffect } from "react";

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Helper function to get full image URL
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder-image.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `${import.meta.env.VITE_API_URL}${imagePath}`;
  };

  if (!Array.isArray(images) || images.length === 0) {
    return <div>No images available</div>;
  }

  const currentImage = getFullImageUrl(images[currentImageIndex]);

  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden">
      <div className="w-full h-full">
        <img
          src={currentImage}
          alt={`Post image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("Image failed to load:", currentImage);
            setImageError(true);
            e.target.src = "/placeholder-image.png";
          }}
        />
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p>Failed to load image</p>
          </div>
        )}
      </div>

      {/* Navigation arrows (only if multiple images) */}
      {images.length > 1 && !imageError && (
        <>
          <button
            onClick={() =>
              setCurrentImageIndex(
                (prev) => (prev - 1 + images.length) % images.length
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
          >
            ←
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) => (prev + 1) % images.length)
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
          >
            →
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
