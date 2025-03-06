const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.classList.add("img-thumbnail", "m-2");
        img.onload = () => resolve(img);
        img.onerror = () => reject(`❌ Failed to load image: ${url}`);
    });
}

function downloadImages() {
    errorDiv.textContent = "";  
    output.innerHTML = "";   
    loadingDiv.style.display = "block";  

    const imageUrls = images.map(img => img.url); // ✅ Fix: Extract URLs from array

    Promise.all(imageUrls.map(downloadImage))
        .then(downloadedImages => {
            loadingDiv.style.display = "none";  
            downloadedImages.forEach(img => output.appendChild(img));  
        })
        .catch(error => {
            loadingDiv.style.display = "none";  
            errorDiv.textContent = error;  
        });
}

// ✅ Run when button is clicked
btn.addEventListener("click", downloadImages);