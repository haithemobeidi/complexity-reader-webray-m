(()=>{var _e=Object.defineProperty;var xe=Object.getOwnPropertyDescriptor;var p=(i,e,t,s)=>{for(var r=s>1?void 0:s?xe(e,t):e,o=i.length-1,n;o>=0;o--)(n=i[o])&&(r=(s?n(e,t,r):n(r))||r);return s&&r&&_e(e,t,r),r};var j=globalThis,I=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),oe=new WeakMap,R=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(I&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=oe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&oe.set(t,e))}return e}toString(){return this.cssText}},ne=i=>new R(typeof i=="string"?i:i+"",void 0,J),W=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new R(t,i,J)},ae=(i,e)=>{if(I)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),r=j.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},G=I?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ne(t)})(i):i;var{is:Ae,defineProperty:Se,getOwnPropertyDescriptor:we,getOwnPropertyNames:Ee,getOwnPropertySymbols:Me,getPrototypeOf:Pe}=Object,x=globalThis,le=x.trustedTypes,Ce=le?le.emptyScript:"",ke=x.reactiveElementPolyfillSupport,T=(i,e)=>i,B={toAttribute(i,e){switch(e){case Boolean:i=i?Ce:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},q=(i,e)=>!Ae(i,e),de={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),x.litPropertyMetadata??(x.litPropertyMetadata=new WeakMap);var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=de){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&Se(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){let{get:r,set:o}=we(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){let l=r?.call(this);o?.call(this,n),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??de}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let e=Pe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let t=this.properties,s=[...Ee(t),...Me(t)];for(let r of s)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let r of s)t.unshift(G(r))}else e!==void 0&&t.push(G(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ae(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:B).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){let s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let o=s.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:B;this._$Em=r;let l=n.fromAttribute(t,o.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(e,t,s){if(e!==void 0){let r=this.constructor,o=this[e];if(s??(s=r.getPropertyOptions(e)),!((s.hasChanged??q)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,o]of s){let{wrapped:n}=o,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[T("elementProperties")]=new Map,y[T("finalized")]=new Map,ke?.({ReactiveElement:y}),(x.reactiveElementVersions??(x.reactiveElementVersions=[])).push("2.1.1");var z=globalThis,V=z.trustedTypes,ce=V?V.createPolicy("lit-html",{createHTML:i=>i}):void 0,fe="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,be="?"+A,Re=`<${be}>`,E=document,F=()=>E.createComment(""),O=i=>i===null||typeof i!="object"&&typeof i!="function",re=Array.isArray,We=i=>re(i)||typeof i?.[Symbol.iterator]=="function",Q=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,pe=/>/g,S=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ue=/'/g,me=/"/g,ve=/^(?:script|style|textarea|title)$/i,ie=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),m=ie(1),je=ie(2),Ie=ie(3),M=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ge=new WeakMap,w=E.createTreeWalker(E,129);function ye(i,e){if(!re(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ce!==void 0?ce.createHTML(e):e}var Te=(i,e)=>{let t=i.length-1,s=[],r,o=e===2?"<svg>":e===3?"<math>":"",n=U;for(let l=0;l<t;l++){let a=i[l],c,u,d=-1,v=0;for(;v<a.length&&(n.lastIndex=v,u=n.exec(a),u!==null);)v=n.lastIndex,n===U?u[1]==="!--"?n=he:u[1]!==void 0?n=pe:u[2]!==void 0?(ve.test(u[2])&&(r=RegExp("</"+u[2],"g")),n=S):u[3]!==void 0&&(n=S):n===S?u[0]===">"?(n=r??U,d=-1):u[1]===void 0?d=-2:(d=n.lastIndex-u[2].length,c=u[1],n=u[3]===void 0?S:u[3]==='"'?me:ue):n===me||n===ue?n=S:n===he||n===pe?n=U:(n=S,r=void 0);let _=n===S&&i[l+1].startsWith("/>")?" ":"";o+=n===U?a+Re:d>=0?(s.push(c),a.slice(0,d)+fe+a.slice(d)+A+_):a+A+(d===-2?l:_)}return[ye(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},H=class i{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let o=0,n=0,l=e.length-1,a=this.parts,[c,u]=Te(e,t);if(this.el=i.createElement(c,s),w.currentNode=this.el.content,t===2||t===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=w.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(fe)){let v=u[n++],_=r.getAttribute(d).split(A),D=/([.?@])?(.*)/.exec(v);a.push({type:1,index:o,name:D[2],strings:_,ctor:D[1]==="."?Y:D[1]==="?"?ee:D[1]==="@"?te:C}),r.removeAttribute(d)}else d.startsWith(A)&&(a.push({type:6,index:o}),r.removeAttribute(d));if(ve.test(r.tagName)){let d=r.textContent.split(A),v=d.length-1;if(v>0){r.textContent=V?V.emptyScript:"";for(let _=0;_<v;_++)r.append(d[_],F()),w.nextNode(),a.push({type:2,index:++o});r.append(d[v],F())}}}else if(r.nodeType===8)if(r.data===be)a.push({type:2,index:o});else{let d=-1;for(;(d=r.data.indexOf(A,d+1))!==-1;)a.push({type:7,index:o}),d+=A.length-1}o++}}static createElement(e,t){let s=E.createElement("template");return s.innerHTML=e,s}};function P(i,e,t=i,s){if(e===M)return e;let r=s!==void 0?t._$Co?.[s]:t._$Cl,o=O(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=r:t._$Cl=r),r!==void 0&&(e=P(i,r._$AS(i,e.values),r,s)),e}var X=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,r=(e?.creationScope??E).importNode(t,!0);w.currentNode=r;let o=w.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new N(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new se(o,this,e)),this._$AV.push(c),a=s[++l]}n!==a?.index&&(o=w.nextNode(),n++)}return w.currentNode=E,r}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},N=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),O(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==M&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):We(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=H.createElement(ye(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(t);else{let o=new X(r,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=ge.get(e.strings);return t===void 0&&ge.set(e.strings,t=new H(e)),t}k(e){re(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,r=0;for(let o of e)r===t.length?t.push(s=new i(this.O(F()),this.O(F()),this,this.options)):s=t[r],s._$AI(o),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,t=this,s,r){let o=this.strings,n=!1;if(o===void 0)e=P(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==M,n&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=P(this,l[s+a],t,a),c===M&&(c=this._$AH[a]),n||(n=!O(c)||c!==this._$AH[a]),c===h?e=h:e!==h&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}n&&!r&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Y=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}},ee=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}},te=class extends C{constructor(e,t,s,r,o){super(e,t,s,r,o),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??h)===M)return;let s=this._$AH,r=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==h&&(s===h||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},se=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}};var Be=z.litHtmlPolyfillSupport;Be?.(H,N),(z.litHtmlVersions??(z.litHtmlVersions=[])).push("3.3.1");var $e=(i,e,t)=>{let s=t?.renderBefore??e,r=s._$litPart$;if(r===void 0){let o=t?.renderBefore??null;s._$litPart$=r=new N(e.insertBefore(F(),o),o,void 0,t??{})}return r._$AI(i),r};var L=globalThis,b=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=$e(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};b._$litElement$=!0,b.finalized=!0,L.litElementHydrateSupport?.({LitElement:b});var Ue=L.litElementPolyfillSupport;Ue?.({LitElement:b});(L.litElementVersions??(L.litElementVersions=[])).push("4.2.1");var K=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};var ze={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:q},Fe=(i=ze,e,t)=>{let{kind:s,metadata:r}=t,o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(t.name,i),s==="accessor"){let{name:n}=t;return{set(l){let a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,i)},init(l){return l!==void 0&&this.C(n,void 0,i,l),l}}}if(s==="setter"){let{name:n}=t;return function(l){let a=this[n];e.call(this,l),this.requestUpdate(n,a,i)}}throw Error("Unsupported decorator location: "+s)};function k(i){return(e,t)=>typeof t=="object"?Fe(i,e,t):((s,r,o)=>{let n=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(r,o):void 0})(i,e,t)}function f(i){return k({...i,state:!0,attribute:!1})}var $=class extends b{constructor(){super(...arguments);this.state={isActive:!1,isPaused:!1,wordsRevealed:0,totalWords:0,currentWPM:0,timeElapsed:0};this.defaultWPM=225;this.disabled=!1;this.currentWPM=225}connectedCallback(){super.connectedCallback(),this.currentWPM=this.defaultWPM}handleStart(){if(this.disabled)return;let t=new CustomEvent("blur-mode-start",{detail:{wpm:this.currentWPM},bubbles:!0,composed:!0});this.dispatchEvent(t)}handleStop(){if(this.disabled)return;let t=new CustomEvent("blur-mode-stop",{detail:void 0,bubbles:!0,composed:!0});this.dispatchEvent(t)}handlePause(){if(this.disabled)return;let t=this.state.isPaused?"blur-mode-resume":"blur-mode-pause",s=new CustomEvent(t,{detail:void 0,bubbles:!0,composed:!0});this.dispatchEvent(s)}handleSpeedChange(t){if(this.disabled)return;let s=t.target,r=parseInt(s.value);this.currentWPM=r;let o=new CustomEvent("blur-mode-speed-change",{detail:{wpm:r},bubbles:!0,composed:!0});this.dispatchEvent(o)}getProgressPercentage(){return this.state.totalWords===0?0:Math.round(this.state.wordsRevealed/this.state.totalWords*100)}formatTime(t){let s=Math.floor(t/1e3),r=Math.floor(s/60),o=s%60;return r>0?`${r}m ${o}s`:`${o}s`}render(){let t=this.getProgressPercentage();return m`
      <div class="controls-header">
        <div class="status-indicator ${this.state.isActive?this.state.isPaused?"paused":"active":""}"></div>
        <h3>Focus Mode Controls</h3>
      </div>

      ${this.state.isActive?m`
        <!-- Active - Show Control and Progress -->
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${t}%"></div>
        </div>

        <div class="progress-info">
          <div class="progress-stat">
            <span class="value">${this.state.wordsRevealed.toLocaleString()}</span>
            <span class="label">Words Read</span>
          </div>
          <div class="progress-stat">
            <span class="value">${t}%</span>
            <span class="label">Progress</span>
          </div>
          <div class="progress-stat">
            <span class="value">${this.formatTime(this.state.timeElapsed)}</span>
            <span class="label">Time</span>
          </div>
          <div class="progress-stat">
            <span class="value">${this.state.currentWPM}</span>
            <span class="label">Current WPM</span>
          </div>
        </div>

        <div class="control-row">
          <button 
            class="btn ${this.state.isPaused?"primary":"warning"}" 
            @click="${this.handlePause}"
            ?disabled="${this.disabled}"
          >
            ${this.state.isPaused?"\u25B6\uFE0F Resume":"\u23F8\uFE0F Pause"}
          </button>
          <button 
            class="btn danger" 
            @click="${this.handleStop}"
            ?disabled="${this.disabled}"
          >
            ⏹️ Stop
          </button>
        </div>

        <div class="speed-control">
          <label>Adjust Speed:</label>
          <input 
            type="range" 
            min="50" 
            max="600" 
            step="25"
            .value="${this.currentWPM}"
            @input="${this.handleSpeedChange}"
            ?disabled="${this.disabled}"
          />
          <span class="speed-value">${this.currentWPM} WPM</span>
        </div>
      `:m`
        <!-- Not Active - Show Start Controls -->
        <div class="speed-control">
          <label>Reading Speed:</label>
          <input 
            type="range" 
            min="50" 
            max="600" 
            step="25"
            .value="${this.currentWPM}"
            @input="${this.handleSpeedChange}"
            ?disabled="${this.disabled}"
          />
          <span class="speed-value">${this.currentWPM} WPM</span>
        </div>

        <div class="control-row">
          <button 
            class="btn primary" 
            @click="${this.handleStart}"
            ?disabled="${this.disabled}"
          >
            ▶️ Start Focus Mode
          </button>
        </div>

        <div class="keyboard-hints">
          <strong>Keyboard shortcuts:</strong> Space (pause/resume), Escape (stop), ← → (navigate when paused), R (restart)
        </div>
      `}
    `}};$.styles=W`
    :host {
      display: block;
      padding: 16px;
      background: #f8f9fa;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .controls-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .controls-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #6b7280;
    }

    .status-indicator.active {
      background: #10b981;
      animation: pulse 2s infinite;
    }

    .status-indicator.paused {
      background: #f59e0b;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }

    .control-row {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }

    .btn {
      padding: 8px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      flex: 1;
    }

    .btn:hover:not(:disabled) {
      background: #f3f4f6;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn.primary {
      background: #2e7d32;
      color: white;
      border-color: #2e7d32;
    }

    .btn.primary:hover:not(:disabled) {
      background: #1b5e20;
    }

    .btn.danger {
      background: #dc3545;
      color: white;
      border-color: #dc3545;
    }

    .btn.danger:hover:not(:disabled) {
      background: #c82333;
    }

    .btn.warning {
      background: #f59e0b;
      color: white;
      border-color: #f59e0b;
    }

    .btn.warning:hover:not(:disabled) {
      background: #d97706;
    }

    .speed-control {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      margin-bottom: 12px;
    }

    .speed-control label {
      font-size: 12px;
      font-weight: 500;
      color: #6b7280;
      min-width: 80px;
    }

    .speed-control input[type="range"] {
      flex: 1;
      margin: 0 8px;
    }

    .speed-control .speed-value {
      font-size: 12px;
      font-weight: 600;
      color: #1a1a1a;
      min-width: 60px;
      text-align: right;
    }

    .progress-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      font-size: 12px;
      color: #6b7280;
    }

    .progress-stat {
      background: white;
      padding: 8px;
      border-radius: 4px;
      text-align: center;
    }

    .progress-stat .value {
      display: block;
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 2px;
    }

    .progress-stat .label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .progress-bar {
      width: 100%;
      height: 4px;
      background: #e5e7eb;
      border-radius: 2px;
      overflow: hidden;
      margin: 8px 0;
    }

    .progress-fill {
      height: 100%;
      background: #2e7d32;
      transition: width 0.3s ease;
    }

    .keyboard-hints {
      margin-top: 12px;
      padding: 8px;
      background: #f3f4f6;
      border-radius: 4px;
      font-size: 11px;
      color: #6b7280;
      line-height: 1.4;
    }

    .keyboard-hints strong {
      color: #1a1a1a;
    }
  `,p([k({type:Object})],$.prototype,"state",2),p([k({type:Number})],$.prototype,"defaultWPM",2),p([k({type:Boolean})],$.prototype,"disabled",2),p([f()],$.prototype,"currentWPM",2),$=p([K("blur-mode-controls")],$);var g=class extends b{constructor(){super(...arguments);this.currentAnalysis=null;this.isAnalyzing=!1;this.blurModeActive=!1;this.blurModeState={isActive:!1,isPaused:!1,wordsRevealed:0,totalWords:0,currentWPM:0,timeElapsed:0};this.readingSpeedWPM=225;this.sessionStartTime=null;this.totalWordsRead=0;this.pagesAnalyzed=0;this.message="";this.blurModePollingInterval=null}async connectedCallback(){super.connectedCallback(),this.requestUpdate(),console.log("\u{1F680} ReadWise Pro sidebar opened - starting auto-analysis..."),await this.analyzeCurrentPage(),await this.syncBlurModeStatus(),await this.syncSessionStatus(),this.addEventListener("blur-mode-start",this.handleBlurModeStart.bind(this)),this.addEventListener("blur-mode-stop",this.handleBlurModeStop.bind(this)),this.addEventListener("blur-mode-pause",this.handleBlurModePause.bind(this)),this.addEventListener("blur-mode-resume",this.handleBlurModeResume.bind(this)),this.addEventListener("blur-mode-speed-change",this.handleBlurModeSpeedChange.bind(this))}async analyzeCurrentPage(){this.isAnalyzing=!0,this.message="";try{let t=await chrome.runtime.sendMessage({action:"analyze_page",readingSpeedWPM:this.readingSpeedWPM});if(t&&t.success){if(this.currentAnalysis=t.analysis,this.message="\u2705 Page analyzed successfully!",this.sessionStartTime&&this.currentAnalysis){this.blurModeActive||(this.totalWordsRead+=this.currentAnalysis.wordCount),this.pagesAnalyzed+=1;try{await chrome.runtime.sendMessage({action:"update_session_progress",update:{pagesAnalyzed:this.pagesAnalyzed,avgComplexity:this.currentAnalysis.complexity.complexityScore,wordsRead:this.blurModeActive?this.totalWordsRead:this.totalWordsRead}})}catch(s){console.error("Failed to update session progress:",s)}}}else this.message="\u274C "+(t?.error||"Analysis failed")}catch(t){console.error("Analysis error:",t),this.message="\u274C Failed to analyze page"}finally{this.isAnalyzing=!1}}async toggleBlurMode(){try{if(this.blurModeActive){let t=await chrome.runtime.sendMessage({action:"stop_blur_mode"});t?.success?(this.blurModeActive=!1,this.message="\u{1F441}\uFE0F Focus mode deactivated"):this.message="\u274C Failed to stop focus mode: "+(t?.error||"Unknown error")}else{let t=await chrome.runtime.sendMessage({action:"start_blur_mode"});t?.success?(this.blurModeActive=!0,this.message="\u{1F441}\uFE0F Focus mode activated"):this.message="\u274C Failed to start focus mode: "+(t?.error||"Unknown error")}}catch(t){console.error("Blur mode toggle error:",t),this.message="\u274C Failed to toggle focus mode"}}async startSession(){try{let t=await chrome.runtime.sendMessage({action:"start_reading_session",targetWPM:this.readingSpeedWPM});t?.success?(this.sessionStartTime=Date.now(),this.totalWordsRead=0,this.pagesAnalyzed=0,this.message="\u{1F680} Reading session started!"):this.message="\u274C Failed to start session: "+(t?.error||"Unknown error")}catch(t){console.error("Session start error:",t),this.message="\u274C Failed to start reading session"}}async endSession(){if(this.sessionStartTime)try{let t=await chrome.runtime.sendMessage({action:"end_reading_session"});if(t?.success){let s=this.getSessionDuration();this.message=`\u{1F4CA} Session ended! ${s}, ${this.totalWordsRead.toLocaleString()} words`,this.sessionStartTime=null}else this.message="\u274C Failed to end session: "+(t?.error||"Unknown error")}catch(t){console.error("Session end error:",t),this.message="\u274C Failed to end reading session"}}getSessionDuration(){if(!this.sessionStartTime)return"0s";let t=Math.floor((Date.now()-this.sessionStartTime)/1e3),s=Math.floor(t/60),r=t%60;return s>0?`${s}m ${r}s`:`${r}s`}updateReadingSpeed(t){let s=t.target;this.readingSpeedWPM=parseInt(s.value)}async syncBlurModeStatus(){try{let t=await chrome.runtime.sendMessage({action:"get_blur_status"});t?.success&&t.stats&&(this.blurModeActive=t.stats.isActive||!1,console.log("\u{1F504} Blur mode status synced:",this.blurModeActive))}catch(t){console.error("Failed to sync blur mode status:",t)}}async syncSessionStatus(){try{let t=await chrome.runtime.sendMessage({action:"get_session_status"});if(t?.success&&t.session){let s=t.session;this.sessionStartTime=s.startTime,console.log("\u{1F504} Session status synced:",!!s)}}catch(t){console.error("Failed to sync session status:",t)}}async handleBlurModeStart(t){try{this.sessionStartTime||(console.log("\u{1F680} Auto-starting reading session for focus mode..."),await this.startSession());let s=await chrome.runtime.sendMessage({action:"start_blur_mode"});s?.success?(this.blurModeActive=!0,this.blurModeState={...this.blurModeState,isActive:!0,isPaused:!1,currentWPM:t.detail.wpm},this.message="\u{1F441}\uFE0F Focus mode activated"+(this.sessionStartTime?" (integrated with session)":""),this.startBlurModePolling()):this.message="\u274C Failed to start focus mode: "+(s?.error||"Unknown error")}catch(s){console.error("Blur mode start error:",s),this.message="\u274C Failed to start focus mode"}}async handleBlurModeStop(t){try{let s=await chrome.runtime.sendMessage({action:"stop_blur_mode"});s?.success?(this.blurModeActive=!1,this.blurModeState={...this.blurModeState,isActive:!1,isPaused:!1},this.message="\u{1F441}\uFE0F Focus mode deactivated",this.stopBlurModePolling()):this.message="\u274C Failed to stop focus mode: "+(s?.error||"Unknown error")}catch(s){console.error("Blur mode stop error:",s),this.message="\u274C Failed to stop focus mode"}}async handleBlurModePause(t){try{(await chrome.runtime.sendMessage({action:"toggle_blur_pause"}))?.success&&(this.blurModeState={...this.blurModeState,isPaused:!0},this.message="\u23F8\uFE0F Focus mode paused")}catch(s){console.error("Blur mode pause error:",s)}}async handleBlurModeResume(t){try{(await chrome.runtime.sendMessage({action:"toggle_blur_pause"}))?.success&&(this.blurModeState={...this.blurModeState,isPaused:!1},this.message="\u25B6\uFE0F Focus mode resumed")}catch(s){console.error("Blur mode resume error:",s)}}async handleBlurModeSpeedChange(t){try{(await chrome.runtime.sendMessage({action:"adjust_blur_speed",wpm:t.detail.wpm}))?.success&&(this.blurModeState={...this.blurModeState,currentWPM:t.detail.wpm},this.message=`\u{1F39B}\uFE0F Speed adjusted to ${t.detail.wpm} WPM`)}catch(s){console.error("Blur mode speed change error:",s)}}startBlurModePolling(){this.stopBlurModePolling(),this.blurModePollingInterval=window.setInterval(async()=>{try{let t=await chrome.runtime.sendMessage({action:"get_blur_status"});t?.success&&t.stats&&(this.blurModeState={isActive:t.stats.isActive,isPaused:t.stats.isPaused,wordsRevealed:t.stats.wordsRevealed,totalWords:t.stats.totalWords,currentWPM:t.stats.currentWPM,timeElapsed:t.stats.timeElapsed},this.blurModeActive=t.stats.isActive,t.stats.isActive&&this.sessionStartTime&&(this.totalWordsRead=t.stats.wordsRevealed),t.stats.isActive||this.stopBlurModePolling())}catch(t){console.error("Blur mode polling error:",t),this.stopBlurModePolling()}},1e3)}stopBlurModePolling(){this.blurModePollingInterval&&(clearInterval(this.blurModePollingInterval),this.blurModePollingInterval=null)}render(){return m`
      <div class="reading-assistant">
        <header class="header">
          <h1>ReadWise Pro</h1>
          <div class="tagline">Smart Reading Assistant</div>
        </header>

        <main class="main-content">
          ${this.currentAnalysis?m`
            <div class="analysis-card">
              <div class="page-title">${this.currentAnalysis.title}</div>
              
              <div class="complexity-info">
                <div class="complexity-badge ${this.currentAnalysis.complexity.complexityScore.toLowerCase()}">
                  ${this.currentAnalysis.complexity.complexityScore}
                </div>
                <div class="reading-time">
                  ${this.currentAnalysis.readingTime} min read
                </div>
              </div>
              
              <div class="stats">
                <span>${this.currentAnalysis.wordCount.toLocaleString()} words</span>
                <span>${this.currentAnalysis.complexity.readabilityLevel} level</span>
              </div>
            </div>
          `:m`
            <div class="empty-state">
              <div class="icon">📖</div>
              <div>${this.isAnalyzing?"Analyzing page...":"No readable content found on this page"}</div>
            </div>
          `}

          <div class="controls">
            <button 
              @click="${this.analyzeCurrentPage}" 
              class="btn primary"
              ?disabled="${this.isAnalyzing}"
            >
              ${this.isAnalyzing?"\u23F3 Analyzing...":"\u{1F504} Refresh Analysis"}
            </button>

            <!-- Modular Blur Mode Controls Component -->
            <blur-mode-controls
              .state="${this.blurModeState}"
              .defaultWPM="${this.readingSpeedWPM}"
              .disabled="${this.isAnalyzing}"
            ></blur-mode-controls>

            <div class="speed-control">
              <span>Global Reading Speed:</span>
              <input 
                type="range" 
                min="150" 
                max="400" 
                step="25"
                .value="${this.readingSpeedWPM}"
                @input="${this.updateReadingSpeed}"
              />
              <span>${this.readingSpeedWPM} WPM</span>
            </div>

            ${this.sessionStartTime?m`
              <div class="session-info">
                <div class="session-stats">
                  <span>Time: ${this.getSessionDuration()}</span>
                  <span>Words: ${this.totalWordsRead.toLocaleString()}</span>
                  ${this.blurModeActive?m`
                    <span style="color: #2e7d32; font-weight: 600;">
                      📖 Focus Mode Active
                    </span>
                  `:m`
                    <span>Pages: ${this.pagesAnalyzed}</span>
                  `}
                </div>
                ${this.blurModeActive&&this.blurModeState.totalWords>0?m`
                  <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">
                    Progress: ${this.blurModeState.wordsRevealed}/${this.blurModeState.totalWords} words 
                    (${Math.round(this.blurModeState.wordsRevealed/this.blurModeState.totalWords*100)}%)
                  </div>
                `:""}
                <button @click="${this.endSession}" class="btn">⏹️ End Session</button>
              </div>
            `:m`
              <button @click="${this.startSession}" class="btn">▶️ Start Reading Session</button>
            `}
          </div>

          ${this.message?m`
            <div class="message ${this.message.includes("\u2705")||this.message.includes("\u{1F680}")?"success":"error"}">
              ${this.message}
            </div>
          `:""}
        </main>
      </div>
    `}};g.styles=W`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #FFFFFF;
      color: #1A1A1A;
    }
    
    .reading-assistant {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 16px;
      gap: 16px;
    }
    
    .header {
      text-align: center;
      border-bottom: 1px solid #E5E7EB;
      padding-bottom: 16px;
    }
    
    .header h1 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: #2E7D32;
    }
    
    .header .tagline {
      font-size: 12px;
      color: #6B7280;
      margin-top: 4px;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .analysis-card {
      background: #F8F9FA;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 16px;
    }
    
    .page-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
      line-height: 1.4;
    }
    
    .complexity-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .complexity-badge {
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      color: white;
    }
    
    .complexity-badge.simple { background: #10B981; }
    .complexity-badge.easy { background: #84CC16; }
    .complexity-badge.moderate { background: #F59E0B; }
    .complexity-badge.complex { background: #F97316; }
    .complexity-badge.very { background: #EF4444; }
    
    .reading-time {
      text-align: right;
      font-size: 12px;
      color: #6B7280;
    }
    
    .stats {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #6B7280;
    }
    
    .empty-state {
      text-align: center;
      padding: 32px 16px;
      color: #6B7280;
    }
    
    .empty-state .icon {
      font-size: 32px;
      margin-bottom: 12px;
    }
    
    .controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .btn {
      padding: 12px 16px;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    
    .btn:hover {
      background: #F3F4F6;
    }
    
    .btn.primary {
      background: #2E7D32;
      color: white;
      border-color: #2E7D32;
    }
    
    .btn.primary:hover {
      background: #1B5E20;
    }
    
    .btn.active {
      background: #2E7D32;
      color: white;
      border-color: #2E7D32;
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .speed-control {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
    }
    
    .speed-control input {
      flex: 1;
    }
    
    .session-info {
      background: #F8F9FA;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      padding: 12px;
      font-size: 12px;
    }
    
    .session-stats {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    
    .message {
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      margin-top: 8px;
    }
    
    .message.success {
      background: #D1FAE5;
      color: #047857;
      border: 1px solid #10B981;
    }
    
    .message.error {
      background: #FEE2E2;
      color: #B91C1C;
      border: 1px solid #EF4444;
    }
  `,p([f()],g.prototype,"currentAnalysis",2),p([f()],g.prototype,"isAnalyzing",2),p([f()],g.prototype,"blurModeActive",2),p([f()],g.prototype,"blurModeState",2),p([f()],g.prototype,"readingSpeedWPM",2),p([f()],g.prototype,"sessionStartTime",2),p([f()],g.prototype,"totalWordsRead",2),p([f()],g.prototype,"pagesAnalyzed",2),p([f()],g.prototype,"message",2),g=p([K("sidebar-app")],g);})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=sidebar.js.map
