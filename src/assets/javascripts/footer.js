import Typewriter from "typewriter-effect/dist/core";

let launched = false;
window.addEventListener('scroll', windowFooterScroll);

function windowFooterScroll() {
    const windowScrollTop = document.getElementsByTagName('html')[0].scrollTop;
    const windowHeight = document.getElementsByTagName('html')[0].offsetHeight;

    if(windowScrollTop + window.innerHeight - windowHeight > - 50 && launched === false) {
        launched = true;
        new Typewriter('.bravo', {
            strings: `Bravo! <br>
            You made it<br>to the footer. <br>
            <span class="cake-sentence">Here's a <span class="cake">🍰</span> and now you can take a rest.</span>`,
            autoStart: true,
            delay: 25
        }).callFunction(cakeIsALie);
    }
}

function cakeIsALie() {
    document.querySelector('.cake').addEventListener('click', function(){
        new Typewriter('.bravo', {
            strings: 'The Cake is a <b>lie</b>...',
            autoStart: true
        });
    });
}
