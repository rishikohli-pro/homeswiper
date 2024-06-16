// src/SwipeCards.js
import React, { useState } from 'react';

const SwipeCards = ({ items, onInteraction }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleInteraction = (liked) => {
    onInteraction(items[currentIndex].id, liked);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  if (items.length === 0) {
    return <div>No items available</div>;
  }

  return (
    <div>
      <div key={items[currentIndex].id} className="product-item">
        <h3>{items[currentIndex].data.name}</h3>
        <img
          src={items[currentIndex].data.image}
          alt={items[currentIndex].data.name}
          style={{
            width: '150px', // or any other value
            height: 'auto', // or any other value
          }}
        />
        <p>{items[currentIndex].data.price} Rs.</p>
        <button onClick={() => handleInteraction(true)}>Like</button>
        <button onClick={() => handleInteraction(false)}>Dislike</button>
      </div>
    </div>
  );
};

export default SwipeCards;
