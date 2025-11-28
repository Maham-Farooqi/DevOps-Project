import React, { useEffect, useState } from "react";
import Footer from './Footer';
import Header from './Header';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ViewLabReportsHome = () => {
  const [readyReports, setReadyReports] = useState([]);
  const [inProgressReports, setInProgressReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const user = JSON.parse(sessionStorage.getItem('user')); 
      try {
        const response = await fetch(`http://localhost:3001/labreports/${user.patient_id}`);
        if (response.ok) {
          const data = await response.json();
          setReadyReports(data.readyReports || []);
          setInProgressReports(data.inProgressReports || []);
        } else {
          toast.error("Failed to fetch reports.");
        }
      } catch (error) {
         toast.error("Error fetching lab reports:", error);
      }
    };
    fetchReports();
  }, []);

  const handleViewReport = (reportId,type) => {
    window.location.href = `/viewreports/${reportId}?description=${type}`;
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer/>
      <h1 style={styles.mainHeading}>My Lab Test Reports</h1>
      <h2 style={styles.largetextblue}>Ready to View Reports</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Report ID</th>
            <th style={styles.tableHeader}>Lab Test Date</th>
            <th style={styles.tableHeader}>Test Type</th>
            <th style={styles.tableHeader}></th>
          </tr>
        </thead>
        <tbody>
          {readyReports.map((report) => (
            <tr key={report.reportId}>
              <td style={styles.tableCell}>{report.labreport_id}</td>
              <td style={styles.tableCell}>{report.result_date}</td>
              <td style={styles.tableCell}>{report.test_type}</td>
              <td style={styles.tableCell}>
                <button
                  style={styles.button}
                  onClick={() => handleViewReport(report.labreport_id,report.test_type)}
                >
                  View Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={styles.largetextblue}>Reports In Progress</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Report ID</th>
            <th style={styles.tableHeader}>Lab Test Date</th>
            <th style={styles.tableHeader}>Test Type</th>
          </tr>
        </thead>
        <tbody>
          {inProgressReports.map((report) => (
            <tr key={report.reportId}>
              <td style={styles.tableCell}>{report.labreport_id}</td>
              <td style={styles.tableCell}>{report.result_date}</td>
              <td style={styles.tableCell}>{report.test_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={styles.noteText}>
        Note: Test reports become available after 24 hours of the conducted test.
      </p>
      <Footer />
    </div>
  );
};
const styles = {
  mainHeading: {
    fontSize: "3em",
    fontWeight: "700",
    textAlign: "center",
    color: "#0D095A",
    margin: "30px 0",
  },
  largetextblue: {
    fontSize: "1.8em",
    fontWeight: "700",
    textAlign: "left",
    color: "#0D095A",
    margin: "25px 0",
    marginLeft: "80px"
  },
  table: {
    width: "90%",
    margin: "20px auto 50px",
    borderCollapse: "collapse",
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#9CC4F2",
    fontWeight: "bold",
    padding: "10px",
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
  noteText: {
    fontSize: "1.2em",
    textAlign: "left",
    color: "#555",
    margin: "20px 0",
    marginLeft: "80px"
  },
};
export default ViewLabReportsHome;
