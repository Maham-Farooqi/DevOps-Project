import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RescheduleLabTest = () => {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    e.preventDefault();
    const formData = new FormData(e.target);
    const appointmentDate = formData.get("appointmentDate");
    let appointmentTime = formData.get("appointmentTime");
    appointmentTime = appointmentTime.substring(0, 8); 
    console.log(appointmentDate, appointmentTime);

    try {
      const record = { id, date: appointmentDate, time: appointmentTime };
      const response = await fetch("http://localhost:3001/reshedulelab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });

      if (response.ok) {
        toast.success("Lab Test has been rescheduled successfully!");
      } else {
        toast.error("Unable to reschedule!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error. Please try again.");
    }
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer/>
      <h1 style={styles.largetextblue}>Reschedule A Lab Test</h1>
      <form onSubmit={handleFormSubmit}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableCellFirst}>Lab Test ID:</td>
              <td style={styles.tableCell}>{id}</td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>Lab Test Date:</td>
              <td style={styles.tableCell}>
              <input
                  type="date"
                  name="appointmentDate"
                  required
                  style={styles.tableInput}
                  min={new Date().toISOString().split("T")[0]}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>Lab Test Time:</td>
              <td style={styles.tableCell}>
                <select
                  name="appointmentTime"
                  required
                  style={styles.tableInput}
                >
                  <option value="08:00:00">08:00:00</option>
                  <option value="09:00:00">09:00:00</option>
                  <option value="10:00:00">10:00:00</option>
                  <option value="11:00:00">11:00:00</option>
                  <option value="12:00:00">12:00:00</option>
                  <option value="13:00:00">13:00:00</option>
                  <option value="14:00:00">14:00:00</option>
                  <option value="15:00:00">15:00:00</option>
                  <option value="16:00:00">16:00:00</option>
                  <option value="17:00:00">17:00:00</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button type="submit" style={styles.button}>
            Reschedule Lab Test
          </button>
        </div>
      </form>
      {showPopup && (
        <div style={styles.popupContainer}>
          <div style={styles.popup}>
            <p>Lab test has been rescheduled</p>
            <button style={styles.popupButton} onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
const styles = {
  button: {
    backgroundColor: "#DA8026",
    color: "white",
    fontSize: "1.5em",
    fontWeight: "600",
    padding: "10px 30px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    marginBottom: "30px",
    marginTop: "30px"
  },
  largetextblue: {
    fontSize: "4em",
    fontWeight: "700",
    margin: "10px 0",
    textAlign: "center",
    color: "#0D095A",
    marginTop: "30px",
    marginBottom: "40px",
  },
  table: {
    width: "80%",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #0D095A",
    borderRadius: "10px",
  },
  tableCell: {
    textAlign: "center",
    padding: "10px",
  },
  tableCellFirst: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#9CC4F2",
    color: "black",
    fontWeight: "bold",
  },
  tableInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  popupContainer: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  popupButton: {
    backgroundColor: "#DA8026",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
export default RescheduleLabTest;