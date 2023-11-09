// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrders } from '../redux/actions/orderActions.js';
// import OrderItem from './OrderItem.js';
// import './Orders.css'; 

// const Orders = () => {
//     const dispatch = useDispatch();
//     const { orders, loading, error } = useSelector(state => state.orders);

//     useEffect(() => {
//         dispatch(fetchOrders());
//     }, [dispatch]);

//     if (loading) return <p>Loading orders...</p>;
//     if (error) return <p>Error loading orders: {error}</p>;

//     return (
//         <div className="orders-container">
//             <h1>Your Orders</h1>
//             {Array.isArray(orders) && orders.length === 0 ? (
//                 <p>No orders found!</p>
//             ) : (
//                 <div className="orders-list">
//                     {Array.isArray(orders) && orders.map((order) => (
//                         <OrderItem key={order.id} order={order} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Orders;
import React from 'react';
import './Orders.css';

const Orders = () => {
  return (
    <div>
      <header>
        <h1>Your Orders</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            {/* Other nav items */}
          </ul>
        </nav>
      </header>

      <main>
        {/* ... Other sections ... */}

        <section className="order-list">
          <h3>Your Recent Orders</h3>
          <ul>
            <li>Order ID: 1, Meal: Pizza, Quantity: 2, Total: $20.00, Created At: 2023-11-01</li>
            <li>Order ID: 2, Meal: Sushi, Quantity: 4, Total: $35.00, Created At: 2023-11-02</li>
            <li>Order ID: 3, Meal: Burger, Quantity: 3, Total: $15.00, Created At: 2023-11-03</li>
            <li>Order ID: 4, Meal: Pasta, Quantity: 2, Total: $22.00, Created At: 2023-11-04</li>
            <li>Order ID: 5, Meal: Salad, Quantity: 1, Total: $12.00, Created At: 2023-11-05</li>
            <li>Order ID: 6, Meal: Tacos, Quantity: 5, Total: $25.00, Created At: 2023-11-06</li>
            <li>Order ID: 7, Meal: Steak, Quantity: 2, Total: $30.00, Created At: 2023-11-07</li>
            <li>Order ID: 8, Meal: Sandwich, Quantity: 3, Total: $18.00, Created At: 2023-11-08</li>
            <li>Order ID: 9, Meal: Ramen, Quantity: 2, Total: $16.00, Created At: 2023-11-09</li>
            {/* You can add more orders here if needed */}
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Mealy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Orders;