!function(e){var t={};function s(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t){class s extends HTMLElement{constructor(){super(),this.width="100%",this.height="100%",this.cssStyle="fill: currentColor;"}static get observedAttributes(){return["width","height","src","classes","color"]}connectedCallback(){console.log("Custom element added to page."),this.render()}disconnectedCallback(){console.log("Custom element removed from page.")}adoptedCallback(){console.log("Custom element moved to new page.")}attributeChangedCallback(e,t,s){switch(console.log("Custom element attr changed, name =>",e,"newValue =>",s,"(oldVal =>",t,")"),e){case"src":this.src=s;break;case"width":this.width=s;break;case"height":this.height=s;break;case"classes":this.classes=s;break;case"color":this.color=s;break;default:console.warn("Svg Icon does not support the attribute",e)}this.render()}render(){console.log("render.."),this.src||console.warn("src property is mandatory for SVG Icon"),this.classes&&this.classes.split(" ").forEach(e=>{this.classList.add(e)}),this.innerHTML=`\n      <svg width="${this.width}" height="${this.height}" style="${this.cssStyle}">\n        <use xlink:href="${this.src}" style="${this.cssStyle}">\n      </svg>\n    `}}customElements.define("svg-icon",s),console.log("SVG Icon Sprite init...")}]);