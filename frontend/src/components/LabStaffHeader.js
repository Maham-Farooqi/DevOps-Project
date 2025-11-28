import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 
import { useAuth } from "./AuthContext"; 

const LabStaffHeader = ({ isLoggedIn }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate(); 

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img
          src="/healthifylogo.png"
          alt="Healthify Logo"
          style={styles.logo}
        />
        <h1 style={styles.title}>Healthify</h1>
      </div>
      <nav style={styles.nav}>
        <Link to="/upcomingAppointment" style={styles.link}>View Upcoming Appointments</Link>
        <Link to="/labstaffreport" style={styles.link}>Generate Reports</Link>
        <div style={styles.profileIconContainer} onClick={togglePopup}>
          <FaUserCircle size={24} style={styles.icon} />
          {showPopup && (
            <div style={styles.popup}>
              <Link to="/lprofile" style={styles.popupItem}>
                View Profile
              </Link>
              <div style={styles.popupItem} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
const styles = {
  header: {
    backgroundColor: "#5B8B35",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    fontFamily: "'Roboto', sans-serif",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "50px",
    height: "40px",
    marginRight: "10px",
  },
  title: {
    fontSize: "35px",
    fontWeight: "700",
    margin: 0,
    fontFamily: "'Roboto', sans-serif",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "400",
    fontFamily: "'Roboto', sans-serif",
  },
  icon: {
    verticalAlign: "middle",
  },
  profileIconContainer: {
    position: "relative",
  },
  popup: {
    position: "absolute",
    top: "30px",
    right: "0",
    backgroundColor: "white",
    color: "#333",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    overflow: "hidden",
    zIndex: 1000,
    width: "120px",
  },
  popupItem: {
    display: "block",
    padding: "10px 15px",
    textDecoration: "none",
    color: "#5B8B35",
    fontSize: "14px",
    borderBottom: "1px solid #ddd",
    fontFamily: "'Roboto', sans-serif",
    cursor: "pointer",
  }
};
export default LabStaffHeader;