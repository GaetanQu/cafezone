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



//Map interactive
var map = document.querySelector(".map"),
paths = document.querySelectorAll(".map svg .land"),
select = document.querySelector(".departement select"),
options = document.querySelectorAll("option");

paths.forEach(path =>{
    path.addEventListener('mouseenter', () => {
        options.forEach(option =>{
            if(option.value === path.id)
            select.selectedIndex = option.value;
            if(parseInt(path.id) === 20){
                paths.forEach(path =>{
                    if(parseInt(path.id) === 20){
                        path.classList.add('corsica_hover')
                    }
                })
            }
        })
    })

    path.addEventListener('mouseleave', () => {
        paths.forEach(path =>{
            if (path.classList.contains("active")){
                select.selectedIndex = path.id;
                if(parseInt(path.id) === 20){
                    paths.forEach(path =>{
                        if(parseInt(path.id) === 20){
                            path.classList.add('active')
                        }
                    })
                }
            }

            if(parseInt(path.id) === 20){
                paths.forEach(path =>{
                    if(parseInt(path.id) === 20){
                        path.classList.remove('corsica_hover')
                    }
                })
            }
        })
    })

    path.addEventListener("click", ()=>{
        paths.forEach(path =>{
            if (path.classList.contains('active')){
                path.classList.remove('active')
            }
        })
        path.classList.add('active')
    })
})

if (select != null){
    select.addEventListener('change', () =>{
        paths.forEach(path =>{
            if (parseInt(path.id) === select.selectedIndex){
                path.classList.add('active');
            }
            else {
                if(path.classList.contains('active')){
                    path.classList.remove('active');
                }
            }
        })
    });
}


//Gestion du range de la note SCA pour #beans
const rangeInput = document.querySelectorAll(".range-input input"),
scaInput = document.querySelectorAll(".sca-input input"),
selected = document.querySelector(".slider .selected");

let scaGap = 5;

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if(maxVal-minVal < scaGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - scaGap;
            }
            else{
                rangeInput[1].value = minVal + scaGap;
            }
            console.log("L'écart minimum de", scaGap, "est appliqué")
        }
        else{
            scaInput[0].value = minVal + 80;
            scaInput[1].value = maxVal + 80;
            selected.style.left= (minVal / rangeInput[0].max)*100 + "%";
            selected.style.right=100-(maxVal / rangeInput[0].max)*100 + "%";
            console.log('Le filtre "note SCA" a été appliqué pour', minVal + 80, maxVal + 80);
        }
    })
})

//Composant de filtre du pays d'origine
class country_filter extends HTMLElement{
    constructor(){
        super();
        this.checkbox = document.createElement('input');
        this.checkbox.type='checkbox';
        this.name = this.getAttribute('country');
        this.checkbox.id = this.name;
        this.label = document.createElement('label');
        this.label.htmlFor = this.checkbox.id;
        this.label.innerHTML=this.name

        this.appendChild(this.checkbox);
        this.appendChild(this.label);
    }
}
customElements.define('country-filter', country_filter);

//Création du composant cafezone-shop
class cafezone_shop extends HTMLElement{
    constructor(){
        super();

        this.shop_link = document.createElement('a');
        this.shop_link.href = this.getAttribute("shop_url");
        this.shop_link.classList = "name floating";
        this.shop_link.style.backgroundColor = "#" + this.getAttribute('color') + "DD";

        this.shop_name = document.createElement('h2')
        this.shop_name.innerHTML = this.getAttribute("shop_name");

        this.shop_link.appendChild(this.shop_name);


        this.appendChild(this.shop_link);
    }
}
customElements.define('cafezone-shop', cafezone_shop);

