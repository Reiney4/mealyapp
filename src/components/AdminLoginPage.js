import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access-token')}`,  // Change "access-token" to "access_token"
                }
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data)

            if (data.access_token) {
                localStorage.setItem('access-token', data.access_token);  // Change "access-token" to "access_token"
            }
            

            if (data.message === 'Logged in successfully') {
                if (data.role === 'admin') {
                    history.push('/admin-dashboard');
                } else {
                    // Handle the absence of the role attribute or other roles
                    setErrors(prevErrors => [...prevErrors, "Authentication Failed"]);
                }
            } else {
                setErrors(prevErrors => [...prevErrors, "Authentication Failed"]);
            }
        } catch (error) {
            setErrors(prevErrors => [...prevErrors, error.message]);
        }
    }

    return (
        <div>
            <h2>Admin Login</h2>
            <input
                className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
            {errors.map((error, index) =>
                <p key={index} style={{ color: 'red' }}>{error}</p>
            )}
        </div>
    );
}

export default AdminLoginPage;
