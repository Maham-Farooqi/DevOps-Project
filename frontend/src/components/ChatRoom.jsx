import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styling/ChatRoom.css";

const ChatRoom = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Access patient details passed from the Consultation component
    const { patient } = location.state || {};
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Timer state
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
    const [isConsulting, setIsConsulting] = useState(true); // Track if consultation is active
    const [isTimeOver, setIsTimeOver] = useState(false); // Flag to check if consultation time is over

    useEffect(() => {
        let timer;
        if (isConsulting && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsConsulting(false); // End the consultation when the timer runs out
            setIsTimeOver(true); // Mark the time as over
        }

        return () => clearInterval(timer); // Cleanup timer when the component unmounts or consultation ends
    }, [isConsulting, timeLeft]);

    // Redirect to consultation page when time is over
    useEffect(() => {
        if (isTimeOver) {
            const confirmRedirect = window.confirm(
                "Consultation time is over. Do you want to return to the consultation page?"
            );
            if (confirmRedirect) navigate('/consultation');
        }
    }, [isTimeOver, navigate]);

    // Notify when specific time remains
    useEffect(() => {
        if (timeLeft === 60) {
            alert("1 minute left for the consultation.");
        } else if (timeLeft === 30) {
            alert("30 seconds left for the consultation.");
        }
    }, [timeLeft]);

    if (!patient) {
        // If no patient data, redirect back to the consultation page
        navigate('/consultation');
        return null;
    }

    const sendMessage = () => {
        if (newMessage.trim() === "") return;

        const message = {
            text: newMessage,
            sender: "doctor",
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages([...messages, message]);
        setNewMessage("");
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    };

    const handleExtendConsultation = () => {
        setTimeLeft(180); // Reset the timer to 3 minutes
        setIsTimeOver(false); // Reset the "time over" flag
        setIsConsulting(true); // Restart consultation
    };

    const handleEndConsultation = () => {
        const confirmEnd = window.confirm("Are you sure you want to end the consultation?");
        if (confirmEnd) navigate('/doctor/consultations'); // Redirect to the consultations page
    };

    return (
        <div className="chat-room">
            <header className="chat-header">
                <h2>Chat with {patient.name}</h2>
                <div className="timer">
                    {isConsulting && (
                        <span className="timer-text">
                            Time Left: {formatTime(timeLeft)}
                        </span>
                    )}
                </div>
                <button className="end-consultation" onClick={handleEndConsultation}>
                    End Consultation
                </button>
            </header>

            <div className="chat-body">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-message ${
                                msg.sender === "doctor" ? "sent" : "received"
                            }`}
                        >
                            <p>{msg.text}</p>
                            <span className="timestamp">{msg.timestamp}</span>
                        </div>
                    ))
                ) : (
                    <p className="no-messages">No messages yet</p>
                )}
            </div>

            <footer className="chat-footer">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={!isConsulting}
                />
                <button onClick={sendMessage} className="send-btn" disabled={!isConsulting}>
                    Send
                </button>
            </footer>

            {/* Show extend consultation option if time is over */}
            {isTimeOver && (
                <div className="extend-consultation">
                    <p>Consultation time is over.</p>
                    <button className="extend-btn" onClick={handleExtendConsultation}>
                        Extend Consultation
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatRoom;
