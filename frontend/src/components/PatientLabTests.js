import React, { useState, useEffect } from "react";
import Footer from './Footer';
import Header from './Header';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PatientLabTests = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [appointmentId, setSelectedAppointmentId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = (path) => {
    window.location.href = path;
  };
  const user = JSON.parse(sessionStorage.getItem("user"));

  async function loadData() {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user && user.patient_id) {
        const id = user.patient_id;
        const response = await fetch(`http://localhost:3001/labs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
           toast.error("Failed to fetch lab tests");
        }
      }
    } catch (err) {
      toast.error("Error loading data: " + err.message);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleCancelClick = (testId) => {
    setSelectedAppointmentId(testId);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleConfirmCancel = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/lab/${appointmentId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);

        setAppointments((prev) =>
          prev.filter((appt) => appt.labtest_id !== appointmentId)
        );
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (err) {
      toast.error("Network error: " + err.message);
    } finally {
      setShowPopup(false);
      setSelectedAppointmentId(null);
    }
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer />
      <h1 style={styles.largetextblue}>My Lab Tests</h1>
      <div>
        <h2 style={styles.blueh2}>Upcoming Lab Tests</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Lab Test ID</th>
              <th style={styles.tableHeader}>Lab Test Type</th>
              <th style={styles.tableHeader}>Lab Test Date</th>
              <th style={styles.tableHeader}>Scheduled Time</th>
              <th style={styles.tableHeader}> </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.labtest_id}>
                <td style={styles.tableCell}>{appointment.labtest_id}</td>
                <td style={styles.tableCell}>{appointment.test_type}</td>
                <td style={styles.tableCell}>{appointment.test_date}</td>
                <td style={styles.tableCell}>{appointment.test_time}</td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.button}
                      onClick={() => navigate(`/reshedulelab/${appointment.labtest_id}`)}
                  >
                    Reschedule
                  </button>
                  <button
                    style={styles.button}
                    onClick={() => handleCancelClick(appointment.labtest_id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Are you sure you want to cancel this test?</h3>
            <button style={styles.button} onClick={handlePopupClose}>
              No
            </button>
            <button style={styles.button} onClick={handleConfirmCancel}>
              Yes
            </button>
          </div>
        </div>
      )}
      <div style={styles.bookAppointmentSection}>
        <div>
          <h2 style={styles.blueh2p}>Book A Lab Test</h2>
          <p style={styles.textp}>Make sure your vitals are within range!</p>
          <p style={styles.textp}>Make health your first priority and book a lab test today!</p>
        </div>
        <button
          style={styles.button2}
          onClick={() => navigate(`/booklab/${user.patient_id}`)}
        >
          Book a Lab Test
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
    marginRight: "20px"
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
    alignItems: "center"
  },
  tableHeader: {
    backgroundColor: "#9CC4F2",
    fontWeight: "bold",
    padding: "20px",
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ccc",
    alignItems: "center",
    textAlign: "center",
    verticalAlign: "middle",
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
    backgroundColor: "#9CC4F2"
  },
  textContainer: {
    flex: "1",
  },
};
export default PatientLabTests;