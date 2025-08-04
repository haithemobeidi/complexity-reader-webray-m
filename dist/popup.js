(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=globalThis,V=R.ShadowRoot&&(R.ShadyCSS===void 0||R.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),Z=new WeakMap;let at=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(V&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Z.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Z.set(e,t))}return t}toString(){return this.cssText}};const ut=o=>new at(typeof o=="string"?o:o+"",void 0,J),pt=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new at(e,o,J)},ft=(o,t)=>{if(V)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=R.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},G=V?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return ut(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:mt,defineProperty:gt,getOwnPropertyDescriptor:$t,getOwnPropertyNames:yt,getOwnPropertySymbols:_t,getPrototypeOf:bt}=Object,g=globalThis,Q=g.trustedTypes,vt=Q?Q.emptyScript:"",j=g.reactiveElementPolyfillSupport,C=(o,t)=>o,H={toAttribute(o,t){switch(t){case Boolean:o=o?vt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},K=(o,t)=>!mt(o,t),Y={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&gt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=$t(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){const l=s==null?void 0:s.call(this);r==null||r.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Y}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=bt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,i=[...yt(e),..._t(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(G(s))}else t!==void 0&&e.push(G(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ft(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var r;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const n=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:H).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){var r,n;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:H;this._$Em=s;const h=a.fromAttribute(e,l.type);this[s]=h??((n=this._$Ej)==null?void 0:n.get(s))??h,this._$Em=null}}requestUpdate(t,e,i){var s;if(t!==void 0){const r=this.constructor,n=this[t];if(i??(i=r.getPropertyOptions(t)),!((i.hasChanged??K)(n,e)||i.useDefault&&i.reflect&&n===((s=this._$Ej)==null?void 0:s.get(t))&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,n]of s){const{wrapped:l}=n,a=this[r];l!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[C("elementProperties")]=new Map,A[C("finalized")]=new Map,j==null||j({ReactiveElement:A}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=globalThis,D=M.trustedTypes,tt=D?D.createPolicy("lit-html",{createHTML:o=>o}):void 0,lt="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,ct="?"+m,At=`<${ct}>`,v=document,N=()=>v.createComment(""),z=o=>o===null||typeof o!="object"&&typeof o!="function",X=Array.isArray,wt=o=>X(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",B=`[ 	
\f\r]`,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,et=/-->/g,it=/>/g,y=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),st=/'/g,ot=/"/g,ht=/^(?:script|style|textarea|title)$/i,xt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),F=xt(1),w=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),rt=new WeakMap,_=v.createTreeWalker(v,129);function dt(o,t){if(!X(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return tt!==void 0?tt.createHTML(t):t}const Et=(o,t)=>{const e=o.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",n=S;for(let l=0;l<e;l++){const a=o[l];let h,u,c=-1,p=0;for(;p<a.length&&(n.lastIndex=p,u=n.exec(a),u!==null);)p=n.lastIndex,n===S?u[1]==="!--"?n=et:u[1]!==void 0?n=it:u[2]!==void 0?(ht.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=y):u[3]!==void 0&&(n=y):n===y?u[0]===">"?(n=s??S,c=-1):u[1]===void 0?c=-2:(c=n.lastIndex-u[2].length,h=u[1],n=u[3]===void 0?y:u[3]==='"'?ot:st):n===ot||n===st?n=y:n===et||n===it?n=S:(n=y,s=void 0);const f=n===y&&o[l+1].startsWith("/>")?" ":"";r+=n===S?a+At:c>=0?(i.push(h),a.slice(0,c)+lt+a.slice(c)+m+f):a+m+(c===-2?l:f)}return[dt(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class O{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const l=t.length-1,a=this.parts,[h,u]=Et(t,e);if(this.el=O.createElement(h,i),_.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=_.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(lt)){const p=u[n++],f=s.getAttribute(c).split(m),I=/([.?@])?(.*)/.exec(p);a.push({type:1,index:r,name:I[2],strings:f,ctor:I[1]==="."?Ct:I[1]==="?"?Mt:I[1]==="@"?Pt:L}),s.removeAttribute(c)}else c.startsWith(m)&&(a.push({type:6,index:r}),s.removeAttribute(c));if(ht.test(s.tagName)){const c=s.textContent.split(m),p=c.length-1;if(p>0){s.textContent=D?D.emptyScript:"";for(let f=0;f<p;f++)s.append(c[f],N()),_.nextNode(),a.push({type:2,index:++r});s.append(c[p],N())}}}else if(s.nodeType===8)if(s.data===ct)a.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf(m,c+1))!==-1;)a.push({type:7,index:r}),c+=m.length-1}r++}}static createElement(t,e){const i=v.createElement("template");return i.innerHTML=t,i}}function x(o,t,e=o,i){var n,l;if(t===w)return t;let s=i!==void 0?(n=e._$Co)==null?void 0:n[i]:e._$Cl;const r=z(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=x(o,s._$AS(o,t.values),s,i)),t}class St{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??v).importNode(e,!0);_.currentNode=s;let r=_.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new U(r,r.nextSibling,this,t):a.type===1?h=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(h=new Nt(r,this,t)),this._$AV.push(h),a=i[++l]}n!==(a==null?void 0:a.index)&&(r=_.nextNode(),n++)}return _.currentNode=v,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class U{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=x(this,t,e),z(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):wt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(v.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=O.createElement(dt(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(e);else{const n=new St(s,this),l=n.u(this.options);n.p(e),this.T(l),this._$AH=n}}_$AC(t){let e=rt.get(t.strings);return e===void 0&&rt.set(t.strings,e=new O(t)),e}k(t){X(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new U(this.O(N()),this.O(N()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class L{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(r===void 0)t=x(this,t,e,0),n=!z(t)||t!==this._$AH&&t!==w,n&&(this._$AH=t);else{const l=t;let a,h;for(t=r[0],a=0;a<r.length-1;a++)h=x(this,l[i+a],e,a),h===w&&(h=this._$AH[a]),n||(n=!z(h)||h!==this._$AH[a]),h===d?t=d:t!==d&&(t+=(h??"")+r[a+1]),this._$AH[a]=h}n&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ct extends L{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class Mt extends L{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class Pt extends L{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=x(this,t,e,0)??d)===w)return;const i=this._$AH,s=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){x(this,t)}}const W=M.litHtmlPolyfillSupport;W==null||W(O,U),(M.litHtmlVersions??(M.litHtmlVersions=[])).push("3.3.1");const zt=(o,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const r=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new U(t.insertBefore(N(),r),r,void 0,e??{})}return s._$AI(o),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class P extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=zt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return w}}var nt;P._$litElement$=!0,P.finalized=!0,(nt=b.litElementHydrateSupport)==null||nt.call(b,{LitElement:P});const q=b.litElementPolyfillSupport;q==null||q({LitElement:P});(b.litElementVersions??(b.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ot=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ut={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:K},kt=(o=Ut,t,e)=>{const{kind:i,metadata:s}=e;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(e.name,o),i==="accessor"){const{name:n}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,o)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(i==="setter"){const{name:n}=e;return function(l){const a=this[n];t.call(this,l),this.requestUpdate(n,a,o)}}throw Error("Unsupported decorator location: "+i)};function It(o){return(t,e)=>typeof e=="object"?kt(o,t,e):((i,s,r)=>{const n=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),n?Object.getOwnPropertyDescriptor(s,r):void 0})(o,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function k(o){return It({...o,state:!0,attribute:!1})}class Tt{constructor(){this.modules=new Map,this.initialized=!1;const t=chrome.runtime.getManifest();this.extensionId=chrome.runtime.id,this.version=t.version,console.log("WebRay-M ExtensionCore initialized:",{extensionId:this.extensionId,version:this.version})}registerModule(t){if(this.initialized)throw new Error(`Cannot register module '${t.id}' - ExtensionCore already initialized`);if(this.modules.has(t.id))throw new Error(`Module '${t.id}' is already registered`);console.log("Registering module:",t.id,"v"+t.version),this.modules.set(t.id,t)}getModule(t){return this.modules.get(t)}async initialize(){if(this.initialized){console.warn("ExtensionCore already initialized");return}console.log("Initializing ExtensionCore with",this.modules.size,"modules");for(const[t,e]of this.modules)try{console.log("Installing module:",t),await e.onInstall(),console.log("Activating module:",t),await e.onActivate(this),console.log("Module activated successfully:",t)}catch(i){throw console.error(`Failed to initialize module '${t}':`,i),i}this.initialized=!0,console.log("ExtensionCore initialization complete")}async shutdown(){if(!this.initialized)return;console.log("Shutting down ExtensionCore");const t=Array.from(this.modules.entries()).reverse();for(const[e,i]of t)try{console.log("Deactivating module:",e),await i.onDeactivate()}catch(s){console.error(`Error deactivating module '${e}':`,s)}this.initialized=!1,console.log("ExtensionCore shutdown complete")}getModuleIds(){return Array.from(this.modules.keys())}isInitialized(){return this.initialized}}class Rt{constructor(){this.id="notification",this.version="0.0.1"}async onInstall(){console.log("📢 NotificationModule: Installation started"),this.injectNotificationStyles(),console.log("✅ NotificationModule: Installation complete")}async onActivate(t){console.log("📢 NotificationModule: Activation started"),this.context=t,console.log("✅ NotificationModule: Activation complete")}async onDeactivate(){console.log("📢 NotificationModule: Deactivation started"),this.context=void 0,console.log("✅ NotificationModule: Deactivation complete")}getCapabilities(){return{background:!1,permissions:[]}}showNotification(t,e="info",i=3e3){const s=this.createNotificationElement(t,e);document.body.appendChild(s),setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},i),console.log(`📢 Notification shown: ${t} (${e})`)}injectNotificationStyles(){if(document.getElementById("webray-notification-styles"))return;const t=document.createElement("style");t.id="webray-notification-styles",t.textContent=`
      .webray-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 16px;
        border-radius: 4px;
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: webray-notification-enter 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
      }
      
      .webray-notification.success {
        background-color: #10b981;
      }
      
      .webray-notification.error {
        background-color: #ef4444;
      }
      
      .webray-notification.info {
        background-color: #3b82f6;
      }
      
      @keyframes webray-notification-enter {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,document.head.appendChild(t)}createNotificationElement(t,e){const i=document.createElement("div");return i.className=`webray-notification ${e}`,i.textContent=t,i.addEventListener("click",()=>{i.parentNode&&i.parentNode.removeChild(i)}),i}getExtensionContext(){return this.context}}class Ht{constructor(){this.core=null,this.notificationModule=null,this._isInitialized=!1,this._error=null,this.initPromise=null}async initialize(){return this.initPromise?this.initPromise:(this.initPromise=this.initializeModuleSystem(),this.initPromise)}async initializeModuleSystem(){try{console.log("🚀 Initializing WebRay-M module system in popup...");const t=new Tt,e=new Rt;t.registerModule(e),await t.initialize(),this.core=t,this.notificationModule=e,this._isInitialized=!0,console.log("✅ Module system initialized successfully")}catch(t){console.error("❌ Failed to initialize module system:",t),this._error=t instanceof Error?t.message:"Unknown error"}}get isInitialized(){return this._isInitialized}get error(){return this._error}getNotificationModule(){return this.notificationModule}getCore(){return this.core}async shutdown(){this.core&&await this.core.shutdown()}}const T=new Ht;var Dt=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,E=(o,t,e,i)=>{for(var s=i>1?void 0:i?Lt(t,e):t,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&Dt(t,e,s),s};let $=class extends P{constructor(){super(...arguments),this.message="",this.isActive=!1,this.moduleSystem=null,this.isInitialized=!1,this.moduleError=""}async connectedCallback(){super.connectedCallback(),await this.initializeModules()}async initializeModules(){try{await T.initialize(),this.isInitialized=T.isInitialized,this.moduleError=T.error||""}catch(o){this.moduleError=o.message}}async sendMessage(){try{if(!chrome.tabs){this.message="Chrome tabs API not available";return}const[o]=await chrome.tabs.query({currentWindow:!0,active:!0});o.id?(await chrome.tabs.sendMessage(o.id,{action:"demo_action",data:"Hello from sidebar!"}),this.message="Message sent to content script!"):this.message="No active tab found"}catch(o){console.error("Send message error:",o),o.message.includes("Receiving end does not exist")?this.message="⚠️ Navigate to a regular webpage (like google.com) to test content script communication":this.message="Error: "+o.message}}async testFetchBridge(){try{if(!chrome.runtime||!chrome.runtime.sendMessage){this.message="Chrome runtime not available";return}const o=await chrome.runtime.sendMessage({action:"fetch",url:"https://httpbin.org/json",options:{}});o&&o.error?this.message="Fetch error: "+o.error:this.message="✅ Fetch successful! Response: "+JSON.stringify(o).substring(0,100)+"..."}catch(o){console.error("Fetch bridge error:",o),this.message="Connection error: "+o.message}}testNotification(){const o=T.getNotificationModule();o?(o.showNotification("Hello from WebRay-M sidebar module!","success"),this.message="✅ Notification sent via module system!"):this.message="❌ Notification module not available"}toggleActive(o){const t=o.target;this.isActive=t.checked}render(){return F`
      <div class="popup-container">
        <header class="popup-header">
          <h1>WebRay-M Sidebar Example</h1>
          <p>Basic sidebar panel demonstration</p>
        </header>
        
        <main class="popup-content">
          <div class="feature-section">
            <h3>Communication</h3>
            <button @click="${this.sendMessage}" class="action-button primary">
              Send Message to Content Script
            </button>
          </div>

          <div class="feature-section">
            <h3>Fetch Bridge</h3>
            <button @click="${this.testFetchBridge}" class="action-button">
              Test CORS Bypass
            </button>
          </div>

          <div class="feature-section">
            <h3>Module System</h3>
            <button 
              @click="${this.testNotification}" 
              class="action-button primary"
              ?disabled="${!this.isInitialized}"
            >
              ${this.isInitialized?"Show Notification":"Loading Modules..."}
            </button>
            ${this.moduleError?F`
              <div class="error-message">Module Error: ${this.moduleError}</div>
            `:""}
          </div>

          <div class="feature-section">
            <h3>State</h3>
            <label class="toggle-container">
              <input 
                type="checkbox" 
                .checked="${this.isActive}"
                @change="${this.toggleActive}"
              />
              <span>Extension Active</span>
            </label>
            <div class="status">${this.isActive?"Status: ACTIVE":"Status: INACTIVE"}</div>
          </div>

          ${this.message?F`
            <div class="message-display">
              ${this.message}
            </div>
          `:""}
        </main>

        <footer class="popup-footer">
          <p>WebRay-M Framework Demo</p>
        </footer>
      </div>
    `}};$.styles=pt`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', sans-serif;
      margin: 0;
      padding: 0;
    }

    .popup-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #fafafa;
    }

    .popup-header {
      background: #1a1a1a;
      color: white;
      padding: 16px 20px;
      text-align: center;
      border-bottom: 1px solid #e0e0e0;
    }

    .popup-header h1 {
      margin: 0 0 4px 0;
      font-size: 18px;
      font-weight: 600;
    }

    .popup-header p {
      margin: 0;
      font-size: 13px;
      color: #cccccc;
    }

    .popup-content {
      flex: 1;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .feature-section {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
    }

    .feature-section h3 {
      margin: 0 0 12px 0;
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 8px;
    }

    .action-button {
      background: #f8f8f8;
      border: 1px solid #d0d0d0;
      border-radius: 6px;
      padding: 8px 16px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s ease;
      width: 100%;
      margin-bottom: 8px;
    }

    .action-button:hover {
      background: #f0f0f0;
      border-color: #b0b0b0;
    }

    .action-button.primary {
      background: #1a1a1a;
      color: white;
      border-color: #1a1a1a;
    }

    .action-button.primary:hover {
      background: #333333;
    }

    .action-button:disabled {
      background: #f8f8f8;
      color: #999;
      cursor: not-allowed;
    }

    .toggle-container {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .toggle-container input {
      margin: 0;
    }

    .status {
      font-size: 12px;
      color: #666;
      font-weight: 500;
    }

    .message-display {
      background: #f0f8ff;
      border: 1px solid #d0e8ff;
      border-radius: 6px;
      padding: 12px;
      font-size: 13px;
      color: #1a1a1a;
      line-height: 1.4;
      word-break: break-word;
    }

    .error-message {
      background: #fff0f0;
      border: 1px solid #ffd0d0;
      border-radius: 6px;
      padding: 8px;
      font-size: 12px;
      color: #cc0000;
      margin-top: 8px;
    }

    .popup-footer {
      padding: 12px 20px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
      background: #f8f8f8;
    }

    .popup-footer p {
      margin: 0;
      font-size: 11px;
      color: #666;
    }
  `;E([k()],$.prototype,"message",2);E([k()],$.prototype,"isActive",2);E([k()],$.prototype,"moduleSystem",2);E([k()],$.prototype,"isInitialized",2);E([k()],$.prototype,"moduleError",2);$=E([Ot("sidebar-app")],$);
