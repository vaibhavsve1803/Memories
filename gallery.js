<script>

let currentIndex = 0;

function openMedia(id){

currentIndex = mediaItems.findIndex(f => f.id === id);
showMedia();

document.getElementById("mediaViewer").style.display="flex";

}

function showMedia(){

const file = mediaItems[currentIndex];
const container = document.getElementById("mediaContent");

container.innerHTML="";

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

}

function nextMedia(){
currentIndex=(currentIndex+1)%mediaItems.length;
showMedia();
}

function prevMedia(){
currentIndex=(currentIndex-1+mediaItems.length)%mediaItems.length;
showMedia();
}

function closeMedia(){
document.getElementById("mediaViewer").style.display="none";
}
document.addEventListener("keydown", e => {

if(document.getElementById("mediaViewer").style.display === "flex"){

if(e.key === "ArrowRight") nextMedia();
if(e.key === "ArrowLeft") prevMedia();
if(e.key === "Escape") closeMedia();

}

});

</script>
