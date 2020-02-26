
let headerArrow = {
	el: document.querySelector('header .arrow'),
	step: 0
};
let main = {
	el: document.querySelector('main')
};

window.addEventListener('scroll', windowScroll);
window.addEventListener('resize', windowScroll);

function windowScroll(e) {
	const pos = main.el.getBoundingClientRect();
	const arrowPos = Math.floor((( -pos.y * (pos.width + 25) / pos.height) - 5));
	headerArrow.el.setAttribute('style', 'left:'+ arrowPos +'px');
}
