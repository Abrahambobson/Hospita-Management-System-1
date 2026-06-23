-- Hospital Management System Database Schema

-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    dateOfBirth DATE,
    gender ENUM('male', 'female', 'other'),
    role ENUM('patient', 'doctor', 'admin', 'staff') NOT NULL DEFAULT 'patient',
    profileImage VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE
);

-- Create patients table
CREATE TABLE patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT UNIQUE NOT NULL,
    patientNumber VARCHAR(50) UNIQUE NOT NULL,
    insuranceId VARCHAR(100),
    emergencyContactName VARCHAR(100),
    emergencyContactPhone VARCHAR(20),
    bloodType VARCHAR(5),
    allergies TEXT,
    medicalHistory TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create doctors table
CREATE TABLE doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT UNIQUE NOT NULL,
    doctorNumber VARCHAR(50) UNIQUE NOT NULL,
    departmentId INT,
    specialization VARCHAR(100),
    qualification VARCHAR(255),
    licenseNumber VARCHAR(100),
    yearsOfExperience INT,
    consultationFee DECIMAL(10, 2),
    startTime TIME,
    endTime TIME,
    availableDays VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (departmentId) REFERENCES departments(id)
);

-- Create departments table
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    headId INT,
    location VARCHAR(100),
    phoneNumber VARCHAR(20),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (headId) REFERENCES doctors(id)
);

-- Create staff table
CREATE TABLE staff (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT UNIQUE NOT NULL,
    staffNumber VARCHAR(50) UNIQUE NOT NULL,
    departmentId INT,
    position VARCHAR(100),
    designation VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (departmentId) REFERENCES departments(id)
);

-- Create health_records table
CREATE TABLE health_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patientId INT NOT NULL,
    doctorId INT,
    recordType VARCHAR(100),
    testType VARCHAR(100),
    testDate DATE NOT NULL,
    testResults TEXT,
    diagnosis TEXT,
    prescription TEXT,
    notes TEXT,
    status ENUM('pending', 'completed', 'reviewed') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctorId) REFERENCES doctors(id)
);

-- Create patient_history table
CREATE TABLE patient_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patientId INT NOT NULL,
    eventType VARCHAR(100),
    eventDescription TEXT,
    eventDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    relatedRecordId INT,
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);

-- Create appointments table
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patientId INT NOT NULL,
    doctorId INT NOT NULL,
    departmentId INT,
    appointmentDate DATETIME NOT NULL,
    duration INT DEFAULT 30,
    status ENUM('scheduled', 'completed', 'cancelled', 'no-show') DEFAULT 'scheduled',
    notes TEXT,
    consultationType ENUM('in-person', 'telemedicine') DEFAULT 'in-person',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_appointment (patientId, doctorId, appointmentDate),
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctorId) REFERENCES doctors(id),
    FOREIGN KEY (departmentId) REFERENCES departments(id)
);

-- Create emergency_contacts table
CREATE TABLE emergency_contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patientId INT NOT NULL,
    contactName VARCHAR(100) NOT NULL,
    contactPhone VARCHAR(20) NOT NULL,
    contactRelation VARCHAR(50),
    isPrimary BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);

-- Create inventory table
CREATE TABLE inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    itemName VARCHAR(150) NOT NULL,
    itemCategory VARCHAR(100),
    quantity INT NOT NULL DEFAULT 0,
    minQuantity INT DEFAULT 10,
    maxQuantity INT,
    unitPrice DECIMAL(10, 2),
    supplier VARCHAR(150),
    lastRestockDate DATE,
    expiryDate DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create inventory_logs table
CREATE TABLE inventory_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    inventoryId INT NOT NULL,
    quantityChanged INT,
    actionType ENUM('add', 'remove', 'adjust') NOT NULL,
    reason TEXT,
    recordedBy INT,
    recordedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inventoryId) REFERENCES inventory(id),
    FOREIGN KEY (recordedBy) REFERENCES users(id)
);

-- Create subscription_plans table
CREATE TABLE subscription_plans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    planName VARCHAR(100) NOT NULL,
    description TEXT,
    monthlyPrice DECIMAL(10, 2),
    yearlyPrice DECIMAL(10, 2),
    features TEXT,
    maxAppointments INT,
    supportLevel VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create subscriptions table
CREATE TABLE subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patientId INT NOT NULL,
    planId INT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE,
    status ENUM('active', 'inactive', 'expired', 'cancelled') DEFAULT 'active',
    paymentStatus ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (planId) REFERENCES subscription_plans(id)
);

-- Create notifications table
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50),
    isRead BOOLEAN DEFAULT FALSE,
    relatedEntityType VARCHAR(50),
    relatedEntityId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create health_tips table
CREATE TABLE health_tips (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    authorId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (authorId) REFERENCES users(id)
);

-- Create job_listings table
CREATE TABLE job_listings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    jobTitle VARCHAR(150) NOT NULL,
    department VARCHAR(100),
    description TEXT,
    requirements TEXT,
    experience VARCHAR(100),
    status ENUM('open', 'closed', 'filled') DEFAULT 'open',
    postedDate DATE,
    closingDate DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department) REFERENCES departments(id)
);

-- Create job_applications table
CREATE TABLE job_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    jobId INT NOT NULL,
    applicantName VARCHAR(100) NOT NULL,
    applicantEmail VARCHAR(150) NOT NULL,
    applicantPhone VARCHAR(20),
    coverLetter TEXT,
    resumePath VARCHAR(255),
    status ENUM('submitted', 'reviewed', 'interview', 'rejected', 'accepted') DEFAULT 'submitted',
    appliedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (jobId) REFERENCES job_listings(id) ON DELETE CASCADE
);

-- Create audit_logs table
CREATE TABLE audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    action VARCHAR(200) NOT NULL,
    entityType VARCHAR(50),
    entityId INT,
    changes JSON,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_patients_userId ON patients(userId);
CREATE INDEX idx_doctors_departmentId ON doctors(departmentId);
CREATE INDEX idx_staff_departmentId ON staff(departmentId);
CREATE INDEX idx_healthrecords_patientId ON health_records(patientId);
CREATE INDEX idx_healthrecords_doctorId ON health_records(doctorId);
CREATE INDEX idx_appointments_patientId ON appointments(patientId);
CREATE INDEX idx_appointments_doctorId ON appointments(doctorId);
CREATE INDEX idx_appointments_date ON appointments(appointmentDate);
CREATE INDEX idx_emergency_patientId ON emergency_contacts(patientId);
CREATE INDEX idx_subscriptions_patientId ON subscriptions(patientId);
CREATE INDEX idx_notifications_userId ON notifications(userId);
CREATE INDEX idx_notifications_isRead ON notifications(isRead);
