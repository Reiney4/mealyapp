import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/actions/orderActions.js';
import OrderItem from './OrderItem.js';
import './Orders.css'; 

const Orders = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error loading orders: {error}</p>;

    return (
        <div className="orders-container">
            <h1>Your Orders</h1>
            {Array.isArray(orders) && orders.length === 0 ? (
                <p>No orders found!</p>
            ) : (
                <div className="orders-list">
                    {Array.isArray(orders) && orders.map((order) => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
