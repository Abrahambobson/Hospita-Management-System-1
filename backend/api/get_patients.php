<?php
/**
 * Get Patients API Endpoint
 * Hospital Management System
 */

require_once '../config.php';

header('Content-Type: application/json');

// Verify token
$token = null;
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $parts = explode(' ', $_SERVER['HTTP_AUTHORIZATION']);
    if (count($parts) === 2 && $parts[0] === 'Bearer') {
        $token = validateToken($parts[1]);
    }
}

if (!$token) {
    sendResponse(['success' => false, 'message' => 'Unauthorized'], 401);
}

try {
    $limit = $_GET['limit'] ?? 10;
    $offset = $_GET['offset'] ?? 0;
    $search = $_GET['search'] ?? '';
    
    $sql = "SELECT u.id, u.firstName, u.lastName, u.email, u.phone, 
                   p.patientNumber, p.bloodType
            FROM users u
            JOIN patients p ON u.id = p.userId
            WHERE u.isActive = TRUE";
    
    if (!empty($search)) {
        $sql .= " AND (u.firstName LIKE ? OR u.lastName LIKE ? OR u.email LIKE ?)";
    }
    
    $sql .= " ORDER BY u.createdAt DESC LIMIT ? OFFSET ?";
    
    $stmt = $conn->prepare($sql);
    
    if (!empty($search)) {
        $searchTerm = '%' . $search . '%';
        $stmt->bind_param('sssii', $searchTerm, $searchTerm, $searchTerm, $limit, $offset);
    } else {
        $stmt->bind_param('ii', $limit, $offset);
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    
    $patients = [];
    while ($row = $result->fetch_assoc()) {
        $patients[] = $row;
    }
    
    sendResponse([
        'success' => true,
        'patients' => $patients,
        'count' => count($patients)
    ]);
    
} catch (Exception $e) {
    sendResponse(['success' => false, 'message' => 'Server error: ' . $e->getMessage()], 500);
}
