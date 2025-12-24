<?php
include "db.php";
include "likes.php";
session_start();

header("Content-Type: application/json");
$photo_id = intval($_POST['photo_id']);
$user_id = intval($_SESSION['px_id'] ?? $_COOKIE['px_userid'] ?? null);

if(!isset($user_id)){
    echo json_encode(['success' => false, 'message' => 'You must login first']);
    header("Location:login.php");
    exit;
}

if($photo_id < 0){
    echo json_encode(['success' => false,"message" => "Invalid photo"]);
    exit;
}

$check = $conn->prepare("SELECT 1 FROM likes WHERE user_id = :userid AND photo_id = :photoid LIMIT 1");
$check->bindValue(":userid", $user_id, PDO::PARAM_INT);
$check->bindValue(":photoid", $photo_id, PDO::PARAM_INT);
$check->execute();

if ($check->rowCount() > 0) {
    $del = $conn->prepare("DELETE FROM likes WHERE user_id = :userid AND photo_id = :photoid");
    $del->bindValue(":userid", $user_id, PDO::PARAM_INT);
    $del->bindValue(":photoid", $photo_id, PDO::PARAM_INT);
    $del->execute();
} else {
    $add = $conn->prepare("INSERT INTO likes (user_id,photo_id) VALUES (:userid,:photoid)");
    $add->bindValue(":userid", $user_id, PDO::PARAM_INT);
    $add->bindValue(":photoid", $photo_id, PDO::PARAM_INT);
    $add->execute();
}

$count = $conn -> prepare("SELECT COUNT(*) FROM likes WHERE photo_id = :photoid");
$count -> bindValue(":photoid",$photo_id,PDO::PARAM_INT);
$count -> execute();
$totalLikes = $count -> fetchColumn();
echo json_encode(["success" => true, "totalLikes" => $totalLikes]);
?>