document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.conference-form');
    const emailInput = document.querySelector('#email-input');
    const emailErrorMessage = document.querySelector('#email-error');
    const dropArea = document.querySelector('.drop-area');
    const fileInput = document.querySelector('#file-input');
    const fileError = document.querySelector('#file-upload-error');
    const previewImage = document.querySelector('#preview-image');
    const previewBox = document.querySelector('.image-preview-box');
    const imageBox = document.querySelector('.image-preview-box');
    const changeBtn = document.querySelector('.change-button');
    const removeBtn = document.querySelector('.remove-button');
    const iconBox = document.querySelector('.icon-box');
    const areaBefore = document.querySelector('.area-before');

    let uploadedFile = " ";

    dropArea.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", handleFile); //file selection via click

    dropArea.addEventListener("dragover", (e) => { //if the user drags over the area
        e.preventDefault();
        dropArea.classList.add("highlight");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("highlight"); //when the file is not dropped
    })
    dropArea.addEventListener("drop", (e) => {
        e.preventDefault(); //prevent the browser from opening the file

        dropArea.classList.remove("hightlight"); 
        if (e.dataTransfer.files.length > 0) {
            handleFile({ target: { files: e.dataTransfer.files } }); //when the file is dropped
        }
    })

    //file upload and size validation
    function handleFile(event) {
        const file = event.target.files[0];

        if (!file) return;

        const allowedtypes = ["image/jpeg", "image/png"];


        if (file.size > 500 * 1024) {  //500KB limit
            fileError.style.display = 'flex';
            dropArea.style.border = '1px solid red';
            iconBox.style.backgroundColor = 'hsl(245, 19%, 35%)';
            return;
        }
        if (!allowedtypes.includes(file.type)) {
            alert('Invalid file type! Only JPG and PNG are allowed')
        }

        //to show the preview
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            imageBox.style.display = 'block';
            areaBefore.style.display = 'none';
        };
        uploadedFile = file;
        reader.readAsDataURL(file);
    }

    //change and remove buttons
    changeBtn.addEventListener("click", (event) => {
        e.preventDefault();
        fileInput.click();
    });

    removeBtn.addEventListener("click", (event) => {
        e.preventDefault();
        previewImage.src = "";
        imageBox.style.display = 'none';
        fileInput.value = "";
    })

    //email validation
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); //To prevent default submission

        const email = emailInput.value.trim();

        if (!isValidEmail(email)) {
            emailErrorMessage.style.display = 'flex';
            emailInput.style.border = '1px solid red';
            return;
        }
        if (!uploadedFile) {
            alert('Please upload a valid file before submitting :)');
            return;
        }

        //window.location.href = "";
        alert('Successful submission');
    })
})