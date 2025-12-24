const dropdowns = document.querySelectorAll('.dropdown');
const dropdownIcon = document.querySelectorAll('.dropdown-menu .dropdownIcon');
dropdowns.forEach(dropdown => {
    const icon = dropdown.querySelectorAll('.drpIcon');
    dropdown.addEventListener('shown.bs.dropdown', () => {
        if (icon) {
            icon.forEach(el => el.classList.remove('fa-chevron-down'));
            icon.forEach(el => el.classList.add('fa-chevron-up'));
        }
    });

    dropdown.addEventListener('hidden.bs.dropdown', () => {
        if (icon) {
            icon.forEach(el => el.classList.remove('fa-chevron-up'));
            icon.forEach(el => el.classList.add('fa-chevron-down'));
        }
    });
})