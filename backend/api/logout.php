<?php
session_start();
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
    $_SESSION['logoutmess'] = "You are logged out from Pixora";
    header("Location:login.php");
    exit();
}
?>