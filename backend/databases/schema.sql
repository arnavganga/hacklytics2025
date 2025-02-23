-- Drop and Create Database if not exists
DROP DATABASE IF EXISTS healthcare_db;
CREATE DATABASE IF NOT EXISTS healthcare_db;
USE healthcare_db;

-- Relational Database Tables

-- Drop existing tables if they exist
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Doctors;
DROP TABLE IF EXISTS Patient;
DROP TABLE IF EXISTS Appointment;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS PatientInformation;
DROP TABLE IF EXISTS Transaction;
DROP TABLE IF EXISTS Chat;

-- Create User table
CREATE TABLE User (
    Email VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,    
    last_name  VARCHAR(100) NOT NULL,   
    Age INT CHECK (Age > 18),
    user_type ENUM('patient', 'doctor') NOT NULL
);

-- Create Doctors table
CREATE TABLE Doctors (
    Email VARCHAR(225) PRIMARY KEY,                 
    Specialization VARCHAR(100),            
    Bio TEXT,
    CONSTRAINT doctors_ibfk_1 FOREIGN KEY (Email) REFERENCES User(Email) ON DELETE CASCADE
);

-- Create Patient table
CREATE TABLE Patient (
    Email VARCHAR(225) PRIMARY KEY,       
    Gender ENUM('Male', 'Female', 'Non-binary', 'Prefer Not to Say','Other') NOT NULL,
    CONSTRAINT patient_ibfk_1 FOREIGN KEY (Email) REFERENCES User(Email) ON DELETE CASCADE
);

-- Create Appointment table
CREATE TABLE Appointment (
    AppointmentID SERIAL PRIMARY KEY,
    PatientEmail     VARCHAR(255) NOT NULL,
    DoctorEmail      VARCHAR(255) NOT NULL,
    DateBooked       DATETIME NOT NULL,
    MeetingLink      VARCHAR(255) NOT NULL,
    Summary          TEXT NULL,
    CONSTRAINT appointment_ibfk_1 FOREIGN KEY (PatientEmail) REFERENCES Patient(Email) ON DELETE CASCADE,
    CONSTRAINT appointment_ibfk_2 FOREIGN KEY (DoctorEmail) REFERENCES Doctors(Email) ON DELETE CASCADE
);

-- Create Review table
CREATE TABLE Review (
    ReviewID  SERIAL PRIMARY KEY,
    DoctorEmail  VARCHAR(255) NOT NULL,
    PatientEmail VARCHAR(255) NOT NULL,
    Rating    DECIMAL(2,1) CHECK (Rating BETWEEN 0 AND 5),
    Feedback  TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT review_ibfk_1 FOREIGN KEY (DoctorEmail) REFERENCES Doctors(Email) ON DELETE CASCADE,
    CONSTRAINT review_ibfk_2 FOREIGN KEY (PatientEmail) REFERENCES Patient(Email) ON DELETE CASCADE
);

-- Create PatientInformation table
CREATE TABLE PatientInformation (
    RecordID     SERIAL PRIMARY KEY,
    PatientEmail VARCHAR(255) NOT NULL,
    FileHash     VARCHAR(255) NOT NULL, 
    UploadedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT patientinfo_ibfk_1 FOREIGN KEY (PatientEmail) REFERENCES Patient(Email) ON DELETE CASCADE
);

-- Create Transaction table
CREATE TABLE Transaction (
    TransactionID SERIAL PRIMARY KEY,
    PatientEmail     VARCHAR(255) NOT NULL,
    DoctorEmail      VARCHAR(255) NOT NULL,
    Amount        DECIMAL(10,2) NOT NULL CHECK (Amount > 0),
    DateSent DATETIME NOT NULL,
    CONSTRAINT transaction_ibfk_1 FOREIGN KEY (PatientEmail) REFERENCES Patient(Email) ON DELETE CASCADE,
    CONSTRAINT transaction_ibfk_2 FOREIGN KEY (DoctorEmail) REFERENCES Doctors(Email) ON DELETE CASCADE
);

-- Create Chat table
CREATE TABLE Chat (
    ChatID     SERIAL PRIMARY KEY,
    PatientEmail     VARCHAR(255) NOT NULL,
    DoctorEmail      VARCHAR(255) NOT NULL,
    TextedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Message    TEXT NOT NULL,
    AI_Response TEXT,
    CONSTRAINT chat_ibfk_1 FOREIGN KEY (PatientEmail) REFERENCES Patient(Email) ON DELETE CASCADE,
    CONSTRAINT chat_ibfk_2 FOREIGN KEY (DoctorEmail) REFERENCES Doctors(Email) ON DELETE CASCADE
);

-- Insert into User table
INSERT INTO User (Email, first_name, last_name, Age, user_type) VALUES
('john.doe@example.com', 'John', 'Doe', 30, 'doctor'),
('jane.smith@example.com', 'Jane', 'Smith', 25, 'patient'),
('alex.lee@example.com', 'Alex', 'Lee', 40, 'doctor'),
('susan.white@example.com', 'Susan', 'White', 32, 'patient');

-- Insert into Doctors table
INSERT INTO Doctors (Email, Specialization, Bio) VALUES
('john.doe@example.com', 'Cardiologist', 'Expert in heart diseases with 10+ years of experience.'),
('alex.lee@example.com', 'Dermatologist', 'Specialist in skin conditions and treatments.');

-- Insert into Patient table
INSERT INTO Patient (Email, Gender) VALUES
('jane.smith@example.com', 'Female'),
('susan.white@example.com', 'Female');

-- Insert into Appointment table
INSERT INTO Appointment (PatientEmail, DoctorEmail, DateBooked, MeetingLink, Summary) VALUES
('jane.smith@example.com', 'john.doe@example.com', '2025-03-01 10:00:00', 'https://meet.example.com/johndoe123', 'Routine heart checkup'),
('susan.white@example.com', 'alex.lee@example.com', '2025-03-02 14:30:00', 'https://meet.example.com/alexlee456', 'Consultation for a skin rash');

-- Insert into Review table
INSERT INTO Review (DoctorEmail, PatientEmail, Rating, Feedback) VALUES
('john.doe@example.com', 'jane.smith@example.com', 4.5, 'Great consultation! Very informative.'),
('alex.lee@example.com', 'susan.white@example.com', 5.0, 'Helped me a lot with my skin issues.');

-- Insert into PatientInformation table
INSERT INTO PatientInformation (PatientEmail, FileHash) VALUES
('jane.smith@example.com', 'Qm123abc456def789'),
('susan.white@example.com', 'Qm987xyz654lmn321');

-- Insert into Transaction table
INSERT INTO Transaction (PatientEmail, DoctorEmail, Amount, DateSent) VALUES
('jane.smith@example.com', 'john.doe@example.com', 150.00, '2025-02-15 12:00:00'),
('susan.white@example.com', 'alex.lee@example.com', 200.00, '2025-02-16 15:45:00');

-- Insert into Chat table
INSERT INTO Chat (PatientEmail, DoctorEmail, Message, AI_Response) VALUES
('jane.smith@example.com', 'john.doe@example.com', 'What should I do for heart health?', 'Regular exercise and a healthy diet are important.'),
('susan.white@example.com', 'alex.lee@example.com', 'How do I treat eczema?', 'Moisturizing and prescription creams can help.');
