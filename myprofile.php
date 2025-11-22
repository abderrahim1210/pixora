<?php
include "db.php";
session_start();

$id = intval($_SESSION['px_id'] ?? $_COOKIE['px_userid']);
if (!isset($id) || !is_numeric($id)) {
    $_SESSION['dberr'] = "You have to logged first for display dasheboard.";
    header("Location:login.php");
    exit();
}


$info = $conn->prepare("SELECT * FROM users WHERE id = :id");
$info->bindValue(":id", $id, PDO::PARAM_INT);
$info->execute();
$infos = $info->fetch();

include "statistics_profile.php";
include "fetch_my_photos.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixora | My Profile : <?= $_SESSION['px_name'] ?? $_COOKIE['px_username']; ?></title>
    <link rel="shortcut icon" href="outils/favicons/favicon.jpg" type="image/x-icon">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="dashboard.css">
    <link rel="stylesheet" href="navbar.css">
    <link rel="stylesheet" href="fontawesome/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="bsicons/bsicons/bootstrap-icons.min.css">
    <!-- <link rel="stylesheet" href="bootstrap/css/bootstrap-select.min.css"> -->
    <link rel="stylesheet" href="sweetalert/sweetalert2.min.css">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <link rel="stylesheet" href="select2/select2.min.css">
</head>

