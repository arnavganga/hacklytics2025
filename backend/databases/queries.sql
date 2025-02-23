USE healthcare_db;

-- Get Procedures
DELIMITER //
CREATE PROCEDURE GetAllDoctors()
BEGIN
    SELECT * FROM Doctors
    JOIN Review ON Doctors.DoctorID = Review.DoctorID
    ORDER BY Rating, last_name, first_name;
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
CREATE PROCEDURE GetAppointmentsForDoctor(IN p_DoctorID INT)
BEGIN
    SELECT a.AppointmentID, a.DateBooked, 
           p.first_name AS PatientFirstName, p.last_name AS PatientLastName, 
    FROM Appointment a
    JOIN Patient p ON a.PatientID = p.PatientID
    WHERE a.DoctorID = p_DoctorID
    ORDER BY a.DateBooked;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetAppointmentsForPatient(IN p_PatientID INT)
BEGIN
    SELECT a.AppointmentID, a.DateBooked, 
           d.first_name AS DoctorFirstName, d.last_name AS DoctorLastName, d.Specialization
    FROM Appointment a
    JOIN Doctors d ON a.DoctorID = d.DoctorID
    WHERE a.PatientID = p_PatientID
    ORDER BY a.DateBooked;
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
CREATE PROCEDURE GetTransactionsForPatient(IN p_PatientID INT)
BEGIN
    SELECT t.TransactionID, t.Amount, t.DateSent, 
           d.first_name AS DoctorFirstName, d.last_name AS DoctorLastName
    FROM Transaction t
    JOIN Doctors d ON t.DoctorID = d.DoctorID
    WHERE t.PatientID = p_PatientID
    ORDER BY t.DateSent DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetPaymentsForDoctor(IN p_DoctorID INT)
BEGIN
    SELECT t.TransactionID, t.Amount, t.DateSent, 
           p.first_name AS PatientFirstName, p.last_name AS PatientLastName
    FROM Transaction t
    JOIN Patient p ON p.PatientID = t.PatientID
    WHERE t.DoctorID = p_DoctorID
    ORDER BY t.DateSent DESC;
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
    SELECT ChatID, TextedAt, Message, AI_Response
    FROM Chat
    WHERE PatientID = p_PatientID AND DoctorID = p_DoctorID
    ORDER BY TextedAt ASC;
END //
DELIMITER ;
