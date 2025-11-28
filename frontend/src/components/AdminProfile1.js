import React from "react";
import Footer from './LabStaffFooter'; /* change to admin header and footer */
import Header from './LabStaffHeader';

const AdminProfile = () => {
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <h1 style={styles.largetextblue}>My Profile</h1>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Full Name:</label>
              </td>
              <td style={styles.tableCell}>
              <label>Zara Ahmed</label>
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Date Of Birth:</label>
              </td>
              <td style={styles.tableCell}>
              <label>17 - 09 - 2002</label>
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Email:</label>
              </td>
              <td style={styles.tableCell}>
              <label>zaraahmed@gmail.com</label>
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Contact Number:</label>
              </td>
              <td style={styles.tableCell}>
              <label>+923330211306</label>
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Password:</label>
              </td>
              <td style={styles.tableCell}>
              <label>zara123</label>
              </td>
              </tr>
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Hire Date:</label>
              </td>
              <td style={styles.tableCell}>
              <label>12 - 05 -2018</label>
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Salary:</label>
              </td>
              <td style={styles.tableCell}>
              <label>$41,000</label>
              </td>
            </tr>
          </tbody>
        </table>
      <Footer />
    </div>
  );
};

const styles = {
  largetextblue: {
    fontSize: "4em",
    fontWeight: "700",
    margin: "10px 0",
    textAlign: "center",
    color: "#0D095A",
    marginTop: "25px"
  },
  table: {
    width: "80%",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #0D095A",
    borderRadius: "10px",
    marginBottom: "20px",
    marginTop: "20px"
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
  }
};

export default AdminProfile;
