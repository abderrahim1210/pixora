<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/../api/likes.php";
require_once __DIR__. '/../api/convert_date.php';
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Id not found."
    ]);
}else{
    $id = intval($_GET['id']);
    $currentUser = $_SESSION['px_id'] ?? null;
    
    $us = $conn->prepare("SELECT * FROM users WHERE id = :id");
    $us->bindValue(":id", $currentUser, PDO::PARAM_STR);
    $us->execute();
    $usr = $us->fetch(PDO::FETCH_ASSOC);
    $userid = $usr['id'] ?? null;
    
    $stm1 = $conn->prepare("SELECT p.id AS photo_id, p.user_id,p.category_id, p.title,p.description,p.filename,p.visibility,p.isLiked,p.location,p.upload_date,u.id AS user_id,u.username,u.email FROM photos p JOIN users u ON p.user_id = u.id WHERE p.id = :pid");
    $stm1->bindValue(":pid", $id, PDO::PARAM_INT);
    $stm1->execute();
    $photo = $stm1->fetch(PDO::FETCH_ASSOC);
    $photo['upload_date'] = timeAgo($photo['upload_date']);
    
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
    
    $comments = $conn->prepare("SELECT c.id ,c.photo_id, c.user_id, c.content, c.created_at, c.updated_at,u.username, u.photo_profile,u.email
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.photo_id = :photo_id
    ORDER BY c.created_at ASC");
    $comments->bindValue(":photo_id", $photo['photo_id'], PDO::PARAM_INT);
    $comments->execute();
    $cs = $comments->fetchAll(PDO::FETCH_ASSOC);
    foreach($cs as &$c){
        $c['created_at'] = timeAgo($c['created_at']);
    }
    

    echo json_encode([
        "success" => true,
        "photo" => $photo,
        "likes" => $totalLikes,
        "currUser" => $currentUser,
        "category" => $cat_name,
        "comments" => $cs
    ]);
}
?>