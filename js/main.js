!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";function r(e,t){if(o.customEvents&&o.customEvents[e])return o.customEvents[e];var n=i(e,t);return a(e,n),n}function i(e,t){return"function"!=typeof window.CustomEvent&&(s.prototype=window.Event.prototype),new s(e,t&&{detail:t})}function s(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}function a(e,t){null===o.customEvents&&(o.customEvents={}),o.customEvents[e]=t}Object.defineProperty(t,"__esModule",{value:!0});var o={html:document.querySelector("html"),body:document.querySelector("body"),customEvents:null,addClass:function(e,t){if(t)if(t.classList){e.trim().split(" ").forEach(function(e){return t.classList.add(e)})}else{var n=t.className?t.className+" ":"";n+=e,t.className=n}},hasClass:function(e,t){return t.classList?t.classList&&t.classList.contains(e):new RegExp("[ws]*"+e+"[sw]*").test(t.className)},toggleClass:function(e,t){t.classList.toggle(e)},removeClass:function(e,t){t&&(t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," "),""===t.className&&t.removeAttribute("class"))},hide:function(e){Array!==e.constructor&&(e=[e]),e.forEach(function(e){return e.style.display="none"})},show:function(e){Array!==e.constructor&&(e=[e]),e.forEach(function(e){return e.style.display=""})},setStyle:function(e,t){for(var n in e)e.hasOwnProperty(n)&&(t.style[n]=e[n])},setAttrs:function(e,t){for(var n in e)e.hasOwnProperty(n)&&t.setAttribute(n,e[n])},hasAttr:function(e,t){return t.getAttribute(e)},tagIs:function(e,t){if(t)return t.tagName.toLowerCase()===e.toLowerCase()},getAll:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document,n=t.querySelectorAll(e);if(n&&0!==n.length)return Array.prototype.slice.call(n)},add:function(e,t){t.appendChild(e)},prepend:function(e,t){t.insertBefore(e,t.firstChild)},parent:function(e,t){if(e){var n=e,r=void 0,i=void 0;do{if(i=n.parentNode,!i)break;r=!t||this.hasClass(t,i),n=i}while(!r&&i);return i}},viewDims:function(e){return e?e.getBoundingClientRect():{top:window.pageYOffset,width:window.innerWidth,height:window.innerHeight,bottom:window.pageYOffset+window.innerHeight}},trigger:function(e,t,n){var i=r(e,n);if(!i)throw new Error("Unable to trigger custom event: "+e);t.dispatchEvent(i)}};t.default=o},function(e,t){},function(e,t,n){n(3),e.exports=n(1)},function(e,t,n){"use strict";var r=n(4),i=function(e){return e&&e.__esModule?e:{default:e}}(r);n(1),n(8),i.default.init()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){var e=document.querySelector(".boundary");if(e){var t=window.getComputedStyle(e),n=/^\d+/,r=Number(n.exec(t.width)),i=Number(n.exec(t.fontSize)),s=w.view.smallViewEM*i;w.view.smallView=r<s}}function s(){m.default.addClass("focus-js",m.default.html)}function a(){var e=document.querySelector("#menu");if(e){var t=document.createElement("span");e.appendChild(t),t.id="menuBtn",t.addEventListener("click",function(){return m.default.toggleClass("open",w.view.nav)}),w.view.nav=e}}function o(){window.addEventListener("scroll",c)}function c(){w.view.scrolling||(window.requestAnimationFrame?window.requestAnimationFrame(u):setTimeout(u,200)),w.view.scrolling=!0}function u(){l(),w.view.scrolling=!1}function l(){if(0===window.pageYOffset)return m.default.removeClass(w.view.scrolledClass,m.default.html),void(w.view.scrolled=!1);w.view.scrolled||m.default.addClass(w.view.scrolledClass,m.default.html),w.view.scrolled=!0}function d(){var e=m.default.getAll("[data-lazlo]");e&&g.default.watch(e)}function f(){var e=m.default.getAll(".rwd-view");e&&A.default.setup(e,w.view.smallView)}Object.defineProperty(t,"__esModule",{value:!0});var h=n(0),m=r(h),p=n(5),g=r(p),v=n(7),A=r(v),w={view:{smallViewEM:39,scrolledClass:"js-scrolled"},init:function(){i(),s(),!0===w.view.smallView&&a(),o(),d(),!1===w.view.smallView&&f()}};t.default=w},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),s=r(i),a=n(6),o=r(a),c={devMode:!1,selectors:{resource:"data-lazlo",legacy:"data-original",resourceAttr:"data-lazlo-attr",defaultAttr:"src",watching:"lazlo",loading:"lazlo-loading",loaded:"lazlo-loaded",completed:"lazlo-completed"},watching:[],loaded:[],viewPort:null,watchCount:0,watch:function(e){this.resetState(),(e=e||this.getResources())&&0!==e.length&&(o.default.setup(),this.setupWatch(),this.addToWatch(e),this.checkView())},resetState:function(){this.watching=[],this.loaded=[],this.watchCount=0},getResources:function(){var e="["+this.selectors.resource+"]";return this.selectors.legacy&&(e+=",["+this.selectors.legacy+"]"),s.default.getAll(e)},setupWatch:function(){this.scrollHandler||(this.scrollHandler=this.onScroll.bind(this),window.addEventListener("scroll",this.scrollHandler),this.loadedHandler=this.onResourceLoaded.bind(this))},onScroll:function(){!0!==this.checking&&(setTimeout(this.checkView.bind(this),200),this.checking=!0)},addToWatch:function(e){this.watching=e.map(this.prepareLazloItem),this.watchCount=this.watching.length},prepareLazloItem:function(e){return s.default.addClass(c.selectors.watching,e),e},checkView:function(){var e=this;this.viewPort=s.default.viewDims();var t=[],n=this.watching.filter(function(n){return!(e.isWithinView(n)&&t.push(n))});this.watching=n,this.checking=!1,!0===c.devMode&&console.log("Lazlo status: watchCount: %s, waiting: %s, remaining: %s",this.watchCount,t.length,n.length),this.watchCount===this.loaded.length&&this.standDown(),0!==t.length&&this.processLoading(t)},isWithinView:function(e){var t=s.default.viewDims(e);return 0<t.width&&t.top<=this.viewPort.height&&t.bottom>=0},processLoading:function(e){var t=this,n=this.selectors;this.rwdImages=[],e.forEach(function(e){s.default.addClass(n.loading,e);var r=e.getAttribute(n.resource)||n.legacy&&e.getAttribute(n.legacy);r&&("noscript"===r?t.processNoscriptLoading(e):t.processElementLoading(e,r))}),0<this.rwdImages.length&&window.picturefill&&window.picturefill({elements:this.rwdImages,reevaluate:!0})},processNoscriptLoading:function(e){var t=e.querySelector("noscript");if(t){var n=t.textContent;t.insertAdjacentHTML("beforebegin",n);var r=s.default.getAll("img[srcset], picture img",e);r&&(this.rwdImages=this.rwdImages.concat(r)),this.setAsLoaded(e)}},processElementLoading:function(e,t){var n=this.selectors,r=e.getAttribute(n.resourceAttr)||n.defaultAttr;n.defaultAttr===r&&e.addEventListener("load",this.loadedHandler),e.setAttribute(r,t),n.defaultAttr===r&&s.default.tagIs("img",e)?this.prepareSrcSet(e):this.setAsLoaded(e)},prepareSrcSet:function(e){var t="data-srcset",n=e.getAttribute(t),r=[e];if(!n){var i=s.default.parent(e,"image");if(!i)return;if(!(r=s.default.getAll("source["+t+"]",i)))return}r.forEach(function(e){e.setAttribute("srcset",e.getAttribute(t)),e.removeAttribute(t)}),this.rwdImages.push(e)},onResourceLoaded:function(e){var t=e.target;t.removeEventListener("load",this.loadedHandler),this.setAsLoaded(t),s.default.tagIs("img",t)&&this.removeImageDims(t)},setAsLoaded:function(e){var t=this.selectors;s.default.removeClass(t.loading,e),e.removeAttribute(t.resource),e.removeAttribute(t.resourceAttr),t.legacy&&e.removeAttribute(t.legacy),s.default.addClass(t.loaded,e),this.loaded.push(e);var n=s.default.parent(e);n&&s.default.addClass(t.completed,n)},removeImageDims:function(e){s.default.hasAttr("data-dims",e)&&(e.removeAttribute("data-dims"),e.removeAttribute("height"))},standDown:function(){window.removeEventListener("scroll",this.scrollHandler),this.scrollHandler=null,this.loadedHandler=null,!0===c.devMode&&console.log("Lazlo has stood down.")}};t.default=c},function(e,t,n){"use strict";"user strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(r),s={selectors:{attr:"data-dims"},setup:function(){this.resizeHandler||(this.resizeHandler=this.onResize.bind(this),window.addEventListener("resize",this.resizeHandler)),this.process()},onResize:function(){!0!==this.resizing&&(setTimeout(this.process.bind(this),200),this.resizing=!0)},process:function(){var e=this.findImages();if(e&&0!==e.length){var t=this.getImageData(e);this.setImageDims(t),this.resizing=!1}},findImages:function(){return i.default.getAll("img["+this.selectors.attr+"]")},getImageData:function(e){var t=this,n=[];return e.forEach(function(e){var r=t.getDefinedDims(e);t.addComputedDims(r),n.push(r)}),n},getDefinedDims:function(e){var t=e.getAttribute(this.selectors.attr).split(",");return{element:e,defWidth:Number(t[0]),defHeight:Number(t[1])}},addComputedDims:function(e){e.parent=i.default.parent(e.element);var t=e.parent.getBoundingClientRect();e.width=t.width,e.ratio=Number((e.defHeight/e.defWidth).toFixed(2)),e.height=Math.floor(e.ratio*e.width)},setImageDims:function(e){e.forEach(function(e){e.element.setAttribute("height",e.height)})}};t.default=s},function(e,t,n){"use strict";"user strict";function r(e){var t=document.createElement("div");f.default.addClass(h.selectors.controls,t),h.viewModes.forEach(function(n,r){var i=document.createElement("button");s(n,i),i.setAttribute("data-index",r),f.default.add(i,t),f.default.hasClass(n,e)&&o(i)}),f.default.prepend(t,e)}function i(){h.container.forEach(function(e){r(e),c(e),e.addEventListener("click",a)})}function s(e,t){e=e.replace("rwd-",""),e=e.toLowerCase().replace(/\b[a-z]/g,function(e){return e.toUpperCase()}),t.innerHTML=e}function a(e){var t=e.target;if("button"===t.tagName.toLowerCase()){e.stopPropagation();var n=Number(t.getAttribute(h.selectors.index)),r=f.default.parent(t,h.selectors.container);r&&u(r,n),o(t)}}function o(e){h.activeControl&&f.default.removeClass(h.selectors.active,h.activeControl),f.default.addClass(h.selectors.active,e),h.activeControl=e}function c(e){var t=f.default.parent(e,"boxed");if(t){var n=t.querySelector(".hilite");n&&(n.textContent="3",t.querySelector(".plural").textContent="s")}}function u(e,t){var n=h.viewModes[t];n&&(l(e),f.default.addClass(n,e))}function l(e){h.viewModes.forEach(function(t){f.default.hasClass(t,e)&&f.default.removeClass(t,e)})}Object.defineProperty(t,"__esModule",{value:!0});var d=n(0),f=function(e){return e&&e.__esModule?e:{default:e}}(d),h={viewModes:["rwd-mobile","rwd-tablet","rwd-desktop"],selectors:{container:"rwd-view",controls:"rwd-view-controls",active:"active",device:"rwd-device",frame:"rwd-view-frame",index:"data-index",frameURL:"data-src"},setup:function(e){h.container=e,i()}};t.default=h},function(e,t,n){var r;/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
/*! Gecko-Picture - v1.0
 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
 * Firefox's early picture implementation (prior to FF41) is static and does
 * not react to viewport changes. This tiny module fixes this.
 */
