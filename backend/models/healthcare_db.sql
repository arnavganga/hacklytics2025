CREATE TABLE Doctors (
    DoctorID INT PRIMARY KEY AUTO_INCREMENT,  
    first_name VARCHAR(100) NOT NULL,    
    last_name  VARCHAR(100) NOT NULL,         
    DoctorImage VARCHAR(255),           -- URL or path to doctor’s image       
    Specialization VARCHAR(100),        -- Doctor's specialization (e.g., Cardiologist)      
    Certificate VARCHAR(255),           -- URL or path to certification file             
    Bio TEXT,                                 
    Age INT,                                                              
);

CREATE TABLE Patient (
    PatientID SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,    
    last_name  VARCHAR(100) NOT NULL,         
    Age       INT CHECK (Age > 18)
);

CREATE TABLE Appointment (
    AppointmentID SERIAL PRIMARY KEY,
    PatientID     INT NOT NULL,
    DoctorID      INT NOT NULL,
    DateTime DATETIME NOT NULL,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID) ON DELETE CASCADE,
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID) ON DELETE CASCADE
);

CREATE TABLE Review (
    ReviewID  SERIAL PRIMARY KEY,
    DoctorID  INT NOT NULL,
    PatientID INT NOT NULL,
    Rating    DECIMAL(2,1) CHECK (Rating BETWEEN 0 AND 5),
    Feedback  TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID) ON DELETE CASCADE,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID) ON DELETE CASCADE
);

CREATE TABLE PatientInformation (
    RecordID     SERIAL PRIMARY KEY,
    PatientID    INT NOT NULL,
    FileHash     VARCHAR(255) NOT NULL, -- Store IPFS hash or blockchain reference
    UploadedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID) ON DELETE CASCADE
);

CREATE TABLE Transaction (
    TransactionID SERIAL PRIMARY KEY,
    PatientID     INT NOT NULL,
    DoctorID      INT NOT NULL,
    Amount        DECIMAL(10,2) NOT NULL CHECK (Amount > 0),
    Date          DATE NOT NULL,
    Time          TIME NOT NULL,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID) ON DELETE CASCADE,
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID) ON DELETE CASCADE
);

CREATE TABLE Chat (
    ChatID     SERIAL PRIMARY KEY,
    PatientID  INT NOT NULL,
    DoctorID   INT NOT NULL,
    Timestamp  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Message    TEXT NOT NULL,
    AI_Response TEXT, -- Can be NULL if AI doesn’t respond
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID) ON DELETE CASCADE,
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID) ON DELETE CASCADE
);
