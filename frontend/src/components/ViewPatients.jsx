import React, { useState, useEffect } from 'react';
import { FaHistory, FaCalendarAlt, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from './DFooter';
import Header from './DHeader';
import EditPatient from './EditPatients'
import RescheduleAppointment from './RescheduleAppointment1';
import '../Styling/ViewPatients.css';

const ViewPatients = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [patients, setPatients] = useState([]);


  async function loadData() {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const id = user.doctor_id
      const response = await fetch(`http://localhost:3001/api/patients/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      } else {
        console.error('Failed to fetch appointments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  async function loadDiagnosis(pid) {
    try {
      // const id = JSON.parse(sessionStorage.getItem('user'))?.user_id || 'D101';
      const id = 'D101'
      const response = await fetch(`http://localhost:3001/api/diagnosis/${pid}`);
      if (response.ok) {
        const data = await response.json();
        setHistoryData(data);
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


  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  const handleViewPatientHistory = (patientId) => {
    setSelectedPatientId(patientId);
    loadDiagnosis(patientId)
    setShowHistory(true);
  };

  const handleRescheduleClick = (patientId) => {
    setCurrentAction('reschedule');
    setSelectedPatientId(patientId);
  };

  const handleEditClick = (patientId) => {
    setCurrentAction('edit');
    setSelectedPatientId(patientId);
  };

  const handleSavePatient = (updatedPatient) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
    setCurrentAction(null);
    setSelectedPatientId(null);
  };

  const handleCancelAction = () => {
    setCurrentAction(null);
    setSelectedPatientId(null);
    setShowHistory(false);
  };

  const handleReschedule = async (newAppointmentTime) => {
    const appointmentDate = new Date(newAppointmentTime);
    const date = appointmentDate.toISOString().split('T')[0]; 
    const time = appointmentDate.toTimeString().split(' ')[0]; 
  
    console.log("Date:", date); 
    console.log("Time:", time); 
  
    try {
      const response = await fetch(`http://localhost:3001/api/reshedule/${selectedPatientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, time }),
      });
  
      if (response.ok) {
        const updatedAppointment = await response.json();
        console.log("Appointment updated successfully:", updatedAppointment);
  
        // Update the patient data in state
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient.appointment_id === selectedPatientId
              ? { ...patient, appointment_time: time }
              : patient
          )
        );
      } else {
        console.error("Failed to update appointment:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  
    setCurrentAction(null);
    setSelectedPatientId(null);
  };
  

  const handleCloseHistory = () => {
    setShowHistory(false);
    setSelectedPatientId(null);
  };

  const filteredPatients = Array.isArray(patients)
    ? patients.filter((patient) => {
      const matchesSearch = patient.full_name.toLowerCase().includes(searchTerm);
      const matchesFilter =
        filterStatus === 'All' || patient.status.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesFilter;
    })
    : [];

  return (
    <>
      <Header />
      <div className="view-patients-page">
        <h1 className="page-title">View Patients</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name.."
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select className="filter-select" value={filterStatus}
            onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="patient-cards-container">
          {filteredPatients.map((patient) => (
            <div key={patient.patient_id} className="patient-card">
              <div className="patient-card-header">
                <img
                  src={`../Asset/${patient.profile}.jpg`}
                  alt={`${patient.full_name}'s profile`}
                  className="patient-image"
                />
                <h2 className="patient-name">{patient.full_name}</h2>
              </div>
              <div className="patient-card-body">
                <p><strong>Date of Birth:</strong> {patient.date_of_birth}</p>
                <p><strong>Next Appointment:</strong> {patient.appointment_time}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`status-${patient.status.toLowerCase()}`}>{patient.status}</span>
                </p>
                <p><strong>Emergency Contact:</strong> {patient.contact_number}</p>
              </div>
              <div className="patient-card-summary">
                <p><strong>Medical Summary:</strong> {patient.medicalSummary}</p>
                <p><strong>Notes:</strong> {patient.notes}</p>
              </div>
              <div className="patient-card-actions">
                <button className="action-btn" onClick={() =>
                  handleViewPatientHistory(patient.patient_id)}>
                  <FaHistory /> View History
                </button>
                <button className="action-btn" onClick={() =>
                  handleRescheduleClick(patient.appointment_id)}>
                  <FaCalendarAlt /> Reschedule
                </button>
                <button className="action-btn" onClick={() =>
                  handleEditClick(patient.patient_id)}>
                  <FaEdit /> Edit Info
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Patient History Section */}
        {showHistory && selectedPatientId && (
          <div className="patient-history-section">
             <h2>Patient History</h2>
            {/* <h2>History of {patients.find((p) => p.patient_id === selectedPatientId).full_name}</h2> */}
            <button className="close-history-btn" onClick={handleCloseHistory}>×</button>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Diagnosis</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((history, index) => (
                  <tr key={index}>
                    <td>{history.diagnosis_id}</td>
                    <td>{new Date(history.diagnosis_date).toISOString().split('T')[0]}</td>
                    <td>{history.description}</td>
                  </tr>
                ))}
                {historyData.length === 0 && (
                  <tr>
                    <td colSpan="3">No history available</td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        )}

        {/* Edit and Reschedule Forms */}
        {currentAction === 'edit' && selectedPatientId && (
          <EditPatient
            patient={patients.find((p) => p.patient_id === selectedPatientId)}
            onSave={handleSavePatient}
            onCancel={handleCancelAction}
          />
        )}

        {currentAction === 'reschedule' && selectedPatientId && (
          <div className="reschedule-form-container">
            <RescheduleAppointment
              patient={patients.find((p) => p.appointment_id === selectedPatientId)}
              onReschedule={handleReschedule}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ViewPatients;
