import React from 'react';
import Footer from './LabStaffFooter';
import Header from './LabStaffHeader';
const LabStaffDashboard = () => {
  const navigate = (path) => {
    window.location.href = path;
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <section style={styles.whiteSection}>
        <div style={styles.flexContainer}>
          <div style={styles.textContainer}>
            <h1 style={styles.largetextblue}>View Upcoming</h1>
            <h1 style={styles.largetextblue}>Lab Appointments</h1>
            <p style={styles.bluetext}>View the patient details who</p>
            <p style={styles.bluetext}>have upcoming lab appointments</p>
            <p style={styles.bluetext}>and get a head start on their progress!</p>
          </div>
          <div style={styles.subSections}>
            <div style={styles.subSection}>
              <img src="/calendar.png" alt="Icon 2" style={styles.icon} />
              <button style={styles.button}onClick={() => navigate('/upcomingAppointment')}>View Upcoming Appointments</button>
            </div>
          </div>
        </div>
      </section>
      <section style={styles.blueSection}>
        <div style={styles.ambulanceContainer}>
          <div style={styles.textContainer}>
            <h1 style={styles.largetextblue}>Generate Lab</h1>
            <h1 style={styles.largetextblue}>Test Reports</h1>
            <div style={styles.leftAlignedButtonContainer}>
              <button style={styles.button} onClick={() => navigate('/labstaffreport')}>Generate Reports</button>
            </div>
          </div>
          <div style={styles.ambulanceImageContainer}>
            <img
              src="/report.png"
              alt="report"
              style={styles.ambulance}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
const styles = {
    imageSection: {
      width: "100%",
      height: "500px",
      position: "relative",
      overflow: "hidden",
    },
    fullImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 1,
    },
    textOverlay: {
      position: "absolute",
      top: "50%",
      left: "0",
      paddingLeft: "20px",
      transform: "translateY(-50%)",
      color: "white",
      zIndex: 2,
      textAlign: "left",
    },
    largeText: {
      fontSize: "4em",
      fontWeight: "700",
      margin: 10,
    },
    largetextblue: {
      fontSize: "4em",
      fontWeight: "700",
      margin: "10px 0",
      marginBottom: "20px",
      color: "#0D095A",
      textAlign: "left",
      paddingLeft: "20px",
    },
    s4largetextblue: {
      fontSize: "4em",
      fontWeight: "700",
      margin: "10px 0",
      marginBottom: "20px",
      color: "#0D095A",
      textAlign: "right",
      paddingLeft: "20px",
    },
    button: {
      marginTop: "20px",
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
    },
    whiteSection: {
      backgroundColor: "white",
      padding: "50px 20px",
      textAlign: "center",
    },
    blueSection: {
      backgroundColor: "#9CC4F2",
      padding: "15px 10px",
      textAlign: "center",
      color: "white",
    },
    heading: {
      fontSize: "2em",
      marginBottom: "20px",
      fontWeight: "600",
    },
    text: {
      fontSize: "1.2em",
      lineHeight: "1.6",
    },
    bluetext: {
      fontSize: "1.7em",
      lineHeight: "1.2",
      color: "#0D095A",
      textAlign: "left",
      paddingLeft: "20px",
      margin: "5px 0",
    },
    flexContainer: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "20px",
    },
    textContainer: {
      flex: "2",
    },
    subSections: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "200px",
      paddingRight: "200px",
      marginLeft: "auto",
    },
    subSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "20px",
    },
    icon: {
      width: "200px",
      height: "200px",
      marginBottom: "37px",
    },
    ambulanceContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
    },
    ambulanceImageContainer: {
      width: "50%",
    },
    ambulance: {
      width: "550px",
      height: "400px",
      borderRadius: "20px",
    },
    leftAlignedButtonContainer: {
      textAlign: "left",
    },
    rightAlignedButtonContainer: {
      textAlign: "right",
    },
  };
export default LabStaffDashboard;