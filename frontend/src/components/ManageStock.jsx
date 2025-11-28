import React, { useState, useEffect } from 'react';
import Footer from './AFooter';
import AdminHeader from './AdminHeader';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import '../Styling/ManageStock.css';

const ManageStock = () => {
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ name: '', category: '', description: '', stock: '', price: '', date: '' });
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [medicineToDelete, setMedicineToDelete] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/medicines');
        if (!response.ok) {
          throw new Error('Failed to fetch medicines');
        }
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleStockChange = async (id, amount) => {
    const updatedMedicine = medicines.find(medicine => medicine.medicine_id === id);
    const newStock = Math.max(updatedMedicine.stock + amount, 0); 

    try {
      const response = await fetch(`http://localhost:3001/api/medicines/${id}/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: newStock }),
      });

      if (!response.ok) {
        throw new Error('Failed to update stock');
      }

      // Update local state only if the backend operation succeeds
      setMedicines(medicines.map(medicine =>
        medicine.medicine_id === id ? { ...medicine, stock: newStock } : medicine
      ));
    } catch (err) {
      console.error('Error updating stock:', err);
      alert('Failed to update stock');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/medicines/${medicineToDelete.medicine_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete medicine');
      }

      setMedicines(medicines.filter(medicine => medicine.medicine_id !== medicineToDelete.medicine_id));
      setShowDeletePopup(false);
    } catch (err) {
      console.error('Error deleting medicine:', err);
      alert('Failed to delete medicine');
    }
  };

  const handleAddMedicine = async () => {
    if (!newMedicine.name || !newMedicine.category || !newMedicine.description || !newMedicine.stock || !newMedicine.price || !newMedicine.date) {
      alert('Please fill out all fields.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/api/medicinesadd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMedicine),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add medicine');
      }
      alert('Medicine added');

    
      setMedicines([...medicines, { ...newMedicine, medicine_id: medicines.length + 1 }]);
      setNewMedicine({ name: '', category: '', description: '', stock: '', price: '', date: '' });
    } catch (error) {
      console.error('Error adding medicine:', error);
      alert('Failed to add medicine');
    }
  };
  
  return (
    <>
      <AdminHeader />
      <div className="manage-stock-container">
        <h1 className="manage-stock-heading">Manage Medicine Stock</h1>

        {/* Search and Filter */}
        <div className="filter-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search Medicine..."
            value={search}
            onChange={handleSearch}
          />

        </div>

        {/* Medicine List */}
        <div className="medicine-list">
          {medicines
            .filter(medicine => medicine.name.toLowerCase().includes(search.toLowerCase()))
            .filter(medicine => !typeFilter || medicine.type === typeFilter)
            .map(medicine => (
              <div className="medicine-card" key={medicine.medicine_id}> {/* Use medicine.medicine_id */}
                <h3>{medicine.name}</h3>
                <p>{medicine.category} - {medicine.type}</p>
                <p>Stock: {medicine.stock}</p>
                <p>Price: ${medicine.price}</p>
                <div className="action-buttons">
                  <button onClick={() => handleStockChange(medicine.medicine_id, 10)}><FaPlus /> Restock +10</button>
                  <button onClick={() => handleStockChange(medicine.medicine_id, -10)}><FaMinus /> Deduct -10</button>
                  <button onClick={() => { setMedicineToDelete(medicine); setShowDeletePopup(true); }}><FaTrash /> Delete</button>
                </div>
              </div>
            ))}
        </div>

        {/* Add New Medicine */}
        <div className="add-medicine-form">
          <h3>Add New Medicine</h3>
          <input
            type="text"
            className="input"
            placeholder="Medicine Name"
            value={newMedicine.name}
            onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
          />
          <input
            type="text"
            className="input"
            placeholder="Category"
            value={newMedicine.category}
            onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })}
          />
          <input
            type="text"
            className="input"
            placeholder="Description"
            value={newMedicine.description}
            onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })}
          />
          <input
            type="number"
            className="input"
            placeholder="Stock (e.g., 50)"
            value={newMedicine.stock}
            onChange={(e) => setNewMedicine({ ...newMedicine, stock: Math.max(0, Number(e.target.value)) })}
          />
          <input
            type="number"
            className="input"
            placeholder="Price (e.g., 20)"
            value={newMedicine.price}
            onChange={(e) => setNewMedicine({ ...newMedicine, price: Math.max(0, Number(e.target.value)) })}
          />
          <input
            type="date"
            className="input"
            placeholder="Expiry Date"
            value={newMedicine.date}
            onChange={(e) => setNewMedicine({ ...newMedicine, date: e.target.value })}
          />
          <button onClick={handleAddMedicine} className="add-btn">Add Medicine</button>
        </div>

      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="cancel-popup">
          <div className="popup-content">
            <h2>Are you sure you want to delete this medicine?</h2>
            <div className="popup-actions">
              <button onClick={handleDelete} className="confirm-btn">Yes, Delete</button>
              <button onClick={() => setShowDeletePopup(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ManageStock;
