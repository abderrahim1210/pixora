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
    <link rel="stylesheet" href="sweetalert/sweetalert2.min.css">
    <link rel="stylesheet" href="Choices js/choices.min.css">
    <script src="Jquery File/jquery-3.7.1.min.js"></script>
    <link rel="stylesheet" href="select2/select2.min.css">
    <link rel="stylesheet" href="LightGallery/lightgallery.min.css">
    <link rel="stylesheet" href="LightGallery/lightgallery-bundle.css">
    <link rel="stylesheet" href="Notyf/notyf.min.css">
</head>

<body>
    <div class="modal fade" id="profileSettings" aria-hidden="true" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div>
                        <ul class="list-group profile_settings">
                            <li class="list-group-item"><a href="#" onclick="document.getElementById('profile_img').click();"><i class="fas fa-upload"></i> Upload profile picture</a></li>
                            <li class="list-group-item"><a href="#" onclick="previewProfilePicture();"><i class="fas fa-eye"></i> Preview profile picture</a></li>
                            <li class="list-group-item deleteOption">
                                <form action="delete_profile_picture.php" id="delPhotoProfileForm" method="post">
                                    <a href="#" onclick="delProfilePhoto()"><i class="fas fa-trash"></i> Delete profile picture</a>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="coverSettings" aria-hidden="true" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div>
                        <ul class="list-group profile_settings">
                            <li class="list-group-item"><a href="#" onclick="document.getElementById('cover_file').click();"><i class="fas fa-upload"></i> Upload cover picture</a></li>
                            <li class="list-group-item"><a href="#" onclick="previewCoverPicture();"><i class="fas fa-eye"></i> Preview cover picture</a></li>
                            <li class="list-group-item deleteOption">
                                <form action="delete_cover_picture.php" id="delPhotoCoverForm" method="post">
                                    <a href="#" onclick="delCoverPhoto()"><i class="fas fa-trash"></i> Delete cover picture</a>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php if (!empty($pPicture)): ?>
        <div class="profilePreview" style="display: none;">
            <a href="profile_pictures/<?= $pPicture; ?>">
                <img src="profile_pictures/<?= $pPicture; ?>">
            </a>
        </div>
    <?php endif; ?>
    <?php if (!empty($infos['cover_image'])): ?>
        <div class="coverPreview" style="display: none;">
            <a href="cover_images/<?= $infos['cover_image']; ?>">
                <img src="cover_images/<?= $infos['cover_image']; ?>">
            </a>
        </div>
    <?php endif; ?>
    <main>
        <?php include "navbar.php"; ?>
        <div class="container-fluid">
            <div class="row div">
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
                        <div class="d-flex justify-content-start align-items-center mt-2 mb-3" style="flex-direction: column;gap:5px;">
                            <div class="container-fluid p-0 profileImages">
                                <div class="coverImage" style="
