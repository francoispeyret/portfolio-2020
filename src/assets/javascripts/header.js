
import { gsap } from "gsap";

//-----------------------//
//        HEADER        //
//----------------------//


gsap.from("#header", {
    opacity:0,
    y: -100,
    duration: .6,
    delay: 1
});

gsap.from(".mouse-invit", {
    opacity:0,
    y: 100,
    duration: .6,
    delay: 1
});


let headerArrow = {
    el: document.querySelector('header .arrow'),
    step: 0
};

let main = {
    el: document.querySelector('main')
};

let menu = {
    el: document.querySelector('.header-menu'),
    linksEls: document.querySelectorAll('.header-menu a'),
    active: false
};

window.addEventListener('scroll', windowScroll);
window.addEventListener('resize', windowScroll);

function windowScroll() {

    const windowScrollTop = document.getElementsByTagName('html')[0].scrollTop;
    const documentHeight = document.getElementsByTagName('body')[0].offsetHeight;
    const menuWidth = main.el.offsetWidth - 50;
    const arrowPos = Math.floor((windowScrollTop ) * menuWidth / (documentHeight - window.innerHeight));

    gsap.to(headerArrow.el, {
        x: arrowPos,
        duration: .2,
        delay: .1
    });

    if(windowScrollTop > 50) {
        gsap.to(".mouse-invit", {
            opacity:0,
            y: 100,
            duration: 1
        });
    }
}

document.querySelector('#toggle-mobile').addEventListener('click', () => {
    mobileMenu();
});

for (let e = 0; e < menu.linksEls.length; e++) {
    menu.linksEls[e].addEventListener('click', () => {
        mobileMenu();
    });
}

function mobileMenu() {
    if (menu.active === true) {
        menu.el.classList.remove('active');
        main.el.classList.remove('menu-active');
    } else {
        menu.el.classList.add('active');
        main.el.classList.add('menu-active');
    }
    menu.active = !menu.active;
}
