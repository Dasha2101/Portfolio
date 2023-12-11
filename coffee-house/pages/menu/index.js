let boxBurger,
    slideMenu,
    burgerButton,
    overlay,
    headerContent,
    headerContentBurger

function init(){
    boxBurger = document.querySelector('.burger__menu');
    slideMenu = document.getElementById('burmenu');
    burgerButton  = document.querySelector('.button__adaptive');
    // overlay = document.createElement("section");
    document.body.append(overlay);

    links = document.querySelectorAll(".nav-a-burger");
    for (let i = 0; i < links.length; i++){
        links[i].addEventListener("click", removeBurger)
    }
    console.log(burgerButton)
    burgerButton.addEventListener("click", showWorkBurger);
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

function showWorkBurger(){
    if (slideMenu.classList.contains('nav__menu_show')){
            burgerButton.classList.remove('button__adaptive_open')
            slideMenu.classList.add("return")
            sleep(450).then(() => slideMenu.classList.remove("nav__menu_show"))
    } else {
        slideMenu.classList.add("nav__menu_show")
        slideMenu.classList.remove("return")
        burgerButton.classList.add('button__adaptive_open')

    }
}

function removeBurger(){
    burgerButton.classList.remove('button__adaptive_open')
    slideMenu.classList.add("return")
    sleep(450).then(() => slideMenu.classList.remove("nav__menu_show"))
}


window.onload = init;