function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(img);
        };
        img.onerror = () => {
            reject(`Failed to download image from ${url}`);
        };
        img.src = url;
    });
}

function displayImages(images) {
    const output = document.getElementById("output");
    output.innerHTML = "";
    images.forEach((img) => {
        output.appendChild(img);
    });
}

function displayError(message) {
    const error = document.getElementById("error");
    error.innerHTML = message;
    error.style.display = "block";
}

function displayLoading() {
    const loading = document.getElementById("loading");
    loading.style.display = "block";
}

function hideLoading() {
    const loading = document.getElementById("loading");
    loading.style.display = "none";
}

function hideError() {
    const error = document.getElementById("error");
    error.style.display = "none";
}

const imageUrls = [
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/301",
    "https://picsum.photos/200/302",
];

displayLoading();
Promise.all(imageUrls.map(downloadImage))
    .then((images) => {
        hideLoading();
        hideError();
        displayImages(images);
    })
    .catch((error) => {
        hideLoading();
        displayError(error);
    });