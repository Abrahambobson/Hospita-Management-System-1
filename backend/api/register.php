<?php
/**
 * Register API Endpoint
 * Hospital Management System
 */

require_once '../config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $required = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
    foreach ($required as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            sendResponse(['success' => false, 'message' => ucfirst($field) . ' is required'], 400);
        }
    }
    
    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        sendResponse(['success' => false, 'message' => 'Invalid email format'], 400);
    }
    
    // Validate password match
    if ($data['password'] !== $data['confirmPassword']) {
        sendResponse(['success' => false, 'message' => 'Passwords do not match'], 400);
    }
    
    // Validate password strength
    if (strlen($data['password']) < 8) {
        sendResponse(['success' => false, 'message' => 'Password must be at least 8 characters'], 400);
    }
    
    // Check if email already exists
    $sql = "SELECT id FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $data['email']);
    $stmt->execute();
    
    if ($stmt->get_result()->num_rows > 0) {
        sendResponse(['success' => false, 'message' => 'Email already registered'], 400);
    }
    
    // Hash password
    $passwordHash = password_hash($data['password'], PASSWORD_BCRYPT);
    
    // Insert user
    $sql = "INSERT INTO users (firstName, lastName, email, passwordHash, phone, dateOfBirth, gender, address, role)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'patient')";
    $stmt = $conn->prepare($sql);
    
    // Assign nullable values to variables (required for bind_param)
    $phone = $data['phone'] ?? null;
    $dateOfBirth = $data['dateOfBirth'] ?? null;
    $gender = $data['gender'] ?? null;
    $address = $data['address'] ?? null;
    
    $stmt->bind_param(
        'ssssssss',
        $data['firstName'],
        $data['lastName'],
        $data['email'],
        $passwordHash,
        $phone,
        $dateOfBirth,
        $gender,
        $address
    );
    
    if (!$stmt->execute()) {
        throw new Exception('Failed to create user');
    }
    
    $userId = $conn->insert_id;
    
    // Generate patient number
    $patientNumber = 'PAT' . date('Y') . str_pad($userId, 6, '0', STR_PAD_LEFT);
    
    // Create patient record
    $sql = "INSERT INTO patients (userId, patientNumber) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $userId, $patientNumber);
    $stmt->execute();
    
    sendResponse([
        'success' => true,
        'message' => 'Registration successful',
        'userId' => $userId
    ]);
    
} catch (Exception $e) {
    sendResponse(['success' => false, 'message' => 'Server error: ' . $e->getMessage()], 500);
}
