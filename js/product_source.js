//Gestion de l'affichage du carousel d'images
var images_div = document.querySelector('.images'),
image = document.querySelector('.images > img'),
images = document.querySelectorAll('.images > img');

//Par les flèches
var productLeftArrow = document.querySelector('.product .left.arrow'),
productRightArrow = document.querySelector('.product .right.arrow');

productLeftArrow.onclick = ()=>{
    images_div.scrollLeft -= image.clientWidth
}

productRightArrow.onclick = ()=>{
    images_div.scrollLeft += image.clientWidth
}

//Avec les miniatures
var thumbnails = document.querySelectorAll('.product .thumbnails > img');

//Gestion de la classe active des miniatures
toggleThumbnailActive();

images_div.onscrollend = ()=>{
    toggleThumbnailActive();
}

function toggleThumbnailActive (){
    thumbnails.forEach(thumbnail=>{
        if(Math.abs(images_div.scrollLeft - (images_div.clientWidth * (thumbnail.classList[0]-1))) < 10){
            thumbnail.classList.add('active');
        }
        else{
            thumbnail.classList.remove('active')
        }
    })
}

//Gestion du clic sur les miniatures
thumbnails.forEach(thumbnail =>{
    thumbnail.onclick = ()=>{
        thumbnail.classList.add('active');
        images_div.scrollLeft = images_div.clientWidth * (thumbnail.classList[0] - 1)

    }
})