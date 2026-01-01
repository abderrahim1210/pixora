<?php
include "db.php";
include "likes.php";
session_start();
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("Id not found.");
}

$id = intval($_GET['id']);

$us = $conn->prepare("SELECT * FROM users WHERE token = :tk");
$us->bindValue(":tk", $_COOKIE['px_user_token'] ?? null, PDO::PARAM_STR);
$us->execute();
$usr = $us->fetch(PDO::FETCH_ASSOC);
$userid = $usr['id'] ?? null;

$stm1 = $conn->prepare("SELECT p.id AS photo_id, p.user_id,p.category_id, p.title,p.description,p.filename,p.visibility,p.isLiked,p.location,p.upload_date,u.id AS user_id,u.username,u.email FROM photos p JOIN users u ON p.user_id = u.id WHERE p.id = :pid");
$stm1->bindValue(":pid", $id, PDO::PARAM_INT);
$stm1->execute();
$photo = $stm1->fetch(PDO::FETCH_ASSOC);

$category = $conn->prepare("SELECT * FROM categories WHERE id = :id");
$category->bindValue(":id", $photo['category_id'], PDO::PARAM_INT);
$category->execute();
$cat_name = $category->fetch(PDO::FETCH_ASSOC);

if ($userid) {
    $lk = $conn->prepare("SELECT COUNT(*) FROM likes WHERE user_id = :userid AND photo_id = :photoid");
    $lk->bindValue(":userid", $userid, PDO::PARAM_INT);
    $lk->bindValue(":photoid", $photo['photo_id'], PDO::PARAM_INT);
    $lk->execute();
    $photo['isLiked'] = $lk->fetchColumn() > 0;
} else {
    $photo['isLiked'] = false;
}
$cnt = $conn->prepare("SELECT COUNT(*) FROM likes WHERE photo_id = :photoid");
$cnt->bindValue(":photoid", $photo['photo_id'], PDO::PARAM_INT);
$cnt->execute();
$totalLikes = $cnt->fetchColumn();

$comments = $conn->prepare("SELECT c.id ,c.photo_id, c.user_id, c.content, c.created_at, c.updated_at, u.username, u.photo_profile,u.email
FROM comments c
JOIN users u ON c.user_id = u.id
WHERE c.photo_id = :photo_id
ORDER BY c.created_at ASC");
$comments->bindValue(":photo_id", $photo['photo_id'], PDO::PARAM_INT);
$comments->execute();
$cs = $comments->fetchAll(PDO::FETCH_ASSOC);

include_once 'convert_date.php';
?>