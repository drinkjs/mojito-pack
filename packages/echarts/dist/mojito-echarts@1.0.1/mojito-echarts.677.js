"use strict";(self.webpackChunkmojito_echarts=self.webpackChunkmojito_echarts||[]).push([[677],{672:(t,e,n)=>{n.d(e,{Z:()=>a});var s=n(458),o=n(983),r=n(40),i=function(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(s=Object.getOwnPropertySymbols(t);o<s.length;o++)e.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(t,s[o])&&(n[s[o]]=t[s[o]])}return n};function a(t){var{option:e,style:n,className:a,theme:c}=t,u=i(t,["option","style","className","theme"]);const l=(0,o.useRef)(null),p=(0,o.useRef)(null);return(0,o.useEffect)((()=>{l.current&&(p.current=r.init(l.current,c||"dark"),e&&p.current.setOption(e))}),[]),(0,o.useEffect)((()=>{var t;e&&(null===(t=p.current)||void 0===t||t.setOption(e))}),[e]),(0,o.useEffect)((()=>{var t;null===(t=p.current)||void 0===t||t.resize()}),[n,a]),(0,s.jsx)("div",Object.assign({},u,{className:a,style:Object.assign({width:"100%",height:"100%"},n),ref:l}))}},677:(t,e,n)=>{n.r(e),n.d(e,{default:()=>c});var s=n(458),o=n(672),r=n(745),i=n(983),a=n(232);const c=(0,a.P)((function(t){var{data:e=[],radius:n,option:a}=t,c=function(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(s=Object.getOwnPropertySymbols(t);o<s.length;o++)e.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(t,s[o])&&(n[s[o]]=t[s[o]])}return n}(t,["data","radius","option"]);const u=(0,i.useMemo)((()=>{const t={backgroundColor:"transparent",tooltip:{trigger:"item"},series:[{type:"pie",radius:"85%",center:["50%","50%"],selectedMode:"single",data:e,emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};return a?(0,r.Z)(t,a):t}),[e,a]);return(0,s.jsx)(o.Z,Object.assign({},c,{option:u}))}),{name:"基础饼图",props:{data:{name:"数据",description:'图表数据[{name:"类型", value:100}, ...]',type:"array",default:[{value:1048,name:"Search Engine"},{value:735,name:"Direct"},{value:580,name:"Email"},{value:484,name:"Union Ads"},{value:300,name:"Video Ads"}]},options:{name:"配置",type:"object",description:"Echarts配置，具体参考echarts官网"}}})},232:(t,e,n)=>{n.d(e,{P:()=>m});var s=n(458),o=n(983),r=n(520),i=n(471);const a=Symbol(),c=Symbol(),u=Symbol(),l=Symbol(),p=Symbol(),h=Symbol(),f="__MOJITO_UPDATE_PROPS__";function m(t,e){var n,m,b,y,O,g,j;const E=(0,i.x0)();return j=class{constructor(){this[n]=t,this[m]=e,this.framework={name:"react",version:o.version},this[b]=null,this[y]=null,this[O]=void 0,this[g]=E}get component(){return this[p]}get componentInfo(){return this[h]}mount(t,e,n){const o=new EventTarget,i=r.createRoot(t);this[a]=i,this[c]=o,this[u]=Object.assign(Object.assign({},this.getDefaultProps()),e),i.render((0,s.jsx)(v,{component:this.component,props:this[u],evener:this[c],onMount:n}))}unmount(){this[a]&&(this[a].unmount(),this[a]=null,this[c]=null)}setProps(t){if(this[c]){const e=this[u];this[u]=Object.assign(Object.assign({},e),t),this[c].dispatchEvent(new d(f,this[u]))}}setEvent(t,e,n){this.setProps({[t]:e.bind(n)})}getProps(){return this[u]}getDefaultProps(){let t;if(this.componentInfo.props)for(const e in this.componentInfo.props)this.componentInfo.props[e].default&&(t||(t={}),t[e]=this.componentInfo.props[e].default);return t}getComponentId(){return this[l]}},n=p,m=h,b=a,y=c,O=u,g=l,j}class d extends Event{constructor(t,e){super(t),this.data=e}}const v=({component:t,props:e,evener:n,onMount:r})=>{const[i,a]=(0,o.useState)(e);return(0,o.useEffect)((()=>{r&&r(e)}),[]),(0,o.useEffect)((()=>{const t=({data:t})=>{a(t)};return n.addEventListener(f,t),()=>n.removeEventListener(f,t)}),[n]),(0,s.jsx)(t,Object.assign({},i))}}}]);