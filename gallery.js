const counter = document.createElement("div");
counter.id = "mediaCounter";

document.addEventListener("DOMContentLoaded", () => {

const viewer = document.getElementById("mediaViewer");

if(viewer){
viewer.appendChild(counter);
}

});

let currentIndex = 0;

let touchStartX = 0;
let touchEndX = 0;

function openMedia(id){

currentIndex = mediaItems.findIndex(f => f.id === id);

showMedia();

const viewer = document.getElementById("mediaViewer");

viewer.style.display="flex";

}

/* SHOW MEDIA */

function showMedia(){

const file = mediaItems[currentIndex];
const container = document.getElementById("mediaContent");

container.innerHTML="";
counter.innerText = (currentIndex + 1) + " / " + mediaItems.length;

if(file.mimeType.includes("image")){

const img = document.createElement("img");

img.src = `https://drive.google.com/thumbnail?id=${file.id}&sz=w2000`;

img.style.maxHeight="90vh";
img.style.maxWidth="90vw";
img.style.objectFit="contain";

container.appendChild(img);

}

if(file.mimeType.includes("video")){

const iframe = document.createElement("iframe");

iframe.src = `https://drive.google.com/file/d/${file.id}/preview`;

iframe.style.width="80vw";
iframe.style.height="80vh";
iframe.style.border="none";

container.appendChild(iframe);

}

/* preload next image for smoother navigation */

preloadNext();

}

/* PRELOAD NEXT IMAGE */

function preloadNext(){

const nextIndex = (currentIndex + 1) % mediaItems.length;
const nextFile = mediaItems[nextIndex];

if(nextFile.mimeType.includes("image")){

const img = new Image();

img.src = `https://drive.google.com/thumbnail?id=${nextFile.id}&sz=w2000`;

}

}

/* NAVIGATION */

function nextMedia(){

currentIndex=(currentIndex+1)%mediaItems.length;

showMedia();

}

function prevMedia(){

currentIndex=(currentIndex-1+mediaItems.length)%mediaItems.length;

showMedia();

}

/* CLOSE VIEWER */

function closeMedia(){

document.getElementById("mediaViewer").style.display="none";

}

/* KEYBOARD CONTROLS */

document.addEventListener("keydown", e => {

if(document.getElementById("mediaViewer").style.display === "flex"){

if(e.key === "ArrowRight") nextMedia();

if(e.key === "ArrowLeft") prevMedia();

if(e.key === "Escape") closeMedia();

}

});

/* TAP OUTSIDE IMAGE TO CLOSE */

document.getElementById("mediaViewer").addEventListener("click", e => {

if(e.target.id === "mediaViewer"){

closeMedia();

}

});

/* SWIPE SUPPORT FOR MOBILE */

document.getElementById("mediaViewer").addEventListener("touchstart", e => {

touchStartX = e.changedTouches[0].screenX;

});

document.getElementById("mediaViewer").addEventListener("touchend", e => {

touchEndX = e.changedTouches[0].screenX;

handleSwipe();

});

function handleSwipe(){

const distance = touchEndX - touchStartX;

if(Math.abs(distance) < 50) return;

if(distance < 0){

nextMedia();

}else{

prevMedia();

}

}
