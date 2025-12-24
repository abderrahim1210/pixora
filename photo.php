<?php
include "db.php";
include "likes.php";
session_start();
if ((!isset($_GET['id']) || !is_numeric($_GET['id']))) {
    die("Id not found.");
}

if (!isset($_SESSION['px_id']) && !isset($_COOKIE['px_useremail'])) {
    header("Location:login.php");
    exit();
}

$id = intval($_GET['id']);
$user_id = intval($_SESSION['px_id'] ?? $_COOKIE['px_userid']);
$sql = "SELECT * FROM photos WHERE id = :id";
$stmt = $conn->prepare($sql);
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$stmt->execute();
$photo = $stmt->fetch();

if (!$photo) {
    die("Photo not found.");
}

if ((int)$user_id !== (int)$photo['user_id']) {
    die("The photo it's not for you !");
}

$stm = $conn->prepare("SELECT * FROM users WHERE id = :id");
$stm->bindParam(":id", $photo['user_id'], PDO::PARAM_INT);
$stm->execute();
$user = $stm->fetch();

$userid = intval($_SESSION['px_id'] ?? $_COOKIE['px_userid']);

$likeCount = $conn->prepare("SELECT * FROM likes WHERE user_id = :userid AND photo_id = :photoid");
$likeCount->bindParam(":userid", $user, PDO::PARAM_INT);
$likeCount->bindParam(":photoid", $photo['id'], PDO::PARAM_INT);
$likeCount->execute();
$likes = $likeCount->fetch();

$category = $conn->prepare("SELECT * FROM categories WHERE id = :id");
$category->bindValue(":id", $photo['category_id'], PDO::PARAM_INT);
$category->execute();
$cat_name = $category->fetch();

$cnt = $conn->prepare("SELECT COUNT(*) FROM likes WHERE photo_id = :photoid");
$cnt->bindValue(":photoid", $photo['id'], PDO::PARAM_INT);
$cnt->execute();
$totalLikes = $cnt->fetchColumn();

