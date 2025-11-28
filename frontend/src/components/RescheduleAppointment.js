
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function fetchDoctorData(id) {
  try {
    const response = await fetch(`http://localhost:3001/doctor/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      toast.error("Failed to fetch doctor's consultation hours.");
      return null;
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while fetching consultation hours.");
    return null;
  }
}

const RescheduleAppointment = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctorName = searchParams.get("doctor");

  const [consultationHours, setConsultationHours] = useState({
    start: "08:00:00",
    end: "17:00:00",
  });

  // Memoized loadData to avoid dependency issues
  const loadData = useCallback(async () => {
    const data = await fetchDoctorData(id);
    if (data) {
      setConsultationHours({
        start: data.start_time,
        end: data.end_time,
      });
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const generateTimeOptions = () => {
    const { start, end } = consultationHours;

    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);

    const timeOptions = [];
    let currentTime = startTime;

    while (currentTime <= endTime) {
      const timeStr = currentTime.toTimeString().substring(0, 8); // HH:mm:ss
      timeOptions.push(timeStr);
      currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // Increment by 1 hour
    }

    return timeOptions;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const appointmentDate = formData.get("appointmentDate");
    let appointmentTime = formData.get("appointmentTime");
    appointmentTime = appointmentTime.substring(0, 8); // Ensure format HH:mm:ss
    console.log(appointmentDate, appointmentTime);

    try {
      const record = { id, date: appointmentDate, time: appointmentTime };
      const response = await fetch("http://localhost:3001/resheduleApp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });

      if (response.ok) {
        toast.success("Appointment has been rescheduled successfully!");
      } else {
        toast.error("Unable to reschedule!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error. Please try again.");
    }
  };
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer />
      <h1 style={styles.largetextblue}>Reschedule An Appointment</h1>
      <form onSubmit={handleFormSubmit}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableCellFirst}>Appointment ID:</td>
              <td style={styles.tableCell}>{id}</td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>Doctor's Name:</td>
              <td style={styles.tableCell}>{doctorName}</td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>Appointment Date:</td>
              <td style={styles.tableCell}>
                <input
                  type="date"
                  name="appointmentDate"
                  required
                  style={styles.tableInput}
                  min={new Date().toISOString().split("T")[0]}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>Appointment Time:</td>
              <td style={styles.tableCell}>
                <select name="appointmentTime" required style={styles.tableInput}>
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={`${time}:00`}>
                      {time}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <button type="submit" style={styles.button}>
            Reschedule Appointment
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
    marginBottom: "30px",
    marginTop: "30px"
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
  }
};
export default RescheduleAppointment;