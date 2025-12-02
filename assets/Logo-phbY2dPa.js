import{r as i,j as r}from"./index-Dzpap6ZK.js";/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),C=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,o,s)=>s?s.toUpperCase():o.toLowerCase()),n=t=>{const e=C(t);return e.charAt(0).toUpperCase()+e.slice(1)},x=(...t)=>t.filter((e,o,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===o).join(" ").trim(),u=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var m={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=i.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:o=2,absoluteStrokeWidth:s,className:l="",children:a,iconNode:d,...c},p)=>i.createElement("svg",{ref:p,...m,width:e,height:e,stroke:t,strokeWidth:s?Number(o)*24/Number(e):o,className:x("lucide",l),...!a&&!u(c)&&{"aria-hidden":"true"},...c},[...d.map(([f,h])=>i.createElement(f,h)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=(t,e)=>{const o=i.forwardRef(({className:s,...l},a)=>i.createElement(j,{ref:a,iconNode:e,className:x(`lucide-${w(n(t))}`,`lucide-${t}`,s),...l}));return o.displayName=n(t),o},y=({className:t="w-10 h-10",classNamePath:e="fill-primary-600"})=>r.jsxs("svg",{viewBox:"0 0 100 100",className:t,xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"logoGradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:"#7c3aed"}),r.jsx("stop",{offset:"100%",stopColor:"#4f46e5"})]})}),r.jsx("path",{d:"M50 10 C30 10 15 25 15 45 C15 60 25 75 35 85 L50 95 L65 85 C75 75 85 60 85 45 C85 25 70 10 50 10 Z M50 20 C65 20 75 30 75 45 C75 55 68 65 60 72 L50 80 L40 72 C32 65 25 55 25 45 C25 30 35 20 50 20 Z",fill:"url(#logoGradient)",className:e}),r.jsx("circle",{cx:"50",cy:"35",r:"4",fill:"white"}),r.jsx("circle",{cx:"35",cy:"50",r:"4",fill:"white"}),r.jsx("circle",{cx:"65",cy:"50",r:"4",fill:"white"}),r.jsx("circle",{cx:"50",cy:"65",r:"4",fill:"white"}),r.jsx("path",{d:"M50 35 L35 50 L50 65 L65 50 Z",stroke:"white",strokeWidth:"2",fill:"none"})]});export{y as L,L as c};
