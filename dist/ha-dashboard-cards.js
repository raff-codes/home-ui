!function(){"use strict";function t(t,e,i,r){var s,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var o=t.length-1;o>=0;o--)(s=t[o])&&(a=(n<3?s(a):n>3?s(e,i,a):s(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new n(i,t,r)},o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,f=u.trustedTypes,v=f?f.emptyScript:"",b=u.reactiveElementPolyfillSupport,x=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},m=(t,e)=>!d(t,e),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:m};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&l(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const n=r?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=r;const n=s.fromAttribute(e,t.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const n=this.constructor;if(!1===r&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??m)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[x("elementProperties")]=new Map,_[x("finalized")]=new Map,b?.({ReactiveElement:_}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,C=$.trustedTypes,A=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+E,M=`<${z}>`,P=document,j=()=>P.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,T="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,U=/>/g,H=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,R=/"/g,L=/^(?:script|style|textarea|title)$/i,q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=q(1),V=q(2),F=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),G=new WeakMap,Z=P.createTreeWalker(P,129);function J(t,e){if(!B(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,r=[];let s,n=2===e?"<svg>":3===e?"<math>":"",a=D;for(let e=0;e<i;e++){const i=t[e];let o,d,l=-1,c=0;for(;c<i.length&&(a.lastIndex=c,d=a.exec(i),null!==d);)c=a.lastIndex,a===D?"!--"===d[1]?a=O:void 0!==d[1]?a=U:void 0!==d[2]?(L.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=H):void 0!==d[3]&&(a=H):a===H?">"===d[0]?(a=s??D,l=-1):void 0===d[1]?l=-2:(l=a.lastIndex-d[2].length,o=d[1],a=void 0===d[3]?H:'"'===d[3]?R:I):a===R||a===I?a=H:a===O||a===U?a=D:(a=H,s=void 0);const h=a===H&&t[e+1].startsWith("/>")?" ":"";n+=a===D?i+M:l>=0?(r.push(o),i.slice(0,l)+S+i.slice(l)+E+h):i+E+(-2===l?e:h)}return[J(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Y{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,n=0;const a=t.length-1,o=this.parts,[d,l]=X(t,e);if(this.el=Y.createElement(d,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Z.nextNode())&&o.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(S)){const e=l[n++],i=r.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);o.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?rt:"?"===a[1]?st:"@"===a[1]?nt:it}),r.removeAttribute(t)}else t.startsWith(E)&&(o.push({type:6,index:s}),r.removeAttribute(t));if(L.test(r.tagName)){const t=r.textContent.split(E),e=t.length-1;if(e>0){r.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],j()),Z.nextNode(),o.push({type:2,index:++s});r.append(t[e],j())}}}else if(8===r.nodeType)if(r.data===z)o.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(E,t+1));)o.push({type:7,index:s}),t+=E.length-1}s++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,r){if(e===F)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const n=N(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,r)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??P).importNode(e,!0);Z.currentNode=r;let s=Z.nextNode(),n=0,a=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new et(s,s.nextSibling,this,t):1===o.type?e=new o.ctor(s,o.name,o.strings,this,t):6===o.type&&(e=new at(s,this,t)),this._$AV.push(e),o=i[++a]}n!==o?.index&&(s=Z.nextNode(),n++)}return Z.currentNode=P,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),N(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>B(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new tt(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Y(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new et(this.O(j()),this.O(j()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,r){const s=this.strings;let n=!1;if(void 0===s)t=Q(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const r=t;let a,o;for(t=s[0],a=0;a<s.length-1;a++)o=Q(this,r[i+a],e,a),o===F&&(o=this._$AH[a]),n||=!N(o)||o!==this._$AH[a],o===K?t=K:t!==K&&(t+=(o??"")+s[a+1]),this._$AH[a]=o}n&&!r&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class st extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class nt extends it{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??K)===F)return;const i=this._$AH,r=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==K&&(i===K||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=$.litHtmlPolyfillSupport;ot?.(Y,et),($.litHtmlVersions??=[]).push("3.3.2");const dt=globalThis;class lt extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new et(e.insertBefore(j(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}lt._$litElement$=!0,lt.finalized=!0,dt.litElementHydrateSupport?.({LitElement:lt});const ct=dt.litElementPolyfillSupport;ct?.({LitElement:lt}),(dt.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:m},gt=(t=pt,e,i)=>{const{kind:r,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,s,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];e.call(this,i),this.requestUpdate(r,s,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};function ut(t){return(e,i)=>"object"==typeof i?gt(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ft(t){return ut({...t,state:!0,attribute:!1})}const vt=(t=!1)=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="${t?"currentColor":"none"}" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18h6"/>
    <path d="M10 22h4"/>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5C8.35 12.26 8.82 13.02 9 14"/>
  </svg>
`,bt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
  </svg>
`,xt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
`,yt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
`,mt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 12c-2-2.67-6-6-6-6s4-0.67 6 2c2-2.67 6-2 6-2s-4 3.33-6 6z"/>
    <path d="M12 12c2 2.67 6 6 6 6s-4 0.67-6-2c-2 2.67-6 2-6 2s4-3.33 6-6z"/>
    <circle cx="12" cy="12" r="1"/>
  </svg>
`,wt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3"/>
    <circle cx="17" cy="4" r="2"/>
    <path d="M18 9l-3 6"/>
    <path d="M13 18l-1-3"/>
  </svg>
`,_t=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="currentColor" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
`,$t=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="currentColor" stroke="none">
    <rect x="6" y="4" width="4" height="16"/>
    <rect x="14" y="4" width="4" height="16"/>
  </svg>
`,kt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="currentColor" stroke="none">
    <polygon points="5 4 15 12 5 20 5 4"/>
    <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2"/>
  </svg>
`,Ct=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="currentColor" stroke="none">
    <polygon points="19 20 9 12 19 4 19 20"/>
    <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" stroke-width="2"/>
  </svg>
`,At=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
`,St=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="23" y1="9" x2="17" y2="15"/>
    <line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
`,Et=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
`,zt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
`,Mt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2v2"/>
    <path d="M4.93 4.93l1.41 1.41"/>
    <path d="M20 12h2"/>
    <path d="M19.07 4.93l-1.41 1.41"/>
    <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/>
    <path d="M13 22H7a5 5 0 1 1 .9-9.908A6 6 0 0 1 19 16a4.993 4.993 0 0 1-6 0"/>
  </svg>
`,Pt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    <line x1="8" y1="21" x2="8" y2="23"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="16" y1="21" x2="16" y2="23"/>
  </svg>
`,jt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2"/>
    <path d="M12.59 19.41A2 2 0 1 0 14 16H2"/>
    <path d="M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2"/>
  </svg>
`,Nt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
`,Bt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
`,Tt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
`,Dt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="2" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/>
    <line x1="9" y1="2" x2="12" y2="5"/>
    <line x1="15" y1="2" x2="12" y2="5"/>
    <line x1="2" y1="9" x2="5" y2="12"/>
    <line x1="2" y1="15" x2="5" y2="12"/>
    <line x1="22" y1="9" x2="19" y2="12"/>
    <line x1="22" y1="15" x2="19" y2="12"/>
    <line x1="9" y1="22" x2="12" y2="19"/>
    <line x1="15" y1="22" x2="12" y2="19"/>
  </svg>
`,Ot=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
`,Ut=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
`,Ht=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
`,It=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
`,Rt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
`,Lt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
`,qt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
`,Wt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
`,Vt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2"/>
    <line x1="23" y1="13" x2="23" y2="11"/>
  </svg>
`,Ft=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2"/>
    <line x1="23" y1="13" x2="23" y2="11"/>
    <line x1="5" y1="10" x2="5" y2="14"/>
  </svg>
`,Kt=()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2"/>
    <line x1="23" y1="13" x2="23" y2="11"/>
    <polyline points="11 9 8 13 13 13 10 17"/>
  </svg>
`,Gt=(t,e=!1)=>{const i={bulb:vt,power:()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
    <line x1="12" y1="2" x2="12" y2="12"/>
  </svg>
`,thermometer:()=>bt(),droplet:()=>xt(),bolt:()=>yt(),fan:()=>mt(),motion:()=>wt(),play:()=>_t(),pause:()=>$t(),skipForward:()=>kt(),skipBack:()=>Ct(),volume:()=>At(),volumeMuted:()=>St(),sun:()=>Et(),cloud:()=>zt(),cloudSun:()=>Mt(),rain:()=>Pt(),wind:()=>jt(),coffee:()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
    <line x1="6" y1="2" x2="6" y2="4"/>
    <line x1="10" y1="2" x2="10" y2="4"/>
    <line x1="14" y1="2" x2="14" y2="4"/>
  </svg>
`,chevronUp:()=>Nt(),chevronDown:()=>Bt(),flame:()=>Tt(),snowflake:()=>Dt(),camera:()=>Ot(),scene:()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <polyline points="17 2 12 7 7 2"/>
  </svg>
`,person:()=>Ut(),home:()=>Ht(),mapPin:()=>It(),bell:()=>Rt(),shoppingCart:()=>Lt(),check:()=>qt(),plus:()=>Wt(),speed:()=>W`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/>
    <path d="M12 12l5-5"/>
    <circle cx="12" cy="12" r="1"/>
  </svg>
`,batteryFull:()=>Vt(),batteryLow:()=>Ft(),batteryCharging:()=>Kt()};return(i[t]??i.power)(e)},Zt=a`
  :host {
    --card-bg: rgba(30, 30, 46, 0.95);
    --card-bg-active: rgba(59, 34, 104, 0.4);
    --card-radius: 20px;
    --card-padding: 16px;
    --card-border: 1px solid rgba(255, 255, 255, 0.06);
    --accent: #8b5cf6;
    --accent-light: #a78bfa;
    --accent-glow: rgba(139, 92, 246, 0.3);
    --toggle-on: #8b5cf6;
    --toggle-off: #3f3f5c;
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.55);
    --text-tertiary: rgba(255, 255, 255, 0.35);
    --transition-fast: 300ms ease;
    --transition-glow: 500ms ease;
    --font-stack: system-ui, -apple-system, sans-serif;
    --sky: #38bdf8;
    --amber: #fbbf24;
    --emerald: #34d399;
    --purple: #8b5cf6;
    --rose: #fb7185;
    display: block;
    font-family: var(--font-stack);
  }

  .card {
    position: relative;
    overflow: hidden;
    background: var(--card-bg);
    border: var(--card-border);
    border-radius: var(--card-radius);
    padding: var(--card-padding);
    transition: background var(--transition-fast), box-shadow var(--transition-glow);
    color: var(--text-primary);
  }

  .card-active {
    background: var(--card-bg-active);
  }

  .card-inactive {
    background: var(--card-bg);
  }

  .glow-overlay {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    pointer-events: none;
    border-radius: 50%;
    transition: opacity var(--transition-glow);
    opacity: 0;
  }

  .glow-overlay.active {
    opacity: 1;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: background var(--transition-fast), color var(--transition-fast);
    flex-shrink: 0;
  }

  .info {
    flex: 1;
    min-width: 0;
  }

  .name {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .state-text {
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 2px;
  }

  .toggle-switch {
    position: relative;
    width: 44px;
    height: 24px;
    border-radius: 12px;
    background: var(--toggle-off);
    cursor: pointer;
    transition: background var(--transition-fast);
    border: none;
    padding: 0;
    flex-shrink: 0;
  }

  .toggle-switch[aria-checked="true"] {
    background: var(--toggle-on);
  }

  .toggle-knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    transition: transform var(--transition-fast);
    pointer-events: none;
  }

  .toggle-switch[aria-checked="true"] .toggle-knob {
    transform: translateX(20px);
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: var(--toggle-off);
    outline: none;
    margin: 8px 0;
    position: relative;
    z-index: 1;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  }

  input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  }

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: color var(--transition-fast), background var(--transition-fast);
    padding: 0;
  }

  .icon-btn:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.1);
  }

  .icon-btn.primary {
    width: 44px;
    height: 44px;
    background: var(--accent);
    color: var(--text-primary);
  }

  .icon-btn.primary:hover {
    background: var(--accent-light);
  }

  .status-dot {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--toggle-off);
    transition: background var(--transition-fast), box-shadow var(--transition-glow);
  }

  @keyframes equaliser {
    0%, 100% { height: 4px; }
    50% { height: var(--bar-height, 16px); }
  }

  .eq-bar {
    width: 4px;
    border-radius: 2px;
    background: var(--accent);
    animation: equaliser 0.8s ease-in-out infinite;
    animation-play-state: paused;
  }

  .eq-bar.playing {
    animation-play-state: running;
  }
`;let Jt=class extends lt{setConfig(t){if(!t.entities||!Array.isArray(t.entities)||0===t.entities.length)throw new Error("At least one entity is required in the entities array");this._config={low_threshold:20,...t}}getCardSize(){return Math.max(2,Math.ceil(this._config?.entities?.length/2)+1)}static getStubConfig(){return{entities:[{entity:"sensor.phone_battery",name:"Phone"}],name:"Batteries"}}_getBatteries(){if(!this.hass||!this._config)return[];const t=[];for(const e of this._config.entities){const i=this.hass.states[e.entity];if(!i)continue;let r=null;const s=i.attributes;if(null!=s.battery_level)r=Number(s.battery_level);else if(null!=s.battery)r=Number(s.battery);else if("battery"===s.device_class)r=Number(i.state);else{const t=Number(i.state);!Number.isNaN(t)&&t>=0&&t<=100&&(r=t)}if(null==r||Number.isNaN(r))continue;const n=!0===s.is_charging||!0===s.charging||"charging"===i.state;t.push({entityId:e.entity,name:e.name||s.friendly_name||e.entity,level:Math.round(Math.min(100,Math.max(0,r))),charging:n,icon:e.icon})}return t.sort((t,e)=>t.level-e.level)}_getBarColour(t){return t<=(this._config?.low_threshold??20)?"#ef4444":t<=40?"#fbbf24":"#34d399"}_getBatteryIcon(t,e){return e?Kt():t<=(this._config?.low_threshold??20)?Ft():Vt()}render(){if(!this._config||!this.hass)return K;const t=this._getBatteries(),e=this._config.name??"Batteries",i=this._config.low_threshold??20,r=t.filter(t=>t.level<=i).length;return W`
      <ha-card>
        <div class="header">
          <div class="icon-circle">${Vt()}</div>
          <div class="info">
            <div class="title">${e}</div>
            <div class="subtitle">
              ${t.length} device${1!==t.length?"s":""}${r>0?W` · <span class="low-warn">${r} low</span>`:K}
            </div>
          </div>
        </div>

        ${t.length>0?W`
          <div class="list">
            ${t.map(t=>W`
                <div class="row">
                  <div class="row-icon" style="color: ${this._getBarColour(t.level)}">
                    ${t.icon?Gt(t.icon):this._getBatteryIcon(t.level,t.charging)}
                  </div>
                  <div class="row-info">
                    <div class="row-top">
                      <span class="row-name">${t.name}</span>
                      <span class="row-pct" style="color: ${this._getBarColour(t.level)}">
                        ${t.level}%${t.charging?W` <span class="charging-badge">⚡</span>`:K}
                      </span>
                    </div>
                    <div class="bar-track">
                      <div class="bar-fill"
                        style="width: ${t.level}%; background: ${this._getBarColour(t.level)};"></div>
                    </div>
                  </div>
                </div>
              `)}
          </div>
        `:W`<div class="empty">No battery data available</div>`}
      </ha-card>
    `}};Jt.styles=[Zt,a`
      :host {
        grid-column: span 2;
      }

      ha-card {
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
        padding-bottom: 8px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px 16px 12px;
      }

      .icon-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(52, 211, 153, 0.12);
        color: #34d399;
        flex-shrink: 0;
      }

      .icon-circle svg {
        width: 18px;
        height: 18px;
      }

      .info {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-size: 14px;
        font-weight: 600;
      }

      .subtitle {
        font-size: 11px;
        color: var(--text-secondary);
        margin-top: 1px;
      }

      .low-warn {
        color: #ef4444;
        font-weight: 600;
      }

      .list {
        padding: 0 12px;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 4px;
        border-radius: 8px;
        transition: background 0.15s;
      }

      .row:hover {
        background: rgba(255, 255, 255, 0.03);
      }

      .row-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        flex-shrink: 0;
      }

      .row-icon svg {
        width: 18px;
        height: 18px;
      }

      .row-info {
        flex: 1;
        min-width: 0;
      }

      .row-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
      }

      .row-name {
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .row-pct {
        font-size: 12px;
        font-weight: 700;
        flex-shrink: 0;
        margin-left: 8px;
      }

      .charging-badge {
        font-size: 10px;
      }

      .bar-track {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.06);
        overflow: hidden;
      }

      .bar-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.5s ease;
      }

      .empty {
        padding: 20px 16px;
        text-align: center;
        font-size: 13px;
        color: var(--text-tertiary);
      }
    `],t([ut({attribute:!1})],Jt.prototype,"hass",void 0),t([ft()],Jt.prototype,"_config",void 0),Jt=t([ht("dashboard-battery-card")],Jt),window.customCards=window.customCards||[],window.customCards.push({type:"dashboard-battery-card",name:"Dashboard Battery Card",description:"Battery tracker for cameras, phones, and other battery-powered devices."});let Xt=class extends lt{setConfig(t){if(!t.entity||!t.entity.startsWith("camera."))throw new Error("A valid camera entity is required");this._config={aspect_ratio:"16:9",...t}}getCardSize(){return 4}static getStubConfig(){return{entity:"camera.front_door",name:"Front Door"}}get _entity(){if(this.hass&&this._config)return this.hass.states[this._config.entity]}_getName(){return this._config?.name?this._config.name:this._entity?.attributes?.friendly_name??this._config?.entity??"Camera"}_getImageUrl(){const t=this._entity;if(!t)return null;const e=t.attributes?.entity_picture;return e||null}_getAspectPadding(){const t=(this._config?.aspect_ratio??"16:9").split(":");if(2===t.length){const e=Number.parseFloat(t[0]),i=Number.parseFloat(t[1]);if(e>0&&i>0)return i/e*100+"%"}return"56.25%"}render(){if(!this._config||!this.hass)return K;const t=this._entity;if(!t)return K;const e=this._getName(),i=this._getImageUrl(),r="idle"===t.state,s="streaming"===t.state?"Live":t.state;return W`
      <ha-card>
        <div class="header">
          <div class="icon-circle">${Ot()}</div>
          <div class="info">
            <div class="name">${e}</div>
            <div class="state ${"streaming"===t.state?"live":""}">
              ${"streaming"===t.state?W`<span class="live-dot"></span>`:K}
              ${s}
            </div>
          </div>
        </div>
        <div class="feed" style="padding-bottom: ${this._getAspectPadding()}">
          ${i?W`<img src="${i}" alt="${e}" class="feed-img" />`:W`
              <div class="placeholder ${r?"idle":""}">
                <div class="placeholder-icon">${Ot()}</div>
                <span>${r?"Camera Idle":"No Feed"}</span>
              </div>
            `}
        </div>
      </ha-card>
    `}};Xt.styles=[Zt,a`
      :host {
        grid-column: span 2;
      }

      ha-card {
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
      }

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 16px;
      }

      .icon-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        color: var(--text-secondary);
        flex-shrink: 0;
      }

      .icon-circle svg {
        width: 18px;
        height: 18px;
      }

      .info {
        flex: 1;
        min-width: 0;
      }

      .name {
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .state {
        font-size: 11px;
        color: var(--text-secondary);
        text-transform: capitalize;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .state.live {
        color: #ef4444;
      }

      .live-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #ef4444;
        animation: pulse-live 1.5s ease-in-out infinite;
      }

      @keyframes pulse-live {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }

      .feed {
        position: relative;
        width: 100%;
        background: #0a0a14;
      }

      .feed-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .placeholder {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: var(--text-secondary);
        font-size: 12px;
      }

      .placeholder.idle {
        background: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(255, 255, 255, 0.02) 10px,
          rgba(255, 255, 255, 0.02) 20px
        );
      }

      .placeholder-icon {
        opacity: 0.3;
      }

      .placeholder-icon svg {
        width: 32px;
        height: 32px;
      }
    `],t([ut({attribute:!1})],Xt.prototype,"hass",void 0),t([ft()],Xt.prototype,"_config",void 0),Xt=t([ht("dashboard-camera-card")],Xt),window.customCards=window.customCards||[],window.customCards.push({type:"dashboard-camera-card",name:"Dashboard Camera Card",description:"Camera feed card with live indicator and aspect ratio support."});const Yt=(t,e,i)=>Math.min(Math.max(t,e),i),Qt=(t,e)=>{let i;return(...r)=>{void 0!==i&&clearTimeout(i),i=setTimeout(()=>t(...r),e)}};let te=class extends lt{constructor(){super(...arguments),this.handleTempUp=()=>{if(!this.hass||!this._config)return;const t=this.hass.states[this._config.entity];if(!t)return;const e=this._config.step??.5,i=t.attributes.temperature??0,r=t.attributes.max_temp??35,s=Yt(i+e,t.attributes.min_temp??7,r);this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:s})},this.handleTempDown=()=>{if(!this.hass||!this._config)return;const t=this.hass.states[this._config.entity];if(!t)return;const e=this._config.step??.5,i=t.attributes.temperature??0,r=t.attributes.min_temp??7,s=Yt(i-e,r,t.attributes.max_temp??35);this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:s})},this.handleKeyDown=t=>e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),"up"===t?this.handleTempUp():this.handleTempDown())}}setConfig(t){if(!t.entity)throw new Error("Entity is required");if(!t.entity.startsWith("climate."))throw new Error("Entity must be a climate entity");this._config=t}getCardSize(){return 2}static getStubConfig(){return{entity:"climate.thermostat"}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity,e=this.hass.states[t];if(!e)return K;const i=e.attributes,r="heating"===i.hvac_action,s=i.current_temperature??0,n=i.temperature??0,a=i.min_temp??7,o=i.max_temp??35,d=this._config.name??i.friendly_name??t,l=`${r?"Heating":"Idle"} · Currently ${s}°C`,c=o-a,h=Yt(c>0?(s-a)/c*100:0,0,100),p=r?"#fb923c":"#4b5563";return W`
      <ha-card>
        ${r?W`<div class="glow"></div>`:K}

        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="icon" style="color: ${p}">
              ${Tt()}
            </div>
            <div class="header-text">
              <span class="name">${d}</span>
              <span class="subtitle">${l}</span>
            </div>
          </div>

          <!-- Target temperature with controls -->
          <div class="controls">
            <button
              class="btn"
              @click=${this.handleTempDown}
              @keydown=${this.handleKeyDown("down")}
              aria-label="Decrease temperature"
            >
              ${Bt()}
            </button>

            <span class="target" style="color: ${p}">
              ${n}<span class="unit">&deg;C</span>
            </span>

            <button
              class="btn"
              @click=${this.handleTempUp}
              @keydown=${this.handleKeyDown("up")}
              aria-label="Increase temperature"
            >
              ${Nt()}
            </button>
          </div>

          <!-- Temperature progress bar -->
          <div class="bar-wrapper">
            <span class="bar-label">${a}&deg;</span>
            <div class="bar">
              <div
                class="bar-fill ${r?"heating":"idle"}"
                style="width: ${h}%"
              ></div>
            </div>
            <span class="bar-label">${o}&deg;</span>
          </div>
        </div>
      </ha-card>
    `}};te.styles=[Zt,a`
      :host {
        display: block;
        grid-column: span 2;
      }

      ha-card {
        position: relative;
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
      }

      /* Radial orange glow overlay when heating */
      .glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(
          ellipse at 50% 0%,
          rgba(251, 146, 60, 0.15) 0%,
          transparent 70%
        );
        pointer-events: none;
        z-index: 0;
      }

      .container {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
        z-index: 1;
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
      }

      .icon svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }

      .header-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .name {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color, #e0e0e0);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .subtitle {
        font-size: 12px;
        color: var(--secondary-text-color, #9e9e9e);
      }

      /* Target temperature controls */
      .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
      }

      .target {
        font-size: 24px;
        font-weight: 300;
        line-height: 1;
      }

      .target .unit {
        font-size: 14px;
        font-weight: 400;
        opacity: 0.7;
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 50%;
        background: var(--card-background-color, rgba(255, 255, 255, 0.05));
        color: var(--primary-text-color, #e0e0e0);
        cursor: pointer;
        transition: background 0.2s ease;
        padding: 0;
      }

      .btn:hover {
        background: var(--secondary-background-color, rgba(255, 255, 255, 0.1));
      }

      .btn:active {
        transform: scale(0.95);
      }

      .btn svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }

      /* Progress bar */
      .bar-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .bar-label {
        font-size: 11px;
        color: var(--secondary-text-color, #9e9e9e);
        flex-shrink: 0;
        min-width: 24px;
        text-align: center;
      }

      .bar {
        flex: 1;
        height: 6px;
        border-radius: 3px;
        background: var(--divider-color, rgba(255, 255, 255, 0.08));
        overflow: hidden;
      }

      .bar-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.4s ease;
      }

      .bar-fill.heating {
        background: linear-gradient(90deg, #fb923c, #ef4444);
      }

      .bar-fill.idle {
        background: #4b5563;
      }
    `],t([ut({attribute:!1})],te.prototype,"hass",void 0),t([ft()],te.prototype,"_config",void 0),te=t([ht("dashboard-climate-card")],te),window.customCards=window.customCards??[],window.customCards.push({type:"dashboard-climate-card",name:"Climate Card",description:"Climate control card with target temperature adjustment and heating state visualisation."});let ee=class extends lt{setConfig(t){if(!t.entity)throw new Error("A doorbell entity is required");this._config=t}getCardSize(){return 4}static getStubConfig(){return{entity:"binary_sensor.doorbell",camera_entity:"camera.doorbell"}}get _doorbellEntity(){if(this.hass&&this._config)return this.hass.states[this._config.entity]}get _cameraEntity(){if(this.hass&&this._config?.camera_entity)return this.hass.states[this._config.camera_entity]}_getName(){return this._config?.name?this._config.name:this._doorbellEntity?.attributes?.friendly_name??this._config?.entity??"Doorbell"}_isRinging(){const t=this._doorbellEntity;return"on"===t?.state}_hasMotion(){const t=this._doorbellEntity,e=t?.attributes;return!0===e?.motion||"motion"===t?.state}_getCameraImage(){return this._cameraEntity?.attributes?.entity_picture??null}_getLastEvent(){const t=this._doorbellEntity;if(!t?.last_changed)return"";const e=Date.now()-new Date(t.last_changed).getTime(),i=Math.floor(e/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const r=Math.floor(i/60);return r<24?`${r}h ago`:`${Math.floor(r/24)}d ago`}render(){if(!this._config||!this.hass)return K;if(!this._doorbellEntity)return K;const t=this._getName(),e=this._isRinging(),i=this._hasMotion(),r=this._getCameraImage(),s=this._getLastEvent();return W`
      <ha-card class="${e?"ringing":""}">
        <div class="header">
          <div class="icon-circle ${e?"alert":""}">
            ${Rt()}
          </div>
          <div class="info">
            <div class="name">${t}</div>
            <div class="event-row">
              ${e?W`<span class="badge ring-badge">Ringing</span>`:K}
              ${i?W`<span class="badge motion-badge">Motion</span>`:K}
              ${e||i?K:W`<span class="idle-text">Idle</span>`}
            </div>
          </div>
          ${s?W`<span class="last-event">${s}</span>`:K}
        </div>

        <div class="feed">
          ${r?W`<img src="${r}" alt="${t}" class="feed-img" />`:W`
              <div class="placeholder">
                <div class="placeholder-icon">${Ot()}</div>
                <span>${this._config.camera_entity?"No Feed":"No Camera"}</span>
              </div>
            `}
          ${e?W`<div class="ring-overlay">
                <div class="ring-pulse"></div>
              </div>`:K}
        </div>

        ${e||i?W`
            <div class="notification-bar">
              ${e?W`<span class="notif-text">Someone is at the door</span>`:W`<span class="notif-text">Motion detected</span>`}
            </div>
          `:K}
      </ha-card>
    `}};ee.styles=[Zt,a`
      :host {
        grid-column: span 2;
      }

      ha-card {
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
        transition: border-color 0.3s;
      }

      ha-card.ringing {
        border-color: rgba(251, 113, 133, 0.3);
        animation: card-pulse 2s ease-in-out infinite;
      }

      @keyframes card-pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(251, 113, 133, 0); }
        50% { box-shadow: 0 0 20px 0 rgba(251, 113, 133, 0.15); }
      }

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 16px;
      }

      .icon-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        color: var(--text-secondary);
        transition: all 0.3s;
        flex-shrink: 0;
      }

      .icon-circle svg {
        width: 18px;
        height: 18px;
      }

      .icon-circle.alert {
        background: rgba(251, 113, 133, 0.15);
        color: #fb7185;
        animation: bell-ring 0.5s ease-in-out infinite alternate;
      }

      @keyframes bell-ring {
        0% { transform: rotate(-8deg); }
        100% { transform: rotate(8deg); }
      }

      .info {
        flex: 1;
        min-width: 0;
      }

      .name {
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .event-row {
        display: flex;
        gap: 6px;
        margin-top: 2px;
      }

      .badge {
        font-size: 10px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 8px;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }

      .ring-badge {
        background: rgba(251, 113, 133, 0.15);
        color: #fb7185;
      }

      .motion-badge {
        background: rgba(251, 191, 36, 0.15);
        color: #fbbf24;
      }

      .idle-text {
        font-size: 11px;
        color: var(--text-secondary);
      }

      .last-event {
        font-size: 10px;
        color: var(--text-tertiary);
        flex-shrink: 0;
      }

      .feed {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
        background: #0a0a14;
      }

      .feed-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .placeholder {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: var(--text-secondary);
        font-size: 12px;
      }

      .placeholder-icon {
        opacity: 0.3;
      }

      .placeholder-icon svg {
        width: 32px;
        height: 32px;
      }

      .ring-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }

      .ring-pulse {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 3px solid rgba(251, 113, 133, 0.6);
        animation: ring-expand 1.5s ease-out infinite;
      }

      @keyframes ring-expand {
        0% { transform: scale(0.5); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }

      .notification-bar {
        padding: 10px 16px;
        background: rgba(251, 113, 133, 0.08);
        border-top: 1px solid rgba(251, 113, 133, 0.1);
      }

      .notif-text {
        font-size: 12px;
        font-weight: 500;
        color: #fb7185;
      }
    `],t([ut({attribute:!1})],ee.prototype,"hass",void 0),t([ft()],ee.prototype,"_config",void 0),ee=t([ht("dashboard-doorbell-card")],ee),window.customCards=window.customCards||[],window.customCards.push({type:"dashboard-doorbell-card",name:"Dashboard Doorbell Card",description:"Doorbell card with camera feed and event notifications."});const ie=["off","low","medium","high"];let re=class extends lt{constructor(){super(...arguments),this.handleToggle=()=>{this.hass&&this._config&&this.hass.callService("fan","toggle",{entity_id:this._config.entity})},this.handleSetSpeed=t=>{this.hass&&this._config&&("off"!==t?this.hass.callService("fan","set_preset_mode",{entity_id:this._config.entity,preset_mode:t}):this.hass.callService("fan","turn_off",{entity_id:this._config.entity}))},this.handlePercentageChange=t=>{if(!this.hass||!this._config)return;const e=t.target,i=Number.parseInt(e.value,10);this.hass.callService("fan","set_percentage",{entity_id:this._config.entity,percentage:i})}}setConfig(t){if(!t.entity||!t.entity.startsWith("fan."))throw new Error("A valid fan entity is required");this._config=t}getCardSize(){return 3}static getStubConfig(){return{entity:"fan.range_hood",name:"Range Hood"}}get _entity(){if(this.hass&&this._config)return this.hass.states[this._config.entity]}_isOn(){return"on"===this._entity?.state}_getName(){return this._config?.name?this._config.name:this._entity?.attributes?.friendly_name??this._config?.entity??"Fan"}_getPercentage(){return this._entity?.attributes?.percentage??0}_getPresetMode(){return this._entity?.attributes?.preset_mode??""}_getSpeedList(){const t=this._entity?.attributes?.preset_modes;return Array.isArray(t)&&t.length>0?t:ie}render(){if(!this._config||!this.hass)return K;if(!this._entity)return K;const t=this._isOn(),e=this._getName(),i=this._getPercentage(),r=this._getPresetMode(),s=this._getSpeedList();return W`
      <div class="card ${t?"active":""}">
        ${t?W`<div class="glow"></div>`:K}
        <div class="inner">
          <div class="head">
            <div class="ic ${t?"on":""}">${mt()}</div>
            <span class="nm">${e}</span>
            <button class="toggle-switch" role="switch"
                    aria-checked="${t}" aria-label="Toggle ${e}"
                    @click=${this.handleToggle}>
              <div class="toggle-knob"></div>
            </button>
          </div>

          <div class="status">
            ${t?W`<span class="speed-label">${r||`${i}%`}</span>`:W`<span class="off-label">Off</span>`}
          </div>

          ${t?W`
              <div class="fan-visual">
                <div class="fan-spinner ${t?"spinning":""}"
                     style="animation-duration: ${i>66?"0.4s":i>33?"0.8s":"1.5s"}">
                  ${mt()}
                </div>
              </div>

              <div class="speed-buttons">
                ${s.map(t=>W`
                    <button class="speed-btn ${(r||"").toLowerCase()===t.toLowerCase()?"active":""}"
                            @click=${()=>this.handleSetSpeed(t)}>
                      ${t}
                    </button>
                  `)}
              </div>

              <div class="slider">
                <input type="range" min="0" max="100" .value=${String(i)}
                  @change=${this.handlePercentageChange}
                  style="--value-pct: ${i}%;"
                  aria-label="Fan speed percentage" />
              </div>
            `:K}
        </div>
      </div>
    `}};re.styles=[Zt,a`
      :host {
        display: block;
      }

      .card {
        position: relative;
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
        padding: 20px;
        transition: background 0.3s, box-shadow 0.5s;
        color: var(--text-primary);
      }

      .card.active {
        background: var(--card-bg-active);
      }

      .glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(
          ellipse at 50% 40%,
          rgba(139, 92, 246, 0.1) 0%,
          transparent 70%
        );
        pointer-events: none;
      }

      .inner {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .head {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        margin-bottom: 8px;
      }

      .ic {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        color: var(--text-secondary);
        transition: all 0.3s;
        flex-shrink: 0;
      }

      .ic.on {
        background: rgba(139, 92, 246, 0.15);
        color: #8b5cf6;
      }

      .ic svg {
        width: 20px;
        height: 20px;
      }

      .nm {
        font-size: 16px;
        font-weight: 700;
        flex: 1;
      }

      .status {
        align-self: flex-start;
        margin-bottom: 12px;
      }

      .speed-label {
        font-size: 12px;
        color: var(--accent);
        text-transform: capitalize;
      }

      .off-label {
        font-size: 12px;
        color: var(--text-secondary);
      }

      .fan-visual {
        margin: 8px 0 16px;
      }

      .fan-spinner {
        width: 56px;
        height: 56px;
        color: var(--accent);
      }

      .fan-spinner svg {
        width: 100%;
        height: 100%;
      }

      .fan-spinner.spinning {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .speed-buttons {
        display: flex;
        gap: 6px;
        width: 100%;
        margin-bottom: 12px;
      }

      .speed-btn {
        flex: 1;
        padding: 6px 4px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        background: transparent;
        color: var(--text-secondary);
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        text-transform: capitalize;
      }

      .speed-btn:hover {
        background: rgba(255, 255, 255, 0.06);
      }

      .speed-btn.active {
        background: rgba(139, 92, 246, 0.2);
        border-color: rgba(139, 92, 246, 0.3);
        color: #8b5cf6;
      }

      .slider {
        width: 100%;
      }

      .slider input[type="range"] {
        background: linear-gradient(
          to right,
          #8b5cf6 0%,
          #8b5cf6 var(--value-pct, 50%),
          rgba(255, 255, 255, 0.08) var(--value-pct, 50%),
          rgba(255, 255, 255, 0.08) 100%
        );
        height: 6px;
        border-radius: 3px;
      }
    `],t([ut({attribute:!1})],re.prototype,"hass",void 0),t([ft()],re.prototype,"_config",void 0),re=t([ht("dashboard-fan-card")],re),window.customCards=window.customCards||[],window.customCards.push({type:"dashboard-fan-card",name:"Dashboard Fan Card",description:"Fan speed control card with visual spinner and preset modes."}),window.customCards=window.customCards||[],window.customCards.push({type:"dashboard-light-card",name:"Dashboard Light Card",description:"A light card with circular brightness ring and purple theme."});const se=2*Math.PI*68;let ne=class extends lt{constructor(){super(...arguments),this._debouncedBrightness=Qt((t,e)=>{this.hass.callService("light","turn_on",{entity_id:t,brightness:e})},100),this.handleToggle=()=>{this.hass&&this._config&&this.hass.callService("light","toggle",{entity_id:this._config.entity})},this.handleBrightnessChange=t=>{if(!this.hass||!this._config)return;const e=t.target,i=parseInt(e.value,10),r=Math.round(i/255*100);e.style.setProperty("--value-pct",`${r}%`),this._debouncedBrightness(this._config.entity,i)}}setConfig(t){if(!t.entity)throw new Error("You must define an entity");if(!t.entity.startsWith("light."))throw new Error("Entity must be a light domain (light.*)");this._config={show_brightness_value:!0,...t}}getCardSize(){return 3}static getStubConfig(){return{entity:"light.living_room",name:"Living Room Light",show_brightness_value:!0}}_getEntity(){if(this.hass&&this._config)return this.hass.states[this._config.entity]}_isOn(){return"on"===this._getEntity()?.state}_getBrightness(){return this._getEntity()?.attributes?.brightness??255}_getName(){return this._config?.name?this._config.name:this._getEntity()?.attributes?.friendly_name??this._config?.entity??"Light"}_renderRing(t,e){const i=e?t/100*se:0,r=78;return V`
      <svg viewBox="0 0 ${156} ${156}" class="ring-svg">
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fbbf24" />
            <stop offset="50%" stop-color="#c084fc" />
            <stop offset="100%" stop-color="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle cx="${r}" cy="${r}" r="${68}"
          fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="${10}" />
        ${e?V`
          <circle cx="${r}" cy="${r}" r="${68}"
            fill="none" stroke="url(#rg)" stroke-width="${10}"
            stroke-linecap="round"
            stroke-dasharray="${i} ${se-i}"
            transform="rotate(-90 ${r} ${r})"
            class="ring-arc" />
        `:K}
      </svg>
    `}render(){if(!this.hass||!this._config)return K;if(!this._getEntity())return W`<div class="card err">Entity not found: ${this._config.entity}</div>`;const t=this._isOn(),e=this._getBrightness(),i=(r=e,Math.round(r/255*100));var r;const s=this._getName();return W`
      <div class="card ${t?"active":""}">
        ${t?W`<div class="glow"></div>`:K}
        <div class="inner">
          <div class="head">
            <div class="ic ${t?"on":""}">${vt(t)}</div>
            <span class="nm">${s}</span>
          </div>
          <div class="sub">Light Temperature</div>
          <div class="ring" @click=${this.handleToggle} role="button" tabindex="0"
               aria-label="${t?"Turn off":"Turn on"}">
            ${this._renderRing(i,t)}
            <div class="centre"><span class="on-off">${t?"ON":"OFF"}</span></div>
          </div>
          ${t?W`
            <div class="slider">
              <input type="range" min="1" max="255" .value=${String(e)}
                @input=${this.handleBrightnessChange}
                style="--value-pct: ${i}%;" aria-label="Brightness" />
            </div>`:K}
        </div>
      </div>
    `}};ne.styles=[Zt,a`
      .card {
        position: relative; overflow: hidden;
        background: var(--card-bg); border: var(--card-border);
        border-radius: var(--card-radius); padding: 20px;
        transition: background .3s, box-shadow .5s; color: var(--text-primary);
      }
      .card.active { background: var(--card-bg-active); }
      .card.err { padding: 16px; color: #ef4444; }

      .glow {
        position: absolute; inset: 0;
        background: radial-gradient(ellipse at 50% 40%, rgba(139,92,246,.12) 0%, transparent 70%);
        pointer-events: none;
      }

      .inner { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; }

      .head { display: flex; align-items: center; gap: 10px; width: 100%; margin-bottom: 4px; }
      .ic {
        display: flex; align-items: center; justify-content: center;
        width: 36px; height: 36px; border-radius: 50%;
        background: rgba(255,255,255,.06); color: var(--text-secondary);
        transition: all .3s;
      }
      .ic.on { background: rgba(251,191,36,.15); color: #fbbf24; }
      .ic svg { width: 20px; height: 20px; }
      .nm { font-size: 16px; font-weight: 700; }

      .sub { font-size: 12px; color: var(--text-secondary); margin-bottom: 12px; align-self: flex-start; }

      .ring {
        position: relative; width: 170px; height: 170px;
        cursor: pointer; margin: 0 auto 16px; outline: none;
      }
      .ring:focus-visible { filter: drop-shadow(0 0 6px var(--accent)); }
      .ring-svg { width: 100%; height: 100%; }
      .ring-arc { transition: stroke-dasharray .4s ease; filter: drop-shadow(0 0 6px rgba(139,92,246,.4)); }
      .centre {
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .on-off {
        font-size: 22px; font-weight: 700; letter-spacing: 2px;
        text-shadow: 0 0 20px rgba(139,92,246,.3);
      }

      .slider { width: 100%; }
      .slider input[type="range"] {
        background: linear-gradient(to right,
          #8b5cf6 0%, #8b5cf6 var(--value-pct, 50%),
          rgba(255,255,255,.08) var(--value-pct, 50%),
          rgba(255,255,255,.08) 100%);
        height: 8px; border-radius: 4px;
      }
      .slider input[type="range"]::-webkit-slider-thumb {
        width: 20px; height: 20px; border: 3px solid #8b5cf6; background: #fff;
      }
      .slider input[type="range"]::-moz-range-thumb {
        width: 20px; height: 20px; border: 3px solid #8b5cf6; background: #fff;
      }
    `],t([ut({attribute:!1})],ne.prototype,"hass",void 0),t([ft()],ne.prototype,"_config",void 0),ne=t([ht("dashboard-light-card")],ne);let ae=class extends lt{constructor(){super(...arguments),this.handleToggle=()=>{if(!this.hass||!this._config)return;const t=this._getOnCount()>0?"turn_off":"turn_on";for(const e of this._config.entities)this.hass.callService("light",t,{entity_id:e})},this.handleKeyDown=t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.handleToggle())}}setConfig(t){if(!t.entities||!Array.isArray(t.entities)||0===t.entities.length)throw new Error("At least one light entity is required in the entities array");for(const e of t.entities)if(!e.startsWith("light."))throw new Error(`Entity ${e} is not a light domain`);this._config={name:"All Lights",icon:"bulb",...t}}getCardSize(){return 2}static getStubConfig(){return{entities:["light.living_room","light.bedroom"],name:"All Lights"}}_getOnCount(){return this.hass&&this._config?this._config.entities.filter(t=>"on"===this.hass.states[t]?.state).length:0}_getTotalCount(){return this._config?.entities?.length??0}render(){if(!this.hass||!this._config)return K;const t=this._getOnCount(),e=this._getTotalCount(),i=0===t,r=t===e,s=this._config.name??"All Lights",n=this._config.icon??"bulb",a=i?"off":r?"on":"partial",o=i?"All Off":r?"All On":`${t} of ${e} On`;return W`
      <div class="card ${a}" role="button" tabindex="0"
           aria-label="${s}, ${o}. Activate to ${i?"turn all on":"turn all off"}."
           @click=${this.handleToggle} @keydown=${this.handleKeyDown}>

        ${"off"!==a?W`<div class="glow"></div>`:K}

        <div class="inner">
          <div class="ic ${a}">
            ${"bulb"===n?vt(t>0):Gt(n)}
          </div>

          <span class="nm">${s}</span>

          <div class="status">
            <span class="status-label">${o}</span>
            <div class="dots">
              ${this._config.entities.map(t=>{const e="on"===this.hass.states[t]?.state;return W`<div class="dot ${e?"on":""}"></div>`})}
            </div>
          </div>

          <div class="toggle ${i?"":"on"}"
               style="${i||r?"":"background: rgba(139, 92, 246, 0.5);"}">
            <div class="knob"></div>
          </div>
        </div>
      </div>
    `}};ae.styles=[Zt,a`
      :host {
        display: block;
        grid-column: span 2;
      }

      .card {
        position: relative;
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
        padding: 20px;
        cursor: pointer;
        outline: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: background 0.3s, transform 0.15s, box-shadow 0.3s;
        color: var(--text-primary);
      }

      .card.on,
      .card.partial {
        background: var(--card-bg-active);
        border-color: rgba(139, 92, 246, 0.15);
      }

      .card.partial {
        background: linear-gradient(
          135deg,
          rgba(139, 92, 246, 0.1) 0%,
          rgba(59, 34, 104, 0.15) 100%
        );
      }

      .card:hover {
        transform: scale(1.01);
      }
      .card:active {
        transform: scale(0.99);
      }
      .card:focus-visible {
        box-shadow: 0 0 0 2px var(--accent);
      }

      .glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(
          ellipse at 50% 30%,
          rgba(251, 191, 36, 0.06) 0%,
          transparent 70%
        );
        pointer-events: none;
      }

      .inner {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .ic {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        color: var(--text-secondary);
        transition: all 0.3s;
        flex-shrink: 0;
      }

      .ic.on {
        background: rgba(251, 191, 36, 0.15);
        color: #fbbf24;
      }

      .ic.partial {
        background: rgba(251, 191, 36, 0.1);
        color: #fbbf24;
        opacity: 0.7;
      }

      .ic svg {
        width: 24px;
        height: 24px;
      }

      .nm {
        font-size: 16px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .status {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 6px;
        margin-left: auto;
      }

      .status-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--text-secondary);
      }

      .dots {
        display: flex;
        gap: 4px;
      }

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.12);
        transition: background 0.3s;
      }

      .dot.on {
        background: #fbbf24;
        box-shadow: 0 0 6px rgba(251, 191, 36, 0.4);
      }

      .toggle {
        position: relative;
        width: 44px;
        height: 24px;
        border-radius: 12px;
        background: var(--toggle-off);
        transition: background 0.3s;
        flex-shrink: 0;
      }

      .toggle.on {
        background: var(--toggle-on);
      }

      .knob {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        transition: transform 0.3s;
      }

      .toggle.on .knob {
        transform: translateX(20px);
      }
    `],t([ut({attribute:!1})],ae.prototype,"hass",void 0),t([ft()],ae.prototype,"_config",void 0),ae=t([ht("dashboard-light-group-card")],ae),window.customCards=window.customCards||[],window.customCards.push({type:"dashboard-light-group-card",name:"Dashboard Light Group Card",description:"Group toggle for multiple lights with partial state indicator."});let oe=class extends lt{constructor(){super(...arguments),this._localVolume=null,this._debouncedVolumeSet=Qt(t=>{this.hass&&this._config&&this.hass.callService("media_player","volume_set",{entity_id:this._config.entity,volume_level:t})},100),this._clearLocalVolume=Qt(()=>{this._localVolume=null},500),this._handlePlayPause=()=>{this.hass&&this._config&&this.hass.callService("media_player","media_play_pause",{entity_id:this._config.entity})},this._handlePrevious=()=>{this.hass&&this._config&&this.hass.callService("media_player","media_previous_track",{entity_id:this._config.entity})},this._handleNext=()=>{this.hass&&this._config&&this.hass.callService("media_player","media_next_track",{entity_id:this._config.entity})},this._handleVolumeChange=t=>{const e=t.target;if(!e)return;const i=parseFloat(e.value);this._localVolume=i,this._debouncedVolumeSet(i),this._clearLocalVolume()}}setConfig(t){if(!t.entity||!t.entity.startsWith("media_player."))throw new Error("A valid media_player entity is required");this._config=t}getCardSize(){return 2}static getStubConfig(){return{entity:"media_player.living_room"}}get _entity(){if(this.hass&&this._config)return this.hass.states[this._config.entity]}get _isPlaying(){return"playing"===this._entity?.state}get _isVolumeMuted(){return!!this._entity?.attributes?.is_volume_muted}render(){if(!this._config||!this.hass)return K;const t=this._entity;if(!t)return K;const e=t.attributes||{},i=e.media_title||"",r=e.media_artist||"",s=e.source||"",n=this._localVolume??e.volume_level??.5,a=100*n+"%",o=this._config.name||e.friendly_name||"Media Player";return W`
      <ha-card>
        ${this._isPlaying?W`<div class="radial-glow"></div>`:K}
        <div class="content">
          <div class="header">
            <div class="info">
              <div class="name">${o}</div>
              ${i?W`<div class="media-title">${i}</div>`:K}
              ${r?W`<div class="media-artist">${r}</div>`:K}
              ${s?W`<div class="source">${s.toUpperCase()}</div>`:K}
            </div>
            <div class="equaliser" ?data-playing=${this._isPlaying}>
              <div class="bar" style="--bar-height: 16px; animation-delay: 0s;"></div>
              <div class="bar" style="--bar-height: 24px; animation-delay: 0.2s;"></div>
              <div class="bar" style="--bar-height: 12px; animation-delay: 0.4s;"></div>
              <div class="bar" style="--bar-height: 20px; animation-delay: 0.1s;"></div>
            </div>
          </div>

          <div class="controls">
            <button class="transport-btn" @click=${this._handlePrevious}>
              ${Ct()}
            </button>
            <button class="transport-btn primary" @click=${this._handlePlayPause}>
              ${this._isPlaying?$t():_t()}
            </button>
            <button class="transport-btn" @click=${this._handleNext}>
              ${kt()}
            </button>
          </div>

          <div class="volume">
            <div class="volume-icon">
              ${this._isVolumeMuted?St():At()}
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              .value=${String(n)}
              style="--volume-pct: ${a}"
              @input=${this._handleVolumeChange}
            />
          </div>
        </div>
      </ha-card>
    `}static get styles(){return[Zt,a`
        :host {
          grid-column: span 2;
        }

        ha-card {
          position: relative;
          overflow: hidden;
          padding: 16px;
          background: var(--card-bg);
          border: var(--card-border);
          border-radius: var(--card-radius);
        }

        .radial-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(168, 85, 247, 0.15) 0%,
            rgba(168, 85, 247, 0.05) 30%,
            transparent 60%
          );
          pointer-events: none;
          z-index: 0;
        }

        .content {
          position: relative;
          z-index: 1;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .info {
          flex: 1;
          min-width: 0;
        }

        .name {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.7;
          margin-bottom: 4px;
        }

        .media-title {
          font-size: 18px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .media-artist {
          font-size: 14px;
          opacity: 0.7;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .source {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #8b5cf6;
          opacity: 0.8;
          margin-top: 6px;
        }

        /* Equaliser bars */
        .equaliser {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 32px;
          padding-left: 12px;
          flex-shrink: 0;
        }

        .equaliser .bar {
          width: 4px;
          border-radius: 2px;
          background: #8b5cf6;
          height: 6px;
          transition: height 0.3s ease;
        }

        .equaliser[data-playing] .bar {
          animation: equalise 0.8s ease-in-out infinite alternate;
        }

        @keyframes equalise {
          0% {
            height: 6px;
          }
          100% {
            height: var(--bar-height, 16px);
          }
        }

        /* Transport controls */
        .controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .transport-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          opacity: 0.8;
          transition: opacity 0.2s ease, background 0.2s ease;
        }

        .transport-btn:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.08);
        }

        .transport-btn.primary {
          background: #8b5cf6;
          color: #fff;
          width: 48px;
          height: 48px;
          opacity: 1;
        }

        .transport-btn.primary:hover {
          background: #7c3aed;
        }

        .transport-btn svg {
          width: 20px;
          height: 20px;
        }

        .transport-btn.primary svg {
          width: 24px;
          height: 24px;
        }

        /* Volume slider */
        .volume {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .volume-icon {
          display: flex;
          align-items: center;
          opacity: 0.6;
        }

        .volume-icon svg {
          width: 18px;
          height: 18px;
        }

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          flex: 1;
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.15);
          outline: none;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
        }

        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
        }

        input[type="range"]::-webkit-slider-runnable-track {
          background: linear-gradient(
            to right,
            #8b5cf6 0%,
            #8b5cf6 var(--volume-pct, 50%),
            rgba(255, 255, 255, 0.15) var(--volume-pct, 50%),
            rgba(255, 255, 255, 0.15) 100%
          );
          height: 4px;
          border-radius: 2px;
        }
      `]}};t([ut({attribute:!1})],oe.prototype,"hass",void 0),t([ft()],oe.prototype,"_config",void 0),t([ft()],oe.prototype,"_localVolume",void 0),oe=t([ht("dashboard-media-player-card")],oe),window.customCards=window.customCards||[],window.customCards.push({type:"dashboard-media-player-card",name:"Dashboard Media Player Card",description:"A media player card with equaliser visualisation and transport controls."});let de=class extends lt{setConfig(t){if(!t.entity||!t.entity.startsWith("person.")&&!t.entity.startsWith("device_tracker."))throw new Error("A valid person or device_tracker entity is required");this._config=t}getCardSize(){return 2}static getStubConfig(){return{entity:"person.rafael",name:"Rafael"}}get _entity(){if(this.hass&&this._config)return this.hass.states[this._config.entity]}get _trackerEntity(){if(this.hass&&this._config?.tracker_entity)return this.hass.states[this._config.tracker_entity]}_getName(){return this._config?.name?this._config.name:this._entity?.attributes?.friendly_name??this._config?.entity??"Person"}_isHome(){const t=this._entity;return!!t&&"home"===t.state}_getZone(){const t=this._entity;if(!t)return"Unknown";const e=t.state;return"home"===e?"Home":"not_home"===e?"Away":e.charAt(0).toUpperCase()+e.slice(1)}_getEntityPicture(){return this._entity?.attributes?.entity_picture??null}_getLastChanged(){const t=this._entity;if(!t?.last_changed)return"";const e=Date.now()-new Date(t.last_changed).getTime(),i=Math.floor(e/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const r=Math.floor(i/60);return r<24?`${r}h ago`:`${Math.floor(r/24)}d ago`}render(){if(!this._config||!this.hass)return K;const t=this._entity;if(!t)return K;const e=this._getName(),i=this._isHome(),r=this._getZone(),s=this._getEntityPicture(),n=this._getLastChanged(),a=this._trackerEntity,o=a?.attributes?.battery_level??t.attributes?.battery_level;return W`
      <div class="card ${i?"home":"away"}">
        <div class="avatar">
          ${s?W`<img src="${s}" alt="${e}" class="avatar-img" />`:W`<div class="avatar-placeholder">${Ut()}</div>`}
          <div class="status-indicator ${i?"home":"away"}"></div>
        </div>

        <div class="details">
          <span class="name">${e}</span>
          <div class="location">
            <span class="location-icon">${i?Ht():It()}</span>
            <span class="zone">${r}</span>
          </div>
          ${n?W`<span class="last-seen">${n}</span>`:K}
        </div>

        ${null!=o?W`
            <div class="battery">
              <div class="battery-bar">
                <div class="battery-fill" style="width: ${o}%;
                  background: ${Number(o)>20?"#34d399":"#ef4444"};"></div>
              </div>
              <span class="battery-label">${o}%</span>
            </div>
          `:K}
      </div>
    `}};de.styles=[Zt,a`
      :host {
        display: block;
      }

      .card {
        position: relative;
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
        padding: 16px;
        min-height: 152px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: var(--text-primary);
        transition: background 0.3s;
      }

      .card.home {
        background: linear-gradient(
          135deg,
          rgba(52, 211, 153, 0.1) 0%,
          rgba(30, 30, 46, 0.95) 100%
        );
      }

      .avatar {
        position: relative;
        width: 52px;
        height: 52px;
        flex-shrink: 0;
      }

      .avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }

      .avatar-placeholder {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
      }

      .avatar-placeholder svg {
        width: 26px;
        height: 26px;
      }

      .status-indicator {
        position: absolute;
        bottom: 1px;
        right: 1px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid rgba(30, 30, 46, 0.95);
      }

      .status-indicator.home {
        background: #34d399;
      }

      .status-indicator.away {
        background: #6b7280;
      }

      .details {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        min-width: 0;
        width: 100%;
      }

      .name {
        font-size: 14px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .location {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: var(--text-secondary);
      }

      .location-icon svg {
        width: 12px;
        height: 12px;
      }

      .zone {
        white-space: nowrap;
      }

      .last-seen {
        font-size: 10px;
        color: var(--text-tertiary);
      }

      .battery {
        display: flex;
        align-items: center;
        gap: 6px;
        width: 100%;
        max-width: 100px;
      }

      .battery-bar {
        flex: 1;
        height: 4px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.08);
        overflow: hidden;
      }

      .battery-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.5s ease;
      }

      .battery-label {
        font-size: 10px;
        color: var(--text-secondary);
        flex-shrink: 0;
      }
    `],t([ut({attribute:!1})],de.prototype,"hass",void 0),t([ft()],de.prototype,"_config",void 0),de=t([ht("dashboard-person-card")],de),window.customCards=window.customCards||[],window.customCards.push({type:"dashboard-person-card",name:"Dashboard Person Card",description:"Person presence tracking card with avatar and zone display."});const le={sky:"#38bdf8",amber:"#fbbf24",emerald:"#34d399",purple:"#8b5cf6",rose:"#fb7185"};let ce=class extends lt{constructor(){super(...arguments),this._activated=!1,this.handleActivate=()=>{this.hass&&this._config&&(this.hass.callService("scene","turn_on",{entity_id:this._config.entity}),this._activated=!0,setTimeout(()=>{this._activated=!1},1500))},this.handleKeyDown=t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.handleActivate())}}setConfig(t){if(!t.entity||!t.entity.startsWith("scene."))throw new Error("A valid scene entity is required");this._config={icon:"scene",active_colour:"purple",...t}}getCardSize(){return 2}static getStubConfig(){return{entity:"scene.all_lights_off",name:"All Lights Off",icon:"scene",active_colour:"purple"}}get _entity(){if(this.hass&&this._config)return this.hass.states[this._config.entity]}_getName(){return this._config?.name?this._config.name:this._entity?.attributes?.friendly_name??this._config?.entity??"Scene"}_getColour(){return le[this._config?.active_colour??"purple"]??le.purple}render(){if(!this.hass||!this._config)return K;if(!this._entity)return W`<div class="card">Scene not found</div>`;const t=this._getName(),e=this._getColour(),i=this._config.icon??"scene";return W`
      <div class="card ${this._activated?"activated":""}" role="button" tabindex="0"
           aria-label="${t}. Activate scene."
           @click=${this.handleActivate} @keydown=${this.handleKeyDown}>

        <div class="ic" style="${this._activated?`background: ${e}22; color: ${e};`:""}">
          ${Gt(i)}
        </div>

        <span class="nm">${t}</span>

        <div class="activate-btn" style="${this._activated?`background: ${e}; color: #fff;`:""}">
          ${this._activated?"Activated":"Activate"}
        </div>
      </div>
    `}};ce.styles=[Zt,a`
      :host {
        display: block;
      }

      .card {
        position: relative;
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
        padding: 16px;
        min-height: 152px;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        outline: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: background 0.3s, transform 0.15s, box-shadow 0.3s;
        color: var(--text-primary);
      }

      .card.activated {
        background: linear-gradient(
          135deg,
          rgba(139, 92, 246, 0.18) 0%,
          rgba(59, 34, 104, 0.25) 100%
        );
        border-color: rgba(139, 92, 246, 0.15);
      }

      .card:hover {
        transform: scale(1.02);
      }
      .card:active {
        transform: scale(0.98);
      }
      .card:focus-visible {
        box-shadow: 0 0 0 2px var(--accent);
      }

      .ic {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        color: var(--text-secondary);
        transition: all 0.3s;
        margin-bottom: auto;
      }

      .ic svg {
        width: 22px;
        height: 22px;
      }

      .nm {
        font-size: 14px;
        font-weight: 600;
        margin-top: 12px;
        margin-bottom: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .activate-btn {
        align-self: flex-start;
        font-size: 11px;
        font-weight: 600;
        padding: 5px 14px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.08);
        color: var(--text-secondary);
        transition: all 0.3s;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
    `],t([ut({attribute:!1})],ce.prototype,"hass",void 0),t([ft()],ce.prototype,"_config",void 0),t([ft()],ce.prototype,"_activated",void 0),ce=t([ht("dashboard-scene-card")],ce),window.customCards=window.customCards||[],window.customCards.push({type:"dashboard-scene-card",name:"Dashboard Scene Card",description:"A scene activation card with visual feedback."});const he={temperature:"#fb923c",humidity:"#22d3ee",energy:"#34d399",power:"#34d399"},pe={temperature:bt,humidity:xt,energy:yt,power:yt,motion:wt},ge=yt;let ue=class extends lt{setConfig(t){if(!t.entity)throw new Error("Entity is required");const e=t.entity.split(".")[0];if("sensor"!==e&&"binary_sensor"!==e)throw new Error("Entity must be a sensor or binary_sensor");this._config=t}getCardSize(){return 1}static getStubConfig(){return{entity:"sensor.temperature"}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity,e=this.hass.states[t];if(!e)return K;const i="unavailable"===e.state||"unknown"===e.state,r=e.attributes.device_class??"",s=t.startsWith("binary_sensor."),n="motion"===r,a="on"===e.state,o=i?"#4b5563":this._resolveColour(r,n,a),d=this._resolveIcon(r),l=this._config.name??e.attributes.friendly_name??t;return W`
      <ha-card class=${i?"disabled":""}>
        <div class="container">
          <div class="header">
            <div class="icon" style="color: ${o}">
              ${d()}
            </div>
            <span class="name">${l}</span>
          </div>

          <div class="value" style="color: ${o}">
            ${i?"Unavailable":s||n?a?"Detected":"Clear":W`${e.state}<span class="unit"
                      >${e.attributes.unit_of_measurement??""}</span
                    >`}
          </div>
        </div>
      </ha-card>
    `}_resolveColour(t,e,i){return this._config.accent_colour?this._config.accent_colour:e?i?"#a78bfa":"#4b5563":he[t]??"#34d399"}_resolveIcon(t){return pe[t]??ge}};ue.styles=[Zt,a`
      :host {
        display: block;
      }

      ha-card {
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        flex-shrink: 0;
      }

      .icon svg {
        width: 20px;
        height: 20px;
      }

      .name {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary, #fff);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .value {
        font-size: 24px;
        font-weight: 300;
        line-height: 1;
      }

      .unit {
        font-size: 14px;
        font-weight: 400;
        margin-left: 2px;
        opacity: 0.7;
      }

      ha-card.disabled {
        opacity: 0.45;
      }

      ha-card.disabled .value {
        font-size: 16px;
      }
    `],t([ut({attribute:!1})],ue.prototype,"hass",void 0),t([ft()],ue.prototype,"_config",void 0),ue=t([ht("dashboard-sensor-card")],ue),window.customCards=window.customCards??[],window.customCards.push({type:"dashboard-sensor-card",name:"Sensor Card",description:"Displays sensor and binary sensor readings with auto-coloured icons."});let fe=class extends lt{constructor(){super(...arguments),this._newItem="",this.handleToggleItem=t=>{this.hass&&this._config&&this.hass.callService("shopping_list","complete_item",{name:t.name,complete:!t.complete})},this.handleAddItem=()=>{this.hass&&this._config&&this._newItem.trim()&&(this.hass.callService("shopping_list","add_item",{name:this._newItem.trim()}),this._newItem="")},this.handleInputChange=t=>{this._newItem=t.target.value},this.handleInputKeyDown=t=>{"Enter"===t.key&&(t.preventDefault(),this.handleAddItem())}}setConfig(t){if(!t.entity)throw new Error("A shopping list entity is required");this._config=t}getCardSize(){return 4}static getStubConfig(){return{entity:"sensor.bring_grocery_list",name:"Grocery List"}}get _entity(){if(this.hass&&this._config)return this.hass.states[this._config.entity]}_getName(){return this._config?.name?this._config.name:this._entity?.attributes?.friendly_name??"Shopping List"}_getItems(){const t=this._entity;if(!t)return[];const e=t.attributes?.items;return Array.isArray(e)?e:[]}_getPendingCount(){const t=this._getItems();if(t.length>0)return t.filter(t=>!t.complete).length;const e=this._entity,i=Number(e?.state);return Number.isNaN(i)?0:i}render(){if(!this._config||!this.hass)return K;if(!this._entity)return K;const t=this._getName(),e=this._getItems(),i=this._getPendingCount(),r=e.filter(t=>!t.complete),s=e.filter(t=>t.complete);return W`
      <ha-card>
        <div class="header">
          <div class="icon-circle">${Lt()}</div>
          <div class="info">
            <div class="name">${t}</div>
            <div class="count">${i} item${1!==i?"s":""}</div>
          </div>
        </div>

        <div class="add-row">
          <input
            type="text"
            class="add-input"
            placeholder="Add item..."
            .value=${this._newItem}
            @input=${this.handleInputChange}
            @keydown=${this.handleInputKeyDown}
          />
          <button class="add-btn" @click=${this.handleAddItem}
                  ?disabled=${!this._newItem.trim()}
                  aria-label="Add item">
            ${Wt()}
          </button>
        </div>

        ${e.length>0?W`
            <div class="list">
              ${r.map(t=>W`
                  <div class="item" @click=${()=>this.handleToggleItem(t)}>
                    <div class="checkbox"></div>
                    <span class="item-name">${t.name}</span>
                  </div>
                `)}
              ${s.length>0?W`
                  <div class="completed-divider">
                    <span>Completed (${s.length})</span>
                  </div>
                  ${s.map(t=>W`
                      <div class="item done" @click=${()=>this.handleToggleItem(t)}>
                        <div class="checkbox checked">${qt()}</div>
                        <span class="item-name">${t.name}</span>
                      </div>
                    `)}
                `:K}
            </div>
          `:W`
            <div class="empty">
              <span>No items yet</span>
            </div>
          `}
      </ha-card>
    `}};fe.styles=[Zt,a`
      :host {
        grid-column: span 2;
      }

      ha-card {
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
        padding-bottom: 8px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px 16px 12px;
      }

      .icon-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(139, 92, 246, 0.12);
        color: #8b5cf6;
        flex-shrink: 0;
      }

      .icon-circle svg {
        width: 18px;
        height: 18px;
      }

      .info {
        flex: 1;
      }

      .name {
        font-size: 14px;
        font-weight: 600;
      }

      .count {
        font-size: 11px;
        color: var(--text-secondary);
        margin-top: 1px;
      }

      .add-row {
        display: flex;
        gap: 8px;
        padding: 0 16px 12px;
      }

      .add-input {
        flex: 1;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 8px 12px;
        color: var(--text-primary);
        font-size: 13px;
        outline: none;
        transition: border-color 0.2s;
        font-family: inherit;
      }

      .add-input::placeholder {
        color: var(--text-tertiary);
      }

      .add-input:focus {
        border-color: rgba(139, 92, 246, 0.4);
      }

      .add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        border: none;
        background: #8b5cf6;
        color: #fff;
        cursor: pointer;
        transition: opacity 0.2s;
        flex-shrink: 0;
      }

      .add-btn:disabled {
        opacity: 0.3;
        cursor: default;
      }

      .add-btn svg {
        width: 16px;
        height: 16px;
      }

      .list {
        max-height: 280px;
        overflow-y: auto;
        padding: 0 8px;
      }

      .list::-webkit-scrollbar {
        width: 4px;
      }

      .list::-webkit-scrollbar-track {
        background: transparent;
      }

      .list::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
      }

      .item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.15s;
      }

      .item:hover {
        background: rgba(255, 255, 255, 0.04);
      }

      .checkbox {
        width: 20px;
        height: 20px;
        border-radius: 6px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .checkbox.checked {
        background: #8b5cf6;
        border-color: #8b5cf6;
        color: #fff;
      }

      .checkbox.checked svg {
        width: 12px;
        height: 12px;
      }

      .item-name {
        font-size: 13px;
        flex: 1;
      }

      .item.done .item-name {
        text-decoration: line-through;
        opacity: 0.4;
      }

      .completed-divider {
        padding: 8px;
        font-size: 10px;
        font-weight: 600;
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .empty {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 16px;
        color: var(--text-tertiary);
        font-size: 13px;
      }
    `],t([ut({attribute:!1})],fe.prototype,"hass",void 0),t([ft()],fe.prototype,"_config",void 0),t([ft()],fe.prototype,"_newItem",void 0),fe=t([ht("dashboard-shopping-list-card")],fe),window.customCards=window.customCards||[],window.customCards.push({type:"dashboard-shopping-list-card",name:"Dashboard Shopping List Card",description:"Shopping list card with Bring! integration support."});const ve={sky:"#38bdf8",amber:"#fbbf24",emerald:"#34d399",purple:"#8b5cf6",rose:"#fb7185"};window.customCards=window.customCards||[],window.customCards.push({type:"dashboard-switch-card",name:"Dashboard Switch Card",description:"A square widget switch card with purple theme."});let be=class extends lt{constructor(){super(...arguments),this.handleClick=()=>{this.hass&&this._config&&this.hass.callService("switch","toggle",{entity_id:this._config.entity})},this.handleKeyDown=t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.handleClick())}}setConfig(t){if(!t.entity)throw new Error("You must define an entity");if(!t.entity.startsWith("switch."))throw new Error("Entity must be a switch domain (switch.*)");this._config={icon:"power",active_colour:"purple",...t}}getCardSize(){return 2}static getStubConfig(){return{entity:"switch.living_room",name:"Living Room Switch",icon:"power",active_colour:"purple"}}_getEntity(){if(this.hass&&this._config)return this.hass.states[this._config.entity]}_isOn(){return"on"===this._getEntity()?.state}_getName(){return this._config?.name?this._config.name:this._getEntity()?.attributes?.friendly_name??this._config?.entity??"Switch"}_getColour(){return ve[this._config?.active_colour??"purple"]??ve.purple}render(){if(!this.hass||!this._config)return K;if(!this._getEntity())return W`<div class="card">Entity not found</div>`;const t=this._isOn(),e=this._getName(),i=this._getColour(),r=this._config.icon??"power";return W`
      <div class="card ${t?"active":""}" role="button" tabindex="0"
           aria-label="${e}, ${t?"On":"Off"}. Activate to toggle."
           @click=${this.handleClick} @keydown=${this.handleKeyDown}>

        <div class="ic" style="${t?`background: ${i}22; color: ${i};`:""}">
          ${Gt(r)}
        </div>

        <span class="nm">${e}</span>

        <div class="toggle ${t?"on":""}"
             style="${t?`background: ${i};`:""}">
          <div class="knob"></div>
        </div>
      </div>
    `}};be.styles=[Zt,a`
      :host { display: block; }

      .card {
        position: relative; overflow: hidden;
        background: var(--card-bg); border: var(--card-border);
        border-radius: var(--card-radius); padding: 16px;
        min-height: 152px;
        display: flex; flex-direction: column;
        cursor: pointer; outline: none; user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: background .3s, transform .15s, box-shadow .3s;
        color: var(--text-primary);
      }

      .card.active {
        background: linear-gradient(135deg,
          rgba(139,92,246,.18) 0%,
          rgba(59,34,104,.25) 100%);
        border-color: rgba(139,92,246,.15);
      }

      .card:hover { transform: scale(1.02); }
      .card:active { transform: scale(0.98); }
      .card:focus-visible { box-shadow: 0 0 0 2px var(--accent); }

      .ic {
        display: flex; align-items: center; justify-content: center;
        width: 40px; height: 40px; border-radius: 50%;
        background: rgba(255,255,255,.06);
        color: var(--text-secondary);
        transition: all .3s;
        margin-bottom: auto;
      }
      .ic svg { width: 22px; height: 22px; }

      .nm {
        font-size: 14px; font-weight: 600;
        margin-top: 12px; margin-bottom: 12px;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }

      .toggle {
        position: relative;
        width: 40px; height: 22px; border-radius: 11px;
        background: var(--toggle-off);
        transition: background .3s;
      }

      .knob {
        position: absolute; top: 2px; left: 2px;
        width: 18px; height: 18px; border-radius: 50%;
        background: #fff; transition: transform .3s;
      }
      .toggle.on .knob { transform: translateX(18px); }
    `],t([ut({attribute:!1})],be.prototype,"hass",void 0),t([ft()],be.prototype,"_config",void 0),be=t([ht("dashboard-switch-card")],be);const xe={sunny:"Sunny",partlycloudy:"Partly Cloudy",cloudy:"Cloudy",rainy:"Rainy",pouring:"Heavy Rain",snowy:"Snowy",lightning:"Thunderstorm",windy:"Windy",fog:"Foggy","clear-night":"Clear Night"},ye=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];let me=class extends lt{setConfig(t){if(!t.entity||!t.entity.startsWith("weather."))throw new Error("A valid weather entity is required");this._config={name:"Weather",show_forecast:!0,num_forecasts:5,...t}}getCardSize(){return 3}static getStubConfig(){return{entity:"weather.home",name:"Weather",show_forecast:!0,num_forecasts:5}}get _entity(){if(this.hass&&this._config)return this.hass.states[this._config.entity]}_getConditionIcon(t){switch(t){case"sunny":case"clear-night":return Et();case"cloudy":return zt();case"partlycloudy":default:return Mt();case"rainy":case"pouring":return Pt();case"snowy":return Dt();case"lightning":return yt();case"windy":return jt()}}_getConditionLabel(t){return xe[t]?xe[t]:t?t.charAt(0).toUpperCase()+t.slice(1):""}_getDayName(t){const e=new Date(t);return ye[e.getDay()]}render(){if(!this._config||!this.hass)return K;const t=this._entity;if(!t)return K;const e=t.attributes||{},i=e.temperature,r=e.humidity,s=e.wind_speed,n=t.state,a=this._config.name||"Weather",o=!1!==this._config.show_forecast,d=this._config.num_forecasts||5,l=(e.forecast||[]).slice(0,d);return W`
      <ha-card>
        <div class="watermark">${this._getConditionIcon(n)}</div>
        <div class="content">
          <div class="name">${a}</div>

          <div class="current">
            <div class="temperature-section">
              <span class="temperature">${i}</span>
              <span class="unit">&deg;C</span>
            </div>
            <div class="condition">${this._getConditionLabel(n)}</div>
          </div>

          <div class="stats">
            <div class="stat">
              <span class="stat-icon">${xt()}</span>
              <span class="stat-value">${r}%</span>
            </div>
            <div class="stat">
              <span class="stat-icon">${jt()}</span>
              <span class="stat-value">${s} km/h</span>
            </div>
          </div>

          ${o&&l.length?W`
                <div class="forecast-divider"></div>
                <div class="forecast">
                  ${l.map(t=>W`
                      <div class="forecast-day">
                        <span class="forecast-day-name">
                          ${this._getDayName(t.datetime)}
                        </span>
                        <span class="forecast-icon">
                          ${this._getConditionIcon(t.condition)}
                        </span>
                        <span class="forecast-high">${t.temperature}&deg;</span>
                        <span class="forecast-low">${t.templow}&deg;</span>
                      </div>
                    `)}
                </div>
              `:K}
        </div>
      </ha-card>
    `}static get styles(){return[Zt,a`
        :host {
          grid-column: span 2;
        }

        ha-card {
          position: relative;
          overflow: hidden;
          padding: 16px;
          background: var(--card-bg);
          border: var(--card-border);
          border-radius: var(--card-radius);
        }

        /* Large background watermark icon */
        .watermark {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 120px;
          height: 120px;
          opacity: 0.05;
          pointer-events: none;
          z-index: 0;
        }

        .watermark svg {
          width: 100%;
          height: 100%;
        }

        .content {
          position: relative;
          z-index: 1;
        }

        .name {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.7;
          margin-bottom: 8px;
        }

        .current {
          margin-bottom: 12px;
        }

        .temperature-section {
          display: flex;
          align-items: flex-start;
        }

        .temperature {
          font-size: 40px;
          font-weight: 300;
          line-height: 1;
        }

        .unit {
          font-size: 18px;
          font-weight: 300;
          opacity: 0.7;
          margin-top: 4px;
          margin-left: 2px;
        }

        .condition {
          font-size: 14px;
          opacity: 0.8;
          margin-top: 4px;
        }

        /* Side stats: humidity and wind speed */
        .stats {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          opacity: 0.7;
        }

        .stat-icon {
          display: flex;
          align-items: center;
        }

        .stat-icon svg {
          width: 16px;
          height: 16px;
        }

        /* Subtle divider before forecast */
        .forecast-divider {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin: 4px 0 12px;
        }

        /* Forecast row */
        .forecast {
          display: flex;
          justify-content: space-between;
          gap: 4px;
        }

        .forecast-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex: 1;
          padding: 8px 4px;
          border-radius: 8px;
          cursor: default;
          transition: background 0.2s ease;
        }

        .forecast-day:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        .forecast-day-name {
          font-size: 11px;
          font-weight: 600;
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .forecast-icon {
          display: flex;
          align-items: center;
        }

        .forecast-icon svg {
          width: 16px;
          height: 16px;
        }

        .forecast-high {
          font-size: 13px;
          font-weight: 600;
        }

        .forecast-low {
          font-size: 12px;
          opacity: 0.5;
        }
      `]}};t([ut({attribute:!1})],me.prototype,"hass",void 0),t([ft()],me.prototype,"_config",void 0),me=t([ht("dashboard-weather-card")],me),window.customCards=window.customCards||[],window.customCards.push({type:"dashboard-weather-card",name:"Dashboard Weather Card",description:"A weather card with current conditions and forecast display."}),console.info("%c DASHBOARD-CARDS %c v1.0.0 ","background: #fbbf24; color: #1a1a2e; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","background: #1a1a2e; color: #fbbf24; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;")}();
