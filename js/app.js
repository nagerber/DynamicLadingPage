/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/* Define Global Variables */
const navbarList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");


/* Start Helper Functions */

// Check if section is in viewport
function isInViewport(item) {
    const rect = item.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Deactivate active classes
function removeActiveClass(sectionId) {
    sectionId.classList.remove("your-active-class");
}


/* Begin Main Functions */

// Build the nav
document.addEventListener("load", createNavbar())

// Add class 'active' to section when near top of viewport
function addActiveClass(sectionId) {
    sectionId.classList.add("your-active-class");
}

// Scroll to anchor ID using scrollTO event
function scrollSmoothToSection() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    for (let link of anchorLinks) { 
        link.addEventListener("click", (event)=> {
        let anchor = link.getAttribute("href")
        let target = document.querySelector(anchor)
        target.scrollIntoView({
            behavior: "smooth"
            })
        history.pushState(null, null, anchor)
        event.preventDefault()
        })
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build the menu
function createNavbar() {
    for (let element of sections) {
        let createElement = document.createElement("li")
        let sectionName = element.getAttribute("data-nav");
        let sectionId = element.getAttribute("id");
        createElement.innerHTML = `<a href="#${sectionId}" class="menu__link">${sectionName}</a>`;
        navbarList.appendChild(createElement);
    }
}

// Scroll to section on link click
scrollSmoothToSection();

// Set sections as active
document.addEventListener("scroll", function(event) {
    event.preventDefault();
    for (let item of sections) {
        if (isInViewport(item)) {
            addActiveClass(item);
        }
        else {
            removeActiveClass(item);
        }
    }
})


// Test the performance (placing it on different parts of the code)
//const t0 = performance.now();
//const t1 = performance.now();
//console.log('T0 = ' + (t0) + 'milliseconds and T1 =' + (t1) + ' milliseconds');
