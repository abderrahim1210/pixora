<?php
    include 'verify_for_comment.php';
    if($_SERVER['REQUEST_METHOD'] === "POST"){
        $ok = true;
        $content = trim($_POST['comment_content']);
        if($content === ''){
            $_SESSION['flash'][] = [
                'type' => 'error',
                'message' => 'Comment not added by empty' 
            ];
            header("Location:photo_preview.php?id=$photo_id");
            exit();
            $ok = false;
        }

        if($ok){
            $add_comment = $conn -> prepare("INSERT INTO comments (photo_id,user_id,content) VALUES (:photo_id,:user_id,:content)");
            $add_comment -> bindValue(":photo_id",$photo_id,PDO::PARAM_INT);
            $add_comment -> bindValue(":user_id",$id,PDO::PARAM_INT);
            $add_comment -> bindValue(":content",$content,PDO::PARAM_STR);
            $add_comment -> execute();
            $_SESSION['flash'][] = [
                'type' => 'success',
                'message' => 'Comment added successfully'
            ];
            header("Location:photo_preview.php?id=$photo_id");
            exit();
        }else{
            $_SESSION['flash'][] = [
                'type' => 'error',
                'message' => 'Comment added failed'
            ];
            header("Location:photo_preview.php?id=$photo_id");
            exit();
        }
    }
?>