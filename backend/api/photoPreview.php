<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/../api/likes.php";
require_once __DIR__ . '/../utils/convert_date.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
            echo json_encode([
                "success" => false,
                "message" => "Id not found."
            ]);
        } else {
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

            $category = $conn->prepare("SELECT name FROM categories WHERE id = :id");
            $category->bindValue(":id", $photo['category_id'], PDO::PARAM_INT);
            $category->execute();
            $cat_name = $category->fetch(PDO::FETCH_ASSOC);

            $stm2 = $conn->prepare("SELECT * FROM categories");
            $stm2->execute();
            $categories = $stm2->fetchAll(PDO::FETCH_ASSOC);

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
            foreach ($cs as &$c) {
                $c['created_at'] = timeAgo($c['created_at']);
            }


            echo json_encode([
                "success" => true,
                "photo" => $photo,
                "likes" => $totalLikes,
                "currUser" => $currentUser,
                "category" => $cat_name,
                "comments" => $cs,
                "categories" => $categories
            ]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['photo_id'] ?? 0;
        $title = $data['title'] ?? null;
        $description = $data['description'] ?? null;
        $location = $data['location'] ?? null;
        $category = $data['category_id'] ?? null;

        if (!isset($_SESSION['px_id'])) {
            echo json_encode(['success' => false, 'message' => 'User not found.']);
            exit();
        }

        $photoExist = $conn->prepare("SELECT * FROM photos WHERE id = :id");
        $photoExist->bindValue(":id", $id, PDO::PARAM_INT);
        $photoExist->execute();
        $photo = $photoExist->fetch(PDO::FETCH_ASSOC);

        if ($photoExist->rowCount() === 0) {
            echo json_encode(['success' => false, 'message' => 'Photo id not found.']);
            exit();
        }

        $stmt = $conn->prepare("SELECT * FROM categories WHERE id = :id LIMIT 1");
        $stmt->bindValue(":id", $photo['category_id'], PDO::PARAM_STR);
        $stmt->execute();
        $cat = $stmt->fetch(PDO::FETCH_ASSOC);

        if (($title !== null && $title === $photo['title']) &&
            ($description !== null && $description === $photo['description']) &&
            ($location !== null && $location === $photo['location']) &&
            ($category !== null && $category === $cat['id'])
        ) {
            echo json_encode(['success' => false, 'message' => 'No changes made']);
            exit();
        }


        if ($category) {
            if ($cat) {
                $cat_id = $cat['id'];
            }
        }

        if ($category !== null) {
            $stmt = $conn->prepare("UPDATE photos SET category_id = :ncat WHERE id = :id");
            $stmt->bindParam(":ncat", $category, PDO::PARAM_INT);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
        }
        if ($description) {
            $stmt = $conn->prepare("UPDATE photos SET description = :ndescription WHERE id = :id");
            $stmt->bindParam(":ndescription", $description, PDO::PARAM_STR);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
        }
        if ($title) {
            $stmt = $conn->prepare("UPDATE photos SET title = :ntitle WHERE id = :id");
            $stmt->bindParam(":ntitle", $title, PDO::PARAM_STR);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
        }

        if ($location) {
            $stm = $conn->prepare("UPDATE photos SET location = :location WHERE id = :id");
            $stm->bindParam(":location", $location, PDO::PARAM_STR);
            $stm->bindValue(":id", $id, PDO::PARAM_INT);
            $stm->execute();
        }
        echo json_encode(['success' => true, 'message' => 'Savegard successfully']);
        exit();
        break;
}
