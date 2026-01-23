<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
$input = json_decode(file_get_contents('php://input'),true);
$done = $input['done'] ?? false;
if ($done){
    if (isset($_SESSION['px_id']) || isset($_COOKIE['px_userid'])) {
        session_unset();
        session_destroy();
        setcookie('px_username','',time() - 3600,'/');
        setcookie('px_useremail','',time() - 3600,'/');
        setcookie('px_userid','',time() - 3600,'/');
        setcookie('px_bio','',time() - 3600,'/');
        setcookie('px_created_at','',time() - 3600,'/');
        setcookie('px_user_token','',time() - 3600,'/');
        session_start();
        echo json_encode(['success' => true,'message' => 'You are logout']);
        exit;
        // $_SESSION['logoutmess'] = "You are logged out from Pixora";
    }
}
?>