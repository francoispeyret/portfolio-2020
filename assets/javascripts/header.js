
//-----------------------//
//        HEADER        //
//----------------------//
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

function windowScroll(e) {
	const pos = main.el.getBoundingClientRect();
	const arrowPos = Math.floor((( -pos.y * (pos.width + 25) / pos.height) - 5));
	headerArrow.el.setAttribute('style', 'left:'+ arrowPos +'px');
}

document.querySelector('#toggle-mobile').addEventListener('click', () => {
    mobileMenu();
});

for(let e = 0; e < menu.linksEls.length; e++) {
    menu.linksEls[e].addEventListener('click', () => {
        mobileMenu();
    })
}

function mobileMenu() {
    if(menu.active === true) {
        menu.el.classList.remove('active');
        main.el.classList.remove('menu-active');
    } else {
        menu.el.classList.add('active');
        main.el.classList.add('menu-active');
    }
    menu.active = !menu.active;
}
