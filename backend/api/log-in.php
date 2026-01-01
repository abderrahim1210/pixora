<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/../api/fn.php";
session_start();
$isValid = true;
$emailPattern = "/^[a-zA-Z0-9]+@(gmail\.com|yahoo\.com|hotmail\.com|[a-zA-Z]\.(ma|org|com))$/";
$passPattern = "/^(?=.*[A-Za-z0-9])(?=.*\d)(?=.*[&@]).{8,}$/";
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
/*if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if (empty($email) || empty($pass)) {
        $_SESSION['logerr'] = "Type email and password please";
        $isValid = false;
    } else {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $_SESSION['logerr'] = "Invalid email format";
            $isValid = false;
        } else if (!preg_match($emailPattern, $email)) {
            $_SESSION['logerr'] = "Invalid email pattern";
            $isValid = false;
        } else if (!preg_match($passPattern, $pass)) {
            $_SESSION['logerr'] = "Invalid password format";
            $isValid = false;
        } else {
            $isValid = true;
        }
    }
    if ($isValid) {
        $log = $conn->prepare("SELECT * FROM users WHERE email = :useremail");
        $log->bindValue(":useremail", $email);
        $log->execute();
        $user = $log->fetch();

        if ($user) {
            if (password_verify($pass, $user['password_hash'])) {
                $token = bin2hex(random_bytes(32));
                $stmt = $conn -> prepare("UPDATE users set token = :tk WHERE id = :id");
                $stmt -> bindValue(":tk",$token,PDO::PARAM_STR);
                $stmt -> bindValue(":id",$user['id'],PDO::PARAM_INT);
                $stmt -> execute();
                $_SESSION['px_name'] = $user['username'];
                $_SESSION['px_email'] = $user['email'];
                $_SESSION['px_id'] = $user['id'];
                $_SESSION['px_bio'] = $user['bio'];
                $_SESSION['px_datetime'] = $user['created_at'];
                setcookie("px_user_token",$token,time() + (86400 * 30),'/','',false,true);
                header("Location:pixora.php");
                exit();
            } else {
                $_SESSION['logerr'] = "Wrong password";
            }
        }else{
            $_SESSION['logerr'] = "Email not found";
        }
    }
}
 */
$log = $conn->prepare("SELECT * FROM users WHERE email = :useremail");
$log->bindValue(":useremail", $email);
$log->execute();
$user = $log->fetch();
if ($user) {
    if (password_verify($password, $user['password_hash'])) {
        $token = bin2hex(random_bytes(32));
        $stmt = $conn->prepare("UPDATE users set token = :tk WHERE id = :id");
        $stmt->bindValue(":tk", $token, PDO::PARAM_STR);
        $stmt->bindValue(":id", $user['id'], PDO::PARAM_INT);
        $stmt->execute();
        $_SESSION['px_name'] = $user['username'];
        $_SESSION['px_email'] = $user['email'];
        $_SESSION['px_id'] = $user['id'];
        $_SESSION['px_bio'] = $user['bio'];
        $_SESSION['px_datetime'] = $user['created_at'];
        $_SESSION['px_profile_picture'] = $user['photo_profile'];
        $_SESSION['px_cover_image'] = $user['cover_image'];
        setcookie("px_user_token", $token, time() + (86400 * 30), '/', '', false, true);
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'name' => $user['username'],
                'email' => $user['email'],
                'bio' => $user['bio'],
                'created_at' => $user['created_at']
            ]
        ]);
        exit();
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Wrong password'
        ]);
        exit();
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Email not found'
    ]);
    exit();
}
