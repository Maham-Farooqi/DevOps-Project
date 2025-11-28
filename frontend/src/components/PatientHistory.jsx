import React, { useState, useEffect } from 'react';
import Header from './DHeader';
import Footer from './DFooter';
import '../Styling/PatientHistory.css';

function PatientHistory() {
    const [patientsData, setPatientsData] = useState([]); // Holds patient data fetched from DB
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientHistoryData, setPatientHistoryData] = useState([]); // Holds history data from the prescription table
    const [isLoading, setIsLoading] = useState(false); // Loading state for API calls

    // Fetch patient data from the database
    async function loadData() {
        try {
          const user = JSON.parse(sessionStorage.getItem('user'));
          const id=user.doctor_id
          const response = await fetch(`http://localhost:3001/api/patients/${id}`);
          if (response.ok) {
            const data = await response.json();
            setPatientsData(data);
          } else {
            console.error('Failed to fetch appointments:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
    }
    useEffect(() => {
        loadData();
      }, []);

    // Fetch patient history from the prescription table
    const fetchPatientHistory = async (patientId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/api/prescriptions/${patientId}`);
            if (response.ok) {
                const data = await response.json();
                setPatientHistoryData(data);
            } else {
                console.error('Failed to fetch patient history:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching patient history:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle patient selection
    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        fetchPatientHistory(patient.patient_id); 
    };

    return (
        <>
            <Header />
            <div className="patient-history">
                <div className="patient-history-content">
                    <h1 className="history-heading">Patient History</h1>
                    <div className="patients-list">
                        <h2>Select a Patient</h2>
                        <ul>
                            {patientsData.map((patient) => (
                                <li key={patient.patient_id} onClick={() => handleSelectPatient(patient)}>
                                    <img
                                        src={`../Asset/${patient.profile}.jpg`} // Assuming profile_image is a field in DB
                                        alt={patient.name}
                                        className="patient-image"
                                    />
                                    {patient.full_name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {selectedPatient && (
                        <div className="patient-history-details">
                            <h2>History of {selectedPatient.name}</h2>
                            {isLoading ? (
                                <p>Loading history...</p>
                            ) : (
                                <table className="history-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Diagnosis</th>
                                            <th>Prescription</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patientHistoryData.length > 0 ? (
                                            patientHistoryData.map((history, index) => (
                                                <tr key={index}>
                                                    <td>{history.date}</td>
                                                    <td>{history.diagnosis}</td>
                                                    <td>{history.prescription}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">No history available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PatientHistory;
