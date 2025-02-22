-- Stored Procedures
DELIMITER //
CREATE PROCEDURE AddDoctor(
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_DoctorImage VARCHAR(255),
    IN p_Specialization VARCHAR(100),
    IN p_Certificate VARCHAR(255),
    IN p_Bio TEXT,
    IN p_Age INT
)
BEGIN
    INSERT INTO Doctors (first_name, last_name, DoctorImage, Specialization, Certificate, Bio, Age)
    VALUES (p_first_name, p_last_name, p_DoctorImage, p_Specialization, p_Certificate, p_Bio, p_Age);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE AddPatient(
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_Age INT,
    IN p_Gender ENUM('Male', 'Female', 'Non-binary', 'Prefer Not to Say','Other')
)
BEGIN
    IF p_Age <= 18 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Age must be greater than 18';
    ELSE
        INSERT INTO Patient (first_name, last_name, Age, Gender)
        VALUES (p_first_name, p_last_name, p_Age, p_Gender);
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ScheduleAppointment(
    IN p_PatientID INT,
    IN p_DoctorID INT,
    IN p_DateTime DATETIME
)
BEGIN
    INSERT INTO Appointment (PatientID, DoctorID, DateTime)
    VALUES (p_PatientID, p_DoctorID, p_DateTime);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE AddReview(
    IN p_DoctorID INT,
    IN p_PatientID INT,
    IN p_Rating DECIMAL(2,1),
    IN p_Feedback TEXT
)
BEGIN
    IF p_Rating < 0 OR p_Rating > 5 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rating must be between 0 and 5';
    ELSE
        INSERT INTO Review (DoctorID, PatientID, Rating, Feedback, CreatedAt)
        VALUES (p_DoctorID, p_PatientID, p_Rating, p_Feedback, NOW());
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE AddPatientRecord(
    IN p_PatientID INT,
    IN p_FileHash VARCHAR(255)
)
BEGIN
    INSERT INTO PatientInformation (PatientID, FileHash, UploadedAt)
    VALUES (p_PatientID, p_FileHash, NOW());
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE AddTransaction(
    IN p_PatientID INT,
    IN p_DoctorID INT,
    IN p_Amount DECIMAL(10,2),
    IN p_DateTime DATETIME
)
BEGIN
    IF p_Amount <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction amount must be greater than 0';
    ELSE
        INSERT INTO Transaction (PatientID, DoctorID, Amount, DateSent)
        VALUES (p_PatientID, p_DoctorID, p_Amount, p_DateTime);
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SaveMessage(
    IN p_PatientID INT,
    IN p_Message TEXT,
    IN p_AI_Response TEXT
)
BEGIN
    INSERT INTO Chat (PatientID, Timestamp, Message, AI_Response)
    VALUES (p_PatientID, NOW(), p_Message, p_AI_Response);
END //
DELIMITER ;