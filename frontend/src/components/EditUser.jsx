import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Footer from './AFooter';
import "../Styling/EditUser.css";

const EditUser = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState({ full_name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${id}`); 
        if (!response.ok) {
          throw new Error('User not found');
        }
        const fetchedUser = await response.json();
        setUser(fetchedUser); // Set user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!user.full_name.trim()) validationErrors.name = 'Full Name is required.';  // Validation for `full_name`
    if (!user.email.trim()) validationErrors.email = 'Email Address is required.';
    return validationErrors;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        console.log(user)
        const response = await fetch(`http://localhost:3001/api/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user), 
        });

        if (!response.ok) {
          throw new Error('Failed to update user');
        }

        setSuccessMessage('User has been updated successfully!');
        setTimeout(() => setSuccessMessage(''), 5000);
        navigate('/manage-users');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="edit-user-container">
        <h1>Edit User</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="profile-form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              id="full_name"
              name="full_name"  // Name attribute matches user object property
              value={user.full_name || ''}  // Ensure value is not undefined
              onChange={handleChange}
              placeholder="Enter full name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email || ''}  // Ensure value is not undefined
              onChange={handleChange}
              placeholder="Enter email address"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <button type="submit" className="btn-save">Save Changes</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditUser;
