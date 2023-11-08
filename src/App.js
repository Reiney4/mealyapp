import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Dashboard from './components/Dashboard.js';
import UserLoginPage from './components/UserLoginPage.js'; 
import AdminLoginPage from './components/AdminLoginPage.js'; 
import Register from './components/Register.js';
import AdminDashboard from './components/AdminDashboard.js';
import UserDashboard from './components/UserDashboard.js';
import Navbar from './components/Navbar.js';
import PrivateRoute from './components/PrivateRoute.js'; 
import MealList from './components/MealList.js';
import DayMenu from './components/DayMenu.js';
import Orders from './components/Orders.js';
import OrderItem from './components/OrderItem.js';
import NotFound from './components/NotFound.js';

import { getUserDetails } from './redux/actions/authActions.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let token = localStorage.getItem('access-token');
        // console.log("Retrieved token:", token);
  
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          dispatch(getUserDetails());
        }
        
      } catch (error) {
        console.error('Error fetching auth token from storage', error);
      }
    };
  
    fetchUserDetails();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/login_user" component={UserLoginPage} />
          <Route path="/login_admin" component={AdminLoginPage} />
          <Route path="/register" component={Register} /> 
          <Route path="/admin/register" component={Register} /> 
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/customer-dashboard" component={UserDashboard} />
          <PrivateRoute path="/dashboard" component={AdminDashboard} role="caterer" />
          <Route path="/meals" component={MealList} />
          <Route path="/menu" component={DayMenu} />
          <Route path="/orders" component={Orders} />
          <Route path="/history" component={OrderItem} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
