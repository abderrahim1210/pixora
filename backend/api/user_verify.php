<?php
include "db.php";
if (isset($_COOKIE['px_user_token'])) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE token = :tk LIMIT 1");
    $stmt->bindValue(":tk", $_COOKIE['px_user_token']);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        $_SESSION['px_name'] = $user['username'];
        $_SESSION['px_email'] = $user['email'];
        $_SESSION['px_id'] = $user['id'];
        $_SESSION['px_bio'] = $user['bio'];
        $_SESSION['px_datetime'] = $user['created_at'];
    }else{
        setcookie('px_user_token','',time() - 3600,'/','',false,true);
    }
}
