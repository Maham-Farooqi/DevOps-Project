import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    dob: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Call the backend API using fetch
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          dob: formData.dob,
          contactNumber: formData.contactNumber,
          password: formData.password,
        }),
      });

      // const data = await response.json();

      if (response.status === 201) {
        alert("User registered successfully");
        navigate('/login'); // Navigate to the login page
      } else {
        alert("Error during signup");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <img
        src="/healthifylogo.png"
        alt="Healthify Logo"
        style={styles.logo}
      />
      <h2 style={styles.heading}>Sign Up</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <p style={styles.text}>Full Name:</p>
        <input
          type="text"
          name="fullName"
          style={styles.input}
          value={formData.fullName}
          onChange={handleChange}
        />
      
        <p style={styles.text}>Email:</p>
        <input
          type="email"
          name="email"
          style={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
        <p style={styles.text}>Date of Birth:</p>
        <input
          type="date"
          name="dob"
          style={styles.input}
          value={formData.dob}
          onChange={handleChange}
        />
        <p style={styles.text}>Contact Number:</p>
        <input
          type="text"
          name="contactNumber"
          style={styles.input}
          value={formData.contactNumber}
          onChange={handleChange}
        />
        <p style={styles.text}>Password:</p>
        <input
          type="password"
          name="password"
          style={styles.input}
          value={formData.password}
          onChange={handleChange}
        />
        <p style={styles.text}>Confirm Password:</p>
        <input
          type="password"
          name="confirmPassword"
          style={styles.input}
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit" style={styles.loginButton}>Sign Up</button>
      </form>
      <p style={styles.text}>Already have an account?</p>
      <button
        type="button"
        style={styles.registerButton}
        onClick={() => navigate('/login')}
      >
        Login
      </button>
    </div>
  );
};



const styles = {
  container: {
    backgroundColor: "#5B8B35",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: "20px",
  },
  logo: {
    width: "100px",
    height: "80px",
    marginBottom: "10px",
  },
  heading: {
    fontSize: "32px",
    color: "white",
    marginBottom: "20px",
    fontFamily: "'Roboto', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "300px",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  loginButton: {
    backgroundColor: "#DA8026",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "15px",
    marginBottom: "15px",
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: "18px",
    marginBottom: "10px",
    fontFamily: "'Roboto', sans-serif",
  },
  registerButton: {
    backgroundColor: "white",
    color: "#5B8B35",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    width: "20%",
  },
};
export default App;