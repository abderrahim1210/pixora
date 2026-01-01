<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixora : Upload Photo</title>
    <link rel="shortcut icon" href="outils/favicons/favicon.jpg" type="image/x-icon">
    <link rel="stylesheet" href="bs-stepper/bs-stepper.min.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="navbar.css">
    <link rel="stylesheet" href="upload.css">
    <link rel="stylesheet" href="fontawesome/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="bsicons/bsicons/bootstrap-icons.min.css">
</head>

<body>
    <div class="dv1">
        <div class="upload-box text-center">
            <div class="mt-5 mb-3">
                <img src="outils/pngs/logo_styled.png" class="img-fluid mt-5" width="150px" alt="logo" title="Welcome to Pixora.">
            </div>
            <form action="<?= htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" enctype="multipart/form-data" id="photosForm" novalidate>
                <div class="bs-stepper" id="stepper">
                    <div class="bs-stepper-header">
                        <div class="step" data-target="#step1">
                            <button class="step-trigger">
                                <span class="bs-stepper-circle">1</span>
                                <span class="bs-stepper-label">Type</span>
                            </button>
                        </div>
                        <div class="line"></div>
                        <div class="step" data-target="#step2">
                            <button class="step-trigger">
                                <span class="bs-stepper-circle">2</span>
                                <span class="bs-stepper-label">Upload</span>
                            </button>
                        </div>
                        <div class="line"></div>
                        <div class="step" data-target="#step3">
                            <button class="step-trigger">
                                <span class="bs-stepper-circle">3</span>
                                <span class="bs-stepper-label">Details</span>
                            </button>
                        </div>
                        <div class="line"></div>
                        <div class="step" data-target="#step4">
                            <button class="step-trigger">
                                <span class="bs-stepper-circle">4</span>
                                <span class="bs-stepper-label">Confirm</span>
                            </button>
                        </div>
                    </div>

                    <div class="bs-stepper-content">
                        <section class="step active" id="step1" data-step="1">
                            <div>
                                <p style="font-weight: 500;">Choose how you want your photo to be shared on Pixora.</p>
                            </div>
                            <div class="cards">
                                <label class="card" onclick="selectType('free')">
                                    <input type="radio" name="typePhoto" value="free" hidden>
                                    <div class="card-body">
                                        <img src="outils/svg/image.svg" class="chooseTypeIcon mt-2 mb-3" width="50px" alt="">
                                        <h3>free photo</h3>
                                        <p>Choose this option if you want to publish your photo for free.
                                            The photo will be available for public use according to Pixora’s usage guidelines.</p>
                                        <i>Free to use, no licensing fees.</i>
                                    </div>
                                </label>
                                <label class="card" onclick="selectType('licensed')">
                                    <input type="radio" name="typePhoto" value="licensed" hidden>
                                    <div class="card-body">
                                        <img src="outils/svg/scale.svg" class="chooseTypeIcon mt-2 mb-3" width="50px" alt="">
                                        <h3>Licensed Photo</h3>
                                        <p>Choose this option if you want to sell your photo or control how it is used.
                                            You can set licensing terms, pricing, and usage rights, including commercial use.</p>
                                        <i>Sell your photo with defined usage rights.</i>
                                    </div>
                                </label>
                                <input type="hidden" name="photoType" id="photoType">
                            </div>
                            <div class="pagination">
                                <li class="page-item"><button type="button" class="page-link next">Next</button></li>
                            </div>
                        </section>
                        <section class="step" id="step2" data-step="2">
                            <div class="container-fluid mt-2 mb-2">
                                <div class="card uploadCard">
                                    <div class="card-body">
                                        <div>
                                            <input type="file" name="photoFile" class="form-control d-none" id="uploadPhoto" accept=".png, .jpg, .jpeg" required>
                                            <p id="uploadErr"></p>
                                            <div id="upload">
                                                <div id="choose_photo">
                                                    <img src="outils/pngs/upload_image_icon.png" id="icon" width="150px" height="auto" alt="uplaod icon">
                                                    <p id="para">Drop your photo here</p>
                                                    <i>JPG, PNG • Max 10MB</i>
                                                </div>
                                                <div class="selected_photo">
                                                    <img src="" style="display:none;" id="preview"></img>
                                                    <table class="table photoInformations">
                                                        <tr>
                                                            <td>Name</td>
                                                            <td id="photoName"></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Size</td>
                                                            <td id="photoSize"></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Resolution</td>
                                                            <td id="photoResolution"></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Ratio</td>
                                                            <td id="photoRatio"></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Orientation</td>
                                                            <td id="photoOrientation"></td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pagination">
                                    <li class="page-item"><button type="button" class="page-link prev">Prev</button></li>
                                    <li class="page-item"><button type="button" class="page-link next">Next</button></li>
                                </div>
                            </div>
                        </section>
                        <section class="step" id="step3" data-step="3">
                            <h2>Photo Details</h2>
                            <div class="photo_details">
                                <div class="form-floating">
                                    <textarea name="title" id="titlePhoto" class="form-control" placeholder="Title of photo ..." required></textarea>
                                    <label for="titlePhoto" class="form-label">Title</label>
                                    <p id="titleErr"></p>
                                </div>
                                <div class="form-floating">
                                    <textarea name="description" id="descriptionPhoto" class="form-control" placeholder="Description of photo ..." required></textarea>
                                    <label for="descriptionPhoto" class="form-label">Description</label>
                                    <p id="descriptionErr"></p>
                                </div>
                                <div class="form-floating">
                                    <input name="categorie" type="text" class="form-control" id="categoriePhoto" placeholder="Categorie photo ..." required>
                                    <label for="categoriePhoto" class="form-label">Categorie</label>
                                    <p id="categorieErr"></p>
                                </div>
                            </div>
                            <div class="pagination">
                                <li class="page-item"><button type="button" class="page-link prev">Prev</button></li>
                                <li class="page-item"><button type="button" class="page-link next">Next</button></li>
                            </div>
                        </section>
                        <section class="step" id="step4" data-step="4">
                            <div class="pagination">
                                <li class="page-item"><button type="button" class="page-link prev">Prev</button></li>
                            </div>
                            <button type="submit" class="btn" id="uploadButton">Upload</button>
                        </section>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <script src="Jquery File/jquery-3.7.1.min.js"></script>
    <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="bs-stepper/bs-stepper.min.js"></script>
    <script>
        const stepperEl = document.getElementById('stepper');
        const stepper = new Stepper(stepperEl);
    </script>
    <script src="upload.js"></script>
    <script src="switch_pages.js"></script>

</body>

</html>