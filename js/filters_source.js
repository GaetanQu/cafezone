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