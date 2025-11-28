import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import '../Styling/RescheduleAppointment.css';


const RescheduleAppointment = ({ patient, onReschedule }) => {
  const [newAppointmentTime, setNewAppointmentTime] = useState('');
  const [error, setError] = useState('');

  const handleReschedule = () => {
    if (!newAppointmentTime) {
      setError('Please select a new appointment time');
      return;
    }
    onReschedule(newAppointmentTime);  
    setError('');
  };

  return (
    <div className="reschedule-form">
      {error && <div className="error">{error}</div>}
      <h3>Reschedule Appointment for {patient.name}</h3>
      <div className="form-group">
        <label htmlFor="appointment-time">New Appointment Time</label>
        <input
          type="datetime-local"
          id="appointment-time"
          value={newAppointmentTime}
          onChange={(e) => setNewAppointmentTime(e.target.value)}
        />
      </div>
      <button onClick={handleReschedule} className="btn-reschedule">
        <FaCalendarAlt /> Reschedule
      </button>
    </div>
  );
};


export default RescheduleAppointment;