//Création du composant cafezone-product
class cafezone_product extends HTMLElement{
    constructor(){
        super();

        this.link = document.createElement('a');
        this.link.href = this.getAttribute('link');
        this.link.classList = "link"

        this.image = document.createElement('img');
        this.image.src = "images/Products/" + this.getAttribute('reference') + "/" + this.getAttribute('image');

        this.band = document.createElement('div');
        this.band.classList = ('name title')
        this.band.style.backgroundColor = "#" + this.getAttribute('color') + "DD";

        this.product_name = document.createElement('h4');
        this.product_name.innerHTML = this.getAttribute('product_name');

        if(this.classList.contains('bean')){
            this.country = document.createElement('div');
            this.country.classList="country";
    
            this.flag = document.createElement('img');
            this.flag.classList="flag";
            this.flag.src = this.getAttribute('flag');
    
            this.country_name = document.createElement('h5');
            this.country_name.innerHTML = this.getAttribute('country');
        }

        else{
            this.brand = document.createElement('h5');
            this.brand.innerHTML = this.getAttribute('brand');
        }

        this.details = document.createElement('div');
        this.details.classList='details';

        this.description = document.createElement('p');
        this.description.innerHTML = this.getAttribute('description');

        this.price = document.createElement('p');
        this.price.classList = ('price');
        this.price.innerHTML = this.getAttribute('price') + " €";

        this.addToCartButton = document.createElement('a');
        this.addToCartButton.classList = "cart";
        this.addToCartButton.href = "#"
        this.addToCartButton.style.backgroundColor = "#" + this.getAttribute('color');
        this.addToCartButton.innerHTML = "<img src = 'images/Icons/cart.svg' class = 'cart_icon'>";
        this.link.addEventListener('mouseenter', () =>{
            this.addToCartButton.innerHTML = "<img src = 'images/Icons/cart.svg' class = 'cart_icon'>Ajouter au panier";
        });
        this.link.addEventListener('mouseleave', () =>{
            this.addToCartButton.innerHTML = "<img src = 'images/Icons/cart.svg' class = 'cart_icon'>";
        });

        this.appendChild(this.link);
        
        this.link.appendChild(this.image);
        
        this.link.appendChild(this.details);

        this.details.appendChild(this.band);
        this.band.appendChild(this.product_name);

        if(this.classList.contains('bean')){
            this.band.appendChild(this.country);
            this.country.appendChild(this.country_name);
            this.country.appendChild(this.flag)
        }
        this.band.appendChild(this.brand);

        this.details.appendChild(this.description);

        this.details.appendChild(this.price);

        this.details.appendChild(this.addToCartButton);
    }
}
customElements.define('cafezone-product', cafezone_product);

//Gestion du caroussel des différentes boutiques
var shops = document.querySelectorAll('.shops > cafezone-shop'),
shops_number = document.querySelectorAll('.shops > cafezone-shop').length;

//Composant custom pour l'affichage des points du caroussel
class carousel_dots extends HTMLElement{
    constructor(){
        super();
        console.log("oui");
        let id = 0;
        this.classList.add("blur");
        let dot = document.createElement('div');
        dot.classList = "dot";
        shops.forEach(shop =>{
            id++
            shop.id = id;
            var new_dot = dot.cloneNode();
            new_dot.id = id;
            if (new_dot.id == 1){
                new_dot.classList.add('active')
            }
            new_dot.title = shop.getAttribute('shop_name');
            this.appendChild(new_dot);
        })
    }
}
customElements.define('carousel-dots', carousel_dots);


//Gestion du scroll des produits des boutiques
var shops_section = document.querySelector('.shops'),
header_height = document.querySelector("header").offsetHeight,
carousel_dots_element = document.querySelector("carousel-dots");

if (window.scrollY === shops_section.offsetTop - header_height){
    shops.forEach(shop =>{
        shop.style.overflow = "auto";
    })
    carousel_dots_element.style.display = "flex";
}

addEventListener('scroll', () =>{
    shops.forEach(shop => {
        if (window.scrollY === shops_section.offsetTop - header_height){
            shop.style.overflow = "auto";
            carousel_dots_element.style.display = "flex";
        }
        else{
            shop.style.overflow = "hidden";
            carousel_dots_element.style.display = "none";
        }
    })
})

//Gestion des interactions avec <carousel-dots>
var dots = document.querySelectorAll('.dot'),
uneditable = false;
dots.forEach(dot =>{
    dot.addEventListener('click', () =>{
        shops_section.scrollLeft = shops_section.clientWidth * (dot.id - 1);
        dots.forEach(dot =>{
            dot.classList.remove('active');
        })
        dot.classList.add("active");
        uneditable = true;
        setTimeout(()=>{uneditable = false}, 700);
    })
    shops_section.addEventListener('scroll', ()=>{
        if(uneditable === false){
            if (shops_section.scrollLeft === shops_section.clientWidth * (dot.id - 1)){
                dot.classList.add('active');
            }
            else{
                dot.classList.remove('active')
            }
        }
    })
})