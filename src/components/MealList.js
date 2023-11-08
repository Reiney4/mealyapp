import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MealList = () => {
  const [meals, setMeals] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    caterer_id: ''
  });
  const [caterers, setCaterers] = useState([]);
  const [error, setError] = useState(null);
  const fetchMeals = async () => {
    
    try {
      const token = localStorage.getItem('access-token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:5000/meals', config);
      console.log(response.data["meal options"])
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
    fetchMeals()
  }, []); 

  const addMeal = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const formDataWithIntegerPrice = { ...formData, price: parseInt(formData.price, 10) };
      const response = await axios.post('http://localhost:5000/meals', formDataWithIntegerPrice, config);
      alert(response.data.message);
    } catch (error) {
      setError("Error adding meal");
    }
  };
  
  const handleChange = (e) => {
    if (e.target.name !== 'caterer_id') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(e.target.value)
    }
  };
  
  const handleCatererChange = (e) => {
    console.log('Handle Caterer Change called');
    const selectedCatererId = e.target.value;
    setFormData({ ...formData, caterer_id: selectedCatererId });
    console.log(selectedCatererId)
  };

  
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    addMeal();
  };

  // useEffect(() => {
  //   fetchMeals();
  //    // Fetch caterers when the component mounts
  // }, []);

  return (
    <div>
      <h1>Manage Meals</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40' />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" name="description" onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'/>
        </div>
        <div>
          <label>Price: </label>
          <input type="number" name="price" onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40' />
        </div>
        <div>
          <label>Image URL: </label>
          <input type="text" name="image_url" onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'/>
        </div>
        <div>
          <label>Caterer id:</label>
          <select
           name="caterer_id"
           value={formData.caterer_id}
          onChange={handleCatererChange}
         >
          
  <option value="">Select a caterer</option>
  {caterers.map(caterer => (
    <option key={caterer.caterer_id} value={caterer.caterer_id}>
      {caterer.name}
      
    </option>
  ))}
</select>

        </div>

        <button type="submit">Add Meal</button>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MealList = () => {
//   const [meals, setMeals] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image_url: '',
//     caterer_id: '', // Initialize caterer_id as an empty string
//   });
//   const [error, setError] = useState(null);

//   const fetchMeals = async () => {
//     try {
//       const token = localStorage.getItem('access-token');
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const response = await axios.get('http://localhost:5000/meals', config);
//       setMeals(response.data.meals);
//     } catch (error) {
//       setError("Error fetching meals");
//     }
//   };

//   useEffect(() => {
//     // Fetch meals when the component mounts
//     fetchMeals();
//   }, []);

//   const addMeal = async () => {
//     try {
//       const token = localStorage.getItem('access-token');
//       const config = { headers: { Authorization: `Bearer ${token}` } };
  
//       // Convert the price field to an integer
//       const formDataWithIntegerPrice = { ...formData, price: parseInt(formData.price, 10) };
  
//       const response = await axios.post('http://localhost:5000/meals', formDataWithIntegerPrice, config);
//       alert(response.data.message);
//       fetchMeals();
//     } catch (error) {
//       setError("Error adding meal");
//     }
//   };
  
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     console.log(e.target.value)
//   };

    

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addMeal();
//   };

//   return (
//     <div>
//       <h1>Manage Meals</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name: </label>
//           <input type="text" name="name" onChange={handleChange} />
//         </div>
//         <div>
//           <label>Description: </label>
//           <input type="text" name="description" onChange={handleChange} />
//         </div>
//         <div>
//           <label>Price: </label>
//           <input type="number" name="price" onChange={handleChange} />
//         </div>
//         <div>
//           <label>Image URL: </label>
//           <input type="text" name="image_url" onChange={handleChange} />
//         </div>
//         <div>
//           <label>Caterer id:</label>
//           <input
//             type="text"
//             name="caterer_id"
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Add Meal</button>
//       </form>
//       {error && <p>{error}</p>}
//       <h2>Meals</h2>
//       <ul>
//         {meals && meals.map(meal => (
//           <li key={meal.id}>
//             <p>Name: {meal.name}</p>
//             <p>Description: {meal.description}</p>
//             <p>Price: ${meal.price}</p>
//             <p>Caterer ID: {meal.caterer_id}</p>
//             <img src={meal.image_url} alt={meal.name} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MealList;

