// src/components/MealItem/MealItem.js
import React from 'react';
import { useHistory } from 'react-router-dom';



const MealItem = ({ meal }) => {
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/meals/edit/${meal.id}`); // Assuming you have this route setup for editing meals
  };

  return (
    <div>
      <img src={meal.image_url} alt={meal.name} style={{ width: '150px', height: '150px' }} />
      <h3>{meal.name}</h3>
      <p>{meal.description}</p>
      <p>Price: ${meal.price}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default MealItem;
