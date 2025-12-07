<?php
include "verify_profile.php";
session_start();
$f = $user['photo_profile'];
$file = basename($f);
$path = "profile_pictures/" . $file;
if (!empty($user['photo_profile'])) {
    if (file_exists($path)) {
        unlink($path);
    }
}

if ($user) {
    $del = $conn->prepare("UPDATE users SET photo_profile = NULL WHERE id = :id AND token = :tk");
    $del->bindValue(":id", $id, PDO::PARAM_INT);
    $del->bindValue(":tk", $tk, PDO::PARAM_STR);
    $del->execute();
    $_SESSION['flash'][] = [
        'type' => 'success',
        'message' => 'Profile picture deleted successfully'
    ];
    header("Location:myprofile.php");
    exit();
} else {
    $_SESSION['flash'][] = [
        'type' => 'error',
        'message' => 'Profile picture failed to delete'
    ];
    header("Location:myphotos.php");
    exit();
}
