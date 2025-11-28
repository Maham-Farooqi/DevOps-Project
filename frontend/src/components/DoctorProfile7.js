import React, { useEffect, useState } from "react";
import Footer from './DFooter'; 
import Header from './DHeader';

const DoctorProfile = () => {
  const [doctorDetails, setDoctorDetails] = useState(null); // State to hold doctor details
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const id = user.user_id;
        const response = await fetch(`http://localhost:3001/api/doctor-profile/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch doctor details");
        }
        const data = await response.json();
        setDoctorDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <br/><br/>
      <h1 style={styles.largetextblue}>My Profile</h1>
      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Full Name:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{doctorDetails.full_name}</label>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Date Of Birth:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{doctorDetails.date_of_birth}</label>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Email:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{doctorDetails.email}</label>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Contact Number:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{doctorDetails.contact_number}</label>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Password:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{doctorDetails.password}</label>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Specialization:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{doctorDetails.specialization}</label>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Hire Date:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{doctorDetails.hire_date}</label>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Salary:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{doctorDetails.salary}</label>
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
};

export default DoctorProfile;
