var le=Object.defineProperty;var oe=(e,t,n)=>t in e?le(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var p=(e,t,n)=>(oe(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const u of i)if(u.type==="childList")for(const s of u.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const u={};return i.integrity&&(u.integrity=i.integrity),i.referrerpolicy&&(u.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?u.credentials="include":i.crossorigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function r(i){if(i.ep)return;i.ep=!0;const u=n(i);fetch(i.href,u)}})();function a(){}function j(e){return e()}function Q(){return Object.create(null)}function O(e){e.forEach(j)}function ee(e){return typeof e=="function"}function $(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function ce(e){return Object.keys(e).length===0}function fe(e,...t){if(e==null)return a;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function X(e,t,n){e.$$.on_destroy.push(fe(t,n))}function _(e,t){e.appendChild(t)}function x(e,t,n){e.insertBefore(t,n||null)}function b(e){e.parentNode&&e.parentNode.removeChild(e)}function m(e){return document.createElement(e)}function ae(e){return document.createTextNode(e)}function I(){return ae(" ")}function Y(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function g(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function de(e){return Array.from(e.childNodes)}function V(e,t){e.value=t==null?"":t}let N;function M(e){N=e}function te(){if(!N)throw new Error("Function called outside component initialization");return N}function F(e){te().$$.on_mount.push(e)}function G(e){te().$$.on_destroy.push(e)}const T=[],A=[],D=[],W=[],he=Promise.resolve();let B=!1;function pe(){B||(B=!0,he.then(ne))}function K(e){D.push(e)}const z=new Set;let U=0;function ne(){const e=N;do{for(;U<T.length;){const t=T[U];U++,M(t),me(t.$$)}for(M(null),T.length=0,U=0;A.length;)A.pop()();for(let t=0;t<D.length;t+=1){const n=D[t];z.has(n)||(z.add(n),n())}D.length=0}while(T.length);for(;W.length;)W.pop()();B=!1,z.clear(),M(e)}function me(e){if(e.fragment!==null){e.update(),O(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(K)}}const R=new Set;let ge;function v(e,t){e&&e.i&&(R.delete(e),e.i(t))}function q(e,t,n,r){if(e&&e.o){if(R.has(e))return;R.add(e),ge.c.push(()=>{R.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}else r&&r()}function L(e){e&&e.c()}function w(e,t,n,r){const{fragment:i,after_update:u}=e.$$;i&&i.m(t,n),r||K(()=>{const s=e.$$.on_mount.map(j).filter(ee);e.$$.on_destroy?e.$$.on_destroy.push(...s):O(s),e.$$.on_mount=[]}),u.forEach(K)}function E(e,t){const n=e.$$;n.fragment!==null&&(O(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function _e(e,t){e.$$.dirty[0]===-1&&(T.push(e),pe(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function S(e,t,n,r,i,u,s,o=[-1]){const c=N;M(e);const l=e.$$={fragment:null,ctx:[],props:u,update:a,not_equal:i,bound:Q(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:Q(),dirty:o,skip_bound:!1,root:t.target||c.$$.root};s&&s(l.root);let h=!1;if(l.ctx=n?n(e,t.props||{},(d,f,...C)=>{const J=C.length?C[0]:f;return l.ctx&&i(l.ctx[d],l.ctx[d]=J)&&(!l.skip_bound&&l.bound[d]&&l.bound[d](J),h&&_e(e,d)),f}):[],l.update(),h=!0,O(l.before_update),l.fragment=r?r(l.ctx):!1,t.target){if(t.hydrate){const d=de(t.target);l.fragment&&l.fragment.l(d),d.forEach(b)}else l.fragment&&l.fragment.c();t.intro&&v(e.$$.fragment),w(e,t.target,t.anchor,t.customElement),ne()}M(c)}class k{$destroy(){E(this,1),this.$destroy=a}$on(t,n){if(!ee(n))return a;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const i=r.indexOf(n);i!==-1&&r.splice(i,1)}}$set(t){this.$$set&&!ce(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const y=[];function P(e,t=a){let n;const r=new Set;function i(o){if($(e,o)&&(e=o,n)){const c=!y.length;for(const l of r)l[1](),y.push(l,e);if(c){for(let l=0;l<y.length;l+=2)y[l][0](y[l+1]);y.length=0}}}function u(o){i(o(e))}function s(o,c=a){const l=[o,c];return r.add(l),r.size===1&&(n=t(i)||a),o(e),()=>{r.delete(l),r.size===0&&(n(),n=null)}}return{set:i,update:u,subscribe:s}}let H=P(!1),re=P(""),ie=P(void 0),se=P(""),ue=P([]);function $e(e){let t,n;return{c(){t=m("main"),n=m("div"),n.innerHTML=`<div class="lds-grid svelte-1q2niwf"><div class="svelte-1q2niwf"></div> 
            <div class="svelte-1q2niwf"></div> 
            <div class="svelte-1q2niwf"></div> 
            <div class="svelte-1q2niwf"></div> 
            <div class="svelte-1q2niwf"></div> 
            <div class="svelte-1q2niwf"></div> 
            <div class="svelte-1q2niwf"></div> 
            <div class="svelte-1q2niwf"></div> 
            <div class="svelte-1q2niwf"></div></div> 
        <h3>Loading...</h3>`,g(n,"id","spinner"),g(n,"class","svelte-1q2niwf")},m(r,i){x(r,t,i),_(t,n),e[1](n)},p:a,i:a,o:a,d(r){r&&b(t),e[1](null)}}}function be(e,t,n){let r,i;F(()=>{i=H.subscribe(s=>{n(0,r.style.display=s?"inline-block":"none",r)})}),G(i);function u(s){A[s?"unshift":"push"](()=>{r=s,n(0,r)})}return[r,u]}class ye extends k{constructor(t){super(),S(this,t,be,$e,$,{})}}const ve="GET",we=4,Z=200,Ee="https://medium-article-fetcher.onrender.com/medium/";function Ae(e){if(e.length!==0)return xe(e)}function xe(e){let t=new XMLHttpRequest,n=Ee+e;t.open(ve,n),t.setRequestHeader("Content-Type","application/json");try{t.send(null)}catch(r){console.error(r)}return new Promise(function(r,i){t.onreadystatechange=function(){if(this.readyState===we&&this.status===Z){let u=JSON.parse(this.responseText);r(u)}else if(this.status!==Z){let u=this.statusText?this.statusText:"Error in response";i(u)}}})}class Se{constructor(t,n){p(this,"profileLink");p(this,"profileImg");this.profileLink=t,this.profileImg=n}}function ke(e){let t,n,r,i,u,s;return{c(){t=m("main"),n=m("div"),r=m("input"),i=m("button"),i.textContent="Search",g(r,"id","username"),g(r,"type","text"),g(r,"placeholder","Username?"),g(i,"id","search"),g(n,"id","userInput")},m(o,c){x(o,t,c),_(t,n),_(n,r),V(r,e[0]),_(n,i),u||(s=[Y(r,"input",e[2]),Y(i,"click",e[1])],u=!0)},p(o,[c]){c&1&&r.value!==o[0]&&V(r,o[0])},i:a,o:a,d(o){o&&b(t),u=!1,O(s)}}}function qe(e){return e.filter(function(n){return n.hasOwnProperty("category")})}function Le(e,t,n){let r="";function i(){r.length!==0&&(H.set(!0),se.set(r),Ae(r).then(function(s){H.set(!1);let o=new Se(s.message.link,s.message.image);ie.set(o);let c=qe(s.message.items);ue.set(c)}).catch(function(s){H.set(!1),re.set(s)}))}function u(){r=this.value,n(0,r)}return[r,i,u]}class Te extends k{constructor(t){super(),S(this,t,Le,ke,$,{})}}function Me(e){let t,n;return{c(){t=m("main"),n=m("h3"),g(n,"id","errorMessage")},m(r,i){x(r,t,i),_(t,n),e[1](n)},p:a,i:a,o:a,d(r){r&&b(t),e[1](null)}}}function Ne(e,t,n){let r,i;F(()=>{i=re.subscribe(s=>{s.length>0?(n(0,r.style.display="inline-block",r),n(0,r.innerHTML=s,r)):n(0,r.style.display="none",r)})}),G(i);function u(s){A[s?"unshift":"push"](()=>{r=s,n(0,r)})}return[r,u]}class Oe extends k{constructor(t){super(),S(this,t,Ne,Me,$,{})}}function Pe(e){let t,n;return{c(){t=m("main"),n=m("div"),g(n,"id","userProfile")},m(r,i){x(r,t,i),_(t,n),e[1](n)},p:a,i:a,o:a,d(r){r&&b(t),e[1](null)}}}function Ce(e,t,n){let r,i;X(e,se,l=>n(3,r=l)),X(e,ie,l=>n(4,i=l));let u,s;F(()=>{i!==void 0&&o(i),s=r});function o(l){let h=document.createElement("a"),d=document.createElement("img"),f=document.createElement("h2");f.innerHTML=s,f.setAttribute("id","username"),d.setAttribute("src",l.profileImg),d.setAttribute("id","userAvatar"),d.style.width="200px",d.style.height="200px",h.href=l.profileLink,h.setAttribute("target","_blank"),h.appendChild(d),u.appendChild(f),u.appendChild(h)}function c(l){A[l?"unshift":"push"](()=>{u=l,n(0,u)})}return[u,c]}class Ie extends k{constructor(t){super(),S(this,t,Ce,Pe,$,{})}}class Ue{constructor(t){p(this,"author");p(this,"category");p(this,"content");p(this,"content_encoded");p(this,"created");p(this,"enclosures");p(this,"id");p(this,"link");p(this,"published");p(this,"url");p(this,"title");this.author=t.author,this.category=t.category,this.content=t.content,this.content_encoded=t.content_encoded,this.created=t.created,this.enclosures=t.enclosures,this.id=t.id,this.link=t.link,this.published=t.published,this.url=t.url,this.title=t.title}createArticleMarkup(){let t=document.createElement("li"),n=document.createElement("a");return n.href=this.link,n.title=this.title,n.setAttribute("target","_blank"),n.innerHTML=this.title,t.appendChild(n),t}}function De(e){let t,n;return{c(){t=m("main"),n=m("ul"),g(n,"id","articles"),g(n,"class","svelte-y504eo")},m(r,i){x(r,t,i),_(t,n),e[1](n)},p:a,i:a,o:a,d(r){r&&b(t),e[1](null)}}}function Re(e,t,n){let r,i;F(()=>{i=ue.subscribe(s=>{if(s.length>0)for(let o of s){let c=new Ue(o);r.appendChild(c.createArticleMarkup())}})}),G(i);function u(s){A[s?"unshift":"push"](()=>{r=s,n(0,r)})}return[r,u]}class He extends k{constructor(t){super(),S(this,t,Re,De,$,{})}}function Fe(e){let t,n,r,i,u,s,o,c,l,h,d;return n=new Te({}),i=new ye({}),s=new Oe({}),c=new Ie({}),h=new He({}),{c(){t=m("main"),L(n.$$.fragment),r=I(),L(i.$$.fragment),u=I(),L(s.$$.fragment),o=I(),L(c.$$.fragment),l=I(),L(h.$$.fragment),g(t,"id","container")},m(f,C){x(f,t,C),w(n,t,null),_(t,r),w(i,t,null),_(t,u),w(s,t,null),_(t,o),w(c,t,null),_(t,l),w(h,t,null),d=!0},p:a,i(f){d||(v(n.$$.fragment,f),v(i.$$.fragment,f),v(s.$$.fragment,f),v(c.$$.fragment,f),v(h.$$.fragment,f),d=!0)},o(f){q(n.$$.fragment,f),q(i.$$.fragment,f),q(s.$$.fragment,f),q(c.$$.fragment,f),q(h.$$.fragment,f),d=!1},d(f){f&&b(t),E(n),E(i),E(s),E(c),E(h)}}}class ze extends k{constructor(t){super(),S(this,t,null,Fe,$,{})}}new ze({target:document.getElementById("app")});
