<?php
include "verify_profile.php";

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $target_dir = "cover_images/";
    $file_type = strtolower(pathinfo($_FILES['coverFile']['name'], PATHINFO_EXTENSION));
    $filename = uniqid() . "." . $file_type;
    $target_file = $target_dir . $filename;
    $ok = true;
    $maxSize = 10 * 1024 * 1024;
    if ($_FILES['coverFile']['size'] > $maxSize) {
        $ok = false;
        $_SESSION['flash'][] = [
            'type' => 'error',
            'message' => 'The file is large'
        ];
        header("Location:myphotos.php");
        exit();
    }

    $allowed = ['image/png', 'image/jpeg'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $_FILES['coverFile']['tmp_name']);
    finfo_close($finfo);
    if (!in_array($mime, $allowed)) {
        $ok = false;
        die("We can't accept tha't type of file");
    }

    if (!empty($user['cover_image'])) {
        $old_file = $target_dir . $user['cover_image'];
        if (file_exists($old_file)) {
            unlink($old_file);
        }
    }

    if ($ok) {
        if (move_uploaded_file($_FILES["coverFile"]["tmp_name"], $target_file)) {
            $add_photo = $conn->prepare("UPDATE users SET cover_image = :ci WHERE id = :id AND token = :tk");
            $add_photo->bindValue(":ci", $filename, PDO::PARAM_STR);
            $add_photo->bindValue(":id", $id, PDO::PARAM_INT);
            $add_photo->bindValue(":tk", $tk, PDO::PARAM_STR);
            $add_photo->execute();
            $_SESSION['flash'][] = [
                'type' => 'success',
                'message' => 'Cover picture updated successfully'
            ];
            header("Location:myprofile.php");
            exit();
        }
    } else {
        $_SESSION['flash'][] = [
            'type' => 'error',
            'message' => 'Failed to upload cover picture. Please try again.'
        ];
        header("Location:myprofile.php");
        exit();
    }
}
