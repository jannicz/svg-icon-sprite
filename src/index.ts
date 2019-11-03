/**
 * TODO Add support for ES5: tsconfig change "target" to "es5" and add babel plugin
 * @see https://stackoverflow.com/questions/39037489/extending-htmlelement-constructor-fails-when-webpack-was-used
 */
class SvgIcon extends HTMLElement {

  width: string = '100%';
  height: string = '100%';
  classes: string;
  color: string;
  src: string;

  cssStyle: string = `fill: currentColor;`;

  static get observedAttributes() {
    return ['width', 'height', 'src', 'classes', 'color'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    console.log('Custom element added to page.');
    this.render();
  }

  disconnectedCallback() {
    console.log('Custom element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom element moved to new page.');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom element attr changed, name =>', name, 'newValue =>', newValue, '(oldVal =>', oldValue, ')');

    switch (name) {
      case 'src':
        this.src = newValue;
        break;
      case 'width':
        this.width = newValue;
        break;
      case 'height':
        this.height = newValue;
        break;
      case 'classes':
        this.classes = newValue;
        break;
      case 'color':
        this.color = newValue;
        break;
      default:
        console.warn('Svg Icon does not support the attribute', name);
    }

    this.render();
  }

  render() {
    console.log('render..');

    if (!this.src) {
      console.warn('src property is mandatory for SVG Icon');
    }

    if (this.classes) {
      this.classes.split(' ').forEach((className) => {
        this.classList.add(className);
      });
    }

    this.innerHTML = `
      <svg width="${this.width}" height="${this.height}" style="${this.cssStyle}">
        <use xlink:href="${this.src}" style="${this.cssStyle}">
      </svg>
    `;
  }
}

// Define the custom element as svg-icon
customElements.define('svg-icon', SvgIcon);

console.log('SVG Icon Sprite init...');
