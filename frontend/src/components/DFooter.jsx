import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.logoAndTitle}>
          <img src="../Asset/logo.png" alt="Logo" style={styles.logo} />
          <h3 style={styles.contactTitle}>Contact Us</h3>
        </div>

        <div style={styles.contactInfo}>
          <div style={styles.section}>
            <h4 style={styles.subheading}>Address</h4>
            <p style={styles.text}>525 East,</p>
            <p style={styles.text}>68th Street,</p>
            <p style={styles.text}>New York NY</p>
          </div>

          <div style={styles.section}>
            <h4 style={styles.subheading}>Phone Number</h4>
            <p style={styles.text}>Reception: (213) 555-3489</p>
            <p style={styles.text}>Ambulance: (213) 555-3490</p>
            <p style={styles.text}>Pharmacy: (213) 555-3491</p>
          </div>

          <div style={styles.section}>
            <h4 style={styles.subheading}>Email</h4>
            <p style={styles.text}>
              Reception: <a href="mailto:reception@eku.org" style={styles.link}>reception@eku.org</a>
            </p>
            <p style={styles.text}>
              Ambulance: <a href="mailto:ambulance@eka.org" style={styles.link}>ambulance@eka.org</a>
            </p>
            <p style={styles.text}>
              Pharmacy: <a href="mailto:pharmacy@eka.org" style={styles.link}>pharmacy@eka.org</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#5B8B35",
    color: "white",
    padding: "20px 10px",
    fontFamily: "'Roboto', sans-serif",
    width: "100%",
    boxSizing: "border-box",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logoAndTitle: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "100px",
    height: "auto",
    marginRight: "10px",
  },
  contactTitle: {
    fontSize: "1.5em",
    fontWeight: "500",
    margin: 0,
  },
  contactInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "40px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  subheading: {
    fontSize: "1.2em",
    fontWeight: "500",
    marginBottom: "8px",
  },
  text: {
    margin: "5px 0",
    fontSize: "1em",
    fontWeight: "400",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};

export default Footer;
