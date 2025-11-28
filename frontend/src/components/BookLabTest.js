import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookLabTest = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    labTestType: "",
    preferredDate: "",
    preferredTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { labTestType, preferredDate, preferredTime } = formData;

    try {
      const record = {
        pid: id,
        date: preferredDate,
        time: preferredTime,
        test: labTestType,
      };

      const response = await fetch("http://localhost:3001/confirmtest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });

      if (response.ok) {
        toast.success("Lab test booked!");
      } else {
        toast.error("Unable to book lab test!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer />
      <h1 style={styles.largetextblue}>Book a Lab Test</h1>
      <form onSubmit={handleSubmit}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableCellFirst}>Lab Test Type:</td>
              <td style={styles.tableCell}>
                <select
                  name="labTestType"
                  value={formData.labTestType}
                  onChange={handleInputChange}
                  style={styles.tableInput}
                  required
                >
                  <option value="">Select test type</option>
                  <option value="Blood Test">Blood Test</option>
                  <option value="Diabetic Test">Diabetic Test</option>
                  <option value="Genetic Test">Genetic Test</option>
                </select>
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>Preferred Date:</td>
              <td style={styles.tableCell}>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  style={styles.tableInput}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>Preferred Time:</td>
              <td style={styles.tableCell}>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  style={styles.tableInput}
                  required
                >
                  <option value="">Select time</option>
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
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <button type="submit" style={styles.button}>
            Book Lab Test
          </button>
        </div>
      </form>
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
    marginBottom:"40px",
    marginTop: "30px"
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
};
export default BookLabTest;