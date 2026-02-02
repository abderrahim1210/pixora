<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__ . "/../config/db.php";

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
