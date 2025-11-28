import React, { useState } from 'react';
import '../Styling/Chats.css';
import Header from './DHeader';
import Footer from './DFooter';

function Chats() {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    // Store messages for each patient in an object
    const [patientMessages, setPatientMessages] = useState({
        1: [], // Patient 1's messages
        2: [], // Patient 2's messages
    });

    const patientsData = [
        { 
            id: 1, 
            name: 'Maham Farooqi', 
            age: 32, 
            condition: 'Headache', 
            image: '../Asset/patient2.jpg' 
        },
        { 
            id: 2, 
            name: 'Rameen Rafiq', 
            age: 28, 
            condition: 'Back Pain', 
            image: '../Asset/patient1.jpg' 
        },
    ];

    const handlePatientSelection = (patient) => {
        setSelectedPatient(patient);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // Create a unique message ID
            const messageId = new Date().getTime();
            // Store the message for the selected patient
            setPatientMessages((prevMessages) => ({
                ...prevMessages,
                [selectedPatient.id]: [
                    ...prevMessages[selectedPatient.id],
                    { id: messageId, text: newMessage, type: 'sent', timestamp: new Date() }
                ]
            }));
            setNewMessage('');
        }
    };

    const handleDeleteMessage = (messageId) => {
        // Filter out the message to be deleted
        setPatientMessages((prevMessages) => ({
            ...prevMessages,
            [selectedPatient.id]: prevMessages[selectedPatient.id].filter(msg => msg.id !== messageId)
        }));
    };

    return (
        <>
            <Header />
            <div className="patient-interaction-page">
                <h1 className="page-title">Patient Interaction</h1>

                <div className="patient-list-section">
                    <h2 className="section-heading">All Patients</h2>
                    <div className="patient-list">
                        {patientsData.map((patient) => (
                            <div
                                key={patient.id}
                                className={`patient-card ${selectedPatient?.id === patient.id ? 'selected' : ''}`}
                                onClick={() => handlePatientSelection(patient)}
                            >
                                <img 
                                    src={patient.image} 
                                    alt={patient.name} 
                                    className="patient-image"
                                />
                                <div className="patient-info">
                                    <h3>{patient.name}</h3>
                                    <p><strong>Age:</strong> {patient.age}</p>
                                    <p><strong>Condition:</strong> {patient.condition}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedPatient && (
                    <div className="chat-room-section">
                        <h2 className="section-heading">Chat with {selectedPatient.name}</h2>
                        <div className="chat-room">
                            <div className="chat-body">
                                {patientMessages[selectedPatient.id].length > 0 ? (
                                    patientMessages[selectedPatient.id].map((msg) => (
                                        <div key={msg.id} className={`chat-message ${msg.type}`}>
                                            {msg.text}
                                            <span className="timestamp">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <button 
                                                className="delete-btn" 
                                                onClick={() => handleDeleteMessage(msg.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-messages">No messages yet. Start the conversation!</div>
                                )}
                            </div>
                            <div className="chat-footer">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button onClick={handleSendMessage} className="send-btn">Send</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Chats;
