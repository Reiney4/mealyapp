import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMeals } from '../features/mealSlice.js';

const ManageMeals = () => {
  const meals = useSelector((state) => state.meals.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  return (
    <div>
      <h2>Manage Meals</h2>
      {/* You can add meal management features here. For now, just list the meals */}
      <ul>
        {meals.map((meal) => (
          <li key={meal.id}>{meal.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageMeals;
