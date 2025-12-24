const username = document.getElementById('username');
const useremail = document.getElementById('useremail');
const userbio = document.getElementById('bio');
const usergender = document.getElementById('usergender');
const userlocation = document.getElementById('countrySelect');
const userdname = document.getElementById('userdname');
const userbirth = document.getElementById('userbirth');
const userphone = document.getElementById('userphone');
const facebook = document.getElementById('facebook');
const instagram = document.getElementById('instagram');
const website = document.getElementById('website');
const x = document.getElementById('x');
let namereg = /^[a-z0-9]{10,}$/;
let emailreg = /^[a-zA-Z0-9]+@(gmail\.com|yahoo\.com|hotmail\.com|[a-zA-Z]\.(ma|org|com))$/;
let dnamereg = /^[A-Za-zأ-ي]{1,}$/;
let phonereg = /^\+[1-9]\d{7,14}$/;
let instaReg = /^https?:\/\/(www\.)?instagram\.com\/.+$/;
let faceReg = /^https?:\/\/(www\.)?facebook\.com\/.+$/;
let xReg = /^https?:\/\/(www\.)?x\.com\/.+$/;
let websiteReg = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/?#].*)?$/;;
const errname = document.getElementById('err_username');
const erremail = document.getElementById('err_useremail');
const errphone = document.getElementById('err_userphone');
const errdname = document.getElementById('err_dname');
const errface = document.getElementById('err_face');
const errinsta = document.getElementById('err_insta');
const errx = document.getElementById('err_x');
const errwebsite = document.getElementById('err_website');
let ok = true;

function checkName() {
    if (namereg.test(username.value)) {
        errname.textContent = "Correct !";
        errname.style.color = "green";
        ok = true;
    } else {
        errname.textContent = "* Invalide username";
        errname.style.color = "red";
        ok = false;
    }
}

function checkEmail() {
    if (emailreg.test(useremail.value)) {
        erremail.textContent = "Correct Email";
        erremail.style.color = "green";
        ok = true;
    } else {
        erremail.textContent = "* Invalide Email";
        erremail.style.color = "red";
        ok = false;
    }
}

function checkFace() {
    if (faceReg.test(facebook.value)) {
        errface.textContent = "Correct link";
        errface.style.color = "green";
        ok = true;
    } else {
        errface.textContent = "* Invalide link";
        errface.style.color = "red";
        ok = false;
    }
}

function checkInsta() {
    if (instaReg.test(instagram.value)) {
        errinsta.textContent = "Correct link";
        errinsta.style.color = "green";
        ok = true;
    } else {
        errinsta.textContent = "* Invalide link";
        errinsta.style.color = "red";
        ok = false;
    }
}

function checkX() {
    if (xReg.test(x.value)) {
        errx.textContent = "Correct link";
        errx.style.color = "green";
        ok = true;
    } else {
        errx.textContent = "* Invalide link";
        errx.style.color = "red";
        ok = false;
    }
}

function checkWebsite() {
    if (websiteReg.test(website.value)) {
        errwebsite.textContent = "Correct link";
        errwebsite.style.color = "green";
        ok = true;
    } else {
        errwebsite.textContent = "* Invalide link";
        errwebsite.style.color = "red";
        ok = false;
    }
}

function checkDname() {
    if (dnamereg.test(userdname.value)) {
        errdname.textContent = "Correct";
        errdname.style.color = "green";
        ok = true;
    } else {
        errdname.textContent = "* Invalide display name";
        errdname.style.color = "red";
        ok = false;
    }
}

function checkPhone() {
    if (phonereg.test(userphone.value)) {
        errphone.textContent = "Correct";
        errphone.style.color = "green";
        ok = true;
    } else {
        errphone.textContent = "* Invalide phone";
        errphone.style.color = "red";
        ok = false;
    }
}

const submitButton = document.getElementById('saveChangeBtn');
if(username.value === "" || useremail.value === "" || userbio.value === "" || userbirth.value === "" || userdname.value === "" || usergender.value === "" || userlocation.value === "" || userphone.value === ""){
    submitButton.classList.add("disabled");
    
}else{
    submitButton.classList.remove("disabled");
}
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (!ok) {
        Swal.fire({
            title: "Something is wrong",
            icon: "warning",
            confirmButtonColor: "rgb(0, 120, 255)"
        });
    }else{
        document.getElementById('editProfileForm').submit();
    }
});