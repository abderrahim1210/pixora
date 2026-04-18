const p = document.querySelectorAll('#copyrightText');
let date = new Date();
let year = date.getFullYear();
p.forEach(el => el.innerHTML = `&copy;${year} Pixora All Rights Reserved.`);