(this.webpackJsonpwfc=this.webpackJsonpwfc||[]).push([[0],{35:function(e,t,c){},42:function(e,t,c){"use strict";c.r(t),t.default=c.p+"static/media/logo.a3c9486a.png"},51:function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),r=c(11),a=c.n(r),i=(c(35),c(27)),o=c(25),j=c(7),l=c(23),h=c(24),b=c(29),d=c(28),u=c(52),O=c(53),x=c(54),f=c(55),F=c(56),p=c(57),g=c(58),m=c(59),v=c(4),y=function(e){Object(b.a)(c,e);var t=Object(d.a)(c);function c(e){var n;return Object(l.a)(this,c),(n=t.call(this,e)).state={product:[]},n}return Object(h.a)(c,[{key:"componentDidMount",value:function(){this.getProduct()}},{key:"getProduct",value:function(){var e=this;fetch("https://www.weeklyfishclub.com/wp-json/wc/v3/products",{method:"GET",headers:{Authorization:"Basic "+btoa("ck_1c32b3a20592d8658aa6f72350f7843f6e40acce:cs_10dd1b3cf0344130871395eb03936cb5dee5af0c")}}).then((function(e){return e.json()})).then((function(t){e.setState({product:t}),console.log(t)}))}},{key:"render",value:function(){return Object(v.jsx)("div",{style:{marginTop:20},children:Object(v.jsxs)(u.a,{className:"themed-container",fluid:"sm",children:[Object(v.jsx)("h2",{children:"Fishes"}),Object(v.jsx)(O.a,{children:this.state.product.map((function(e){return Object(v.jsx)(x.a,{sm:"3",children:Object(v.jsx)(f.a,{children:Object(v.jsxs)(F.a,{style:{backgroundColor:"#006994"},children:[Object(v.jsx)(p.a,{top:!0,width:"20%",style:{width:200,height:150},src:e.images[0].src,alt:"Fish"}),Object(v.jsxs)(g.a,{tag:"h5",children:[e.slug," "]}),Object(v.jsxs)(g.a,{tag:"h6",color:"blue",children:["Rs. ",e.price]}),Object(v.jsx)(m.a,{})]})})})}))})]})})}}]),c}(s.a.Component);function w(){return Object(v.jsx)("h2",{children:"Abouta"})}var k=c(60),C=c(61),S=c(62),T=c(66),P=c(63),A=c(64),B=c(65);function D(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),s=t[0],r=t[1];return Object(v.jsx)(o.a,{children:Object(v.jsxs)("div",{children:[Object(v.jsxs)(k.a,{style:{backgroundColor:"#006994",color:"#FFFFFF"},light:!0,expand:"md",children:[Object(v.jsxs)(C.a,{style:{color:"#FFFFFF"},href:"/",children:[Object(v.jsx)("img",{src:c(42),style:{width:70,marginTop:-7}}),"Weekly Fish Club"]}),Object(v.jsx)(S.a,{onClick:function(){return r(!s)}}),Object(v.jsx)(T.a,{isOpen:s,navbar:!0,children:Object(v.jsxs)(P.a,{className:"mr-auto",navbar:!0,children:[Object(v.jsx)(A.a,{children:Object(v.jsx)(B.a,{style:{color:"#FFFFFF"},href:"/",children:"Shop"})}),Object(v.jsx)(A.a,{children:Object(v.jsx)(B.a,{style:{color:"#FFFFFF"},href:"/about",children:"About"})})]})})]}),Object(v.jsxs)(j.c,{children:[Object(v.jsx)(j.a,{path:"/about",children:Object(v.jsx)(w,{})}),Object(v.jsx)(j.a,{path:"/",children:Object(v.jsx)(y,{})})]})]})})}var E=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,67)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,r=t.getLCP,a=t.getTTFB;c(e),n(e),s(e),r(e),a(e)}))};c(50);a.a.render(Object(v.jsx)(s.a.StrictMode,{children:Object(v.jsx)(D,{})}),document.getElementById("root")),E()}},[[51,1,2]]]);
//# sourceMappingURL=main.fe267d54.chunk.js.map