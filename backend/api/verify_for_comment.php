<?php
include "db.php";
session_start();
$_SESSION['flash'] = [];
$user = $conn->prepare("SELECT * FROM users WHERE token = :tk");
$user->bindValue(":tk", $_COOKIE['px_user_token'], PDO::PARAM_STR);
$user->execute();
$usr = $user->fetch(PDO::FETCH_ASSOC);
$id = $usr['id'] ?? $_SESSION['px_id'] ?? $_COOKIE['px_userid'];
if (!$id || !is_numeric($id)) {
    $_SESSION['flash'][] = [
        'type' => 'error',
        'message' => 'User not found'
    ];
    header("Location:photo_preview.php?id=$photo_id");
    exit();
}
$id = intval($id);

$photo_id = $_POST['photo_id'] ?? null;
if (!$photo_id || !is_numeric($photo_id)) {
    $_SESSION['flash'][] = [
        'type' => 'error',
        'message' => 'Photo not found'
    ];
    header("Location:photo_preview.php?id=$photo_id");
    exit();
}
