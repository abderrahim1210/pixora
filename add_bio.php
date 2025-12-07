<?php
    include "db.php";
    session_start();
    if(!isset($_GET['id']) || !is_numeric($_GET['id'])){
        die('User not found.');
        exit();
    }

    $id = intval($_GET['id']);
    $bio = htmlspecialchars(trim($_POST['bioProfil']),ENT_QUOTES, 'UTF-8');
    $stmt = $conn -> prepare("UPDATE users SET bio = :bio WHERE id = :id");
    $stmt -> bindParam(":bio",$bio,PDO::PARAM_STR);
    $stmt -> bindParam(":id",$id,PDO::PARAM_INT);
    $stmt -> execute();
    $_SESSION['flash'][] = [
        'type' => 'success',
        'message' => 'Bio added successfully'
    ];
    header("Location:myphotos.php");
    exit();
?>