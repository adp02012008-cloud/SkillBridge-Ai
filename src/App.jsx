import { useState, useEffect, useRef } from "react";

const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Bebas+Neue&family=JetBrains+Mono:wght@400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --black:#04060d;--dark:#080c18;--dark2:#0c1120;--dark3:#111827;
      --card:#0f1623;--card2:#141d2e;--border:rgba(255,255,255,0.06);
      --border2:rgba(255,255,255,0.11);
      --neon:#00ffe0;--neon2:#00c8b0;--neon3:rgba(0,255,224,0.12);
      --blue:#4d9fff;--blue2:#1a6fff;--violet:#8b5cf6;--violet2:#a78bfa;
      --pink:#f472b6;--amber:#f59e0b;--green:#10b981;--red:#ef4444;--orange:#f97316;
      --text:#e8edf7;--text2:#8b95b0;--text3:#4a5568;--text4:#2d3748;
      --fh:'Plus Jakarta Sans',sans-serif;--fd:'Bebas Neue',sans-serif;--fm:'JetBrains Mono',monospace;
      --r:16px;--rs:8px;--sw:230px;
    }
    html,body,#root{height:100%;width:100%}
    html{scroll-behavior:smooth}
    body{background:var(--black);color:var(--text);font-family:var(--fh);min-height:100vh;width:100%;overflow-x:hidden}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--dark)}::-webkit-scrollbar-thumb{background:var(--neon2);border-radius:3px}
    .app-shell{display:flex;min-height:100vh;width:100%;position:relative;z-index:1}
    .main-content{flex:1;min-width:0;overflow-y:auto;overflow-x:hidden}
    .page-wrap{width:100%;max-width:1200px;margin:0 auto;padding:32px 28px}
    .sidebar{width:var(--sw);min-height:100vh;background:linear-gradient(180deg,var(--dark),var(--dark2));border-right:1px solid var(--border);padding:0 10px 24px;flex-shrink:0;position:sticky;top:0;height:100vh;display:flex;flex-direction:column;z-index:100;overflow-y:auto;transition:transform .3s}
    .mobile-topbar{display:none;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--dark);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:200;width:100%}
    .hamburger{background:none;border:1px solid var(--border2);color:var(--text2);padding:7px 11px;border-radius:8px;cursor:pointer;font-size:18px;line-height:1}
    .sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99;backdrop-filter:blur(4px)}
    .orb{position:fixed;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:0}
    .orb1{width:500px;height:500px;background:radial-gradient(circle,rgba(0,255,224,0.06),transparent 70%);top:-150px;right:-80px}
    .orb2{width:400px;height:400px;background:radial-gradient(circle,rgba(139,92,246,0.07),transparent 70%);bottom:-80px;left:-100px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:var(--r);position:relative;overflow:hidden}
    .card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.03),transparent 60%);pointer-events:none;border-radius:var(--r)}
    .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:var(--fh);font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;border:none;outline:none;white-space:nowrap}
    .btn-neon{background:linear-gradient(135deg,var(--neon2),#00a8f0);color:#000;padding:11px 22px;border-radius:50px}
    .btn-neon:hover{transform:translateY(-2px);box-shadow:0 8px 30px -5px rgba(0,255,224,0.4)}
    .btn-neon:disabled{opacity:0.4;cursor:not-allowed;transform:none;box-shadow:none}
    .btn-outline{background:transparent;border:1px solid var(--border2);color:var(--text2);padding:10px 20px;border-radius:50px}
    .btn-outline:hover{border-color:var(--neon);color:var(--neon);background:var(--neon3)}
    .btn-ghost{background:transparent;border:1px solid var(--border);color:var(--text3);padding:7px 14px;border-radius:var(--rs);font-size:13px}
    .btn-ghost:hover{border-color:var(--border2);color:var(--text2)}
    .btn-danger{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:var(--red);padding:9px 18px;border-radius:50px}
    .inp{background:var(--dark3);border:1px solid var(--border2);color:var(--text);font-family:var(--fh);font-size:14px;border-radius:var(--rs);padding:11px 14px;width:100%;outline:none;transition:border-color .2s,box-shadow .2s}
    .inp:focus{border-color:var(--neon);box-shadow:0 0 0 3px rgba(0,255,224,0.08)}
    .inp::placeholder{color:var(--text4)}
    textarea.inp{resize:vertical;min-height:80px}
    select.inp option{background:var(--dark3);color:var(--text)}
    label{font-size:12.5px;color:var(--text2);margin-bottom:5px;display:block;font-weight:500;letter-spacing:.02em}
    .badge{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:50px;font-size:12px;font-weight:600}
    .b-neon{background:rgba(0,255,224,0.1);color:var(--neon);border:1px solid rgba(0,255,224,0.2)}
    .b-blue{background:rgba(77,159,255,0.1);color:var(--blue);border:1px solid rgba(77,159,255,0.2)}
    .b-violet{background:rgba(139,92,246,0.12);color:var(--violet2);border:1px solid rgba(139,92,246,0.25)}
    .b-green{background:rgba(16,185,129,0.1);color:var(--green);border:1px solid rgba(16,185,129,0.2)}
    .b-amber{background:rgba(245,158,11,0.1);color:var(--amber);border:1px solid rgba(245,158,11,0.2)}
    .b-red{background:rgba(239,68,68,0.1);color:var(--red);border:1px solid rgba(239,68,68,0.2)}
    .b-pink{background:rgba(244,114,182,0.1);color:var(--pink);border:1px solid rgba(244,114,182,0.2)}
    .nav-link{display:flex;align-items:center;gap:10px;padding:9px 13px;border-radius:10px;cursor:pointer;transition:all .2s;font-size:13px;color:var(--text3);border:1px solid transparent;user-select:none;position:relative}
    .nav-link:hover{color:var(--text2);background:rgba(255,255,255,0.03)}
    .nav-link.active{color:var(--neon);background:rgba(0,255,224,0.07);border-color:rgba(0,255,224,0.12)}
    .nav-link.active::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:60%;background:var(--neon);border-radius:0 3px 3px 0}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
    @keyframes popIn{0%{transform:scale(0.5);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
    @keyframes confettiFall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    .fade-up{animation:fadeUp .4s ease both}
    .pop-in{animation:popIn .4s cubic-bezier(.4,0,.2,1) both}
    .skel{background:linear-gradient(90deg,var(--dark3) 25%,var(--card2) 50%,var(--dark3) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:var(--rs)}
    .ring-track{fill:none;stroke:rgba(255,255,255,0.05)}
    .ring-fill{fill:none;stroke-linecap:round;transition:stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)}
    .bubble-ai{background:var(--card2);border:1px solid var(--border);border-radius:4px 18px 18px 18px;padding:12px 16px;font-size:14px;line-height:1.75;max-width:85%;color:var(--text);white-space:pre-wrap;word-break:break-word}
    .bubble-user{background:linear-gradient(135deg,rgba(0,200,176,0.15),rgba(77,159,255,0.12));border:1px solid rgba(0,255,224,0.15);border-radius:18px 4px 18px 18px;padding:12px 16px;font-size:14px;line-height:1.75;max-width:85%;margin-left:auto;color:var(--text);word-break:break-word}
    .chat-scroll{overflow-y:auto;scroll-behavior:smooth}
    .chat-scroll::-webkit-scrollbar{width:2px}
    .upload-zone{border:2px dashed var(--border2);border-radius:var(--r);padding:32px 20px;text-align:center;cursor:pointer;transition:all .25s}
    .upload-zone:hover,.upload-zone.drag-over{border-color:var(--neon);background:var(--neon3)}
    .spider-label{font-size:10px;fill:var(--text2);font-family:'Plus Jakarta Sans',sans-serif}
    .xp-bar{height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden}
    .xp-fill{height:100%;background:linear-gradient(90deg,var(--neon2),var(--blue));border-radius:4px;transition:width 1.2s cubic-bezier(.4,0,.2,1)}
    .badge-card{display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 10px;border-radius:14px;border:1px solid var(--border);background:var(--card);transition:all .2s}
    .badge-card.earned{border-color:rgba(0,255,224,0.25);background:rgba(0,255,224,0.04)}
    .badge-card.locked{opacity:0.4;filter:grayscale(1)}
    .streak-day{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700}
    .streak-day.done{background:linear-gradient(135deg,var(--neon2),var(--blue2));color:#000}
    .streak-day.today{background:rgba(0,255,224,0.15);border:2px solid var(--neon);color:var(--neon)}
    .streak-day.miss{background:var(--dark3);color:var(--text4)}
    .toast{position:fixed;top:16px;right:16px;z-index:9999;padding:12px 18px;border-radius:14px;background:var(--card2);border:1px solid var(--neon);color:var(--text);font-size:13px;display:flex;align-items:center;gap:10px;box-shadow:0 8px 30px rgba(0,255,224,0.15);animation:fadeUp .3s ease;max-width:calc(100vw - 32px)}
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px}
    .modal{background:var(--dark2);border:1px solid var(--border2);border-radius:20px;padding:28px;width:100%;max-width:460px;max-height:90vh;overflow-y:auto}
    .confetti-piece{position:fixed;width:8px;height:8px;border-radius:2px;pointer-events:none;z-index:9998;animation:confettiFall 2.5s ease forwards}
    .lb-row{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;border:1px solid var(--border);background:var(--card);margin-bottom:8px;transition:all .2s}
    .lb-row:hover{border-color:var(--border2)}
    .lb-row.me{border-color:rgba(0,255,224,0.3);background:rgba(0,255,224,0.05)}
    /* ── Responsive grid helpers ── */
    .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
    .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
    .g2{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
    .g-badges{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
    /* ── Tablet ── */
    @media(max-width:1024px){
      .g4{grid-template-columns:repeat(2,1fr)}
      .g3{grid-template-columns:repeat(2,1fr)}
      .g-badges{grid-template-columns:repeat(3,1fr)}
    }
    /* ── Mobile ── */
    @media(max-width:768px){
      :root{--sw:260px}
      .sidebar{position:fixed;top:0;left:0;height:100vh;transform:translateX(-100%);z-index:150}
      .sidebar.open{transform:translateX(0)}
      .sidebar-overlay.open{display:block}
      .mobile-topbar{display:flex}
      .page-wrap{padding:20px 14px}
      .g4{grid-template-columns:repeat(2,1fr);gap:10px}
      .g3{grid-template-columns:1fr;gap:10px}
      .g2{grid-template-columns:1fr;gap:10px}
      .g-badges{grid-template-columns:repeat(2,1fr)}
      .hero-title{font-size:36px !important}
      .btn{font-size:13px}
      .btn-neon,.btn-outline{padding:9px 16px}
    }
    @media(max-width:480px){
      .g4{grid-template-columns:1fr 1fr}
      .page-wrap{padding:14px 10px}
      .hero-title{font-size:28px !important}
      .g-badges{grid-template-columns:1fr 1fr}
    }
  `}</style>
);

async function callClaude(messages, system = "", imageData = null) {
  let msgs = messages;
  if (imageData) {
    const last = msgs[msgs.length - 1];
    if (last.role === "user") {
      const parts = [];
      if (imageData.type === "image") parts.push({ type: "image", source: { type: "base64", media_type: imageData.mediaType, data: imageData.data } });
      else if (imageData.type === "document") parts.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: imageData.data } });
      parts.push({ type: "text", text: last.content });
      msgs = [...msgs.slice(0, -1), { role: "user", content: parts }];
    }
  }
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, system, messages: msgs }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content.map(b => b.text || "").join("");
}

function cleanJSON(raw) {
  return raw.replace(/```json[\s\S]*?```|```[\s\S]*?```/g, m => m.replace(/```json|```/g, "")).replace(/```/g, "").trim();
}

const BADGES = [
  { id: "first_analysis", icon: "🎯", name: "First Strike", desc: "Complete your first skill analysis", xp: 50, color: "var(--neon)" },
  { id: "roadmap_gen", icon: "🗺️", name: "Pathfinder", desc: "Generate your first career roadmap", xp: 75, color: "var(--blue)" },
  { id: "resume_done", icon: "📄", name: "Resume Pro", desc: "Analyze your resume with AI", xp: 60, color: "var(--violet2)" },
  { id: "interview_done", icon: "🎙️", name: "Mic Drop", desc: "Complete a full mock interview", xp: 100, color: "var(--amber)" },
  { id: "chat_mentor", icon: "💬", name: "Mentor's Fav", desc: "Send 10 messages to AI Mentor", xp: 80, color: "var(--pink)" },
  { id: "score_90", icon: "🏆", name: "Top Scorer", desc: "Get 9+ avg score in interview", xp: 150, color: "var(--amber)" },
  { id: "streak_7", icon: "🔥", name: "Week Warrior", desc: "7-day login streak", xp: 200, color: "var(--orange)" },
  { id: "salary_check", icon: "💰", name: "Money Mind", desc: "Use the Salary Predictor", xp: 40, color: "var(--green)" },
  { id: "trend_check", icon: "📈", name: "Market Hawk", desc: "Check market trends 3 times", xp: 60, color: "var(--blue)" },
  { id: "all_features", icon: "⭐", name: "SkillBridge Pro", desc: "Use all 7 main features", xp: 300, color: "var(--neon)" },
];

const LEVELS = [
  { level: 1, name: "Rookie", min: 0, max: 200 },
  { level: 2, name: "Explorer", min: 200, max: 500 },
  { level: 3, name: "Achiever", min: 500, max: 900 },
  { level: 4, name: "Expert", min: 900, max: 1400 },
  { level: 5, name: "Master", min: 1400, max: 2000 },
  { level: 6, name: "Legend", min: 2000, max: 9999 },
];

function getLevel(xp) {
  return LEVELS.find(l => xp >= l.min && xp < l.max) || LEVELS[LEVELS.length - 1];
}

function saveUser(u) { localStorage.setItem(`sb_${u.email}`, JSON.stringify(u)); }

function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, []);
  return <div className="toast">{msg}</div>;
}

function Confetti() {
  const pieces = Array.from({ length: 28 }, (_, i) => ({
    id: i, x: Math.random() * 100,
    color: ["var(--neon)", "var(--blue)", "var(--violet2)", "var(--amber)", "var(--pink)"][i % 5],
    delay: Math.random() * 1, size: 6 + Math.random() * 8,
  }));
  return <>{pieces.map(p => <div key={p.id} className="confetti-piece" style={{ left: `${p.x}vw`, background: p.color, width: p.size, height: p.size, animationDelay: `${p.delay}s` }} />)}</>;
}

const Spinner = ({ size = 18 }) => <div style={{ width: size, height: size, border: "2px solid rgba(0,255,224,0.2)", borderTopColor: "var(--neon)", borderRadius: "50%", animation: "spin .65s linear infinite", flexShrink: 0 }} />;

function DonutRing({ pct, size = 140, stroke = 10, color = "var(--neon)", label, animate = true }) {
  const r = (size - stroke) / 2, circ = 2 * Math.PI * r;
  const [curr, setCurr] = useState(0);
  useEffect(() => { if (animate) { const t = setTimeout(() => setCurr(pct), 100); return () => clearTimeout(t); } else setCurr(pct); }, [pct]);
  const offset = circ - (curr / 100) * circ;
  const grade = pct >= 80 ? "var(--green)" : pct >= 60 ? "var(--neon)" : pct >= 40 ? "var(--amber)" : "var(--red)";
  const c = color === "auto" ? grade : color;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} className="ring-track" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} className="ring-fill" strokeWidth={stroke} stroke={c} strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <span style={{ fontFamily: "var(--fd)", fontSize: size * 0.22, color: c, lineHeight: 1 }}>{curr}</span>
        <span style={{ fontSize: 10, color: "var(--text3)", marginTop: 2 }}>{label}</span>
      </div>
    </div>
  );
}

