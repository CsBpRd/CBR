import{c as T,u as _,j as e,h as j,b as s,k as z,l as G}from"./index-B_e_Vg8A.js";import{r as a}from"./react-vendor-Dge95ISX.js";import{M as O,T as LT,W as WM,L as CRS,u as Z}from"./leaflet-By2H_Fao.js";import{C as H}from"./calendar-B4Gp4vTh.js";import{L as K}from"./layers-B4Nf1Hxv.js";import{C as U}from"./cloud-BDGdgPgk.js";import"./zustand-D6VqJhMD.js";/**
 * @license lucide-react v0.511.0 - ISC
 */const $=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],J=T("chevron-left",$);const Q=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],X=T("chevron-right",Q);
const JMA_TARGET_TIMES_URL="https://www.jma.go.jp/bosai/himawari/data/satimg/targetTimes_fd.json";
const JMA_TILE_BASE="https://www.jma.go.jp/bosai/himawari/data/satimg";
const NASA_WMS_URL="https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi";
const DARK_BASE="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const LIGHT_BASE="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

const JMA_BOUNDS=[[-15,80],[55,180]];
const NASA_BOUNDS=[[-15,70],[55,180]];

const JMA_CHANNELS=[
  {id:"tc",name:"真彩色",band:"SND",product:"ETC",desc:"Himawari-8 真彩色",color:"#3CB371"},
  {id:"vis",name:"可见光",band:"B03",product:"ALBD",desc:"Himawari-8 可见光",color:"#5BC0EB"},
  {id:"ir",name:"红外",band:"B13",product:"TBB",desc:"Himawari-8 红外",color:"#E63946"},
  {id:"wv",name:"水汽",band:"B08",product:"TBB",desc:"Himawari-8 水汽",color:"#9B5DE5"}
];

const NASA_CHANNELS=[
  {id:"vis",name:"可见光",layer:"MODIS_Terra_CorrectedReflectance_TrueColor",desc:"MODIS Terra 真彩色",format:"image/jpeg",color:"#5BC0EB"},
  {id:"aqua",name:"Aqua真彩",layer:"MODIS_Aqua_CorrectedReflectance_TrueColor",desc:"MODIS Aqua 真彩色",format:"image/jpeg",color:"#3CB371"},
  {id:"b721",name:"721假彩",layer:"MODIS_Terra_CorrectedReflectance_Bands721",desc:"7-2-1 波段组合",format:"image/jpeg",color:"#E63946"},
  {id:"wv",name:"水汽",layer:"MODIS_Terra_Water_Vapor",desc:"MODIS 水汽通道",format:"image/png",color:"#9B5DE5"},
  {id:"rain",name:"降水率",layer:"GPM_IMERG_RainRate",desc:"GPM IMERG 降水率",format:"image/png",color:"#06AED5"}
];

function getPastDates(){
  const d=[],r=new Date;
  for(let n=2;n<=8;n++){
    const p=new Date(r);p.setDate(p.getDate()-n);
    d.push(p.toISOString().slice(0,10));
  }
  return d;
}
const DATES=getPastDates();

function formatDateLabel(t){
  const i=new Date(t),E=["日","一","二","三","四","五","六"];
  return i.getMonth()+1+"月"+i.getDate()+"日 周"+E[i.getDay()];
}

function findNearestTime(times,dateStr){
  const target=dateStr.replace(/-/g,"")+"000000";
  let best=null,bestDiff=Infinity;
  for(const it of times){
    const vt=it.validtime||it.basetime;
    const diff=Math.abs(Number(vt)-Number(target));
    if(diff<bestDiff){bestDiff=diff;best=vt;}
  }
  return best||times[times.length-1]?.validtime;
}

function MapFitter({source,resetKey}){
  const map=Z();
  a.useEffect(()=>{
    if(source==="jma"){
      map.setView([20,130],4,{animate:false});
    }else{
      map.fitBounds(NASA_BOUNDS,{padding:[10,10]});
    }
  },[map,source,resetKey]);
  return null;
}

