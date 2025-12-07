<?php
include "db.php";
$photoStmt = $conn->prepare("SELECT * FROM  photos WHERE user_id = :id");
$photoStmt->bindValue(":id", $id, PDO::PARAM_INT);
$photoStmt->execute();
$photos = $photoStmt->fetchAll(PDO::FETCH_ASSOC);