import{_ as u,a as i,b as p}from"./index.DOlBxpG9.js";import{_ as d}from"./index.C5CBsg4Z.js";import{d as g,a7 as r,o as _,b as c,w as n,G as t,k as a}from"./framework.DDoBidLl.js";const V=g({__name:"form",setup(f){const e=r({name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""}),s=[{value:"Option1",label:"Option1",disabled:!0},{value:"Option2",label:"Option2"},{value:"Option3",label:"Option3"},{value:"Option4",label:"Option4"},{value:"Option5",label:"Option5"}],m=r({name:[{required:!0,message:"Please input Activity name",trigger:"blur"},{min:3,max:5,message:"Length should be 3 to 5",trigger:"blur"}],region:[{required:!0,message:"Please input Activity region",trigger:"blur"}]});return(b,o)=>(_(),c(a(p),{model:e,rules:m,style:{width:"600px"}},{default:n(()=>[t(a(i),{label:"Activity name","show-message":"",prop:"name"},{default:n(()=>[t(a(u),{id:"name",modelValue:e.name,"onUpdate:modelValue":o[0]||(o[0]=l=>e.name=l)},null,8,["modelValue"])]),_:1}),t(a(i),{label:"Activity region","show-message":"",prop:"region"},{default:n(()=>[t(a(d),{modelValue:e.region,"onUpdate:modelValue":o[1]||(o[1]=l=>e.region=l),placeholder:"Select",options:s},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]))}});export{V as _};
