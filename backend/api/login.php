<?php
include "log-in.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deluxe Gallery : Login Page</title>
    <link rel="shortcut icon" href="outils/favicons/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="signup_login.css">
    <link rel="stylesheet" href="fontawesome/fontawesome/css/all.min.css">
</head>

<body id="login_page">
    <?php if (!empty($_SESSION['signsucc'])): ?>
        <div class="alert alert-success m-0">
            <?= $_SESSION['signsucc']; ?>
            <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
        </div>
        <?php unset($_SESSION['signsucc']); ?>
    <?php endif; ?>
    <?php if (!empty($_SESSION['logoutmess'])): ?>
        <div class="alert alert-success m-0">
            <?= $_SESSION['logoutmess']; ?>
            <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
        </div>
        <?php unset($_SESSION['logoutmess']); ?>
    <?php endif; ?>
    <?php if (!empty($_SESSION['cookieerr'])): ?>
        <div class="alert mt-2 mb-2">
            <?= $_SESSION['cookieerr']; ?>
            <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
            <?php unset($_SESSION['cookieerr']); ?>
        </div>
    <?php endif; ?>
    <div class="dv1">
        <div class="dv1-0 login_div">
            <div>
                Login Page
            </div>
            <!-- <video class="bg-video" autoplay muted loop>
                <source src="outils/videos/video_back.mp4">
            </video> -->
        </div>
        <div class="login-box text-center p-0 row">
            <div>
                <img src="outils/pngs/dark_logo.png" class="img-fluid" width="150px" alt="logo" title="Welcome to DeluxeGallery.">
            </div>
            <div class="text-start col">
                <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" id="signupForm" class="d-flex justify-content-center align-items-center row">
                    <div>
                        <div class="form-floating mt-2 mb-2">
                            <input type="email" id="useremail" class="form-control" name="useremail" role="text"
                                placeholder="Type your email ...">
                            <label for="useremail" class="form-label">Email</label>
                        </div>
                        <div class="form-floating mt-2 mb-2">
                            <input type="password" id="userpass" class="form-control" name="userpass" role="text"
                                placeholder="Type your password ...">
                            <label for="userpass" class="form-label">Password</label>
                        </div>
                        <div class="mt-2 mb-2">
                            You don't have a account ? <a href="signup.php">Sign up</a>
                        </div>
                        <div class="mt-2 mb-2">
                            <button type="submit" class="btn w-100" id="signupButton" title="Click for login.">Login</button>
                        </div>
                        <?php if (!empty($_SESSION['logerr'])): ?>
                            <div class="mt-2 mb-2">
                                <div class="container text-light bg-danger p-3">
                                    <?= $_SESSION['logerr']; ?>
                                </div>
                                <?php unset($_SESSION['logerr']); ?>
                            </div>
                        <?php endif; ?>
                        <?php if (!empty($_SESSION['dberr'])): ?>
                            <div class="mt-2 mb-2">
                                <div class="container text-light bg-danger p-3">
                                    <?= $_SESSION['dberr']; ?>
                                </div>
                                <?php unset($_SESSION['dberr']); ?>
                            </div>
                        <?php endif; ?>
                        <?php if (!empty($_SESSION['upErr'])): ?>
                            <div class="mt-2 mb-2">
                                <div class="container text-light bg-danger p-3">
                                    <?= $_SESSION['upErr']; ?>
                                </div>
                                <?php unset($_SESSION['upErr']); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>