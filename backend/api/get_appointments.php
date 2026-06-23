<?php
/**
 * Get Appointments API Endpoint
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
    $patientId = $_GET['patientId'] ?? null;
    $doctorId = $_GET['doctorId'] ?? null;
    $status = $_GET['status'] ?? null;
    
    $sql = "SELECT a.*, 
                   CONCAT(du.firstName, ' ', du.lastName) as doctorName,
                   CONCAT(pu.firstName, ' ', pu.lastName) as patientName,
                   d.name as department
            FROM appointments a
            JOIN users du ON a.doctorId = du.id
            JOIN users pu ON a.patientId = pu.id
            JOIN departments d ON a.departmentId = d.id
            WHERE 1=1";
    
    $params = [];
    $types = '';
    
    if ($patientId) {
        $sql .= " AND a.patientId = ?";
        $params[] = $patientId;
        $types .= 'i';
    }
    
    if ($doctorId) {
        $sql .= " AND a.doctorId = ?";
        $params[] = $doctorId;
        $types .= 'i';
    }
    
    if ($status) {
        $sql .= " AND a.status = ?";
        $params[] = $status;
        $types .= 's';
    }
    
    $sql .= " ORDER BY a.appointmentDate DESC";
    
    $stmt = $conn->prepare($sql);
    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    
    $appointments = [];
    while ($row = $result->fetch_assoc()) {
        $appointments[] = $row;
    }
    
    sendResponse([
        'success' => true,
        'appointments' => $appointments,
        'count' => count($appointments)
    ]);
    
} catch (Exception $e) {
    sendResponse(['success' => false, 'message' => 'Server error: ' . $e->getMessage()], 500);
}
