// export default store;
// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

// Import your reducers here
import authReducer from './reducers/authReducer';
import mealsReducer from './reducers/mealsReducer';
import ordersReducer from './reducers/ordersReducer';
import menuReducer from './reducers/menuReducer';
import notificationReducer from './reducers/notificationReducer'; // if you implement notifications

// Combine reducers
const reducer = {
  auth: authReducer,
  meals: mealsReducer,
  orders: ordersReducer,
  menu: menuReducer,
  notification: notificationReducer, // if you implement notifications
};

const middleware = [thunk];

// Use the Redux logger in development environment only
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middleware.push(logger);
}

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
