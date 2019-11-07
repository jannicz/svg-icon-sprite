!function(e){var t={};function s(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(i,r,function(t){return e[t]}.bind(null,r));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";var i;s.r(t),function(e){e.Src="src",e.Width="width",e.Height="height",e.Classes="classes",e.ViewBox="viewbox"}(i||(i={}));
/**
 * A Web Component to embed SVG symbols and easily manipulate them
 *
 * @module SvgIconSprite Web Component
 * @author Jan Suwart
 * @license MIT
 */
class r extends HTMLElement{constructor(){super(),this.width="100%",this.height="100%",this.cssStyle="fill: currentColor;"}static get observedAttributes(){return[i.Src,i.Width,i.Height,i.Classes,i.ViewBox]}connectedCallback(){console.log("%cCustom element added to page","color: orange"),this.render()}disconnectedCallback(){console.log("Custom element removed from page.")}adoptedCallback(){console.log("Custom element moved to new page.")}attributeChangedCallback(e,t,s){switch(console.log("%cCustom element attribute changed","color: green",e,"newValue =>",s,"(oldVal =>",t,")"),e){case i.Src:this.src=s;break;case i.Width:this.width=s;break;case i.Height:this.height=s;break;case i.Classes:this.classes=s;break;case i.ViewBox:this.viewBox=s}this.svgEl&&this.updateByProperty(e)}updateByProperty(e){switch(console.log("%cUpdate property","color: cyan",e),e){case i.Src:this.svgEl.querySelector("use").setAttribute("xlink:href",this.src);break;case i.Width:this.svgEl.setAttribute("width",this.width||"100%");break;case i.Height:this.svgEl.setAttribute("height",this.height||"100%");break;case i.Classes:this.svgEl.removeAttribute("class"),this.updateClassNames();break;case i.ViewBox:this.viewBox?this.svgEl.setAttribute("viewBox",this.viewBox):this.svgEl.removeAttribute("viewBox")}}render(){console.count("Render SVG Element count"),this.innerHTML=`\n      <svg width="${this.width}" height="${this.height}" style="${this.cssStyle}">\n        <use xlink:href="${this.src}" style="${this.cssStyle}">\n      </svg>\n    `,this.svgEl=this.querySelector("svg"),this.viewBox?this.svgEl.setAttribute("viewBox",this.viewBox):this.classes&&this.updateClassNames()}updateClassNames(){this.classes&&this.svgEl&&this.classes.split(" ").forEach(e=>{this.svgEl.classList.add(e)})}}customElements.define("svg-icon",r)}]);