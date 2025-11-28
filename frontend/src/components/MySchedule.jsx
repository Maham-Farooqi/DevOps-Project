import React, { useState, useEffect } from 'react';
import Footer from './DFooter';
import Header from './DHeader';
import { useNavigate } from 'react-router-dom';
import '../Styling/MySchedule.css';

function MySchedule() {
  const navigate = useNavigate();
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  // Fetch appointments data
  async function loadData() {
    try {
     const user = JSON.parse(sessionStorage.getItem("user")) ;
     const id = user.doctor_id;
      const response = await fetch(`http://localhost:3001/api/appointments/${id}`);
      if (response.ok) {
        const data = await response.json();
        setAppointmentsData(data);
      } else {
        console.error('Failed to fetch appointments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Handle rescheduling
  const handleRescheduleClick = (appointment) => {
    navigate('/doctor/patients', { state: { rescheduleAppointment: appointment } });
  };

  // Handle cancel popup
  const handleCancelClick = (appointment) => {
    setAppointmentToCancel(appointment.appointment_id);
    setShowCancelPopup(true);
  };

  // Confirm cancellation
  const confirmCancel = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/appointments/${appointmentToCancel}/cancel`, {
        method: 'PUT',
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);

        // Remove cancelled appointment from state
        setAppointmentsData((prevData) =>
          prevData.filter((appointment) => appointment.appointment_id !== appointmentToCancel)
        );
      } else {
        const errorData = await response.json();
        alert(`Failed to cancel: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('An error occurred while cancelling the appointment.');
    } finally {
      setShowCancelPopup(false);
      setAppointmentToCancel(null);
    }
  };

  const closeCancelPopup = () => {
    setShowCancelPopup(false);
    setAppointmentToCancel(null);
  };

  // Get appointment details for cancel popup
  const appointmentDetails = appointmentsData.find(
    (appointment) => appointment.appointment_id === appointmentToCancel
  );

  return (
    <>
      <div className="my-schedule">
        <Header />
        <div className="my-schedule-content">
          <h1>My Schedule</h1>
          <p>Manage and view your upcoming appointments.</p>

          {/* Appointments Table */}
          <div className="appointments-table-container">
            {appointmentsData.length > 0 ? (
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Patient_ID</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsData.map((appointment, index) => (
                    <tr key={index}>
                      <td>{appointment.patient_id}</td>
                      <td>{appointment.appointment_time}</td>
                      <td>{appointment.status}</td>
                      <td>
                        <button
                          className="action-btn"
                          onClick={() => handleRescheduleClick(appointment)}
                        >
                          Reschedule
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => handleCancelClick(appointment)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No appointments found.</p>
            )}
          </div>
        </div>

        {/* Cancel Popup */}
        {showCancelPopup && appointmentDetails && (
          <div className="cancel-popup">
            <div className="cancel-popup-content">
              <h3>Confirm Cancelation</h3>
              <p>
                Are you sure you want to cancel the appointment with{' '}
                <strong>{appointmentDetails.patient_id}</strong> at{' '}
                <strong>{appointmentDetails.appointment_time}</strong>?
              </p>
              <div className="popup-buttons">
                <button className="confirm-btn" onClick={confirmCancel}>
                  Yes, Cancel
                </button>
                <button className="cancel-btn" onClick={closeCancelPopup}>
                  No, Keep
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MySchedule;
