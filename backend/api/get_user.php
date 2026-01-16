<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
if (isset($_SESSION['px_id'])) {
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $_SESSION['px_id'],
            'name' => $_SESSION['px_name'],
            'email' => $_SESSION['px_email'],
            'created_at' => $_SESSION['px_datetime'],
            'username' => $_SESSION['px_name'],
            'profile_picture' => $_SESSION['px_profile_picture'],
            'cover_picture' => $_SESSION['px_cover_image']
        ]
    ]);
}else{
    //http_response_code(401);
    echo json_encode(['success' => false,'message' => 'Not logged in']);
}
