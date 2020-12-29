let $ = (element) => {return document.getElementById(element)}

let deck, logo, link, scrolling, nav, teamTitle

let scrollOutput = () => {
    scrolling.style.padding = "15px 0"
    scrolling.innerHTML = Math.round(window.scrollY)
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

let fadeUp = () => {

}

document.addEventListener("DOMContentLoaded", function(){
    nav = $("navFixed")
    logo = $("nav-icon")
    scrolling = $("scrollView")
    link = $("right-contain")
    teamTitle = $("team-title")
    aboutTitle = $("about-title")
    aboutInfo = $("about-info")
    linkStyle = window.getComputedStyle(link)
    deck = document.getElementsByClassName("card")

    window.addEventListener('scroll', event => {
        scrollOutput()
        // if ((window.pageYOffset >= 1795) && (deck[0].style.opacity != 1)) {
        if(deck[0].style.opacity != 1) {
            cardAnimation()
        }

        if ((window.pageYOffset >= 500) && (aboutTitle.style.opacity != 1)) {
            aboutTitle.style.top = 0
            aboutTitle.style.opacity = 1
            setTimeout(function(){
                aboutInfo.style.top = 0
                aboutInfo.style.opacity = 1
                
                setTimeout(function() {
                    $("design").classList.add("designBorder")
                    setTimeout(function() {
                        $("design").style.borderBottom = "2px solid #00E7FF"
                    }, 1500)
                }, 500)

                setTimeout(function() {
                    $("build").classList.add("buildBorder")
                    setTimeout(function() {
                        $("build").style.borderBottom = "2px solid #00E7FF"
                    }, 2000)
                }, 1500)

                setTimeout(function() {
                    $("inspire").classList.add("inspireBorder")
                    setTimeout(function() {
                        $("inspire").style.borderBottom = "2px solid #00E7FF"
                    }, 1500)
                }, 2000)

            }, 200);
        }
    });

    document.addEventListener('click', e => {
        if (e.target == logo) {
            if (linkStyle.getPropertyValue("display") == "flex") {
                link.classList.toggle("invisible")
                link.classList.toggle("visible")
            }
        } else if (e.target != logo) {
            if (link.classList.contains("visible")) {
                link.classList.add("invisible")
                link.classList.remove("visible") 
            }
        }
    });
});