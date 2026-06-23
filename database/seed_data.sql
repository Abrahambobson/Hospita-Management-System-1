-- Hospital Management System - Sample Data

-- Insert departments
INSERT INTO departments (name, description, location, phoneNumber) VALUES
('Emergency & Trauma', '24/7 Emergency care with fully equipped trauma center', 'Ground Floor', '555-0101'),
('Cardiology', 'Heart and cardiovascular disease treatment', 'First Floor', '555-0102'),
('Neurology', 'Brain and nervous system disorders', 'Second Floor', '555-0103'),
('Pediatrics', 'Specialized care for children', 'Third Floor', '555-0104'),
('Orthopedics', 'Bone, joint, and muscle care', 'Fourth Floor', '555-0105'),
('General Medicine', 'Internal medicine and general treatment', 'First Floor', '555-0106'),
('Obstetrics & Gynecology', 'Women''s health and childbirth', 'Second Floor', '555-0107'),
('Dentistry', 'Dental care and procedures', 'Third Floor', '555-0108'),
('Ophthalmology', 'Eye care and vision services', 'Fourth Floor', '555-0109'),
('Psychiatry', 'Mental health and behavioral medicine', 'Fifth Floor', '555-0110');

-- Insert admin user
INSERT INTO users (firstName, lastName, email, passwordHash, phone, role)
VALUES ('Admin', 'User', 'admin@example.com', '$2y$10$YIjlrBgqV/hvTB7.K0H9v.WqJKzXP0J5xU9dQ8zZvW1iBK6vXBJ2u', '555-0001', 'admin');

-- Insert sample doctors
INSERT INTO users (firstName, lastName, email, passwordHash, phone, dateOfBirth, gender, role) VALUES
('Dr. John', 'Cardiologist', 'john.cardio@example.com', '$2y$10$YIjlrBgqV/hvTB7.K0H9v.WqJKzXP0J5xU9dQ8zZvW1iBK6vXBJ2u', '555-0201', '1970-01-15', 'male', 'doctor'),
('Dr. Sarah', 'Neurologist', 'sarah.neuro@example.com', '$2y$10$YIjlrBgqV/hvTB7.K0H9v.WqJKzXP0J5xU9dQ8zZvW1iBK6vXBJ2u', '555-0202', '1975-03-20', 'female', 'doctor'),
('Dr. Michael', 'Pediatrician', 'michael.pedia@example.com', '$2y$10$YIjlrBgqV/hvTB7.K0H9v.WqJKzXP0J5xU9dQ8zZvW1iBK6vXBJ2u', '555-0203', '1972-06-10', 'male', 'doctor'),
('Dr. Emily', 'Orthopedic', 'emily.ortho@example.com', '$2y$10$YIjlrBgqV/hvTB7.K0H9v.WqJKzXP0J5xU9dQ8zZvW1iBK6vXBJ2u', '555-0204', '1978-09-05', 'female', 'doctor'),
('Dr. Robert', 'General Medicine', 'robert.general@example.com', '$2y$10$YIjlrBgqV/hvTB7.K0H9v.WqJKzXP0J5xU9dQ8zZvW1iBK6vXBJ2u', '555-0205', '1968-11-12', 'male', 'doctor');

-- Insert doctors table entries
INSERT INTO doctors (userId, doctorNumber, departmentId, specialization, qualification, licenseNumber, yearsOfExperience, consultationFee, startTime, endTime, availableDays) VALUES
(2, 'DOC001', 2, 'Cardiology', 'MD Cardiology', 'LIC001', 15, 150.00, '09:00:00', '17:00:00', 'Mon,Tue,Wed,Thu,Fri'),
(3, 'DOC002', 3, 'Neurology', 'MD Neurology', 'LIC002', 12, 125.00, '10:00:00', '18:00:00', 'Mon,Wed,Thu,Fri,Sat'),
(4, 'DOC003', 4, 'Pediatrics', 'MD Pediatrics', 'LIC003', 10, 100.00, '08:00:00', '16:00:00', 'Mon,Tue,Wed,Thu,Fri'),
(5, 'DOC004', 5, 'Orthopedics', 'MD Orthopedics', 'LIC004', 18, 160.00, '09:00:00', '17:00:00', 'Tue,Wed,Thu,Fri,Sat'),
(6, 'DOC005', 6, 'General Medicine', 'MD Medicine', 'LIC005', 20, 80.00, '08:00:00', '19:00:00', 'Mon,Tue,Wed,Thu,Fri');

