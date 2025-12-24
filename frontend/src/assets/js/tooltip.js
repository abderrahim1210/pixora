document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    let instance = bootstrap.Tooltip.getInstance(el);
    if (instance) instance.dispose();
    new bootstrap.Tooltip(el);
});
