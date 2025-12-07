<?php
include "verify_profile.php";
session_start();
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $target_dir = "profile_pictures/";
    $file_type = strtolower(pathinfo($_FILES['profileImage']['name'], PATHINFO_EXTENSION));
    $filename = uniqid() . "." . $file_type;
    $target_file = $target_dir . $filename;
    $ok = true;
    $maxSize = 10 * 1024 * 1024;
    if ($_FILES['profileImage']['size'] > $maxSize) {
        $ok = false;
        die("The file is large");
    }

    $allowed = ['image/png', 'image/jpeg'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo,$_FILES['profileImage']['tmp_name']);
    finfo_close($finfo);
    if (!in_array($mime, $allowed)) {
        $ok = false;
        die("We can't accept tha't type of file");
    }

    if(!empty($user['photo_profile'])){
        $old_file = $target_dir . $user['photo_profile'];
        if(file_exists($old_file)){
            unlink($old_file);
        }
    }

    if ($ok) {
        if (move_uploaded_file($_FILES["profileImage"]["tmp_name"], $target_file)) {
            $add_photo = $conn->prepare("UPDATE users SET photo_profile = :pf WHERE id = :id AND token = :tk");
            $add_photo->bindValue(":pf", $filename, PDO::PARAM_STR);
            $add_photo->bindValue(":id", $id, PDO::PARAM_INT);
            $add_photo->bindValue(":tk", $tk, PDO::PARAM_STR);
            $add_photo->execute();
            $_SESSION['flash'][] = [
                'type' => 'success',
                'message' => 'Profile picture updated successfully'
            ];
            header("Location:myprofile.php");
            exit();
        }
    } else {
        $_SESSION['flash'][] = [
            'type' => 'error',
            'message' => 'Failed to upload profile picture. Please try again.'
        ];
        header("Location:myprofile.php");
        exit();
    }
}
