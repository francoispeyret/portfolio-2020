import { createPopper } from '@popperjs/core';


const buttons = document.querySelectorAll('.tooltip-button');

let popperInstance = [];

function create(button,tooltip) {
    popperInstance[tooltip.id] = createPopper(button, tooltip, {
        placement: 'bottom',
        modifiers: [
        {
            name: 'offset',
            options: {
            offset: [0, 8],
            },
        },
        ],
    });
}


function destroy(tooltip) {
    if (popperInstance[tooltip.id]) {
        popperInstance[tooltip.id].destroy();
        popperInstance[tooltip.id] = null;
    }
}

function show() {
    const tooltip = document.querySelector('#'+this.dataset.tooltipTarget);
    tooltip.setAttribute('data-show', '');
    create(this,tooltip);
}

function hide() {
    const tooltip = document.querySelector('#'+this.dataset.tooltipTarget);
    tooltip.removeAttribute('data-show');
    destroy(tooltip);
}

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

showEvents.forEach(event => {
    for(let button of buttons) {
        button.addEventListener(event, show);
    }
});

hideEvents.forEach(event => {
    for(let button of buttons) {
        button.addEventListener(event, hide);
    }
});