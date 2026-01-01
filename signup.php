
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixora : Sign up Page</title>
    <link rel="shortcut icon" href="outils/favicons/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="signup_login.css">
    <link rel="stylesheet" href="fontawesome/fontawesome/css/all.min.css">
</head>

<body id="signup_page">
    <div class="dv1">
        <div class="dv1-0 signup_div">
            <div>
                Sign up Page
            </div>
        </div>
        <div class="login-box text-center p-0 row">
            <div>
                <img src="outils/pngs/dark_logo.png" class="img-fluid" width="150px" alt="logo" title="Welcome to DeluxeGallery.">
            </div>
            <div class="text-start col">
                <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" id="signupForm" class="d-flex justify-content-center align-items-center row">
                    <div>
                        <div class="form-floating mb-2">
                            <input type="text" id="username" name="name" class="form-control" role="text"
                            placeholder="Type your name ..." required>
                            <label for="username" class="form-label">Username</label>
                            <i style="opacity: calc(0.6);">* Type just your name, we are generate it to special name for you</i>
                        </div>
                        <div class="form-floating mt-2 mb-2">
                            <input type="email" id="useremail" class="form-control" name="email" role="text"
                            placeholder="Type your email ..." required>
                            <label for="useremail" class="form-label">Email</label>
                        </div>
                        <div class="form-floating mt-2 mb-2">
                            <input type="password" id="userpass" class="form-control" name="password" role="text"
                            placeholder="Type your password ..." required>
                            <label for="userpass" class="form-label">Password</label>
                        </div>
                        <div class="mt-2 mb-2">
                            <input type="checkbox" class="form-check-input" role="checkbox" required> I agree to the <a href="#">Terms ans Conditions</a> and <a href="#">Privacy Policy</a>.
                        </div>
                        <div class="mt-2 mb-2">
                            You have a account ? <a href="login.php">Login</a>
                        </div>
                        <div class="mt-2 mb-2">
                            <button type="submit" class="btn w-100" id="signupButton" title="Click for sign up.">Sign up</button>
                        </div>
                        <?php if(!empty($_SESSION['signerr'])): ?>
                            <div class="container text-light p-3 bg-danger">
                                <?= $_SESSION['signerr']; ?>
                            </div>
                            <?php unset($_SESSION['signerr']); ?>
                        <?php endif; ?>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>