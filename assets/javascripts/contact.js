//----------------------------//
//        CONTACT FORM        //
//----------------------------//

let contactForm = {
    el: document.querySelector('#contact form'),
    loaderEl: document.querySelector('#contact #loader')
};

contactForm.el.addEventListener('submit', (e) => {
    e.preventDefault();
    contactFormAwait();

    let data = new FormData();
    data.append('email', document.querySelector('#contact form #email').value);
    data.append('message', document.querySelector('#contact form #message').value);

    fetch('/contact.php', {
        method: 'POST',
        body: data
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (typeof data.alert !== 'undefined') {
                contactFormDisplayMesssage(data.alert);
            } else {
                contactFormDisplayMesssage(null);
            }
        })
        .catch((error) => {
            contactFormDisplayMesssage(error);
        });
});

function contactFormAwait() {
    if (contactForm.loaderEl.classList.length <= 0) {
        contactForm.loaderEl.classList.add('active');
    } else {
        contactForm.loaderEl.classList.remove('active');
    }
}

function contactFormDisplayMesssage(message) {
    // @todo : display alert message after the form
    contactFormAwait();
}