function Bar({ label, value, max = 100, color = "var(--neon)", showVal = true, height = 6 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW((value / max) * 100), 150); return () => clearTimeout(t); }, [value]);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 13, color: "var(--text2)", fontWeight: 500 }}>{label}</span>
        {showVal && <span style={{ fontSize: 12, color, fontFamily: "var(--fm)" }}>{value}%</span>}
      </div>
      <div style={{ height, background: "rgba(255,255,255,0.05)", borderRadius: height/2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: `linear-gradient(90deg,${color},${color}aa)`, borderRadius: height/2, transition: "width 1s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

function RadarChart({ data, size = 240 }) {
  const cx = size/2, cy = size/2, r = size*0.38, n = data.length;
  const pts = (vals, sc=1) => vals.map((v,i) => { const a=(i/n)*2*Math.PI-Math.PI/2,d=(v/100)*r*sc; return [cx+d*Math.cos(a),cy+d*Math.sin(a)]; });
  const [anim, setAnim] = useState(data.map(()=>0));
  useEffect(()=>{ const t=setTimeout(()=>setAnim(data.map(d=>d.value)),200); return()=>clearTimeout(t); },[]);
  const fp=pts(anim), poly=fp.map(p=>p.join(",")).join(" ");
  const lp=pts(data.map(()=>100),1.24);
  return (
    <svg width={size} height={size} style={{overflow:"visible"}}>
      {[.25,.5,.75,1].map(sc=>{ const rp=pts(data.map(()=>100),sc); return <polygon key={sc} points={rp.map(p=>p.join(",")).join(" ")} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>; })}
      {pts(data.map(()=>100)).map(([x,y],i)=><line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>)}
      <polygon points={poly} fill="rgba(0,255,224,0.08)" stroke="var(--neon)" strokeWidth={1.5} style={{transition:"all 1.2s cubic-bezier(.4,0,.2,1)"}}/>
      {fp.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={3.5} fill="var(--neon)" style={{filter:"drop-shadow(0 0 4px var(--neon))"}}/>)}
      {lp.map(([x,y],i)=><text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="spider-label">{data[i].label}</text>)}
    </svg>
  );
}

function BarChart({ data, height=120 }) {
  const max=Math.max(...data.map(d=>d.value));
  const cols=["var(--neon)","var(--blue)","var(--violet2)","var(--amber)","var(--pink)","var(--green)"];
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:6,height,paddingBottom:20}}>
      {data.map((d,i)=>{
        const pct=(d.value/max)*100;
        const [h,setH]=useState(0);
        useEffect(()=>{const t=setTimeout(()=>setH(pct),100+i*60);return()=>clearTimeout(t);},[]);
        return (
          <div key={d.label} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,height:"100%",justifyContent:"flex-end"}}>
            <div style={{width:"100%",height:`${h}%`,background:cols[i%cols.length],borderRadius:"4px 4px 0 0",opacity:.85,transition:`height 0.9s cubic-bezier(.4,0,.2,1) ${i*.06}s`,minWidth:12}}/>
            <span style={{fontSize:9,color:"var(--text3)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%",textAlign:"center"}}>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function StatCard({ icon, value, label, sub, color="var(--neon)", delay=0 }) {
  return (
    <div className="card fade-up" style={{padding:"22px 20px",animationDelay:`${delay}ms`,boxShadow:"0 20px 60px -10px rgba(0,0,0,0.5)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
        <div style={{width:40,height:40,borderRadius:10,background:`${color}18`,border:`1px solid ${color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{icon}</div>
        {sub&&<span className="badge b-green" style={{fontSize:11}}>{sub}</span>}
      </div>
      <div style={{fontFamily:"var(--fd)",fontSize:32,color,letterSpacing:".02em",lineHeight:1}}>{value}</div>
      <div style={{fontSize:12,color:"var(--text3)",marginTop:6,fontWeight:500}}>{label}</div>
    </div>
  );
}

const SH = ({eyebrow,title,sub}) => (
  <div style={{marginBottom:32}} className="fade-up">
    {eyebrow&&<div style={{fontSize:11,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:"var(--neon)",marginBottom:10,display:"flex",alignItems:"center",gap:8}}><div style={{width:20,height:1,background:"var(--neon)"}}/>{eyebrow}<div style={{width:20,height:1,background:"var(--neon)"}}/></div>}
    <h1 style={{fontFamily:"var(--fd)",fontSize:42,letterSpacing:".04em",lineHeight:1.05,marginBottom:10}}>{title}</h1>
    {sub&&<p style={{fontSize:15,color:"var(--text2)",lineHeight:1.7,maxWidth:580}}>{sub}</p>}
  </div>
);

function XPBar({user}) {
  const info=getLevel(user.xp||0);
  const pct=Math.min(100,((user.xp-info.min)/(info.max-info.min))*100);
  return (
    <div style={{padding:"8px 12px",background:"rgba(0,255,224,0.05)",borderRadius:10,border:"1px solid rgba(0,255,224,0.1)",marginBottom:8}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
        <span style={{fontSize:11,fontWeight:700,color:"var(--neon)"}}>Lv.{info.level} {info.name}</span>
        <span style={{fontSize:10,color:"var(--text3)",fontFamily:"var(--fm)"}}>{user.xp||0} XP</span>
      </div>
      <div className="xp-bar"><div className="xp-fill" style={{width:`${pct}%`}}/></div>
      <div style={{fontSize:10,color:"var(--text4)",marginTop:3,textAlign:"right"}}>{info.max-(user.xp||0)} to next level</div>
    </div>
  );
}

function AuthModal({onLogin}) {
  const [mode,setMode]=useState("login");
  const [form,setForm]=useState({name:"",email:"",password:"",role:"Student"});
  const [err,setErr]=useState("");

  function submit() {
    if(!form.email||!form.password){setErr("Fill all fields.");return;}
    if(mode==="signup"&&!form.name){setErr("Enter your name.");return;}
    if(form.password.length<6){setErr("Password must be 6+ characters.");return;}
    const key=`sb_${form.email}`;
    if(mode==="signup"){
      if(localStorage.getItem(key)){setErr("Email already registered. Login instead.");return;}
      const u={name:form.name,email:form.email,password:form.password,role:form.role,xp:0,badges:[],streak:1,lastLogin:new Date().toDateString(),featuresUsed:[],chatCount:0,trendCount:0,joinDate:new Date().toLocaleDateString(),bio:"",location:"",linkedin:"",github:""};
      localStorage.setItem(key,JSON.stringify(u));
      localStorage.setItem("sb_current",form.email);
      onLogin(u);
    } else {
      const stored=localStorage.getItem(key);
      if(!stored){setErr("No account found. Sign up first.");return;}
      const u=JSON.parse(stored);
      if(u.password!==form.password){setErr("Wrong password.");return;}
      const today=new Date().toDateString();
      const yesterday=new Date(Date.now()-86400000).toDateString();
      if(u.lastLogin===yesterday) u.streak=(u.streak||0)+1;
      else if(u.lastLogin!==today) u.streak=1;
      u.lastLogin=today;
      localStorage.setItem(key,JSON.stringify(u));
      localStorage.setItem("sb_current",form.email);
      onLogin(u);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal fade-up">
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontFamily:"var(--fd)",fontSize:30,letterSpacing:".06em",marginBottom:6}}>SKILL<span style={{color:"var(--neon)"}}>BRIDGE</span> AI</div>
          <div style={{fontSize:14,color:"var(--text2)"}}>{mode==="login"?"Welcome back! Sign in to continue.":"Create your free account."}</div>
        </div>
        {mode==="signup"&&<div style={{marginBottom:14}}><label>Full Name</label><input className="inp" placeholder="Your Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>}
        <div style={{marginBottom:14}}><label>Email</label><input className="inp" type="email" placeholder="you@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
        <div style={{marginBottom:14}}><label>Password</label><input className="inp" type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
        {mode==="signup"&&<div style={{marginBottom:14}}><label>I am a</label><select className="inp" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>{["Student","Fresh Graduate","Working Professional","Career Switcher","Freelancer"].map(r=><option key={r}>{r}</option>)}</select></div>}
        {err&&<div style={{fontSize:13,color:"var(--red)",marginBottom:12,padding:"8px 12px",background:"rgba(239,68,68,0.08)",borderRadius:8,border:"1px solid rgba(239,68,68,0.2)"}}>{err}</div>}
        <button className="btn btn-neon" onClick={submit} style={{width:"100%",justifyContent:"center",marginBottom:16}}>
          {mode==="login"?"🚀 Sign In":"✨ Create Account"}
        </button>
        <div style={{textAlign:"center",fontSize:13,color:"var(--text3)"}}>
          {mode==="login"?"No account? ":"Have an account? "}
          <span style={{color:"var(--neon)",cursor:"pointer",fontWeight:600}} onClick={()=>{setMode(mode==="login"?"signup":"login");setErr("");}}>
            {mode==="login"?"Sign Up":"Sign In"}
          </span>
        </div>
      </div>
    </div>
  );
}

const NAVS=[
  {id:"home",icon:"⬡",label:"Overview"},
  {id:"dashboard",icon:"◈",label:"Dashboard"},
  {id:"skill-gap",icon:"◎",label:"Skill Matrix"},
  {id:"roadmap",icon:"⬢",label:"Roadmap"},
  {id:"resume",icon:"▣",label:"Resume AI"},
  {id:"trends",icon:"△",label:"Market Intel"},
  {id:"chat",icon:"◉",label:"AI Mentor"},
  {id:"interview",icon:"▷",label:"Interview Sim"},
  {id:"salary",icon:"◆",label:"Salary Oracle"},
  {id:"badges",icon:"🏅",label:"Badges & XP"},
  {id:"leaderboard",icon:"🏆",label:"Leaderboard"},
  {id:"profile",icon:"👤",label:"My Profile"},
];

function Sidebar({page,setPage,user,onLogout,open,onClose}) {
  return (
    <>
      <div className={`sidebar-overlay${open?" open":""}`} onClick={onClose}/>
      <aside className={`sidebar${open?" open":""}`}>
        <div style={{padding:"20px 10px 16px",borderBottom:"1px solid var(--border)",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,background:"linear-gradient(135deg,var(--neon2),var(--blue2))",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#000",flexShrink:0}}>SB</div>
            <div>
              <div style={{fontFamily:"var(--fd)",fontSize:17,letterSpacing:".06em",lineHeight:1}}>SKILL<span style={{color:"var(--neon)"}}>BRIDGE</span></div>
              <div style={{fontSize:9,color:"var(--text4)",letterSpacing:".12em",textTransform:"uppercase",marginTop:2}}>Career Intelligence</div>
            </div>
          </div>
        </div>
        {user&&(
          <div style={{padding:"10px 6px",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,var(--neon2),var(--blue2))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#000",flexShrink:0}}>
                {user.name?.[0]?.toUpperCase()||"U"}
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{user.name}</div>
                <div style={{fontSize:10,color:"var(--text3)"}}>Lv.{getLevel(user.xp||0).level} {getLevel(user.xp||0).name}</div>
              </div>
            </div>
            <XPBar user={user}/>
            <div style={{display:"flex",gap:8,fontSize:11,color:"var(--text3)",flexWrap:"wrap"}}>
              <span>🔥 {user.streak||0}d</span>
              <span>🏅 {user.badges?.length||0}</span>
              <span>⚡ {user.xp||0} XP</span>
            </div>
          </div>
        )}
        <div style={{height:1,background:"var(--border)",margin:"4px 0 10px"}}/>
        <nav style={{display:"flex",flexDirection:"column",gap:1,flex:1}}>
          {NAVS.map(n=>(
            <div key={n.id} className={`nav-link${page===n.id?" active":""}`} onClick={()=>{setPage(n.id);onClose();}}>
              <span style={{fontSize:13,fontFamily:"var(--fm)",opacity:.7}}>{n.icon}</span>
              <span>{n.label}</span>
            </div>
          ))}
        </nav>
        <div style={{marginTop:12,padding:"10px 12px",background:"rgba(0,255,224,0.04)",borderRadius:10,border:"1px solid rgba(0,255,224,0.1)",marginBottom:10}}>
          <div style={{fontSize:11,color:"var(--neon)",fontWeight:600,marginBottom:3}}>🤖 Claude AI Powered</div>
          <div style={{fontSize:10,color:"var(--text3)",lineHeight:1.5}}>Real-time intelligence.</div>
        </div>
        <button className="btn btn-danger" onClick={onLogout} style={{width:"100%",justifyContent:"center",fontSize:12,padding:"8px"}}>🚪 Sign Out</button>
      </aside>
    </>
  );
}


function HomePage({setPage,user}) {
  const features=[
    {id:"skill-gap",icon:"◎",title:"Skill Matrix",desc:"AI gap analysis with radar chart",color:"var(--neon)"},
    {id:"roadmap",icon:"⬢",title:"Career Roadmap",desc:"Month-by-month learning timeline",color:"var(--blue)"},
    {id:"resume",icon:"▣",title:"Resume AI",desc:"PDF, image & text ATS scoring",color:"var(--violet2)"},
    {id:"trends",icon:"△",title:"Market Intel",desc:"Live demand charts & salaries",color:"var(--amber)"},
    {id:"chat",icon:"◉",title:"AI Mentor",desc:"Real-time career guidance chatbot",color:"var(--pink)"},
    {id:"interview",icon:"▷",title:"Interview Sim",desc:"Scored mock interviews + feedback",color:"var(--green)"},
  ];
  return (
    <div className="page-wrap">
      <div style={{marginBottom:56}}>
        <div className="badge b-neon fade-up" style={{marginBottom:20,fontSize:12,padding:"7px 18px"}}>⚡ Next-Gen Career Intelligence Platform</div>
        <h1 className="fade-up" style={{fontFamily:"var(--fd)",fontSize:62,letterSpacing:".05em",lineHeight:1,marginBottom:20,animationDelay:"60ms"}}>
          BRIDGE THE GAP<br/>
          <span style={{WebkitTextStroke:"1px var(--neon)",color:"transparent"}}>BETWEEN NOW</span><br/>
          <span style={{color:"var(--neon)"}}>{"& YOUR FUTURE"}</span>
        </h1>
        {user&&<div className="badge b-green fade-up" style={{marginBottom:16,fontSize:13,padding:"8px 18px",animationDelay:"80ms"}}>👋 Welcome back, {user.name}! You have {user.xp||0} XP · Lv.{getLevel(user.xp||0).level}</div>}
        <p className="fade-up" style={{fontSize:16,color:"var(--text2)",maxWidth:540,lineHeight:1.8,marginBottom:32,animationDelay:"120ms"}}>
          AI-powered skill analysis, career roadmaps, and market intelligence — earn XP and badges as you grow your career.
        </p>
        <div className="fade-up" style={{display:"flex",gap:12,animationDelay:"180ms"}}>
          <button className="btn btn-neon" onClick={()=>setPage("skill-gap")}>⬡ Analyze My Skills</button>
          <button className="btn btn-outline" onClick={()=>setPage("badges")}>🏅 View Badges</button>
        </div>
      </div>
      <div className="g4" style={{marginBottom:52}}>
        <StatCard icon="⚡" value="500K+" label="Skills Analyzed" sub="↑14%" color="var(--neon)" delay={0}/>
        <StatCard icon="🏅" value="50+" label="Badges to Earn" sub="new" color="var(--amber)" delay={80}/>
        <StatCard icon="💼" value="12K+" label="Career Paths" sub="↑8%" color="var(--violet2)" delay={160}/>
        <StatCard icon="🔥" value="98%" label="AI Accuracy" sub="↑2%" color="var(--blue)" delay={240}/>
      </div>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:"var(--neon)",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:20,height:1,background:"var(--neon)"}}/>CORE MODULES
      </div>
      <h2 style={{fontFamily:"var(--fd)",fontSize:30,letterSpacing:".04em",marginBottom:24}}>SIX POWERFUL AI TOOLS</h2>
      <div className="g3">
        {features.map((f,i)=>(
          <div key={f.id} className="card fade-up" style={{padding:24,cursor:"pointer",transition:"all .25s",animationDelay:`${i*60}ms`,borderColor:"transparent"}}
            onClick={()=>setPage(f.id)}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=f.color+"40";e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="transparent";e.currentTarget.style.transform="none";}}>
            <div style={{fontFamily:"var(--fm)",fontSize:26,color:f.color,marginBottom:12,opacity:.8}}>{f.icon}</div>
            <div style={{fontFamily:"var(--fd)",fontSize:19,letterSpacing:".04em",marginBottom:7}}>{f.title}</div>
            <div style={{fontSize:13,color:"var(--text3)",lineHeight:1.65}}>{f.desc}</div>
            <div style={{marginTop:16,fontSize:12,color:f.color,fontWeight:600}}>Open →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPage({user,setPage}) {
  const radarData=[
    {label:"Frontend",value:80},{label:"Backend",value:55},{label:"AI/ML",value:40},
    {label:"DevOps",value:35},{label:"System Design",value:60},{label:"Soft Skills",value:85},
  ];
  const jobData=[{label:"AI/ML",value:95},{label:"Cloud",value:88},{label:"Security",value:80},{label:"Frontend",value:75},{label:"Backend",value:71},{label:"DevOps",value:68}];
  const info=getLevel(user?.xp||0);
  const pct=Math.min(100,(((user?.xp||0)-info.min)/(info.max-info.min))*100);
  return (
    <div className="page-wrap">
      <SH eyebrow="Command Center" title="YOUR DASHBOARD" sub="Track your career intelligence metrics."/>
      <div className="g4" style={{marginBottom:20}}>
        <StatCard icon="⚡" value={user?.xp||0} label="Total XP Earned" color="var(--neon)" delay={0}/>
        <StatCard icon="🏅" value={user?.badges?.length||0} label="Badges Earned" color="var(--amber)" delay={80}/>
        <StatCard icon="🔥" value={`${user?.streak||0}d`} label="Current Streak" color="var(--orange)" delay={160}/>
        <StatCard icon="📊" value={`Lv.${info.level}`} label={info.name} color="var(--violet2)" delay={240}/>
      </div>
      <div className="card fade-up" style={{padding:24,marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <div><div style={{fontFamily:"var(--fd)",fontSize:18,letterSpacing:".06em"}}>LEVEL PROGRESS</div><div style={{fontSize:12,color:"var(--text3)",marginTop:2}}>Lv.{info.level} → Lv.{info.level+1} {info.name}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontFamily:"var(--fd)",fontSize:24,color:"var(--neon)"}}>{user?.xp||0} XP</div><div style={{fontSize:11,color:"var(--text3)"}}>{info.max-(user?.xp||0)} XP to next level</div></div>
        </div>
        <div className="xp-bar" style={{height:12}}><div className="xp-fill" style={{width:`${pct}%`}}/></div>
        <div style={{display:"flex",justifyContent:"space-around",marginTop:10}}>
          {LEVELS.map(l=>(
            <div key={l.level} style={{textAlign:"center",opacity:(user?.xp||0)>=l.min?1:0.35}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:(user?.xp||0)>=l.min?"var(--neon)":"var(--border2)",margin:"0 auto 4px"}}/>
              <div style={{fontSize:9,color:(user?.xp||0)>=l.min?"var(--neon)":"var(--text4)"}}>Lv{l.level}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:16}}>
        <div className="card fade-up" style={{padding:24}}>
          <div style={{fontFamily:"var(--fd)",fontSize:15,letterSpacing:".06em",marginBottom:4}}>SKILL RADAR</div>
          <div style={{fontSize:11,color:"var(--text3)",marginBottom:14}}>6 dimensions</div>
          <div style={{display:"flex",justifyContent:"center"}}><RadarChart data={radarData} size={190}/></div>
        </div>
        <div className="card fade-up" style={{padding:24,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <div style={{fontFamily:"var(--fd)",fontSize:15,letterSpacing:".06em",marginBottom:16}}>CAREER READINESS</div>
          <DonutRing pct={72} size={140} stroke={11} color="auto" label="Score"/>
          <div style={{marginTop:16,display:"flex",gap:20}}>
            {[["Technical",68,"var(--blue)"],["Soft Skills",85,"var(--green)"]].map(([l,v,c])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontFamily:"var(--fd)",fontSize:22,color:c}}>{v}</div>
                <div style={{fontSize:10,color:"var(--text3)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card fade-up" style={{padding:24}}>
          <div style={{fontFamily:"var(--fd)",fontSize:15,letterSpacing:".06em",marginBottom:4}}>JOB DEMAND</div>
          <div style={{fontSize:11,color:"var(--text3)",marginBottom:16}}>Market demand index</div>
          <BarChart data={jobData} height={130}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div className="card fade-up" style={{padding:24}}>
          <div style={{fontFamily:"var(--fd)",fontSize:15,letterSpacing:".06em",marginBottom:16}}>LOGIN STREAK — 🔥 {user?.streak||0} days</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {Array.from({length:28},(_,i)=>{
              const daysAgo=27-i, streak=user?.streak||0, isToday=daysAgo===0, inStreak=daysAgo<streak;
              return <div key={i} className={`streak-day ${isToday?"today":inStreak?"done":"miss"}`}>{isToday?"★":inStreak?"✓":"·"}</div>;
            })}
          </div>
          <div style={{marginTop:12,fontSize:12,color:"var(--text3)"}}>
            {(user?.streak||0)>=7?"🔥 Week Warrior badge earned!":`${7-(user?.streak||0)} more days for Week Warrior badge`}
          </div>
        </div>
        <div className="card fade-up" style={{padding:24}}>
          <div style={{fontFamily:"var(--fd)",fontSize:15,letterSpacing:".06em",marginBottom:16}}>EARNED BADGES</div>
          {(user?.badges?.length||0)===0
            ?<div style={{fontSize:14,color:"var(--text3)",textAlign:"center",padding:"20px 0"}}>Start using features to earn badges! 🚀</div>
            :<div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {BADGES.filter(b=>user?.badges?.includes(b.id)).map(b=>(
                <div key={b.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"10px 12px",background:"var(--dark3)",borderRadius:10,border:`1px solid ${b.color}30`}}>
                  <div style={{fontSize:24}}>{b.icon}</div>
                  <div style={{fontSize:10,fontWeight:600,color:b.color}}>{b.name}</div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

function BadgesPage({user}) {
  const earned=user?.badges||[];
  return (
    <div className="page-wrap">
      <SH eyebrow="Gamification" title="BADGES & XP" sub="Complete activities to earn badges and level up."/>
      <div className="g3" style={{marginBottom:32}}>
        <StatCard icon="🏅" value={earned.length} label={`of ${BADGES.length} badges earned`} color="var(--amber)"/>
        <StatCard icon="⚡" value={user?.xp||0} label="Total XP" color="var(--neon)"/>
        <StatCard icon="📊" value={`${Math.round((earned.length/BADGES.length)*100)}%`} label="Completion" color="var(--green)"/>
      </div>
      <div className="card fade-up" style={{padding:24,marginBottom:28,background:"linear-gradient(135deg,rgba(0,255,224,0.04),rgba(77,159,255,0.04))",borderColor:"rgba(0,255,224,0.15)"}}>
        <div style={{fontFamily:"var(--fd)",fontSize:16,letterSpacing:".06em",marginBottom:16}}>LEVEL MILESTONES</div>
        <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:16}}>
          {LEVELS.map(l=>{
            const reached=(user?.xp||0)>=l.min, current=getLevel(user?.xp||0).level===l.level;
            return (
              <div key={l.level} style={{textAlign:"center",opacity:reached?1:0.4}}>
                <div style={{width:50,height:50,borderRadius:"50%",background:current?"linear-gradient(135deg,var(--neon2),var(--blue2))":reached?"var(--dark3)":"var(--dark2)",border:`2px solid ${current?"var(--neon)":reached?"var(--border2)":"var(--border)"}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px",fontFamily:"var(--fd)",fontSize:18,color:current?"#000":"var(--text2)",boxShadow:current?"0 0 20px rgba(0,255,224,0.4)":"none"}}>
                  {l.level}
                </div>
                <div style={{fontSize:12,fontWeight:600,color:current?"var(--neon)":"var(--text2)"}}>{l.name}</div>
                <div style={{fontSize:10,color:"var(--text4)"}}>{l.min} XP</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{fontFamily:"var(--fd)",fontSize:18,letterSpacing:".06em",marginBottom:16}}>ALL BADGES</div>
      <div className="g-badges">
        {BADGES.map(b=>{
          const isEarned=earned.includes(b.id);
          return (
            <div key={b.id} className={`badge-card ${isEarned?"earned":"locked"} pop-in`}>
              <div style={{fontSize:34,filter:isEarned?"none":"grayscale(1)"}}>{b.icon}</div>
              <div style={{fontSize:12,fontWeight:700,color:isEarned?b.color:"var(--text3)",textAlign:"center"}}>{b.name}</div>
              <div style={{fontSize:10,color:"var(--text4)",textAlign:"center",lineHeight:1.5}}>{b.desc}</div>
              <div style={{fontSize:11,fontWeight:700,color:isEarned?"var(--amber)":"var(--text4)",fontFamily:"var(--fm)"}}>+{b.xp} XP</div>
              {isEarned?<span className="badge b-green" style={{fontSize:10}}>✅ Earned</span>:<span className="badge b-red" style={{fontSize:10}}>🔒 Locked</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LeaderboardPage({user}) {
  const demo=[
    {name:"Arjun S.",xp:1840,badges:9,streak:14,role:"AI Engineer"},
    {name:"Priya K.",xp:1620,badges:8,streak:21,role:"Data Scientist"},
    {name:"Rahul M.",xp:1480,badges:7,streak:10,role:"Full Stack Dev"},
    {name:"Sneha R.",xp:1290,badges:6,streak:7,role:"DevOps Engineer"},
    {name:"Vikram N.",xp:1100,badges:5,streak:5,role:"ML Engineer"},
    {name:"Ananya P.",xp:950,badges:4,streak:3,role:"Frontend Dev"},
    {name:"Karthik L.",xp:820,badges:4,streak:8,role:"Backend Dev"},
    {name:"Meera D.",xp:710,badges:3,streak:2,role:"UI/UX Designer"},
  ];
  const myEntry={name:user?.name||"You",xp:user?.xp||0,badges:user?.badges?.length||0,streak:user?.streak||0,isMe:true,role:user?.role||"User"};
  const all=[...demo,myEntry].sort((a,b)=>b.xp-a.xp);
  const myRank=all.findIndex(u=>u.isMe)+1;
  const medalColors=["var(--amber)","var(--text2)","var(--orange)"];
  const medals=["🥇","🥈","🥉"];
  return (
    <div className="page-wrap">
      <SH eyebrow="Community" title="LEADERBOARD" sub="See how you rank against other SkillBridge users."/>
      <div className="card fade-up" style={{padding:20,marginBottom:24,background:"linear-gradient(135deg,rgba(0,255,224,0.05),rgba(77,159,255,0.04))",borderColor:"rgba(0,255,224,0.2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:16,alignItems:"center"}}>
          <div style={{fontFamily:"var(--fd)",fontSize:48,color:"var(--neon)"}}>#{myRank}</div>
          <div><div style={{fontWeight:700,fontSize:16}}>Your Rank</div><div style={{fontSize:13,color:"var(--text2)"}}>{user?.xp||0} XP · {user?.badges?.length||0} badges · 🔥{user?.streak||0}d</div></div>
        </div>
        <div className="badge b-neon" style={{fontSize:13,padding:"8px 18px"}}>{myRank<=3?"🏆 Top 3!":myRank<=10?"⭐ Top 10":"📈 Keep Going"}</div>
      </div>
      {all.map((u,i)=>(
        <div key={i} className={`lb-row${u.isMe?" me":""}`}>
          <div style={{width:32,textAlign:"center",fontFamily:"var(--fd)",fontSize:i<3?22:16,color:i<3?medalColors[i]:"var(--text4)"}}>{i<3?medals[i]:`${i+1}`}</div>
          <div style={{width:36,height:36,borderRadius:"50%",background:u.isMe?"linear-gradient(135deg,var(--neon2),var(--blue2))":"var(--dark3)",border:`1px solid ${u.isMe?"var(--neon)":"var(--border)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:u.isMe?"#000":"var(--text2)",flexShrink:0}}>
            {u.name[0]}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:600,color:u.isMe?"var(--neon)":"var(--text)"}}>{u.name}{u.isMe&&<span style={{fontSize:11,color:"var(--neon)"}}> (You)</span>}</div>
            <div style={{fontSize:11,color:"var(--text3)"}}>{u.role} · 🔥 {u.streak}d streak</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"var(--fd)",fontSize:20,color:i<3?medalColors[i]:"var(--text2)"}}>{u.xp} XP</div>
            <div style={{fontSize:11,color:"var(--text3)"}}>🏅 {u.badges} badges</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfilePage({user,onUpdate}) {
  const [edit,setEdit]=useState(false);
  const [form,setForm]=useState({name:user?.name||"",role:user?.role||"",bio:user?.bio||"",location:user?.location||"",linkedin:user?.linkedin||"",github:user?.github||""});
  function save(){const updated={...user,...form};saveUser(updated);onUpdate(updated);setEdit(false);}
  const info=getLevel(user?.xp||0);
  const pct=Math.min(100,(((user?.xp||0)-info.min)/(info.max-info.min))*100);
  const earned=BADGES.filter(b=>user?.badges?.includes(b.id));
  return (
    <div className="page-wrap">
      <SH eyebrow="Account" title="MY PROFILE" sub="Your career profile, stats, and achievements."/>
      <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:20}}>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div className="card fade-up" style={{padding:28,textAlign:"center"}}>
            <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,var(--neon2),var(--blue2))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontWeight:800,color:"#000",margin:"0 auto 16px",boxShadow:"0 0 30px rgba(0,255,224,0.3)"}}>
              {user?.name?.[0]?.toUpperCase()||"U"}
            </div>
            <div style={{fontFamily:"var(--fd)",fontSize:22,letterSpacing:".04em",marginBottom:4}}>{user?.name}</div>
            <div style={{fontSize:13,color:"var(--text3)",marginBottom:12}}>{user?.role}</div>
            <span className="badge b-neon">Lv.{info.level} {info.name}</span>
            <div style={{marginTop:16}}><div className="xp-bar" style={{height:10}}><div className="xp-fill" style={{width:`${pct}%`}}/></div><div style={{display:"flex",justifyContent:"space-between",marginTop:5,fontSize:11,color:"var(--text3)"}}><span>{user?.xp||0} XP</span><span>{info.max} XP</span></div></div>
          </div>
          <div className="card fade-up" style={{padding:20}}>
            {[["📅 Joined",user?.joinDate||"Today"],["🔥 Streak",`${user?.streak||0} days`],["🏅 Badges",`${user?.badges?.length||0} / ${BADGES.length}`],["⚡ XP",`${user?.xp||0} XP`],["✉️ Email",user?.email]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"7px 0",borderBottom:"1px solid var(--border)"}}>
                <span style={{color:"var(--text3)"}}>{k}</span>
                <span style={{color:"var(--text2)",fontWeight:500,maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div className="card fade-up" style={{padding:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontFamily:"var(--fd)",fontSize:18,letterSpacing:".06em"}}>PROFILE INFO</div>
              {!edit?<button className="btn btn-outline" onClick={()=>setEdit(true)} style={{fontSize:12,padding:"7px 18px"}}>✏️ Edit</button>
                :<div style={{display:"flex",gap:8}}><button className="btn btn-neon" onClick={save} style={{fontSize:12,padding:"7px 18px"}}>💾 Save</button><button className="btn btn-ghost" onClick={()=>setEdit(false)}>Cancel</button></div>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {[["Full Name","name","Your name"],["Goal/Role","role","Aspiring AI Engineer"],["Location","location","Bangalore, India"],["LinkedIn","linkedin","linkedin.com/in/you"],["GitHub","github","github.com/you"]].map(([lbl,key,ph])=>(
                <div key={key}>
                  <label>{lbl}</label>
                  {edit?<input className="inp" placeholder={ph} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/>
                    :<div style={{fontSize:14,color:user?.[key]?"var(--text)":"var(--text4)",padding:"8px 0",borderBottom:"1px solid var(--border)"}}>{user?.[key]||"—"}</div>}
                </div>
              ))}
            </div>
            {edit&&<div style={{marginTop:14}}><label>Bio</label><textarea className="inp" rows={3} placeholder="Tell us about yourself..." value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}/></div>}
            {!edit&&user?.bio&&<div style={{marginTop:14,fontSize:14,color:"var(--text2)",lineHeight:1.7,padding:"12px 0",borderTop:"1px solid var(--border)"}}>{user.bio}</div>}
          </div>
          <div className="card fade-up" style={{padding:24}}>
            <div style={{fontFamily:"var(--fd)",fontSize:18,letterSpacing:".06em",marginBottom:16}}>EARNED BADGES</div>
            {earned.length===0
              ?<div style={{fontSize:14,color:"var(--text3)",textAlign:"center",padding:"20px 0"}}>No badges yet — start using features! 🚀</div>
              :<div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{earned.map(b=>(
                <div key={b.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"12px 14px",background:"var(--dark3)",borderRadius:10,border:`1px solid ${b.color}30`}}>
                  <div style={{fontSize:26}}>{b.icon}</div>
                  <div style={{fontSize:11,fontWeight:600,color:b.color}}>{b.name}</div>
                  <div style={{fontSize:10,color:"var(--text4)",fontFamily:"var(--fm)"}}>+{b.xp} XP</div>
                </div>
              ))}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillGapPage({onXP}) {
  const [form,setForm]=useState({skills:"",role:"",exp:"1-2 years"});
  const [res,setRes]=useState(null);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  async function analyze() {
    if(!form.skills.trim()||!form.role.trim()){setErr("Fill in skills and target role.");return;}
    setErr("");setLoading(true);setRes(null);
    try {
      const raw=await callClaude([{role:"user",content:`Skill gap analysis: Skills:${form.skills}, Target:${form.role}, Exp:${form.exp}. Return ONLY compact JSON no markdown: {"matchPct":45,"strengths":["s1","s2","s3"],"missing":["m1","m2","m3","m4"],"weakAreas":["w1","w2"],"recommended":["r1","r2","r3"],"radar":[{"label":"Programming","value":70},{"label":"System Design","value":40},{"label":"AI/ML","value":20},{"label":"Cloud","value":55},{"label":"Databases","value":65},{"label":"DevOps","value":30}],"timeline":"4 months","summary":"One sentence.","courses":["Course 1","Course 2","Course 3"]}`}],"Return ONLY valid compact JSON, no markdown, no code blocks.");
      setRes(JSON.parse(cleanJSON(raw)));
      onXP("first_analysis");
    } catch(e){setErr(e.message);}
    finally{setLoading(false);}
  }
  return (
    <div className="page-wrap">
      <SH eyebrow="Feature" title="SKILL MATRIX" sub="AI compares your skills against market requirements with visual breakdown."/>
      <div className="card fade-up" style={{padding:28,marginBottom:28}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 180px",gap:16,marginBottom:20}}>
          <div><label>Current Skills</label><textarea className="inp" rows={3} placeholder="Python, React, SQL, Docker..." value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})}/></div>
          <div>
            <label>Target Role</label><input className="inp" placeholder="e.g. AI Engineer" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} style={{marginBottom:10}}/>
            <label>Experience</label><select className="inp" value={form.exp} onChange={e=>setForm({...form,exp:e.target.value})}>{["Fresher","1-2 years","2-5 years","5+ years"].map(v=><option key={v}>{v}</option>)}</select>
          </div>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:10}}>
            {err&&<div style={{fontSize:12,color:"var(--red)"}}>{err}</div>}
            <button className="btn btn-neon" onClick={analyze} disabled={loading} style={{width:"100%",justifyContent:"center"}}>{loading?<><Spinner/> Analyzing...</>:"◎ Analyze"}</button>
          </div>
        </div>
      </div>
      {res&&(
        <div className="fade-up" style={{display:"flex",flexDirection:"column",gap:18}}>
          <div style={{display:"grid",gridTemplateColumns:"200px 1fr 1fr",gap:16}}>
            <div className="card" style={{padding:24,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <div style={{fontSize:11,color:"var(--text3)",marginBottom:12,textTransform:"uppercase",letterSpacing:".1em"}}>Match Score</div>
              <DonutRing pct={res.matchPct} size={130} stroke={11} color="auto" label="%"/>
              <div style={{marginTop:12,fontSize:12,color:"var(--text2)",textAlign:"center",lineHeight:1.6}}>{res.summary}</div>
            </div>
            <div className="card" style={{padding:24,display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div style={{fontSize:11,color:"var(--text3)",marginBottom:8,textTransform:"uppercase",letterSpacing:".1em",alignSelf:"flex-start"}}>Skill Dimensions</div>
              <RadarChart data={res.radar} size={200}/>
            </div>
            <div className="card" style={{padding:24}}>
              <div style={{fontSize:11,color:"var(--text3)",marginBottom:14,textTransform:"uppercase",letterSpacing:".1em"}}>Breakdown</div>
              {res.radar.map(r=><Bar key={r.label} label={r.label} value={r.value} color={r.value>=70?"var(--green)":r.value>=45?"var(--amber)":"var(--red)"}/>)}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14}}>
            {[{title:"✅ Strengths",items:res.strengths,cls:"b-green"},{title:"❌ Missing",items:res.missing,cls:"b-red"},{title:"⚠️ Weak Areas",items:res.weakAreas,cls:"b-amber"},{title:"🚀 Learn Next",items:res.recommended,cls:"b-neon"}].map(g=>(
              <div key={g.title} className="card" style={{padding:18}}><div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{g.title}</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{g.items.map(s=><span key={s} className={`badge ${g.cls}`} style={{fontSize:11}}>{s}</span>)}</div></div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <div className="card" style={{padding:20,background:"linear-gradient(135deg,rgba(0,255,224,0.04),rgba(77,159,255,0.04))",borderColor:"rgba(0,255,224,0.15)"}}>
              <div style={{fontSize:11,color:"var(--neon)",marginBottom:6,textTransform:"uppercase",letterSpacing:".1em"}}>Estimated Timeline</div>
              <div style={{fontFamily:"var(--fd)",fontSize:40,color:"var(--neon)"}}>{res.timeline}</div>
              <div style={{fontSize:13,color:"var(--text3)",marginTop:4}}>to bridge the gap for {form.role}</div>
            </div>
            <div className="card" style={{padding:20}}>
              <div style={{fontSize:11,color:"var(--violet2)",marginBottom:12,textTransform:"uppercase",letterSpacing:".1em"}}>Recommended Courses</div>
              {res.courses?.map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:"1px solid var(--border)",fontSize:13,color:"var(--text2)"}}><span style={{fontFamily:"var(--fm)",color:"var(--violet2)",fontSize:12}}>0{i+1}</span>{c}</div>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RoadmapPage({onXP}) {
  const [form,setForm]=useState({role:"",skills:"",dur:"6"});
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const PC=["var(--neon)","var(--blue)","var(--violet2)","var(--amber)","var(--pink)","var(--green)","var(--orange)","var(--red)"];
  async function generate() {
    if(!form.role.trim()){setErr("Enter a target role.");return;}
    setErr("");setLoading(true);setData(null);
    try {
      const raw=await callClaude([{role:"user",content:`${form.dur}-month roadmap to become ${form.role}. Skills:${form.skills||"none"}. Return ONLY compact JSON: {"title":"string","months":[{"month":1,"phase":"Phase","topics":["t1","t2","t3"],"project":"project","milestone":"milestone","hours":40}],"finalGoal":"string","resources":["r1","r2","r3"],"salary":"₹X-Y LPA"}`}],"Return ONLY valid compact JSON.");
      setData(JSON.parse(cleanJSON(raw)));
      onXP("roadmap_gen");
    } catch(e){setErr(e.message);}
    finally{setLoading(false);}
  }
  return (
    <div className="page-wrap">
      <SH eyebrow="Feature" title="CAREER ROADMAP" sub="Personalized month-by-month AI-crafted learning timeline."/>
      <div className="card fade-up" style={{padding:28,marginBottom:28}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 160px 120px",gap:14,alignItems:"flex-end"}}>
          <div><label>Target Role</label><input className="inp" placeholder="Data Scientist..." value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/></div>
          <div><label>Current Skills (optional)</label><input className="inp" placeholder="Python, SQL..." value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})}/></div>
          <div><label>Duration</label><select className="inp" value={form.dur} onChange={e=>setForm({...form,dur:e.target.value})}>{["3","4","5","6","8","12"].map(v=><option key={v}>{v} months</option>)}</select></div>
          <div style={{paddingBottom:2}}>{err&&<div style={{fontSize:11,color:"var(--red)",marginBottom:4}}>{err}</div>}<button className="btn btn-neon" onClick={generate} disabled={loading} style={{width:"100%",justifyContent:"center"}}>{loading?<><Spinner size={14}/> ...</>:"⬢ Generate"}</button></div>
        </div>
      </div>
      {data&&(
        <div className="fade-up">
          <div className="card" style={{padding:24,marginBottom:20,background:"linear-gradient(135deg,rgba(0,255,224,0.06),rgba(77,159,255,0.04))",borderColor:"rgba(0,255,224,0.18)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
              <div><div style={{fontFamily:"var(--fd)",fontSize:22,letterSpacing:".04em",marginBottom:6}}>{data.title}</div><div style={{fontSize:13,color:"var(--text2)"}}>🏆 {data.finalGoal}</div></div>
              <div style={{display:"flex",gap:24}}>
                <div style={{textAlign:"center"}}><div style={{fontFamily:"var(--fd)",fontSize:28,color:"var(--neon)"}}>{data.months?.length}</div><div style={{fontSize:11,color:"var(--text3)"}}>Months</div></div>
                <div style={{textAlign:"center"}}><div style={{fontFamily:"var(--fd)",fontSize:28,color:"var(--green)"}}>{data.salary||"High"}</div><div style={{fontSize:11,color:"var(--text3)"}}>Expected CTC</div></div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:2,marginBottom:20}}>{data.months?.map((_,i)=><div key={i} style={{flex:1,height:8,background:PC[i%PC.length],borderRadius:4,opacity:.7}}/>)}</div>
          <div style={{display:"flex",flexDirection:"column",gap:0,position:"relative",marginBottom:20}}>
            <div style={{position:"absolute",left:19,top:0,bottom:0,width:1,background:"linear-gradient(180deg,var(--neon),var(--blue),var(--violet2))",opacity:.3}}/>
            {data.months?.map((m,i)=>(
              <div key={m.month} style={{display:"flex",gap:20,marginBottom:12}}>
                <div style={{width:38,height:38,borderRadius:"50%",background:PC[i%PC.length],display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontSize:16,color:"#000",flexShrink:0,zIndex:1,boxShadow:`0 0 0 4px var(--dark),0 0 16px ${PC[i%PC.length]}50`}}>{m.month}</div>
                <div className="card" style={{padding:18,flex:1,borderColor:`${PC[i%PC.length]}20`}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                    <div><span style={{fontSize:10,color:PC[i%PC.length],textTransform:"uppercase",letterSpacing:".1em",fontWeight:700}}>Month {m.month}</span><div style={{fontFamily:"var(--fd)",fontSize:17,letterSpacing:".04em",marginTop:2}}>{m.phase}</div></div>
                    {m.hours&&<span className="badge b-neon" style={{fontSize:10}}>⏱ {m.hours}h</span>}
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>{m.topics.map(t=><span key={t} style={{fontSize:11,padding:"3px 10px",borderRadius:20,background:"var(--dark3)",color:"var(--text3)",border:"1px solid var(--border)"}}>{t}</span>)}</div>
                  <div style={{display:"flex",gap:16,fontSize:12}}><span style={{color:"var(--text3)"}}>🛠 <span style={{color:"var(--text2)"}}>{m.project}</span></span><span style={{color:"var(--green)"}}>✅ {m.milestone}</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{padding:20}}><div style={{fontSize:11,color:"var(--violet2)",marginBottom:12,textTransform:"uppercase",letterSpacing:".1em"}}>Resources</div><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{data.resources?.map(r=><span key={r} className="badge b-violet">{r}</span>)}</div></div>
        </div>
      )}
    </div>
  );
}

function ResumePage({onXP}) {
  const [mode,setMode]=useState("text");
  const [text,setText]=useState("");
  const [file,setFile]=useState(null);
  const [role,setRole]=useState("");
  const [preview,setPreview]=useState(null);
  const [res,setRes]=useState(null);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const [drag,setDrag]=useState(false);
  const fileRef=useRef();
  function handleFile(f){
    if(!f)return;setFile(f);setErr("");
    if(f.type.startsWith("image/")){setMode("image");const r=new FileReader();r.onload=e=>setPreview(e.target.result);r.readAsDataURL(f);}
    else if(f.type==="application/pdf"){setMode("pdf");setPreview(null);}
    else{setErr("Only PDF or image files.");setFile(null);}
  }
  async function analyze(){
    setErr("");setLoading(true);setRes(null);
    try{
      let imageData=null;
      let prompt=`Analyze resume${role?` for: ${role}`:""}.  Return ONLY compact JSON: {"atsScore":72,"overallScore":68,"sections":{"contact":80,"summary":60,"experience":75,"skills":85,"education":70,"keywords":55},"strengths":["s1","s2","s3"],"improvements":["i1","i2","i3"],"missingKeywords":["k1","k2","k3","k4"],"formatting":["f1"],"grammarIssues":["g1"],"summary":"one sentence.","verdict":"Good"}`;
      if(mode==="image"&&file){imageData={type:"image",mediaType:file.type,data:preview.split(",")[1]};}
      else if(mode==="pdf"&&file){const b64=await new Promise((rs,rj)=>{const r=new FileReader();r.onload=e=>rs(e.target.result.split(",")[1]);r.onerror=rj;r.readAsDataURL(file);});imageData={type:"document",data:b64};}
      else{if(!text.trim()){setErr("Paste resume text.");setLoading(false);return;}prompt=`Analyze this resume:\n${text.substring(0,2000)}\n\n`+prompt;}
      const raw=await callClaude([{role:"user",content:prompt}],"You are an ATS expert. Return ONLY valid compact JSON.",imageData);
      setRes(JSON.parse(cleanJSON(raw)));
      onXP("resume_done");
    }catch(e){setErr(e.message);}
    finally{setLoading(false);}
  }
  const SL={contact:"Contact",summary:"Summary",experience:"Experience",skills:"Skills",education:"Education",keywords:"Keywords"};
  return (
    <div className="page-wrap">
      <SH eyebrow="Feature" title="RESUME AI" sub="Upload PDF, image, or paste text — AI-powered ATS scoring."/>
      <div style={{display:"flex",gap:6,marginBottom:20}}>
        {[["text","📝 Paste Text"],["image","🖼️ Image"],["pdf","📄 PDF"]].map(([m,l])=>(
          <button key={m} className={mode===m?"btn btn-neon":"btn btn-outline"} style={{fontSize:13,padding:"9px 20px"}} onClick={()=>{setMode(m);setFile(null);setPreview(null);setErr("");}}>{l}</button>
        ))}
      </div>
      <div className="card fade-up" style={{padding:28,marginBottom:24}}>
        <div style={{marginBottom:16}}><label>Target Role (optional)</label><input className="inp" placeholder="e.g. Senior Software Engineer" value={role} onChange={e=>setRole(e.target.value)}/></div>
        {mode==="text"&&<div style={{marginBottom:16}}><label>Resume Text</label><textarea className="inp" rows={9} placeholder="Paste your full resume content here..." value={text} onChange={e=>setText(e.target.value)}/></div>}
        {(mode==="image"||mode==="pdf")&&(
          <div style={{marginBottom:16}}>
            <input ref={fileRef} type="file" accept={mode==="image"?"image/*":"application/pdf"} style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
            <div className={`upload-zone${drag?" drag-over":""}`} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0]);}} onClick={()=>fileRef.current?.click()}>
              {file?(<div>{preview&&<img src={preview} alt="resume" style={{maxHeight:180,maxWidth:"100%",borderRadius:8,marginBottom:10}}/>}<div style={{fontSize:14,color:"var(--neon)",fontWeight:600}}>✅ {file.name}</div><div style={{fontSize:12,color:"var(--text3)",marginTop:4}}>{(file.size/1024).toFixed(1)} KB · Click to change</div></div>)
              :(<div><div style={{fontSize:36,marginBottom:12}}>{mode==="pdf"?"📄":"🖼️"}</div><div style={{fontSize:15,fontWeight:600,marginBottom:6}}>Drop your {mode==="pdf"?"PDF":"image"} here</div><div style={{fontSize:13,color:"var(--text3)"}}>or click to browse</div></div>)}
            </div>
          </div>
        )}
        {err&&<div style={{fontSize:13,color:"var(--red)",marginBottom:12}}>{err}</div>}
        <button className="btn btn-neon" onClick={analyze} disabled={loading||(mode!=="text"&&!file)}>{loading?<><Spinner/> Analyzing...</>:"▣ Analyze Resume"}</button>
      </div>
      {res&&(
        <div className="fade-up" style={{display:"flex",flexDirection:"column",gap:18}}>
          <div style={{display:"grid",gridTemplateColumns:"180px 180px 1fr",gap:16}}>
            <div className="card" style={{padding:24,display:"flex",flexDirection:"column",alignItems:"center",gap:14}}><div style={{fontSize:10,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".12em"}}>ATS Score</div><DonutRing pct={res.atsScore} size={120} stroke={10} color="auto" label="ATS"/></div>
            <div className="card" style={{padding:24,display:"flex",flexDirection:"column",alignItems:"center",gap:14}}><div style={{fontSize:10,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".12em"}}>Overall</div><DonutRing pct={res.overallScore} size={120} stroke={10} color="var(--violet2)" label="Score"/></div>
            <div className="card" style={{padding:24}}><div style={{fontSize:10,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".12em",marginBottom:14}}>Section Breakdown</div>{Object.entries(res.sections||{}).map(([k,v])=><Bar key={k} label={SL[k]||k} value={v} height={5} color={v>=70?"var(--green)":v>=50?"var(--amber)":"var(--red)"}/>)}</div>
          </div>
          <div className="card" style={{padding:16,background:"linear-gradient(135deg,rgba(0,255,224,0.05),rgba(77,159,255,0.04))",borderColor:"rgba(0,255,224,0.15)",display:"flex",alignItems:"center",gap:16}}>
            <span className={`badge ${res.atsScore>=75?"b-green":res.atsScore>=55?"b-amber":"b-red"}`} style={{fontSize:14,padding:"8px 18px"}}>{res.verdict||"Analyzed"}</span>
            <div style={{fontSize:14,color:"var(--text2)"}}>{res.summary}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14}}>
            {[{title:"✅ Strengths",items:res.strengths,cls:"b-green"},{title:"💡 Improvements",items:res.improvements,cls:"b-amber"},{title:"🔑 Missing Keywords",items:res.missingKeywords,cls:"b-neon"},{title:"⚠️ Issues",items:[...(res.formatting||[]),...(res.grammarIssues||[])],cls:"b-red"}].map(g=>(
              <div key={g.title} className="card" style={{padding:16}}><div style={{fontSize:12,fontWeight:700,marginBottom:10}}>{g.title}</div><div style={{display:"flex",flexDirection:"column",gap:6}}>{g.items?.map((s,i)=><span key={i} className={`badge ${g.cls}`} style={{fontSize:11,alignSelf:"flex-start"}}>{s}</span>)}</div></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TrendsPage({onXP}) {
  const [domain,setDomain]=useState("AI & Machine Learning");
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [count,setCount]=useState(0);
  const domains=["AI & Machine Learning","Full Stack Web","Cybersecurity","Cloud & DevOps","Data Science","Mobile Dev","Blockchain","UI/UX Design"];
  async function fetch_(){
    setLoading(true);setData(null);
    try{
      const raw=await callClaude([{role:"user",content:`Job market for ${domain} India 2025. Return ONLY compact JSON: {"skills":[{"name":"React","demand":92,"yoy":"+15%","salary":"₹12-20 LPA"},{"name":"TypeScript","demand":85,"yoy":"+22%","salary":"₹10-18 LPA"},{"name":"Node.js","demand":80,"yoy":"+10%","salary":"₹10-16 LPA"},{"name":"AWS","demand":76,"yoy":"+18%","salary":"₹14-25 LPA"},{"name":"Docker","demand":72,"yoy":"+25%","salary":"₹12-22 LPA"}],"avgSalary":"₹14-28 LPA","topRoles":["Role1","Role2","Role3","Role4"],"emerging":["Tech1","Tech2","Tech3"],"companies":["Co1","Co2","Co3","Co4"],"outlook":"Positive","growth":"+34%","summary":"Two sentence market insight.","heatmap":[{"city":"Bangalore","score":95},{"city":"Hyderabad","score":88},{"city":"Mumbai","score":82},{"city":"Pune","score":76},{"city":"Chennai","score":72},{"city":"Delhi NCR","score":80}]}`}],"Return ONLY valid compact JSON.");
      setData(JSON.parse(cleanJSON(raw)));
      const nc=count+1;setCount(nc);
      if(nc>=3)onXP("trend_check");
      onXP("salary_check");
    }catch(e){console.error(e);}
    finally{setLoading(false);}
  }
  useEffect(()=>{fetch_();},[]);
  return (
    <div className="page-wrap">
      <SH eyebrow="Feature" title="MARKET INTEL" sub="Real-time job demand, salary benchmarks, and hiring trends."/>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
        {domains.map(d=><button key={d} onClick={()=>{setDomain(d);setTimeout(fetch_,0);}} className={d===domain?"btn btn-neon":"btn btn-ghost"} style={{fontSize:12,padding:"7px 16px"}}>{d}</button>)}
        <button className="btn btn-outline" onClick={fetch_} disabled={loading} style={{marginLeft:4}}>{loading?<Spinner size={14}/>:"⟳"}</button>
      </div>
      {loading&&<div style={{display:"flex",gap:14}}>{[1,2,3,4].map(i=><div key={i} className="skel" style={{width:200,height:100}}/>)}</div>}
      {data&&(
        <div className="fade-up" style={{display:"flex",flexDirection:"column",gap:18}}>
          <div className="g4">
            <StatCard icon="💰" value={data.avgSalary} label="Avg Salary" color="var(--green)"/>
            <StatCard icon="📈" value={data.growth} label="YoY Growth" color="var(--neon)"/>
            <StatCard icon="✨" value={data.outlook} label="Outlook" color={data.outlook==="Positive"?"var(--green)":"var(--amber)"}/>
            <StatCard icon="🏢" value={(data.companies?.length||0)+"+"} label="Top Companies" color="var(--blue)"/>
          </div>
          <p style={{fontSize:14,color:"var(--text2)",padding:"13px 18px",background:"var(--card)",borderRadius:10,border:"1px solid var(--border)",lineHeight:1.7}}>{data.summary}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div className="card" style={{padding:24}}>
              <div style={{fontFamily:"var(--fd)",fontSize:16,letterSpacing:".06em",marginBottom:18}}>SKILL DEMAND INDEX</div>
              {data.skills?.map((s,i)=>(
                <div key={s.name} style={{marginBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:13,fontWeight:600}}>{s.name}</span><span style={{fontSize:11,color:"var(--green)",fontFamily:"var(--fm)",fontWeight:600}}>{s.yoy}</span></div>
                    <div style={{textAlign:"right"}}><div style={{fontSize:12,color:"var(--text2)",fontFamily:"var(--fm)"}}>{s.demand}%</div><div style={{fontSize:10,color:"var(--text3)"}}>{s.salary}</div></div>
                  </div>
                  <div style={{height:7,background:"rgba(255,255,255,0.05)",borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${s.demand}%`,background:["var(--neon)","var(--blue)","var(--violet2)","var(--amber)","var(--pink)"][i%5],borderRadius:4,transition:"width 1s ease"}}/>
                  </div>
                </div>
              ))}
            </div>
            <div className="card" style={{padding:24}}>
              <div style={{fontFamily:"var(--fd)",fontSize:16,letterSpacing:".06em",marginBottom:18}}>CITY DEMAND HEATMAP</div>
              {data.heatmap?.sort((a,b)=>b.score-a.score).map((c,i)=>(
                <div key={c.city} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                  <div style={{width:24,fontSize:12,color:"var(--text3)",fontFamily:"var(--fm)",flexShrink:0}}>#{i+1}</div>
                  <div style={{width:90,fontSize:13,fontWeight:500}}>{c.city}</div>
                  <div style={{flex:1,height:8,background:"rgba(255,255,255,0.04)",borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:`${c.score}%`,background:`hsl(${c.score+80},80%,55%)`,opacity:.8,borderRadius:4,transition:"width 1s ease"}}/></div>
                  <div style={{width:32,fontSize:12,color:"var(--text2)",fontFamily:"var(--fm)",textAlign:"right"}}>{c.score}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
            {[{title:"💼 Top Roles",items:data.topRoles,cls:"b-violet"},{title:"🚀 Emerging Tech",items:data.emerging,cls:"b-amber"},{title:"🏢 Top Companies",items:data.companies,cls:"b-neon"}].map(g=>(
              <div key={g.title} className="card" style={{padding:20}}><div style={{fontSize:12,fontWeight:700,marginBottom:12}}>{g.title}</div><div style={{display:"flex",flexDirection:"column",gap:7}}>{g.items?.map((item,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"var(--text2)",padding:"5px 0",borderBottom:"1px solid var(--border)"}}><span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--text4)"}}>0{i+1}</span>{item}</div>)}</div></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ChatPage({onXP,user}) {
  const [msgs,setMsgs]=useState([{role:"assistant",content:`Hello${user?.name?` ${user.name}`:""}! I'm SkillBridge AI — your personal career mentor.\n\nAsk me anything about careers, skills, interviews, salaries, or learning paths. How can I help?`}]);
  const [inp,setInp]=useState("");
  const [loading,setLoading]=useState(false);
  const [count,setCount]=useState(0);
  const bottomRef=useRef();
  const chips=["How to become a Data Scientist?","Best AI/ML path 2025?","How to negotiate salary?","What to learn after React?","How to crack FAANG?"];
  async function send(msg){
    const m=msg||inp.trim();if(!m)return;
    setInp("");
    const newMsgs=[...msgs,{role:"user",content:m}];
    setMsgs(newMsgs);setLoading(true);
    try{
      const reply=await callClaude(newMsgs.map(x=>({role:x.role,content:x.content})),"You are SkillBridge AI — elite career intelligence advisor. Give sharp, structured, actionable advice. Use bullet points. Be direct. No fluff.");
      setMsgs(prev=>[...prev,{role:"assistant",content:reply}]);
      const nc=count+1;setCount(nc);
      if(nc>=10)onXP("chat_mentor");
    }catch{setMsgs(prev=>[...prev,{role:"assistant",content:"Error — please try again."}]);}
    setLoading(false);
  }
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);
  return (
    <div className="page-wrap" style={{display:"flex",flexDirection:"column",height:"calc(100vh - 60px)"}}>
      <SH eyebrow="Feature" title="AI MENTOR" sub="Real-time career guidance powered by Claude AI."/>
      {msgs.length<=1&&<div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:20}}>{chips.map(c=><button key={c} className="btn btn-ghost" style={{fontSize:12}} onClick={()=>send(c)}>{c}</button>)}</div>}
      <div className="chat-scroll" style={{flex:1,display:"flex",flexDirection:"column",gap:14,paddingBottom:16,paddingRight:4}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",gap:10,alignItems:"flex-start"}}>
            {m.role==="assistant"&&<div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,var(--neon2),var(--blue2))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,marginTop:2,boxShadow:"0 0 12px rgba(0,255,224,0.3)"}}>◉</div>}
            <div className={m.role==="user"?"bubble-user":"bubble-ai"}>{m.content}</div>
          </div>
        ))}
        {loading&&(
          <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,var(--neon2),var(--blue2))",display:"flex",alignItems:"center",justifyContent:"center"}}>◉</div>
            <div className="bubble-ai" style={{padding:"14px 18px"}}><div style={{display:"flex",gap:5}}>{[0,1,2].map(j=><div key={j} style={{width:6,height:6,borderRadius:"50%",background:"var(--neon)",animation:`pulse 1.2s ${j*0.25}s ease infinite`}}/>)}</div></div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>
      <div style={{padding:"14px 0 24px",borderTop:"1px solid var(--border)"}}>
        <div style={{display:"flex",gap:10}}>
          <input className="inp" placeholder="Ask anything about your career..." value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}/>
          <button className="btn btn-neon" onClick={()=>send()} disabled={loading||!inp.trim()} style={{whiteSpace:"nowrap",padding:"11px 24px"}}>Send →</button>
        </div>
      </div>
    </div>
  );
}

function InterviewPage({onXP}) {
  const [stage,setStage]=useState("setup");
  const [form,setForm]=useState({role:"",type:"Technical",level:"Mid Level"});
  const [qs,setQs]=useState([]);
  const [curr,setCurr]=useState(0);
  const [ans,setAns]=useState("");
  const [fb,setFb]=useState(null);
  const [all,setAll]=useState([]);
  const [loading,setLoading]=useState(false);
  async function start(){
    if(!form.role.trim())return;setLoading(true);
    try{
      const raw=await callClaude([{role:"user",content:`5 ${form.type} questions for ${form.level} ${form.role}. Return ONLY compact JSON: {"questions":["Q1?","Q2?","Q3?","Q4?","Q5?"]}`}],"Return ONLY valid compact JSON.");
      const d=JSON.parse(cleanJSON(raw));
      setQs(d.questions);setCurr(0);setAll([]);setStage("interview");
    }catch(e){console.error(e);}
    finally{setLoading(false);}
  }
  async function submitAns(){
    if(!ans.trim())return;setLoading(true);setFb(null);
    try{
      const raw=await callClaude([{role:"user",content:`Interview Q: "${qs[curr]}" for ${form.level} ${form.role}. Answer: "${ans}". Return ONLY compact JSON: {"score":7,"verdict":"Good","strengths":["s1","s2"],"gaps":["g1","g2"],"ideal":"Key points for a 10/10 answer.","tip":"One quick tip."}`}],"Return ONLY compact JSON.");
      const f=JSON.parse(cleanJSON(raw));
      setFb(f);setAll(prev=>[...prev,{q:qs[curr],a:ans,f}]);
    }catch(e){console.error(e);}
    finally{setLoading(false);}
  }
  function next(){
    if(curr<qs.length-1){setCurr(c=>c+1);setAns("");setFb(null);}
    else{
      setStage("results");
      onXP("interview_done");
      const avg=all.length?(all.reduce((a,x)=>a+x.f.score,0)/all.length):0;
      if(avg>=9)onXP("score_90");
    }
  }
  const avg=all.length?(all.reduce((a,x)=>a+x.f.score,0)/all.length).toFixed(1):0;
  return (
    <div className="page-wrap">
      <SH eyebrow="Feature" title="INTERVIEW SIM" sub="AI-powered mock interview with real-time scoring and feedback."/>
      {stage==="setup"&&(
        <div className="card fade-up" style={{padding:28}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:24}}>
            <div><label>Target Role</label><input className="inp" placeholder="Software Engineer..." value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/></div>
            <div><label>Type</label><select className="inp" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>{["Technical","HR/Behavioral","System Design","Mixed"].map(v=><option key={v}>{v}</option>)}</select></div>
            <div><label>Level</label><select className="inp" value={form.level} onChange={e=>setForm({...form,level:e.target.value})}>{["Fresher","Entry Level","Mid Level","Senior Level"].map(v=><option key={v}>{v}</option>)}</select></div>
          </div>
          <button className="btn btn-neon" onClick={start} disabled={loading||!form.role.trim()}>{loading?<><Spinner/> Generating...</>:"▷ Start Interview"}</button>
        </div>
      )}
      {stage==="interview"&&(
        <div>
          <div style={{display:"flex",gap:6,marginBottom:24}}>{qs.map((_,i)=><div key={i} style={{flex:1,height:4,borderRadius:2,background:i<curr?"var(--green)":i===curr?"var(--neon)":"var(--border2)",transition:"background .3s"}}/>)}</div>
          <div className="card" style={{padding:28,marginBottom:20,background:"linear-gradient(135deg,rgba(0,255,224,0.04),rgba(77,159,255,0.03))",borderColor:"rgba(0,255,224,0.15)"}}>
            <div style={{fontSize:10,color:"var(--neon)",textTransform:"uppercase",letterSpacing:".12em",marginBottom:10}}>Q{curr+1}/{qs.length} · {form.type}</div>
            <div style={{fontSize:18,fontWeight:600,lineHeight:1.6}}>{qs[curr]}</div>
          </div>
          {!fb&&<div><label>Your Answer</label><textarea className="inp" rows={6} placeholder="Type your answer..." value={ans} onChange={e=>setAns(e.target.value)} style={{marginBottom:12}}/><button className="btn btn-neon" onClick={submitAns} disabled={loading||!ans.trim()}>{loading?<><Spinner/> Evaluating...</>:"Submit →"}</button></div>}
          {fb&&(
            <div className="fade-up" style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{display:"grid",gridTemplateColumns:"140px 1fr",gap:16}}>
                <div className="card" style={{padding:20,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                  <DonutRing pct={fb.score*10} size={110} stroke={9} color="auto" label={`${fb.score}/10`} animate/>
                  <span className={`badge ${fb.score>=8?"b-green":fb.score>=6?"b-amber":"b-red"}`} style={{marginTop:10,fontSize:12}}>{fb.verdict}</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <div className="card" style={{padding:14}}><div style={{fontSize:11,color:"var(--green)",marginBottom:6,fontWeight:600}}>✅ STRENGTHS</div>{fb.strengths?.map(s=><div key={s} style={{fontSize:13,color:"var(--text2)",padding:"3px 0"}}>• {s}</div>)}</div>
                  <div className="card" style={{padding:14}}><div style={{fontSize:11,color:"var(--red)",marginBottom:6,fontWeight:600}}>⚠️ GAPS</div>{fb.gaps?.map(g=><div key={g} style={{fontSize:13,color:"var(--text2)",padding:"3px 0"}}>• {g}</div>)}</div>
                </div>
              </div>
              <div className="card" style={{padding:16,borderColor:"rgba(139,92,246,0.2)"}}><div style={{fontSize:11,color:"var(--violet2)",marginBottom:6,fontWeight:600}}>💡 IDEAL ANSWER</div><div style={{fontSize:13,color:"var(--text2)",lineHeight:1.7}}>{fb.ideal}</div></div>
              <div style={{display:"flex",gap:10}}>
                <div className="card" style={{padding:12,flex:1,borderColor:"rgba(0,255,224,0.15)",background:"rgba(0,255,224,0.04)"}}><span style={{fontSize:12,color:"var(--neon)"}}>⚡ {fb.tip}</span></div>
                <button className="btn btn-neon" onClick={next}>{curr<qs.length-1?"Next →":"View Results 🏆"}</button>
              </div>
            </div>
          )}
        </div>
      )}
      {stage==="results"&&(
        <div className="fade-up">
          <div className="card" style={{padding:36,textAlign:"center",marginBottom:20,background:"linear-gradient(135deg,rgba(0,255,224,0.05),rgba(77,159,255,0.04))"}}>
            <div style={{fontFamily:"var(--fd)",fontSize:72,color:avg>=7?"var(--green)":avg>=5?"var(--amber)":"var(--red)"}}>{avg}</div>
            <div style={{fontSize:14,color:"var(--text2)",marginTop:6}}>Average Score / 10 · {form.role}</div>
            <div style={{marginTop:14}}>{avg>=8?<span className="badge b-green">🏆 Outstanding — Interview Badge Earned!</span>:avg>=6?<span className="badge b-amber">👍 Good Performance</span>:<span className="badge b-red">📚 Needs More Practice</span>}</div>
          </div>
          {all.map((item,i)=>(
            <div key={i} className="card" style={{padding:16,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:13,fontWeight:600,marginBottom:4}}>Q{i+1}: {item.q.substring(0,80)}...</div><div style={{fontSize:12,color:"var(--text3)"}}>{item.f.verdict}</div></div>
              <DonutRing pct={item.f.score*10} size={60} stroke={6} color="auto" label={item.f.score} animate={false}/>
            </div>
          ))}
          <button className="btn btn-neon" onClick={()=>{setStage("setup");setAll([]);}} style={{marginTop:8}}>🔄 Try Again</button>
        </div>
      )}
    </div>
  );
}

function SalaryPage({onXP}) {
  const [form,setForm]=useState({role:"",skills:"",exp:"2",loc:"Bangalore",edu:"B.Tech/BE"});
  const [res,setRes]=useState(null);
  const [loading,setLoading]=useState(false);
  async function predict(){
    if(!form.role.trim())return;setLoading(true);setRes(null);
    try{
      const raw=await callClaude([{role:"user",content:`Salary: Role:${form.role}, Skills:${form.skills}, ${form.exp}yr, ${form.loc}, ${form.edu}. Return ONLY compact JSON: {"minStr":"₹8 LPA","avgStr":"₹13 LPA","maxStr":"₹20 LPA","factors":[{"name":"Experience","impact":75,"effect":"positive"},{"name":"Location","impact":60,"effect":"positive"},{"name":"Skills","impact":85,"effect":"positive"},{"name":"Education","impact":50,"effect":"neutral"}],"companies":["Co1","Co2","Co3","Co4"],"tips":["tip1","tip2","tip3"],"future3yr":"₹22-38 LPA","future5yr":"₹35-60 LPA","percentile":65,"vs_market":"12% above average"}`}],"Return ONLY valid compact JSON.");
      setRes(JSON.parse(cleanJSON(raw)));
      onXP("salary_check");
    }catch(e){console.error(e);}
    finally{setLoading(false);}
  }
  return (
    <div className="page-wrap">
      <SH eyebrow="Feature" title="SALARY ORACLE" sub="AI-powered compensation prediction based on your full profile."/>
      <div className="card fade-up" style={{padding:28,marginBottom:28}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:14,marginBottom:20}}>
          <div style={{gridColumn:"span 2"}}><label>Role</label><input className="inp" placeholder="Senior React Developer" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/></div>
          <div style={{gridColumn:"span 2"}}><label>Key Skills</label><input className="inp" placeholder="React, Node.js, AWS..." value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})}/></div>
          <div><label>Years Exp</label><input className="inp" type="number" min="0" max="30" value={form.exp} onChange={e=>setForm({...form,exp:e.target.value})}/></div>
          <div><label>City</label><select className="inp" value={form.loc} onChange={e=>setForm({...form,loc:e.target.value})}>{["Bangalore","Hyderabad","Mumbai","Pune","Chennai","Delhi NCR","Remote"].map(v=><option key={v}>{v}</option>)}</select></div>
          <div style={{gridColumn:"span 2"}}><label>Education</label><select className="inp" value={form.edu} onChange={e=>setForm({...form,edu:e.target.value})}>{["High School","Diploma","B.Tech/BE","BCA/BSc","MCA/M.Tech","MBA","PhD"].map(v=><option key={v}>{v}</option>)}</select></div>
          <div style={{display:"flex",alignItems:"flex-end"}}><button className="btn btn-neon" onClick={predict} disabled={loading||!form.role.trim()} style={{width:"100%",justifyContent:"center"}}>{loading?<><Spinner size={14}/> ...</>:"◆ Predict"}</button></div>
        </div>
      </div>
      {res&&(
        <div className="fade-up" style={{display:"flex",flexDirection:"column",gap:18}}>
          <div className="card" style={{padding:32,background:"linear-gradient(135deg,rgba(0,255,224,0.04),rgba(77,159,255,0.04))",borderColor:"rgba(0,255,224,0.15)"}}>
            <div style={{fontSize:10,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".12em",marginBottom:20,textAlign:"center"}}>Salary Range for {form.role} · {form.loc}</div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"flex-end",gap:32}}>
              <div style={{textAlign:"center"}}><div style={{fontSize:11,color:"var(--text3)",marginBottom:6}}>MINIMUM</div><div style={{fontFamily:"var(--fd)",fontSize:28,color:"var(--amber)"}}>{res.minStr}</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:11,color:"var(--text3)",marginBottom:6}}>AVERAGE</div><div style={{fontFamily:"var(--fd)",fontSize:52,color:"var(--green)",lineHeight:1}}>{res.avgStr}</div><div style={{fontSize:12,color:"var(--text3)",marginTop:6}}>{res.vs_market}</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:11,color:"var(--text3)",marginBottom:6}}>MAXIMUM</div><div style={{fontFamily:"var(--fd)",fontSize:28,color:"var(--neon)"}}>{res.maxStr}</div></div>
            </div>
            <div style={{maxWidth:400,margin:"24px auto 0",height:8,background:"rgba(255,255,255,0.06)",borderRadius:4,overflow:"hidden",position:"relative"}}>
              <div style={{position:"absolute",left:0,right:0,top:0,bottom:0,background:"linear-gradient(90deg,var(--amber),var(--green),var(--neon))",borderRadius:4,opacity:.8}}/>
              <div style={{position:"absolute",left:`${res.percentile||50}%`,top:-3,width:14,height:14,borderRadius:"50%",background:"#fff",border:"2px solid var(--green)",transform:"translateX(-50%)"}}/>
            </div>
            <div style={{maxWidth:400,margin:"6px auto 0",display:"flex",justifyContent:"space-between"}}><span style={{fontSize:10,color:"var(--text4)"}}>Low</span><span style={{fontSize:10,color:"var(--green)"}}>{res.percentile}th percentile</span><span style={{fontSize:10,color:"var(--text4)"}}>High</span></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
            <div className="card" style={{padding:22}}>
              <div style={{fontFamily:"var(--fd)",fontSize:15,letterSpacing:".06em",marginBottom:16}}>SALARY FACTORS</div>
              {res.factors?.map(f=><div key={f.name} style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:13}}>{f.name}</span><span className={`badge ${f.effect==="positive"?"b-green":"b-amber"}`} style={{fontSize:10}}>{f.impact}%</span></div><Bar label="" value={f.impact} height={5} color={f.effect==="positive"?"var(--green)":"var(--amber)"} showVal={false}/></div>)}
            </div>
            <div className="card" style={{padding:22}}>
              <div style={{fontFamily:"var(--fd)",fontSize:15,letterSpacing:".06em",marginBottom:16}}>GROWTH PATH</div>
              {[["Now",res.avgStr,"var(--neon)"],["3 Years",res.future3yr,"var(--blue)"],["5 Years",res.future5yr,"var(--violet2)"]].map(([t,v,c])=><div key={t} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid var(--border)",alignItems:"center"}}><span style={{fontSize:12,color:"var(--text3)"}}>{t}</span><span style={{fontFamily:"var(--fd)",fontSize:20,color:c}}>{v}</span></div>)}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div className="card" style={{padding:18,flex:1}}>
                <div style={{fontSize:12,color:"var(--violet2)",marginBottom:10,fontWeight:700}}>💡 BOOST SALARY</div>
                {res.tips?.map((t,i)=><div key={i} style={{fontSize:12,color:"var(--text2)",padding:"5px 0",borderBottom:"1px solid var(--border)",display:"flex",gap:6}}><span style={{color:"var(--violet2)"}}>{i+1}.</span>{t}</div>)}
              </div>
              <div className="card" style={{padding:18}}>
                <div style={{fontSize:12,color:"var(--amber)",marginBottom:10,fontWeight:700}}>🏢 TOP PAYERS</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{res.companies?.map(c=><span key={c} className="badge b-amber" style={{fontSize:11}}>{c}</span>)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [user,setUser]=useState(null);
  const [page,setPage]=useState("home");
  const [toasts,setToasts]=useState([]);
  const [confetti,setConfetti]=useState(false);
  const [sidebarOpen,setSidebarOpen]=useState(false);

  useEffect(()=>{
    const email=localStorage.getItem("sb_current");
    if(email){const d=localStorage.getItem(`sb_${email}`);if(d)setUser(JSON.parse(d));}
  },[]);

  function addToast(msg){const id=Date.now();setToasts(p=>[...p,{id,msg}]);setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),4000);}

  function handleXP(badgeId){
    if(!user)return;
    let u={...user};
    if(badgeId&&!u.badges.includes(badgeId)){
      u.badges=[...u.badges,badgeId];
      const badge=BADGES.find(b=>b.id===badgeId);
      if(badge){
        u.xp=(u.xp||0)+badge.xp;
        addToast(`🏅 Badge: ${badge.icon} ${badge.name} (+${badge.xp} XP)`);
        setConfetti(true);setTimeout(()=>setConfetti(false),3000);
      }
    }
    if(badgeId&&!(u.featuresUsed||[]).includes(badgeId)){
      u.featuresUsed=[...(u.featuresUsed||[]),badgeId];
      if(u.featuresUsed.length>=7&&!u.badges.includes("all_features")){
        u.badges=[...u.badges,"all_features"];u.xp=(u.xp||0)+300;
        addToast("⭐ SkillBridge Pro unlocked! (+300 XP)");
      }
    }
    if((u.streak||0)>=7&&!u.badges.includes("streak_7")){
      u.badges=[...u.badges,"streak_7"];u.xp=(u.xp||0)+200;
      addToast("🔥 Week Warrior badge! (+200 XP)");
    }
    saveUser(u);setUser(u);
  }

  function handleLogin(u){setUser(u);setPage("dashboard");}
  function handleLogout(){localStorage.removeItem("sb_current");setUser(null);setPage("home");}
  function handleUpdate(u){saveUser(u);setUser(u);}
  function changePage(p){setPage(p);setSidebarOpen(false);}

  if(!user)return(<><GS/><div className="orb orb1"/><div className="orb orb2"/>{toasts.map(t=><Toast key={t.id} msg={t.msg} onClose={()=>setToasts(p=>p.filter(x=>x.id!==t.id))}/>)}<AuthModal onLogin={handleLogin}/></>);

  const pp={user,setPage:changePage,onXP:handleXP,onUpdate:handleUpdate};
  const pages={
    home:()=><HomePage {...pp}/>,
    dashboard:()=><DashboardPage {...pp}/>,
    "skill-gap":()=><SkillGapPage {...pp}/>,
    roadmap:()=><RoadmapPage {...pp}/>,
    resume:()=><ResumePage {...pp}/>,
    trends:()=><TrendsPage {...pp}/>,
    chat:()=><ChatPage {...pp}/>,
    interview:()=><InterviewPage {...pp}/>,
    salary:()=><SalaryPage {...pp}/>,
    badges:()=><BadgesPage {...pp}/>,
    leaderboard:()=><LeaderboardPage {...pp}/>,
    profile:()=><ProfilePage {...pp}/>,
  };
  const Page=pages[page]||pages.home;

  return (
    <>
      <GS/>
      <div className="orb orb1"/><div className="orb orb2"/>
      {confetti&&<Confetti/>}
      {toasts.map(t=><Toast key={t.id} msg={t.msg} onClose={()=>setToasts(p=>p.filter(x=>x.id!==t.id))}/>)}
      <div className="app-shell">
        <Sidebar page={page} setPage={changePage} user={user} onLogout={handleLogout} open={sidebarOpen} onClose={()=>setSidebarOpen(false)}/>
        <div className="main-content">
          {/* Mobile top bar */}
          <div className="mobile-topbar">
            <button className="hamburger" onClick={()=>setSidebarOpen(o=>!o)}>☰</button>
            <div style={{fontFamily:"var(--fd)",fontSize:17,letterSpacing:".06em"}}>SKILL<span style={{color:"var(--neon)"}}>BRIDGE</span></div>
            <div style={{width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,var(--neon2),var(--blue2))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#000"}}>
              {user.name?.[0]?.toUpperCase()||"U"}
            </div>
          </div>
          <Page/>
        </div>
      </div>
    </>
  );
}
