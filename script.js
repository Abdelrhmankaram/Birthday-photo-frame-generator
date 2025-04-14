let cropper;

document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = document.getElementById('image');
            imgElement.src = e.target.result;
            imgElement.style.display = 'block';

            if (cropper) cropper.destroy();

            cropper = new Cropper(imgElement, {
                aspectRatio: 1,
                responsive: true,
                zoomable: false,
                scalable: false,
                viewMode: 1
            });

            document.getElementById('cropButton').style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('cropButton').addEventListener('click', function () {
    if (cropper) {
        const size = 1080; // Increase canvas size for high resolution
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const context = canvas.getContext('2d');

        // Get cropped image at high resolution
        const croppedCanvas = cropper.getCroppedCanvas({
            width: size,
            height: size,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
        });

        // Draw cropped image onto canvas
        context.drawImage(croppedCanvas, 0, 0, size, size);

        // Load frame image
        const frameImage = new Image();
        frameImage.src = 'assets/birthday-card.png';
        frameImage.onload = function () {
            context.drawImage(frameImage, 0, 0, size, size);

            const finalImg = new Image();
            finalImg.src = canvas.toDataURL('image/png');

            // Display the final result
            const container = document.getElementById('cropped-image-container');
            container.innerHTML = '';
            container.appendChild(finalImg);

            // Set download link
            document.getElementById('downloadButton').href = finalImg.src;
            document.getElementById('downloadButton').style.display = 'inline-block';
        };
    }
});
