<?php
/**
 * Database Configuration
 * Hospital Management System
 */

// Database configuration
define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('DB_USER', $_ENV['DB_USER'] ?? 'root');
define('DB_PASS', $_ENV['DB_PASS'] ?? '');
define('DB_NAME', $_ENV['DB_NAME'] ?? 'hospital_management');

// App configuration
define('APP_NAME', 'Hospital Management System');
define('APP_URL', $_ENV['APP_URL'] ?? 'http://localhost');
define('APP_ENV', $_ENV['APP_ENV'] ?? 'development');

// JWT configuration
define('JWT_SECRET', $_ENV['JWT_SECRET'] ?? 'your-secret-key-change-in-production');
define('JWT_ALGORITHM', 'HS256');
define('JWT_EXPIRE', 86400); // 24 hours

// CORS configuration
define('ALLOWED_ORIGINS', [
    'http://localhost',
    'http://localhost:8000',
    'http://localhost:3000'
]);

// Create database connection
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Set charset to utf8
    $conn->set_charset("utf8mb4");
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Helper function to send JSON response
function sendResponse($data, $statusCode = 200) {
    header('Content-Type: application/json');
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

// Helper function to validate JWT token
function validateToken($token) {
    try {
        $parts = explode('.', $token);
        if (count($parts) != 3) {
            return null;
        }
        
        // Decode payload
        $payload = json_decode(base64_decode($parts[1]), true);
        
        if ($payload['exp'] < time()) {
            return null;
        }
        
        return $payload;
    } catch (Exception $e) {
        return null;
    }
}

// Helper function to create JWT token
function createToken($userId, $email, $role) {
    $header = json_encode(['typ' => 'JWT', 'alg' => JWT_ALGORITHM]);
    $payload = json_encode([
        'userId' => $userId,
        'email' => $email,
        'role' => $role,
        'iat' => time(),
        'exp' => time() + JWT_EXPIRE
    ]);
    
    $header64 = base64_encode($header);
    $payload64 = base64_encode($payload);
    
    $signature = hash_hmac('sha256', "$header64.$payload64", JWT_SECRET, true);
    $signature64 = base64_encode($signature);
    
    return "$header64.$payload64.$signature64";
}

// Enable error reporting in development
if (APP_ENV === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(E_ALL & ~E_DEPRECATED);
    ini_set('display_errors', 0);
}

// CORS headers
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], ALLOWED_ORIGINS) ? $_SERVER['HTTP_ORIGIN'] : 'http://localhost'));
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
