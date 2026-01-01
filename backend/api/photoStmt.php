<?php
include "db.php";
include "likes.php";
session_start();
if ((!isset($_GET['id']) || !is_numeric($_GET['id']))) {
    die("Id not found.");
}

if (!isset($_SESSION['px_id']) && !isset($_COOKIE['px_useremail'])) {
    header("Location:login.php");
    exit();
}

$id = intval($_GET['id']);
$user_id = intval($_SESSION['px_id'] ?? $_COOKIE['px_userid']);
$sql = "SELECT * FROM photos WHERE id = :id";
$stmt = $conn->prepare($sql);
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$stmt->execute();
$photo = $stmt->fetch();

if (!$photo) {
    die("Photo not found.");
}

if ((int)$user_id !== (int)$photo['user_id']) {
    die("The photo it's not for you !");
}

$stm = $conn->prepare("SELECT * FROM users WHERE id = :id");
$stm->bindParam(":id", $photo['user_id'], PDO::PARAM_INT);
$stm->execute();
$user = $stm->fetch();

$userid = intval($_SESSION['px_id'] ?? $_COOKIE['px_userid']);

$likeCount = $conn->prepare("SELECT * FROM likes WHERE user_id = :userid AND photo_id = :photoid");
$likeCount->bindParam(":userid", $user, PDO::PARAM_INT);
$likeCount->bindParam(":photoid", $photo['id'], PDO::PARAM_INT);
$likeCount->execute();
$likes = $likeCount->fetch();

$category = $conn->prepare("SELECT * FROM categories WHERE id = :id");
$category->bindValue(":id", $photo['category_id'], PDO::PARAM_INT);
$category->execute();
$cat_name = $category->fetch();

$cnt = $conn->prepare("SELECT COUNT(*) FROM likes WHERE photo_id = :photoid");
$cnt->bindValue(":photoid", $photo['id'], PDO::PARAM_INT);
$cnt->execute();
$totalLikes = $cnt->fetchColumn();

$comments = $conn->prepare("SELECT c.id ,c.photo_id, c.user_id, c.content, c.created_at, c.updated_at, u.username,u.photo_profile
FROM comments c
JOIN users u ON c.user_id = u.id
WHERE c.photo_id = :photo_id
ORDER BY c.created_at ASC");
$comments->bindValue(":photo_id", $photo['id'], PDO::PARAM_INT);
$comments->execute();
$cs = $comments->fetchAll(PDO::FETCH_ASSOC);

include_once 'convert_date.php';
?>