$comments = $conn->prepare("SELECT c.id ,c.photo_id, c.user_id, c.content, c.created_at, c.updated_at, u.username,u.photo_profile
FROM comments c
JOIN users u ON c.user_id = u.id
WHERE c.photo_id = :photo_id
ORDER BY c.created_at ASC");
$comments->bindValue(":photo_id", $photo['id'], PDO::PARAM_INT);
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
    <link rel="stylesheet" href="fontawesome/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="bsicons/bsicons/bootstrap-icons.min.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="sweetalert/sweetalert2.min.css">
    <script src="Jquery File/jquery-3.7.1.min.js"></script>
    <link rel="stylesheet" href="Notyf/notyf.min.css">
</head>

<body>
    <?php include "navbar.php"; ?>
    <div class="container-fluid photo-page mt-3 mb-3">
        <div class="photo-viewer">
            <img src="photos/<?= $photo['filename']; ?>" oncontextmenu="return false" width="100%" class="img-fluid" alt="<?= $photo['title']; ?>">
        </div>
        <div class="details-panel">
            <ul class="list-group mt-3">
                <form action="edit_photo.php?id=<?= $id; ?>" method="post" id="photoForm">
                    <li class="d-flex justify-content-between">
                        <div class="display_div">
                            <h4><?= $photo['title']; ?></h4>
                        </div>
                        <div class="edit_div mb-1">
                            <div class="form-floating">
                                <textarea name="update_title" data-bs-toggle="tooltip" title="Edit title" id="title" class="form-control"><?= $photo['title']; ?></textarea>
                                <label for="title" class="form-label">Title</label>
                            </div>
                        </div>
                        <a href="#" id="editBtn"><i class="fas fa-pencil"></i>
                        </a>
                    </li>
                    <li>
                        <div class="display_div">
                            <p><?= $photo['description']; ?></p>
                        </div>
                        <div class="edit_div mb-1">
                            <div class="form-floating">
                                <textarea name="update_description" data-bs-toggle="tooltip" title="Edit description" id="description" class="form-control"><?= $photo['description']; ?></textarea>
                                <label for="description" class="form-label">Description</label>
                            </div>
                        </div>
                    </li>
                    <li>
                        <i class="fa-solid fa-calendar"></i>
                        <p><?= timeAgo($photo['upload_date']); ?></p>
                    </li>
                    <li>
                        <i class="fa-solid fa-user"></i>
                        <p><a href="#"><?= $user['username']; ?></a></p>
                    </li>
                    <li>
                        <i class="fa-solid fa-tags"></i>
                        <div class="display_div">
                            <p><?= $cat_name['name'] ?? ""; ?></p>
                        </div>
                        <div class="edit_div">
                            <textarea name="update_category" id="Category" data-bs-toggle="tooltip" title="Edit category" class="form-control" rows="1"><?= $cat_name['name'] ?? ""; ?></textarea>
                        </div>
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
                        <div class="display_div">
                            <p>...</p>
                        </div>
                        <div class="edit_div"></div>
                    </li>
                    <li>
                        <i class="fa-solid fa-location-dot"></i>
                        <div class="display_div">
                            <p>...</p>
                        </div>
                        <div class="edit_div">
                            ...
                        </div>
                    </li>
                    <li>
                        <i class="fa-solid fa-photo-film"></i>
                        <p>...</p>
                    </li>
                    <li>
                        <i class="fa-solid fa-eye"></i>
                        <div class="display_div">
                            <p><?= $photo['visibility']; ?></p>
                        </div>
                        <div class="edit_div">
                            <select name="update_visibility" data-bs-toggle="tooltip" title="Edit visibility" class="form-control">
                                <option value="Private" <?php if ($photo['visibility'] == "private") echo "selected"; ?>>Private</option>
                                <option value="Public" <?php if ($photo['visibility'] == "public") echo "selected"; ?>>Public</option>
                            </select>
                        </div>
                    </li>
                    <div class="d-flex justify-content-end align-items-center mb-2">
                        <button type="reset" class="btn tooltip-tab d-none" id="resetInfos" title="Reset all changes"><i class="fas fa-sync"></i></button>
                    </div>
                    <button type="submit" class="btn w-100 mb-2 disabled" id="saveChangeBtn">Save changes</button>
                </form>
                <form action="delete_photo.php" id="DelPhotoForm<?= $photo['id'] ?>" method="post">
                    <input type="hidden" name="photo_id" value="<?= $photo['id']; ?>">
                    <button type="button" onclick="delete_photo(<?= $photo['id']; ?>)" class="btn w-100" id="deletePhoto">Delete</button>
                </form>
            </ul>
            <div class="comments">
                <h5>Comments</h5>
                <?php include 'comments.php'; ?>
            </div>
        </div>
    </div>
    <?php include "footer_dashboard.php"; ?>

    <script src="copyright.js"></script>
    <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="bootstrap/js/bootstrap-select.min.js"></script>
    <script src="sweetalert/sweetalert2.min.js"></script>
    <script src="confirm-alert.js"></script>
    <script src="tooltip.js"></script>
    <script src="Notyf/notyf.min.js"></script>
    <script>
        const edit_button = document.getElementById('editBtn');
        const saveChanges = document.getElementById('saveChangeBtn');
        const resetChanges = document.getElementById('resetInfos');
        let isEditing = false;
        document.querySelectorAll('.edit_div').forEach(el => el.classList.add('d-none'));
        edit_button.addEventListener('click', () => {
            isEditing = !isEditing;
            document.querySelectorAll('.display_div').forEach(el => el.classList.toggle("d-none", isEditing));
            document.querySelectorAll('.edit_div').forEach(el => el.classList.toggle("d-none", !isEditing));

            edit_button.innerHTML = isEditing ? `<i class="fas fa-check"></i>` : `<i class="fas fa-pencil"></i>`;

            saveChanges.classList.toggle('disabled', !isEditing);
            saveChanges.classList.toggle('active', isEditing);

            resetChanges.classList.toggle('d-none', !isEditing);
            resetChanges.classList.toggle('d-block', isEditing);
        });
    </script>
</body>

</html>