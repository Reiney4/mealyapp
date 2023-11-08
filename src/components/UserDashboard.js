import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className='p-4 text-center'>
      <h1>Customer Dashboard</h1>
      <ul>
        <li><Link to="/userprofile">Profile</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/orders">View your order</Link></li>
        <li><Link to="/menu">View today's menu</Link></li>
        {/* <li><Link to="/user/change-meal">Change Meal Choice</Link></li> */}
        {/* <li><Link to="/user/edit-profile">Edit Profile</Link></li> */}
      </ul>
    </div>
  );
};

export default UserDashboard;
