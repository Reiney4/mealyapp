import React, { useState, useEffect } from 'react';

const DayMenu = ({ match }) => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [menuId, setMenuId] = useState(null); 

    useEffect(() => {
        // Check if match and match.params exist before accessing match.params.id
        const fetchedMenuId = match && match.params ? match.params.id : null;
        
        setMenuId(fetchedMenuId);

        if (!fetchedMenuId) {
            setError('Menu ID is missing');
            setIsLoading(false);
            return;
        }

        fetch(`/api/menu/${fetchedMenuId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMeals(data?.meals || []);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });

    }, [match]);

    const handleSelectMeal = (mealId) => {
        console.log("Meal selected: ", mealId);
    };

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (error) {
        return <span>Error: {error}</span>;
    }

    return (
        <div>
            <h2>Menu for {menuId && new Date(menuId).toDateString()}</h2>
            <ul>
                {meals.map(meal => (
                    <li key={meal.id}>
                        <h3>{meal.name}</h3>
                        <p>{meal.description}</p>
                        <p>Price: ${meal.price}</p>
                        <img src={meal.image_url} alt={meal.name} width="100" />
                        <button onClick={() => handleSelectMeal(meal.id)}>Select</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DayMenu;
