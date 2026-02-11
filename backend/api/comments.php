<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST,DELETE,PUT, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);
$photo_id = intval($input['photo_id'] ?? 0);
$comment = $input['comment'] ?? "";
$id = $_SESSION['px_id'] ?? 0;
$comment_id = $input['comment_id'] ?? 0;
$method = $_SERVER['REQUEST_METHOD'];
$ok = true;

if (!$id || !is_numeric($id)) {
    echo json_encode(['success' => false, 'message' => 'User not found']);
    exit();
}
$id = intval($id);

if (!$photo_id || !is_numeric($photo_id)) {
    echo json_encode(['success' => false, 'message' => 'Photo not found']);
    exit();
}

switch ($method) {
    case 'POST':
        $ok = true;
        $comment = trim($comment);
        if ($comment === '') {
            echo json_encode(['success' => false, 'message' => 'comment not added empty']);
            exit();
            $ok = false;
        }
        if ($ok) {
            $add_comment = $conn->prepare("INSERT INTO comments (photo_id,user_id,content) VALUES (:photo_id,:user_id,:content)");
            $add_comment->bindValue(":photo_id", $photo_id, PDO::PARAM_INT);
            $add_comment->bindValue(":user_id", $id, PDO::PARAM_INT);
            $add_comment->bindValue(":content", $comment, PDO::PARAM_STR);
            $add_comment->execute();
            echo json_encode(['success' => true, 'message' => 'Comment added successfully']);
            exit();
        } else {
            echo json_encode(['success' => false, 'message' => 'comment added failed']);
            exit();
        }
        break;

    case 'PUT':
        $content = $input['content'] ?? "";
        if (!$comment_id || !is_numeric($comment_id)) {
            $ok = false;
            echo json_encode(['success' => false, 'message' => 'comment not found']);
            exit();
        }

        $find = $conn->prepare("SELECT * FROM comments WHERE id = :id AND user_id = :user_id");
        $find->bindValue(":id", $comment_id, PDO::PARAM_INT);
        $find->bindValue(":user_id", $id, PDO::PARAM_INT);
        $find->execute();
        $comment = $find->fetch(PDO::FETCH_ASSOC);

        if (!$comment) {
            $ok = false;
            echo json_encode(['success' => false, 'message' => 'You can not edit this comment']);
            exit();
        }

        if ($content === '') {
            echo json_encode(['success' => false, 'message' => 'comment updated failed']);
            exit();
        }

        if ($ok) {
            $up_comment = $conn->prepare("UPDATE comments SET content = :content WHERE id = :id");
            $up_comment->bindValue(":content", $content, PDO::PARAM_STR);
            $up_comment->bindValue(":id", $comment_id, PDO::PARAM_INT);
            $up_comment->execute();
            echo json_encode(['success' => true, 'message' => 'comment updated successfully']);
            exit();
        } else {
            echo json_encode(['success' => false, 'message' => 'comment updated failed']);
            exit();
        }
        break;

    case 'DELETE':
        $user_id = intval($input['user_id'] ?? 0);
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
        break;
}
