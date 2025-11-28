import React, { useState } from "react";
import Footer from './Footer';
import Header from './Header';
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const AmbulanceHomePage = () => {
  const [address, setAddress] = useState("");
  const [callDetails, setCallDetails] = useState({}); 
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const Address = formData.get("address");
    setAddress(Address);
    const user = JSON.parse(sessionStorage.getItem('user'));

    try {
      const record = { pid: user.patient_id, address: Address };
      const response = await fetch("http://localhost:3001/ambulance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });

      if (response.ok) {
        const result = await response.json(); 
        setCallDetails({
          call_id: result.call_id,
          date: result.date,
          time: result.time,
        });
        setShowModal(true);
      } else {
        toast.error("Unable to call ambulance!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error. Please try again.");
    }

  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer />
      <h1 style={styles.largetextblue}>Call an Ambulance</h1>
      <form onSubmit={handleFormSubmit}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableCellFirst}>Enter your complete address:</td>
              <td style={styles.tableCell}>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Enter address here"
                  style={styles.tableInput}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)} 
                />

              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button type="submit" style={styles.button}>Confirm</button>
        </div>
      </form>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Your Ambulance is on the way!</h2>
            <p>Your request details:</p>
            <p><strong>Call ID:</strong> {callDetails.call_id}</p>
            <p><strong>Date:</strong> {callDetails.date}</p>
            <p><strong>Time:</strong> {callDetails.time}</p>
            <p><strong>Address:</strong> {address}</p>
            <button onClick={closeModal} style={styles.modalButton}>Close</button>
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
    marginTop: "30px",
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
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "50%",
  },
  modalButton: {
    backgroundColor: "#DA8026",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1em",
    marginTop: "20px",
  },
};

export default AmbulanceHomePage;