!function(e){var t=navigator.userAgent;e.HTMLPictureElement&&/ecko/.test(t)&&t.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var t,n=document.createElement("source"),r=function(e){var t,r,i=e.parentNode;"PICTURE"===i.nodeName.toUpperCase()?(t=n.cloneNode(),i.insertBefore(t,i.firstElementChild),setTimeout(function(){i.removeChild(t)})):(!e._pfLastSize||e.offsetWidth>e._pfLastSize)&&(e._pfLastSize=e.offsetWidth,r=e.sizes,e.sizes+=",100vw",setTimeout(function(){e.sizes=r}))},i=function(){var e,t=document.querySelectorAll("picture > img, img[srcset][sizes]");for(e=0;e<t.length;e++)r(t[e])},s=function(){clearTimeout(t),t=setTimeout(i,99)},a=e.matchMedia&&matchMedia("(orientation: landscape)"),o=function(){s(),a&&a.addListener&&a.addListener(s)};return n.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?o():document.addEventListener("DOMContentLoaded",o),s}())}(window),/*! Picturefill - v3.0.2
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
 *  License: MIT
 */
function(i,s,a){"use strict";function o(e){return" "===e||"\t"===e||"\n"===e||"\f"===e||"\r"===e}function c(){N=!1,O=i.devicePixelRatio,W={},B={},b.DPR=O||1,U.width=Math.max(i.innerWidth||0,z.clientWidth),U.height=Math.max(i.innerHeight||0,z.clientHeight),U.vw=U.width/100,U.vh=U.height/100,w=[U.height,U.width,O].join("-"),U.em=b.getEmValue(),U.rem=U.em}function u(e,t,n,r){var i,s,a,o;return"saveData"===T.algorithm?e>2.7?o=n+1:(s=t-n,i=Math.pow(e-.6,1.5),a=s*i,r&&(a+=.1*i),o=e+a):o=n>1?Math.sqrt(e*t):e,o>n}function l(e){var t,n=b.getSet(e),r=!1;"pending"!==n&&(r=w,n&&(t=b.setRes(n),b.applySetCandidate(t,e))),e[b.ns].evaled=r}function d(e,t){return e.res-t.res}function f(e,t,n){var r;return!n&&t&&(n=e[b.ns].sets,n=n&&n[n.length-1]),r=h(t,n),r&&(t=b.makeUrl(t),e[b.ns].curSrc=t,e[b.ns].curCan=r,r.res||Z(r,r.set.sizes)),r}function h(e,t){var n,r,i;if(e&&t)for(i=b.parseSet(t),e=b.makeUrl(e),n=0;n<i.length;n++)if(e===b.makeUrl(i[n].url)){r=i[n];break}return r}function m(e,t){var n,r,i,s,a=e.getElementsByTagName("source");for(n=0,r=a.length;n<r;n++)i=a[n],i[b.ns]=!0,(s=i.getAttribute("srcset"))&&t.push({srcset:s,media:i.getAttribute("media"),type:i.getAttribute("type"),sizes:i.getAttribute("sizes")})}function p(e,t){function n(t){var n,r=t.exec(e.substring(d));if(r)return n=r[0],d+=n.length,n}function r(){var e,n,r,a,o,c,u,l,d,h=!1,m={};for(a=0;a<s.length;a++)o=s[a],c=o[o.length-1],u=o.substring(0,o.length-1),l=parseInt(u,10),d=parseFloat(u),G.test(u)&&"w"===c?((e||n)&&(h=!0),0===l?h=!0:e=l):K.test(u)&&"x"===c?((e||n||r)&&(h=!0),d<0?h=!0:n=d):G.test(u)&&"h"===c?((r||n)&&(h=!0),0===l?h=!0:r=l):h=!0;h||(m.url=i,e&&(m.w=e),n&&(m.d=n),r&&(m.h=r),r||n||e||(m.d=1),1===m.d&&(t.has1x=!0),m.set=t,f.push(m))}for(var i,s,a,c,u,l=e.length,d=0,f=[];;){if(n(V),d>=l)return f;i=n(Q),s=[],","===i.slice(-1)?(i=i.replace(F,""),r()):function(){for(n(q),a="",c="in descriptor";;){if(u=e.charAt(d),"in descriptor"===c)if(o(u))a&&(s.push(a),a="",c="after descriptor");else{if(","===u)return d+=1,a&&s.push(a),void r();if("("===u)a+=u,c="in parens";else{if(""===u)return a&&s.push(a),void r();a+=u}}else if("in parens"===c)if(")"===u)a+=u,c="in descriptor";else{if(""===u)return s.push(a),void r();a+=u}else if("after descriptor"===c)if(o(u));else{if(""===u)return void r();c="in descriptor",d-=1}d+=1}}()}}function g(e){var t,n,r,i,s,a,c=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,u=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(n=function(e){function t(){i&&(s.push(i),i="")}function n(){s[0]&&(a.push(s),s=[])}for(var r,i="",s=[],a=[],c=0,u=0,l=!1;;){if(""===(r=e.charAt(u)))return t(),n(),a;if(l){if("*"===r&&"/"===e[u+1]){l=!1,u+=2,t();continue}u+=1}else{if(o(r)){if(e.charAt(u-1)&&o(e.charAt(u-1))||!i){u+=1;continue}if(0===c){t(),u+=1;continue}r=" "}else if("("===r)c+=1;else if(")"===r)c-=1;else{if(","===r){t(),n(),u+=1;continue}if("/"===r&&"*"===e.charAt(u+1)){l=!0,u+=2;continue}}i+=r,u+=1}}}(e),r=n.length,t=0;t<r;t++)if(i=n[t],s=i[i.length-1],function(e){return!!(c.test(e)&&parseFloat(e)>=0)||(!!u.test(e)||("0"===e||"-0"===e||"+0"===e))}(s)){if(a=s,i.pop(),0===i.length)return a;if(i=i.join(" "),b.matchesMedia(i))return a}return"100vw"}s.createElement("picture");var v,A,w,b={},y=!1,C=function(){},E=s.createElement("img"),S=E.getAttribute,L=E.setAttribute,x=E.removeAttribute,z=s.documentElement,M={},T={algorithm:""},R=navigator.userAgent,D=/rident/.test(R)||/ecko/.test(R)&&R.match(/rv\:(\d+)/)&&RegExp.$1>35,I="currentSrc",P=/\s+\+?\d+(e\d+)?w/,H=/(\([^)]+\))?\s*(.+)/,_=i.picturefillCFG,k="font-size:100%!important;",N=!0,W={},B={},O=i.devicePixelRatio,U={px:1,in:96},$=s.createElement("a"),j=!1,q=/^[ \t\n\r\u000c]+/,V=/^[, \t\n\r\u000c]+/,Q=/^[^ \t\n\r\u000c]+/,F=/[,]+$/,G=/^\d+$/,K=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Y=function(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)},J=function(e){var t={};return function(n){return n in t||(t[n]=e(n)),t[n]}},X=function(){var e=/^([\d\.]+)(em|vw|px)$/,t=function(){for(var e=arguments,t=0,n=e[0];++t in e;)n=n.replace(e[t],e[++t]);return n},n=J(function(e){return"return "+t((e||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(t,r){var i;if(!(t in W))if(W[t]=!1,r&&(i=t.match(e)))W[t]=i[1]*U[i[2]];else try{W[t]=new Function("e",n(t))(U)}catch(e){}return W[t]}}(),Z=function(e,t){return e.w?(e.cWidth=b.calcListLength(t||"100vw"),e.res=e.w/e.cWidth):e.res=e.d,e},ee=function(e){if(y){var t,n,r,i=e||{};if(i.elements&&1===i.elements.nodeType&&("IMG"===i.elements.nodeName.toUpperCase()?i.elements=[i.elements]:(i.context=i.elements,i.elements=null)),t=i.elements||b.qsa(i.context||s,i.reevaluate||i.reselect?b.sel:b.selShort),r=t.length){for(b.setupRun(i),j=!0,n=0;n<r;n++)b.fillImg(t[n],i);b.teardownRun(i)}}};i.console&&console.warn,I in E||(I="src"),M["image/jpeg"]=!0,M["image/gif"]=!0,M["image/png"]=!0,M["image/svg+xml"]=s.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),b.ns=("pf"+(new Date).getTime()).substr(0,9),b.supSrcset="srcset"in E,b.supSizes="sizes"in E,b.supPicture=!!i.HTMLPictureElement,b.supSrcset&&b.supPicture&&!b.supSizes&&function(e){E.srcset="data:,a",e.src="data:,a",b.supSrcset=E.complete===e.complete,b.supPicture=b.supSrcset&&b.supPicture}(s.createElement("img")),b.supSrcset&&!b.supSizes?function(){var e="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",t=s.createElement("img"),n=function(){2===t.width&&(b.supSizes=!0),A=b.supSrcset&&!b.supSizes,y=!0,setTimeout(ee)};t.onload=n,t.onerror=n,t.setAttribute("sizes","9px"),t.srcset=e+" 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 9w",t.src=e}():y=!0,b.selShort="picture>img,img[srcset]",b.sel=b.selShort,b.cfg=T,b.DPR=O||1,b.u=U,b.types=M,b.setSize=C,b.makeUrl=J(function(e){return $.href=e,$.href}),b.qsa=function(e,t){return"querySelector"in e?e.querySelectorAll(t):[]},b.matchesMedia=function(){return i.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?b.matchesMedia=function(e){return!e||matchMedia(e).matches}:b.matchesMedia=b.mMQ,b.matchesMedia.apply(this,arguments)},b.mMQ=function(e){return!e||X(e)},b.calcLength=function(e){var t=X(e,!0)||!1;return t<0&&(t=!1),t},b.supportsType=function(e){return!e||M[e]},b.parseSize=J(function(e){var t=(e||"").match(H);return{media:t&&t[1],length:t&&t[2]}}),b.parseSet=function(e){return e.cands||(e.cands=p(e.srcset,e)),e.cands},b.getEmValue=function(){var e;if(!v&&(e=s.body)){var t=s.createElement("div"),n=z.style.cssText,r=e.style.cssText;t.style.cssText="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",z.style.cssText=k,e.style.cssText=k,e.appendChild(t),v=t.offsetWidth,e.removeChild(t),v=parseFloat(v,10),z.style.cssText=n,e.style.cssText=r}return v||16},b.calcListLength=function(e){if(!(e in B)||T.uT){var t=b.calcLength(g(e));B[e]=t||U.width}return B[e]},b.setRes=function(e){var t;if(e){t=b.parseSet(e);for(var n=0,r=t.length;n<r;n++)Z(t[n],e.sizes)}return t},b.setRes.res=Z,b.applySetCandidate=function(e,t){if(e.length){var n,r,i,s,a,o,c,l,h,m=t[b.ns],p=b.DPR;if(o=m.curSrc||t[I],c=m.curCan||f(t,o,e[0].set),c&&c.set===e[0].set&&((h=D&&!t.complete&&c.res-.1>p)||(c.cached=!0,c.res>=p&&(a=c))),!a)for(e.sort(d),s=e.length,a=e[s-1],r=0;r<s;r++)if(n=e[r],n.res>=p){i=r-1,a=e[i]&&(h||o!==b.makeUrl(n.url))&&u(e[i].res,n.res,p,e[i].cached)?e[i]:n;break}a&&(l=b.makeUrl(a.url),m.curSrc=l,m.curCan=a,l!==o&&b.setSrc(t,a),b.setSize(t))}},b.setSrc=function(e,t){var n;e.src=t.url,"image/svg+xml"===t.set.type&&(n=e.style.width,e.style.width=e.offsetWidth+1+"px",e.offsetWidth+1&&(e.style.width=n))},b.getSet=function(e){var t,n,r,i=!1,s=e[b.ns].sets;for(t=0;t<s.length&&!i;t++)if(n=s[t],n.srcset&&b.matchesMedia(n.media)&&(r=b.supportsType(n.type))){"pending"===r&&(n=r),i=n;break}return i},b.parseSets=function(e,t,n){var r,i,s,a,o=t&&"PICTURE"===t.nodeName.toUpperCase(),c=e[b.ns];(void 0===c.src||n.src)&&(c.src=S.call(e,"src"),c.src?L.call(e,"data-pfsrc",c.src):x.call(e,"data-pfsrc")),(void 0===c.srcset||n.srcset||!b.supSrcset||e.srcset)&&(r=S.call(e,"srcset"),c.srcset=r,a=!0),c.sets=[],o&&(c.pic=!0,m(t,c.sets)),c.srcset?(i={srcset:c.srcset,sizes:S.call(e,"sizes")},c.sets.push(i),(s=(A||c.src)&&P.test(c.srcset||""))||!c.src||h(c.src,i)||i.has1x||(i.srcset+=", "+c.src,i.cands.push({url:c.src,d:1,set:i}))):c.src&&c.sets.push({srcset:c.src,sizes:null}),c.curCan=null,c.curSrc=void 0,c.supported=!(o||i&&!b.supSrcset||s&&!b.supSizes),a&&b.supSrcset&&!c.supported&&(r?(L.call(e,"data-pfsrcset",r),e.srcset=""):x.call(e,"data-pfsrcset")),c.supported&&!c.srcset&&(!c.src&&e.src||e.src!==b.makeUrl(c.src))&&(null===c.src?e.removeAttribute("src"):e.src=c.src),c.parsed=!0},b.fillImg=function(e,t){var n,r=t.reselect||t.reevaluate;e[b.ns]||(e[b.ns]={}),n=e[b.ns],(r||n.evaled!==w)&&(n.parsed&&!t.reevaluate||b.parseSets(e,e.parentNode,t),n.supported?n.evaled=w:l(e))},b.setupRun=function(){j&&!N&&O===i.devicePixelRatio||c()},b.supPicture?(ee=C,b.fillImg=C):function(){var e,t=i.attachEvent?/d$|^c/:/d$|^c|^i/,n=function(){var i=s.readyState||"";r=setTimeout(n,"loading"===i?200:999),s.body&&(b.fillImgs(),(e=e||t.test(i))&&clearTimeout(r))},r=setTimeout(n,s.body?9:99),a=z.clientHeight,o=function(){N=Math.max(i.innerWidth||0,z.clientWidth)!==U.width||z.clientHeight!==a,a=z.clientHeight,N&&b.fillImgs()};Y(i,"resize",function(e,t){var n,r,i=function(){var s=new Date-r;s<t?n=setTimeout(i,t-s):(n=null,e())};return function(){r=new Date,n||(n=setTimeout(i,t))}}(o,99)),Y(s,"readystatechange",n)}(),b.picturefill=ee,b.fillImgs=ee,b.teardownRun=C,ee._=b,i.picturefillCFG={pf:b,push:function(e){var t=e.shift();"function"==typeof b[t]?b[t].apply(b,e):(T[t]=e[0],j&&b.fillImgs({reselect:!0}))}};for(;_&&_.length;)i.picturefillCFG.push(_.shift());i.picturefill=ee,"object"==typeof e&&"object"==typeof e.exports?e.exports=ee:void 0!==(r=function(){return ee}.call(t,n,t,e))&&(e.exports=r),b.supPicture||(M["image/webp"]=function(e,t){var n=new i.Image;return n.onerror=function(){M[e]=!1,ee()},n.onload=function(){M[e]=1===n.width,ee()},n.src=t,"pending"}("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document)}]);