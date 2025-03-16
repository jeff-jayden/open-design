import{d as z,p,h as f,a7 as G,c as h,G as R,w as g,k as v,o as i,j as m,a5 as J,ab as T,n as u,a0 as k,e as w,b,H as S,F as W,C as X}from"./framework.DDoBidLl.js";import{f as Y,g as Z}from"./index.DLXOL18D.js";import{_ as ee}from"./index.2sjJOJZB.js";import{R as le}from"./RenderVnode.B5EX5Ezg.js";import{_ as F}from"./index.CKV4KJOu.js";import{i as te,c as N}from"./isFunction.CCVhMlqu.js";const oe={class:u(["selected-item","input-wrapper"])},ne=["readonly","placeholder","disabled"];const ae={class:"suffix"},se={key:0,class:"open-select__nodata"},ie={key:1,class:"open-select__menu"},re=["onClick"],I=z({name:"OpenSelect",__name:"select",props:{name:{},id:{},modelValue:{},disabled:{type:Boolean,default:!1},effect:{},options:{default:()=>[]},clearable:{type:Boolean},filterable:{type:Boolean,default:!1},loading:{type:Boolean},placeholder:{},suffixIcon:{default:Y},remote:{type:Boolean},clearIcon:{default:Z},filterMethod:{},remoteMethod:{},multiple:{type:Boolean},placement:{default:"bottom-start"},trigger:{default:"click"}},emits:["update:modelValue","visible-change","input","change","focus","blur","keydown","clear"],setup(_,{emit:E}){const t=_,V=p(!1),r=E,Q=(e=>t.options.find(a=>a.value===e)||null)(t.modelValue),n=p(t.options),d=f(()=>t.disabled),l=G({inputValue:"",selectedOption:Q,mouseHover:!1,loading:!1,highlightIndex:-1,previousQuery:null,selectedLabel:""}),C=p(null),o=p(!1),y=p(),ue=f(()=>{const e=t.placeholder??"please select";return t.multiple?e:l.selectedLabel});f(()=>te(t.modelValue)?t.modelValue.length===0&&!l.inputValue:t.filterable?!l.inputValue:!0);const B=f(()=>t.clearable&&!d.value&&l.inputValue),c=e=>{e?(console.log(`${o.value}@@`),y.value.show()):(y.value.hide(),console.log(`visible-change${o.value}`),r("visible-change",e)),o.value=e},x=e=>{var s;e.disabled||(l.inputValue=e.label,l.selectedOption=e,r("change",e.value),r("update:modelValue",e.value),console.log("执行了"),c(!1),console.log("执行完了"),(s=C.value)==null||s.focus())},A=e=>{switch(console.log(`KeyboardEvent@@@@@${e.key}`),e.key){case"Enter":o.value?l.highlightIndex>0&&n.value[l.highlightIndex]?x(n.value[l.highlightIndex]):c(!1):c(!0);break;case"Escape":o.value&&c(!1);break;case"ArrowUp":e.preventDefault(),n.value.length>0&&(l.highlightIndex===-1||l.highlightIndex===0?l.highlightIndex=n.value.length-1:l.highlightIndex--);break;case"ArrowDown":e.preventDefault(),n.value.length>0&&(l.highlightIndex===-1||l.highlightIndex===n.value.length-1?l.highlightIndex=0:l.highlightIndex++);break}},D=()=>{d.value||(o.value?(console.log(`isDropdownShow1${o.value}`),c(!1)):(console.log(`isDropdownShow2${o.value}`),c(!0)))},O=f(()=>t.suffixIcon),K=()=>{l.selectedOption=null,l.inputValue="",r("clear"),r("change",""),r("update:modelValue","")},L=e=>{l.previousQuery!==e&&(l.previousQuery=e,t.filterable&&N(t.filterMethod)?n.value=t.filterMethod(e):t.filterable&&t.remote&&N(t.remoteMethod)?t.remoteMethod(e):n.value=t.options.filter(s=>s.label.includes(e)))},H=()=>{l.inputValue.length>0&&!o.value&&(o.value=!0),L(l.inputValue)},P=({target:e})=>(console.log(`select: ${e.value}`),l.inputValue=e.value,H()),U=e=>{V.value=!0,r("focus",e)},j=e=>{console.log("blur triggered"),V.value=!1,r("blur",e)},q={modifiers:[{name:"offset",options:{offset:[0,9]}},{name:"sameWidth",enabled:!0,phase:"main",fn:({state:e,instance:s,options:a,name:$})=>{e.styles.popper.width=`${e.rects.reference.width}px`,console.log(JSON.stringify(e.styles.popper))},requires:["computeStyles"]}]};return(e,s)=>(i(),h("div",{class:"open-select",ref:"selectRef",onClick:D},[R(v(ee),{ref_key:"tooltipRef",ref:y,placement:e.placement,effect:e.effect,trigger:e.trigger,"popper-options":q},{default:g(()=>[m("div",{class:u(["open-select-wrapper",{"is-disabled":e.disabled}])},[m("div",oe,[J(m("input",{readonly:!e.filterable,placeholder:e.placeholder,ref_key:"inputRef",ref:C,"onUpdate:modelValue":s[0]||(s[0]=a=>l.inputValue=a),type:"text",disabled:d.value,class:u(["open-select__input",{disabled:d.value}]),onFocus:U,onBlur:j,onInput:P,onClick:k(D,["stop"]),onKeydown:A},null,42,ne),[[T,l.inputValue]])]),w("",!0),m("div",ae,[O.value&&!B.value?(i(),b(v(F),{key:0,class:u(["caret","icon",{"is-reverse":o.value,disabled:d.value}])},{default:g(()=>[(i(),b(S(O.value)))]),_:1},8,["class"])):w("",!0),B.value&&e.clearIcon?(i(),b(v(F),{key:1,class:u(["caret","icon"]),onClick:k(K,["stop"])},{default:g(()=>[(i(),b(S(e.clearIcon)))]),_:1})):w("",!0)])],2)]),content:g(()=>[n.value.length===0?(i(),h("div",se,"No match data")):(i(),h("ul",ie,[(i(!0),h(W,null,X(n.value,(a,$)=>{var M;return i(),h("li",{key:a.value,class:u(["open-select__menu-item",{"is-disabled":a.disabled,"is-selected":((M=l.selectedOption)==null?void 0:M.value)===a.value,"is-highlighted":l.highlightIndex===$}]),onClick:k(de=>x(a),["stop"])},[R(v(le),{"v-node":a.label},null,8,["v-node"])],10,re)}),128))]))]),_:1},8,["placement","effect","trigger"])],512))}});I.install=_=>{_.component(I.name,I)};export{I as _};
