<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__ . "/../config/db.php";

$data = json_decode(file_get_contents('php://input'), true);
$action_type = $data['action_type'];
$profile_image = $data['profile_image'] ?? null;
$cover_image = $data['cover_image'] ?? null;
$id = $_SESSION['px_id'] ?? null;
$id = intval($id);

$stm = $conn->prepare("SELECT * FROM users WHERE id = :id");
$stm->bindValue(":id", $id, PDO::PARAM_INT);
$stm->execute();
$user = $stm->fetch(PDO::FETCH_ASSOC);


switch ($action_type) {
    case "profile_picture":
        $target_dir = __DIR__ . "/../../frontend/public/profile_pictures/";
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        preg_match('/^data:image\/(\w+);base64,/', $profile_image, $type);
        $ext = strtolower($type[1]);

        $profile_image = substr($profile_image, strpos($profile_image, ',') + 1);
        $profile_image = base64_decode($profile_image);
        $filename = uniqid() . "." . $ext;
        $target_file = $target_dir . $filename;

        $allowed = ['png', 'jpg', 'jpeg'];
        if (!in_array($ext, $allowed)) {
            echo json_encode(['success' => false, 'message' => 'We are not allow this files']);
            exit();
        }

        if (strlen($profile_image) / 1024 / 1024 > 100) {
            echo json_encode(['success' => false, 'message' => 'File too large']);
            exit();
        }

        file_put_contents($target_file, $profile_image);

        $add_photo = $conn->prepare("UPDATE users SET photo_profile = :pf WHERE id = :id");
        $add_photo->bindValue(":pf", $filename, PDO::PARAM_STR);
        $add_photo->bindValue(":id", $id, PDO::PARAM_INT);
        $add_photo->execute();
        echo json_encode(['success' => true, 'message' => 'Profile picture updated successfully']);
        exit();
        break;
    case "cover_image":
        $target_dir = __DIR__ . "/../../frontend/public/cover_images/";
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        preg_match('/^data:image\/(\w+);base64,/', $cover_image, $type);
        $ext = strtolower($type[1]);

        $cover_image = substr($cover_image, strpos($cover_image, ',') + 1);
        $cover_image = base64_decode($cover_image);
        $filename = uniqid() . "." . $ext;
        $target_file = $target_dir . $filename;

        $allowed = ['png', 'jpg', 'jpeg'];
        if (!in_array($ext, $allowed)) {
            echo json_encode(['success' => false, 'message' => 'We are not allow this files']);
            exit();
        }

        if (strlen($cover_image) / 1024 / 1024 > 100) {
            echo json_encode(['success' => false, 'message' => 'File too large']);
            exit();
        }

        file_put_contents($target_file, $cover_image);

        $add_photo = $conn->prepare("UPDATE users SET cover_image = :ci WHERE id = :id");
        $add_photo->bindValue(":ci", $filename, PDO::PARAM_STR);
        $add_photo->bindValue(":id", $id, PDO::PARAM_INT);
        $add_photo->execute();
        echo json_encode(['success' => true, 'message' => 'Cover picture updated successfully']);
        exit();
        break;
    case "delete_profile_picture":
        $f = $user['photo_profile'];
        $path = __DIR__ . "/../../frontend/public/profile_pictures/" . $f;
        if (!empty($user['photo_profile'])) {
            if (file_exists($path)) {
                unlink($path);
            }
        }

        if ($user) {
            $del = $conn->prepare("UPDATE users SET photo_profile = NULL WHERE id = :id");
            $del->bindValue(":id", $id, PDO::PARAM_INT);
            $del->execute();
            echo json_encode(['success' => true, 'message' => 'Profile picture deleted successfully']);
            exit();
        } else {
            echo json_encode(['success' => false, 'message' => 'Profile picture failed to delete']);
            exit();
        }
        break;
    case "delete_cover_image":
        $file = $user['cover_image'];
        $path = __DIR__ . "/../../frontend/public/cover_images/" . $file;
        if (!empty($user['cover_image'])) {
            if (file_exists($path)) {
                unlink($path);
            }
        }

        if ($user) {
            $del = $conn->prepare("UPDATE users SET cover_image = NULL WHERE id = :id");
            $del->bindValue(":id", $id, PDO::PARAM_INT);
            $del->execute();
            echo json_encode(['success' => true, 'message' => 'Cover image deleted successfully']);
            exit();
        } else {
            echo json_encode(['success' => true, 'message' => 'Cover image failed to delete']);
            exit();
        }
        break;
    default:
        return;
}
