const gallery = document.getElementById("memoryGallery");

const demoImages = [
"assets/image/IMG_7256.png",

"assets/image/IMG_7253.png",
"assets/image/IMG_7254.png",
"assets/image/IMG_7313.png",
"assets/image/IMG_7236.png",
"assets/image/IMG_7245.png",
"assets/image/IMG_7257.png",
"assets/image/IMG_7259.png",
"assets/image/IMG_7280.png",
"assets/image/IMG_7298.png",
"assets/image/IMG_7311.png",
"assets/image/IMG_7313.png",
"assets/image/IMG_7319.png",
"assets/image/IMG_7328.png",
"assets/image/IMG_7336.png",
"assets/image/IMG_7353.png",
"assets/image/IMG_7358.png",
"assets/image/IMG_7384.png",
"assets/image/IMG_7398.png",
"assets/image/IMG_7418.png",
"assets/image/IMG_7420.png",
"assets/image/IMG_7433.png",

"assets/image/IMG_7445.png",
"assets/image/IMG_7446.png",

"assets/image/IMG_7450.png",
"assets/image/IMG_7453.png",
"assets/image/IMG_7466.png",
"assets/image/IMG_7472.png",
"assets/image/IMG_7475.png",
"assets/image/IMG_7504.png",
"assets/image/IMG_7508.png",
"assets/image/IMG_7513.png",
"assets/image/IMG_7523.png",
"assets/image/IMG_7533.png",
"assets/image/IMG_7551.png",
"assets/image/IMG_7559.png",
"assets/image/IMG_7569.png",
"assets/image/IMG_7586.png",
"assets/image/IMG_7637.png",
"assets/image/IMG_7632.png",
"assets/image/IMG_7440.png",
"assets/image/IMG_7448.png",

];

gallery.innerHTML = demoImages.map(img => `

<div class="memory-item">

<img src="${img}" loading="lazy">

</div>

`).join("");