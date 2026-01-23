<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
$ok = true;
$input = json_decode(file_get_contents('php://input'), true);
$photo_id = intval($input['photo_id'] ?? 0);
$content = $input['content'] ?? "";
$comment_id = $input['comment_id'] ?? 0;
$id = $_SESSION['px_id'] ?? null;
if (!$comment_id || !is_numeric($comment_id)) {
    $ok = false;
    // $_SESSION['flash'][] = [
    //     'type' => 'error',
    //     'message' => 'Comment not found'
    // ];
    // header("Location:photo_preview.php?id=$photo_id");
    echo json_encode(['success' => false,'message' => 'comment not found']);
    exit();
}

$find = $conn->prepare("SELECT * FROM comments WHERE id = :id AND user_id = :user_id");
$find->bindValue(":id", $comment_id, PDO::PARAM_INT);
$find->bindValue(":user_id", $id, PDO::PARAM_INT);
$find->execute();
$comment = $find->fetch(PDO::FETCH_ASSOC);

if (!$comment) {
    $ok = false;
    // $_SESSION['flash'][] = [
    //     'type' => 'error',
    //     'message' => 'You can not edit this comment'
    // ];
    // header("Location:photo_preview.php?id=$photo_id");
    echo json_encode(['success' => false,'message' => 'You can not edit this comment']);
    exit();
}

if ($content === '') {
    // $_SESSION['flash'][] = [
    //     'type' => 'error',
    //     'message' => 'Comment updated failed'
    // ];
    // header("Location:photo_preview.php?id=$photo_id");
    echo json_encode(['success' => false,'message' => 'comment updated failed']);
    exit();
}

if ($ok) {
    $up_comment = $conn->prepare("UPDATE comments SET content = :content WHERE id = :id");
    $up_comment->bindValue(":content", $content, PDO::PARAM_STR);
    $up_comment->bindValue(":id", $comment_id, PDO::PARAM_INT);
    $up_comment->execute();
    // $_SESSION['flash'][] = [
    //     'type' => 'success',
    //     'message' => 'Comment updated successfully'
    // ];
    // header("Location:photo_preview.php?id=$photo_id");
    echo json_encode(['success' => true,'message' => 'comment updated successfully']);
    exit();
} else {
    // $_SESSION['flash'][] = [
    //     'type' => 'error',
    //     'message' => 'Comment updated failed'
    // ];
    // header("Location:photo_preview.php?id=$photo_id");
    echo json_encode(['success' => false,'message' => 'comment updated failed']);
    exit();
}
