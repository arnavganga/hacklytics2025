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
