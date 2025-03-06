const loading = document.getElementById("loading");
const error = document.getElementById("error");
const output = document.getElementById("output");

const imageUrls = [
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/301",
    "https://picsum.photos/200/302",
];

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

function downloadImages() {
    loading.style.display = "block";
    error.style.display = "none";
    output.innerHTML = "";

    Promise.all(imageUrls.map(downloadImage))
        .then((images) => {
            loading.style.display = "none";
            images.forEach((img) => {
                output.appendChild(img);
            });
        })
        .catch((errorMessage) => {
            loading.style.display = "none";
            error.innerText = errorMessage;
            error.style.display = "block";
        });
}

downloadImages();