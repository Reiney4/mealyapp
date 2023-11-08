// src/components/OrderItem/OrderItem.js
import React from 'react';
import PropTypes from 'prop-types';
import './OrderItem.css'; // For styling


const OrderItem = ({ order }) => {
    return (
        <div className="order-item">
            <h2>Order #{order.id}</h2>
            <p><strong>Meal:</strong> {order.meal.name}</p> {/* Adjust according to how meal details are received */}
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Total Amount:</strong> ${order.total_amount.toFixed(2)}</p>
            <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
            {/* If there are additional details to include, such as order status, they can be added here */}
        </div>
    );
};

OrderItem.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        meal: PropTypes.shape({
            name: PropTypes.string.isRequired,
            // Include other meal properties as required
        }).isRequired,
        quantity: PropTypes.number.isRequired,
        total_amount: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        // Define any other required properties of the 'order' object here
    }).isRequired,
};

export default OrderItem;
