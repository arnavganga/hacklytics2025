USE healthcare_db;

-- Stored Procedures

-- Drop existing procedures if they exist
DROP PROCEDURE IF EXISTS AddDoctor;
DROP PROCEDURE IF EXISTS AddPatient;
DROP PROCEDURE IF EXISTS ScheduleAppointment;
DROP PROCEDURE IF EXISTS AddReview;
DROP PROCEDURE IF EXISTS AddPatientRecord;
DROP PROCEDURE IF EXISTS AddTransaction;
DROP PROCEDURE IF EXISTS SaveMessage;

-- AddDoctor Procedure
DELIMITER //
CREATE PROCEDURE AddDoctor(
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_Email VARCHAR(255),
    IN p_Specialization VARCHAR(100),
    IN p_Bio TEXT,
    IN p_Age INT
)
BEGIN
    INSERT INTO User (Email, first_name, last_name, Age, user_type)
    VALUES (p_Email, p_first_name, p_last_name, p_Age, 'doctor');
    
    INSERT INTO Doctors (Email, Specialization, Bio)
    VALUES (p_Email, p_Specialization, p_Bio);
END //
DELIMITER ;

-- AddPatient Procedure
DELIMITER //
CREATE PROCEDURE AddPatient(
    IN p_Email VARCHAR(255),
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_age INT,
    IN p_gender ENUM('Male', 'Female', 'Non-binary', 'Prefer Not to Say', 'Other')
)
BEGIN
    IF p_Age <= 18 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Age must be greater than 18';
    ELSE
        INSERT INTO User (Email, first_name, last_name, Age, user_type)
        VALUES (p_Email, p_first_name, p_last_name, p_Age, 'patient');
        
        INSERT INTO Patient (Email, Gender)
        VALUES (p_Email, p_Gender);
    END IF;
END //
DELIMITER ;

-- ScheduleAppointment Procedure
DELIMITER //
CREATE PROCEDURE ScheduleAppointment(
    IN p_PatientEmail VARCHAR(255),
    IN p_DoctorEmail VARCHAR(255),
    IN p_DateTime DATETIME,
    IN p_MeetingLink VARCHAR(255),
    IN p_Summary TEXT
)
BEGIN
    INSERT INTO Appointment (PatientEmail, DoctorEmail, DateBooked, MeetingLink, Summary)
    VALUES (p_PatientEmail, p_DoctorEmail, p_DateTime, p_MeetingLink, p_Summary);
END //
DELIMITER ;

-- AddReview Procedure
DELIMITER //
CREATE PROCEDURE AddReview(
    IN p_DoctorEmail VARCHAR(255),
    IN p_PatientEmail VARCHAR(255),
    IN p_Rating DECIMAL(2,1),
    IN p_Feedback TEXT
)
BEGIN
    IF p_Rating < 0 OR p_Rating > 5 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rating must be between 0 and 5';
    ELSE
        INSERT INTO Review (DoctorEmail, PatientEmail, Rating, Feedback, CreatedAt)
        VALUES (p_DoctorEmail, p_PatientEmail, p_Rating, p_Feedback, NOW());
    END IF;
END //
DELIMITER ;

-- AddTransaction Procedure
DELIMITER //
CREATE PROCEDURE AddTransaction(
    IN p_PatientEmail VARCHAR(255),
    IN p_DoctorEmail VARCHAR(255),
    IN p_Amount DECIMAL(10,2),
    IN p_DateTime DATETIME
)
BEGIN
    IF p_Amount <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction amount must be greater than 0';
    ELSE
        INSERT INTO Transaction (PatientEmail, DoctorEmail, Amount, DateSent)
        VALUES (p_PatientEmail, p_DoctorEmail, p_Amount, p_DateTime);
    END IF;
END //
DELIMITER ;

-- SaveMessage Procedure
DELIMITER //
CREATE PROCEDURE SaveMessage(
    IN p_PatientEmail VARCHAR(255),
    IN p_DoctorEmail VARCHAR(255),
    IN p_Message TEXT,
    IN p_AI_Response TEXT
)
BEGIN
    INSERT INTO Chat (PatientEmail, DoctorEmail, TextedAt, Message, AI_Response)
    VALUES (p_PatientEmail, p_DoctorEmail, NOW(), p_Message, p_AI_Response);
END //
DELIMITER ;