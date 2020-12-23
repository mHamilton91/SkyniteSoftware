let $ = (element) => {return document.getElementById(element)}
let deck
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

let fixedNav = (elem) => {
    elem.style.position = "fixed";
}

document.addEventListener("DOMContentLoaded", function(){
    scroll = $("scrollView")
    nav = $("navFixed")
    teamTitle = $("team-title")
    deck = document.getElementsByClassName("card")

    window.addEventListener('scroll', event => {

        scrollOutput()
        // Should be changed so that it only happens once instead of multiple times before the opacity changes
        // if ((window.pageYOffset >= 1795) && (deck[0].style.opacity != 1)) {
        if(deck[0].style.opacity != 1) {
            cardAnimation()
        }

        // if ((window.pageYOffset >= 70)) {
        //     fixedNav(nav)
        // }
    });
});