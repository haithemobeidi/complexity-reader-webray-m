(()=>{var vt=Object.defineProperty;var At=Object.getOwnPropertyDescriptor;var m=(r,t,e,s)=>{for(var i=s>1?void 0:s?At(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=(s?n(t,e,i):n(i))||i);return s&&i&&vt(t,e,i),i};var F=globalThis,L=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,I=Symbol(),st=new WeakMap,M=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==I)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=st.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&st.set(e,t))}return t}toString(){return this.cssText}},it=r=>new M(typeof r=="string"?r:r+"",void 0,I),V=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new M(e,r,I)},rt=(r,t)=>{if(L)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=F.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},K=L?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return it(e)})(r):r;var{is:bt,defineProperty:xt,getOwnPropertyDescriptor:St,getOwnPropertyNames:Et,getOwnPropertySymbols:wt,getPrototypeOf:Ct}=Object,_=globalThis,ot=_.trustedTypes,Pt=ot?ot.emptyScript:"",Mt=_.reactiveElementPolyfillSupport,R=(r,t)=>r,T={toAttribute(r,t){switch(t){case Boolean:r=r?Pt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},j=(r,t)=>!bt(r,t),nt={attribute:!0,type:String,converter:T,reflect:!1,useDefault:!1,hasChanged:j};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=nt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&xt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=St(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let l=i?.call(this);o?.call(this,n),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??nt}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let t=Ct(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let e=this.properties,s=[...Et(e),...wt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(K(i))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return rt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:T).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:T;this._$Em=i;let l=n.fromAttribute(e,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){let i=this.constructor,o=this[t];if(s??(s=i.getPropertyOptions(t)),!((s.hasChanged??j)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:n}=o,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[R("elementProperties")]=new Map,f[R("finalized")]=new Map,Mt?.({ReactiveElement:f}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.1.1");var O=globalThis,W=O.trustedTypes,at=W?W.createPolicy("lit-html",{createHTML:r=>r}):void 0,ut="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,mt="?"+v,Rt=`<${mt}>`,S=document,z=()=>S.createComment(""),k=r=>r===null||typeof r!="object"&&typeof r!="function",tt=Array.isArray,Tt=r=>tt(r)||typeof r?.[Symbol.iterator]=="function",Z=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lt=/-->/g,ct=/>/g,b=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,dt=/"/g,gt=/^(?:script|style|textarea|title)$/i,et=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),w=et(1),jt=et(2),Wt=et(3),E=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),pt=new WeakMap,x=S.createTreeWalker(S,129);function ft(r,t){if(!tt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return at!==void 0?at.createHTML(t):t}var Ut=(r,t)=>{let e=r.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",n=U;for(let l=0;l<e;l++){let a=r[l],h,p,c=-1,g=0;for(;g<a.length&&(n.lastIndex=g,p=n.exec(a),p!==null);)g=n.lastIndex,n===U?p[1]==="!--"?n=lt:p[1]!==void 0?n=ct:p[2]!==void 0?(gt.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=b):p[3]!==void 0&&(n=b):n===b?p[0]===">"?(n=i??U,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,h=p[1],n=p[3]===void 0?b:p[3]==='"'?dt:ht):n===dt||n===ht?n=b:n===lt||n===ct?n=U:(n=b,i=void 0);let y=n===b&&r[l+1].startsWith("/>")?" ":"";o+=n===U?a+Rt:c>=0?(s.push(h),a.slice(0,c)+ut+a.slice(c)+v+y):a+v+(c===-2?l:y)}return[ft(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},H=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0,l=t.length-1,a=this.parts,[h,p]=Ut(t,e);if(this.el=r.createElement(h,s),x.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=x.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(ut)){let g=p[n++],y=i.getAttribute(c).split(v),D=/([.?@])?(.*)/.exec(g);a.push({type:1,index:o,name:D[2],strings:y,ctor:D[1]==="."?G:D[1]==="?"?Q:D[1]==="@"?X:P}),i.removeAttribute(c)}else c.startsWith(v)&&(a.push({type:6,index:o}),i.removeAttribute(c));if(gt.test(i.tagName)){let c=i.textContent.split(v),g=c.length-1;if(g>0){i.textContent=W?W.emptyScript:"";for(let y=0;y<g;y++)i.append(c[y],z()),x.nextNode(),a.push({type:2,index:++o});i.append(c[g],z())}}}else if(i.nodeType===8)if(i.data===mt)a.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf(v,c+1))!==-1;)a.push({type:7,index:o}),c+=v.length-1}o++}}static createElement(t,e){let s=S.createElement("template");return s.innerHTML=t,s}};function C(r,t,e=r,s){if(t===E)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=k(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=C(r,i._$AS(r,t.values),i,s)),t}var J=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??S).importNode(e,!0);x.currentNode=i;let o=x.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new N(o,o.nextSibling,this,t):a.type===1?h=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(h=new Y(o,this,t)),this._$AV.push(h),a=s[++l]}n!==a?.index&&(o=x.nextNode(),n++)}return x.currentNode=S,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},N=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),k(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Tt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=H.createElement(ft(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new J(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=pt.get(t.strings);return e===void 0&&pt.set(t.strings,e=new H(t)),e}k(t){tt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new r(this.O(z()),this.O(z()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){let o=this.strings,n=!1;if(o===void 0)t=C(this,t,e,0),n=!k(t)||t!==this._$AH&&t!==E,n&&(this._$AH=t);else{let l=t,a,h;for(t=o[0],a=0;a<o.length-1;a++)h=C(this,l[s+a],e,a),h===E&&(h=this._$AH[a]),n||(n=!k(h)||h!==this._$AH[a]),h===d?t=d:t!==d&&(t+=(h??"")+o[a+1]),this._$AH[a]=h}n&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},G=class extends P{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},Q=class extends P{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},X=class extends P{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??d)===E)return;let s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Y=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}};var Ot=O.litHtmlPolyfillSupport;Ot?.(H,N),(O.litHtmlVersions??(O.litHtmlVersions=[])).push("3.3.1");var $t=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new N(t.insertBefore(z(),o),o,void 0,e??{})}return i._$AI(r),i};var B=globalThis,A=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=$t(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};A._$litElement$=!0,A.finalized=!0,B.litElementHydrateSupport?.({LitElement:A});var zt=B.litElementPolyfillSupport;zt?.({LitElement:A});(B.litElementVersions??(B.litElementVersions=[])).push("4.2.1");var yt=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var kt={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:j},Ht=(r=kt,t,e)=>{let{kind:s,metadata:i}=e,o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(e.name,r),s==="accessor"){let{name:n}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,r)},init(l){return l!==void 0&&this.C(n,void 0,r,l),l}}}if(s==="setter"){let{name:n}=e;return function(l){let a=this[n];t.call(this,l),this.requestUpdate(n,a,r)}}throw Error("Unsupported decorator location: "+s)};function _t(r){return(t,e)=>typeof e=="object"?Ht(r,t,e):((s,i,o)=>{let n=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(i,o):void 0})(r,t,e)}function $(r){return _t({...r,state:!0,attribute:!1})}var u=class extends A{constructor(){super(...arguments);this.currentAnalysis=null;this.isAnalyzing=!1;this.blurModeActive=!1;this.readingSpeedWPM=225;this.sessionStartTime=null;this.totalWordsRead=0;this.pagesAnalyzed=0;this.message=""}async connectedCallback(){super.connectedCallback(),this.requestUpdate(),console.log("\u{1F680} ReadWise Pro sidebar opened - starting auto-analysis..."),await this.analyzeCurrentPage()}async analyzeCurrentPage(){this.isAnalyzing=!0,this.message="";try{let e=await chrome.runtime.sendMessage({action:"analyze_page",readingSpeedWPM:this.readingSpeedWPM});e&&e.success?(this.currentAnalysis=e.analysis,this.message="\u2705 Page analyzed successfully!",this.sessionStartTime&&this.currentAnalysis&&(this.totalWordsRead+=this.currentAnalysis.wordCount,this.pagesAnalyzed+=1)):this.message="\u274C "+(e?.error||"Analysis failed")}catch(e){console.error("Analysis error:",e),this.message="\u274C Failed to analyze page"}finally{this.isAnalyzing=!1}}toggleBlurMode(){this.blurModeActive=!this.blurModeActive,this.message=this.blurModeActive?"\u{1F441}\uFE0F Focus mode activated":"\u{1F441}\uFE0F Focus mode deactivated"}startSession(){this.sessionStartTime=Date.now(),this.totalWordsRead=0,this.pagesAnalyzed=0,this.message="\u{1F680} Reading session started!"}endSession(){if(this.sessionStartTime){let e=this.getSessionDuration();this.message=`\u{1F4CA} Session ended! ${e}, ${this.totalWordsRead.toLocaleString()} words`,this.sessionStartTime=null}}getSessionDuration(){if(!this.sessionStartTime)return"0s";let e=Math.floor((Date.now()-this.sessionStartTime)/1e3),s=Math.floor(e/60),i=e%60;return s>0?`${s}m ${i}s`:`${i}s`}updateReadingSpeed(e){let s=e.target;this.readingSpeedWPM=parseInt(s.value)}render(){return w`
      <div class="reading-assistant">
        <header class="header">
          <h1>ReadWise Pro</h1>
          <div class="tagline">Smart Reading Assistant</div>
        </header>

        <main class="main-content">
          ${this.currentAnalysis?w`
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
          `:w`
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

            <button 
              @click="${this.toggleBlurMode}" 
              class="btn ${this.blurModeActive?"active":""}"
            >
              👁️ Focus Mode ${this.blurModeActive?"(ON)":""}
            </button>

            <div class="speed-control">
              <span>Reading Speed:</span>
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

            ${this.sessionStartTime?w`
              <div class="session-info">
                <div class="session-stats">
                  <span>Time: ${this.getSessionDuration()}</span>
                  <span>Words: ${this.totalWordsRead.toLocaleString()}</span>
                  <span>Pages: ${this.pagesAnalyzed}</span>
                </div>
                <button @click="${this.endSession}" class="btn">⏹️ End Session</button>
              </div>
            `:w`
              <button @click="${this.startSession}" class="btn">▶️ Start Reading Session</button>
            `}
          </div>

          ${this.message?w`
            <div class="message ${this.message.includes("\u2705")||this.message.includes("\u{1F680}")?"success":"error"}">
              ${this.message}
            </div>
          `:""}
        </main>
      </div>
    `}};u.styles=V`
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
  `,m([$()],u.prototype,"currentAnalysis",2),m([$()],u.prototype,"isAnalyzing",2),m([$()],u.prototype,"blurModeActive",2),m([$()],u.prototype,"readingSpeedWPM",2),m([$()],u.prototype,"sessionStartTime",2),m([$()],u.prototype,"totalWordsRead",2),m([$()],u.prototype,"pagesAnalyzed",2),m([$()],u.prototype,"message",2),u=m([yt("sidebar-app")],u);})();
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
