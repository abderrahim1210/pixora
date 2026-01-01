<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixora : Official Website</title>
    <link rel="shortcut icon" href="outils/favicons/favicon.jpg" type="image/x-icon">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="pixora.css">
    <link rel="stylesheet" href="navbar.css">
    <link rel="stylesheet" href="fontawesome/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="bsicons/bsicons/bootstrap-icons.min.css">
    <link rel="stylesheet" href="Notyf/notyf.min.css">
</head>

<body>
    <?php include "navbar.php"; ?>
    <div class="div2">
        <div class="container-fluid p-0">
            <h1>discover amazing photos on Pixora</h1>
            <p id="quote" class="mt-2 mb-2">Every photo tells a story. What’s yours?</p>
            <div class="div2-1">
                <div>
                    <input type="search" class="form-control" id="search" placeholder="Search for anything ..."
                        title="Search">

                    <button type="button" class="btn" id="searchButton" title="Click for search"><i
                            class="fas fa-search"></i></button>
                    <button type="button" class="btn" id="uploadButton" title="Click for upload your photos" onclick="window.open('upload.php','_self')"><i
                            class="fas fa-camera"></i></button>
                </div>
            </div>
        </div>
        <br>
    </div>
    <div class="sticky-top">
        <nav class="navbar navbar-expand nav2">
            <ul class="nav mx-auto">
                <li class="nav-item">
                    <a href="#" class="nav-link active" data-bs-target="#foryou" data-bs-toggle="tab" title="For you">For you</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-bs-target="#categories" data-bs-toggle="tab" title="Categories">Categories</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-bs-target="#photographers" data-bs-toggle="tab" title="Photographers">Photographers</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-bs-target="#about" data-bs-toggle="tab" title="About">About</a>
                </li>
            </ul>
        </nav>
    </div>
    <div class="tab-content">
        <div class="container-fluid tab-pane fade show active mt-3 mb-3" id="foryou">
            <h1 class="text-center fw-bold">For you</h1>
            <div class="photos">
                <?php foreach ($rows as &$row): ?>
                    <div class="modal fade" id="comments-<?= $row['id']; ?>" aria-hidden="true" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="fw-bold">Comments</h1>
                                </div>
                                <div class="modal-body">
                                    <form action="add_comments.php" class="comment-form" method="post">
                                        <input type="hidden" name="photo_id" value="<?= $row['id']; ?>">
                                        <div class="input-group">
                                            <textarea class="up_comment form-control" name="comment_content" placeholder="Type your comment ..." class="form-control" rows="1" cols="1"></textarea>
                                            <button type="submit" class="btn btn-primary postBtn disabled">Post</button>
                                        </div>
                                    </form>
                                    <hr>
                                    <div class="mt-3">
                                        <h4 class="fw-bold">All comments</h4>
                                        <?php
                                        $comments = $conn->prepare("SELECT c.id, c.photo_id, c.user_id, c.content, c.created_at, c.updated_at, u.username,u.photo_profile FROM comments c JOIN users u ON c.user_id = u.id WHERE c.photo_id = :photo_id ORDER BY c.created_at ASC");
                                        $comments->bindValue(":photo_id", $row['id'], PDO::PARAM_INT);
                                        $comments->execute();
                                        $cs = $comments->fetchAll(PDO::FETCH_ASSOC);
                                        ?>
                                        <?php include "comments.php"; ?>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <a id="caption" href="photo_preview.php?id=<?= $row['id']; ?>">
                            <div class="photo">
                                <img src="photos/<?= $row['filename']; ?>" oncontextmenu="return false" alt="photo">
                                <div class="info">
                                    <div>
                                        <h5><?= $row['title']; ?></h5>
                                    </div>
                                    <div>
                                        <input type="hidden" name="photo_id" value="<?= $row['id']; ?>">
                                        <a href="#" class="likeButton <?= $row['isLiked'] ? 'active' : '' ?>" data-photo-id="<?= $row['id']; ?>">
                                            <i class="fas fa-heart"></i>
                                            <span id="likes_count-<?= $row['id']; ?>"><?= $row['totalLikes']; ?></span>
                                        </a>
                                        <a href="#" data-bs-target="#comments-<?= $row['id']; ?>" data-bs-toggle="modal"><i class="fas fa-comment"></i></a>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="container-fluid tab-pane fade show mt-3 mb-3" id="categories">
            <h1>Categories</h1>
            <div class="container-fluid mt-3 mb-3">
                <div class="categories">
                    <div class="category">
                        <div class="image">
                            <div class="info1">
                                <a href="#">
                                    <h3>Nature</h3>
                                    <img src="outils/categories/nature.jpg" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <div class="image">
                            <div class="info1">
                                <h3>Animals</h3>
                                <img src="outils/categories/animals.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <div class="image">
                            <div class="info1">
                                <h3>Architecture</h3>
                                <img src="outils/categories/artchitecture.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <div class="image">
                            <div class="info1">
                                <h3>Landscape</h3>
                                <img src="outils/categories/landscape.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <div class="image">
                            <div class="info1">
                                <h3>People</h3>
                                <img src="outils/categories/peopl.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <div class="image">
                            <div class="info1">
                                <h3>Travel</h3>
                                <img src="outils/categories/travel.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <div class="image">
                            <div class="info1">
                                <h3>Technology</h3>
                                <img src="outils/categories/tech.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <div class="image">
                            <div class="info1">
                                <h3>Fantasy / Anime</h3>
                                <img src="outils/categories/fantasy.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <div class="image">
                            <div class="info1">
                                <h3>Food & Drinks</h3>
                                <img src="outils/categories/food.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <div class="image">
                            <div class="info1">
                                <h3>Cars</h3>
                                <img src="outils/categories/cars.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <div class="image">
                            <div class="info1">
                                <h3>Sports</h3>
                                <img src="outils/categories/sport.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <div class="image">
                            <div class="info1">
                                <h3>Abstract</h3>
                                <img src="outils/categories/abstract.jpg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid tab-pane fade show mt-3 mb-3" id="photographers">
            <h1 class="text-center">Photographers</h1>
            <div class="mt-3 mb-3 d-flex justify-content-center">
                <input type="search" name="" id="searchAtPhotographer" class="form-control" placeholder="Type name of photographer ...">
                <button type="button" class="btn searchButton2"><i class="fas fa-search"></i></button>
            </div>
            <div class="container-fluid div3">
                <?php foreach ($users as &$user): ?>
                    <?php if ($user['id'] == $userid) continue; ?>
                    <?php
                    $addFol = $conn->prepare("SELECT 1 FROM follows WHERE follower_id = :me AND following_id = :id");
                    $addFol->bindValue(":me", $userid, PDO::PARAM_INT);
                    $addFol->bindValue(":id", $user['id'], PDO::PARAM_INT);
                    $addFol->execute();
                    $isFollowing = $addFol->rowCount() > 0;
                    $btnText = $isFollowing ? "Followed" : "Follow";
                    $btnClass = $isFollowing ? "active" : "";
                    ?>
                    <div class="card photographers">
                        <div class="card-body">
                            <div class="mt-3 mb-3">
                                <img src="<?= (!empty($user['photo_profile']) ? 'profile_pictures/' . $user['photo_profile'] : 'outils/pngs/useracc2.png') ?>" id="imgAcc" width="100px" height="auto" alt="">
                            </div>
                            <div class="mt-3 mb-3">
                                <a href="profil_preview.php?id=<?= $user['id']; ?>"><?= $user['username']; ?></a>
                            </div>
                            <div class="mt-3 mb-3">
                                <button type="button" data-user_id="<?= $user['id']; ?>" class="followButton <?= $btnClass; ?> btn" id="followButton"><?= $btnText; ?></button>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="container-fluid tab-pane fade show mt-3 mb-3" id="about">
            <h1 class="text-center mt-2 mb-2">About Pixora</h1>
            <div class="container mt-2 mb-2">
                <p>At Pixora, we believe that every image has the power to inspire, to tell a story, and to connect people beyond borders. Founded with a passion for creativity and a vision to redefine the way photography and digital art are shared online, Pixora offers a premium platform where photographers, visual artists, and creative enthusiasts can showcase their work in the best possible light.

                    Our mission is to create a space that combines elegance, simplicity, and functionality. We provide artists with the tools they need to present their portfolios professionally, while offering audiences a seamless experience to explore, admire, and engage with high-quality visual content. Unlike conventional galleries, Pixora is designed to be a global hub — bringing together diverse perspectives, styles, and artistic expressions from every corner of the world.

                    We are committed to building a community where quality matters more than quantity. Every photograph on Pixora is more than just an image — it is a reflection of passion, dedication, and vision. By curating and highlighting exceptional work, we aim to celebrate not only photography as an art form, but also the people and stories behind each frame.

                    As Pixora continues to grow, we strive to remain a trusted destination for both creators and admirers of visual art. Whether you are here to showcase your portfolio, discover inspiration, or simply enjoy the beauty of photography, we welcome you to join us on this journey. Together, let’s make Deluxe Gallery a place where art lives, stories are told, and creativity knows no limits.</p>
            </div>
        </div>
    </div>
    <?php include "footer.php"; ?>
    <div class="container-fluid">
        <nav class="navbar mx-auto navbar-expand fixed-bottom nav3" role="tablist">
            <ul class="navbar-nav" id="ul3">
                <li class="nav-item"><a href="#" onclick="window.open('dasheboard.php','_self');" class="nav-link"><i class="fas fa-user"></i></a></li>
                <li class="nav-item"><a href="#" class="nav-link"><i class="fas fa-camera"></i></a></li>
                <li class="nav-item"><a href="#" class="nav-link"><i class="fas fa-cog"></i></a></li>
            </ul>
        </nav>
    </div>

    <script src="transfer.js"></script>
    <script src="rotate_icon.js"></script>
    <script src="likes.js"></script>
    <script src="follows.js" defer></script>
    <script src="quotes.js" defer></script>
    <script src="copyright.js"></script>
    <script>
        document.querySelectorAll('.comment-form').forEach(form => {
            const textarea = form.querySelector('.up_comment');
            const btn = form.querySelector('.postBtn');
            textarea.addEventListener('input', () => {
                if (textarea.value.trim() === "") {
                    btn.classList.add('disabled');
                } else {
                    btn.classList.remove('disabled');
                }
            });
        });
    </script>
    <script src="Notyf/notyf.min.js"></script>
    <script src="notyf.js"></script>
    <?php include 'sessions.php'; ?>
    <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>