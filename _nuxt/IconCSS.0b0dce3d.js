import{a as p,ac as m,k as d,j as o,o as x,b as S,h as f}from"./entry.a625f98a.js";import{_ as v}from"./_plugin-vue_export-helper.c27b6911.js";import"https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";const z=p({__name:"IconCSS",props:{name:{type:String,required:!0},size:{type:String,default:""}},setup(u){var c;const n=u;m(t=>({fdac8218:_.value}));const e=d();(c=e==null?void 0:e.nuxtIcon)!=null&&c.aliases;const l=o(()=>{var t;return(((t=e==null?void 0:e.nuxtIcon)==null?void 0:t.aliases)||{})[n.name]||n.name}),_=o(()=>`url('https://api.iconify.design/${l.value.replace(":","/")}.svg')`),a=o(()=>{var s,r,i;if(!n.size&&typeof((s=e.nuxtIcon)==null?void 0:s.size)=="boolean"&&!((r=e.nuxtIcon)!=null&&r.size))return;const t=n.size||((i=e.nuxtIcon)==null?void 0:i.size)||"1em";return String(Number(t))===t?`${t}px`:t});return(t,s)=>(x(),S("span",{style:f({width:a.value,height:a.value})},null,4))}});const h=v(z,[["__scopeId","data-v-abe1e2b4"]]);export{h as default};