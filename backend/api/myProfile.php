<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__ . "/../config/db.php";
//require_once __DIR__ . "/../api/statistics_profile.php";
//require_once __DIR__ . "../api/fetch_my_photos.php";

$id = intval($_SESSION['px_id']);

$info = $conn->prepare("SELECT * FROM users WHERE id = :id");
$info->bindValue(":id", $id, PDO::PARAM_INT);
$info->execute();
$infos = $info->fetch();
$photoStmt = $conn->prepare("SELECT * FROM  photos WHERE user_id = :id");
$photoStmt->bindValue(":id", $id, PDO::PARAM_INT);
$photoStmt->execute();
$photos = $photoStmt->fetchAll(PDO::FETCH_ASSOC);
if ($infos) {
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $infos['id'],
            'displayname' => $infos['display_name'],
            'email' => $infos['email'],
            'username' => $infos['username'],
            'bio' => $infos['bio'],
            'photo_profile' => basename($infos['photo_profile']),
            'cover_image' => $infos['cover_image'],
            'country' => $infos['country'],
            'gender' => $infos['gender'],
            'phone_number' => $infos['phone_number'],
            'birth_date' => $infos['birth_date'],
            'instagram' => $infos['instagram'],
            'facebook' => $infos['facebook'],
            'website' => $infos['website'],
            'x' => $infos['x']
        ],
        'photos' => $photos?: []
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'user not found']);
}