(()=>{(self.webpackChunkmojito_echarts=self.webpackChunkmojito_echarts||[]).push([[84],{577:(l,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>E});var s=t(166),o=t.n(s),p=t(861),m=t.n(p),a=m()(o());a.push([l.id,`.CoACW9wnen9a3Prux34L{width:100%;height:100%}
`,""]),a.locals={root:"CoACW9wnen9a3Prux34L"};const E=a},620:(l,r,t)=>{"use strict";t.d(r,{Z:()=>E});var s=t(32),o=t(963),p=t(40),m=t(959),a=t.n(m);function E({option:n,style:u,className:i,theme:f,__style:e,..._}){const d=(0,o.useRef)(null),c=(0,o.useRef)(null);return(0,o.useEffect)(()=>{d.current&&(c.current=p.init(d.current,f||"dark"),n&&c.current.setOption(n))},[]),(0,o.useEffect)(()=>{n&&c.current?.setOption(n)},[n]),(0,o.useEffect)(()=>{c.current?.resize()},[u,e?.width,e?.height,i]),(0,s.jsx)("div",{..._,className:`${a().root} ${i}`,style:{...u},ref:d})}},386:(l,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>u});var s=t(32),o=t(620),p=t(294),m=t(963),a=t(229);const E=t.p+"23a4470d2cdcc50a4692.webp";function n({data:i=[],radius:f,option:e={},..._}){const d=(0,m.useMemo)(()=>{const c={backgroundColor:"transparent",tooltip:{trigger:"item"},series:[{type:"pie",radius:f,emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}},data:i}]};return(0,p.Z)(c,e)},[i,e]);return(0,s.jsx)(o.Z,{..._,option:d})}const u=(0,a.P)(n,{name:"\u73AF\u5F62\u56FE",category:"\u997C\u56FE",cover:E,props:{radius:{name:"\u534A\u5F84",default:["50%","80%"],type:"array"},data:{name:"\u6570\u636E",description:'\u56FE\u8868\u6570\u636E[{name:"\u7C7B\u578B", value:100}, ...]',type:"array",default:[{value:1048,name:"Search Engine"},{value:735,name:"Direct"},{value:580,name:"Email"},{value:484,name:"Union Ads"},{value:300,name:"Video Ads"}]},options:{name:"\u914D\u7F6E",type:"object",description:"Echarts\u914D\u7F6E\uFF0C\u5177\u4F53\u53C2\u8003echarts\u5B98\u7F51"}}})},229:(l,r,t)=>{"use strict";t.d(r,{P:()=>E});var s=t(32),o=t(963),p=t(253),m=t(334);const a=({component:n,props:u,appRef:i,onMount:f})=>{const[e,_]=(0,o.useState)(u);return(0,o.useImperativeHandle)(i,()=>({updateProps:d=>{_(d)}}),[e]),(0,o.useLayoutEffect)(()=>{f&&f(u)},[]),(0,s.jsx)(n,Object.assign({},e))};function E(n,u){const i=(0,m.x0)();return class{constructor(){this.__component=n,this.__info=u,this.__root=null,this.__props=void 0,this.__id=i,this.__ref={current:void 0},this.framework={name:"react",version:o.version}}get component(){return this.__component}get componentInfo(){return this.__info}get componentId(){return this.__id}mount(e,_,d){const c=p.createRoot(e);this.__root=c,this.__props=Object.assign(Object.assign({},this.getDefaultProps()),_),c.render((0,s.jsx)(a,{component:this.__component,props:this.__props,onMount:d,appRef:this.__ref}))}unmount(){this.__root&&(this.__root.unmount(),this.__root=null,this.__ref.current=void 0)}setProps(e){this.__ref.current&&(this.__props=Object.assign(Object.assign({},this.__props),e),this.__ref.current.updateProps(this.__props))}getProps(){return this.__props}getDefaultProps(){let e;if(this.componentInfo.props)for(const _ in this.componentInfo.props)this.componentInfo.props[_].default&&(e||(e={}),e[_]=this.componentInfo.props[_].default);return e}}}},959:(l,r,t)=>{var s=t(577);s.__esModule&&(s=s.default),typeof s=="string"&&(s=[[l.id,s,""]]),s.locals&&(l.exports=s.locals);var o=t(548).Z,p=o("64be7c76",s,"__MojitoStyleLoader__","mojito-echarts@1.0.0")}}]);})();