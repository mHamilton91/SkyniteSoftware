// Shorthand function to find an element by ID
let $ = (element) => {return document.getElementById(element)}

// Global Variables
let deck, logo, link, scrolling, teamTitle, services, serviceTitle, body
let about, serv, team
let tableInfo = []

// Debugging: Displays the scroll height
let scrollOutput = () => {
    scrolling.style.padding = "15px 0"
    scrolling.innerHTML = Math.round(window.scrollY)
}

// Service Section: Service animations
let serviceAnimation = () => {
    let service = 0
    serviceTitle.style.opacity = 1;
    serviceTitle.style.left = 0;

    function serviceLoop() {
        // Sets timeout for 0.4s so the services don't load at the same time
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

// Team Section: Card animations
let cardAnimation = () => {
    var card = 0;
    teamTitle.style.opacity = 1;

    function cardLoop() {
        // Sets timeout for 0.25s so the cards don't load at the same time
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

// Contact Section: Formats both tables as the screen is resized
// Contact Section: Removes every other td element and adds it to the table as a new tr element
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

// Contact Section: Removes every other tr element and adds it to the table as a new td element
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

// Wait for all DOM content to load
document.addEventListener("DOMContentLoaded", function(){
    logo = $("nav-icon")
    scrolling = $("scroll-view")
    link = $("right-contain")
    teamTitle = $("team-title")
    aboutTitle = $("about-title")
    aboutInfo = $("about-info")
    serviceTitle = $("services-title")
    about = $("about")
    serv = $("services")
    team = $("team")
    linkStyle = window.getComputedStyle(link)
    deck = document.getElementsByClassName("card")
    services = document.getElementsByClassName("service-item")
    aboutCount = 0
    servCount = 0
    teamCount = 0
    contactCount = 0
    body = document.getElementsByTagName('body')[0]
    let tables = document.getElementsByTagName("table")

    // Contact Section: Checks the inital width of the screen to format the tables
    if(body.clientWidth <= 460) {
        contactCount = 1
        for(let i = 0; i < tables.length; i++) {
            let tbody = tables[i].children[0]
            removeRow(tbody)
        }
    }

    // Contact Section: Calls the functions to format the tables as the screen resizes
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
        // Debugging function
        // scrollOutput()

        // About Section: Animations to underline design, build, and inspire (the borderBottom style is set since the animation ends and is removed from the elements)
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

        // Service Section
        if((window.pageYOffset >= serv.offsetTop-(about.offsetTop*0.7)) && (servCount != 1)) {
            servCount = 1
            serviceAnimation()
        }

        // Team Section
        if((window.pageYOffset >= team.offsetTop-(about.offsetTop*0.7)) && (teamCount != 1)) {
            teamCount = 1
            cardAnimation()
        }
    });

    // Opens and closes the dropdown menu whether the icon is clicked again or if the user clicks anywhere else on the page
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