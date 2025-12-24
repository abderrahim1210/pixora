<?php
include "db.php";
session_start();
$_SESSION['flash'] = [];
if (!isset($_GET['id'])) {
    $_SESSION['flash'][] = [
        'type' => 'error',
        'message' => 'Id not found.'
    ];
    header("Location:myphotos.php");
    exit();
}

if (!isset($_SESSION['px_id']) && !isset($_COOKIE['px_userid'])) {
    $_SESSION['flash'][] = [
        'type' => 'error',
        'message' => 'User not found.'
    ];
    header("Location:myphotos.php");
    exit();
}

$id = intval($_GET['id']);
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $new_category = htmlspecialchars($_POST['update_category'], ENT_QUOTES, "UTF-8");
    $stmt = $conn->prepare("SELECT id FROM categories WHERE name = :name LIMIT 1");
    $stmt->bindValue(":name", $new_category, PDO::PARAM_STR);
    $stmt->execute();
    $cat = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($cat) {
        $cat_id = $cat['id'];
    } else {
        $stmt = $conn->prepare("INSERT INTO categories (name) VALUES (:name)");
        $stmt->bindValue(":name", $new_category, PDO::PARAM_STR);
        $stmt->execute();
        $cat_id = $conn->lastInsertId();
    }
    $stmt = $conn->prepare("UPDATE photos SET category_id = :ncat WHERE id = :id");
    $stmt->bindParam(":ncat", $cat_id, PDO::PARAM_INT);
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    $stmt->execute();
    $new_description = htmlspecialchars($_POST['update_description'], ENT_QUOTES, "UTF-8");
    $stmt = $conn->prepare("UPDATE photos SET description = :ndescription WHERE id = :id");
    $stmt->bindParam(":ndescription", $new_description, PDO::PARAM_STR);
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    $stmt->execute();
    $new_title = htmlspecialchars($_POST['update_title'], ENT_QUOTES, "UTF-8");
    $stmt = $conn->prepare("UPDATE photos SET title = :ntitle WHERE id = :id");
    $stmt->bindParam(":ntitle", $new_title, PDO::PARAM_STR);
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    $stmt->execute();
    $new_vis = htmlspecialchars(trim($_POST['update_visibility']), ENT_QUOTES, "UTF-8");
    $stmt = $conn->prepare("UPDATE photos SET visibility = :nvis WHERE id = :id");
    $stmt->bindParam(":nvis", $new_vis, PDO::PARAM_STR);
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    $stmt->execute();
    $_SESSION['flash'][] = [
        'type' => 'error',
        'message' => 'Sauvegard successfully'
    ];
    header("Location:photo.php?id=$id");
    exit();
}
