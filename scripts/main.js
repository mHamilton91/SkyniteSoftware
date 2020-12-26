let $ = (element) => {return document.getElementById(element)}

let deck, logo, link
let scroll
let nav
let teamTitle

let scrollOutput = () => {
    scroll.style.padding = "15px 0"
    scroll.innerHTML = Math.round(window.scrollY)
}

let cardAnimation = () => {
    console.log('Test')
    var card = 0;
    teamTitle.style.opacity = 1;

    function myLoop() {
        // Sets timeout for 0.1s so the cards don't load at the same time
        setTimeout(function() {
            deck[card].style.opacity = 1;
            deck[card].style.animation = "shadowBounce ease-in 2s"
            deck[card].style.boxShadow = "5px 5px 5px #888888"
            card++
            if (card < deck.length) {
                myLoop();
            }
        }, 250)
    }
    myLoop()
}

document.addEventListener("DOMContentLoaded", function(){
    scroll = $("scrollView")
    nav = $("navFixed")
    teamTitle = $("team-title")
    logo = $("nav-icon")
    link = $("right-contain")
    style = window.getComputedStyle(link)
    deck = document.getElementsByClassName("card")

    window.addEventListener('scroll', event => {
        scrollOutput()
        // if ((window.pageYOffset >= 1795) && (deck[0].style.opacity != 1)) {
        if(deck[0].style.opacity != 1) {
            cardAnimation()
        }
    });

    logo.addEventListener('click', event => {
        if (style.getPropertyValue("display") == "flex") {
            link.classList.toggle("invisible")
            link.classList.toggle("visible")
          }
    });

});