function SatellitePage(){
  const isLight=_(t=>t.theme)==="light";
  const [source,setSource]=a.useState("jma");
  const [channel,setChannel]=a.useState("tc");
  const [dateIdx,setDateIdx]=a.useState(0);
  const [playing,setPlaying]=a.useState(false);
  const [speed,setSpeed]=a.useState(1);
  const [times,setTimes]=a.useState([]);
  const [loading,setLoading]=a.useState(true);
  const raf=a.useRef(null);

  const isJma=source==="jma";
  const CHANNELS=isJma?JMA_CHANNELS:NASA_CHANNELS;
  const BOUNDS=isJma?JMA_BOUNDS:NASA_BOUNDS;

  a.useEffect(()=>{
    setChannel(CHANNELS[0].id);
    setDateIdx(0);
    setPlaying(false);
  },[source,CHANNELS]);

  a.useEffect(()=>{
    if(!isJma){setLoading(false);setTimes([]);return;}
    let active=true;
    setLoading(true);
    fetch(JMA_TARGET_TIMES_URL)
      .then(r=>r.json())
      .then(data=>{if(active)setTimes(data);})
      .catch(()=>{if(active)setTimes([]);})
      .finally(()=>{if(active)setLoading(false);});
    return()=>{active=false;};
  },[isJma]);

  const currentChannel=a.useMemo(()=>CHANNELS.find(t=>t.id===channel)||CHANNELS[0],[channel,CHANNELS]);
  const currentDate=DATES[dateIdx];
  const currentTime=a.useMemo(()=>{
    if(!isJma||!times.length)return null;
    return findNearestTime(times,currentDate);
  },[isJma,times,currentDate]);

  const cloudUrl=a.useMemo(()=>{
    if(!isJma||!currentTime)return"";
    return `${JMA_TILE_BASE}/${currentTime}/fd/${currentTime}/${currentChannel.band}/${currentChannel.product}/{z}/{x}/{y}.jpg`;
  },[isJma,currentTime,currentChannel]);

  const wmsParams=a.useMemo(()=>{
    if(isJma)return null;
    return {layers:currentChannel.layer,format:currentChannel.format,transparent:currentChannel.format==="image/png",version:"1.3.0",TIME:currentDate};
  },[isJma,currentChannel,currentDate]);

  const resetKey=source+"-"+channel+"-"+currentDate;

  a.useEffect(()=>{
    if(!playing)return;
    const step=2500/speed;
    let last=performance.now(),acc=0;
    const loop=now=>{
      const dt=now-last;last=now;acc+=dt;
      if(acc>=step){
        acc=0;
        setDateIdx(w=>w>=DATES.length-1?(setPlaying(false),DATES.length-1):w+1);
      }
      raf.current=requestAnimationFrame(loop);
    };
    raf.current=requestAnimationFrame(loop);
    return()=>{raf.current&&cancelAnimationFrame(raf.current);};
  },[playing,speed]);

  const togglePlay=a.useCallback(()=>{
    setPlaying(t=>{if(!t&&dateIdx>=DATES.length-1)setDateIdx(0);return!t;});
  },[dateIdx]);
  const prev=a.useCallback(()=>{setPlaying(false);setDateIdx(t=>Math.max(0,t-1));},[]);
  const next=a.useCallback(()=>{setPlaying(false);setDateIdx(t=>Math.min(DATES.length-1,t+1));},[]);

  const B=isLight?"text-slate-800":"text-slate-200";
  const D=isLight?"text-slate-500":"text-slate-400";
  const h=isLight?"text-slate-400":"text-slate-500";
  const g=isLight?"border-slate-300 text-slate-600 hover:bg-slate-100":"border-ice/20 text-slate-400 hover:bg-ice/10 hover:text-ice";
  const b=isLight?"bg-blue-600 text-white border-blue-600":"bg-ice text-abyss-900 border-ice";

  return e.jsxs("div",{className:"animate-fade-in space-y-4",children:[
    e.jsx("div",{className:s("flex items-end justify-between flex-wrap gap-4 pb-4 border-b border-ice/10"),children:e.jsxs("div",{className:"flex items-center gap-3",children:[
      e.jsx("div",{className:s("p-2.5 border",isLight?"bg-blue-50 border-blue-300":"bg-ice/15 border-ice/40"),children:e.jsx(j,{size:24,className:isLight?"text-blue-600":"text-ice"})}),
      e.jsxs("div",{className:"flex flex-col gap-1",children:[
        e.jsxs("div",{className:"flex items-center gap-3",children:[
          e.jsx("span",{className:s("font-mono text-xs px-2 py-0.5 border",isLight?"bg-amber-50 text-amber-700 border-amber-300":"text-storm bg-storm/10 border-storm/30"),children:"SAT.02"}),
          e.jsx("h2",{className:s("font-mono text-2xl font-bold tracking-tight",isLight?"text-slate-900":"text-slate-100"),children:"卫星云图"})
        ]}),
        e.jsx("p",{className:s("text-sm max-w-2xl",D),children:isJma?"JMA Himawari-8 · 4 通道 · 近 7 天回溯":"NASA GIBS · 5 通道 · 近 7 天回溯"})
      ]})
    ]})}),
    e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4",children:[
      e.jsxs("div",{className:"space-y-3",children:[
        e.jsx("div",{className:s("relative w-full overflow-hidden border",isLight?"border-slate-300":"border-ice/15"),style:{height:"520px",backgroundColor:isLight?"#dbeafe":"#0a1628"},children:
          e.jsxs(O,Object.assign({key:source,center:[20,125],zoom:3,minZoom:2,maxZoom:isJma?8:5,maxBounds:BOUNDS,maxBoundsViscosity:1,className:"w-full h-full",scrollWheelZoom:true,zoomControl:true,preferCanvas:true,attributionControl:false},isJma?{}:{crs:CRS.CRS.EPSG4326},{children:[
            e.jsx(MapFitter,{source,resetKey}),
            isJma?e.jsx(LT,{url:isLight?LIGHT_BASE:DARK_BASE,subdomains:"abcd",attribution:"",opacity:1}):null,
            isJma
              ?(loading||!cloudUrl?null:e.jsx(LT,{key:resetKey,url:cloudUrl,attribution:"",opacity:1,maxNativeZoom:6}))
              :e.jsx(WM,{key:resetKey,url:NASA_WMS_URL,crs:CRS.CRS.EPSG4326,params:wmsParams,opacity:1})
          ]}))
        }),
        e.jsx("div",{className:s("flex flex-wrap gap-1.5 p-2 border",isLight?"bg-white/70 border-slate-300":"terminal-card"),children:[
          e.jsxs("button",{onClick:()=>setSource("jma"),className:s("px-3 py-1.5 font-mono text-xs border transition-all",isJma?b:g),children:"JMA"}),
          e.jsxs("button",{onClick:()=>setSource("nasa"),className:s("px-3 py-1.5 font-mono text-xs border transition-all",!isJma?b:g),children:"NASA"})
        ]}),
        e.jsx("div",{className:s("flex flex-wrap gap-1.5 p-2 border",isLight?"bg-white/70 border-slate-300":"terminal-card"),children:CHANNELS.map(t=>e.jsxs("button",{onClick:()=>setChannel(t.id),className:s("flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs border transition-all",t.id===channel?b:g),children:[
          e.jsx("span",{className:"w-2 h-2 rounded-full",style:{backgroundColor:t.color}}),t.name
        ]},t.id))}),
        e.jsxs("div",{className:s("p-3 border space-y-3",isLight?"bg-white/70 border-slate-300":"terminal-card"),children:[
          e.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-2",children:[
            e.jsxs("div",{className:"flex items-center gap-2",children:[
              e.jsx(H,{size:14,className:isLight?"text-blue-500":"text-ice"}),
              e.jsx("span",{className:s("font-mono text-sm font-bold",B),children:formatDateLabel(currentDate)}),
              e.jsxs("span",{className:s("font-mono text-[10px]",h),children:["(",dateIdx+1,"/",DATES.length,")"]})
            ]}),
            e.jsxs("div",{className:"flex items-center gap-1.5",children:[
              e.jsx("button",{onClick:prev,disabled:dateIdx===0,className:s("p-1.5 border",g,dateIdx===0&&"opacity-30 cursor-not-allowed"),children:e.jsx(J,{size:14})}),
              e.jsxs("button",{onClick:togglePlay,className:s("flex items-center gap-1.5 px-3 py-1.5 border font-mono text-xs",playing?b:g),children:[playing?e.jsx(z,{size:12}):e.jsx(G,{size:12}),playing?"暂停":"播放"]}),
              e.jsx("button",{onClick:next,disabled:dateIdx===DATES.length-1,className:s("p-1.5 border",g,dateIdx===DATES.length-1&&"opacity-30 cursor-not-allowed"),children:e.jsx(X,{size:14})}),
              e.jsxs("select",{value:speed,onChange:t=>setSpeed(Number(t.target.value)),className:s("border px-2 py-1 text-xs font-mono focus:outline-none",isLight?"bg-white border-slate-300 text-slate-700":"bg-abyss-200 border-ice/15 text-ice"),children:[
                e.jsx("option",{value:.5,children:"0.5x"}),
                e.jsx("option",{value:1,children:"1x"}),
                e.jsx("option",{value:2,children:"2x"})
              ]})
            ]})
          ]}),
          e.jsx("div",{className:"flex items-center gap-1",children:DATES.map((t,i)=>e.jsx("button",{onClick:()=>{setPlaying(false);setDateIdx(i);},className:s("flex-1 h-8 border-t-2 transition-all group relative",i===dateIdx?isLight?"border-blue-600":"border-ice":isLight?"border-slate-200 hover:border-blue-300":"border-ice/10 hover:border-ice/30"),children:e.jsx("span",{className:s("absolute -bottom-0.5 left-0 right-0 text-center font-mono text-[8px] hidden group-hover:block",h),children:t.slice(5).replace("-","/")})},t))})
        ]})
      ]}),
      e.jsxs("div",{className:"space-y-3",children:[
        e.jsxs("div",{className:s("p-3 border space-y-2",isLight?"bg-white/70 border-slate-300":"terminal-card"),children:[
          e.jsxs("div",{className:"flex items-center gap-2",children:[
            e.jsx(K,{size:14,className:isLight?"text-blue-500":"text-ice"}),
            e.jsx("h3",{className:s("font-mono text-xs font-bold tracking-widest",B),children:"当前通道"})
          ]}),
          e.jsxs("div",{className:"space-y-1.5",children:[
            e.jsxs("div",{className:"flex items-center gap-2",children:[
              e.jsx("span",{className:"w-3 h-3 rounded-full",style:{backgroundColor:currentChannel.color}}),
              e.jsx("span",{className:s("font-bold text-sm",B),children:currentChannel.name})
            ]}),
            e.jsx("p",{className:s("font-mono text-[10px] leading-relaxed",D),children:currentChannel.desc}),
            e.jsxs("div",{className:s("pt-2 border-t font-mono text-[10px] space-y-0.5",isLight?"border-slate-200 text-slate-500":"border-ice/10 text-slate-500"),children:[
              e.jsx("div",{children:isJma?"区域: 15S-55N, 80-180E":"区域: 15S-55N, 70-180E"}),
              e.jsx("div",{children:isJma?"数据源: JMA Himawari-8":"数据源: NASA GIBS WMS"}),
              e.jsxs("div",{children:["日期: ",currentDate]}),
              e.jsxs("div",{className:"flex items-center gap-1 mt-1",children:[
                e.jsx(U,{size:10}),
                e.jsx("span",{children:"滚轮缩放 · 拖拽平移"})
              ]})
            ]})
          ]})
        ]}),
        e.jsxs("div",{className:s("p-3 border",isLight?"bg-white/70 border-slate-300":"terminal-card"),children:[
          e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[
            e.jsx(j,{size:14,className:isLight?"text-blue-500":"text-ice"}),
            e.jsx("h3",{className:s("font-mono text-xs font-bold tracking-widest",B),children:"全部通道"})
          ]}),
          e.jsx("div",{className:"flex flex-col gap-1.5",children:CHANNELS.map(t=>e.jsxs("button",{onClick:()=>setChannel(t.id),className:s("flex items-center gap-2 p-2 border text-left transition-all",t.id===channel?isLight?"bg-blue-50 border-blue-400":"bg-ice/10 border-ice/40":isLight?"bg-white/40 border-slate-200 hover:border-blue-300":"bg-abyss-200/50 border-ice/10 hover:border-ice/25"),children:[
            e.jsx("span",{className:"w-2.5 h-2.5 rounded-full flex-shrink-0",style:{backgroundColor:t.color}}),
            e.jsxs("div",{className:"flex-1 min-w-0",children:[
              e.jsx("div",{className:s("font-bold text-xs",B),children:t.name}),
              e.jsx("div",{className:s("font-mono text-[9px] truncate",h),children:t.desc})
            ]})
          ]},t.id))})
        ]})
      ]})
    ]})
  ]});
}
export{SatellitePage};
