// src/components/AddEditMeal/AddEditMeal.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { addMeal, fetchMeal, updateMeal } from '../../redux/actions/mealActions'; 
import mockData from '../../mockData';

const AddEditMeal = () => {
  const auth = useSelector((state) => state.auth);
  if (auth.user.role !== 'admin') {
      return <Redirect to="/dashboard" />;
  }

  const { id } = useParams();
  const isAddMode = !id;
  
  const [meal, setMeal] = useState({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const mealState = useSelector((state) => state.meals);

  useEffect(() => {
    if (!isAddMode) {
      dispatch(fetchMeal(id));
    }
  }, [dispatch, id, isAddMode]);

  useEffect(() => {
    if (!isAddMode) {
      setMeal(mealState.meal);
    }
  }, [mealState.meal, isAddMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal(mealPrev => ({ ...mealPrev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAddMode) {
      dispatch(addMeal(meal));
    } else {
      dispatch(updateMeal(id, meal));
    }

    history.push('/meals');
  };

  return (
    <div>
      <h2>{isAddMode ? 'Add Meal' : 'Edit Meal'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={meal.name} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={meal.description} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={meal.price} onChange={handleChange} required />
        </label>
        <label>
          Image URL:
          <input type="text" name="image_url" value={meal.image_url} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEditMeal;
