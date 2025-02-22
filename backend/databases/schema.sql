drop database if exists healthcare_db;
create database if not exists healthcare_db;
use healthcare_db;


-- Relational Database Tables
CREATE TABLE Doctors (
    DoctorID INT PRIMARY KEY,  
    first_name VARCHAR(100) NOT NULL,    
    last_name  VARCHAR(100) NOT NULL,         
    DoctorImage VARCHAR(255),         
    Specialization VARCHAR(100),      
    Certificates VARCHAR(255),        
    Bio TEXT,                                
    Age INT                                                     
);

CREATE TABLE Patient (
    PatientID INT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,    
    last_name  VARCHAR(100) NOT NULL,         
    Age       INT CHECK (Age > 18),
    Gender ENUM('Male', 'Female', 'Non-binary', 'Prefer Not to Say','Other') NOT NULL
);

CREATE TABLE Appointment (
    AppointmentID SERIAL PRIMARY KEY,
    PatientID     INT NOT NULL,
    DoctorID      INT NOT NULL,
    DateBooked DATETIME NOT NULL,
    CONSTRAINT appointment_ibfk_1 FOREIGN KEY (PatientID) REFERENCES Patient(PatientID) ON DELETE CASCADE,
    CONSTRAINT appointment_ibfk_2 FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID) ON DELETE CASCADE
);

CREATE TABLE Review (
    ReviewID  SERIAL PRIMARY KEY,
    DoctorID  INT NOT NULL,
    PatientID INT NOT NULL,
    Rating    DECIMAL(2,1) CHECK (Rating BETWEEN 0 AND 5),
    Feedback  TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT review_ibfk_1 FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID) ON DELETE CASCADE,
    CONSTRAINT review_ibfk_2 FOREIGN KEY (PatientID) REFERENCES Patient(PatientID) ON DELETE CASCADE
);

CREATE TABLE PatientInformation (
    RecordID     SERIAL PRIMARY KEY,
    PatientID    INT NOT NULL,
    FileHash     VARCHAR(255) NOT NULL, 
    UploadedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT patientinfo_ibfk_1 FOREIGN KEY (PatientID) REFERENCES Patient(PatientID) ON DELETE CASCADE
);

CREATE TABLE Transaction (
    TransactionID SERIAL PRIMARY KEY,
    PatientID     INT NOT NULL,
    DoctorID      INT NOT NULL,
    Amount        DECIMAL(10,2) NOT NULL CHECK (Amount > 0),
    DateSent DATETIME NOT NULL,
    CONSTRAINT transaction_ibfk_1 FOREIGN KEY (PatientID) REFERENCES Patient(PatientID) ON DELETE CASCADE,
    CONSTRAINT transaction_ibfk_2 FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID) ON DELETE CASCADE
);

CREATE TABLE Chat (
    ChatID     SERIAL PRIMARY KEY,
    PatientID  INT NOT NULL,
    DoctorID   INT NOT NULL,
    TextedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Message    TEXT NOT NULL,
    AI_Response TEXT,
    CONSTRAINT chat_ibfk_1 FOREIGN KEY (PatientID) REFERENCES Patient(PatientID) ON DELETE CASCADE,
    CONSTRAINT chat_ibfk_2 FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID) ON DELETE CASCADE
);
