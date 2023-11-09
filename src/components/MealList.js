import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {Row, Col,Card} from "react-bootstrap";

const MealList = () => {
  const [editingMealId, setEditingMealId] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [image_url, setImage_url] = useState('');
  const [meals, setMeals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    caterer_id: '',
  });

  const history = useHistory();
  const [caterers, setCaterers] = useState([]);
  const [error, setError] = useState(null);

  const goBackToAdminDashboard = () => {
    history.push('/admin-dashboard'); 
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
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dizhfsddx',
        uploadPreset: 'giftkimani',
      },
      function (error, result) {
        if (!error && result && result.event === 'success') {
          setImage_url(result.info.secure_url);
        }
      }
    );
  }, []);

  useEffect(() => {
    const fetchCaterers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/caterers');
        setCaterers(response.data.caterers);
      } catch (error) {
        setError('Error fetching caterers');
      }
    };
    fetchCaterers();
    fetchMeals();
  }, []);



  const addMeal = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const formDataWithImage = { ...formData, image_url: image_url };

      const response = await axios.post(
        'http://localhost:5000/meals',
        formDataWithImage,
        config
      );
      alert(response.data.message);
      setMeals([...meals, formDataWithImage]);
      setImage_url('');
      setFormData({
        name: '',
        description: '',
        price: '',
        image_url: '',
        caterer_id: ''
      });
    } catch (error) {
      setError('Error adding meal');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCatererChange = (e) => {
    const selectedCatererId = e.target.value;
    setFormData({ ...formData, caterer_id: selectedCatererId });
  };

  // This function edits the meal with the given ID
  const editMeal = (mealId) => {
    setEditingMealId(mealId);
    const meal = meals.find((meal) => meal.id === mealId);
    setFormData(meal);
    updateMeal();
  };

  // This function deletes the meal with the given ID
  const deleteMeal = async (mealId) => {
    try {
      const token = localStorage.getItem('access-token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete('http://localhost:5000/meals', { data: { id: mealId }, ...config });
      alert('Meal deleted successfully!');
      setMeals(meals.filter((meal) => meal.id !== mealId));
    } catch (error) {
      setError('Error deleting meal');
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

  useEffect(() => {
    fetchMeals();
  }, []);
  return (
    <Row>
      <Col  md={12}>
      <h1>Manage Meals</h1>
      <Row>
      <h2>Meals</h2>
                
        {meals && meals.map(meal => (
          <Col md={5}> 
          <Card 
          style={{ width: '25rem'}}>
          <li key={meal.id}>
            <p>Name: {meal.name}</p>
            <p>Description: {meal.description}</p>
            <p>Price: ${meal.price}</p>
            <p>Caterer ID: {meal.caterer_id}</p>
            <img src={meal.image_url} alt={meal.name} />
            <button onClick={() => editMeal(meal)}>Edit</button>
            <button onClick={() => deleteMeal(meal.id)}>Delete</button>
          </li>
          </Card>
          </Col>
        ))}
       
      {/* </ul> */}
      </Row>
      </Col>
      <Col md={20}>
        <Card>
      <button className='backtoadmin' onClick={goBackToAdminDashboard}>Back to Admin Dashboard</button> {/* Back button */}
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
          <button type="button" onClick={() => widgetRef.current.open()}>
            Upload Image
          </button>

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
      </Card>
      </Col>
     
      
     
    </Row>
  )
};


export default MealList;


