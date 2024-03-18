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

toggleThumbnailActive();

images_div.addEventListener('scroll', ()=>{
    toggleThumbnailActive();
})

function toggleThumbnailActive (){
    console.log('ScrollLeft : ' + images_div.scrollLeft)
    console.log(("div size : " + images_div.clientWidth))
 
    thumbnails.forEach(thumbnail=>{
    console.log(images_div.clientWidth * (thumbnail.classList[0]-1))

        if(Math.abs(images_div.scrollLeft - (images_div.clientWidth * (thumbnail.classList[0]-1))) < 10){
            thumbnail.classList.add('active');
        }
        else{
            thumbnail.classList.remove('active')
        }
    })
}