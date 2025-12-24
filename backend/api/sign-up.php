<?php
include "db.php";
include "fn.php";
session_start();
$isValid = false;
$randomNumber = rand(100,9999);
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $username = text_input($_POST['name']);
    $useremail = text_input($_POST['email']);
    $userpass = $_POST['password'];
    if (empty($username) || empty($useremail) || empty($userpass)) {
        $_SESSION['signerr'] = "Type name , email , password please.";
        $isValid = false;
    } else {
        $emailPattern = "/^[a-zA-Z0-9]+@(gmail\.com|yahoo\.com|hotmail\.com|[a-zA-Z]\.(ma|org|com))$/";
        if(!filter_var($useremail,FILTER_VALIDATE_EMAIL)){
            $_SESSION['signerr'] = "Invalid email format";
            $isValid = false;
        }else{
            if(!preg_match($emailPattern,$useremail)){
                $_SESSION['signerr'] = "Invalid email pattern";
                $isValid = false;
            }
        }
        $passPattern = "/^(?=.*[a-zA-Z0-9])(?=.*\d)(?=.*[@&]).{8,}$/";
        if(!preg_match($passPattern,$userpass)){
            $_SESSION['signerr'] = "Invalid password format";
            $isValid = false;
        }
        $uniqueName = $username . '_' . $randomNumber;
        $user = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = :username");
        $user->bindValue(':username', $uniqueName);
        $user->execute();
        $checkUser = $user->fetchColumn();

        if ($checkUser) {
            $_SESSION['signerr'] = "User is already exist.";
            $isValid = false;
        } else {
            $isValid = true;
        }
    }
}
if ($isValid) {
    $_SESSION['signsucc'] = "Sauvegard Succesfully !";
    $hashedPass = password_hash($userpass, PASSWORD_DEFAULT);
    $appendUser = $conn->prepare("INSERT INTO users (username,email,password_hash) VALUES (:username, :useremail, :userpass)");
    $appendUser->bindValue(":username", $uniqueName);
    $appendUser->bindValue(":useremail", $useremail);
    $appendUser->bindValue(":userpass", $hashedPass);
    $appendUser->execute();
    header("Location:login.php");
    exit();
}
?>