<?php if (!empty($infos['cover_image'])): ?>
background:url('cover_images/<?= $infos['cover_image'] ?>') fixed no-repeat;
<?php endif; ?>
">
                                    <div class="d-flex justify-content-center">
                                        <form action="up_cover_picture.php" id="coverPictureForm" method="post" enctype="multipart/form-data">
                                            <input type="file" class="d-none" name="coverFile" id="cover_file" accept=".png, .jpeg">
                                        </form>
                                        <i class="fas fa-camera" id="importCover"></i>
                                    </div>
                                </div>
                                <div class="profileImage">
                                    <form action="up_profile_picture.php" id="profilePictureForm" method="post" enctype="multipart/form-data">
                                        <input type="file" name="profileImage" class="d-none" id="profile_img" accept=".png, .jpeg">
                                    </form>
                                    <img src="<?= !empty($pPicture) ? 'profile_pictures/' . htmlspecialchars($pPicture) : 'outils/pngs/useracc2.png' ?>" width="100px" class="img_acc" id="imgAcc" alt="<?= $_SESSION['px_name'] ?? $_COOKIE['px_username']; ?>" title="<?= $_SESSION['px_name'] ?? $_COOKIE['px_username']; ?>">
                                </div>
                            </div>
                        </div>
                        <div class="photo-info-card w-100">
                            <div class="information">
                                <div>
                                    <h3 class="fw-semibold mb-1"><?= $infos['display_name']; ?></h3>
                                </div>
                                <div>
                                    <p class="mb-1 mx-auto" style="text-decoration: underline;width:max-content;cursor:pointer;" data-bs-toggle="tooltip" title="View in map"><i id="location_icon" class="fas fa-location-dot"></i> <?= $infos['country'] ?? ""; ?></p>
                                </div>
                                <div>
                                    <p class="mb-1">@<?= $infos['username']; ?></p>
                                </div>
                                <!-- <div>
                                <p><?= $infos['email']; ?></p>
                            </div> -->
                                <div>
                                    <p><?= isset($infos['bio']) ? $infos['bio'] : "This profile does not have any information yet."; ?></p>
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
                                <?php if (!empty($infos['facebook'])): ?>
                                    <div>
                                        <a href="<?= $infos['facebook']; ?>" id="facebookIcon">
                                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <title>Facebook</title>
                                                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                                            </svg>
                                        </a>
                                    </div>
                                <?php endif; ?>
                                <?php if (!empty($infos['instagram'])): ?>
                                    <div>
                                        <a href="<?= $infos['instagram']; ?>" id="instagramIcon">
                                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <title>Instagram</title>
                                                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                                            </svg>
                                        </a>
                                    </div>
                                <?php endif; ?>
                                <?php if (!empty($infos['x'])): ?>
                                    <div>
                                        <a href="<?= $infos['x']; ?>" id="xIcon">
                                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <title>X</title>
                                                <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
                                            </svg>
                                        </a>
                                    </div>
                                <?php endif; ?>
                                <?php if (!empty($infos['website'])): ?>
                                    <div>
                                        <a href="<?= $infos['website']; ?>" id="xIcon">
                                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <title>Website</title>
                                                <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 
                 12-5.383 12-12S18.617 0 12 0zm6.93 7h-3.478c-.282-1.43-.75-2.83-1.39-4.02A9.03 9.03 0 0 1 18.93 7zM12 2.06c.93 1.28 1.66 3.07 2.07 4.94H9.93c.41-1.87 1.14-3.66 2.07-4.94zM4.47 7h3.48c.28-1.43.75-2.83 1.39-4.02A9.03 9.03 0 0 0 4.47 7zM2.06 12c0-.69.07-1.36.2-2h4.03c-.05.66-.08 1.32-.08 2s.03 1.34.08 2H2.26c-.13-.64-.2-1.31-.2-2zm2.41 7h3.48c-.64-1.19-1.11-2.59-1.39-4.02A9.03 9.03 0 0 0 4.47 19zm5.46 2.94c-.93-1.28-1.66-3.07-2.07-4.94h4.14c-.41 1.87-1.14 3.66-2.07 4.94zM19.53 17h-3.48c.64 1.19 1.11 2.59 1.39 4.02A9.03 9.03 0 0 0 19.53 17zm2.41-5h-4.03c.05-.66.08-1.32.08-2s-.03-1.34-.08-2h4.03c.13.64.2 1.31.2 2s-.07 1.36-.2 2z" />
                                            </svg>
                                        </a>
                                    </div>
                                <?php endif; ?>
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
                    <div class="tab-pane fade show" id="editProfile">
                        <div class="card-info">
                            <div class="mt-5 mx-auto">
                                <input type="file" class="d-none" name="profileImage" id="profile_img" accept=".png, .jpg">
                                <img src="<?= !empty($pPicture) ? "profile_pictures/" . htmlspecialchars($pPicture) : "outils/pngs/useracc2.png" ?> ?>" width="100px" class="img_acc mt-2 mb-2" id="imgAcc1" alt="<?= $_SESSION['px_name'] ?? $_COOKIE['px_username']; ?>" data-bs-toggle="tooltip" title="<?= $_SESSION['px_name'] ?? $_COOKIE['px_username']; ?>">
                                <div class="d-flex justify-content-center align-items-center gap-3 text-center profile_actions mx-auto">
                                    <a href="#" onclick="<?php if (empty($pPicture)): ?>document.getElementById('profile_img').click();<?php else: ?>model.show();<?php endif; ?>">
                                        <i class="fas fa-pencil"></i>
                                    </a>
                                    <a href="#" onclick="delProfilePhoto()">
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
                                                <p><?= $infos['display_name']; ?></p>
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
                                                <p><?= $infos['phone_number']; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <input type="tel" class="form-control" name="update_phone" onkeyup="checkPhone()" id="userphone" value="<?= $infos['phone_number']; ?>">
                                                <span id="err_userphone"></span>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Bio</strong>
                                            <div class="display-div">
                                                <p><?= $infos['bio']; ?></p>
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
                                                <input type="date" class="form-control" name="update_birth" id="userbirth" value="<?= $infos['birth_date']; ?>">
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Gender</strong>
                                            <div class="display-div">
                                                <p><?= $infos['gender']; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <select class="form-control" name="update_gender" id="usergender">
                                                    <option value="<?= $infos['gender'] ?>" hidden><?= $infos['gender']; ?></option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Country</strong>
                                            <div class="display-div">
                                                <p><?= $infos['country']; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <div>
                                                    <select class="form-control" id="countrySelect"></select>
                                                    <input type="hidden" name="update_location" id="selectedCountry" value="<?= $infos['country'] ?>">
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Facebook</strong>
                                            <div class="display-div">
                                                <p class="fc"><?= $infos['facebook']; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <textarea name="face_link" id="facebook" class="form-control" rows="1" onkeyup="checkFace()"><?= $infos['facebook']; ?></textarea>
                                                <span id="err_face"></span>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Website</strong>
                                            <div class="display-div">
                                                <p class="wb"><?= $infos['website']; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <textarea name="website_link" id="website" class="form-control" rows="1" onkeyup="checkWebsite()"><?= $infos['website']; ?></textarea>
                                                <span id="err_website"></span>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>X</strong>
                                            <div class="display-div">
                                                <p class="xLink"><?= $infos['x']; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <textarea name="x_link" id="x" class="form-control" rows="1" onkeyup="checkX()"><?= $infos['x']; ?></textarea>
                                                <span id="err_x"></span>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Instagram</strong>
                                            <div class="display-div">
                                                <p class="itgm"><?= $infos['instagram']; ?></p>
                                            </div>
                                            <div class="edit-div">
                                                <textarea name="insta_link" id="instagram" class="form-control" rows="1" onkeyup="checkInsta()"><?= $infos['instagram']; ?></textarea>
                                                <span id="err_insta"></span>
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



    <script src="rotate_icon.js"></script>
    <script src="copyright.js"></script>
    <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="tooltip.js"></script>
    <script src="edit_informations.js"></script>
    <script src="sweetalert/sweetalert2.min.js"></script>
    <script src="edit_profile.js"></script>
    <script src="Choices js/choices.min.js"></script>
    <script src="select2/select2.min.js"></script>
    <script>
        const profileModal = document.getElementById('profileSettings');
        const model = new bootstrap.Modal(profileModal);
        const coverModal = document.getElementById('coverSettings');
        const cover_modal = new bootstrap.Modal(coverModal);
        const inp = document.getElementById('importCover');
        inp.addEventListener('click', function() {
            <?php if (empty($infos['cover_image'])): ?>
                document.getElementById('cover_file').click();
            <?php else: ?>
                cover_modal.show();
            <?php endif; ?>
        });

        const inp1 = document.querySelector('.img_acc');
        inp1.addEventListener('click', function() {
            <?php if (empty($pPicture)): ?>
                document.getElementById('profile_img').click();
            <?php else: ?>
                model.show();
            <?php endif; ?>
        });
    </script>
    <script>
        const form = document.getElementById('profilePictureForm');
        const input = document.getElementById('profile_img');
        input.addEventListener('change', (e) => {
            const file = input.files[0];
            if (!file) {
                Swal.fire(
                    'Error',
                    'Please select a file first',
                    'error'
                );
                return;
            }

            let maxSize = 10 * 10 * 1024;
            if (file.size > maxSize) {
                Swal.fire(
                    'Error',
                    'File too large !',
                    'error'
                );
                return;
            }

            const reader = new FileReader();
            reader.onload = e => {
                Swal.fire({
                    title: 'Are you sure ?',
                    html: `
                    <img src="${e.target.result}" style="width:400px;border-radius:10px;" class="img-fluid">
                    <p class='mt-2'>Please confirm your selection before uploading.</p>
                    `,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes , upload it',
                    confirmButtonColor: 'rgb(0, 120, 255)',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        form.submit();
                    } else {
                        input.value = "";
                    }
                });
            }
            reader.readAsDataURL(file);

        });

        function delProfilePhoto() {
            Swal.fire({
                title: "Are you sure ?",
                icon: "question",
                text: "Are you sure for delete your profile picture ?",
                showCancelButton: true,
                confirmButtonText: 'Yes , delete it',
                confirmButtonColor: '#d93025',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById('delPhotoProfileForm').submit();
                }
            });
        }

        function delCoverPhoto() {
            Swal.fire({
                title: "Are you sure ?",
                icon: "question",
                text: "Are you sure for delete your cover picture ?",
                showCancelButton: true,
                confirmButtonText: 'Yes , delete it',
                confirmButtonColor: '#d93025',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById('delPhotoCoverForm').submit();
                }
            })
        }

        const coverForm = document.getElementById('coverPictureForm');
        const coverInput = document.getElementById('cover_file');
        coverInput.addEventListener('change', (e) => {
            const cover_file = coverInput.files[0];
            if (!cover_file) {
                Swal.fire(
                    'Error',
                    'Please select a file first',
                    'error'
                );
                return;
            }

            let maxSize = 10 * 1024 * 1024;
            if (cover_file.size > maxSize) {
                Swal.fire(
                    'Error',
                    'File too large !',
                    'error'
                );
                return;
            }

            const reader = new FileReader();
            reader.onload = e => {
                Swal.fire({
                    title: 'Are you sure ?',
                    html: `
                    <img src="${e.target.result}" style="width:400px;border-radius:10px;" class="img-fluid">
                    <p class='mt-2'>Please confirm your selection before uploading.</p>
                    `,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes , upload it',
                    confirmButtonColor: 'rgb(0, 120, 255)',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        coverForm.submit();
                    } else {
                        coverInput.value = "";
                    }
                });
            }
            reader.readAsDataURL(cover_file);

        });
    </script>
    <script src="fetch_countries.js"></script>
    <script src="LightGallery/lightgallery.min.js"></script>
    <script src="LightGallery/lg-zoom.umd.js"></script>
    <script src="LightGallery/lg-thumbnail.umd.js"></script>
    <script>
        const profilePreviewGallery = document.querySelector('.profilePreview');
        const coverPreviewGallery = document.querySelector('.coverPreview');
        lightGallery(profilePreviewGallery, {
            plugins: [lgZoom, lgThumbnail],
            speed: 300,
            download: false,
            mode: 'lg-fade',
            zoom: true,
            thumbnail: true,
            dragToClose: true,
            drag: true
        });
        lightGallery(coverPreviewGallery, {
            plugins: [lgZoom, lgThumbnail],
            speed: 300,
            download: false,
            mode: 'lg-fade',
            zoom: true,
            thumbnail: true,
            dragToClose: true
        });

        function previewProfilePicture() {
            profilePreviewGallery.querySelector('a').click();
        }

        function previewCoverPicture() {
            coverPreviewGallery.querySelector('a').click();
        }
    </script>
    <script src="Notyf/notyf.min.js"></script>
    <script src="notyf.js"></script>
    <?php include 'sessions.php'; ?>
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