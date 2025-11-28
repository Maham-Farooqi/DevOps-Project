import React, { useState } from "react";
import "../Styling/PatientReport.css";
import Header from "./DHeader";
import Footer from "./DFooter";

function PatientReport() {
    const reports = [
        { id: 1, patient: "Maham Farooqi", date: "2024-11-25", status: "Pending", findings: "Sample findings for Maham.", comments: "No issues found." },
        { id: 2, patient: "Rameen Rafiq", date: "2024-11-26", status: "Pending", findings: "Sample findings for Rameen.", comments: "Requires further analysis." }
    ];

    const [selectedReport, setSelectedReport] = useState(null);

    const formData = {
        patientId: "P1",
        diagnosisId: "D18",
        labStaffId: "L7",
        patientName: "Maham Farooqi",
        gender: "Female",
        dob: "15-07-2003",
        age: "21",
        bloodType: "A+",
        hemoglobin: "12.5",
        plateletsCount: "200,000",
        hba1c: "4.1%",
        estimatedAverageGlucose: "80 mg/dL",
        dnaDescription: "DNA sequencing revealed a trinucleotide repeat expansion in the FMR1 gene (CGG repeat count: 200+), indicating Fragile X syndrome.",
        proteinDescription: "Observed a missense mutation resulting in an amino acid substitution at position 6 of the beta-globin protein: Glutamic acid (Glu) to Valine (Val). This alteration affects hemoglobin polymerization.",
    };

    const reportFields = {
        bloodTest: [
            { label: "Hemoglobin", value: formData.hemoglobin },
            { label: "Platelets Count", value: formData.plateletsCount },
        ],
        diabeticTest: [
            { label: "HbA1C", value: formData.hba1c },
            { label: "Estimated Average Glucose", value: formData.estimatedAverageGlucose },
        ],
        geneticTest: [
            { label: "DNA Description", value: formData.dnaDescription },
            { label: "Protein Description", value: formData.proteinDescription },
        ],
    };

    const [testType, setTestType] = useState("geneticTest");

    const handleReportClick = (report) => {
        setSelectedReport(report);
    };

    const handleBackClick = () => {
        setSelectedReport(null);
    };

    return (
        <>
            <Header />
            <div className="reports-page">
                <h1>{selectedReport ? `Lab Test Report: ${selectedReport.patient}` : "Pending Reports"}</h1>

                {/* Show list of reports or specific report details */}
                {!selectedReport ? (
                    <div className="reports-list">
                        <table className="reports-table">
                            <thead>
                                <tr>
                                    <th>Patient</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report.id}>
                                        <td>{report.patient}</td>
                                        <td>{report.date}</td>
                                        <td>{report.status}</td>
                                        <td>
                                            <button className="view-btn" onClick={() => handleReportClick(report)}>
                                                View Report
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="report-details">
                        <div className="report-summary">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="left-cell">Patient ID:</td>
                                        <td className="right-cell">{formData.patientId}</td>
                                    </tr>
                                    <tr>
                                        <td className="left-cell">Diagnosis ID:</td>
                                        <td className="right-cell">{formData.diagnosisId}</td>
                                    </tr>
                                    <tr>
                                        <td className="left-cell">Lab Staff ID:</td>
                                        <td className="right-cell">{formData.labStaffId}</td>
                                    </tr>
                                    <tr>
                                        <td className="left-cell">Patient Name:</td>
                                        <td className="right-cell">{formData.patientName}</td>
                                    </tr>
                                    <tr>
                                        <td className="left-cell">Gender:</td>
                                        <td className="right-cell">{formData.gender}</td>
                                    </tr>
                                    <tr>
                                        <td className="left-cell">Date of Birth:</td>
                                        <td className="right-cell">{formData.dob}</td>
                                    </tr>
                                    <tr>
                                        <td className="left-cell">Age:</td>
                                        <td className="right-cell">{formData.age}</td>
                                    </tr>
                                    <tr>
                                        <td className="left-cell">Blood Type:</td>
                                        <td className="right-cell">{formData.bloodType}</td>
                                    </tr>
                                    <tr>
                                        <td className="left-cell">Hemoglobin:</td>
                                        <td className="right-cell">{formData.hemoglobin}</td>
                                    </tr>
                                    <tr>
                                        <td className="left-cell">Platelets Count:</td>
                                        <td className="right-cell">{formData.plateletsCount}</td>
                                    </tr>
                                    <tr>
                                        <td className="left-cell">HbA1C:</td>
                                        <td className="right-cell">{formData.hba1c}</td>
                                    </tr>
                                    <tr>
                                        <td className="left-cell">Estimated Average Glucose:</td>
                                        <td className="right-cell">{formData.estimatedAverageGlucose}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <h2 className="mediumtextblue">Test Results</h2>
                            <table className="reports-table">
                                <tbody>
                                    {reportFields[testType].map((field, index) => (
                                        <tr key={index}>
                                            <td className="left-cell desc">{field.label}</td>
                                            <td className="right-cell">{field.value || "N/A"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button className="back-btn" onClick={handleBackClick}>
                            Back to Reports
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default PatientReport;
