import React from "react";

const ProductVideoEmbed = ({ videoId, productTitle }) => {
  if (!videoId) return null;

  return (
    <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border border-gray-700">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={`${productTitle} Gameplay Video`}
      ></iframe>
    </div>
  );
};

export default ProductVideoEmbed;
