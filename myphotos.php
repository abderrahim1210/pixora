<?php
include "db.php";
session_start();
if (!isset($_SESSION['px_id']) && !isset($_COOKIE['px_userid'])) {
    $_SESSION['dberr'] = "You have to logged first for display dasheboard.";
    header("Location:login.php");
    exit();
}


$id = $_SESSION['px_id'] ?? $_COOKIE['px_userid'];
$info = $conn->prepare("SELECT * FROM users WHERE id = :id");
$info->bindValue(":id", $id, PDO::PARAM_INT);
$info->execute();
$infos = $info->fetch();

include "fetch_my_photos.php";

$stm = $conn->prepare("SELECT COUNT(*) AS total_images FROM photos WHERE user_id = :usid");
$stm->bindValue(":usid", $id, PDO::PARAM_INT);
$stm->execute();
$totalImages = $stm->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixora | My Photos</title>
    <link rel="shortcut icon" href="outils/favicons/favicon.jpg" type="image/x-icon">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="dashboard.css">
    <link rel="stylesheet" href="navbar.css">
    <link rel="stylesheet" href="fontawesome/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="bsicons/bsicons/bootstrap-icons.min.css">
    </link>
    <link rel="stylesheet" href="RemixIcon-master/RemixIcon-master/fonts/remixicon.css">
    <script src="Jquery File/jquery-3.7.1.min.js"></script>
    <link rel="stylesheet" href="Notyf/notyf.min.css">
</head>

<body>
    <main>
        <?php include "navbar.php"; ?>
        <div class="modal fade" id="bio" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1>Add bio</h1>
                    </div>
                    <div class="modal-body">
                        <form action="add_bio.php?id=<?= $infos['id']; ?>" method="post">
                            <label for="bio" class="form-label">Bio</label>
                            <textarea name="bioProfil" id="bio" class="form-control"><?= $infos['bio']; ?></textarea>
                            <button type="submit" class="btn mt-2 mb-2" id="addBio">Add bio</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="lang" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1>Site Language</h1>
                    </div>
                    <div class="modal-body">
                        <div>
                            <label for="language" class="form-label">Language</label>
                            <select name="lang" id="language" class="form-select">
                                <option value="English">English</option>
                                <option value="Arabic">Arabic</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="theme" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1>Theme</h1>
                    </div>
                    <div class="modal-body">
                        <div class="form-switch">
                            <input type="checkbox" class="form-check-input"> Theme
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row div">
                <nav class="navbar navbar-expand nav2 sticky-top" id="demo">
                    <div class="mx-auto">
                        <ul class="nav">
                            <li class="nav-item"><a data-bs-target="#photos" data-bs-toggle="tab" class="nav-link active"><i class="fas fa-image"></i> my photos</a></li>
                            <li class="nav-item"><a data-bs-target="#licensing" data-bs-toggle="tab" class="nav-link"><i class="fas fa-certificate"></i> licsensing</a></li>
                            <li class="nav-item"><a data-bs-target="#likes" data-bs-toggle="tab" class="nav-link"><i class="fas fa-heart"></i> likes</a></li>
                            <li class="nav-item"><a data-bs-target="#galleries" data-bs-toggle="tab" class="nav-link"><i class="fas fa-images"></i> galeries</a></li>
                            <li class="nav-item"><a data-bs-target="#statistics" data-bs-toggle="tab" class="nav-link"><i class="fas fa-chart-line"></i> statistics</a></li>
                        </ul>
                    </div>
                </nav>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="photos">
                        <div class="mt-2 mb-2">
                            <h2>My photos <p class="d-inline text-primary">(<?= $totalImages['total_images']; ?> photos)</p>
                            </h2>
                        </div>
                        <div class="filter_bar">
                            <nav class="nav">
                                <li class="nav-item">
                                    <select name="" class="form-select" id="">
                                        <option value="default">Filter by <i class="fa-solid fa-filter"></i></option>
                                        <option value="date">Date</option>
                                        <option value="views">Views</option>
                                        <option value="likes">Likes</option>
                                        <option value="comments">Comments</option>
                                    </select>
                                </li>
                            </nav>
                        </div>
                        <div class="container-fluid">
                            <div class="myphotos mt-3 mb-3">
                                <?php foreach ($photos as $photo): ?>
                                    <div class="card">
                                        <div class="card-body p-0">
                                            <div class="image">
                                                <a href="photo.php?id=<?= $photo['id']; ?>">
                                                    <img src="photos/<?= $photo['filename']; ?>" class="img-fluid">
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between p-2">
                                                <div>
                                                    <h5><?= $photo['title']; ?></h5>
                                                </div>
                                                <div class="d-flex justify-content-center align-items-center">
                                                    <div>
                                                        <p><?= $photo['visibility']; ?></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                            <?php if ($photoStmt->rowCount() === 0): ?>
                                <div class="empty-content">
                                    <div class="mb-5">
                                        <i class="fa-solid fa-camera" onclick="window.location.href = 'upload.php'" style="cursor: pointer;"></i>
                                        <h4>No photos yet — start sharing your moments!</h4>
                                    </div>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php include "footer_dashboard.php"; ?>
    </main>
    <div class="container-fluid">
        <nav class="navbar navbar-expand fixed-bottom nav3 mx-auto" role="tablist">
            <ul class="navbar-nav" id="ul3">
                <li class="nav-item"><a data-bs-target="#photos" data-bs-toggle="tab" class="nav-link active tooltip-tab" title="My photos"><i class="fa-solid fa-image"></i></a></li>
                <li class="nav-item"><a data-bs-target="#licensing" data-bs-toggle="tab" class="nav-link tooltip-tab" title="Licensing"><i class="fa-solid fa-certificate"></i></a></li>
                <li class="nav-item"><a data-bs-target="#likes" data-bs-toggle="tab" class="nav-link tooltip-tab" title="Likes"><i class="fa-solid fa-heart"></i></a></li>
                <li class="nav-item"><a data-bs-target="#galleries" data-bs-toggle="tab" class="nav-link tooltip-tab" title="Galleries"><i class="fa-solid fa-images"></i></a></li>
                <li class="nav-item"><a data-bs-target="#statistics" data-bs-toggle="tab" class="nav-link tooltip-tab" title="Statistics"><i class="fa-solid fa-chart-line"></i></a></li>
            </ul>
        </nav>
    </div>
    <script src="rotate_icon.js"></script>
    <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="tooltip.js"></script>
    <script src="copyright.js"></script>
    <script src="Notyf/notyf.min.js"></script>
    <script src="notyf.js"></script>
    <?php include 'sessions.php'; ?>
</body>

</html>