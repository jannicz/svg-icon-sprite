import { SvgAttr } from './svg-attr.enum';

/**
 * A Web Component to embed SVG symbols and easily manipulate them
 *
 * @module SvgIconSprite Web Component
 * @author Jan Suwart
 * @license MIT
 */
export class SvgIcon extends HTMLElement {

  // SVG Attributes
  src: string;
  width: string = '100%';
  height: string = '100%';
  classes: string;
  viewBox: string;

  // Default settings
  public defaultPath;

  // Private variables
  private cssStyle: string = `fill: currentColor;`;
  private svgEl: SVGElement;
  private metaEl: HTMLElement;
  private metaPathSel: string = `meta[data-svg-sprite-path]`;
  private errPrefix: string = `SVG-Icon Webcomponent:`;

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
    this.render();
  }

  disconnectedCallback() {
  }

  adoptedCallback() {
  }

  /**
   * Webcomponent callback that is called each time the any attribute changed
   */
  attributeChangedCallback(property: SvgAttr, oldValue: string, newValue: string) {
    switch (property) {
      case SvgAttr.Src:
        const containsPath = newValue.includes('#');

        if (!containsPath && !this.defaultPath) {
          // The icon uses a shortcut notation, find the default sprite path
          this.metaEl = document.head.querySelector(this.metaPathSel);

          if (this.metaEl?.dataset?.svgSpritePath) {
            this.defaultPath = this.metaEl.dataset.svgSpritePath;
          }
        }

        if (!newValue) {
          console.warn(`${this.errPrefix} src attribute missing`);
          return;
        }

        if (containsPath) {
          this.src = newValue;
        } else if (!containsPath && this.defaultPath) {
          // Path not included but defaultPath is available
          this.src = `${this.defaultPath}#${newValue}`;
        } else {
          // Neither path nor default path (in meta tag) included
          console.warn(`${this.errPrefix} "${newValue}" missing the path to the sprite and no default path is set`);
        }
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

  /**
   * Updates a single property that was changed
   */
  updateByProperty(property: SvgAttr) {
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

  /**
   * Sets all mandatory attributes and generates the SVG markup
   */
  render() {
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
