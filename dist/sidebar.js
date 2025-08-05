(()=>{var Ae=Object.defineProperty;var we=Object.getOwnPropertyDescriptor;var c=(r,e,t,s)=>{for(var i=s>1?void 0:s?we(e,t):e,o=r.length-1,a;o>=0;o--)(a=r[o])&&(i=(s?a(e,t,i):a(i))||i);return s&&i&&Ae(e,t,i),i};var I=globalThis,j=I.ShadowRoot&&(I.ShadyCSS===void 0||I.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),oe=new WeakMap,k=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(j&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=oe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&oe.set(t,e))}return e}toString(){return this.cssText}},ae=r=>new k(typeof r=="string"?r:r+"",void 0,J),R=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((s,i,o)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new k(t,r,J)},ne=(r,e)=>{if(j)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),i=I.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},K=j?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ae(t)})(r):r;var{is:Se,defineProperty:_e,getOwnPropertyDescriptor:Ee,getOwnPropertyNames:Me,getOwnPropertySymbols:Fe,getPrototypeOf:Ce}=Object,A=globalThis,le=A.trustedTypes,Pe=le?le.emptyScript:"",ke=A.reactiveElementPolyfillSupport,z=(r,e)=>r,T={toAttribute(r,e){switch(e){case Boolean:r=r?Pe:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},q=(r,e)=>!Se(r,e),de={attribute:!0,type:String,converter:T,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),A.litPropertyMetadata??(A.litPropertyMetadata=new WeakMap);var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=de){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&_e(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){let{get:i,set:o}=Ee(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:i,set(a){let l=i?.call(this);o?.call(this,a),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??de}static _$Ei(){if(this.hasOwnProperty(z("elementProperties")))return;let e=Ce(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(z("properties"))){let t=this.properties,s=[...Me(t),...Fe(t)];for(let i of s)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)t.unshift(K(i))}else e!==void 0&&t.push(K(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ne(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:T).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:T;this._$Em=i;let l=a.fromAttribute(t,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(e,t,s){if(e!==void 0){let i=this.constructor,o=this[e];if(s??(s=i.getPropertyOptions(e)),!((s.hasChanged??q)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:o},a){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),o!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:a}=o,l=this[i];a!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[z("elementProperties")]=new Map,y[z("finalized")]=new Map,ke?.({ReactiveElement:y}),(A.reactiveElementVersions??(A.reactiveElementVersions=[])).push("2.1.1");var D=globalThis,G=D.trustedTypes,ce=G?G.createPolicy("lit-html",{createHTML:r=>r}):void 0,fe="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,be="?"+w,Re=`<${be}>`,E=document,W=()=>E.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",ie=Array.isArray,ze=r=>ie(r)||typeof r?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,he=/>/g,S=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ue=/'/g,ge=/"/g,ve=/^(?:script|style|textarea|title)$/i,re=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),m=re(1),je=re(2),qe=re(3),M=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),me=new WeakMap,_=E.createTreeWalker(E,129);function ye(r,e){if(!ie(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ce!==void 0?ce.createHTML(e):e}var Te=(r,e)=>{let t=r.length-1,s=[],i,o=e===2?"<svg>":e===3?"<math>":"",a=B;for(let l=0;l<t;l++){let n=r[l],p,u,d=-1,v=0;for(;v<n.length&&(a.lastIndex=v,u=a.exec(n),u!==null);)v=a.lastIndex,a===B?u[1]==="!--"?a=pe:u[1]!==void 0?a=he:u[2]!==void 0?(ve.test(u[2])&&(i=RegExp("</"+u[2],"g")),a=S):u[3]!==void 0&&(a=S):a===S?u[0]===">"?(a=i??B,d=-1):u[1]===void 0?d=-2:(d=a.lastIndex-u[2].length,p=u[1],a=u[3]===void 0?S:u[3]==='"'?ge:ue):a===ge||a===ue?a=S:a===pe||a===he?a=B:(a=S,i=void 0);let $=a===S&&r[l+1].startsWith("/>")?" ":"";o+=a===B?n+Re:d>=0?(s.push(p),n.slice(0,d)+fe+n.slice(d)+w+$):n+w+(d===-2?l:$)}return[ye(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},H=class r{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,a=0,l=e.length-1,n=this.parts,[p,u]=Te(e,t);if(this.el=r.createElement(p,s),_.currentNode=this.el.content,t===2||t===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=_.nextNode())!==null&&n.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(fe)){let v=u[a++],$=i.getAttribute(d).split(w),N=/([.?@])?(.*)/.exec(v);n.push({type:1,index:o,name:N[2],strings:$,ctor:N[1]==="."?X:N[1]==="?"?ee:N[1]==="@"?te:C}),i.removeAttribute(d)}else d.startsWith(w)&&(n.push({type:6,index:o}),i.removeAttribute(d));if(ve.test(i.tagName)){let d=i.textContent.split(w),v=d.length-1;if(v>0){i.textContent=G?G.emptyScript:"";for(let $=0;$<v;$++)i.append(d[$],W()),_.nextNode(),n.push({type:2,index:++o});i.append(d[v],W())}}}else if(i.nodeType===8)if(i.data===be)n.push({type:2,index:o});else{let d=-1;for(;(d=i.data.indexOf(w,d+1))!==-1;)n.push({type:7,index:o}),d+=w.length-1}o++}}static createElement(e,t){let s=E.createElement("template");return s.innerHTML=e,s}};function F(r,e,t=r,s){if(e===M)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl,o=U(e)?void 0:e._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=F(r,i._$AS(r,e.values),i,s)),e}var Z=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??E).importNode(t,!0);_.currentNode=i;let o=_.nextNode(),a=0,l=0,n=s[0];for(;n!==void 0;){if(a===n.index){let p;n.type===2?p=new L(o,o.nextSibling,this,e):n.type===1?p=new n.ctor(o,n.name,n.strings,this,e):n.type===6&&(p=new se(o,this,e)),this._$AV.push(p),n=s[++l]}a!==n?.index&&(o=_.nextNode(),a++)}return _.currentNode=E,i}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},L=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=F(this,e,t),U(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==M&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ze(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=H.createElement(ye(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{let o=new Z(i,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=me.get(e.strings);return t===void 0&&me.set(e.strings,t=new H(e)),t}k(e){ie(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,i=0;for(let o of e)i===t.length?t.push(s=new r(this.O(W()),this.O(W()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,t=this,s,i){let o=this.strings,a=!1;if(o===void 0)e=F(this,e,t,0),a=!U(e)||e!==this._$AH&&e!==M,a&&(this._$AH=e);else{let l=e,n,p;for(e=o[0],n=0;n<o.length-1;n++)p=F(this,l[s+n],t,n),p===M&&(p=this._$AH[n]),a||(a=!U(p)||p!==this._$AH[n]),p===h?e=h:e!==h&&(e+=(p??"")+o[n+1]),this._$AH[n]=p}a&&!i&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},X=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}},ee=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}},te=class extends C{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=F(this,e,t,0)??h)===M)return;let s=this._$AH,i=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},se=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){F(this,e)}};var Be=D.litHtmlPolyfillSupport;Be?.(H,L),(D.litHtmlVersions??(D.litHtmlVersions=[])).push("3.3.1");var xe=(r,e,t)=>{let s=t?.renderBefore??e,i=s._$litPart$;if(i===void 0){let o=t?.renderBefore??null;s._$litPart$=i=new L(e.insertBefore(W(),o),o,void 0,t??{})}return i._$AI(r),i};var O=globalThis,b=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=xe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};b._$litElement$=!0,b.finalized=!0,O.litElementHydrateSupport?.({LitElement:b});var De=O.litElementPolyfillSupport;De?.({LitElement:b});(O.litElementVersions??(O.litElementVersions=[])).push("4.2.1");var Q=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};var We={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:q},Ue=(r=We,e,t)=>{let{kind:s,metadata:i}=t,o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(t.name,r),s==="accessor"){let{name:a}=t;return{set(l){let n=e.get.call(this);e.set.call(this,l),this.requestUpdate(a,n,r)},init(l){return l!==void 0&&this.C(a,void 0,r,l),l}}}if(s==="setter"){let{name:a}=t;return function(l){let n=this[a];e.call(this,l),this.requestUpdate(a,n,r)}}throw Error("Unsupported decorator location: "+s)};function P(r){return(e,t)=>typeof t=="object"?Ue(r,e,t):((s,i,o)=>{let a=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),a?Object.getOwnPropertyDescriptor(i,o):void 0})(r,e,t)}function f(r){return P({...r,state:!0,attribute:!1})}var x=class extends b{constructor(){super(...arguments);this.state={isActive:!1,isPaused:!1,wordsRevealed:0,totalWords:0,currentWPM:0,timeElapsed:0};this.defaultWPM=225;this.disabled=!1;this.currentWPM=225}connectedCallback(){super.connectedCallback(),this.currentWPM=this.defaultWPM}handleStart(){if(this.disabled)return;let t=new CustomEvent("blur-mode-start",{detail:{wpm:this.currentWPM},bubbles:!0,composed:!0});this.dispatchEvent(t)}handleStop(){if(this.disabled)return;let t=new CustomEvent("blur-mode-stop",{detail:void 0,bubbles:!0,composed:!0});this.dispatchEvent(t)}handlePause(){if(this.disabled)return;let t=this.state.isPaused?"blur-mode-resume":"blur-mode-pause",s=new CustomEvent(t,{detail:void 0,bubbles:!0,composed:!0});this.dispatchEvent(s)}handleSpeedChange(t){if(this.disabled)return;let s=t.target,i=parseInt(s.value);this.currentWPM=i;let o=new CustomEvent("blur-mode-speed-change",{detail:{wpm:i},bubbles:!0,composed:!0});this.dispatchEvent(o)}getProgressPercentage(){return this.state.totalWords===0?0:Math.round(this.state.wordsRevealed/this.state.totalWords*100)}formatTime(t){let s=Math.floor(t/1e3),i=Math.floor(s/60),o=s%60;return i>0?`${i}m ${o}s`:`${o}s`}render(){let t=this.getProgressPercentage();return m`
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
    `}};x.styles=R`
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
  `,c([P({type:Object})],x.prototype,"state",2),c([P({type:Number})],x.prototype,"defaultWPM",2),c([P({type:Boolean})],x.prototype,"disabled",2),c([f()],x.prototype,"currentWPM",2),x=c([Q("blur-mode-controls")],x);var $e=[{text:"A reader lives a thousand lives before he dies. The man who never reads lives only one.",author:"George R.R. Martin"},{text:"The more that you read, the more things you will know. The more that you learn, the more places you'll go.",author:"Dr. Seuss"},{text:"Reading is to the mind what exercise is to the body.",author:"Joseph Addison"},{text:"Books are a uniquely portable magic.",author:"Stephen King"},{text:"A book is a dream that you hold in your hand.",author:"Neil Gaiman"},{text:"Reading is escape, and the opposite of escape; it's a way to make contact with reality.",author:"Nora Ephron"},{text:"Words have no single fixed meaning. Like wayward electrons, they can spin away from their initial orbit.",author:"David Mitchell"},{text:"Literature is the most agreeable way of ignoring life.",author:"Fernando Pessoa"}],g=class extends b{constructor(){super(...arguments);this.currentAnalysis=null;this.isAnalyzing=!1;this.blurModeActive=!1;this.blurModeState={isActive:!1,isPaused:!1,wordsRevealed:0,totalWords:0,currentWPM:0,timeElapsed:0};this.readingSpeedWPM=225;this.sessionStartTime=null;this.totalWordsRead=0;this.pagesAnalyzed=0;this.message="";this.currentQuote=$e[Math.floor(Math.random()*$e.length)];this.isHeaderScrolled=!1;this.blurModePollingInterval=null}async connectedCallback(){super.connectedCallback(),this.requestUpdate(),await this.loadRandomQuote(),console.log("\u{1F680} ReadWise Pro sidebar opened - starting auto-analysis..."),await this.analyzeCurrentPage(),await this.syncBlurModeStatus(),await this.syncSessionStatus(),this.setupScrollDetection(),this.addEventListener("blur-mode-start",this.handleBlurModeStart.bind(this)),this.addEventListener("blur-mode-stop",this.handleBlurModeStop.bind(this)),this.addEventListener("blur-mode-pause",this.handleBlurModePause.bind(this)),this.addEventListener("blur-mode-resume",this.handleBlurModeResume.bind(this)),this.addEventListener("blur-mode-speed-change",this.handleBlurModeSpeedChange.bind(this))}async loadRandomQuote(){try{let t=await fetch("https://zenquotes.io/api/random");if(t.ok){let s=await t.json();s&&s.length>0&&(this.currentQuote={text:s[0].q,author:s[0].a},console.log("\u{1F4DA} Loaded fresh inspirational quote:",this.currentQuote.author))}else console.log("\u{1F4DA} Using fallback quote - API unavailable")}catch(t){console.log("\u{1F4DA} Using fallback quote - fetch failed:",t)}}setupScrollDetection(){this.updateComplete.then(()=>{this.addEventListener("scroll",this.handleScroll.bind(this),{passive:!0})})}handleScroll(t){let s=this.scrollTop;s>80&&!this.isHeaderScrolled?this.isHeaderScrolled=!0:s<=5&&this.isHeaderScrolled&&(this.isHeaderScrolled=!1)}disconnectedCallback(){super.disconnectedCallback()}async analyzeCurrentPage(){this.isAnalyzing=!0,this.message="";try{let t=await chrome.runtime.sendMessage({action:"analyze_page",readingSpeedWPM:this.readingSpeedWPM});if(t&&t.success){if(this.currentAnalysis=t.analysis,this.message="\u2705 Page analyzed successfully!",this.sessionStartTime&&this.currentAnalysis){this.blurModeActive||(this.totalWordsRead+=this.currentAnalysis.wordCount),this.pagesAnalyzed+=1;try{await chrome.runtime.sendMessage({action:"update_session_progress",update:{pagesAnalyzed:this.pagesAnalyzed,avgComplexity:this.currentAnalysis.complexity.complexityScore,wordsRead:this.blurModeActive?this.totalWordsRead:this.totalWordsRead}})}catch(s){console.error("Failed to update session progress:",s)}}}else this.message="\u274C "+(t?.error||"Analysis failed")}catch(t){console.error("Analysis error:",t),this.message="\u274C Failed to analyze page"}finally{this.isAnalyzing=!1}}async toggleBlurMode(){try{if(this.blurModeActive){let t=await chrome.runtime.sendMessage({action:"stop_blur_mode"});t?.success?(this.blurModeActive=!1,this.message="\u2728 Peaceful reading space deactivated",this.stopBlurModePolling()):this.message="\u274C Failed to stop focus mode: "+(t?.error||"Unknown error")}else{this.sessionStartTime||(console.log("\u{1F680} Auto-starting reading session for peaceful reading space..."),await this.startSession());let t=await chrome.runtime.sendMessage({action:"start_blur_mode"});t?.success?(this.blurModeActive=!0,this.message="\u2728 Peaceful reading space activated"+(this.sessionStartTime?" (tracking your progress)":""),this.startBlurModePolling()):this.message="\u274C Failed to start focus mode: "+(t?.error||"Unknown error")}}catch(t){console.error("Blur mode toggle error:",t),this.message="\u274C Failed to toggle focus mode"}}async startSession(){try{let t=await chrome.runtime.sendMessage({action:"start_reading_session",targetWPM:this.readingSpeedWPM});t?.success?(this.sessionStartTime=Date.now(),this.totalWordsRead=0,this.pagesAnalyzed=0,this.message="\u{1F680} Reading session started!"):this.message="\u274C Failed to start session: "+(t?.error||"Unknown error")}catch(t){console.error("Session start error:",t),this.message="\u274C Failed to start reading session"}}async endSession(){if(this.sessionStartTime)try{let t=await chrome.runtime.sendMessage({action:"end_reading_session"});if(t?.success){let s=this.getSessionDuration();this.message=`\u{1F4CA} Session ended! ${s}, ${this.totalWordsRead.toLocaleString()} words`,this.sessionStartTime=null}else this.message="\u274C Failed to end session: "+(t?.error||"Unknown error")}catch(t){console.error("Session end error:",t),this.message="\u274C Failed to end reading session"}}getSessionDuration(){if(!this.sessionStartTime)return"0s";let t=Math.floor((Date.now()-this.sessionStartTime)/1e3),s=Math.floor(t/60),i=t%60;return s>0?`${s}m ${i}s`:`${i}s`}updateReadingSpeed(t){let s=t.target;this.readingSpeedWPM=parseInt(s.value)}async syncBlurModeStatus(){try{let t=await chrome.runtime.sendMessage({action:"get_blur_status"});t?.success&&t.stats&&(this.blurModeActive=t.stats.isActive||!1,console.log("\u{1F504} Blur mode status synced:",this.blurModeActive))}catch(t){console.error("Failed to sync blur mode status:",t)}}async syncSessionStatus(){try{let t=await chrome.runtime.sendMessage({action:"get_session_status"});if(t?.success&&t.session){let s=t.session;this.sessionStartTime=s.startTime,console.log("\u{1F504} Session status synced:",!!s)}}catch(t){console.error("Failed to sync session status:",t)}}async handleBlurModeStart(t){try{this.sessionStartTime||(console.log("\u{1F680} Auto-starting reading session for focus mode..."),await this.startSession());let s=await chrome.runtime.sendMessage({action:"start_blur_mode"});s?.success?(this.blurModeActive=!0,this.blurModeState={...this.blurModeState,isActive:!0,isPaused:!1,currentWPM:t.detail.wpm},this.message="\u{1F441}\uFE0F Focus mode activated"+(this.sessionStartTime?" (integrated with session)":""),this.startBlurModePolling()):this.message="\u274C Failed to start focus mode: "+(s?.error||"Unknown error")}catch(s){console.error("Blur mode start error:",s),this.message="\u274C Failed to start focus mode"}}async handleBlurModeStop(t){try{let s=await chrome.runtime.sendMessage({action:"stop_blur_mode"});s?.success?(this.blurModeActive=!1,this.blurModeState={...this.blurModeState,isActive:!1,isPaused:!1},this.message="\u{1F441}\uFE0F Focus mode deactivated",this.stopBlurModePolling()):this.message="\u274C Failed to stop focus mode: "+(s?.error||"Unknown error")}catch(s){console.error("Blur mode stop error:",s),this.message="\u274C Failed to stop focus mode"}}async handleBlurModePause(t){try{(await chrome.runtime.sendMessage({action:"toggle_blur_pause"}))?.success&&(this.blurModeState={...this.blurModeState,isPaused:!0},this.message="\u23F8\uFE0F Focus mode paused")}catch(s){console.error("Blur mode pause error:",s)}}async handleBlurModeResume(t){try{(await chrome.runtime.sendMessage({action:"toggle_blur_pause"}))?.success&&(this.blurModeState={...this.blurModeState,isPaused:!1},this.message="\u25B6\uFE0F Focus mode resumed")}catch(s){console.error("Blur mode resume error:",s)}}async handleBlurModeSpeedChange(t){try{(await chrome.runtime.sendMessage({action:"adjust_blur_speed",wpm:t.detail.wpm}))?.success&&(this.blurModeState={...this.blurModeState,currentWPM:t.detail.wpm},this.message=`\u{1F39B}\uFE0F Speed adjusted to ${t.detail.wpm} WPM`)}catch(s){console.error("Blur mode speed change error:",s)}}startBlurModePolling(){this.stopBlurModePolling(),this.blurModePollingInterval=window.setInterval(async()=>{try{let t=await chrome.runtime.sendMessage({action:"get_blur_status"});t?.success&&t.stats&&(this.blurModeState={isActive:t.stats.isActive,isPaused:t.stats.isPaused,wordsRevealed:t.stats.wordsRevealed,totalWords:t.stats.totalWords,currentWPM:t.stats.currentWPM,timeElapsed:t.stats.timeElapsed},this.blurModeActive=t.stats.isActive,t.stats.isActive&&this.sessionStartTime&&(this.totalWordsRead=t.stats.wordsRevealed),t.stats.isActive||this.stopBlurModePolling())}catch(t){console.error("Blur mode polling error:",t),this.stopBlurModePolling()}},1e3)}stopBlurModePolling(){this.blurModePollingInterval&&(clearInterval(this.blurModePollingInterval),this.blurModePollingInterval=null)}getComplexityMessage(t){return{simple:"Perfect for a quick read! \u2615",easy:"Nice and smooth - enjoy! \u{1F31F}",moderate:"A good challenge - you've got this! \u{1F4AA}",complex:"Complex content - take your time! \u{1F3AF}",very:"Deep content - perfect for focused reading! \u{1F9E0}"}[t.toLowerCase()]||"Ready for this reading adventure! \u{1F4DA}"}getSpecificGradeLevel(t){let s={"Elementary level":"Grade 3-5","Middle School level":"Grade 6-8","High School level":"Grade 9-12","College level":"College","Graduate level":"Graduate","Professional level":"Professional"},i=t.match(/Grade (\d+)/);if(i){let o=parseInt(i[1]);return o<=5?"Grade 3-5":o<=8?"Grade 6-8":o<=12?"Grade 9-12":o<=16?"College":"Graduate"}return s[t]||t}getReadingTimeLabel(t){return t<=2?"\u2615 Quick sip reading time":t<=5?"\u{1FAD6} Cozy reading time":t<=10?"\u{1F4D6} Comfortable reading time":"\u{1F6CB}\uFE0F Deep dive reading time"}render(){return m`
      <div class="reading-assistant ${this.isHeaderScrolled?"header-shrunk":""}">
        <header class="header ${this.isHeaderScrolled?"scrolled":""}">
          <h1>FocusRead</h1>
          <div class="tagline">Your friendly reading companion</div>
        </header>
        
        <!-- Motivational Quote Section -->
        <div class="quote-section">
          <div class="quote-text">"${this.currentQuote.text}"</div>
          <div class="quote-author">— ${this.currentQuote.author}</div>
        </div>


        <main class="main-content">
          ${this.currentAnalysis?m`
            <div class="analysis-card">
              <div class="page-title">${this.currentAnalysis.title}</div>
              
              <div class="welcome-message">
                📚 Great choice! Let's dive into this article together
              </div>
              
              <div class="complexity-pill ${this.currentAnalysis.complexity.complexityScore.toLowerCase()}">
                <span class="complexity-emoji">🧠</span>
                ${this.currentAnalysis.complexity.complexityScore} • ${this.getSpecificGradeLevel(this.currentAnalysis.complexity.readabilityLevel)} • Take your time!
              </div>
              
              <div class="reading-metrics">
                <div class="metric-card">
                  <span class="metric-value">${this.currentAnalysis.wordCount.toLocaleString()}</span>
                  <div class="metric-label">Words to explore</div>
                </div>
                <div class="metric-card">
                  <span class="metric-value">${this.currentAnalysis.readingTime} min</span>
                  <div class="metric-label">Cozy reading time</div>
                </div>
              </div>
            </div>
          `:m`
            <div class="empty-state">
              <div class="icon">📚</div>
              <div>${this.isAnalyzing?"\u{1F50D} Discovering the perfect reading experience for you...":"\u{1F4D6} Ready to analyze some amazing content! Navigate to an article and let's begin your reading journey."}</div>
            </div>
          `}

          <!-- Focus Helper Section -->
          <div class="section">
            <div class="section-title">
              <span class="custom-icon">
                <img src="../assets/icons/focus-helper.svg" alt="Focus Helper" width="20" height="20" />
              </span>
              Focus Helper
            </div>
            
            <div class="controls">
              <button 
                @click="${this.analyzeCurrentPage}" 
                class="btn primary"
                ?disabled="${this.isAnalyzing}"
              >
                ${this.isAnalyzing?"\u{1F50D} Analyzing...":"\u{1F50D} Analyze Page"}
              </button>
              
              <button 
                @click="${this.toggleBlurMode}" 
                class="btn focus-btn ${this.blurModeActive?"active":""}"
                ?disabled="${!this.currentAnalysis||this.isAnalyzing}"
              >
                ${this.blurModeActive?m`<span>✅</span><span>Peaceful mode active</span>`:m`<span>✨</span><span>Create peaceful reading space</span>`}
              </button>
            </div>
            
            <div style="font-size: 12px; color: #6B7280; font-style: italic; text-align: center; margin-top: 12px; font-family: Inter, sans-serif;">
              Highlight important text and reduce distractions
            </div>
          </div>

          <!-- Speed Control Section -->
          <div class="speed-section">
            <div class="section-title">
              <span class="custom-icon">
                <img src="../assets/icons/reading-rhythm.svg" alt="Reading Rhythm" width="20" height="20" />
              </span>
              My Reading Rhythm
            </div>
            <div class="speed-control">
              <div class="speed-slider-container">
                <span style="font-size: 12px; color: #047857; font-weight: 500;">Slow</span>
                <input 
                  class="speed-slider"
                  type="range" 
                  min="150" 
                  max="400" 
                  step="25"
                  .value="${this.readingSpeedWPM}"
                  @input="${this.updateReadingSpeed}"
                />
                <span style="font-size: 12px; color: #047857; font-weight: 500;">Fast</span>
              </div>
              <div style="text-align: center; margin-top: 12px;">
                <div class="speed-value">${this.readingSpeedWPM} WPM</div>
              </div>
            </div>
          </div>

          <!-- Your Reading Journey Section -->
          <div class="section">
            <div class="section-title">
              <span class="custom-icon">
                <img src="../assets/icons/reading-journey.svg" alt="Reading Journey" width="20" height="20" />
              </span>
              Your Reading Journey
            </div>
            
            ${this.sessionStartTime?m`
              <div class="session-info">
                <div class="session-header">
                  <span style="font-size: 16px;">📖</span>
                  <div class="session-title">You've been reading for</div>
                </div>
                <div class="session-duration">${this.getSessionDuration()}</div>
                
                <div class="session-stats">
                  <div class="session-stat">
                    <span class="session-stat-value">${this.totalWordsRead.toLocaleString()}</span>
                    <span class="session-stat-label">${this.blurModeActive?"Words discovered":"Words explored"}</span>
                  </div>
                  <div class="session-stat">
                    <span class="session-stat-value">${this.pagesAnalyzed}</span>
                    <span class="session-stat-label">Articles enjoyed</span>
                  </div>
                </div>
                
                ${this.blurModeActive&&this.blurModeState.totalWords>0?m`
                  <div style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border: 2px solid #F59E0B; padding: 12px; border-radius: 12px; text-align: center; margin-bottom: 12px;">
                    <div style="font-size: 12px; color: #92400E; margin-bottom: 4px; font-weight: 600;">✨ Peaceful Reading Progress</div>
                    <div style="font-size: 16px; font-weight: 700; color: #92400E; margin-bottom: 4px;">
                      ${this.blurModeState.wordsRevealed}/${this.blurModeState.totalWords} words discovered
                    </div>
                    <div style="font-size: 12px; color: #A16207;">
                      ${Math.round(this.blurModeState.wordsRevealed/this.blurModeState.totalWords*100)}% focus level
                    </div>
                  </div>
                `:""}
                
                <button @click="${this.endSession}" class="btn">🏁 Complete Reading Journey</button>
              </div>
            `:m`
              <div style="text-align: center; padding: 20px; background: rgba(255,255,255,0.6); border-radius: 12px; border: 2px dashed #A7F3D0;">
                <div style="font-size: 32px; margin-bottom: 12px; opacity: 0.7;">📖</div>
                <div style="font-size: 14px; color: #047857; margin-bottom: 12px;">Ready to start your reading adventure?</div>
                <button @click="${this.startSession}" class="btn primary">🚀 Begin Reading Session</button>
              </div>
            `}
          </div>

          ${this.message?m`
            <div class="message ${this.message.includes("\u2705")||this.message.includes("\u{1F680}")||this.message.includes("\u{1F4DA}")||this.message.includes("\u{1F411}\uFE0F")?"success":"error"}">
              ${this.message}
            </div>
          `:""}
        </main>
      </div>
    `}};g.styles=R`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      font-family: Charter, Georgia, 'Times New Roman', serif;
      background: linear-gradient(135deg, #F7F3E9 0%, #FDF8F0 100%);
      color: #065F46;
      overflow-y: auto;
      line-height: 1.6;
    }
    
    .reading-assistant {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      gap: 8px;
    }
    
    .header {
      background: linear-gradient(135deg, #065F46 0%, #047857 100%);
      color: #F7F3E9;
      padding: 24px 20px;
      text-align: center;
      position: sticky;
      top: 0;
      z-index: 100;
      border-radius: 0 0 24px 24px;
      box-shadow: 0 4px 20px rgba(6, 95, 70, 0.15);
      transition: all 0.3s ease;
    }
    
    .header.scrolled {
      padding: 12px 20px;
      border-radius: 0 0 12px 12px;
    }
    
    .header.scrolled .tagline {
      opacity: 0;
      height: 0;
      margin: 0;
      overflow: hidden;
    }
    
    .header.scrolled h1 {
      font-size: 20px;
      margin: 0;
    }
    
    .header.scrolled::before {
      font-size: 22px;
      top: 12px;
    }
    
    /* Add compensating padding when header shrinks */
    .reading-assistant.header-shrunk {
      padding-top: 12px;
    }
    
    .header::before {
      content: "📖";
      position: absolute;
      top: 12px;
      left: 20px;
      font-size: 28px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }
    
    .header h1 {
      margin: 0 0 6px 0;
      font-size: 26px;
      font-weight: bold;
      font-family: Charter, Georgia, 'Times New Roman', serif;
      letter-spacing: 0.5px;
    }
    
    .header .tagline {
      font-family: Inter, system-ui, sans-serif;
      font-size: 13px;
      color: #F7F3E9;
      opacity: 0.9;
      font-style: italic;
    }
    
    /* Motivational Quote Section */
    .quote-section {
      background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
      border: 2px solid #F59E0B;
      border-radius: 20px;
      padding: 20px;
      margin: 12px 16px 24px 16px;
      text-align: center;
    }
    
    .quote-text {
      font-family: Charter, Georgia, serif;
      font-style: italic;
      font-size: 14px;
      line-height: 1.5;
      color: #92400E;
      margin-bottom: 8px;
    }
    
    .quote-author {
      font-family: Inter, sans-serif;
      font-size: 11px;
      color: #A16207;
      margin-top: 8px;
      font-weight: 500;
    }
    
    .welcome-message {
      background: linear-gradient(135deg, #FED7AA 0%, #FECACA 100%);
      color: #065F46;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 20px;
      text-align: center;
      font-family: Inter, sans-serif;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
    }
    
    .analysis-card {
      background: #FFFFFF;
      border: 2px solid #FED7AA;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 6px 20px rgba(254, 215, 170, 0.2);
      position: relative;
      overflow: hidden;
      margin-bottom: 4px;
    }
    
    .analysis-card::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #FED7AA 0%, #F59E0B 50%, #FED7AA 100%);
    }
    
    .page-title {
      font-size: 17px;
      font-weight: 700;
      margin-bottom: 14px;
      line-height: 1.4;
      color: #065F46;
      font-family: Charter, Georgia, serif;
    }
    
    .complexity-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .complexity-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 20px;
      font-family: Inter, sans-serif;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 16px;
      border: 2px solid;
    }
    
    .complexity-pill.simple { 
      background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
      color: #065F46;
      border-color: #6EE7B7;
    }
    .complexity-pill.easy { 
      background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
      color: #047857;
      border-color: #A7F3D0;
    }
    .complexity-pill.moderate { 
      background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
      color: #B91C1C;
      border-color: #FCA5A5;
    }
    .complexity-pill.complex { 
      background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
      color: #B91C1C;
      border-color: #FCA5A5;
    }
    .complexity-pill.very { 
      background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
      color: #B91C1C;
      border-color: #FCA5A5;
    }
    
    .reading-time {
      text-align: right;
      font-size: 13px;
      color: #065F46;
      font-weight: 600;
    }
    
    .reading-time::before {
      content: "☕ ";
      opacity: 0.7;
    }
    
    .reading-metrics {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }
    
    .metric-card {
      background: linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%);
      border: 2px solid #BBF7D0;
      border-radius: 12px;
      padding: 12px 8px;
      text-align: center;
    }
    
    .metric-value {
      font-family: 'SF Mono', 'Monaco', monospace;
      font-size: 20px;
      font-weight: bold;
      color: #065F46;
      display: block;
      line-height: 1;
    }
    
    .metric-label {
      font-family: Inter, sans-serif;
      font-size: 11px;
      color: #047857;
      margin-top: 4px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .empty-state {
      text-align: center;
      padding: 32px 16px;
      color: #047857;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 16px;
      border: 2px dashed #A7F3D0;
    }
    
    .empty-state .icon {
      font-size: 48px;
      margin-bottom: 12px;
      opacity: 0.7;
    }
    
    /* Section Styling */
    .section {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 20px;
      border: 2px solid #FED7AA;
      box-shadow: 0 6px 20px rgba(254, 215, 170, 0.2);
    }
    
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #065F46;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: Charter, Georgia, serif;
    }
    
    .controls {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .btn {
      padding: 16px 24px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 600;
      transition: all 0.3s ease;
      font-family: Inter, system-ui, sans-serif;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    
    
    .btn.primary {
      background: linear-gradient(135deg, #FED7AA 0%, #F59E0B 100%);
      color: #92400E;
      box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
    }
    
    .btn.primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
    }
    
    .btn.focus-btn {
      background: linear-gradient(135deg, #FED7AA 0%, #F59E0B 100%);
      color: #92400E;
      box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
    }
    
    .btn.focus-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
    }
    
    .btn.focus-btn.active {
      background: linear-gradient(135deg, #065F46 0%, #047857 100%);
      color: #F7F3E9;
      box-shadow: 0 4px 15px rgba(6, 95, 70, 0.3);
    }
    
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    
    .speed-section {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 20px;
      border: 2px solid #FED7AA;
      box-shadow: 0 6px 20px rgba(254, 215, 170, 0.2);
    }
    
    .speed-control {
      background: linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%);
      border: 2px solid #BBF7D0;
      border-radius: 12px;
      padding: 12px;
      margin-top: 12px;
    }
    
    .speed-slider-container {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
    }
    
    .speed-slider {
      flex: 1;
      height: 8px;
      border-radius: 4px;
      background: linear-gradient(90deg, #FED7AA 0%, #F59E0B 100%);
      outline: none;
      -webkit-appearance: none;
    }
    
    .speed-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: linear-gradient(135deg, #065F46 0%, #047857 100%);
      cursor: pointer;
      box-shadow: 0 3px 8px rgba(6, 95, 70, 0.4);
      border: 3px solid #FFFFFF;
    }
    
    .speed-value {
      font-family: 'SF Mono', 'Monaco', monospace;
      font-size: 16px;
      font-weight: 700;
      color: #065F46;
      background: #FFFFFF;
      padding: 8px 12px;
      border-radius: 12px;
      min-width: 70px;
      text-align: center;
      border: 2px solid #BBF7D0;
    }
    
    .session-info {
      background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
      border: 2px solid #6EE7B7;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(110, 231, 183, 0.2);
    }
    
    .session-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    
    .session-title {
      font-size: 16px;
      font-weight: 700;
      color: #065F46;
      font-family: Charter, Georgia, serif;
    }
    
    .session-duration {
      font-size: 24px;
      font-weight: 700;
      color: #047857;
      text-align: center;
      margin: 12px 0;
    }
    
    .session-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .session-stat {
      text-align: center;
      background: rgba(255, 255, 255, 0.8);
      padding: 8px;
      border-radius: 8px;
    }
    
    .session-stat-value {
      font-size: 16px;
      font-weight: 700;
      color: #065F46;
      display: block;
    }
    
    .session-stat-label {
      font-size: 10px;
      color: #047857;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .message {
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
      margin-top: 12px;
      border: 2px solid;
      backdrop-filter: blur(10px);
    }
    
    .message.success {
      background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
      color: #065F46;
      border-color: #6EE7B7;
      box-shadow: 0 2px 8px rgba(110, 231, 183, 0.3);
    }
    
    .message.error {
      background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
      color: #7F1D1D;
      border-color: #F87171;
      box-shadow: 0 2px 8px rgba(248, 113, 113, 0.3);
    }
    
    /* Custom Icons */
    .custom-icon {
      width: 20px;
      height: 20px;
      display: inline-block;
    }
    
    /* Responsive adjustments */
    @media (max-width: 420px) {
      .stats {
        grid-template-columns: 1fr;
      }
      
      .session-stats {
        grid-template-columns: 1fr;
      }
    }
  `,c([f()],g.prototype,"currentAnalysis",2),c([f()],g.prototype,"isAnalyzing",2),c([f()],g.prototype,"blurModeActive",2),c([f()],g.prototype,"blurModeState",2),c([f()],g.prototype,"readingSpeedWPM",2),c([f()],g.prototype,"sessionStartTime",2),c([f()],g.prototype,"totalWordsRead",2),c([f()],g.prototype,"pagesAnalyzed",2),c([f()],g.prototype,"message",2),c([f()],g.prototype,"currentQuote",2),c([f()],g.prototype,"isHeaderScrolled",2),g=c([Q("sidebar-app")],g);})();
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
