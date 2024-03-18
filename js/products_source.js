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