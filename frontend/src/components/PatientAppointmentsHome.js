import React, { useState, useEffect } from "react";
import Footer from './Footer';
import Header from './Header';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PatientAppointmentsHome = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = (path) => {
    window.location.href = path;
  };
  const [appointmentId,setSelectedAppointmentId] = useState([]);
  const [appointments, setAppointments] = useState([]);

  async function loadData() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.user_id) {
      const id = user.patient_id
      const response = await fetch(`http://localhost:3001/appointments/${id}`);
      if (response.ok) {
        let arrays = await response.json();
        setAppointments(arrays);
      } else {
        throw new Error('Failed to fetch appointments');
      }
    }
  }

  useEffect(() => {
    loadData();
  }, []);


  const handleCancelClick = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowPopup(true);
  };
  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedAppointmentId(null);
  };


  const handleConfirmCancel = async () => {
    try {
      const response = await fetch(`http://localhost:3001/appointments/${appointmentId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
  
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.appointment_id !== appointmentId)
        );
      } else {
        const error = await response.json();
        toast.error('Error:', error.message);
      }
    } catch (err) {
      toast.error('Network error:', err);
    } finally {
      setShowPopup(false);
      setSelectedAppointmentId(null);
    }
  };
  
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer />
      <h1 style={styles.largetextblue}>My Appointments</h1>
      <div>
        <h2 style={styles.blueh2}>Upcoming Appointments</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Appointment ID</th>
              <th style={styles.tableHeader}>Appointment Date</th>
              <th style={styles.tableHeader}>Doctor Name</th>
              <th style={styles.tableHeader}>Scheduled Time</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}> </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td style={styles.tableCell}>{appointment.appointment_id}</td>
                <td style={styles.tableCell}>{appointment.appointment_date}</td>
                <td style={styles.tableCell}>{appointment.full_name}</td>
                <td style={styles.tableCell}>{appointment.appointment_time}</td>
                <td style={styles.tableCell}>{appointment.status}</td>
                <td style={styles.tableCell}>
                  <div style={styles.buttonContainer}>
                    <button
                      style={styles.button}
                      onClick={() => navigate(`/reshedule/${appointment.appointment_id}?doctor=${appointment.full_name}`)}
                    >
                      Reschedule
                    </button>
                    <button
                      style={styles.button}
                      onClick={() => handleCancelClick(appointment.appointment_id)}
                    >
                      Cancel
                    </button>
                  </div>
                </td>

              </tr>
            ))}
            {showPopup && (
              <div style={styles.popupOverlay}>
                <div style={styles.popup}>
                  <h3>Are you sure you want to cancel this appointment?</h3>
                  <button style={styles.button} onClick={handlePopupClose}>
                    No
                  </button>
                  <button style={styles.button} onClick={handleConfirmCancel}>
                    Yes
                  </button>
                </div>
              </div>
            )}

          </tbody>
        </table>
      </div>

      <div style={styles.bookAppointmentSection}>
        <div>
          <h2 style={styles.blueh2p}>Book An Appointment</h2>
          <p style={styles.textp}>Get in touch with a medical expert today and keep your health up to date!</p>
          <p style={styles.textp}>Find doctors by their expertise, availability, and location</p>
        </div>
        <button
          style={styles.button2}
          onClick={() => navigate('/book')}
        >
          Book an Appointment
        </button>
      </div>
      <Footer />
    </div>
  );
};
const styles = {
  button2: {
    marginTop: "20px",
    backgroundColor: "#DA8026",
    color: "white",
    fontSize: "1.5em",
    fontWeight: "600",
    padding: "10px 30px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginRight: "20px",
  },
  largetextblue: {
    fontSize: "4em",
    fontWeight: "700",
    textAlign: "center",
    color: "#0D095A",
    margin: "25px 0",
  },
  blueh2: {
    fontSize: "2em",
    fontWeight: "700",
    textAlign: "left",
    color: "#0D095A",
    margin: "35px 75px",
  },
  table: {
    width: "90%",
    margin: "20px auto 50px",
    borderCollapse: "collapse",
    alignItems: "center",
    tableLayout: "fixed",
  },
  tableHeader: {
    backgroundColor: "#9CC4F2",
    fontWeight: "bold",
    padding: "15px",
    textAlign: "center",
  },
  tableCell: {
    padding: "12px",
    border: "1px solid #ccc",
    alignItems: "center",
    textAlign: "center",
    verticalAlign: "middle",
    wordWrap: "break-word",
  },
  button: {
    backgroundColor: "#DA8026",
    color: "white",
    fontSize: "1em",
    fontWeight: "600",
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    margin: "0 5px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Center the buttons
    gap: "10px",
    alignItems: "center",
  },
  popupOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  textp: {
    fontSize: "1.2em",
    lineHeight: "1.6",
  },
  blueh2p: {
    fontSize: "2em",
    fontWeight: "700",
    margin: "10px 0",
    textAlign: "left",
    color: "#0D095A",
    marginTop: "35px",
  },
  bookAppointmentSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "50px auto",
    padding: "20px",
    width: "88%",
    backgroundColor: "#9CC4F2",
  },
  textContainer: {
    flex: "1",
  },
};


export default PatientAppointmentsHome;