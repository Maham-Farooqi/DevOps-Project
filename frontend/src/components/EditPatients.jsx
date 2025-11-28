import React, { useState, useEffect } from 'react';
import '../Styling/editPatients.css';

const EditPatient = ({ patient, onSave, onCancel }) => {
  const [formData, setFormData] = useState(patient);

  useEffect(() => {
    setFormData(patient); 
  }, [patient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({});
    onSave(formData); 
  };

  return (
    <div className="edit-patient-form">
      <h2>Edit Patient</h2>
      <form onSubmit={handleSubmit}>
        {/* <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age || ''}
          onChange={handleInputChange}
        /> */}
        <label>Medical Summary:</label>
        <textarea
          name="medicalSummary"
          value={formData.medicalSummary || ''}
          onChange={handleInputChange}
        />
        <label>Notes:</label>
        <textarea
          name="notes"
          value={formData.notes || ''}
          onChange={handleInputChange}
        />
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPatient;
