import React, { useState, useEffect, useCallback } from "react";
import Footer from './Footer';
import Header from './Header';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
async function fetchDoctors() {
  try {
    const response = await fetch('http://localhost:3001/doctors');
    if (response.ok) {
      return await response.json();
    } else {
      toast.error("Failed to fetch doctors");
      return null;
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while fetching doctors information.");
    return null;
  }
}

const BookAppointment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [doctors, setDoctors] = useState([]); 

  const navigate = (path) => {
    window.location.href = path;
  };

  const loadData = useCallback(async () => {
    const data = await fetchDoctors();
    if (data) {
      setDoctors(data);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpeciality =
      selectedSpeciality === "" || doctor.specialization === selectedSpeciality;
    const matchesSearch = doctor.full_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSpeciality && matchesSearch;
  });

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer />
      <h1 style={styles.largetextblue}>Book an Appointment</h1>
      <div style={styles.controlsContainer}>
        <select
          onChange={(e) => setSelectedSpeciality(e.target.value)}
          style={styles.dropdown}
          value={selectedSpeciality} 
        >
          <option value="">Filter By Speciality</option> {/* Reset option */}
          {Array.from(new Set(doctors.map((doctor) => doctor.specialization))).map(
            (speciality, index) => (
              <option key={index} value={speciality}>
                {speciality}
              </option>
            )
          )}
        </select>
        <input
          type="text"
          placeholder="Search for doctors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />
      </div>
      <div style={styles.doctorsContainer}>
        {filteredDoctors.map((doctor, index) => (
          <div key={index} style={styles.doctorCard}>
            <h3>{doctor.full_name}</h3>
            <p>{doctor.specialization}</p>
            <button
              style={styles.button}
              onClick={() => navigate(`/confirmApp/${doctor.doctor_id}?doctor=${doctor.full_name}&special=${doctor.specialization}`)}
            >
              Book An Appointment
            </button>
          </div>
        ))}
        {filteredDoctors.length === 0 && (
          <p style={styles.noDoctorsMessage}>No doctors found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  largetextblue: {
    fontSize: "2.5em",
    fontWeight: "700",
    textAlign: "center",
    color: "#0D095A",
    marginTop: "20px",
    marginBottom: "40px",
  },
  controlsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
    padding: "10px",
  },
  dropdown: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "200px",
  },
  searchBar: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "300px",
  },
  doctorsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#9CC4F2",
    marginBottom: "20px",
  },
  doctorCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "25px",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  button: {
    backgroundColor: "#DA8026",
    color: "white",
    fontSize: "1em",
    fontWeight: "600",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  noDoctorsMessage: {
    textAlign: "center",
    color: "#666",
    fontSize: "1.2em",
    marginTop: "20px",
    fontStyle: "italic",
  },
};

export default BookAppointment;