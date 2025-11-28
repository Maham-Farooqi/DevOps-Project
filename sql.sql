create database healthify;

use healthify;
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contact_number VARCHAR(15) NOT NULL,
    password VARCHAR(50) NOT NULL
);
ALTER TABLE users
ADD COLUMN role VARCHAR(50);

CREATE TABLE Patients (
    user_id INT,
    patient_id VARCHAR(10) PRIMARY KEY,
    status VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
CREATE TABLE Doctors (
    user_id INT,
    doctor_id VARCHAR(10) PRIMARY KEY,
    specialization VARCHAR(50),
    start_time TIME,
    end_time TIME,
    hire_date DATE,
    salary DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE Rooms (
    room_id VARCHAR(10) PRIMARY KEY,
    room_type VARCHAR(100),
    room_location VARCHAR(100)
);


CREATE TABLE Appointments (
    appointment_id VARCHAR(10) PRIMARY KEY,
    patient_id VARCHAR(10),
    doctor_id VARCHAR(10),
    appointment_date DATE,
    room_id VARCHAR(10),
    appointment_time TIME,
    cost DECIMAL(10, 2),
    status VARCHAR(20),
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (room_id) REFERENCES Rooms(room_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);



CREATE TABLE Diagnosis (
    diagnosis_id VARCHAR(10) PRIMARY KEY,       
    appointment_id VARCHAR(10),               
    diagnosis_date DATE NOT NULL,              
    description TEXT NOT NULL,                
    FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id) 
        ON DELETE CASCADE                     
        ON UPDATE CASCADE                     
);


CREATE TABLE LabStaff (
    user_id INT ,                
    lab_staff_id VARCHAR(10) PRIMARY KEY,       
    hire_date DATE NOT NULL,             
    salary DECIMAL(10, 2) NOT NULL,
     FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE LabTests (
    labtest_id VARCHAR(10) PRIMARY KEY,         
    diagnosis_id VARCHAR(10),                   
    test_date DATE NOT NULL,                   
    test_time TIME NOT NULL,                    
    payment DECIMAL(10, 2) default 0,          
    is_paid BOOLEAN default false,                 
    staff_id VARCHAR(10) ,             
    test_type VARCHAR(50) ,
    patient_id VARCHAR(10),
    FOREIGN KEY (diagnosis_id) REFERENCES Diagnosis(diagnosis_id)
        ON DELETE CASCADE                       
        ON UPDATE CASCADE   ,
    FOREIGN KEY (staff_id) REFERENCES LabStaff(lab_staff_id)
        ON DELETE CASCADE                    
        ON UPDATE CASCADE  ,
	FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
        ON DELETE CASCADE                    
        ON UPDATE CASCADE
);


CREATE TABLE Ambulance (
    ambulance_id VARCHAR(10) PRIMARY KEY,
    status VARCHAR(50) 
);


CREATE TABLE Calls (
    call_id VARCHAR(10) PRIMARY KEY,
    ambulance_id VARCHAR(10),
    patient_id VARCHAR(10),
    date DATE ,
    time TIME ,
    address VARCHAR(255),
    status VARCHAR(50),
    FOREIGN KEY (ambulance_id) REFERENCES Ambulance(ambulance_id),
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id)
);


CREATE TABLE LabReports (
    labreport_id VARCHAR(10) PRIMARY KEY,
    labtest_id VARCHAR(10),
    result_date DATE ,
    result VARCHAR(30) DEFAULT 'N/A',
    FOREIGN KEY (labtest_id) REFERENCES LabTests(labtest_id)
);



CREATE TABLE BloodTestResults(
    resultId VARCHAR(10) PRIMARY KEY,
    labreport_id  VARCHAR(10),
    gender VARCHAR(10) ,
    dob DATE NOT NULL,
    age INT NOT NULL,
    bloodType VARCHAR(5),
    hemoglobin DECIMAL(5, 2),
    plateletsCount INT,
    FOREIGN KEY (labreport_id) REFERENCES labreports(labreport_id)
);

CREATE TABLE DiabeticTestResults(
    resultId VARCHAR(10) PRIMARY KEY,
	labreport_id  VARCHAR(10),
    gender VARCHAR(10) ,
    dob DATE NOT NULL,
    age INT NOT NULL,
    bloodType VARCHAR(5),
    HbA1c DECIMAL(4, 2),
    estimatedAvgGlucose DECIMAL(6, 2),
	FOREIGN KEY (labreport_id) REFERENCES labreports(labreport_id)
);

CREATE TABLE GeneticTestResults(
    resultId VARCHAR(10) PRIMARY KEY,
	labreport_id  VARCHAR(10),
    gender VARCHAR(10) ,
    dob DATE NOT NULL,
    age INT NOT NULL,
    bloodType VARCHAR(5),
    gene varchar(200),
    DNADescription varchar(200),
    ProteinDescription varchar(200),
    FOREIGN KEY (labreport_id) REFERENCES labreports(labreport_id)
);



CREATE TABLE Medicines ( 
    medicine_id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,                
    stock INT ,                         
    expiry_date DATE ,                 
    category VARCHAR(100) ,            
    description VARCHAR(200)                            
);

ALTER TABLE medicines
ADD COLUMN price NUMERIC(10, 2) NOT NULL DEFAULT 0.00;

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_date DATE ,
    patient_id VARCHAR(50) ,
    cost DECIMAL(10, 2) ,
     FOREIGN KEY (patient_id) REFERENCES Patients(patient_id)
);


alter table users add profile varchar(80);

ALTER TABLE diagnosis
ADD patient_id varchar(10),
ADD CONSTRAINT fk_patient_id FOREIGN KEY (patient_id) REFERENCES patients(patient_id);

CREATE TABLE Prescriptions (
    prescription_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id varchar(30) NOT NULL,
    medicine VARCHAR(255) ,
    dosage VARCHAR(100) ,
    duration VARCHAR(100) ,
    diagnosis TEXT ,
    date DATETIME ,
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE
);

INSERT INTO users (user_id, full_name, date_of_birth, email, contact_number, password,role) VALUES
(1, 'Maham Farooqi', '2003-07-15', 'mahamfarooqi@gmail.com', '923313564637', 'maham123','patient'),
(2, 'Rameen Rafiq', '2004-02-27', 'rameenrafiq@gmail.com', '923330211306', 'rameen456','patient'),
(3, 'Dr. Sabina Rasheed', '2004-08-03', 'sabinarasheed@gmail.com', '92002628849', 'sabina123','doctor'),
(4, 'Dr Faiza Khan', '2003-07-25', 'faizakhan@gmail.com', '923122212919', 'faiza123','doctor'),
(5, 'Amal Abdul Rehman', '2002-01-04', 'amalabdulrehman@gmail.com', '92330157823', 'ama1123','admin'),
(6, 'Zara Ahmed', '2006-09-16', 'zaraahmed@gmail.com', '9230167942', 'zara123','labstaff');

INSERT INTO Patients (user_id, patient_id, status) VALUES
(1, 'P101', 'admitted');



INSERT INTO Doctors (user_id, doctor_id, specialization, start_time, end_time,  hire_date,salary) 
VALUES 
(3, 'D101', 'Neurology', '09:00:00', '18:45:00', '2022-10-21', 50000.00),
(4, 'D102', 'Psychology', '10:00:00', '19:00:00', '2019-01-30', 19000.00);


INSERT INTO Rooms (room_id, room_type, room_location)
VALUES
('R1', 'Psychologist Room', 'Floor 1, Room 2'),
('R2', 'Neurology Room', 'Floor 4, Room 6');

INSERT INTO LabStaff (user_id, lab_staff_id, hire_date, salary)
VALUES
(6, 'L101', '2024-05-04', 9000.00);


INSERT INTO Medicines (name, stock, expiry_date, category, description,price)
VALUES
('Paracetamol', 200, '2025-12-31', 'Painkiller', 'Used for pain relief and fever reduction',50),
('Amoxicillin', 100, '2024-08-15', 'Antibiotic', 'Common antibiotic for bacterial infections',40),
('Ibuprofen', 150, '2025-06-30', 'Painkiller', 'Reduces inflammation and pain',90),
('Cough Syrup', 80, '2023-11-15', 'Cold & Flu', 'Relieves cough and throat irritation',70),
('Vitamin C', 500, '2026-05-20', 'Supplement', 'Boosts immunity and overall health',20);

CREATE TABLE IF NOT EXISTS admin (
    admin_id VARCHAR(10) PRIMARY KEY,
    user_id INT NOT NULL,
    hire_date DATE DEFAULT (CURRENT_DATE),
    salary DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

INSERT IGNORE INTO admin (admin_id, user_id, hire_date, salary) 
VALUES ('AD001', 5, '2023-01-15', 85000.00);



