const scriptURL = 'https://script.google.com/macros/s/AKfycbxCUggq-VVFytPKmKwUXoXGzOCBQD2rsi9fyBA6CBIohIhm41_mzaA0Gs0k-JUYxa1m/exec';
const form = document.getElementById('myForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => {
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        form.reset();
    })
    .catch(error => {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        console.error('Error!', error.message);
    });
}); 