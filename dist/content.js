(()=>{var p=class{calculateIndex(e){let t=this.countWords(e),o=this.countSentences(e),r=this.countCharacters(e);if(t===0||o===0)return 0;let i=r/t*100,l=o/t*100,a=.0588*i-.296*l-15.8;return Math.round(a*10)/10}getComplexityClassification(e){return e<=6?"Simple":e<=9?"Easy":e<=12?"Moderate":e<=15?"Complex":"Very Complex"}getReadabilityLevel(e){return e<=6?"Elementary":e<=9?"Middle School":e<=12?"High School":e<=15?"College":"Graduate"}countWords(e){return e.trim().split(/\s+/).filter(o=>o.length>0).length}countSentences(e){let t=e.split(/[.!?]+/).filter(o=>o.trim().length>10);return Math.max(1,t.length)}countCharacters(e){let t=e.match(/[a-zA-Z0-9]/g);return t?t.length:0}},g=class{constructor(){this.contentSelectors=[{selector:"main",priority:10},{selector:"article",priority:9},{selector:'[role="main"]',priority:8},{selector:".content",priority:7},{selector:".post-content",priority:7},{selector:".entry-content",priority:7},{selector:".article-content",priority:7},{selector:".text-content",priority:6},{selector:".main-content",priority:6},{selector:"#content",priority:5},{selector:".container",priority:3},{selector:"body",priority:1}]}extractMainContent(){let e=this.findBestContentContainer();if(!e)return{text:"",title:document.title||"Untitled",element:null};let t=this.extractAndCleanText(e),o=this.extractTitle();return{text:t,title:o,element:e}}findBestContentContainer(){for(let{selector:e}of this.contentSelectors){let t=document.querySelectorAll(e);for(let o of t)if(this.isGoodContentContainer(o))return console.log(`\u{1F4DD} Using content container: ${e}`),o}return console.warn("\u26A0\uFE0F No suitable content container found, using body"),document.body}isGoodContentContainer(e){return(e.textContent||"").trim().split(/\s+/).length>=50&&!this.isNavigationElement(e)&&!this.isFooterElement(e)&&this.hasGoodTextDensity(e)}isNavigationElement(e){let t=e.tagName.toLowerCase(),o=e.className.toLowerCase(),r=e.getAttribute("role")||"";return t==="nav"||r==="navigation"||o.includes("nav")||o.includes("menu")||o.includes("sidebar")}isFooterElement(e){let t=e.tagName.toLowerCase(),o=e.className.toLowerCase();return t==="footer"||o.includes("footer")}hasGoodTextDensity(e){let t=e.querySelectorAll("*").length,o=(e.textContent||"").length;return t===0||o/t>10}extractAndCleanText(e){let t=e.textContent||"";return t=t.replace(/\s+/g," ").replace(/\n+/g," ").replace(/\t+/g," ").trim(),t}extractTitle(){let e=[()=>document.querySelector("h1")?.textContent,()=>document.querySelector('[role="heading"][aria-level="1"]')?.textContent,()=>document.querySelector(".article-title")?.textContent,()=>document.querySelector(".post-title")?.textContent,()=>document.querySelector(".entry-title")?.textContent,()=>document.title];for(let t of e){let o=t()?.trim();if(o&&o.length>0)return o}return"Untitled"}},y=class{constructor(){this.unsuitableHostnames=["youtube.com","www.youtube.com","m.youtube.com","youtu.be","vimeo.com","dailymotion.com","twitch.tv","www.twitch.tv","netflix.com","hulu.com","disney.com","spotify.com","soundcloud.com","bandcamp.com","facebook.com","www.facebook.com","m.facebook.com","twitter.com","x.com","linkedin.com","instagram.com","tiktok.com","snapchat.com","reddit.com","www.reddit.com","discord.com","slack.com","teams.microsoft.com","whatsapp.com","telegram.org","signal.org"];this.unsuitablePatterns=["/admin","/dashboard","/wp-admin","/wp-login","/login","/signin","/signup","/register","/checkout","/cart","/payment","/billing"]}isPageSuitable(){let e=window.location.href.toLowerCase(),t=window.location.hostname.toLowerCase(),o=window.location.pathname.toLowerCase();if(e.startsWith("chrome-extension://")||e.startsWith("moz-extension://")||e.startsWith("ms-browser-extension://"))return console.log("\u{1F6AB} Skipping analysis - extension page detected"),!1;for(let r of this.unsuitableHostnames)if(t.includes(r))return console.log(`\u{1F6AB} Skipping analysis - unsuitable site: ${r}`),!1;for(let r of this.unsuitablePatterns)if(o.includes(r))return console.log(`\u{1F6AB} Skipping analysis - unsuitable page: ${r}`),!1;return this.hasMinimumContent()?!0:(console.log("\u{1F6AB} Skipping analysis - insufficient content"),!1)}hasMinimumContent(){let t=(document.body.textContent||"").trim().split(/\s+/).length,o=document.querySelectorAll("p").length;return t>=100&&o>=2}},d=class{constructor(){this.colemanLiau=new p;this.extractor=new g;this.suitabilityDetector=new y;this.baseReadingSpeedWPM=225}async analyzeCurrentPage(e=this.baseReadingSpeedWPM){if(console.log("\u{1F4CA} Starting text analysis..."),!this.suitabilityDetector.isPageSuitable())return console.log("\u{1F6AB} Page not suitable for analysis"),null;let{text:t,title:o,element:r}=this.extractor.extractMainContent();if(!t||t.length<100)return console.log("\u{1F6AB} Insufficient text content for analysis"),null;let i=this.colemanLiau.calculateIndex(t),l=this.colemanLiau.getComplexityClassification(i),a=this.colemanLiau.getReadabilityLevel(i),s=t.trim().split(/\s+/).length,m=t.split(/[.!?]+/).filter(M=>M.trim().length>0).length,v=(t.match(/[a-zA-Z0-9]/g)||[]).length,C=Math.round(s/Math.max(1,m)*10)/10,w=Math.round(v/s*10)/10,c=e;i>15?c*=.8:i>12?c*=.9:i<6&&(c*=1.1);let S=Math.ceil(s/c),h={wordCount:s,readingTime:S,complexity:{averageSentenceLength:C,averageCharactersPerWord:w,complexityScore:l,readabilityLevel:a,colemanLiauIndex:i},url:window.location.href,title:o,timestamp:Date.now(),textContent:t};return console.log("\u2705 Analysis complete:",h),h}getMainContentElement(){let{element:e}=this.extractor.extractMainContent();return e}setReadingSpeed(e){this.baseReadingSpeedWPM=e,console.log(`\u{1F4D6} Reading speed updated to ${e} WPM`)}};console.log("\u{1F680} ReadWise Pro - Content script loaded at:",new Date().toISOString());console.log("\u{1F310} Document ready state:",document.readyState);console.log("\u{1F517} Current URL:",window.location.href);var b,x=null;console.log("\u{1F527} Initializing ReadWise modules...");b=new d;console.log("\u2705 TextAnalysisEngine initialized");var f=class{constructor(){this.overlays=new Map;this.nextZIndex=1e4}createOverlay(e){console.log("\u{1F4E6} Creating simple DOM overlay:",e.id),this.removeOverlay(e.id);let t=document.createElement("div");return t.id=`webray-overlay-${e.id}`,t.style.cssText=`
      position: fixed;
      left: ${e.position?.x||20}px;
      top: ${e.position?.y||20}px;
      z-index: ${this.nextZIndex++};
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      max-width: 320px;
      cursor: ${e.draggable?"move":"default"};
    `,e.type==="debug"?t.innerHTML=`
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <div style="width: 12px; height: 12px; background: #4caf50; border-radius: 50%;"></div>
          <strong>WebRay-M Debug (Sidebar)</strong>
        </div>
        <div style="font-size: 12px; color: #666;">
          Framework: WebRay-M v2.0<br>
          Engine: Simple DOM<br>
          Type: Sidebar Extension<br>
          Page: ${document.title}
        </div>
        <button onclick="this.parentElement.remove()" style="
          margin-top: 8px; padding: 4px 8px; border: 1px solid #ddd; 
          background: #f5f5f5; border-radius: 4px; cursor: pointer;
        ">Close</button>
      `:e.type==="text"?t.innerHTML=`
        <div>${e.content||"Text overlay"}</div>
        <button onclick="this.parentElement.remove()" style="
          margin-top: 8px; padding: 4px 8px; border: 1px solid #ddd; 
          background: #f5f5f5; border-radius: 4px; cursor: pointer;
        ">Close</button>
      `:e.type==="sidebar"&&(t.innerHTML=`
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <div style="width: 12px; height: 12px; background: #ff9800; border-radius: 50%;"></div>
          <strong>WebRay-M Sidebar Panel</strong>
        </div>
        <div style="font-size: 12px; color: #666; margin-bottom: 12px;">
          This is a sidebar-style overlay that can contain<br>
          various tools and information panels.
        </div>
        <div style="display: flex; gap: 8px;">
          <button onclick="console.log('Sidebar action 1')" style="
            padding: 6px 12px; border: 1px solid #ddd; 
            background: #2196f3; color: white; border-radius: 4px; cursor: pointer;
          ">Action 1</button>
          <button onclick="console.log('Sidebar action 2')" style="
            padding: 6px 12px; border: 1px solid #ddd; 
            background: #4caf50; color: white; border-radius: 4px; cursor: pointer;
          ">Action 2</button>
        </div>
        <button onclick="this.parentElement.remove()" style="
          margin-top: 8px; padding: 4px 8px; border: 1px solid #ddd; 
          background: #f5f5f5; border-radius: 4px; cursor: pointer; width: 100%;
        ">Close Sidebar</button>
      `),e.draggable&&this.makeDraggable(t),document.body.appendChild(t),this.overlays.set(e.id,t),console.log("\u2705 Simple overlay created successfully"),t}makeDraggable(e){let t=!1,o=0,r=0,i=0,l=0;e.addEventListener("mousedown",a=>{t=!0,o=a.clientX,r=a.clientY;let s=e.getBoundingClientRect();i=s.left,l=s.top,e.style.opacity="0.8"}),document.addEventListener("mousemove",a=>{if(!t)return;let s=a.clientX-o,m=a.clientY-r;e.style.left=i+s+"px",e.style.top=l+m+"px"}),document.addEventListener("mouseup",()=>{t&&(t=!1,e.style.opacity="1")})}removeOverlay(e){let t=this.overlays.get(e);return t&&t.parentNode?(t.parentNode.removeChild(t),this.overlays.delete(e),!0):!1}},u=null;async function E(){return console.log("\u{1F4E6} Using simple DOM overlay system"),u=new f,!0}(async()=>{try{await E(),window.hasWebRayContentListener||(console.log("\u{1F3AF} Setting up message listener..."),chrome.runtime.onMessage.addListener((n,e,t)=>{if(console.log("\u{1F4E5} Content script received message:",n),n.action==="ping")return t({success:!0,message:"ReadWise Pro content script is active",features:["textAnalysis","blurMode","sessionTracking"],timestamp:Date.now()}),!0;if(n.action==="analyze_text")return(async()=>{try{console.log("\u{1F4CA} Starting text analysis...");let o=await b.analyzeCurrentPage(n.readingSpeedWPM);o?(x=o,console.log("\u2705 Analysis completed:",o),t({success:!0,analysis:o})):(console.log("\u26A0\uFE0F Page not suitable for analysis"),t({success:!1,error:"Page not suitable for text analysis"}))}catch(o){console.error("\u274C Analysis failed:",o),t({success:!1,error:o instanceof Error?o.message:"Analysis failed"})}})(),!0;if(n.action==="get_cached_analysis")return t({success:!0,analysis:x,timestamp:x?.timestamp||null}),!0;if(n.action==="update_reading_speed"){try{b.setReadingSpeed(n.wpm),t({success:!0})}catch(o){t({success:!1,error:o instanceof Error?o.message:"Failed to update reading speed"})}return!0}if(n.action==="create_debug_overlay"){try{u.createOverlay({id:n.overlayId,type:"debug",position:n.position,draggable:!0}),t({success:!0})}catch(o){console.error("Debug overlay creation failed:",o),t({success:!1,error:o instanceof Error?o.message:String(o)})}return!0}if(n.action==="create_text_overlay"){try{u.createOverlay({id:n.overlayId,type:"text",content:n.content,position:n.position,draggable:!0}),t({success:!0})}catch(o){console.error("Text overlay creation failed:",o),t({success:!1,error:o instanceof Error?o.message:String(o)})}return!0}if(n.action==="create_sidebar_overlay"){try{u.createOverlay({id:n.overlayId,type:"sidebar",position:n.position,draggable:!0}),t({success:!0})}catch(o){console.error("Sidebar overlay creation failed:",o),t({success:!1,error:o instanceof Error?o.message:String(o)})}return!0}if(n.action==="demo_action"){console.log("Content script received message:",n.data);let o=document.createElement("div");return o.textContent=`WebRay-M: ${n.data||"Message received!"}`,o.style.cssText=`
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 12px 16px;
            border-radius: 6px;
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          `,document.body.appendChild(o),setTimeout(()=>o.remove(),3e3),t({success:!0}),!0}}),window.hasWebRayContentListener=!0,console.log("\u{1F3AF} Message listener registered"),setTimeout(()=>{console.log("\u{1F9EA} Testing content script communication..."),chrome.runtime.sendMessage({action:"content_script_ready"},n=>{console.log("\u{1F7E2} Content script communication test:",n)})},1e3)),console.log("\u2705 Content script initialization completed")}catch(n){console.error("\u274C Content script initialization failed:",n)}})();})();
//# sourceMappingURL=content.js.map
