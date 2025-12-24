<?php
    include "verify_for_comment.php";
    if($_SERVER['REQUEST_METHOD'] === "POST"){
        $ok = true;
        $comment_id = $_POST['comment_id'] ?? null;
        if(!$comment_id || !is_numeric($comment_id)){
            $ok = false;
            $_SESSION['flash'][] = [
                'type' => 'error',
                'message' => 'Comment not found' 
            ];
            header("Location:photo_preview.php?id=$photo_id");
            exit();
        }

        $find = $conn -> prepare("SELECT * FROM comments WHERE id = :id AND user_id = :user_id");
        $find -> bindValue(":id",$comment_id,PDO::PARAM_INT);
        $find -> bindValue(":user_id",$id,PDO::PARAM_INT);
        $find -> execute();
        $comment = $find -> fetch(PDO::FETCH_ASSOC);

        if(!$comment){
            $ok = false;
            $_SESSION['flash'][] = [
                'type' => 'error',
                'message' => 'You can not delete this comment'
            ];
            header("Location:photo_preview.php?id=$photo_id");
            exit();
        }

        if($ok){
            $del_comment = $conn -> prepare("DELETE FROM comments WHERE id = :id AND user_id = :user_id AND photo_id = :pid");
            $del_comment -> bindValue(":id",$comment_id,PDO::PARAM_INT);
            $del_comment -> bindValue(":user_id",$id,PDO::PARAM_INT);
            $del_comment -> bindValue(":pid",$photo_id,PDO::PARAM_INT);
            $del_comment -> execute();
            $_SESSION['flash'][] = [
                'type' => 'success',
                'message' => 'Comment deleted successfully' 
            ];
            header("Location:photo_preview.php?id=$photo_id");
            exit();
        }else{
            $_SESSION['flash'][] = [
                'type' => 'error',
                'message' => 'Comment not deleted' 
            ];
            header("Location:photo_preview.php?id=$photo_id");
            exit();
        }
    }
?>