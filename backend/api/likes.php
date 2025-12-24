<?php
include "db.php";

$stm = $conn -> prepare(" SELECT p.id, COUNT(l.id) AS totalLikes
    FROM photos p
    LEFT JOIN likes l ON p.id = l.photo_id
    GROUP BY p.id");
$stm -> execute();
$photos = $stm -> fetchAll(PDO::FETCH_ASSOC);

foreach($photos as $photo){
    $likeCount = $conn->prepare("SELECT COUNT(*) as total_likes FROM likes WHERE photo_id = :photoid");
    $likeCount->bindParam(":photoid", $photo['id'], PDO::PARAM_INT);
    $likeCount->execute();
    $likes = $likeCount->fetch();
    $photo['totalLikes'] = $likes["total_likes"];
}
?>