!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(i,r,function(e){return t[e]}.bind(null,r));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";var i;s.r(e),function(t){t.Src="src",t.Width="width",t.Height="height",t.Classes="classes",t.ViewBox="viewbox"}(i||(i={}));
/**
 * A Web Component to embed SVG symbols and easily manipulate them
 *
 * @module SvgIconSprite Web Component
 * @author Jan Suwart
 * @license MIT
 */
class r extends HTMLElement{constructor(){var t,e;super(),this.width="100%",this.height="100%",this.cssStyle="fill: currentColor;",this.metaPathSel="meta[data-svg-sprite-path]",this.metaEl=document.head.querySelector(this.metaPathSel),(null===(e=null===(t=this.metaEl)||void 0===t?void 0:t.dataset)||void 0===e?void 0:e.svgSpritePath)&&(this.defaultPath=this.metaEl.dataset.svgSpritePath)}static get observedAttributes(){return[i.Src,i.Width,i.Height,i.Classes,i.ViewBox]}connectedCallback(){this.render()}disconnectedCallback(){}adoptedCallback(){}attributeChangedCallback(t,e,s){switch(t){case i.Src:!s.includes("#")&&this.defaultPath?this.src=this.defaultPath+"#"+s:s&&(this.src=s);break;case i.Width:this.width=s;break;case i.Height:this.height=s;break;case i.Classes:this.classes=s;break;case i.ViewBox:this.viewBox=s}this.svgEl&&this.updateByProperty(t)}updateByProperty(t){switch(t){case i.Src:this.svgEl.querySelector("use").setAttribute("xlink:href",this.src);break;case i.Width:this.svgEl.setAttribute("width",this.width||"100%");break;case i.Height:this.svgEl.setAttribute("height",this.height||"100%");break;case i.Classes:this.svgEl.removeAttribute("class"),this.updateClassNames();break;case i.ViewBox:this.viewBox?this.svgEl.setAttribute("viewBox",this.viewBox):this.svgEl.removeAttribute("viewBox")}}render(){this.innerHTML=`\n      <svg width="${this.width}" height="${this.height}" style="${this.cssStyle}">\n        <use xlink:href="${this.src}" style="${this.cssStyle}">\n      </svg>\n    `,this.svgEl=this.querySelector("svg"),this.viewBox?this.svgEl.setAttribute("viewBox",this.viewBox):this.classes&&this.updateClassNames()}updateClassNames(){this.classes&&this.svgEl&&this.classes.split(" ").forEach(t=>{this.svgEl.classList.add(t)})}}customElements.define("svg-icon",r)}]);