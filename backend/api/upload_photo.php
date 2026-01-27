<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/../api/fn.php";

$data = json_decode(file_get_contents('php://input'), true);
$photo = $data['photo_data'] ?? null;

if (!isset($_SESSION['px_id']) || !is_numeric($_SESSION['px_id'])) {
    echo json_encode(['success' => false, 'message' => 'You have to logged first for upload a file.']);
    exit();
}

$userid = $_SESSION['px_id'] ?? 0;
$title = text_input($photo['title']);
$description = text_input($photo['description']);
$category = text_input($photo['category']);
$size = $photo['size'];
$width = $photo['width'];
$height = $photo['height'];
$ratio = $photo['ratio'];
$orientation = $photo['orientation'];
$typePhoto = $photo['type'];
$tags = $photo['tags'];

$target_dir = __DIR__ ."/../../frontend/public/photos/";
if (!is_dir($target_dir)) {
    mkdir($target_dir, 0777, true);
}

$image = $photo['image'];
preg_match('/^data:image\/(\w+);base64,/', $image, $type);
$ext = strtolower($type[1]);

$image = substr($image, strpos($image, ',') + 1);
$image = base64_decode($image);
$filename = uniqid() . "." . $ext;
$target_file = $target_dir . $filename;

$allowed = ['png', 'jpg', 'jpeg'];
if (!in_array($ext, $allowed)) {
    echo json_encode(['success' => false, 'message' => 'We are not allow this files']);
    exit();
}

if (strlen($image) / 1024 / 1024 > 100) {
    echo json_encode(['success' => false,'message' => 'File too large']);
    exit();
}

file_put_contents($target_file,$image);

$stmt = $conn->prepare("SELECT id FROM categories WHERE name = :name LIMIT 1");
$stmt->bindValue(":name", $category, PDO::PARAM_STR);
$stmt->execute();
$cat = $stmt->fetch(PDO::FETCH_ASSOC);

if ($cat) {
    $cat_id = $cat['id'];
} else {
    $stmt = $conn->prepare("INSERT INTO categories (name) VALUES (:name)");
    $stmt->bindValue(":name", $category, PDO::PARAM_STR);
    $stmt->execute();
    $cat_id = $conn->lastInsertId();
}

$sql = "INSERT INTO photos (user_id,title,description,type,filename,category_id,size,width,height,ratio,tags) VALUES (:id,:title,:description,:type,:filename,:cat_id,:size,:width,:height,:ratio,:tags)";
$up = $conn->prepare($sql);
$up->bindParam(":id", $userid, PDO::PARAM_INT);
$up->bindParam(":title", $title, PDO::PARAM_STR);
$up->bindParam(":description", $description, PDO::PARAM_STR);
$up->bindParam(":type", $typePhoto, PDO::PARAM_STR);
$up->bindParam(":filename", $filename, PDO::PARAM_STR);
$up->bindParam(":cat_id", $cat_id, PDO::PARAM_INT);
$up->bindParam(":size",$size, PDO::PARAM_INT);
$up->bindParam(":width",$width, PDO::PARAM_INT);
$up->bindParam(":height",$height, PDO::PARAM_INT);
$up->bindParam(":ratio",$ratio, PDO::PARAM_INT);
$up->bindParam(":tags", $tags, PDO::PARAM_STR);
$up->execute();
echo json_encode(['success' => true,'message' => 'Uploaded files successfully']);
exit();
