<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/../api/fn.php";

$data = json_decode(file_get_contents('php://input'), true);
$username = text_input($data['username']);
$email = text_input($data['email']);
$password = $data['password'];
$display_name = $data['display_name'];
$country = $data['country'];
$phone_number = $data['phone_number'];
$gender = $data['gender'];
$birth_date = $data['birth_date'];

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     http_response_code(200);
//     exit;
// }

$isValid = true;
$randomNumber = rand(100, 9999);
// if ($_SERVER['REQUEST_METHOD'] === "POST") {
// $username = text_input($_POST['name']);
// $useremail = text_input($_POST['email']);
// $userpass = $_POST['password'];

if (empty($username) || empty($email) || empty($password)) {
    $isValid = false;
    echo json_encode(['success' => false, 'message' => 'Type name , email , password please']);
    exit();
}
$emailPattern = "/^[a-zA-Z0-9]+@(gmail\.com|yahoo\.com|hotmail\.com|[a-zA-Z]\.(ma|org|com))$/";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // $_SESSION['signerr'] = "Invalid email format";
    $isValid =  false;
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit();
}
if (!preg_match($emailPattern, $email)) {
    // $_SESSION['signerr'] = "Invalid email pattern";
    $isValid = false;
    echo json_encode(['success' => false, 'message' => 'Invalid email pattern']);
    exit();
}

$passPattern = "/^(?=.*[a-zA-Z0-9])(?=.*\d)(?=.*[@&]).{8,}$/";
if (!preg_match($passPattern, $password)) {
    // $_SESSION['signerr'] = "Invalid password format";
    $isValid = false;
    echo json_encode(['success' => false, 'message' => 'Invalid password format']);
    exit();
}
$uniqueName = $username . '_' . $randomNumber;
$user = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = :username");
$user->bindValue(':username', $uniqueName);
$user->execute();
$checkUser = $user->fetchColumn();

if ($checkUser) {
    // $_SESSION['signerr'] = "User is already exist.";
    $isValid = false;
    echo json_encode(['success' => false, 'message' => 'User is already exist']);
    exit();
}

// }
if ($isValid) {
    // $_SESSION['signsucc'] = "Sauvegard Succesfully !";
    // echo json_encode(['success' => true, 'message' => 'Sauvegard Succesfully']);
    $hashedPass = password_hash($password, PASSWORD_DEFAULT);
    $appendUser = $conn->prepare("INSERT INTO users (username,email,password_hash,display_name,country,phone_number,gender,birth_date) VALUES (:username, :email, :pass,:dname,:country,:phone_number,:gender,:birth_date)");
    $appendUser->bindValue(":username", $uniqueName, PDO::PARAM_STR);
    $appendUser->bindValue(":email", $email, PDO::PARAM_STR);
    $appendUser->bindValue(":pass", $hashedPass, PDO::PARAM_STR);
    // if ($display_name) {
    $appendUser->bindValue(":dname", $display_name ?? null, PDO::PARAM_STR);
    // }
    // if ($country) {
    $appendUser->bindValue(":country", $country ?? null, PDO::PARAM_STR);
    // }
    // if ($phone_number) {
    $appendUser->bindValue(":phone_number", $phone_number ?? null, PDO::PARAM_STR);
    // }
    // if ($gender) {
    $appendUser->bindValue(":gender", $gender ?? null, PDO::PARAM_STR);
    // }
    // if ($birth_date) {
    $appendUser->bindValue(":birth_date", $birth_date ?? null, PDO::PARAM_STR);
    // }
    $appendUser->execute();
    echo json_encode(['success' => true, 'message' => 'Sauvegard Succesfully']);
    exit();
}else{
    echo json_encode(['success' => false, 'message' => 'Something is wrong']);
    exit();
}
