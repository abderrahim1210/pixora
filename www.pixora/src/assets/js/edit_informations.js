const btn = document.getElementById('editInfos');
const saveChanges = document.getElementById('saveChangeBtn');
const resetChanges = document.getElementById('resetInfos');
let isEditing = false;
document.querySelectorAll('.edit-div').forEach(el => el.classList.add('d-none'));
btn.addEventListener('click',()=>{
    isEditing = !isEditing;
    document.querySelectorAll('.display-div').forEach(el => el.classList.toggle("d-none",isEditing));
    document.querySelectorAll('.edit-div').forEach(el => el.classList.toggle("d-none",!isEditing));

    btn.innerHTML = isEditing ? `<i class="fas fa-check"></i>` : `<i class="fas fa-pencil"></i>`;

    saveChanges.classList.toggle('disabled',!isEditing);
    saveChanges.classList.toggle('active',isEditing);

    resetChanges.classList.toggle('d-none',!isEditing);
    resetChanges.classList.toggle('d-block',isEditing);
});