<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/../config/db.php";

$id = intval($_SESSION['px_id']);
$data = json_decode(file_get_contents('php://input'),true);
$username = $data['username'];
$d_name = $data['display_name'];
$email = $data['email'];
$tel = $data['tel'];
$bio = $data['bio'];
$birth_date = $data['birth_date'];
$gender = $data['gender'];
$country = $data['country'];
$facebook = $data['facebook'];
$website = $data['website'];
$insta = $data['instagram'];
$x = $data['x'];

if (!isset($id) || !is_numeric($id)) {
    echo json_encode(['success' => false, 'message' => 'User not found']);
    exit();
}


$check = $conn->prepare("SELECT * FROM users WHERE id = :id LIMIT 1");
$check->bindValue(":id", $id, PDO::PARAM_INT);
$check->execute();
$old = $check->fetch(PDO::FETCH_ASSOC);

if ($check->rowCount() === 0) {
    echo json_encode(['success' => false,'message' => 'You have not a permission for edit this profile']);
    exit();
}

/* $username = $_POST['update_name'];
$useremail = $_POST['update_email'];
$userphone = $_POST['update_phone'];
//$userbirth = $_POST['update_birth'];
$userdisplayname = $_POST['update_dname'];
$usergender = $_POST['update_gender'];
$userlocation = $_POST['update_location'];
$userbio = trim($_POST['update_bio']);
$face = trim($_POST['face_link']);
$insta = trim($_POST['insta_link']);
$x = trim($_POST['x_link']);
$website = trim($_POST['website_link']); */
$editDetected = false;

if ($username !== $old['username']) {
    $up_name = $conn->prepare("UPDATE users SET username = :username WHERE id = :id");
    $up_name->bindValue(":username", $username, PDO::PARAM_STR);
    $up_name->bindValue(":id", $id, PDO::PARAM_INT);
    $up_name->execute();
    $editDetected = true;
}

if ($email !== $old['email']) {
    $up_email = $conn->prepare("UPDATE users SET email = :useremail WHERE id = :id");
    $up_email->bindValue(":useremail", $email, PDO::PARAM_STR);
    $up_email->bindValue(":id", $id, PDO::PARAM_INT);
    $up_email->execute();
    $editDetected = true;
}

if ($tel !== $old['phone_number']) {
    $up_phone = $conn->prepare("UPDATE users SET phone_number = :phoneNumber WHERE id = :id");
    $up_phone->bindValue(":phoneNumber", $tel, PDO::PARAM_STR);
    $up_phone->bindValue(":id", $id, PDO::PARAM_INT);
    $up_phone->execute();
    $editDetected = true;
}

if ($d_name !== $old['display_name']) {
    $up_dname = $conn->prepare("UPDATE users SET display_name = :dname WHERE id = :id");
    $up_dname->bindValue(":dname", $d_name, PDO::PARAM_STR);
    $up_dname->bindValue(":id", $id, PDO::PARAM_INT);
    $up_dname->execute();
    $editDetected = true;
}

if ($bio !== $old['bio']) {
    $up_bio = $conn->prepare("UPDATE users SET bio = :bio WHERE id = :id");
    $up_bio->bindParam(":bio", $bio, PDO::PARAM_STR);
    $up_bio->bindParam(":id", $id, PDO::PARAM_INT);
    $up_bio->execute();
    $editDetected = true;
}

if ($gender !== $old['gender']) {
    $up_gender = $conn->prepare("UPDATE users SET gender = :gender WHERE id = :id");
    $up_gender->bindValue(":gender", $gender, PDO::PARAM_STR);
    $up_gender->bindValue(":id", $id, PDO::PARAM_INT);
    $up_gender->execute();
    $editDetected = true;
}

if ($country !== $old['country']) {
    $up_location = $conn->prepare("UPDATE users SET country = :country WHERE id = :id");
    $up_location->bindValue(":country", $country, PDO::PARAM_STR);
    $up_location->bindValue(":id", $id, PDO::PARAM_INT);
    $up_location->execute();
    $editDetected = true;
}

if (empty($birth_date) || $birth_date === "0000-00-00") {
    $birth_date = null;
} else {
    $birth_date = $birth_date;
}

if ($birth_date !== $old['birth_date']) {
    $up_birth = $conn->prepare("UPDATE users SET birth_date = :bdate WHERE id = :id");
    $up_birth->bindValue(":bdate", $birth_date, PDO::PARAM_STR);
    $up_birth->bindValue(":id", $id, PDO::PARAM_INT);
    $up_birth->execute();
    $editDetected = true;
}

if ($facebook !== $old['facebook']) {
    $up_face = $conn->prepare("UPDATE users SET facebook = :fc WHERE id = :id");
    $up_face->bindValue(":fc", $facebook, PDO::PARAM_STR);
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
    echo json_encode(['success' => false,'message' => 'No updates detected.']);
    exit();
} else {
    echo json_encode(['success' => true,'message' => 'Savegarde successfully']);
    exit();
}
