import React from "react";
import { useNavigate } from "react-router-dom"; 
import Footer from "./AFooter";
import Header from "./AdminHeader";
import "../Styling/AdminHome.css";

const AdminHome = () => {
  const navigate = useNavigate(); 


  const handleManageUsers = () => {
    navigate("/manage-users"); 
  };

  const handleManageStock = () => {
    navigate("/manage-stock"); 
  };

  return (
    <>
      <Header />
      <div className="admin-home">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h2>Users</h2>
            <p>View and manage all user profiles</p>
            <button className="dashboard-btn" onClick={handleManageUsers}>Manage Users</button>
          </div>
          <div className="dashboard-card">
            <h2>Stock</h2>
            <p>Update the stock of medicines</p>
            <button className="dashboard-btn" onClick={handleManageStock}>Manage Stock</button>
          </div>
        </div>
      </div>
      <Footer className="footer" />
    </>
  );
};

export default AdminHome;
