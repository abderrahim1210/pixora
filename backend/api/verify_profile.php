<?php
include "db.php";
session_start();
$_SESSION['addProfilePicture'] = [];
$id = $_SESSION['px_id'];
$tk = $_COOKIE['px_user_token'];
$check = $conn->prepare("SELECT * FROM users WHERE id = :id AND token = :tk");
$check->bindValue(":id", $id, PDO::PARAM_INT);
$check->bindValue(":tk", $tk, PDO::PARAM_STR);
$check->execute();

if (!$id || !$tk) {
    die("Missing credentials");
}

if ($check->rowCount() === 0) {
    die("You have not a permission for add a profile picture for this profile");
}
$user = $check->fetch(PDO::FETCH_ASSOC);
if (!$user) {
    die("User not found");
}
?>