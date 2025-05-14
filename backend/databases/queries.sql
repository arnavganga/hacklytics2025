USE healthcare_db;

-- Drop existing procedures if they exist
DROP PROCEDURE IF EXISTS GetAllDoctors;
DROP PROCEDURE IF EXISTS GetDoctorByEmail;
DROP PROCEDURE IF EXISTS GetPatientByEmail;
DROP PROCEDURE IF EXISTS GetAppointmentsForDoctor;
DROP PROCEDURE IF EXISTS GetAppointmentsForPatient;
DROP PROCEDURE IF EXISTS GetDoctorReviews;
DROP PROCEDURE IF EXISTS GetTransactionsForPatient;
DROP PROCEDURE IF EXISTS GetChatHistory;

-- Get user type by email (For Authentication)
DELIMITER //
CREAT PROCEDURE GETUSER(IN p_UserEmail VARCHAR(255))
BEGIN
    Select u.user_type
    from User u
    where u.email = p_UserEmail;
END //
DELIMITER ;

-- Get all doctors with their reviews
DELIMITER //
Create PROCEDURE GetAllDoctors()
BEGIN
    Select u.first_name, u.last_name, avg(r.rating) as rating, count(r.rating) as counter, d.specialization, d.bio, u.email
    from User u
    left join review r on u.Email = r.DoctorEmail
    left join doctors d on u.email = d.email
    where u.user_type = 'doctor'
    group by u.email
    order by avg(r.rating) desc;
END //
DELIMITER ;

-- Get doctor by email
DELIMITER //
CREATE PROCEDURE GetDoctorByEmail(IN p_DoctorEmail VARCHAR(255))
BEGIN
    SELECT * 
    FROM Doctors d
    Join Users u on u.email = d.Email
    WHERE Email = p_DoctorEmail;
END //
DELIMITER ;

-- Get patient by email
DELIMITER //
CREATE PROCEDURE GetPatientByEmail(IN p_PatientEmail VARCHAR(255))
BEGIN
    SELECT * FROM Patient p
    join User u on p.Email = u.Email
    WHERE Email = p_PatientEmail;
END //
DELIMITER ;

-- Get appointments for a doctor
DELIMITER //
CREATE PROCEDURE GetAppointmentsForDoctor(IN p_DoctorEmail VARCHAR(255))
BEGIN
    SELECT a.AppointmentID, a.DateBooked, 
           p.first_name AS PatientFirstName, p.last_name AS PatientLastName, 
           p.age, a.MeetingLink as link, Patient.Gender as gender, a.summary
    FROM Appointment a
    JOIN User p ON a.PatientEmail = p.Email
    join Patient on a.PatientEmail = Patient.Email
    WHERE a.DoctorEmail = p_DoctorEmail
    ORDER BY a.DateBooked;
END //
DELIMITER ;

-- Get appointments for a patient
DELIMITER //
CREATE PROCEDURE GetAppointmentsForPatient(IN p_PatientEmail VARCHAR(255))
BEGIN
    SELECT a.AppointmentID, a.DateBooked, 
           d.first_name AS DoctorFirstName, d.last_name AS DoctorLastName, Doctors.Specialization,
           a.meetinglink as link
    FROM Appointment a
    JOIN User d ON a.DoctorEmail = d.Email
    JOIN Doctors on a.DoctorEmail = Doctors.email
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