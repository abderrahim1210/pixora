<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST,DELETE,PUT, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/../config/db.php";

$id = $_SESSION['px_id'] ?? null;
$id = intval($id);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $conn->prepare("SELECT users.id FROM users INNER JOIN follows ON users.id = follows.following_id WHERE follows.follower_id = :id");
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        $follows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([
            'users' => $follows
        ]);
        break;
    case 'POST':
        $stmt = $conn->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $stmt->execute();

        $data = json_decode(file_get_contents('php://input'),true);
        $user_id = intval($data['followerID'] ?? 0);

        $stm = $conn->prepare("SELECT * FROM follows WHERE follower_id = :followerId AND following_id = :followingId");
        $stm->bindValue(":followerId", $id, PDO::PARAM_INT);
        $stm->bindValue(":followingId", $user_id, PDO::PARAM_INT);
        $stm->execute();

        if ($stm->rowCount() > 0) {
            $del_follow = $conn->prepare("DELETE FROM follows WHERE follower_id = :follower_id AND following_id = :following_id");
            $del_follow->bindValue(":follower_id", $id, PDO::PARAM_INT);
            $del_follow->bindValue(":following_id", $user_id, PDO::PARAM_INT);
            $del_follow->execute();
            echo json_encode(['status' => 'unfollowed']);
        } else {
            $addFollow = $conn->prepare("INSERT INTO follows (follower_id,following_id) VALUES (:follower_id,:following_id)");
            $addFollow->bindValue(":follower_id", $id, PDO::PARAM_INT);
            $addFollow->bindValue(":following_id", $user_id, PDO::PARAM_INT);
            $addFollow->execute();
            echo json_encode(['status' => 'followed']);
        }
        break;
    default:
        return;
}
