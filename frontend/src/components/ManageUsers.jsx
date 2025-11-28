import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import Footer from './AFooter';
import { useNavigate } from 'react-router-dom';
import '../Styling/ManageUsers.css';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    // Navigate to the edit page, passing the user ID as a parameter
    navigate(`/edit-user/${userId}`);
  };

  const handleDelete = async (userId) => {
    setUserToDelete(userId);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        alert('Failed to delete user!');
        setShowDeletePopup(false);
        setUserToDelete(null);
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user.user_id !== userToDelete));
      setShowDeletePopup(false);
      setUserToDelete(null);
      console.log(`Deleted user with ID: ${userToDelete}`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setUserToDelete(null);
  };

  return (
    <>
      <AdminHeader />
      <div className="manage-user-container">
        <h2>Manage Users</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.user_id}>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user.user_id)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(user.user_id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />

      {showDeletePopup && (
        <div className="delete-popup">
          <div className="popup-content">
            <h3>Delete User</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="popup-actions">
              <button className="confirm-btn" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="cancel-btn" onClick={closeDeletePopup}>
                No, Keep
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageUser;