<body>
    <?php if (!empty($_SESSION['biomess'])): ?>
        <div class="alert mt-2 mb-2">
            <?= $_SESSION['biomess']; ?>
            <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
            <?php unset($_SESSION['biomess']); ?>
        </div>
    <?php endif; ?>
    <?php if (!empty($_SESSION['delmess'])): ?>
        <div class="alert mt-2 mb-2">
            <?= $_SESSION['delmess']; ?>
            <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
            <?php /* unset($_SESSION['delmess']); */ ?>
        </div>
    <?php endif; ?>
    <?php if (!empty($_SESSION['upload_mess'])): ?>
        <div class="alert mt-2 mb-2">
            <?= $_SESSION['upload_mess']; ?>
            <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
        </div>
        <?php unset($_SESSION['upload_mess']); ?>
    <?php endif; ?>
    <?php if (!empty($_SESSION['edit_profile'])): ?>
        <div class="alert mt-2 mb-2">
            <?= $_SESSION['edit_profile']; ?>
            <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
        </div>
        <?php unset($_SESSION['edit_profile']); ?>
    <?php endif; ?>
    <main>
        <?php include "navbar.php"; ?>
        <div class="modal fade" id="bio" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
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
            <div class="modal-dialog modal-dialog-centered">
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
        <div class="modal fade" id="up_name" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1>Edit username</h1>
                    </div>
                    <div class="modal-body">
                        <div>
                            <label for="editName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="editName" value="<?= $infos['username']; ?>">
                            <button type="button" class="btn mt-2 mb-2" id="update_name">Update name</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="up_location" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1>Edit location</h1>
                    </div>
                    <div class="modal-body">
                        <div>
                            <label for="editLocation" class="form-label">Location</label>
                            <input type="text" class="form-control" id="editLocation" value="<?= $infos['location']; ?>">
                            <button type="button" class="btn mt-2 mb-2" id="update_location">Update location</button>
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
                <!-- <button type="button" class="btn d-md-none" data-bs-toggle="collapse" data-bs-target="#demo" id="collapseButton"><i class="fas fa-bars"></i></button> -->
                <nav class="navbar navbar-expand nav2 sticky-top" id="demo">
                    <div class="mx-auto">
                        <ul class="nav">
                            <li class="nav-item"><a data-bs-target="#info" data-bs-toggle="tab" class="nav-link active"><i class="fas fa-id-card"></i> personal informations</a></li>
                            <li class="nav-item"><a data-bs-target="#editProfile" data-bs-toggle="tab" class="nav-link"><i class="fas fa-pencil"></i> edit profile</a></li>
                            <li class="nav-item"><a data-bs-target="#setting" data-bs-toggle="tab" class="nav-link"><i class="fas fa-gear"></i> settings</a></li>
                            <li class="nav-item"><a data-bs-target="#statistics" data-bs-toggle="tab" class="nav-link"><i class="fas fa-chart-line"></i> statistics</a></li>
                        </ul>
                    </div>
                </nav>
                <div class="tab-content">
                    <div class="mt-2 mb-2 tab-pane fade show active" id="info">
                        <!-- <a href="#">
                        <h2><i class="fas fa-user-circle"></i> <u><?= $infos['username']; ?></u></h2>
                    </a> -->
                        <div class="d-flex justify-content-start align-items-center mt-2 mb-3" style="flex-direction: column;gap:5px;">
                            <div class="container-fluid p-0 profileImages">
                                <div class="coverImage">
                                    <div class="d-flex justify-content-center">
                                        <input type="file" class="d-none" name="coverFile" id="cover_file" accept=".jpg, .png, .jpeg">
                                        <i class="fas fa-camera" id="importCover"></i>
                                    </div>
                                </div>
                                <div class="profileImage">
                                    <input type="file" class="d-none" name="profileImage" id="profile_img" accept=".png, .jpg">
                                    <img src="outils/pngs/useracc2.png" width="100px" class="img_acc" id="imgAcc" alt="<?= $_SESSION['px_name'] ?? $_COOKIE['px_username']; ?>" title="<?= $_SESSION['px_name'] ?? $_COOKIE['px_username']; ?>">
                                </div>
                            </div>
                        </div>
                        <div class="photo-info-card w-100">
                            <div class="information">
                                <div>
                                    <h3 class="fw-semibold mb-1"><?= $infos['display_name']; ?></h3>
                                </div>
                                <div>
                                    <p class="mb-1" style="text-decoration: underline;" data-bs-toggle="tooltip" title="View in map"><i id="location_icon" class="fas fa-location-dot"></i> <?= $infos['country'] ?? ""; ?></p>
                                </div>
                                <div>
                                    <p class="mb-1">@<?= $infos['username']; ?></p>
                                </div>
                                <!-- <div>
                                <p><?= $infos['email']; ?></p>
                            </div> -->
                                <div>
                                    <p><?= isset($infos['bio']) ? $infos['bio'] : ""; ?></p>
                                </div>
                            </div>
                            <div class="container statistic_profile">
                                <div>
                                    <?= $follower; ?> Followers
                                </div>
                                <div>
                                    <?= $following; ?> Following
                                </div>
                                <div>
                                    <?= $likes; ?> Likes
                                </div>
                                <div>
                                    <?= $photos_count; ?> Photos
                                </div>
                            </div>
                            <div class="social_media mt-2 mb-2">
                                <div>
                                    <a href="#" id="facebookIcon">
                                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <title>Facebook</title>
                                            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                                        </svg>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" id="instagramIcon">
                                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <title>Instagram</title>
                                            <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                                        </svg>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" id="xIcon">
                                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <title>X</title>
                                            <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div class="container-fluid pm-button mt-3">
                                <a href="myphotos.php" class="btn" id="managePhotos">manage my photos</a>
                            </div>
                            <div class="container-fluid">
                                <div class="myphotos mb-3">
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
                                <a href="#" style="text-decoration: underline;">Show more</a>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade show" id="editProfile">
                        <div class="card-info">
                            <div class="mt-5 mx-auto">
                                <input type="file" class="d-none" name="profileImage" id="profile_img" accept=".png, .jpg">
                                <img src="outils/pngs/useracc2.png" width="100px" class="img_acc mt-2 mb-2" id="imgAcc" alt="<?= $_SESSION['px_name'] ?? $_COOKIE['px_username']; ?>" data-bs-toggle="tooltip" title="<?= $_SESSION['px_name'] ?? $_COOKIE['px_username']; ?>">
                                <div class="d-flex justify-content-center align-items-center gap-3 text-center profile_actions mx-auto">
                                    <a href="#">
                                        <i class="fas fa-pencil"></i>
                                    </a>
                                    <a href="#">
                                        <i class="fas fa-trash"></i>
                                    </a>
                                </div>
                            </div>

                            <div id="edit_profile">
                                <h2 class="text-center fw-bold">Account center</h2>
                                <div class="d-flex justify-content-end align-items-center">
                                    <button type="button" class="btn tooltip-tab" id="editInfos" title="Edit"><i class="fas fa-pencil"></i></button>
                                </div>
                                <form action="edit_profile.php" id="editProfileForm" method="post">
                                    <input type="hidden" name="user_id" value="<?= $infos['id']; ?>">
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            <strong>Username</strong>
                                            <div class="display-div">
                                                <p><?= $infos['username']; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <input type="text" class="form-control" name="update_name" id="username" onkeyup="checkName()" value="<?= $infos['username']; ?>">
                                                <span id="err_username"></span>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Display name</strong>
                                            <div class="display-div">
                                                <p><?= $infos['display_name'] ?? '..'; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <input type="text" class="form-control" name="update_dname" onkeyup="checkDname()" id="userdname" value="<?= $infos['display_name']; ?>">
                                                <span id="err_dname"></span>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Email</strong>
                                            <div class="display-div">
                                                <p><?= $infos['email']; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <input type="email" class="form-control" name="update_email" id="useremail" onkeyup="checkEmail()" value="<?= $infos['email']; ?>">
                                                <span id="err_useremail"></span>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Phone number</strong>
                                            <div class="display-div">
                                                <p><?= $infos['phone_number'] ?? '..'; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <input type="tel" class="form-control" name="update_phone" onkeyup="checkPhone()" id="userphone" value="<?= $infos['phone_number']; ?>">
                                                <span id="err_userphone"></span>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Bio</strong>
                                            <div class="display-div">
                                                <p><?= $infos['bio'] ?? '..'; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <textarea name="update_bio" id="bio" class="form-control" rows="1"><?= $infos['bio']; ?></textarea>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Birthay</strong>
                                            <div class="display-div">
                                                <p><?= $infos['birth_date']; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <input type="date" class="form-control" name="update_birth" id="editBirthDate" value="<?= $infos['birth_date']; ?>">
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Gender</strong>
                                            <div class="display-div">
                                                <p><?= $infos['gender'] ?? '..'; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <select class="form-control" name="update_gender" id="update_gender">
                                                    <option value="<?= $infos['gender'] ?>" hidden><?= $infos['gender']; ?></option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Country</strong>
                                            <div class="display-div">
                                                <p><?= $infos['country'] ?? ".."; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <div class="dropdown">
                                                    <button type="button" class="form-control text-start" data-bs-toggle="dropdown" id="countryBtn" aria-expanded="false">
                                                        Select a country
                                                    </button>
                                                    <ul class="dropdown-menu" id="countryListe"></ul>
                                                    <input type="hidden" name="update_location" id="selectedCountry" value="<?= $infos['country'] ?>">
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="d-flex justify-content-end align-items-center mb-2">
                                        <button type="reset" class="btn tooltip-tab d-none" id="resetInfos" title="Reset all changes"><i class="fas fa-sync"></i></button>
                                    </div>
                                    <button type="submit" class="btn w-100 disabled" id="saveChangeBtn">Save changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade show" id="setting">
                        <section class="settings-page container mt-4 mb-5">
                            <h2>Setting</h2>
                            <div class="settings-group mb-4">
                                <h5 class="text-secondary mb-3"><i class="fa-solid fa-user-cog me-2"></i>Account</h5>
                                <div class="setting-card">
                                    <div class="setting-info">
                                        <i class="fa-solid fa-lock"></i>
                                        <div>
                                            <h6>Change Email & Password</h6>
                                            <p>Update your account email address or password securely.</p>
                                        </div>
                                    </div>
                                    <a href="edit_account.php" class="btn btn-sm">Edit</a>
                                </div>
                            </div>
                            <div class="settings-group mb-4">
                                <h5 class="text-secondary mb-3"><i class="fa-solid fa-paintbrush me-2"></i>Display & Theme</h5>
                                <div class="setting-card">
                                    <div class="setting-info">
                                        <i class="fa-solid fa-moon"></i>
                                        <div>
                                            <h6>Theme</h6>
                                            <p>Switch between light and dark mode.</p>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-sm">Change</button>
                                </div>
                            </div>
                            <div class="settings-group mb-4">
                                <h5 class="text-secondary mb-3"><i class="fa-solid fa-shield-halved me-2"></i>Security</h5>
                                <div class="setting-card">
                                    <div class="setting-info">
                                        <i class="fa-solid fa-right-from-bracket"></i>
                                        <div>
                                            <h6>Log out</h6>
                                            <p>Sign out from your current session.</p>
                                        </div>
                                    </div>
                                    <a href="logout.php" class="btn btn-sm">Log out</a>
                                </div>
                                <div class="setting-card text-danger">
                                    <div class="setting-info">
                                        <i class="fa-solid fa-user-slash"></i>
                                        <div>
                                            <h6>Delete Account</h6>
                                            <p>Permanently remove your account and all data.</p>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-sm">Delete</button>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="tab-pane fade show" id="statistics">
                        <div class="mt-2 mb-2">
                            <h2>Statistics</h2>
                            <p>Track your progress and see how your profile evolves over time</p>
                            <div class="stat-container">
                                <div class="stat-card">
                                    <i class="fa-solid fa-user-plus"></i>
                                    <h3>Following</h3>
                                    <p><?= $following; ?></p>
                                </div>
                                <div class="stat-card">
                                    <i class="fa-solid fa-heart"></i>
                                    <h3>Likes</h3>
                                    <p><?= $likes; ?></p>
                                </div>
                                <div class="stat-card">
                                    <i class="fa-solid fa-users"></i>
                                    <h3>Followers</h3>
                                    <p><?= $follower; ?></p>
                                </div>
                                <div class="stat-card">
                                    <i class="fa-solid fa-camera"></i>
                                    <h3>Photos</h3>
                                    <p><?= $photos_count; ?></p>
                                </div>
                            </div>
                            <div class="container statisticsGraph">
                                <canvas id="statisticsChart" height="auto"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <?php include "footer_dashboard.php"; ?>
    <div class="container-fluid">
        <nav class="navbar navbar-expand fixed-bottom mx-auto nav3" role="tablist">
            <ul class="navbar-nav" id="ul3">
                <li class="nav-item"><a data-bs-target="#info" data-bs-toggle="tab" class="nav-link active tooltip-tab" title="Personal information"><i class="fas fa-id-card"></i></a></li>
                <li class="nav-item"><a data-bs-target="#editProfile" data-bs-toggle="tab" class="nav-link tooltip-tab" title="Edit profile"><i class="fas fa-pencil"></i></a></li>
                <li class="nav-item"><a data-bs-target="#setting" data-bs-toggle="tab" class="nav-link tooltip-tab" title="Setting"><i class="fas fa-gear"></i></a></li>
                <li class="nav-item"><a data-bs-target="#statistics" data-bs-toggle="tab" class="nav-link tooltip-tab" title="Statistics"><i class="fas fa-chart-line"></i></a></li>
            </ul>
        </nav>
    </div>



    <script>
        const inp = document.getElementById('importCover');
        inp.addEventListener('click', function() {
            document.getElementById('cover_file').click();
        });

        const inp1 = document.querySelector('.img_acc');
        inp1.addEventListener('click', function() {
            document.getElementById('profile_img').click();
        });
    </script>
    <script src="rotate_icon.js"></script>
    <script src="copyright.js"></script>
    <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="tooltip.js"></script>
    <script src="edit_informations.js"></script>
    <script src="sweetalert/sweetalert2.min.js"></script>
    <script src="edit_profile.js"></script>
    <!-- <script src="bootstrap/js/bootstrap-select.min.js"></script> -->
    <script src="select2/select2.min.js" defer></script>
    <script src="fetch_countries.js"></script>
    <script>
        /* $(document).ready(function() {
            $('#editLocation').select2({
                placeholder: "Select a country"
            });

            $.getJSON('./json/countries.json', function(countries) {
                countries.forEach(country => {
                    const option = new Option(country.name,country.id);
                    $('#editLocation').append(option);
                });
                $('#editLocation').trigger('change');
            });
        }); */
    </script>
    <script src="chart.js-4.5.1/package/dist/chart.umd.js"></script>
    <script>
        const ctx = document.getElementById('statisticsChart');
        const months = <?php echo json_encode($months); ?>;
        const likes = <?php echo json_encode($likesChart); ?>;
        const followers = <?php echo json_encode($followersChart); ?>;
        const followings = <?php echo json_encode($followingsChart); ?>;
        const photos = <?php echo json_encode($photosChart); ?>;
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                        label: 'Likes',
                        data: likes,
                        backgroundColor: 'rgba(255,77,109,0.7)',
                        borderRadius: 5
                    },
                    {
                        label: 'Followers',
                        data: followers,
                        backgroundColor: 'rgba(0,123,255,0.7)',
                        borderRadius: 5
                    },
                    {
                        label: 'Followings',
                        data: followings,
                        backgroundColor: 'rgba(0,200,83,0.7)',
                        borderRadius: 5
                    },
                    {
                        label: 'Photos',
                        data: photos,
                        backgroundColor: 'rgba(255,179,0,0.7)',
                        borderRadius: 5
                    }
                ]
            },
            options: {
                responsiv: true,
                plugin: {
                    title: {
                        display: true,
                        text: 'Likes, Followers, Followings & Photos Over Time',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        backgroundColor: '#333',
                        titleColor: '#fff',
                        bodyColor: '#fff'
                    }
                },
                scale: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 50
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    </script>
</body>

</html>