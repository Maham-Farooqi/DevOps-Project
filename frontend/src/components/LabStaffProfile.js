import React, { useEffect, useState } from "react";
import Footer from './LabStaffFooter';
import Header from './LabStaffHeader';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract user and patient_id from session storage
  const user = JSON.parse(sessionStorage.getItem("user")) || {};
  const id = user.lab_staff_id;

  useEffect(() => {
    if (!id) {
      setError("User ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/lprofiles/${id}`);
        if (!response.ok) {
          toast.error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        toast.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return (
      <div>
        <ToastContainer />
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer />
      <h1 style={styles.largetextblue}>My Profile</h1>
      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Full Name:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{profile.full_name}</label>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Date Of Birth:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{profile.date_of_birth}</label>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Email:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{profile.email}</label>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Contact Number:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{profile.contact_number}</label>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCellFirst}>
              <label>Hire Date:</label>
            </td>
            <td style={styles.tableCell}>
              <label>{profile.hire_date}</label>
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
export default PatientProfile;