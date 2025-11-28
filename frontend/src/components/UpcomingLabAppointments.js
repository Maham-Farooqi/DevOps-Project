import React, { useEffect, useState } from "react";
import Header from "./LabStaffHeader";
import Footer from "./LabStaffFooter";

const UpcomingLabAppointments = () => {
  const [appointments, setAppointments] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user')); 
        const response = await fetch(`http://localhost:3001/labstaffreports/${user.lab_staff_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        console.log(data)
        setAppointments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []); 

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Header />
      <div style={{ fontFamily: "'Roboto', sans-serif" }}>
        <h1 style={styles.largetextblue}>Upcoming Lab Appointments</h1>
        {appointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Appointment ID</th>
                <th style={styles.tableHeader}>Appointment Date</th>
                <th style={styles.tableHeader}>Scheduled Time</th>
                <th style={styles.tableHeader}>Test Type</th>
                <th style={styles.tableHeader}>Patient ID</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td style={styles.tableCell}>{appointment.labreport_id}</td>
                  <td style={styles.tableCell}>{appointment.test_date}</td>
                  <td style={styles.tableCell}>{appointment.test_time}</td>
                  <td style={styles.tableCell}>{appointment.test_type}</td>
                  <td style={styles.tableCell}>{appointment.patient_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};
const styles = {
  subSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  largetextblue: {
    fontSize: "4em",
    fontWeight: "700",
    margin: "10px 0",
    marginTop: "40px",
    marginBottom: "60px",
    color: "#0D095A",
    textAlign: "center",
    paddingLeft: "20px",
  },
  text: {
    fontSize: "1.2em",
    lineHeight: "1.6",
  },
  blueHeading: {
    color: "#0D095A",
  },
  table: {
    textAlign: "center",
    width: "90%",
    borderCollapse: "collapse",
    marginTop: "20px",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "50px",
  },
  tableHeader: {
    backgroundColor: "#9CC4F2",
    fontWeight: "bold",
    textAlign: "center",
    padding: "20px",
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ccc",
  },
};
export default UpcomingLabAppointments;