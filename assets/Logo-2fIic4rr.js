import{r as l,j as r}from"./index-BbeZAu8d.js";/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),y=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,s,o)=>o?o.toUpperCase():s.toLowerCase()),n=t=>{const e=y(t);return e.charAt(0).toUpperCase()+e.slice(1)},x=(...t)=>t.filter((e,s,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===s).join(" ").trim(),C=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var u={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=l.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:c="",children:a,iconNode:p,...i},m)=>l.createElement("svg",{ref:m,...u,width:e,height:e,stroke:t,strokeWidth:o?Number(s)*24/Number(e):s,className:x("lucide",c),...!a&&!C(i)&&{"aria-hidden":"true"},...i},[...p.map(([d,f])=>l.createElement(d,f)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(t,e)=>{const s=l.forwardRef(({className:o,...c},a)=>l.createElement(w,{ref:a,iconNode:e,className:x(`lucide-${h(n(t))}`,`lucide-${t}`,o),...c}));return s.displayName=n(t),s},g=({className:t="w-10 h-10",classNamePath:e="fill-primary-600",spin:s=!1})=>r.jsxs("svg",{viewBox:"0 0 100 100",className:t,xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"bookGradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:"currentColor",stopOpacity:"1",className:"text-primary-600"}),r.jsx("stop",{offset:"100%",stopColor:"currentColor",stopOpacity:"0.8",className:"text-primary-500"})]})}),r.jsxs("g",{transform:"translate(0, 10)",children:[r.jsx("path",{d:"M15 35 C15 35 30 35 48 45 V85 C30 75 15 75 15 75 V35 Z",fill:"currentColor",className:"text-primary-600"}),r.jsx("path",{d:"M85 35 C85 35 70 35 52 45 V85 C70 75 85 75 85 75 V35 Z",fill:"currentColor",className:"text-primary-500"}),r.jsx("path",{d:"M20 40 C20 40 32 40 45 48",stroke:"white",strokeWidth:"2",strokeOpacity:"0.3",fill:"none"}),r.jsx("path",{d:"M80 40 C80 40 68 40 55 48",stroke:"white",strokeWidth:"2",strokeOpacity:"0.3",fill:"none"})]}),r.jsxs("g",{className:`${s?"animate-spin-slow":""}`,style:{transformOrigin:"50% 55%"},children:[r.jsx("ellipse",{cx:"50",cy:"55",rx:"42",ry:"12",transform:"rotate(45 50 55)",fill:"none",stroke:"currentColor",strokeWidth:"3",className:"text-secondary-400",opacity:"0.8"}),r.jsx("circle",{cx:"20",cy:"25",r:"4",className:"text-secondary-500",fill:"currentColor"}),r.jsx("ellipse",{cx:"50",cy:"55",rx:"42",ry:"12",transform:"rotate(-45 50 55)",fill:"none",stroke:"currentColor",strokeWidth:"3",className:"text-secondary-400",opacity:"0.8"}),r.jsx("circle",{cx:"80",cy:"25",r:"4",className:"text-secondary-500",fill:"currentColor"})]}),r.jsx("circle",{cx:"50",cy:"55",r:"5",className:"text-white",fill:"white"})]});export{g as L,k as c};
