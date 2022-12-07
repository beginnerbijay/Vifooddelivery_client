import React, { useState } from "react";

const StarRating = ({ ratings }) => {
  const [rating, setRating] = useState(ratings);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? "on button" : "off button"}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
