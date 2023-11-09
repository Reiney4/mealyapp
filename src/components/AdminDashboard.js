import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css"; // Import your CSS file
import { Row, Col } from "react-bootstrap";

const AdminDashboard = () => {
  return (
    <div style={{marginLeft:0}}>
    <Row className="justify-content-center">
      <Col xs={4}>
        <div className="admin-dashboard-container">
          <h1 className="admin-dashboard-title">Admin Dashboard</h1>
          <ul className="admin-dashboard-menu">
            <li>
              <Link to="/meals" className="admin-dashboard-link">
                Manage Meals
              </Link>
            </li>
            <li>
              <Link to="/menu" className="admin-dashboard-link">
                Set Menu for the Day
              </Link>
            </li>
            <li>
              <Link to="/orders" className="admin-dashboard-link">
                View Orders
              </Link>
            </li>
            <li>
              <Link to="/earnings" className="admin-dashboard-link">
                View Earnings
              </Link>
            </li>
          </ul>
        </div>
      </Col>
      <Col></Col>
      <Col></Col>
      <Col></Col>
    </Row>
    </div>
  );
};

export default AdminDashboard;
