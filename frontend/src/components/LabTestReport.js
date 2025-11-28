import React, { useState } from "react";
import Footer from './LabStaffFooter';
import Header from './LabStaffHeader';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LabTestReport = () => {
  const [testType, setTestType] = useState("");
  const [formData, setFormData] = useState({
    reportId:"",
    patientId: "",
    gender: "",
    dob: "",
    age: "",
    bloodType: "",

    hemoglobin: "",
    plateletsCount: "",

    hba1c: "",
    estimatedAverageGlucose: "",
    
    gene: "",
    dnaDescription: "",
    proteinDescription: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleTestTypeChange = (e) => {
    setTestType(e.target.value);
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  
  const handleGenerateReport = async () => {
    const endpointMap = {
      "Blood Test": "/addBloodTest",
      "Diabetic Test": "/addDiabeticTest",
      "Genetic Test": "/addGeneticTest"
    };
  
    const endpoint = endpointMap[testType];
  
    if (!endpoint) {
      toast.error("Please select a valid test type");
      return;
    }
  
    const requestData = {
      labReportId: formData.reportId,
      gender: formData.gender,
      dob: formData.dob,
      age: formData.age,
      bloodType: formData.bloodType,
      ...(testType === "Blood Test" && {
        hemoglobin: formData.hemoglobin,
        plateletsCount: formData.plateletsCount
      }),
      ...(testType === "Diabetic Test" && {
        HbA1c: formData.hba1c,
        estimatedAvgGlucose: formData.estimatedAverageGlucose
      }),
      ...(testType === "Genetic Test" && {
        gene: formData.gene,
        DNADescription: formData.dnaDescription,
        ProteinDescription: formData.proteinDescription
      })
    };
  
    try {
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });
  
      if (response.ok) {
        setShowPopup(true);
      } else {
        toast.error("Failed to save report data");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };
  
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer/>
      <h1 style={styles.largetextblue}>Generate Lab Test Report</h1>
      <form>
        <table style={styles.table}>
          <tbody>
          <tr>
              <td style={styles.tableCellFirst}>
                <label>Report ID:</label>
              </td>
              <td style={styles.tableCell}>
                <input
                  type="text"
                  name="reportId"
                  value={formData.reportId}
                  onChange={handleInputChange}
                  style={styles.tableInput}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Patient ID:</label>
              </td>
              <td style={styles.tableCell}>
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  style={styles.tableInput}
                />
              </td>
            </tr>
           
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Gender:</label>
              </td>
              <td style={styles.tableCell}>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  style={styles.tableInput}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Date of Birth:</label>
              </td>
              <td style={styles.tableCell}>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  style={styles.tableInput}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Age:</label>
              </td>
              <td style={styles.tableCell}>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  style={styles.tableInput}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Blood Type:</label>
              </td>
              <td style={styles.tableCell}>
                <input
                  type="text"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  style={styles.tableInput}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>
                <label>Test Type:</label>
              </td>
              <td style={styles.tableCell}>
                <select
                  name="testType"
                  value={testType}
                  onChange={handleTestTypeChange}
                  style={styles.tableInput}
                >
                  <option value="">Select a test</option>
                  <option value="Blood Test">Blood Test</option>
                  <option value="Diabetic Test">Diabetic Test</option>
                  <option value="Genetic Test">Genetic Test</option>
                </select>
              </td>
            </tr>
            {testType === "Blood Test" && (
              <>
                <tr>
                  <td style={styles.tableCellFirst}>
                    <label>Hemoglobin:</label>
                  </td>
                  <td style={styles.tableCell}>
                    <input
                      type="text"
                      name="hemoglobin"
                      value={formData.hemoglobin}
                      onChange={handleInputChange}
                      style={styles.tableInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableCellFirst}>
                    <label>Platelets Count:</label>
                  </td>
                  <td style={styles.tableCell}>
                    <input
                      type="text"
                      name="plateletsCount"
                      value={formData.plateletsCount}
                      onChange={handleInputChange}
                      style={styles.tableInput}
                    />
                  </td>
                </tr>
              </>
            )}
            {testType === "Diabetic Test" && (
              <>
                <tr>
                  <td style={styles.tableCellFirst}>
                    <label>HbA1c:</label>
                  </td>
                  <td style={styles.tableCell}>
                    <input
                      type="text"
                      name="hba1c"
                      value={formData.hba1c}
                      onChange={handleInputChange}
                      style={styles.tableInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableCellFirst}>
                    <label>Estimated Average Glucose:</label>
                  </td>
                  <td style={styles.tableCell}>
                    <input
                      type="text"
                      name="estimatedAverageGlucose"
                      value={formData.estimatedAverageGlucose}
                      onChange={handleInputChange}
                      style={styles.tableInput}
                    />
                  </td>
                </tr>
              </>
            )}
            {testType === "Genetic Test" && (
              <>
                <tr>
                  <td style={styles.tableCellFirst}>
                    <label>Gene:</label>
                  </td>
                  <td style={styles.tableCell}>
                    <input
                      type="text"
                      name="gene"
                      value={formData.gene}
                      onChange={handleInputChange}
                      style={styles.tableInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableCellFirst}>
                    <label>DNA Description:</label>
                  </td>
                  <td style={styles.tableCell}>
                    <input
                      type="text"
                      name="dnaDescription"
                      value={formData.dnaDescription}
                      onChange={handleInputChange}
                      style={styles.tableInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableCellFirst}>
                    <label>Protein Description:</label>
                  </td>
                  <td style={styles.tableCell}>
                    <input
                      type="text"
                      name="proteinDescription"
                      value={formData.proteinDescription}
                      onChange={handleInputChange}
                      style={styles.tableInput}
                    />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </form>
      {/* Generate Report Button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button style={styles.button} onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>
      {/* Popup */}
      {showPopup && (
        <div style={styles.popupContainer}>
          <div style={styles.popup}>
            <p>Report has been generated and is ready to view.</p>
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
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: "20px",
  },
  largetextblue: {
    fontSize: "4em",
    fontWeight: "700",
    margin: "10px 0",
    textAlign: "center",
    color: "#0D095A",
  },
  table: {
    width: "80%",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #0D095A",
    borderRadius: "10px",
  },
  tableCellFirst: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#9CC4F2",
    color: "black",
    fontWeight: "bold",
  },
  tableCell: {
    textAlign: "center",
    padding: "10px",
  },
  tableInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  popupContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
  },
  popupButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#DA8026",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
export default LabTestReport;