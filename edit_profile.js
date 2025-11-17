const username = document.getElementById('username');
const useremail = document.getElementById('useremail');
const userbio = document.getElementById('userbio');
const usergender = document.getElementById('usergender');
const userlocation = document.getElementById('userlocation');
const userdname = document.getElementById('userdname');
const userbirth = document.getElementById('userbirth');
const userphone = document.getElementById('userphone');
let namereg = /^[a-z0-9]{10,}$/;
let emailreg = /^[a-zA-Z0-9]+@(gmail\.com|yahoo\.com|hotmail\.com|[a-zA-Z]\.(ma|org|com))$/;
let dnamereg = /^[A-Za-z]$/;
let phonereg = /^\+[1-9]\d{7,14}$/;
const errname = document.getElementById('err_username');
const erremail = document.getElementById('err_useremail');
const errphone = document.getElementById('err_userphone');
const errdname = document.getElementById('err_dname');
let ok = false;

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