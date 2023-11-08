import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import orderReducer from './orderReducer.js';

const rootReducer = combineReducers({
    auth: authReducer,
    orders: orderReducer
});

export default rootReducer;
