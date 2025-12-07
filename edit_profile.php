<?php
include "db.php";
session_start();
$id = htmlspecialchars($_POST['user_id'], ENT_QUOTES, 'UTF-8');
if (!isset($id) || !is_numeric($id)) {
    $_SESSION['flash'][] = [
        'type' => 'error',
        'message' => 'User not found'
    ];
    header("Location:myprofile.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $check = $conn->prepare("SELECT * FROM users WHERE id = :id LIMIT 1");
    $check->bindValue(":id", $id, PDO::PARAM_INT);
    $check->execute();
    $old = $check->fetch(PDO::FETCH_ASSOC);

    if ($check->rowCount() === 0) {
        $_SESSION['flash'][] = [
            'type' => 'error',
            'message' => 'You have not a permission for edit this profile'
        ];
        header("Location:myprofile.php");
        exit();
    }

    $username = $_POST['update_name'];
    $useremail =$_POST['update_email'];
    $userphone = $_POST['update_phone'];
    //$userbirth = $_POST['update_birth'];
    $userdisplayname = $_POST['update_dname'];
    $usergender = $_POST['update_gender'];
    $userlocation = $_POST['update_location'];
    $userbio = trim($_POST['update_bio']);
    $face = trim($_POST['face_link']);
    $insta = trim($_POST['insta_link']);
    $x = trim($_POST['x_link']);
    $website = trim($_POST['website_link']);
    $editDetected = false;

    if ($username !== $old['username']) {
        $up_name = $conn->prepare("UPDATE users SET username = :username WHERE id = :id");
        $up_name->bindValue(":username", $username, PDO::PARAM_STR);
        $up_name->bindValue(":id", $id, PDO::PARAM_INT);
        $up_name->execute();
        $editDetected = true;
    }

    if ($useremail !== $old['email']) {
        $up_email = $conn->prepare("UPDATE users SET email = :useremail WHERE id = :id");
        $up_email->bindValue(":useremail", $useremail, PDO::PARAM_STR);
        $up_email->bindValue(":id", $id, PDO::PARAM_INT);
        $up_email->execute();
        $editDetected = true;
    }

    if ($userphone !== $old['phone_number']) {
        $up_phone = $conn->prepare("UPDATE users SET phone_number = :phoneNumber WHERE id = :id");
        $up_phone->bindValue(":phoneNumber", $userphone, PDO::PARAM_STR);
        $up_phone->bindValue(":id", $id, PDO::PARAM_INT);
        $up_phone->execute();
        $editDetected = true;
    }

    if ($userdisplayname !== $old['display_name']) {
        $up_dname = $conn->prepare("UPDATE users SET display_name = :dname WHERE id = :id");
        $up_dname->bindValue(":dname", $userdisplayname, PDO::PARAM_STR);
        $up_dname->bindValue(":id", $id, PDO::PARAM_INT);
        $up_dname->execute();
        $editDetected = true;
    }

    if ($userbio !== $old['bio']) {
        $up_bio = $conn->prepare("UPDATE users SET bio = :bio WHERE id = :id");
        $up_bio->bindParam(":bio", $userbio, PDO::PARAM_STR);
        $up_bio->bindParam(":id", $id, PDO::PARAM_INT);
        $up_bio->execute();
        $editDetected = true;
    }

    if ($usergender !== $old['gender']) {
        $up_gender = $conn->prepare("UPDATE users SET gender = :gender WHERE id = :id");
        $up_gender->bindValue(":gender", $usergender, PDO::PARAM_STR);
        $up_gender->bindValue(":id", $id, PDO::PARAM_INT);
        $up_gender->execute();
        $editDetected = true;
    }

    if ($userlocation !== $old['country']) {
        $up_location = $conn->prepare("UPDATE users SET country = :country WHERE id = :id");
        $up_location->bindValue(":country", $userlocation, PDO::PARAM_STR);
        $up_location->bindValue(":id", $id, PDO::PARAM_INT);
        $up_location->execute();
        $editDetected = true;
    }

    if(empty($_POST['update_birth']) || $_POST['update_birth'] === "0000-00-00"){
        $userbirth = null;
    }else{
        $userbirth = $_POST['update_birth'];
    }

    if ($userbirth !== $old['birth_date']) {
        $up_birth = $conn->prepare("UPDATE users SET birth_date = :bdate WHERE id = :id");
        $up_birth->bindValue(":bdate", $userbirth, PDO::PARAM_STR);
        $up_birth->bindValue(":id", $id, PDO::PARAM_INT);
        $up_birth->execute();
        $editDetected = true;
    }

    if ($face !== $old['facebook']) {
        $up_face = $conn->prepare("UPDATE users SET facebook = :fc WHERE id = :id");
        $up_face->bindValue(":fc", $face, PDO::PARAM_STR);
        $up_face->bindValue(":id", $id, PDO::PARAM_INT);
        $up_face->execute();
        $editDetected = true;
    }

    if ($insta !== $old['instagram']) {
        $up_insta = $conn->prepare("UPDATE users SET instagram = :itg WHERE id = :id");
        $up_insta->bindValue(":itg", $insta, PDO::PARAM_STR);
        $up_insta->bindValue(":id", $id, PDO::PARAM_INT);
        $up_insta->execute();
        $editDetected = true;
    }

    if ($x !== $old['x']) {
        $up_x = $conn->prepare("UPDATE users SET x = :x WHERE id = :id");
        $up_x->bindValue(":x", $x, PDO::PARAM_STR);
        $up_x->bindValue(":id", $id, PDO::PARAM_INT);
        $up_x->execute();
        $editDetected = true;
    }

    if ($website !== $old['website']) {
        $up_website = $conn->prepare("UPDATE users SET website = :wb WHERE id = :id");
        $up_website->bindValue(":wb", $website, PDO::PARAM_STR);
        $up_website->bindValue(":id", $id, PDO::PARAM_INT);
        $up_website->execute();
        $editDetected = true;
    }

    if (
        !$editDetected
    ) {
        $_SESSION['flash'][] = [
            'type' => 'info',
            'message' => 'No updates detected.'
        ];
        header("Location:myprofile.php");
        exit();
    } else {
        $_SESSION['flash'][] = [
            'type' => 'success',
            'message' => 'Sauvegarde successfully'
        ];


        header("Location:myprofile.php");
        exit();
    }
}
