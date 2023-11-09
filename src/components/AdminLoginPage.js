import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AdminLoginPage.css';

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
        <div className='admin-login-container'>

            <h2 className='admin-login-title'> Admin Login</h2>
            
            <input className='admin-login-input'
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input className='admin-login-input'
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input className='admin-login-input'
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className='admin-login-button' onClick={handleLogin}>Login</button>
            {errors.map((error, index) =>
                <p key={index} style={{ color: 'red' }}>{error}</p>
            )}
        </div>

    );
}

export default AdminLoginPage;
