<?php
include "verify_profile.php";
session_start();
$coverFile = $user['cover_image'];
$file = basename($coverFile);
$path = "cover_images/" . $file;
if (!empty($user['cover_image'])) {
    if (file_exists($path)) {
        unlink($path);
    }
}

if ($user) {
    $del = $conn->prepare("UPDATE users SET cover_image = NULL WHERE id = :id AND token = :tk");
    $del->bindValue(":id", $id, PDO::PARAM_INT);
    $del->bindValue(":tk", $tk, PDO::PARAM_STR);
    $del->execute();
    $_SESSION['flash'][] = [
        'type' => 'success',
        'message' => 'Cover picture deleted successfully'
    ];
    header("Location:myprofile.php");
    exit();
}else{
    $_SESSION['flash'][] = [
        'type' => 'error',
        'message' => 'Cover picture failed to delete'
    ];
    header("Location:myphotos.php");
    exit();
}
