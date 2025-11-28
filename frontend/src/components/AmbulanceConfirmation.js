import React, { useState } from "react";
import Footer from './Footer';
import Header from './Header';

const AmbulanceConfirmation = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <h1 style={styles.largetextblue}>Your Ambulance is on the way!</h1>
      <table style={styles.table}>
        <tbody>
          <tr style={styles.tableRow}>
            <td style={styles.tableCellFirst}>Call ID:</td>
            <td style={styles.tableCell}>C1</td>
          </tr>
          <tr style={styles.tableRow}>
            <td style={styles.tableCellFirst}>Ambulance ID:</td>
            <td style={styles.tableCell}>A1</td>
          </tr>
          <tr style={styles.tableRow}>
            <td style={styles.tableCellFirst}>Date:</td>
            <td style={styles.tableCell}>23 - 11 - 2024</td>
          </tr>
          <tr style={styles.tableRow}>
            <td style={styles.tableCellFirst}>Time:</td>
            <td style={styles.tableCell}>01:00 AM</td>
          </tr>
          <tr style={styles.tableRow}>
            <td style={styles.tableCellFirst}>Address:</td>
            <td style={styles.tableCell}>14th Elm Street, New York</td>
          </tr>
          <tr style={styles.tableRow}>
            <td style={styles.tableCellFirst}>Ambulance Status:</td>
            <td style={styles.tableCell}>Dispatched</td>
          </tr>
        </tbody>
      </table>
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
    marginBottom: "20px",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
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
};
export default AmbulanceConfirmation;