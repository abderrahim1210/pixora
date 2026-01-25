<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: DELETE,POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/../config/db.php";

$ok = true;
$input = json_decode(file_get_contents('php://input'), true);
$comment_id = intval($input['comment_id'] ?? 0);
$user_id = intval($input['user_id'] ?? 0);
$photo_id = $input['photo_id'] ?? 0;
if (!$comment_id || !is_numeric($comment_id)) {
    $ok = false;
    echo json_encode(['success' => false, 'message' => 'Comment not found']);
    exit();
}

$find = $conn->prepare("SELECT * FROM comments WHERE id = :id AND user_id = :user_id");
$find->bindValue(":id", $comment_id, PDO::PARAM_INT);
$find->bindValue(":user_id", $user_id, PDO::PARAM_INT);
$find->execute();
$comment = $find->fetch(PDO::FETCH_ASSOC);

if (!$comment) {
    $ok = false;
    echo json_encode(['success' => false, 'message' => 'You can not delete this comment']);
    exit();
}

if ($ok) {
    $del_comment = $conn->prepare("DELETE FROM comments WHERE id = :id AND user_id = :user_id AND photo_id = :pid");
    $del_comment->bindValue(":id", $comment_id, PDO::PARAM_INT);
    $del_comment->bindValue(":user_id", $user_id, PDO::PARAM_INT);
    $del_comment->bindValue(":pid", $photo_id, PDO::PARAM_INT);
    $del_comment->execute();
    echo json_encode(['success' => true, 'message' => 'Comment deleted successfully']);
    exit();
} else {
    echo json_encode(['success' => false, 'message' => 'Comment not deleted']);
    exit();
}
