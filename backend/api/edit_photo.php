<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__ . "/../config/db.php";

// $_SESSION['flash'] = [];
// if (!isset($_GET['id'])) {
//     // $_SESSION['flash'][] = [
//     //     'type' => 'error',
//     //     'message' => 'Id not found.'
//     // ];
//     // header("Location:myphotos.php");
//     exit();
// }

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['photo_id'] ?? 0;
$title = $data['title'] ?? null;
$description = $data['description'] ?? null;
$location = $data['location'] ?? null;
$category = $data['category'] ?? null;

if (!isset($_SESSION['px_id'])) {
    // $_SESSION['flash'][] = [
    //     'type' => 'error',
    //     'message' => 'User not found.'
    // ];
    // header("Location:myphotos.php");
    echo json_encode(['success' => false, 'message' => 'User not found.']);
    exit();
}

// $id = intval($_GET['id']);
// if ($_SERVER['REQUEST_METHOD'] === "POST") {
// $new_category = htmlspecialchars($_POST['update_category'], ENT_QUOTES, "UTF-8");
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
    ($category !== null && $category === $cat['name'])
) {
    echo json_encode(['success' => false, 'message' => 'No changes made']);
    exit();
}


if ($category) {
    if ($cat) {
        $cat_id = $cat['id'];
    } //else {
    //     $stmt = $conn->prepare("INSERT INTO categories (name) VALUES (:name)");
    //     $stmt->bindValue(":name", $category, PDO::PARAM_STR);
    //     $stmt->execute();
    //     $cat_id = $conn->lastInsertId();
    //     $stmt = $conn->prepare("UPDATE photos SET category_id = :ncat WHERE id = :id");
    //     $stmt->bindParam(":ncat", $cat_id, PDO::PARAM_INT);
    //     $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    //     $stmt->execute();
    // }
}
// $new_description = htmlspecialchars($_POST['update_description'], ENT_QUOTES, "UTF-8");
if ($description) {
    $stmt = $conn->prepare("UPDATE photos SET description = :ndescription WHERE id = :id");
    $stmt->bindParam(":ndescription", $description, PDO::PARAM_STR);
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    $stmt->execute();
}
// $new_title = htmlspecialchars($_POST['update_title'], ENT_QUOTES, "UTF-8");
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
// $new_vis = htmlspecialchars(trim($_POST['update_visibility']), ENT_QUOTES, "UTF-8");
// $stmt = $conn->prepare("UPDATE photos SET visibility = :nvis WHERE id = :id");
// $stmt->bindParam(":nvis", $new_vis, PDO::PARAM_STR);
// $stmt->bindParam(":id", $id, PDO::PARAM_INT);
// $stmt->execute();
// $_SESSION['flash'][] = [
//     'type' => 'error',
//     'message' => 'Sauvegard successfully'
// ];
// header("Location:photo.php?id=$id");
echo json_encode(['success' => true, 'message' => 'Savegard successfully']);
exit();
// }
