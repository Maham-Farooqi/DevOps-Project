import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MedicineCheckout = () => {
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { search } = useLocation();
  const cartItems = new URLSearchParams(search).getAll('item').map(item => JSON.parse(item));

  const calculateTotalCost = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCompleteOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your address before placing the order.");
      return;
    }
    const user = JSON.parse(sessionStorage.getItem("user"));
    const id = user.patient_id;   
    const orderData = {
        id,
        order_date: new Date().toISOString().split('T')[0],
        cost: calculateTotalCost(),
        address, 
    };

    try {
        const response = await fetch("http://localhost:3001/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            toast.success("Order places!")
            setOrderPlaced(true);
        } else {
          toast.error("Error placing order. Please try again later.")
        }
    } catch (error) {
        toast.error("Error placing order. Please try again later.")
      }
};


  const handleClose = () => {
    setOrderPlaced(false);
  };

  if (!cartItems) {
    return <p>No items in the cart.</p>;
  }

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer/>
      <h1 style={styles.largetextblue}>Checkout</h1>
      
      <div style={styles.checkoutForm}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableCellFirst}>Address</td>
              <td style={styles.tableCell}>
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={styles.input}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>Mode of Payment</td>
              <td style={styles.tableCell}>Cash on Delivery</td>
            </tr>
            <tr>
              <td style={styles.tableCellFirst}>Estimated Delivery</td>
              <td style={styles.tableCell}>1-2 working days</td>
            </tr>
          </tbody>
        </table>

        <h3 style={styles.orderSummaryTitle}>Order Summary</h3>
        <table style={styles.orderSummaryTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Product Name</th>
              <th style={styles.tableHeader}>Quantity</th>
              <th style={styles.tableHeader}>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td style={styles.tableData}>{item.name}</td>
                <td style={styles.tableData}>{item.quantity}</td>
                <td style={styles.tableData}>${item.price}</td>
              </tr>
            ))}
            <tr style={styles.totalRow}>
              <td colSpan="2" style={styles.totalLabel}>Total Cost</td>
              <td style={styles.totalAmount}>${calculateTotalCost()}</td>
            </tr>
          </tbody>
        </table>
        
        {orderPlaced ? (
          <div style={styles.popup}>
            <div style={styles.popupContent}>
              <h2>Order Confirmation</h2>
              <p>Your order has been placed successfully!</p>
              <p><strong>Total Cost:</strong> ${calculateTotalCost()}</p>
              <button style={styles.buttonClose} onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={handleCompleteOrder}>
              Complete Order
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

const styles = {
  largetextblue: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "20px 0",
    textAlign: "center",
    color: "#0D095A",
  },
  checkoutForm: {
    width: "90%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
  },
  table: {
    width: "100%",
    margin: "20px 0",
    borderCollapse: "collapse",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  tableCellFirst: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#9CC4F2",
    fontWeight: "bold",
  },
  tableCell: {
    textAlign: "center",
    padding: "10px",
    border: "1px solid #ddd",
  },
  input: {
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "1em",
  },
  button: {
    backgroundColor: "#DA8026",
    color: "white",
    fontSize: "1.5em",
    fontWeight: "600",
    padding: "15px 30px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  buttonClose: {
    padding: "10px 20px",
    backgroundColor: "#DA8026",
    color: "white",
    fontSize: "1em",
    fontWeight: "600",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  orderSummaryTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    textAlign: "center",
    marginTop: "30px",
  },
  orderSummaryTable: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  tableHeader: {
    padding: "10px",
    backgroundColor: "rgb(91, 139, 53)",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  tableData: {
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },
  totalRow: {
    backgroundColor: "rgb(91, 139, 53)",
    color: "white",
  },
  totalLabel: {
    padding: "10px",
    textAlign: "right",
    fontWeight: "bold",
  },
  totalAmount: {
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.2em",
  },
  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popupContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    textAlign: "center",
  },
};

export default MedicineCheckout;
