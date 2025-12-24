<?php
    session_start();
    $_SESSION['flash'] = [];
    if((!isset($_SESSION['px_id']) || !is_numeric($_SESSION['px_id'])) && (isset($_COOKIE['px_userid']))){
        $_SESSION['flash'][] = [
            'type' => 'error',
            'message' => 'You have to logged first for start cookies.'
        ];
        header("Location:login.php");
        exit();
    }else{
        $id = "px_userid";
        $id_value = intval($_SESSION['px_id']);
        $username = "px_username";
        $username_value = $_SESSION['px_name'];
        $email = "px_useremail";
        $email_value = $_SESSION['px_email'];
        $bio = "px_bio";
        $bio_value = $_SESSION['px_bio'];
        $date = "px_created_at";
        $date_value = $_SESSION['px_datetime'];
        setcookie($id,$id_value,time() + (86400 * 30),'/');
        setcookie($username,$username_value,time() + (86400 * 30),'/');
        setcookie($email,$email_value,time() + (86400 * 30),'/');
        setcookie($bio,$bio_value,time() + (86400 * 30),'/');
        setcookie($date,$date_value,time() + (86400 * 30),'/');
        $_SESSION['flash'][] = [
            'type' => 'success',
            'message' => 'You are accept the cookies of Pixora website.'
        ];
        header("Location:pixora.php");
        exit();
    }
?>