import{r as i,j as e}from"./app-DVAV-TGf.js";import{B as h}from"./button-4R4MV2AX.js";import{c as r}from"./createLucideIcon-CXjRWg5O.js";/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]],m=r("maximize",p);/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]],f=r("minimize",u);function k({roomName:s,user:n}){const t=i.useRef(null),[a,o]=i.useState(!1);return i.useEffect(()=>{if(!t.current||!window.JitsiMeetExternalAPI)return;const c="meet.jit.si",d={roomName:s,parentNode:t.current,userInfo:{displayName:n.name},configOverwrite:{prejoinPageEnabled:!1,disableModeratorIndicator:!0},interfaceConfigOverwrite:{TOOLBAR_BUTTONS:["microphone","camera","desktop","chat","raisehand","hangup"]},width:"100%",height:"120%"},l=new window.JitsiMeetExternalAPI(c,d);return()=>l.dispose()},[s,n]),e.jsxs("div",{className:"relative w-full",children:[e.jsx("div",{ref:t,className:`${a?"fixed inset-0 z-50":"aspect-video w-full"} bg-black`}),e.jsx(h,{size:"sm",variant:"ghost",className:"absolute right-4 top-2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70",onClick:()=>o(!a),children:a?e.jsx(f,{className:"h-4 w-4"}):e.jsx(m,{className:"h-4 w-4"})})]})}export{k as J};
