-- Get Procedures
DELIMITER //
CREATE PROCEDURE GetAllDoctors()
BEGIN
    SELECT * FROM Doctors;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetDoctorByID(IN p_DoctorID INT)
BEGIN
    SELECT * FROM Doctors WHERE DoctorID = p_DoctorID;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetPatientByID(IN p_PatientID INT)
BEGIN
    SELECT * FROM Patient WHERE PatientID = p_PatientID;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetAppointmentsByDoctor(IN p_DoctorID INT)
BEGIN
    SELECT a.AppointmentID, a.DateTime, 
           p.first_name AS PatientFirstName, p.last_name AS PatientLastName 
    FROM Appointment a
    JOIN Patient p ON a.PatientID = p.PatientID
    WHERE a.DoctorID = p_DoctorID
    ORDER BY a.DateTime;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetAppointmentsByPatient(IN p_PatientID INT)
BEGIN
    SELECT a.AppointmentID, a.DateTime, 
           d.first_name AS DoctorFirstName, d.last_name AS DoctorLastName, d.Specialization
    FROM Appointment a
    JOIN Doctors d ON a.DoctorID = d.DoctorID
    WHERE a.PatientID = p_PatientID
    ORDER BY a.DateTime;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetDoctorReviews(IN p_DoctorID INT)
BEGIN
    SELECT r.ReviewID, r.Rating, r.Feedback, r.CreatedAt, 
           p.first_name AS PatientFirstName, p.last_name AS PatientLastName
    FROM Review r
    JOIN Patient p ON r.PatientID = p.PatientID
    WHERE r.DoctorID = p_DoctorID
    ORDER BY r.CreatedAt DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetTransactionsByPatient(IN p_PatientID INT)
BEGIN
    SELECT t.TransactionID, t.Amount, t.Date, t.Time, 
           d.first_name AS DoctorFirstName, d.last_name AS DoctorLastName
    FROM Transaction t
    JOIN Doctors d ON t.DoctorID = d.DoctorID
    WHERE t.PatientID = p_PatientID
    ORDER BY t.Date DESC, t.Time DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetPatientRecords(IN p_PatientID INT)
BEGIN
    SELECT RecordID, FileHash, UploadedAt
    FROM PatientInformation
    WHERE PatientID = p_PatientID
    ORDER BY UploadedAt DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetChatHistory(IN p_PatientID INT, IN p_DoctorID INT)
BEGIN
    SELECT ChatID, Timestamp, Message, AI_Response
    FROM Chat
    WHERE PatientID = p_PatientID AND DoctorID = p_DoctorID
    ORDER BY Timestamp ASC;
END //
DELIMITER ;
