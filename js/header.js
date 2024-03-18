//Composant custom search-bar qui permettra la recherche
class searchbar extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
        <input type="search" placeholder="Rechercher sur CaféZone" style="font-size: .9em;">
        <img src="images/Header/Search.svg" style="position: relative; right: 30px;">
        `
    }
}
customElements.define('search-bar', searchbar)

//Gesion de l'affichage de la navigation pour mobile
//-Par les boutons burger et croix
var sidenav = document.querySelector('.sidenav'),
croix = document.querySelector(".sidenav #croix"),
burger = document.querySelector(".burger");
const navLinks = document.querySelectorAll(".links");

burger.onclick = toggle_sidenav;
croix.onclick = toggle_sidenav;

function toggle_sidenav(){
    sidenav.classList.toggle("active");
    console.log('La classe "active" du sidenav a été modifiée');
}

//-Par le déplacement horizontal au doigt
var touchStart, touchMove, touchEnd, moving;

sidenav.addEventListener('touchstart', e => {
    touchStart = e.targetTouches[0].clientX;
});

sidenav.addEventListener('touchmove', e => {
    touchMove = e.changedTouches[0].clientX;
    moving = parseInt(touchStart - touchMove);
    if(moving > 0){
        sidenav.style.transition = "0ms";
        sidenav.style.translate = -moving + "px";
        
        sidenav.addEventListener('touchend', e => {
            touchEnd = e.changedTouches[0].clientX;
            sidenav.style.transition = "500ms";

            if (touchStart - touchEnd > 200){
                sidenav.style.translate = "0px";
                sidenav.classList.remove('active');
                console.log('La classe "active" a été retirée de sidenav par déplacement horizontal')
            }

            else{
                sidenav.style.translate='0px';
                console.log("Le sidenav reste ouvert car l'utilisateur ne l'a pas suffisamment déplacé (évite la fermeture au scroll ou en cas d'appui accidentel)")
            }
        })
    }
})

navLinks.forEach(link =>{
    link.addEventListener("click", ()=>{
        toggle_sidenav;
    })
})