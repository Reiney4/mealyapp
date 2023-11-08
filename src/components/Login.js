import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUp } from '../api.js'; // Adjust the import to the correct path for your registration API

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, error } = auth;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      history.push(auth.role === 'admin' ? '/admindashboard' : '/userdashboard');
    }

    if (error) {
      setErrors(error);
    }
  }, [isAuthenticated, error, history, auth.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signUp({ username, email, password, role });
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });

      if (data.result.role === 'admin') {
        history.push('/admindashboard');
      } else {
        history.push('/userdashboard');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          {errors.username && <span>{errors.username}</span>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <label>Forgotten password? <a href='/https://localhost:3000/password'>Click here!</a></label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Role"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          />
          {errors.role && <span>{errors.role}</span>}
        </div>
        {errors.general && <span>{errors.general}</span>}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
