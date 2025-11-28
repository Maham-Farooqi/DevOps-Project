import React, { useState, useEffect } from "react";
import Footer from './Footer';
import Header from './Header';
import { initializeChatbase } from './chatbase';  // Import the function

const ChatPage = ({}) => { // Pass current_user as a prop

  useEffect(() => {
    // Call the function from chatbase.js to initialize Chatbase
    initializeChatbase();
  }, []); // Ensure current_user is available in the dependency array

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { text: message, sender: "sent" }]);
      setMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.chatContainer}>
        <h1 style={styles.chatTitle}>Chat With A Doctor</h1>
        <div style={styles.messagesContainer}>
          {messages.length === 0 ? (
            <p style={styles.noMessages}>Start the conversation by sending a message!</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                style={msg.sender === "sent" ? styles.sentMessageBubble : styles.receivedMessageBubble}
              >
                <p>{msg.text}</p>
              </div>
            ))
          )}
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.messageInput}
          />
          <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    margin: "0",
    padding: "0",
    backgroundColor: "#f4f7fb",
  },
  chatContainer: {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  chatTitle: {
    fontSize: "2.5em",
    fontWeight: "700",
    color: "#0D095A",
    marginBottom: "20px",
    textAlign: "center",
  },
  messagesContainer: {
    maxHeight: "400px",
    overflowY: "auto",
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  sentMessageBubble: {
    backgroundColor: "#9CC4F2",
    color: "black",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "15px",
    fontSize: "1.1em",
    maxWidth: "50%",
    marginLeft: "auto",
  },
  receivedMessageBubble: {
    backgroundColor: "white",
    color: "black",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "15px",
    fontSize: "1.1em",
    maxWidth: "75%",
    marginRight: "auto",
    border: "1px solid #ddd",
  },
  noMessages: {
    textAlign: "center",
    color: "#888",
    fontSize: "1.2em",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  messageInput: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "70%",
  },
  sendButton: {
    backgroundColor: "#DA8026",
    color: "white",
    fontSize: "1em",
    fontWeight: "600",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ChatPage;
