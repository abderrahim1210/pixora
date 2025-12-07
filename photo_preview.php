<?php
include "db.php";
include "likes.php";
session_start();
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("Id not found.");
}

$id = intval($_GET['id']);
/* $sql = "SELECT * FROM photos WHERE id = :id";
$stmt = $conn->prepare($sql);
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$stmt->execute();
$photo = $stmt->fetch(); */

$us = $conn->prepare("SELECT * FROM users WHERE token = :tk");
$us->bindValue(":tk", $_COOKIE['px_user_token'] ?? null, PDO::PARAM_STR);
$us->execute();
$usr = $us->fetch(PDO::FETCH_ASSOC);
$userid = $usr['id'] ?? null;

$stm1 = $conn->prepare("SELECT p.id AS photo_id, p.user_id,p.category_id, p.title,p.description,p.filename,p.visibility,p.isLiked,p.location,p.upload_date,u.id AS user_id,u.username,u.email FROM photos p JOIN users u ON p.user_id = u.id WHERE p.id = :pid");
$stm1->bindValue(":pid", $id, PDO::PARAM_INT);
$stm1->execute();
$photo = $stm1->fetch(PDO::FETCH_ASSOC);
/* $stm = $conn->prepare("SELECT * FROM users WHERE id = :id");
$stm->bindParam(":id", $photo['user_id'], PDO::PARAM_INT);
$stm->execute();
$user = $stm->fetch(); */

$category = $conn->prepare("SELECT * FROM categories WHERE id = :id");
$category->bindValue(":id", $photo['category_id'], PDO::PARAM_INT);
$category->execute();
$cat_name = $category->fetch(PDO::FETCH_ASSOC);

if ($userid) {
    $lk = $conn->prepare("SELECT COUNT(*) FROM likes WHERE user_id = :userid AND photo_id = :photoid");
    $lk->bindValue(":userid", $userid, PDO::PARAM_INT);
    $lk->bindValue(":photoid", $photo['photo_id'], PDO::PARAM_INT);
    $lk->execute();
    $photo['isLiked'] = $lk->fetchColumn() > 0;
} else {
    $photo['isLiked'] = false;
}
$cnt = $conn->prepare("SELECT COUNT(*) FROM likes WHERE photo_id = :photoid");
$cnt->bindValue(":photoid", $photo['photo_id'], PDO::PARAM_INT);
$cnt->execute();
$totalLikes = $cnt->fetchColumn();

$comments = $conn->prepare("SELECT c.id ,c.photo_id, c.user_id, c.content, c.created_at, c.updated_at, u.username, u.photo_profile,u.email
FROM comments c
JOIN users u ON c.user_id = u.id
WHERE c.photo_id = :photo_id
ORDER BY c.created_at ASC");
$comments->bindValue(":photo_id", $photo['photo_id'], PDO::PARAM_INT);
$comments->execute();
$cs = $comments->fetchAll(PDO::FETCH_ASSOC);

include_once 'convert_date.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Photo Preview | Pixora</title>
    <link rel="shortcut icon" href="outils/favicons/favicon.jpg" type="image/x-icon">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="photo.css">
    <link rel="stylesheet" href="navbar.css">
    <link rel="stylesheet" href="bsicons/bsicons/bootstrap-icons.min.css">
    <link rel="stylesheet" href="fontawesome/fontawesome/css/all.min.css">
    <script src="Jquery File/jquery-3.7.1.min.js"></script>
    <link rel="stylesheet" href="Notyf/notyf.min.css">
</head>

<body>
    <?php include "navbar.php"; ?>
    <div class="container-fluid photo-page mt-3 mb-3">
        <div class="photo-viewer">
            <img src="photos/<?= $photo['filename']; ?>" width="100%" class="img-fluid" alt="<?= $photo['title']; ?>">
        </div>
        <div class="details-panel">
            <div class="socialActions">
                <div>
                    <input type="hidden" name="photo_id" value="<?= $photo['photo_id']; ?>">
                    <a href="#" class="likeButton <?= $photo['isLiked'] ? 'active' : '' ?>" data-photo-id="<?= $photo['photo_id']; ?>">
                        <i class="fas fa-heart"></i>
                        <!-- <span id="likes_count-<?= $photo['photo_id']; ?>"></span> --></a>
                </div>
                <div>
                    <a id="commentButton">
                        <i class="fa-solid fa-comment"></i>
                    </a>
                </div>
                <div>
                    <a href="#" id="shareButton">
                        <i class="fa-solid fa-share"></i>
                    </a>
                </div>
            </div>
            <ul class="list-group mt-3">
                <li>
                    <h4><?= $photo['title']; ?></h4>
                </li>
                <li>
                    <p><?= $photo['description']; ?></p>
                </li>
                <li>
                    <i class="fa-solid fa-calendar"></i>
                    <p><?= timeAgo($photo['upload_date']); ?></p>
                </li>
                <li>
                    <i class="fa-solid fa-user"></i>
                    <p><a href="#"><?= $photo['username']; ?></a></p>
                </li>
                <li>
                    <i class="fa-solid fa-tags"></i>
                    <p><?= $cat_name['name'] ?? ""; ?></p>
                </li>
                <li>
                    <i class="fa-solid fa-heart"></i>
                    <p><?= $totalLikes; ?> Likes</p>
                </li>
                <li>
                    <i class="fa-solid fa-comments"></i>
                    <p>..</p>
                </li>
                <li>
                    <i class="fa-solid fa-image"></i>
                    <p>...</p>
                </li>
                <li>
                    <i class="fa-solid fa-location-dot"></i>
                    <p>...</p>
                </li>
                <li>
                    <i class="fa-solid fa-photo-film"></i>
                    <p>...</p>
                </li>
            </ul>
            <div class="comments">
                <h5>Comments</h5>
                <form action="add_comments.php" class="comment-form" method="post">
                    <div class="input-group">
                        <textarea id="up_comment" name="comment_content" placeholder="Type your comment ..." class="form-control" rows="1" cols="1"></textarea>
                        <input type="hidden" name="photo_id" value="<?= $photo['photo_id']; ?>">
                        <button type="submit" class="btn btn-primary disabled" id="postBtn">Post</button>
                    </div>
                </form>
                <?php include "comments.php"; ?>
            </div>
        </div>
    </div>
    <script src="likes.js"></script>
    <script src="rotate_icon.js"></script>
    <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="Notyf/notyf.min.js"></script>
    <script src="notyf.js"></script>
    <script>
        document.getElementById('commentButton').addEventListener('click', () => {
            const inp = document.getElementById('up_comment');

            inp.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            setTimeout(() => {
                inp.focus();
            }, 400);
        })
        document.getElementById('up_comment').addEventListener('input', () => {
            if (document.getElementById('up_comment').value.trim() === "") {
                document.getElementById('postBtn').classList.add('disabled');
            } else {
                document.getElementById('postBtn').classList.remove('disabled');
            }
        });
    </script>
    <?php include 'sessions.php'; ?>
</body>

</html>