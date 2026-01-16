<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/../api/likes.php";
require_once __DIR__ . "/../api/user_verify.php";
$stmt = $conn->prepare("SELECT * FROM photos WHERE visibility = 'public'");
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stm = $conn->prepare("SELECT * FROM users");
$stm->execute();
$users = $stm->fetchAll(PDO::FETCH_ASSOC);

$userid = intval($_SESSION['px_id'] ?? $_COOKIE['px_userid'] ?? null);

foreach ($rows as &$row) {
    if (!empty($userid)) {
        $lk = $conn->prepare("SELECT COUNT(*) FROM likes WHERE user_id = :userid AND photo_id = :photoid");
        $lk->bindValue(":userid", $userid, PDO::PARAM_INT);
        $lk->bindValue(":photoid", $row['id'], PDO::PARAM_INT);
        $lk->execute();
        $row['isLiked'] = $lk->fetchColumn() > 0;
    } else {
        $row['isLiked'] = false;
    }
    $cnt = $conn->prepare("SELECT COUNT(*) FROM likes WHERE photo_id = :photoid");
    $cnt->bindValue(":photoid", $row['id'], PDO::PARAM_INT);
    $cnt->execute();
    $row['totalLikes'] = $cnt->fetchColumn();
}
echo json_encode([
    'success' => true,
    'photos' => $rows,
    'users' => $users
]);
?>