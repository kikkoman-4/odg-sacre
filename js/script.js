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

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('formModal');
    const openFormBtn = document.getElementById('openFormBtn');
    const closeButton = document.querySelector('.close-button');
    const stepButtons = document.querySelectorAll('.step-button[data-step]');
    const stepContents = document.querySelectorAll('.step-content');
    const prevStepBtn = document.getElementById('prevStep');
    const nextStepBtn = document.getElementById('nextStep');
    const submitFormBtn = document.getElementById('submitForm');
    const progressBar = document.getElementById('formProgress');
    
    let currentStep = 1;
    const totalSteps = stepContents.length;

    // Open modal
    openFormBtn.addEventListener('click', function() {
        modal.style.display = "block";
        updateStep(1);
    });

    // Close modal
    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    function updateStep(step) {
        currentStep = step; // Update current step
        
        // Hide all steps
        stepContents.forEach(content => content.classList.remove('active'));
        stepButtons.forEach(button => {
            button.classList.remove('active');
            if (parseInt(button.dataset.step) < step) {
                button.classList.add('completed');
            } else {
                button.classList.remove('completed');
            }
        });

        // Show current step
        document.querySelector(`.step-content[data-step="${step}"]`).classList.add('active');
        document.querySelector(`.step-button[data-step="${step}"]`).classList.add('active');

        // Update progress bar
        const progress = ((step - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${progress}%`;

        // Show/hide navigation buttons
        prevStepBtn.style.display = step === 1 ? 'none' : 'block';
        nextStepBtn.style.display = step === totalSteps ? 'none' : 'block';
        submitFormBtn.style.display = step === totalSteps ? 'block' : 'none';
    }

    // Step navigation
    stepButtons.forEach(button => {
        button.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            updateStep(step);
        });
    });

    prevStepBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            updateStep(currentStep - 1);
        }
    });

    nextStepBtn.addEventListener('click', function() {
        if (currentStep < totalSteps) {
            updateStep(currentStep + 1);
        }
    });

    // Form submission
    document.getElementById('myForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Form submitted successfully!');
        modal.style.display = "none";
    });

    function addMedicationEntry() {
        const container = document.querySelector('.medication-history');
        const template = document.querySelector('.medication-entry').cloneNode(true);
        const timestamp = Date.now();
        
        // Update IDs and names to be unique
        template.querySelectorAll('input').forEach(input => {
            const oldId = input.id;
            const oldName = input.name;
            input.id = `${oldId}_${timestamp}`;
            input.name = oldName;
            input.value = '';
        });

        // Add remove button if not the first entry
        if (container.children.length > 0) {
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'remove-entry-button';
            removeButton.innerHTML = 'Remove Entry';
            removeButton.onclick = function() {
                template.remove();
            };
            template.appendChild(removeButton);
        }

        container.appendChild(template);
    }

    // Make functions globally available
    window.addMedicationEntry = addMedicationEntry;
}); 