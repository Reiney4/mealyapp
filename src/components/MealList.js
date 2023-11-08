import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [editingMealId, setEditingMealId] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    image_url: '',
    caterer_id: ''
  });
  const history = useHistory();
  const [caterers, setCaterers] = useState([]);
  const [error, setError] = useState(null);

  const goBackToAdminDashboard = () => {
    history.push('/admin-dashboard'); // Define the path you want to navigate to
  };
  const fetchMeals = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:5000/meals', config);
      setMeals(response.data["meal options"]);
    } catch (error) {
      setError("Error fetching meals");
    }
  };

  useEffect(() => {
    const fetchCaterers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/caterers');
        setCaterers(response.data.caterers);
      } catch (error) {
        setError("Error fetching caterers");
      }
    };
    fetchCaterers();
    fetchMeals();
  }, []);

  const addMeal = async () => {
    if (editingMealId) {
      await updateMeal();
    } else {
      try {
        const token = localStorage.getItem('access-token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const formDataWithIntegerPrice = { ...formData, price: parseInt(formData.price, 10) };
        const response = await axios.post('http://localhost:5000/meals', formDataWithIntegerPrice, config);
        alert(response.data.message);
        fetchMeals();
      } catch (error) {
        setError("Error adding meal");
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.name !== 'caterer_id') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleCatererChange = (e) => {
    const selectedCatererId = e.target.value;
    setFormData({ ...formData, caterer_id: selectedCatererId });
  };

  const editMeal = (meal) => {
    setEditingMealId(meal.id);
    setFormData({ ...meal });
  };

  const deleteMeal = async (mealId) => {
    try {
      const token = localStorage.getItem('access-token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete('http://localhost:5000/meals', { data: { id: mealId }, ...config });
      alert(response.data.message);
      setMeals(meals.filter((meal) => meal.id !== mealId));
    } catch (error) {
      setError("Error deleting meal");
    }
  };

  const updateMeal = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put('http://localhost:5000/meals', formData, config);
      alert(response.data.message);
      setMeals(meals.map((meal) => (meal.id === formData.id ? formData : meal)));
      setEditingMealId(null);
      setFormData({
        id: '',
        name: '',
        description: '',
        price: '',
        image_url: '',
        caterer_id: ''
      });
    } catch (error) {
      setError("Error updating meal");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMeal();
  };

  return (
    <div>
      <h1>Manage Meals</h1>
      <button onClick={goBackToAdminDashboard}>Back to Admin Dashboard</button> {/* Back button */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40' />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'/>
        </div>
        <div>
          <label>Price: </label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40' />
        </div>
        <div>
          <label>Image URL: </label>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'/>
        </div>
        <div>
          <label>Caterer id:</label>
          <select name="caterer_id" value={formData.caterer_id} onChange={handleCatererChange}>
            <option value="">Select a caterer</option>
            {caterers.map(caterer => (
              <option key={caterer.caterer_id} value={caterer.caterer_id}>
                {caterer.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{editingMealId ? 'Update Meal' : 'Add Meal'}</button>
      </form>
      {error && <p>{error}</p>}
      <h2>Meals</h2>
      <ul>
        {meals && meals.map(meal => (
          <li key={meal.id}>
            <p>Name: {meal.name}</p>
            <p>Description: {meal.description}</p>
            <p>Price: ${meal.price}</p>
            <p>Caterer ID: {meal.caterer_id}</p>
            <img src={meal.image_url} alt={meal.name} />
            <button onClick={() => editMeal(meal)}>Edit</button>
            <button onClick={() => deleteMeal(meal.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealList;
