/**
 * TODO Add support for ES5: tsconfig change "target" to "es5" and add babel plugin
 * @see https://stackoverflow.com/questions/39037489/extending-htmlelement-constructor-fails-when-webpack-was-used
 */
class SvgIcon extends HTMLElement {
    // Specify observed attributes so that
    // attributeChangedCallback will work
    static get observedAttributes() {
        return ['c', 'l'];
    }

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const div = document.createElement('div');
        const style = document.createElement('style');
        shadow.appendChild(style);
        shadow.appendChild(div);
    }

    connectedCallback() {
        console.log('Custom svg icon element added to page.');
        updateStyle(this);
    }

    disconnectedCallback() {
        console.log('Custom svg icon element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom svg icon element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.');
        updateStyle(this);
    }
}

customElements.define('svg-icon', SvgIcon);

function updateStyle(elem) {
    console.log('Update element');

    const shadow = elem.shadowRoot;
    shadow.querySelector('style').textContent = `
    div {
      width: ${elem.getAttribute('l')}px;
      height: ${elem.getAttribute('l')}px;
      background-color: ${elem.getAttribute('c')};
    }
  `;
}

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');
let square;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

add.addEventListener('click', () => {
    console.log('Add SVG to Dom');
    // Create a custom square element
    square = document.createElement('svg-icon');
    square.setAttribute('l', '100');
    square.setAttribute('c', 'red');
    document.body.appendChild(square);
});

update.addEventListener('click', () => {
    square.setAttribute('l', random(50, 200));
    square.setAttribute('c', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
});

remove.addEventListener('click', () => {
    document.body.removeChild(square);

    update.setAttribute('disabled', 'disabled');
    remove.setAttribute('disabled', 'disabled');
    add.removeAttribute('disabled');
});

console.log('SVG Icon Sprite init...');
