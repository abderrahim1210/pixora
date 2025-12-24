<?php
include "db.php";
if (!isset($_SESSION['px_id']) && !isset($_COOKIE['px_userid'])) {
    header("Location:login.php");
    exit;
}
$id = intval($_SESSION['px_id'] ?? $_COOKIE['px_userid']);
$followerCount = $conn->prepare("SELECT COUNT(*) FROM follows WHERE following_id = :fwid");
$followerCount->bindValue(":fwid", $id, PDO::PARAM_INT);
$followerCount->execute();
$follower = $followerCount->fetchColumn();

$followingCount = $conn->prepare("SELECT COUNT(*) FROM follows WHERE follower_id = :fwer_id");
$followingCount->bindValue(":fwer_id", $id, PDO::PARAM_INT);
$followingCount->execute();
$following = $followingCount->fetchColumn();

$photosCount = $conn->prepare("SELECT COUNT(*) FROM photos WHERE user_id = :userid");
$photosCount->bindValue(":userid", $id, PDO::PARAM_INT);
$photosCount->execute();
$photos_count = $photosCount->fetchColumn();

$likeCount = $conn->prepare("SELECT COUNT(*) FROM likes WHERE photo_id IN (SELECT id FROM photos WHERE user_id = :user_id)");
$likeCount->bindValue(":user_id", $id, PDO::PARAM_INT);
$likeCount->execute();
$likes = $likeCount->fetchColumn();

$months = [];
$likesChart = [];
$followersChart = [];
$followingsChart = [];
$photosChart = [];
if ($id > 0) {
    $stmt = $conn->prepare("SELECT DATE_FORMAT(l.created_at,'%Y-%m') AS month, COUNT(l.id) AS total FROM likes l INNER JOIN photos p ON l.photo_id = p.id WHERE p.user_id = :user_id GROUP BY month ORDER BY month ASC");
    $stmt->bindValue(":user_id", $id, PDO::PARAM_INT);
    $stmt->execute();
    $likesData = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

    $stmt1 = $conn->prepare("SELECT DATE_FORMAT(created_at,'%Y-%m') AS month, COUNT(id) AS total FROM follows WHERE follower_id = :uid GROUP BY month ORDER BY month");
    $stmt1->bindValue(":uid", $id, PDO::PARAM_INT);
    $stmt1->execute();
    $followingsData = $stmt1->fetchAll(PDO::FETCH_KEY_PAIR);

    $stmt3 = $conn->prepare("SELECT DATE_FORMAT(created_at,'%Y-%m') AS month, COUNT(id) AS total FROM follows WHERE following_id = :uid GROUP BY month ORDER BY month");
    $stmt3->bindValue(":uid", $id, PDO::PARAM_INT);
    $stmt3->execute();
    $followersData = $stmt3->fetchAll(PDO::FETCH_KEY_PAIR);

    $stmt4 = $conn->prepare("SELECT DATE_FORMAT(upload_date, '%Y-%m') AS month, COUNT(id) AS total FROM photos WHERE user_id = :user_id GROUP BY month ORDER BY month");
    $stmt4->bindValue(":user_id", $id, PDO::FETCH_KEY_PAIR);
    $stmt4->execute();
    $photosData = $stmt4->fetchAll(PDO::FETCH_KEY_PAIR);

    $all_months = array_unique(array_merge(
        array_keys($likesData),
        array_keys($followersData),
        array_keys($followingsData),
        array_keys($photosData),
    ));
    sort($all_months);

    foreach ($all_months as $m) {
        $months[] = $m;
        $likesChart[] = $likesData[$m] ?? 0;
        $followersChart[] = $followersData[$m] ?? 0;
        $followingsChart[] = $followingsData[$m] ?? 0;
        $photosChart[] = $photosData[$m] ?? 0;
    }
}
