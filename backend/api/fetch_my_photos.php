<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__. "/../config/db.php";

/* if (!isset($_SESSION['px_id'])) {
    $_SESSION['dberr'] = "You have to logged first for display dasheboard.";
    header("Location:login.php");
    exit();
}
 */
$id = $_SESSION['px_id'] ?? null;

$photoStmt = $conn->prepare("SELECT * FROM  photos WHERE user_id = :id");
$photoStmt->bindValue(":id", $id, PDO::PARAM_INT);
$photoStmt->execute();
$photos = $photoStmt->fetchAll(PDO::FETCH_ASSOC);

$info = $conn->prepare("SELECT * FROM users WHERE id = :id");
$info->bindValue(":id", $id, PDO::PARAM_INT);
$info->execute();
$infos = $info->fetch();

$stm = $conn->prepare("SELECT COUNT(*) AS total_images FROM photos WHERE user_id = :usid");
$stm->bindValue(":usid", $id, PDO::PARAM_INT);
$stm->execute();
$totalImages = $stm->fetch(PDO::FETCH_ASSOC);

$ps = $conn -> prepare("SELECT p.* FROM photos p JOIN likes l ON p.id = l.photo_id WHERE l.user_id = :id");
$ps -> bindValue(":id",$id,PDO::PARAM_INT);
$ps -> execute();
$photosLikes = $ps -> fetchAll(PDO::FETCH_ASSOC);

$countLikePhoto = $conn -> prepare("SELECT COUNT(*) AS totalLikePhotos FROM photos p JOIN likes l ON p.id = l.photo_id WHERE l.user_id = :id");
$countLikePhoto -> bindValue(":id",$id,PDO::PARAM_INT);
$countLikePhoto -> execute();
$likesCount = $countLikePhoto -> fetch(PDO::FETCH_ASSOC);

$g = $conn -> prepare("SELECT * FROM galleries WHERE user_id = :id");
$g -> bindValue(":id",$id,PDO::PARAM_INT);
$g -> execute();
$galleries = $g -> fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    'success' => true,
    'photos' => $photos ?: [],
    'photosCount' => (int)$totalImages['total_images'],
    'likesCountPhotos' => (int)$likesCount['totalLikePhotos'],
    'photosLikes' => $photosLikes
]);