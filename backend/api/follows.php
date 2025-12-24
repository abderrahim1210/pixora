<?php
    include "db.php";
    $uss = $conn -> prepare("SELECT * FROM users");
    $uss -> execute();
    $users_f = $uss -> fetchAll(PDO::FETCH_ASSOC);

    $id = intval($_SESSION['px_id'] ?? $_COOKIE['px_userid']);

    foreach($users_f as &$user_f){
        $stmt = $conn -> prepare("SELECT 1 FROM follows WHERE follower_id = :me AND following_id = :id");
        $stmt -> bindValue(":me",$id,PDO::PARAM_INT);
        $stmt -> bindValue(":id",$user_f['id'],PDO::PARAM_INT);
        $stmt -> execute();
        $isFollowing = $stmt -> rowCount() > 0;
        $btnText = $isFollowing ? "Followed" : "Follow";
        $btnClass = $isFollowing ? "active" : "";
    }
?>