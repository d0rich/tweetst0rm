import{a,j as o,G as i,H as n,o as c,b as u,I as d,u as m}from"./entry.a625f98a.js";import{_ as f}from"./_plugin-vue_export-helper.c27b6911.js";import"https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";const h=["src","alt","width","height"],p=a({__name:"ProseImg",props:{src:{type:String,default:""},alt:{type:String,default:""},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0}},setup(t){const e=t,s=o(()=>{var r;return(r=e.src)!=null&&r.startsWith("/")&&!e.src.startsWith("//")?i(e.src,n().app.baseURL):e.src});return(r,_)=>(c(),u("img",d(r.$attrs,{src:m(s),alt:t.alt,width:t.width,height:t.height}),null,16,h))}});const v=f(p,[["__scopeId","data-v-2ef15301"]]);export{v as default};