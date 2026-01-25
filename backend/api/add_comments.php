<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);
$photo_id = intval($input['photo_id'] ?? 0);
$comment = $input['comment'] ?? "";
$id = $_SESSION['px_id'] ?? 0;
if (!$id || !is_numeric($id)) {
    echo json_encode(['success' => false,'message' => 'User not found']);
    exit();
}
$id = intval($id);

if (!$photo_id || !is_numeric($photo_id)) {
    echo json_encode(['success' => false,'message' => 'Photo not found']);
    exit();
}
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $ok = true;
    $comment = trim($comment);
    if ($comment === '') {
        echo json_encode(['success' => false,'message' => 'comment not added empty']);
        exit();
        $ok = false;
    }

    if ($ok) {
        $add_comment = $conn->prepare("INSERT INTO comments (photo_id,user_id,content) VALUES (:photo_id,:user_id,:content)");
        $add_comment->bindValue(":photo_id", $photo_id, PDO::PARAM_INT);
        $add_comment->bindValue(":user_id", $id, PDO::PARAM_INT);
        $add_comment->bindValue(":content", $comment, PDO::PARAM_STR);
        $add_comment->execute();
        echo json_encode(['success' => true,'message' => 'Comment added successfully']);
        exit();
    } else {
        echo json_encode(['success' => false,'message' => 'comment added failed']);
        exit();
    }
}
