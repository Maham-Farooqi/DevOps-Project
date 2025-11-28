import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientLabTestReport = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testType = searchParams.get("description");

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/labtests/${id}?testType=${testType}`);
        if (!response.ok) {
          throw new Error("Failed to fetch lab test data.");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error.message);
        toast.error("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, testType]);

  const reportFields = {
    BloodTest: [
      { label: "Hemoglobin", value: formData?.hemoglobin },
      { label: "Platelets Count", value: formData?.plateletsCount },
    ],
    DiabeticTest: [
      { label: "HbA1C", value: formData?.HbA1c },
      { label: "Estimated Average Glucose", value: formData?.estimatedAvgGlucose },
    ],
    GeneticTest: [
      { label: "DNA Description", value: formData?.DNADescription },
      { label: "Protein Description", value: formData?.ProteinDescription },
    ],
  };
  const normalizeTestType = (testType) => {
    return testType.replace(/\s+/g, "").trim(); // Remove spaces and trim
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer />
      <h1 style={styles.largetextblue}>Lab Test Report</h1>
      {loading ? (
        <p style={{ textAlign: "center", fontSize: "1.5em" }}>Loading...</p>
      ) : formData ? (
        <>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.tableCellFirst}>LabTest ID</td>
                <td style={styles.tableCell}>{id || "N/A"}</td>
              </tr>
              <tr>
                <td style={styles.tableCellFirst}>Gender</td>
                <td style={styles.tableCell}>{formData.gender || "N/A"}</td>
              </tr>
              <tr>
                <td style={styles.tableCellFirst}>Date of Birth</td>
                <td style={styles.tableCell}>{formData.dob || "N/A"}</td>
              </tr>
              <tr>
                <td style={styles.tableCellFirst}>Age</td>
                <td style={styles.tableCell}>{formData.age || "N/A"}</td>
              </tr>
              <tr>
                <td style={styles.tableCellFirst}>Blood Type</td>
                <td style={styles.tableCell}>{formData.bloodType || "N/A"}</td>
              </tr>
              <tr>
                <td style={styles.tableCellFirst}>Test Type</td>
                <td style={styles.tableCell}>{testType || "N/A"}</td>
              </tr>
            </tbody>
          </table>
          {testType && reportFields[normalizeTestType(testType)] && (
            <div style={{ marginTop: "20px" }}>
              <h2 style={styles.mediumtextblue}>Test Results</h2>
              <table style={styles.table}>
                <tbody>
                  {reportFields[normalizeTestType(testType)].map((field, index) => (
                    <tr key={index}>
                      <td style={styles.tableCellFirst}>{field.label}</td>
                      <td style={styles.tableCell}>{field.value || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.5em", color: "red" }}>
          No data available for the selected test.
        </p>
      )}
      <Footer />
    </div>
  );
};

const styles = {
  largetextblue: {
    fontSize: "3em",
    fontWeight: "700",
    margin: "20px 0",
    textAlign: "center",
    color: "#0D095A",
  },
  mediumtextblue: {
    fontSize: "2em",
    fontWeight: "600",
    margin: "10px 0",
    textAlign: "center",
    color: "#0D095A",
    marginTop: "40px"
  },
  table: {
    width: "80%",
    margin: "20px auto",
    borderCollapse: "collapse",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  tableHeader: {
    textAlign: "center",
    padding: "15px",
    backgroundColor: "#0D095A",
    color: "white",
    fontWeight: "bold",
  },
  tableCell: {
    textAlign: "center",
    padding: "10px",
    border: "1px solid #ddd",
  },
  tableCellFirst: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#9CC4F2",
    fontWeight: "bold",
  },
};
export default PatientLabTestReport;