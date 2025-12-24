<?php
include "db.php";
include "fn.php";
session_start();
if ((!isset($_SESSION['px_id']) || !is_numeric($_SESSION['px_id'])) && (!isset($_COOKIE['px_userid']) || (!is_numeric($_COOKIE['px_userid'])))) {
    $_SESSION['flash'] = "You have to logged first for upload a file.";
    header("Location:login.php");
    exit();
}

$userid = intval($_SESSION['px_id'] ?? $_COOKIE['px_userid']);
if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_FILES['photoFile'])) {
    $title = text_input($_POST['title']);
    $description = text_input($_POST['description']);
    $categorie = text_input($_POST['categorie']);

    $target_dir = "photos/";
    $target_file = $target_dir . basename($_FILES['photoFile']['name']);
    $uploadOk = true;

    $file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    if ($_FILES['photoFile']['size'] > (100 * 1024 * 1024)) {
        $_SESSION["flash"][] = [
            'type' => 'error',
            'message' => 'The files is large'
        ];
        $uploadOk = false;
        $_SESSION['statu'] = "Size problem";
    }

    $allowed = ['png', 'jpg', 'jpeg'];
    if (!in_array($file_type, $allowed)) {
        $_SESSION["flash"][] = [
            'type' => 'error',
            'message' => 'We are not allow this files'
        ];
        $uploadOk = false;
        $_SESSION['statu'] = "Type problem";
    }

    if ($uploadOk == true) {
        if (move_uploaded_file($_FILES["photoFile"]["tmp_name"], $target_file)) {
            $_SESSION['flash'][] = [
                'type' => 'success',
                'message' => 'Uploaded files successfully'
            ];
            $_SESSION['statu'] = "Okay";

            $stmt = $conn->prepare("SELECT id FROM categories WHERE name = :name LIMIT 1");
            $stmt->bindValue(":name", $categorie, PDO::PARAM_STR);
            $stmt->execute();
            $cat = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($cat) {
                $cat_id = $cat['id'];
            } else {
                $stmt = $conn->prepare("INSERT INTO categories (name) VALUES (:name)");
                $stmt->bindValue(":name", $categorie, PDO::PARAM_STR);
                $stmt->execute();
                $cat_id = $conn -> lastInsertId();
            }

            $sql = "INSERT INTO photos (user_id,title,description,filename,category_id) VALUES (:id,:title,:description,:filename,:cat_id)";
            $up = $conn->prepare($sql);
            $up->bindParam(":id", $userid, PDO::PARAM_INT);
            $up->bindParam(":title", $title, PDO::PARAM_STR);
            $up->bindParam(":description", $description, PDO::PARAM_STR);
            $up->bindParam(":filename", $_FILES['photoFile']['name'], PDO::PARAM_STR);
            $up -> bindParam(":cat_id",$cat_id,PDO::PARAM_INT);
            $up->execute();
            header("Location:myphotos.php");
            exit();
        }
    }
}
