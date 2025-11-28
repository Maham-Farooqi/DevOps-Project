import React, { useState } from 'react';
import Header from './DHeader';
import Footer from './DFooter';
import '../Styling/ProfileSettings.css';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.name.trim()) validationErrors.name = 'Full Name is required.';
    if (!formData.email.trim()) validationErrors.email = 'Email Address is required.';
    if (!formData.password.trim()) validationErrors.password = 'Password is required.';
    if (formData.password && formData.password.length < 6)
      validationErrors.password = 'Password must be at least 6 characters.';
    if (!formData.confirmPassword.trim())
      validationErrors.confirmPassword = 'Confirm Password is required.';
    if (formData.password !== formData.confirmPassword)
      validationErrors.confirmPassword = 'Passwords do not match.';
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      try {
         // const id = JSON.parse(sessionStorage.getItem('user'))?.user_id || 'D101';
      const id='3'
        const response = await fetch('http://localhost:3001/api/update-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id:id,
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setSuccessMessage('Your profile has been updated successfully!');
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
          setTimeout(() => setSuccessMessage(''), 5000); 
        } else {
          setErrors({ api: data.message || 'An error occurred while updating your profile.' });
        }
      } catch (error) {
        setErrors({ api: 'Failed to connect to the server. Please try again later.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="profile-settings">
        <h1>Profile Settings</h1>
        <p className="description">Update your profile details below.</p>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.api && <p className="error">{errors.api}</p>}
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a new password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSettings;
