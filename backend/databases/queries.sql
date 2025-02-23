USE healthcare_db;

-- Get all doctors with their reviews
DELIMITER //
CREATE PROCEDURE GetAllDoctors()
BEGIN
    SELECT d.first_name, d.last_name, r.Rating, r.Feedback
    FROM Doctors d
    LEFT JOIN Review r ON d.Email = r.DoctorEmail
    ORDER BY r.Rating DESC;
END //
DELIMITER ;

-- Get doctor by email
DELIMITER //
CREATE PROCEDURE GetDoctorByEmail(IN p_DoctorEmail VARCHAR(255))
BEGIN
    SELECT * FROM Doctors WHERE Email = p_DoctorEmail;
END //
DELIMITER ;

-- Get patient by email
DELIMITER //
CREATE PROCEDURE GetPatientByEmail(IN p_PatientEmail VARCHAR(255))
BEGIN
    SELECT * FROM Patient WHERE Email = p_PatientEmail;
END //
DELIMITER ;

-- Get appointments for a doctor
DELIMITER //
CREATE PROCEDURE GetAppointmentsForDoctor(IN p_DoctorEmail VARCHAR(255))
BEGIN
    SELECT a.AppointmentID, a.DateBooked, 
           p.first_name AS PatientFirstName, p.last_name AS PatientLastName 
    FROM Appointment a
    JOIN User p ON a.PatientEmail = p.Email
    WHERE a.DoctorEmail = p_DoctorEmail
    ORDER BY a.DateBooked;
END //
DELIMITER ;

-- Get appointments for a patient
DELIMITER //
CREATE PROCEDURE GetAppointmentsForPatient(IN p_PatientEmail VARCHAR(255))
BEGIN
    SELECT a.AppointmentID, a.DateBooked, 
           d.first_name AS DoctorFirstName, d.last_name AS DoctorLastName, d.Specialization
    FROM Appointment a
    JOIN Doctors d ON a.DoctorEmail = d.Email
    WHERE a.PatientEmail = p_PatientEmail
    ORDER BY a.DateBooked;
END //
DELIMITER ;

-- Get doctor reviews
DELIMITER //
CREATE PROCEDURE GetDoctorReviews(IN p_DoctorEmail VARCHAR(255))
BEGIN
    SELECT r.ReviewID, r.Rating, r.Feedback, r.CreatedAt, 
           p.first_name AS PatientFirstName, p.last_name AS PatientLastName
    FROM Review r
    JOIN User p ON r.PatientEmail = p.Email
    WHERE r.DoctorEmail = p_DoctorEmail
    ORDER BY r.CreatedAt DESC;
END //
DELIMITER ;

-- Get transactions for a patient
DELIMITER //
CREATE PROCEDURE GetTransactionsForPatient(IN p_PatientEmail VARCHAR(255))
BEGIN
    SELECT t.TransactionID, t.Amount, t.DateSent, 
           d.first_name AS DoctorFirstName, d.last_name AS DoctorLastName
    FROM Transaction t
    JOIN Doctors d ON t.DoctorEmail = d.Email
    WHERE t.PatientEmail = p_PatientEmail
    ORDER BY t.DateSent DESC;
END //
DELIMITER ;

-- Get chat history
DELIMITER //
CREATE PROCEDURE GetChatHistory(IN p_PatientEmail VARCHAR(255), IN p_DoctorEmail VARCHAR(255))
BEGIN
    SELECT ChatID, TextedAt, Message, AI_Response
    FROM Chat
    WHERE PatientEmail = p_PatientEmail AND DoctorEmail = p_DoctorEmail
    ORDER BY TextedAt ASC;
END //
DELIMITER ;