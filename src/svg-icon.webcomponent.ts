import { SvgAttr } from './svg-attr.enum';

/**
 * A Web Component to embed SVG symbols and easily manipulate them
 *
 * @module SvgIconSprite Web Component
 * @author Jan Suwart
 * @license MIT
 */
class SvgIcon extends HTMLElement {

  // SVG Attributes
  src: string;
  width: string = '100%';
  height: string = '100%';
  classes: string;
  viewBox: string;

  // Private variables
  private cssStyle: string = `fill: currentColor;`;
  private svgEl: SVGElement;

  static get observedAttributes() {
    return [
      SvgAttr.Src,
      SvgAttr.Width,
      SvgAttr.Height,
      SvgAttr.Classes,
      SvgAttr.ViewBox
    ];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    console.log('%cCustom element added to page', 'color: orange');
    this.render();
  }

  disconnectedCallback() {
    console.log('Custom element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom element moved to new page.');
  }

  attributeChangedCallback(property, oldValue, newValue) {
    console.log('%cCustom element attribute changed', 'color: green', property, 'newValue =>', newValue, '(oldVal =>', oldValue, ')');

    switch (property) {
      case SvgAttr.Src:
        this.src = newValue;
        break;
      case SvgAttr.Width:
        this.width = newValue;
        break;
      case SvgAttr.Height:
        this.height = newValue;
        break;
      case SvgAttr.Classes:
        this.classes = newValue;
        break;
      case SvgAttr.ViewBox:
        this.viewBox = newValue;
        break;
    }

    if (this.svgEl) {
      this.updateByProperty(property);
    }
  }

  // Updates a single property that was changed
  updateByProperty(property: SvgAttr) {
    console.log('%cUpdate property', 'color: cyan', property);

    switch (property) {
      case SvgAttr.Src:
        const useEl = this.svgEl.querySelector('use');
        useEl.setAttribute('xlink:href', this.src);
        break;
      case SvgAttr.Width:
        this.svgEl.setAttribute('width', this.width || '100%');
        break;
      case SvgAttr.Height:
        this.svgEl.setAttribute('height', this.height || '100%');
        break;
      case SvgAttr.Classes:
        this.svgEl.removeAttribute('class');
        this.updateClassNames();
        break;
      case SvgAttr.ViewBox:
        if (this.viewBox) {
          this.svgEl.setAttribute('viewBox', this.viewBox);
        } else {
          this.svgEl.removeAttribute('viewBox');
        }
        break;
      default:
        break;
    }
  }

  render() {
    console.count('Render SVG Element count');
    // Mandatory attributes and the markup
    this.innerHTML = `
      <svg width="${this.width}" height="${this.height}" style="${this.cssStyle}">
        <use xlink:href="${this.src}" style="${this.cssStyle}">
      </svg>
    `;
    this.svgEl = this.querySelector('svg');

    // Optional attributes
    if (this.viewBox) {
      this.svgEl.setAttribute('viewBox', this.viewBox);
    } else if (this.classes) {
      this.updateClassNames();
    }
  }

  updateClassNames() {
    if (this.classes && this.svgEl) {
      this.classes.split(' ').forEach((className) => {
        this.svgEl.classList.add(className);
      });
    }
  }
}

// Define the custom element as svg-icon
customElements.define('svg-icon', SvgIcon);
