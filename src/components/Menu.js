import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Menu = () => {
    const auth = useSelector((state) => state.auth);

    const [menus, setMenus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/menus')
        .then(response => {
            if (!response.ok) { throw new Error('Network response was not ok'); }
            return response.json();
        })
        .then(data => {
            setMenus(data.menus);
            setIsLoading(false);
        })
        .catch(error => {
            setError('Failed to fetch menus: ' + error.message);
            setIsLoading(false);
        });
    }, []);

    if (auth.user.role !== 'admin') {
        return <Redirect to="/dashboard" />;
    }

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (error) {
        return <span>Error: {error}</span>;
    }

    const today = new Date().toDateString();
    const todayMenu = menus.find(menu => new Date(menu.day).toDateString() === today);
    console.log(todayMenu);

    return (
        <div>
            <h2>Menus</h2>
            {todayMenu ? (
                <div>
                    <h3>Today's Menu ({today})</h3>
                    <ul>
                        {todayMenu.menu_meals.map(menuMeal => (
                            <li key={menuMeal.meal.id}>
                                {menuMeal.meal.name} - ${menuMeal.meal.price}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No menu available for today.</p>
            )}
        </div>
    );
}

export default Menu;
