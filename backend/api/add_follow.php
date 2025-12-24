<?php
include "db.php";
session_start();
header("Content-Type:application/json");
if (!isset($_SESSION['px_id']) && (!isset($_COOKIE['px_userid']))) {
    echo json_encode(['status' => 'error' , 'message' => 'You have to logged first for add a follow for someone']);
    exit();
}

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo json_encode(['status' => 'error' , 'message' => 'Id not found']);
    exit();
}

$id = intval($_SESSION['px_id'] ?? $_COOKIE['px_userid']);

$stmt = $conn->prepare("SELECT * FROM users WHERE id = :id");
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$stmt->execute();

$user_id = intval($_GET['id']);

$stm = $conn->prepare("SELECT * FROM follows WHERE follower_id = :followerId AND following_id = :followingId");
$stm->bindValue(":followerId", $id, PDO::PARAM_INT);
$stm->bindValue(":followingId", $user_id, PDO::PARAM_INT);
$stm->execute();

if ($stm->rowCount() > 0) {
    $del_follow = $conn->prepare("DELETE FROM follows WHERE follower_id = :follower_id AND following_id = :following_id");
    $del_follow->bindValue(":follower_id", $id, PDO::PARAM_INT);
    $del_follow->bindValue(":following_id", $user_id, PDO::PARAM_INT);
    $del_follow -> execute();
    echo json_encode(['status' => 'unfollowed']);
}else{
    $addFollow = $conn->prepare("INSERT INTO follows (follower_id,following_id) VALUES (:follower_id,:following_id)");
    $addFollow->bindValue(":follower_id", $id, PDO::PARAM_INT);
    $addFollow->bindValue(":following_id", $user_id, PDO::PARAM_INT);
    $addFollow->execute();
    echo json_encode(['status' => 'followed']);
}
?>