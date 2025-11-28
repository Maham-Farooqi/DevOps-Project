import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MedicineHomePage = () => {
  const navigate = (path) => {
    window.location.href = path;
  };

  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("http://localhost:3001/medicines");
        if (!response.ok) {
          toast.error("Failed to fetch medicines.");
        }
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
      }
    };
    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesCategory = selectedCategory ? medicine.category === selectedCategory : true;
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCartClick = (medicine) => {
    setSelectedMedicine(medicine);
    setQuantity(1);
    setCartMessage("");
    setShowPopup(true);
  };

  const handleAddToCart = () => {
    const stock = parseInt(selectedMedicine.stock);
    if (quantity > stock || quantity < 1) {
      setCartMessage(`Error: Quantity must be between 1 and ${stock}.`);
    } else {
      setCartMessage("Successfully added to cart!");
      setCart([
        ...cart,
        { ...selectedMedicine, quantity, totalPrice: selectedMedicine.price * quantity },
      ]);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const handleViewCart = () => setShowCartPopup(true);
  const handleProceedToCheckout = () => {
    const cartQuery = cart.map(item => `item=${JSON.stringify(item)}`).join('&');
    navigate(`/checkout?${cartQuery}`);

  };

  // Calculate total cart cost
  const calculateTotalCost = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <ToastContainer/>
      <h1 style={styles.largetextblue}>Order Medicines</h1>
      <div style={styles.controlsContainer}>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.dropdown}
          defaultValue=""
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Painkiller">Pain Killer</option>
          <option value="Antibiotic">Antibiotic</option>
          <option value="Cold & Flu">Cold & Flu</option>
          <option value="Supplement">Supplement</option>
        </select>
        <input
          type="text"
          placeholder="Search for a medicine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />
        <button style={styles.cartButton} onClick={handleViewCart}>
          View Cart
        </button>
      </div>
      <div style={styles.medicinesContainer}>
        {filteredMedicines.map((medicine, index) => (
          <div key={index} style={styles.medicineCard}>
            <h3>{medicine.name}</h3>
            <p>
              <strong>Category:</strong> {medicine.category}
            </p>
            <p>
              <strong>Description:</strong> {medicine.description}
            </p>
            <p>
              <strong>Stock:</strong> {medicine.stock}
            </p>
            <p>
              <strong>Price:</strong> ${medicine.price}
            </p>
            <button style={styles.button} onClick={() => handleAddToCartClick(medicine)}>
              Add to Cart
            </button>
          </div>
        ))}
        {filteredMedicines.length === 0 && (
          <p style={styles.noMedicinesMessage}>No medicines found.</p>
        )}
      </div>
      {/* Cart Popup */}
      {showCartPopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>No items in the cart.</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} style={styles.cartItem}>
                  <h3>{item.name}</h3>
                  <p>
                    <strong>Description:</strong> {item.description}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> ${item.price}
                  </p>
                  <p>
                    <strong>Total:</strong> ${item.totalPrice}
                  </p>
                </div>
              ))
            )}
            <h3>Total: ${calculateTotalCost()}</h3>
            <button style={styles.button} onClick={handleProceedToCheckout}>
              Checkout
            </button>
            <button style={styles.buttonClose} onClick={() => setShowCartPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      {/* Add to Cart Popup */}
      {showPopup && (
  <div style={styles.popup}>
    <div style={styles.popupContent}>
      <h2>{selectedMedicine.name}</h2>
      <p>Stock: {selectedMedicine.stock}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          const enteredValue = Number(e.target.value);
          if (enteredValue >= 0 && enteredValue <= selectedMedicine.stock) {
            setQuantity(enteredValue);
          } else {
            setQuantity(selectedMedicine.stock); // Set to stock value if out of bounds
            
          }
        }}
        style={styles.quantityInput}
        min="0"
        max={selectedMedicine.stock}
      />
      <button style={styles.button} onClick={handleAddToCart}>
        Add
      </button>
      <button style={styles.buttonClose} onClick={() => setShowPopup(false)}>
        Cancel
      </button>
      {cartMessage && <p>{cartMessage}</p>}
    </div>
  </div>
)}
      <Footer />
    </div>
  );
};




const styles = {
  largetextblue: {
    fontSize: "3em",
    fontWeight: "700",
    margin: "10px 0",
    textAlign: "center",
    color: "#0D095A",
    marginTop: "30px",
    marginBottom: "30px",
  },
  controlsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
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
  cartButton: {
    padding: "10px 20px",
    backgroundColor: "#DA8026",
    color: "white",
    fontSize: "1em",
    fontWeight: "600",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  medicinesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#9CC4F2",
    marginBottom: "10px",
  },
  medicineCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
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
  buttonClose: {
    backgroundColor: "#0D095A",
    color: "white",
    fontSize: "1em",
    fontWeight: "600",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "5px"
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
  quantityInput: {
    padding: "5px",
    fontSize: "1em",
    borderRadius: "5px",
    width: "100px",
    marginBottom: "10px",
  },
  cartMessage: {
    color: "green",
    marginTop: "10px",
  },
  noMedicinesMessage: {
    textAlign: "center",
    fontSize: "1.2em",
    color: "#888",
  },
  cartItem: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  }
};
export default MedicineHomePage;