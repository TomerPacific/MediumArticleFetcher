parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ZCfc":[function(require,module,exports) {
var e="GET",t=4,n=200,r=13,i="https://medium-fetcher.herokuapp.com/medium/",s=null,a=[],l=document.getElementById("userProfile"),u=document.getElementById("articles"),o=document.getElementById("spinner"),c=document.getElementById("username"),d=document.getElementById("errorMessage");function m(){s=new XMLHttpRequest;var r=i+c.value;s.open(e,r),s.setRequestHeader("Content-Type","application/json");try{s.send(null)}catch(a){console.error(a)}return new Promise(function(e,r){s.onreadystatechange=function(){if(this.readyState===t&&this.status===n){var i=JSON.parse(this.responseText);e(i)}else if(this.status!==n){var s=this.statusText?this.statusText:"Error in response";r(s)}}})}function p(){0!==c.value.length&&(h(),m().then(function(e){var t=f(e.message);g(e.message.items),E(t),b(),o.style.display="none"}).catch(function(e){o.style.display="none",d.innerHTML=e.message?e.message:"An error has occurred.",d.style.display="inline-block"}))}function h(){d.style.display="none",o.style.display="inline-block",l.innerHTML="",u.innerHTML="",a=[]}function f(e){return{profileLink:e.url,profileImg:e.image}}function g(e){for(var t=0;t<e.length;t++){var n=e[t];if(n.hasOwnProperty("category")){var r=new Article(n.title,n.url,y(n.published));a.push(r)}}}function y(e){return new Date(1e3*Number(e)).getTime().toString()}function v(e){var t=e.indexOf("src"),n=e.indexOf("width");return e.substring(t+5,n-2)}function E(e){var t=document.createElement("a"),n=document.createElement("img"),r=document.createElement("h2");r.innerHTML=c.value,r.setAttribute("id","username"),n.setAttribute("src",e.profileImg),n.setAttribute("id","userAvatar"),n.style.width="200px",n.style.height="200px",t.href=e.profileLink,t.setAttribute("target","_blank"),t.appendChild(n),l.appendChild(r),l.appendChild(t)}function b(){for(var e=0;e<a.length;e++){var t=document.createElement("li"),n=document.createElement("a"),r=a[e];if(n.href=r.link,n.title=r.title,n.setAttribute("target","_blank"),r.imgSrc){var i=document.createElement("img");i.src=r.imgSrc,i.setAttribute("class","articleImg"),n.appendChild(i)}else n.innerHTML=r.title;t.appendChild(n),u.appendChild(t)}}c.addEventListener("keyup",function(e){e.keyCode===r&&(e.preventDefault(),p())});
},{}]},{},["ZCfc"], null)
//# sourceMappingURL=main.5a2615bb.js.map