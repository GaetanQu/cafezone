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