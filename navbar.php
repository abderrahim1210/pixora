<header class="d-flex d-sm-flex d-md-block">
    <nav class="navbar navbar-expand p-2 nav1">
        <div class="container-fluid d-flex">
            <ul class="navbar-nav me-auto" id="ul1">
                <li class="nav-item" title="Welcome to Pixora">
                    <a style="cursor: pointer;" onclick="return location.reload();"
                        class="nav-link nav-brand p-0 m-0">
                        <img src="outils/pngs/logo_styled.png" style="padding: 0%;width: 100px;;height: auto;margin: 0;"
                            id="logo">
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav d-none d-md-flex me-auto" id="ul2">
                <li class="nav-item">
                    <div class="dropdown">
                        <a href="#" class="nav-link dropdown-toggle dropdownIcon" data-bs-toggle="dropdown" aria-expanded="false" title="Menu">Discover <i class="fas fa-chevron-down drpIcon"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a href="dashboard.php" class="dropdown-item">popular photos</a></li>
                            <li><a href="#" class="dropdown-item" data-bs-target="#language" data-bs-toggle="modal">new & trending</a></li>
                            <li><a href="#" class="dropdown-item" data-bs-target="#cookies" data-bs-toggle="modal">collections</a></li>
                            <li><a href="#about" data-bs-target="#about" data-bs-toggle="tab" class="dropdown-item">categories</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <div class="dropdown">
                        <a href="#" class="nav-link dropdown-toggle dropdownIcon" data-bs-toggle="dropdown" aria-expanded="false" data-bs-toggle="dropdown" title="Menu">Photographers <i class="fas fa-chevron-down drpIcon"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a href="dashboard.php" class="dropdown-item">featured artists</a></li>
                            <li><a href="#" class="dropdown-item" data-bs-target="#language" data-bs-toggle="modal">top photographers</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <div class="dropdown">
                        <a href="#" class="nav-link dropdown-toggle dropdownIcon" data-bs-toggle="dropdown" aria-expanded="false" title="Menu">Menu <i class="fas fa-chevron-down drpIcon"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a href="myphotos.php" class="dropdown-item">my photos</a></li>
                            <li><a href="#" class="dropdown-item" data-bs-target="#language" data-bs-toggle="modal">site language</a></li>
                            <li><a href="#" class="dropdown-item" data-bs-target="#cookies" data-bs-toggle="modal">cookies</a></li>
                            <li><a href="#about" data-bs-target="#about" data-bs-toggle="tab" class="dropdown-item">contact us</a></li>
                            <li>
                                <a href="#" class="dropdown-item" data-bs-target="#about" data-bs-toggle="tab" title="About">About</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <div class="dropdown">
                        <a href="#" class="nav-link dropdown-toggle dropdownIcon" aria-expanded="false" data-bs-toggle="dropdown" title="Menu"><i class="fas fa-language"></i> <i class="fas fa-cheveron-down drpIcon"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a href="dashboard.php" class="dropdown-item">English</a></li>
                            <li><a href="#" class="dropdown-item" data-bs-target="#language" data-bs-toggle="modal">Arabic</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav d-none d-md-flex" id="ul2">
                <li class="nav-item"><a href="#" class="nav-link"
                        title="Notifications"><i class="bi bi-send"></i></a></li>
                <li class="nav-item"><a href="#" class="nav-link"
                        title="Notifications"><i class="bi bi-bell"></i></a></li>
                <li class="nav-item" id="upload_button"><a href="upload.php" class="nav-link"
                        title="Upload your photo"><i class="fas fa-arrow-up"></i> upload</a></li>
                <?php if (isset($_SESSION['px_id']) || isset($_COOKIE['px_userid'])): ?>
                    <?php
                        $stm = $conn -> prepare("SELECT * FROM users WHERE id = :id");
                        $stm -> bindValue(":id",$_SESSION['px_id'] ?? $_COOKIE['px_userid'],PDO::PARAM_INT);
                        $stm -> execute();
                        $user = $stm -> fetch(PDO::FETCH_ASSOC);
                        $img = basename($user['photo_profile']);
                    ?>
                    <div>
                        <img src="<?= !empty($img) ? 'profile_pictures/'.htmlspecialchars($img) : "outils/pngs/useracc2.png"; ?>" width="40px" height="auto" alt="" id="imgAcc"
                            title="My profil" onclick="window.open('myprofile.php','_self');">
                    </div>
                <?php else: ?>
                    <li class="nav-item"><a href="login.php" class="nav-link" title="Login">Login</a></li>
                    <li class="nav-item"><a href="signup.php" class="nav-link" id="signup" title="Signu up">Sign Up</a></li>
                <?php endif; ?>
            </ul>
        </div>
    </nav>
    <div class="modal fade" id="cookies" aria-hidden="true" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1>Cookies</h1>
                </div>
                <div class="modal-body">
                    <div>
                        <p>We use cookies to enhance your experience on <u>Pixora</u>, provide personalized content, and ensure the best performance of our website. By continuing to browse, you agree to our use of cookies.</p>
                        <a href="cookies.php" class="btn" id="acceptButton">Accept</a>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                </div>
            </div>
        </div>
    </div>
    <button type="button" class="btn d-md-none ms-auto" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDg"
        aria-controls="offcanvasDg" id="offcanvasButton">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="32" cy="32" r="29" stroke="currentColor" opacity="0.2" />
            <path d="M20 24h24" />
            <path d="M20 32h24" />
            <path d="M20 40h24" />
            <circle cx="48" cy="32" r="3" fill="currentColor" />
        </svg>
    </button>
    <div class="offcanvas offcanvas-end d-md-flex" tabindex="-1" id="offcanvasDg" aria-labelledby="offcanvasDg">
        <div class="offcanvas-header d-flex justify-content-between">
            <img src="outils/pngs/logo_styled.png" alt="logo" width="100px" height="auto"
                title="Welcome to DeluxeUpload" id="logo">
            <img src="outils/pngs/useracc.png" alt="logo" width="40px" height="auto" id="imgAcc"
                title="My Account" onclick="window.open('dasheboard.php','_self')">
        </div>
        <div class="container-fluid">
            <button id="btnClose" type="button" class="btn mt-2 mb-2 w-100 text-reset"
                data-bs-dismiss="offcanvas" aria-label="Close">Hide Bar</button>
        </div>
        <div class="offcanvas-body p-0">
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action" title="For you">
                    <i class="fas fa-heart"></i> for you
                </a>
                <a href="myprofil.php" class="list-group-item list-group-item-action" title="My profile">
                    <i class="fas fa-user"></i> my profile
                </a>
                <a href="#" class="list-group-item list-group-item-action" title="Site Language" data-bs-target="#language" data-bs-toggle="modal">
                    <i class="fas fa-language"></i> Language
                </a>
                <a href="#" class="list-group-item list-group-item-action" title="About">
                    <i class="fas fa-info-circle"></i> about
                </a>
                <a href="#" class="list-group-item list-group-item-action" title="Setting">
                    <i class="fas fa-palette"></i> theme
                </a>
                <a href="#" class="list-group-item list-group-item-action" title="Setting">
                    <i class="fas fa-language"></i> site language
                </a>
                <?php if (!empty($_SESSION['px_email']) || !empty($_COOKIE['px_useremail'])): ?>
                    <a href="#" class="list-group-item list-group-item-action" style="color:red;" title="For you">
                        <i class="fas fa-right-from-bracket"></i> logout
                    </a>
                    <a href="#" class="list-group-item list-group-item-action" title="For you">
                        <i class="fas fa-user-plus"></i> create new account
                    </a>
                <?php else: ?>
                    <button type="button" class="btn" role="button" id="login" onclick="switchTo('login')">login</button>
                    <button type="button" class="btn" role="button" id="signupButton" onclick="switchTo('signup')">signup</button>
                <?php endif; ?>
            </div>
        </div>
    </div>
</header>
<div class="modal fade" id="language" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1>Site Language</h1>
            </div>
            <div class="modal-body">
                <div>
                    <select name="" id="language" class="form-select">
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