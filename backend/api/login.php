<?php
/**
 * Login API Endpoint
 * Hospital Management System
 */

require_once '../config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['email']) || !isset($data['password'])) {
        sendResponse(['success' => false, 'message' => 'Email and password are required'], 400);
    }
    
    $email = trim($data['email']);
    $password = $data['password'];
    
    // Find user
    $sql = "SELECT id, firstName, lastName, email, passwordHash, role FROM users WHERE email = ? AND isActive = TRUE";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendResponse(['success' => false, 'message' => 'Invalid email or password'], 401);
    }
    
    $user = $result->fetch_assoc();
    
    // Verify password
    if (!password_verify($password, $user['passwordHash'])) {
        sendResponse(['success' => false, 'message' => 'Invalid email or password'], 401);
    }
    
    // Create JWT token
    $token = createToken($user['id'], $user['email'], $user['role']);
    
    sendResponse([
        'success' => true,
        'message' => 'Login successful',
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'name' => $user['firstName'] . ' ' . $user['lastName'],
            'email' => $user['email'],
            'role' => $user['role']
        ]
    ]);
    
} catch (Exception $e) {
    sendResponse(['success' => false, 'message' => 'Server error: ' . $e->getMessage()], 500);
}