-- Insert sample patients
INSERT INTO users (firstName, lastName, email, passwordHash, phone, dateOfBirth, gender, role) VALUES
('John', 'Smith', 'patient@example.com', '$2y$10$YIjlrBgqV/hvTB7.K0H9v.WqJKzXP0J5xU9dQ8zZvW1iBK6vXBJ2u', '555-0301', '1990-05-15', 'male', 'patient'),
('Jane', 'Doe', 'jane.doe@example.com', '$2y$10$YIjlrBgqV/hvTB7.K0H9v.WqJKzXP0J5xU9dQ8zZvW1iBK6vXBJ2u', '555-0302', '1992-08-22', 'female', 'patient'),
('Michael', 'Johnson', 'michael.j@example.com', '$2y$10$YIjlrBgqV/hvTB7.K0H9v.WqJKzXP0J5xU9dQ8zZvW1iBK6vXBJ2u', '555-0303', '1988-02-10', 'male', 'patient'),
('Sarah', 'Williams', 'sarah.w@example.com', '$2y$10$YIjlrBgqV/hvTB7.K0H9v.WqJKzXP0J5xU9dQ8zZvW1iBK6vXBJ2u', '555-0304', '1995-11-30', 'female', 'patient');

-- Insert patient records
INSERT INTO patients (userId, patientNumber, bloodType, allergies, medicalHistory) VALUES
(7, 'PAT20240001', 'O+', 'Penicillin', 'Hypertension, Diabetes'),
(8, 'PAT20240002', 'A+', 'None', 'Asthma'),
(9, 'PAT20240003', 'B+', 'Shellfish', 'Healthy'),
(10, 'PAT20240004', 'O-', 'Aspirin', 'Thyroid issues');

-- Insert emergency contacts
INSERT INTO emergency_contacts (patientId, contactName, contactPhone, contactRelation, isPrimary) VALUES
(1, 'Mary Smith', '555-0401', 'Spouse', TRUE),
(2, 'Robert Doe', '555-0402', 'Father', TRUE),
(3, 'Emily Johnson', '555-0403', 'Sister', TRUE),
(4, 'James Williams', '555-0404', 'Brother', TRUE);

-- Insert subscription plans
INSERT INTO subscription_plans (planName, description, monthlyPrice, yearlyPrice, features, maxAppointments, supportLevel) VALUES
('Basic', 'Essential healthcare features', 9.99, 99.99, 'Appointment booking, Basic health records', 12, 'Email'),
('Premium', 'Advanced healthcare features', 19.99, 199.99, 'Unlimited appointments, Full health records, Priority support', 999, 'Phone & Email'),
('Elite', 'Comprehensive healthcare features', 49.99, 499.99, 'All Premium features, Telehealth consultations, Dedicated support', 999, '24/7 Support');

-- Insert health tips
INSERT INTO health_tips (title, content, category, authorId) VALUES
('Stay Hydrated', 'Drink at least 8 glasses of water daily to maintain proper hydration and body functions.', 'Wellness', 1),
('Exercise Regularly', 'Aim for 150 minutes of moderate-intensity aerobic activity per week.', 'Fitness', 1),
('Balanced Diet', 'Include fruits, vegetables, whole grains, and lean proteins in your diet.', 'Nutrition', 1),
('Get Adequate Sleep', 'Most adults need 7-9 hours of quality sleep per night for optimal health.', 'Sleep', 1),
('Manage Stress', 'Practice meditation, yoga, or deep breathing to reduce stress levels.', 'Mental Health', 1);

-- Insert inventory
INSERT INTO inventory (itemName, itemCategory, quantity, minQuantity, maxQuantity, unitPrice, supplier, lastRestockDate, expiryDate) VALUES
('Bandages (Box)', 'Medical Supplies', 500, 50, 1000, 15.00, 'Medical Suppliers Inc', '2024-01-10', '2026-01-10'),
('Syringes (Box)', 'Medical Supplies', 1000, 200, 2000, 25.00, 'Medical Suppliers Inc', '2024-01-10', '2026-01-10'),
('Gloves (Nitrile)', 'PPE', 2000, 500, 5000, 8.00, 'Safety Supplies Co', '2024-01-10', '2025-01-10'),
('N95 Masks', 'PPE', 1500, 200, 3000, 5.00, 'Safety Supplies Co', '2024-01-10', '2025-06-10'),
('IV Fluids', 'Medications', 300, 50, 500, 12.00, 'Pharma Solutions', '2024-01-10', '2025-12-31');

-- Note: Password hash is for 'password123'
-- Use bcrypt hash: $2y$10$YIjlrBgqV/hvTB7.K0H9v.WqJKzXP0J5xU9dQ8zZvW1iBK6vXBJ2u
