document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category-select');
    const fetchImagesButton = document.getElementById('fetch-images');
    const imageContainer = document.getElementById('image-container');
    const imageCountInput = document.getElementById('image-count');
    const imageSizeInput = document.getElementById('image-size');
    const modal = document.getElementById('myModal');
    const modalImage = document.getElementById('modal-image');
    const downloadButton = document.getElementById('download-button');

    const categoryMap = {
        "neko": "Gato",
        "shinobu": "Shinobu",
        "megumin": "Megumin",
        "bully": "Bullying",
        "cuddle": "Acurrucarse",
        "cry": "Llorar",
        "hug": "Abrazar",
        "awoo": "Aullido",
        "kiss": "Beso",
        "lick": "Lamer",
        "pat": "Palmadita",
        "smug": "Presumir",
        "bonk": "Golpear",
        "yeet": "Lanzar",
        "blush": "Sonrojarse",
        "smile": "Sonrisa",
        "wave": "Saludar",
        "highfive": "Chocar los cinco",
        "handhold": "Tomarse de las manos",
        "nom": "Morder",
        "bite": "Mordisco",
        "glomp": "Abalanzarse",
        "slap": "Bofetada",
        "kill": "Matar",
        "kick": "Patear",
        "happy": "Feliz",
        "wink": "Guiño",
        "waifu": "Waifu",
        "poke": "Tocar",
        "dance": "Bailar",
        "cringe": "Cringe"
    };

    imageCountInput.addEventListener('input', () => {
        let value = parseInt(imageCountInput.value);
        if (isNaN(value) || value < 1 || value > 9) {
            imageCountInput.value = Math.min(Math.max(value, 1), 9);
        }
    });

    imageSizeInput.addEventListener('input', () => {
        let value = parseInt(imageSizeInput.value);
        if (isNaN(value) || value < 30) {
            return;
        } else if (value > 100) {
            imageSizeInput.value = 100;
        }
    });

    function showInputError(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
        });
    }

    function clearInputError() {
        Swal.close();
    }

    fetchImagesButton.addEventListener('click', async () => {
        const imageCount = parseInt(imageCountInput.value);
        const imageSize = parseInt(imageSizeInput.value);

        if (isNaN(imageCount) || imageCount < 1 || imageCount > 9) {
            showInputError('El número de imágenes debe ser un valor entre 1 y 9.');
            return;
        }

        if (isNaN(imageSize) || imageSize < 30 || imageSize > 100) {
            showInputError('El tamaño de la imagen debe ser un valor entre 30 y 100.');
            return;
        }

        const category = categorySelect.value;
        const response = await fetch(`https://api.waifu.pics/many/sfw/${category}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                exclude: []
            })
        });

        const data = await response.json();
        displayImages(data.files.slice(0, imageCount), imageSize);
    });

    function displayImages(urls, sizePercent) {
        imageContainer.innerHTML = '';
        urls.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.style.width = `${sizePercent}%`;
            img.style.height = 'auto';
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                openModal(url);
            });
            imageContainer.appendChild(img);
        });
    }

    function openModal(url) {
        modal.style.display = 'block';
        modalImage.src = url;
        downloadButton.setAttribute('href', url);
    }

    downloadButton.addEventListener('click', (event) => {
        event.preventDefault();
        const downloadUrl = downloadButton.getAttribute('href');
        if (downloadUrl) {
            window.open(downloadUrl, '_blank');
        }
    });

    const closeModal = document.getElementsByClassName('close')[0];
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
