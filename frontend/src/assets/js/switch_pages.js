let currentStep = 1;
const steps = document.querySelectorAll('.step');

function showStep(step){
    steps.forEach(s => s.classList.remove('active'));
    document.querySelector(`[data-step="${step}"]`).classList.add('active');
    currentStep = step;
}

function validateStep(step){
    if(step === 1 && !document.getElementById('photoType').value){
        alert('Please select a photo type');
        return false;
    }

    if(step === 2 && !document.getElementById('uploadPhoto').files.length){
        alert('Please upload a photo');
        return false;
    }
    return true;
}

document.querySelectorAll('.next').forEach(btn => {
    btn.addEventListener('click',() => {
        if(validateStep(currentStep)){
            showStep(currentStep + 1);
        }
    });
});

document.querySelectorAll('.prev').forEach(btn => {
    btn.addEventListener('click',() => {
        showStep(currentStep - 1);
    });
});

function selectType(type){
    document.getElementById('photoType').value = type;
    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));

    //document.getElementById('priceField').style.display = type === 'licensed' ? 'block' : 'none';
}

document.getElementById('uploadPhoto').addEventListener('change',e => {
    const file = e.target.files[0];
    if (!file) return;

    const img = document.getElementById('preview');
    img.src = URL.createObjectURL(file);
    img.style.display = 'block';
});