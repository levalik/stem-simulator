import{r as c,j as a}from"./index-BuOCPqCH.js";/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),w=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,t,o)=>o?o.toUpperCase():t.toLowerCase()),i=e=>{const r=w(e);return r.charAt(0).toUpperCase()+r.slice(1)},m=(...e)=>e.filter((r,t,o)=>!!r&&r.trim()!==""&&o.indexOf(r)===t).join(" ").trim(),h=e=>{for(const r in e)if(r.startsWith("aria-")||r==="role"||r==="title")return!0};/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var y={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=c.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:t=2,absoluteStrokeWidth:o,className:l="",children:s,iconNode:p,...n},x)=>c.createElement("svg",{ref:x,...y,width:r,height:r,stroke:e,strokeWidth:o?Number(t)*24/Number(r):t,className:m("lucide",l),...!s&&!h(n)&&{"aria-hidden":"true"},...n},[...p.map(([u,d])=>c.createElement(u,d)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(e,r)=>{const t=c.forwardRef(({className:o,...l},s)=>c.createElement(C,{ref:s,iconNode:r,className:m(`lucide-${f(i(e))}`,`lucide-${e}`,o),...l}));return t.displayName=i(e),t},j=({className:e="w-10 h-10",classNamePath:r="fill-primary-600"})=>a.jsxs("svg",{viewBox:"0 0 100 100",className:e,xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("circle",{cx:"50",cy:"50",r:"45",fill:"none",stroke:"currentColor",strokeWidth:"8",className:"text-primary-500",opacity:"0.2"}),a.jsx("ellipse",{cx:"50",cy:"50",rx:"20",ry:"38",transform:"rotate(45 50 50)",fill:"none",stroke:"currentColor",strokeWidth:"6",className:"text-secondary-500"}),a.jsx("ellipse",{cx:"50",cy:"50",rx:"20",ry:"38",transform:"rotate(-45 50 50)",fill:"none",stroke:"currentColor",strokeWidth:"6",className:"text-primary-600"}),a.jsx("circle",{cx:"50",cy:"50",r:"10",className:"fill-primary-700"})]});export{j as L,k as c};
