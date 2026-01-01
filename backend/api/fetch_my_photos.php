<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__. "/../config/db.php";
$photoStmt = $conn->prepare("SELECT * FROM  photos WHERE user_id = :id");
$photoStmt->bindValue(":id", $id, PDO::PARAM_INT);
$photoStmt->execute();
$photos = $photoStmt->fetchAll(PDO::FETCH_ASSOC);