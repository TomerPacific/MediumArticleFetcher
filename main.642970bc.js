parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"WnFq":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var t=function t(i,o){e(this,t),this.profileLink=i,this.profileImg=o};exports.UserProfile=t;
},{}],"ZCfc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./userProfile"),t="GET",n=4,r=200,i="Enter",s="https://medium-fetcher.herokuapp.com/medium/",a=null,l=document.getElementById("userProfile"),u=document.getElementById("articles"),o=document.getElementById("spinner"),c=document.getElementById("username"),d=document.getElementById("errorMessage"),m=document.getElementById("search");function p(){a=new XMLHttpRequest;var e=s+c.value;a.open(t,e),a.setRequestHeader("Content-Type","application/json");try{a.send(null)}catch(i){console.error(i)}return new Promise(function(e,t){a.onreadystatechange=function(){if(this.readyState===n&&this.status===r){var i=JSON.parse(this.responseText);e(i)}else if(this.status!==r){var s=this.statusText?this.statusText:"Error in response";t(s)}}})}function h(){var t=[];0!==c.value.length&&(f(t),p().then(function(n){var r=new e.UserProfile(n.message.link,n.message.image);t=y(n.message.items),g(r),v(t),o.style.display="none"}).catch(function(e){o.style.display="none",d.innerHTML=e.message?e.message:"An error has occurred.",d.style.display="inline-block"}))}function f(e){d.style.display="none",o.style.display="inline-block",l.innerHTML="",u.innerHTML=""}function y(e){return e.filter(function(e){return e.hasOwnProperty("category")})}function g(e){var t=document.createElement("a"),n=document.createElement("img"),r=document.createElement("h2");r.innerHTML=c.value,r.setAttribute("id","username"),n.setAttribute("src",e.profileImg),n.setAttribute("id","userAvatar"),n.style.width="200px",n.style.height="200px",t.href=e.profileLink,t.setAttribute("target","_blank"),t.appendChild(n),l.appendChild(r),l.appendChild(t)}function v(e){for(var t=0;t<e.length;t++){var n=document.createElement("li"),r=document.createElement("a"),i=e[t];r.href=i.link,r.title=i.title,r.setAttribute("target","_blank"),r.innerHTML=i.title,n.appendChild(r),u.appendChild(n)}}c.addEventListener("keyup",function(e){e.key===i&&(e.preventDefault(),h())}),m.addEventListener("click",function(e){h()});
},{"./userProfile":"WnFq"}]},{},["ZCfc"], null)
//# sourceMappingURL=main.642970bc.js.map