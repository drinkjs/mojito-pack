(()=>{(self.webpackChunkmojito_echarts=self.webpackChunkmojito_echarts||[]).push([[309],{400:(d,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>p});var _=t(166),s=t.n(_),i=t(861),E=t.n(i),a=E()(s());a.push([d.id,`.CoACW9wnen9a3Prux34L {
  width: 100%;
  height: 100%;
}
`,""]),a.locals={root:"CoACW9wnen9a3Prux34L"};const p=a},620:(d,r,t)=>{"use strict";t.d(r,{Z:()=>p});var _=t(32),s=t(963),i=t(40),E=t(474),a=t.n(E);function p({option:e,style:c,className:u,theme:l,__style:o,...n}){const f=(0,s.useRef)(null),P=(0,s.useRef)(null);return(0,s.useEffect)(()=>{f.current&&(P.current=i.init(f.current,l||"dark"),e&&P.current.setOption(e))},[]),(0,s.useEffect)(()=>{e&&P.current?.setOption(e)},[e]),(0,s.useEffect)(()=>{P.current?.resize()},[c,o?.width,o?.height,u]),(0,_.jsx)("div",{...n,className:`${a().root} ${u}`,style:{...c},ref:f})}},309:(d,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>e});var _=t(32),s=t(620),i=t(294),E=t(963),a=t(229);function p({data:c=[],option:u,...l}){const o=(0,E.useMemo)(()=>{const n={backgroundColor:"transparent",xAxis:{},yAxis:{},series:[{symbolSize:20,data:[[10,8.04],[8.07,6.95],[13,7.58],[9.05,8.81],[11,8.33],[14,7.66],[13.4,6.81],[10,6.33],[14,8.96],[12.5,6.82],[9.15,7.2],[11.5,7.2],[3.03,4.23],[12.2,7.83],[2.02,4.47],[1.05,3.33],[4.05,4.96],[6.03,7.24],[12,6.26],[12,8.84],[7.08,5.82],[5.02,5.68]],type:"scatter"}]};return u?(0,i.Z)(n,u):n},[c,u]);return(0,_.jsx)(s.Z,{...l,option:o})}const e=(0,a.P)(p,{name:"\u57FA\u7840\u6563\u70B9\u56FE",props:{data:{name:"\u6570\u636E",description:'\u56FE\u8868\u6570\u636E[{name:"\u7C7B\u578B", value:100}, ...]',type:"array",default:[[10,8.04],[8.07,6.95],[13,7.58],[9.05,8.81],[11,8.33],[14,7.66],[13.4,6.81],[10,6.33],[14,8.96],[12.5,6.82],[9.15,7.2],[11.5,7.2],[3.03,4.23],[12.2,7.83],[2.02,4.47],[1.05,3.33],[4.05,4.96],[6.03,7.24],[12,6.26],[12,8.84],[7.08,5.82],[5.02,5.68]]},options:{name:"\u914D\u7F6E",type:"object",description:"Echarts\u914D\u7F6E\uFF0C\u5177\u4F53\u53C2\u8003echarts\u5B98\u7F51"}}})},229:(d,r,t)=>{"use strict";t.d(r,{P:()=>p});var _=t(32),s=t(963),i=t(253),E=t(334);const a=({component:e,props:c,appRef:u,onMount:l})=>{const[o,n]=(0,s.useState)(c);return(0,s.useImperativeHandle)(u,()=>({updateProps:f=>{n(f)}}),[o]),(0,s.useLayoutEffect)(()=>{l&&l(c)},[]),(0,_.jsx)(e,Object.assign({},o))};function p(e,c){const u=(0,E.x0)();return class{constructor(){this.__component=e,this.__info=c,this.__root=null,this.__props=void 0,this.__id=u,this.__ref={current:void 0},this.framework={name:"react",version:s.version}}get component(){return this.__component}get componentInfo(){return this.__info}get componentId(){return this.__id}mount(o,n,f){const P=i.createRoot(o);this.__root=P,this.__props=Object.assign(Object.assign({},this.getDefaultProps()),n),P.render((0,_.jsx)(a,{component:this.__component,props:this.__props,onMount:f,appRef:this.__ref}))}unmount(){this.__root&&(this.__root.unmount(),this.__root=null,this.__ref.current=void 0)}setProps(o){this.__ref.current&&(this.__props=Object.assign(Object.assign({},this.__props),o),this.__ref.current.updateProps(this.__props))}getProps(){return this.__props}getDefaultProps(){let o;if(this.componentInfo.props)for(const n in this.componentInfo.props)this.componentInfo.props[n].default&&(o||(o={}),o[n]=this.componentInfo.props[n].default);return o}}}},474:(d,r,t)=>{var _=t(400);_.__esModule&&(_=_.default),typeof _=="string"&&(_=[[d.id,_,""]]),_.locals&&(d.exports=_.locals);var s=t(396).Z,i=s("14cfd65c",_,"mojito-echarts","1.0.1")}}]);})();
