let $ = (element) => {return document.getElementById(element)}

let deck, logo, link, scrolling, teamTitle, services, serviceTitle, body
let about, serv, team
let tableInfo = []

let scrollOutput = () => {
    scrolling.style.padding = "15px 0"
    scrolling.innerHTML = Math.round(window.scrollY)
}

let serviceAnimation = () => {
    // let service = services.length-1;
    let service = 0
    serviceTitle.style.opacity = 1;
    serviceTitle.style.left = 0;

    function serviceLoop() {
        // Sets timeout for 0.1s so the cards don't load at the same time
        setTimeout(function() {
            services[service].style.opacity = 1;
            services[service].style.left = 0;
            service++
            if (service < services.length) {
                serviceLoop();
            }
        }, 400)
    }
    serviceLoop()
}

let cardAnimation = () => {
    var card = 0;
    teamTitle.style.opacity = 1;

    function cardLoop() {
        // Sets timeout for 0.1s so the cards don't load at the same time
        setTimeout(function() {
            deck[card].style.opacity = 1;
            deck[card].style.animation = "shadowBounce ease-in 2s"
            deck[card].style.boxShadow = "5px 5px 5px #888888"
            card++
            if (card < deck.length) {
                cardLoop();
            }
        }, 250)
    }
    cardLoop()
}

let removeRow = (table) => {
    let row = table.children
    for(let i = 0; i < row.length; i++) {
        tableInfo.push(row[i].children[1].innerHTML)
        row[i].children[1].remove()
    }
    for(let j = 0; j < 3; j++) {
        let item = tableInfo.shift()
        let newRow = table.insertRow((2*j) + 1)
        newRow.insertCell(0).innerHTML = item
        newRow.children[0].classList.add("inputs")
    }
}

let addRow = (table) => {
    let row = table.children
    let tmp = []
    for(let i = row.length; i > 0; i--) {
        if(i % 2 != 0) {
            tmp.push(row[i].innerHTML)
            row[i].remove()
        }
    }
    tableInfo = tableInfo.concat(tmp.reverse())
    for(let j = 0; j < 3; j++) {
        let item = tableInfo.shift()
        let newData = table.children[j].insertCell(1)
        newData.innerHTML = item
        newData.classList.add('inputs')
    }
}

document.addEventListener("DOMContentLoaded", function(){
    logo = $("nav-icon")
    scrolling = $("scroll-view")
    link = $("right-contain")
    teamTitle = $("team-title")
    aboutTitle = $("about-title")
    aboutInfo = $("about-info")
    serviceTitle = $("services-title")
    linkStyle = window.getComputedStyle(link)
    deck = document.getElementsByClassName("card")
    services = document.getElementsByClassName("service-item")
    aboutCount = 0
    servCount = 0
    teamCount = 0
    contactCount = 0
    about = $("about")
    serv = $("services")
    team = $("team")
    body = document.getElementsByTagName('body')[0]
    let tables = document.getElementsByTagName("table")


    console.log(body.clientWidth)

    if(body.clientWidth <= 460) {
        contactCount = 1
        for(let i = 0; i < tables.length; i++) {
            let tbody = tables[i].children[0]
            removeRow(tbody)
        }
    }

    window.addEventListener('resize', event => {
        if(((body.clientWidth <= 460) && (contactCount != 1))) {
            contactCount = 1
            for(let i = 0; i < tables.length; i++) {
                let tbody = tables[i].children[0]
                removeRow(tbody)
            }
        } else if(((body.clientWidth > 460) && (contactCount == 1))) {
            contactCount = 0
            for(let i = 0; i < tables.length; i++) {
                let tbody = tables[i].children[0]
                addRow(tbody)
            }
        }
    })

    


    window.addEventListener('scroll', event => {
        // scrollOutput()

        if ((window.pageYOffset >= (about.offsetTop-(about.offsetTop*0.7))) && (aboutCount != 1)) {
            aboutCount = 1
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

        if((window.pageYOffset >= serv.offsetTop-(about.offsetTop*0.7)) && (servCount != 1)) {
            servCount = 1
            serviceAnimation()
        }

        // if ((window.pageYOffset >= 1795) && (deck[0].style.opacity != 1)) {
        if((window.pageYOffset >= team.offsetTop-(about.offsetTop*0.7)) && (teamCount != 1)) {
            teamCount = 1
            cardAnimation()
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