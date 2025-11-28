import React, { useEffect, useState } from 'react';
import Footer from './AFooter'; 
import Header from './AdminHeader'; 
import '../Styling/AdminProfile.css'; 

const AdminProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user")) ;
    const id = user.user_id;
  
    fetch(`http://localhost:3001/api/admin-profile/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        return response.json();
      })
      .then((data) => {
        setProfileData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Dependency array ensures fetch runs when adminId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-container">
      <Header />
      <h1 className="largetextblue">My Profile</h1>
      <table className="profile-table">
        <tbody>
          <tr>
            <td className="tableCellFirst">
              <label>Full Name:</label>
            </td>
            <td className="tableCell">
              <label>{profileData.full_name}</label>
            </td>
          </tr>
          <tr>
            <td className="tableCellFirst">
              <label>Date Of Birth:</label>
            </td>
            <td className="tableCell">
              <label>{profileData.date_of_birth}</label>
            </td>
          </tr>
          <tr>
            <td className="tableCellFirst">
              <label>Email:</label>
            </td>
            <td className="tableCell">
              <label>{profileData.email}</label>
            </td>
          </tr>
          <tr>
            <td className="tableCellFirst">
              <label>Contact Number:</label>
            </td>
            <td className="tableCell">
              <label>{profileData.contact_number}</label>
            </td>
          </tr>
          <tr>
            <td className="tableCellFirst">
              <label>Password:</label>
            </td>
            <td className="tableCell">
              <label>{profileData.password}</label>
            </td>
          </tr>
          <tr>
            <td className="tableCellFirst">
              <label>Hire Date:</label>
            </td>
            <td className="tableCell">
              <label>{profileData.hire_date}</label>
            </td>
          </tr>
         
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default AdminProfile;
