import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════ */
const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Bebas+Neue&family=JetBrains+Mono:wght@400;500&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --black:#04060d;
      --dark:#080c18;
      --dark2:#0c1120;
      --dark3:#111827;
      --card:#0f1623;
      --card2:#141d2e;
      --border:rgba(255,255,255,0.06);
      --border2:rgba(255,255,255,0.11);
      --border3:rgba(255,255,255,0.18);

      --neon:#00ffe0;
      --neon2:#00c8b0;
      --neon3:rgba(0,255,224,0.12);
      --blue:#4d9fff;
      --blue2:#1a6fff;
      --violet:#8b5cf6;
      --violet2:#a78bfa;
      --pink:#f472b6;
      --amber:#f59e0b;
      --green:#10b981;
      --red:#ef4444;
      --orange:#f97316;

      --text:#e8edf7;
      --text2:#8b95b0;
      --text3:#4a5568;
      --text4:#2d3748;

      --fh:'Plus Jakarta Sans',sans-serif;
      --fd:'Bebas Neue',sans-serif;
      --fm:'JetBrains Mono',monospace;
      --r:16px; --rs:8px; --rxl:24px;
    }

    html{scroll-behavior:smooth}
    body{background:var(--black);color:var(--text);font-family:var(--fh);min-height:100vh;overflow-x:hidden}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:var(--dark)}
    ::-webkit-scrollbar-thumb{background:var(--neon2);border-radius:3px}

    /* ── Noise texture overlay ── */
    body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      opacity:0.4}

    /* ── Glow orbs ── */
    .orb{position:fixed;border-radius:50%;filter:blur(120px);pointer-events:none;z-index:0}
    .orb1{width:600px;height:600px;background:radial-gradient(circle,rgba(0,255,224,0.06) 0%,transparent 70%);top:-200px;right:-100px}
    .orb2{width:500px;height:500px;background:radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%);bottom:-100px;left:-150px}
    .orb3{width:400px;height:400px;background:radial-gradient(circle,rgba(77,159,255,0.05) 0%,transparent 70%);top:40%;left:30%}

    /* ── Glass cards ── */
    .card{background:var(--card);border:1px solid var(--border);border-radius:var(--r);position:relative;overflow:hidden}
    .card::before{content:'';position:absolute;inset:0;border-radius:var(--r);
      background:linear-gradient(135deg,rgba(255,255,255,0.03) 0%,transparent 60%);pointer-events:none}
    .card-glow{box-shadow:0 0 0 1px var(--border),0 20px 60px -10px rgba(0,0,0,0.5),0 0 80px -20px rgba(0,255,224,0.06)}

    /* ── Buttons ── */
    .btn{display:inline-flex;align-items:center;gap:8px;font-family:var(--fh);font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;border:none;outline:none}
    .btn-neon{background:linear-gradient(135deg,var(--neon2),#00a8f0);color:#000;padding:11px 26px;border-radius:50px;letter-spacing:.02em}
    .btn-neon:hover{transform:translateY(-2px);box-shadow:0 8px 30px -5px rgba(0,255,224,0.4)}
    .btn-neon:disabled{opacity:0.4;cursor:not-allowed;transform:none;box-shadow:none}
    .btn-outline{background:transparent;border:1px solid var(--border2);color:var(--text2);padding:10px 22px;border-radius:50px}
    .btn-outline:hover{border-color:var(--neon);color:var(--neon);background:var(--neon3)}
    .btn-ghost{background:transparent;border:1px solid var(--border);color:var(--text3);padding:7px 16px;border-radius:var(--rs);font-size:13px}
    .btn-ghost:hover{border-color:var(--border2);color:var(--text2)}

    /* ── Inputs ── */
    .inp{background:var(--dark3);border:1px solid var(--border2);color:var(--text);font-family:var(--fh);font-size:14px;border-radius:var(--rs);padding:11px 14px;width:100%;outline:none;transition:border-color .2s,box-shadow .2s}
    .inp:focus{border-color:var(--neon);box-shadow:0 0 0 3px rgba(0,255,224,0.08)}
    .inp::placeholder{color:var(--text4)}
    textarea.inp{resize:vertical;min-height:80px}

    /* ── Tags/Badges ── */
    .badge{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:50px;font-size:12px;font-weight:600;letter-spacing:.02em}
    .b-neon{background:rgba(0,255,224,0.1);color:var(--neon);border:1px solid rgba(0,255,224,0.2)}
    .b-blue{background:rgba(77,159,255,0.1);color:var(--blue);border:1px solid rgba(77,159,255,0.2)}
    .b-violet{background:rgba(139,92,246,0.12);color:var(--violet2);border:1px solid rgba(139,92,246,0.25)}
    .b-green{background:rgba(16,185,129,0.1);color:var(--green);border:1px solid rgba(16,185,129,0.2)}
    .b-amber{background:rgba(245,158,11,0.1);color:var(--amber);border:1px solid rgba(245,158,11,0.2)}
    .b-red{background:rgba(239,68,68,0.1);color:var(--red);border:1px solid rgba(239,68,68,0.2)}
    .b-pink{background:rgba(244,114,182,0.1);color:var(--pink);border:1px solid rgba(244,114,182,0.2)}
    .b-orange{background:rgba(249,115,22,0.1);color:var(--orange);border:1px solid rgba(249,115,22,0.2)}

    /* ── Nav ── */
    .nav-link{display:flex;align-items:center;gap:10px;padding:9px 13px;border-radius:10px;cursor:pointer;transition:all .2s;font-size:13.5px;color:var(--text3);border:1px solid transparent;user-select:none;position:relative}
    .nav-link:hover{color:var(--text2);background:rgba(255,255,255,0.03)}
    .nav-link.active{color:var(--neon);background:rgba(0,255,224,0.07);border-color:rgba(0,255,224,0.12)}
    .nav-link.active::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:60%;background:var(--neon);border-radius:0 3px 3px 0}

    /* ── Animations ── */
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(0,255,224,0.2)}50%{box-shadow:0 0 40px rgba(0,255,224,0.5)}}
    @keyframes countUp{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
    @keyframes dash{to{stroke-dashoffset:0}}

    .fade-up{animation:fadeUp .4s ease both}
    .spin{animation:spin .7s linear infinite}
    .pulse-anim{animation:pulse 2s ease infinite}
    .float-anim{animation:float 3s ease-in-out infinite}

    /* ── Skeleton loader ── */
    .skel{background:linear-gradient(90deg,var(--dark3) 25%,var(--card2) 50%,var(--dark3) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:var(--rs)}

    /* ── Progress ring ── */
    .ring-track{fill:none;stroke:rgba(255,255,255,0.05)}
    .ring-fill{fill:none;stroke-linecap:round;transition:stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)}

    /* ── Hexagon ── */
    .hex{clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);display:flex;align-items:center;justify-content:center}

    /* ── Chat bubbles ── */
    .bubble-ai{background:var(--card2);border:1px solid var(--border);border-radius:4px 18px 18px 18px;padding:13px 17px;font-size:14px;line-height:1.75;max-width:82%;color:var(--text);white-space:pre-wrap}
    .bubble-user{background:linear-gradient(135deg,rgba(0,200,176,0.15),rgba(77,159,255,0.12));border:1px solid rgba(0,255,224,0.15);border-radius:18px 4px 18px 18px;padding:13px 17px;font-size:14px;line-height:1.75;max-width:82%;margin-left:auto;color:var(--text)}

    /* ── Upload zone ── */
    .upload-zone{border:2px dashed var(--border2);border-radius:var(--r);padding:40px 20px;text-align:center;cursor:pointer;transition:all .25s}
    .upload-zone:hover,.upload-zone.drag-over{border-color:var(--neon);background:var(--neon3)}

    /* ── Hexagon spider chart ── */
    .spider-label{font-size:11px;fill:var(--text2);font-family:'Plus Jakarta Sans',sans-serif}

    /* ── Scrollbar in chat ── */
    .chat-scroll{overflow-y:auto;scroll-behavior:smooth}
    .chat-scroll::-webkit-scrollbar{width:2px}
    .chat-scroll::-webkit-scrollbar-thumb{background:var(--border2)}

    /* ── Tooltip ── */
    .tip{position:relative}
    .tip::after{content:attr(data-tip);position:absolute;bottom:120%;left:50%;transform:translateX(-50%);background:var(--dark3);color:var(--text);font-size:11px;padding:5px 10px;border-radius:6px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .2s;border:1px solid var(--border2)}
    .tip:hover::after{opacity:1}

    select.inp option{background:var(--dark3);color:var(--text)}

    label{font-size:12.5px;color:var(--text2);margin-bottom:5px;display:block;font-weight:500;letter-spacing:.02em}
  `}</style>
);

/* ═══════════════════════════════════════════════════════════
   API
═══════════════════════════════════════════════════════════ */
async function callClaude(messages, system = "", imageData = null) {
  let msgs = messages;
  if (imageData) {
    const lastUser = msgs[msgs.length - 1];
    if (lastUser.role === "user") {
      const parts = [];
      if (imageData.type === "image") {
        parts.push({ type: "image", source: { type: "base64", media_type: imageData.mediaType, data: imageData.data } });
      } else if (imageData.type === "document") {
        parts.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: imageData.data } });
      }
      parts.push({ type: "text", text: lastUser.content });
      msgs = [...msgs.slice(0, -1), { role: "user", content: parts }];
    }
  }
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, system, messages: msgs }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content.map(b => b.text || "").join("");
}

function cleanJSON(raw) {
  return raw.replace(/```json[\s\S]*?```|```[\s\S]*?```/g, m => m.replace(/```json|```/g, "")).replace(/```/g, "").trim();
}

/* ═══════════════════════════════════════════════════════════
   VISUAL COMPONENTS
═══════════════════════════════════════════════════════════ */

/* Animated Donut Ring */
function DonutRing({ pct, size = 140, stroke = 10, color = "var(--neon)", label, sublabel, animate = true }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const [curr, setCurr] = useState(0);
  useEffect(() => { if (animate) { const t = setTimeout(() => setCurr(pct), 100); return () => clearTimeout(t); } else setCurr(pct); }, [pct]);
  const offset = circ - (curr / 100) * circ;
  const grade = pct >= 80 ? "var(--green)" : pct >= 60 ? "var(--neon)" : pct >= 40 ? "var(--amber)" : "var(--red)";
  const c = color === "auto" ? grade : color;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} className="ring-track" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} className="ring-fill" strokeWidth={stroke} stroke={c}
          strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <span style={{ fontFamily: "var(--fd)", fontSize: size * 0.22, color: c, lineHeight: 1 }}>{curr}</span>
        <span style={{ fontSize: 10, color: "var(--text3)", lineHeight: 1, marginTop: 2 }}>{label}</span>
        {sublabel && <span style={{ fontSize: 9, color: "var(--text4)", marginTop: 1 }}>{sublabel}</span>}
      </div>
    </div>
  );
}

/* Horizontal bar */
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

/* Spider/Radar SVG chart */
function RadarChart({ data, size = 240 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const n = data.length;
  const points = (vals, scale = 1) => vals.map((v, i) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    const d = (v / 100) * r * scale;
    return [cx + d * Math.cos(a), cy + d * Math.sin(a)];
  });
  const rings = [0.25, 0.5, 0.75, 1];
  const axes = data.map((_, i) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  const [anim, setAnim] = useState(data.map(() => 0));
  useEffect(() => { const t = setTimeout(() => setAnim(data.map(d => d.value)), 200); return () => clearTimeout(t); }, []);
  const filledPts = points(anim);
  const poly = filledPts.map(p => p.join(",")).join(" ");
  const labelPts = points(data.map(() => 100), 1.22);
  return (
    <svg width={size} height={size} style={{ overflow: "visible" }}>
      {rings.map(sc => {
        const rp = points(data.map(() => 100), sc);
        return <polygon key={sc} points={rp.map(p => p.join(",")).join(" ")} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />;
      })}
      {axes.map(([x, y], i) => <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />)}
      <polygon points={poly} fill="rgba(0,255,224,0.08)" stroke="var(--neon)" strokeWidth={1.5} style={{ transition: "all 1.2s cubic-bezier(.4,0,.2,1)" }} />
      {filledPts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.5} fill="var(--neon)" style={{ filter: "drop-shadow(0 0 4px var(--neon))" }} />
      ))}
      {labelPts.map(([x, y], i) => (
        <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="spider-label" fontSize={10}>{data[i].label}</text>
      ))}
    </svg>
  );
}

/* Stacked column mini chart */
function BarChart({ data, height = 120 }) {
  const max = Math.max(...data.map(d => d.value));
  const colors = ["var(--neon)", "var(--blue)", "var(--violet2)", "var(--amber)", "var(--pink)", "var(--green)"];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height, paddingBottom: 20, position: "relative" }}>
      <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, top: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {[100, 75, 50, 25].map(v => <div key={v} style={{ borderTop: "1px dashed rgba(255,255,255,0.04)", position: "relative" }}><span style={{ fontSize: 9, color: "var(--text4)", position: "absolute", right: "100%", paddingRight: 4, top: -6 }}>{v}</span></div>)}
      </div>
      {data.map((d, i) => {
        const pct = (d.value / max) * 100;
        const [h, setH] = useState(0);
        useEffect(() => { const t = setTimeout(() => setH(pct), 100 + i * 60); return () => clearTimeout(t); }, []);
        return (
          <div key={d.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%", justifyContent: "flex-end" }}>
            <div style={{ width: "100%", height: `${h}%`, background: colors[i % colors.length], borderRadius: "4px 4px 0 0", opacity: 0.85, transition: `height 0.9s cubic-bezier(.4,0,.2,1) ${i * 0.06}s`, minWidth: 12 }} />
            <span style={{ fontSize: 9, color: "var(--text3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%", textAlign: "center" }}>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* Spinner */
const Spinner = ({ size = 18 }) => (
  <div style={{ width: size, height: size, border: `2px solid rgba(0,255,224,0.2)`, borderTopColor: "var(--neon)", borderRadius: "50%", animation: "spin .65s linear infinite", flexShrink: 0 }} />
);

/* Stat card */
function StatCard({ icon, value, label, sub, color = "var(--neon)", delay = 0 }) {
  return (
    <div className="card card-glow fade-up" style={{ padding: "22px 20px", animationDelay: `${delay}ms` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{icon}</div>
        {sub && <span className="badge b-green" style={{ fontSize: 11 }}>{sub}</span>}
      </div>
      <div style={{ fontFamily: "var(--fd)", fontSize: 32, color, letterSpacing: ".02em", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 6, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

/* Section header */
const SH = ({ eyebrow, title, sub }) => (
  <div style={{ marginBottom: 32 }} className="fade-up">
    {eyebrow && <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--neon)", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 20, height: 1, background: "var(--neon)" }} />{eyebrow}<div style={{ width: 20, height: 1, background: "var(--neon)" }} />
    </div>}
    <h1 style={{ fontFamily: "var(--fd)", fontSize: 42, letterSpacing: ".04em", lineHeight: 1.05, color: "var(--text)", marginBottom: 10 }}>{title}</h1>
    {sub && <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, maxWidth: 580 }}>{sub}</p>}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════════════ */
const NAVS = [
  { id: "home", icon: "⬡", label: "Overview" },
  { id: "dashboard", icon: "◈", label: "Dashboard" },
  { id: "skill-gap", icon: "◎", label: "Skill Matrix" },
  { id: "roadmap", icon: "⬢", label: "Roadmap" },
  { id: "resume", icon: "▣", label: "Resume AI" },
  { id: "trends", icon: "△", label: "Market Intel" },
  { id: "chat", icon: "◉", label: "AI Mentor" },
  { id: "interview", icon: "▷", label: "Interview Sim" },
  { id: "salary", icon: "◆", label: "Salary Oracle" },
];

function Sidebar({ page, setPage }) {
  return (
    <aside style={{ width: 230, minHeight: "100vh", background: "linear-gradient(180deg,var(--dark) 0%,var(--dark2) 100%)", borderRight: "1px solid var(--border)", padding: "0 10px 24px", flexShrink: 0, position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", zIndex: 10 }}>
      {/* Logo */}
      <div style={{ padding: "22px 10px 18px", borderBottom: "1px solid var(--border)", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,var(--neon2),var(--blue2))", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 900, color: "#000", flexShrink: 0 }}>SB</div>
          <div>
            <div style={{ fontFamily: "var(--fd)", fontSize: 18, letterSpacing: ".06em", color: "var(--text)", lineHeight: 1 }}>SKILL<span style={{ color: "var(--neon)" }}>BRIDGE</span></div>
            <div style={{ fontSize: 9, color: "var(--text4)", letterSpacing: ".15em", textTransform: "uppercase", marginTop: 2 }}>Career Intelligence</div>
          </div>
        </div>
      </div>

      {/* Status pill */}
      <div style={{ padding: "6px 12px", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--fm)" }}>AI systems online</span>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
        {NAVS.map(n => (
          <div key={n.id} className={`nav-link${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
            <span style={{ fontSize: 14, fontFamily: "var(--fm)", opacity: 0.7 }}>{n.icon}</span>
            <span style={{ fontSize: 13 }}>{n.label}</span>
          </div>
        ))}
      </nav>

      {/* Bottom widget */}
      <div style={{ marginTop: 12, padding: "14px", background: "linear-gradient(135deg,rgba(0,255,224,0.06),rgba(77,159,255,0.06))", borderRadius: 12, border: "1px solid rgba(0,255,224,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,var(--neon2),var(--blue2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🤖</div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--neon)" }}>Claude AI</span>
        </div>
        <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6 }}>Powered by Claude Sonnet 4. Real-time intelligence.</div>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOME
═══════════════════════════════════════════════════════════ */
function HomePage({ setPage }) {
  const features = [
    { id: "skill-gap", icon: "◎", title: "Skill Matrix", desc: "AI-powered gap analysis with radar visualization", color: "var(--neon)" },
    { id: "roadmap", icon: "⬢", title: "Career Roadmap", desc: "Personalized month-by-month learning timeline", color: "var(--blue)" },
    { id: "resume", icon: "▣", title: "Resume AI", desc: "PDF & image upload with ATS scoring", color: "var(--violet2)" },
    { id: "trends", icon: "△", title: "Market Intel", desc: "Live demand charts & salary benchmarks", color: "var(--amber)" },
    { id: "chat", icon: "◉", title: "AI Mentor", desc: "Real-time career guidance chatbot", color: "var(--pink)" },
    { id: "interview", icon: "▷", title: "Interview Sim", desc: "Scored mock interviews with AI feedback", color: "var(--green)" },
  ];

  const stats = [
    { icon: "🎯", value: "500K+", label: "Skills Analyzed", sub: "↑14%", color: "var(--neon)", delay: 0 },
    { icon: "🗺️", value: "98%", label: "Prediction Accuracy", sub: "↑2%", color: "var(--blue)", delay: 80 },
    { icon: "💼", value: "12K+", label: "Career Paths Mapped", sub: "↑8%", color: "var(--violet2)", delay: 160 },
    { icon: "⚡", value: "50+", label: "Industries Covered", sub: "live", color: "var(--amber)", delay: 240 },
  ];

  return (
    <div style={{ padding: "44px 52px", maxWidth: 1100, position: "relative", zIndex: 1 }}>
      {/* Hero */}
      <div style={{ marginBottom: 64 }}>
        <div className="badge b-neon fade-up" style={{ marginBottom: 24, fontSize: 12, padding: "7px 18px" }}>⚡ Next-Gen Career Intelligence Platform</div>
        <h1 className="fade-up" style={{ fontFamily: "var(--fd)", fontSize: 68, letterSpacing: ".05em", lineHeight: 1, marginBottom: 24, animationDelay: "60ms" }}>
          BRIDGE THE GAP<br />
          <span style={{ WebkitTextStroke: "1px var(--neon)", color: "transparent" }}>BETWEEN NOW</span><br />
          <span style={{ color: "var(--neon)" }}>& YOUR FUTURE</span>
        </h1>
        <p className="fade-up" style={{ fontSize: 16, color: "var(--text2)", maxWidth: 540, lineHeight: 1.8, marginBottom: 36, animationDelay: "120ms" }}>
          AI-powered skill gap analysis, career roadmaps, and real-time market intelligence — all in one unified platform.
        </p>
        <div className="fade-up" style={{ display: "flex", gap: 12, animationDelay: "180ms" }}>
          <button className="btn btn-neon" onClick={() => setPage("skill-gap")}>⬡ Analyze My Skills</button>
          <button className="btn btn-outline" onClick={() => setPage("dashboard")}>◈ View Dashboard</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 56 }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Features */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--neon)", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 20, height: 1, background: "var(--neon)" }} />CORE MODULES
        </div>
        <h2 style={{ fontFamily: "var(--fd)", fontSize: 32, letterSpacing: ".04em", marginBottom: 28 }}>SIX POWERFUL TOOLS</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {features.map((f, i) => (
          <div key={f.id} className="card fade-up" style={{ padding: 24, cursor: "pointer", transition: "all .25s", animationDelay: `${i * 60}ms`, borderColor: "transparent" }}
            onClick={() => setPage(f.id)}
            onMouseEnter={e => { e.currentTarget.style.borderColor = f.color + "40"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 20px 50px -10px ${f.color}20`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ fontFamily: "var(--fm)", fontSize: 28, color: f.color, marginBottom: 14, opacity: 0.8 }}>{f.icon}</div>
            <div style={{ fontFamily: "var(--fd)", fontSize: 20, letterSpacing: ".04em", color: "var(--text)", marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.65 }}>{f.desc}</div>
            <div style={{ marginTop: 18, fontSize: 12, color: f.color, display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}>Open →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════ */
function DashboardPage({ setPage }) {
  const skillScore = 72;
  const radarData = [
    { label: "Frontend", value: 80 }, { label: "Backend", value: 55 },
    { label: "AI/ML", value: 40 }, { label: "DevOps", value: 35 },
    { label: "System Design", value: 60 }, { label: "Soft Skills", value: 85 },
  ];
  const activity = [
    { icon: "◎", action: "Skill gap analyzed", meta: "Full Stack Dev · 73% match", time: "2h ago", color: "var(--neon)" },
    { icon: "▣", action: "Resume scored", meta: "ATS: 81/100 · 5 keywords missing", time: "Yesterday", color: "var(--green)" },
    { icon: "▷", action: "Mock interview", meta: "React Engineer · Score 8.2/10", time: "2 days ago", color: "var(--violet2)" },
    { icon: "⬢", action: "Roadmap generated", meta: "Data Scientist · 6-month plan", time: "4 days ago", color: "var(--blue)" },
  ];
  const trending = [
    { skill: "Prompt Engineering", growth: "+68%", color: "var(--neon)" },
    { skill: "AI/ML Engineering", growth: "+42%", color: "var(--blue)" },
    { skill: "Cloud Architecture", growth: "+35%", color: "var(--violet2)" },
    { skill: "Cybersecurity", growth: "+29%", color: "var(--amber)" },
    { skill: "React / Next.js", growth: "+18%", color: "var(--green)" },
  ];
  const jobDemand = [
    { label: "AI/ML", value: 95 }, { label: "Cloud", value: 88 }, { label: "Security", value: 80 },
    { label: "Frontend", value: 75 }, { label: "Backend", value: 71 }, { label: "DevOps", value: 68 },
  ];

  return (
    <div style={{ padding: "44px 52px", maxWidth: 1200, position: "relative", zIndex: 1 }}>
      <SH eyebrow="Command Center" title="YOUR DASHBOARD" sub="Track your career intelligence metrics at a glance." />

      {/* Top row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        <StatCard icon="⚡" value="72" label="Career Readiness Score" sub="↑5pts" color="var(--neon)" delay={0} />
        <StatCard icon="◎" value="4" label="Skills Analyzed" sub="this week" color="var(--blue)" delay={80} />
        <StatCard icon="▣" value="81%" label="Resume ATS Score" sub="↑12%" color="var(--green)" delay={160} />
        <StatCard icon="▷" value="8.2" label="Interview Avg Score" sub="/10" color="var(--violet2)" delay={240} />
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Radar */}
        <div className="card fade-up" style={{ padding: 24, animationDelay: "60ms" }}>
          <div style={{ fontFamily: "var(--fd)", fontSize: 16, letterSpacing: ".06em", marginBottom: 4 }}>SKILL RADAR</div>
          <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 16 }}>Across 6 dimensions</div>
          <div style={{ display: "flex", justifyContent: "center" }}><RadarChart data={radarData} size={200} /></div>
        </div>

        {/* Score ring */}
        <div className="card fade-up" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", animationDelay: "120ms" }}>
          <div style={{ fontFamily: "var(--fd)", fontSize: 16, letterSpacing: ".06em", marginBottom: 20 }}>CAREER READINESS</div>
          <DonutRing pct={skillScore} size={160} stroke={12} color="auto" label="Score" />
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            {[["Technical", 68, "var(--blue)"], ["Soft Skills", 85, "var(--green)"]].map(([l, v, c]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--fd)", fontSize: 22, color: c }}>{v}</div>
                <div style={{ fontSize: 10, color: "var(--text3)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Job demand bars */}
        <div className="card fade-up" style={{ padding: 24, animationDelay: "180ms" }}>
          <div style={{ fontFamily: "var(--fd)", fontSize: 16, letterSpacing: ".06em", marginBottom: 4 }}>JOB DEMAND</div>
          <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 20 }}>Market demand index</div>
          <BarChart data={jobDemand} height={140} />
        </div>
      </div>

      {/* Bottom grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Recent activity */}
        <div className="card fade-up" style={{ padding: 24, animationDelay: "240ms" }}>
          <div style={{ fontFamily: "var(--fd)", fontSize: 16, letterSpacing: ".06em", marginBottom: 20 }}>RECENT ACTIVITY</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {activity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "11px 13px", background: "var(--dark3)", borderRadius: 10, border: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--fm)", fontSize: 16, color: a.color, flexShrink: 0 }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{a.action}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{a.meta}</div>
                </div>
                <div style={{ fontSize: 10, color: "var(--text4)", whiteSpace: "nowrap", alignSelf: "center" }}>{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div className="card fade-up" style={{ padding: 24, animationDelay: "300ms" }}>
          <div style={{ fontFamily: "var(--fd)", fontSize: 16, letterSpacing: ".06em", marginBottom: 20 }}>TRENDING SKILLS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {trending.map((t, i) => (
              <div key={t.skill} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 13px", background: "var(--dark3)", borderRadius: 10, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: "var(--fd)", fontSize: 22, color: "var(--text4)", lineHeight: 1 }}>0{i+1}</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{t.skill}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: t.color, fontFamily: "var(--fm)" }}>{t.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SKILL GAP
═══════════════════════════════════════════════════════════ */
function SkillGapPage() {
  const [form, setForm] = useState({ skills: "", role: "", exp: "1-2 years" });
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function analyze() {
    if (!form.skills.trim() || !form.role.trim()) { setErr("Fill in your skills and target role."); return; }
    setErr(""); setLoading(true); setRes(null);
    try {
      const raw = await callClaude([{ role: "user", content: `Skill gap for: Current Skills: ${form.skills}, Target: ${form.role}, Exp: ${form.exp}. Return ONLY compact JSON no markdown: {"matchPct":45,"strengths":["s1","s2","s3"],"missing":["m1","m2","m3","m4"],"weakAreas":["w1","w2"],"recommended":["r1","r2","r3"],"radar":[{"label":"Programming","value":70},{"label":"System Design","value":40},{"label":"AI/ML","value":20},{"label":"Cloud","value":55},{"label":"Databases","value":65},{"label":"DevOps","value":30}],"timeline":"4 months","summary":"One sentence.","courses":["Course 1","Course 2","Course 3"]}` }], "Return ONLY valid compact JSON, no markdown blocks, no explanation.");
      setRes(JSON.parse(cleanJSON(raw)));
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ padding: "44px 52px", maxWidth: 1000, position: "relative", zIndex: 1 }}>
      <SH eyebrow="Feature" title="SKILL MATRIX" sub="AI compares your current skills against market requirements and visualizes the gaps." />

      <div className="card fade-up" style={{ padding: 28, marginBottom: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 180px", gap: 16, marginBottom: 20 }}>
          <div>
            <label>Current Skills</label>
            <textarea className="inp" rows={3} placeholder="Python, React, SQL, Docker..." value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} />
          </div>
          <div>
            <label>Target Role</label>
            <input className="inp" placeholder="e.g. Senior AI Engineer" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ marginBottom: 10 }} />
            <label>Experience</label>
            <select className="inp" value={form.exp} onChange={e => setForm({ ...form, exp: e.target.value })}>
              {["Fresher","1-2 years","2-5 years","5+ years"].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10 }}>
            {err && <div style={{ fontSize: 12, color: "var(--red)" }}>{err}</div>}
            <button className="btn btn-neon" onClick={analyze} disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
              {loading ? <><Spinner /> Analyzing...</> : "◎ Analyze"}
            </button>
          </div>
        </div>
      </div>

      {res && (
        <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Top row: ring + radar + score breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: 16 }}>
            {/* Match ring */}
            <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 14, textTransform: "uppercase", letterSpacing: ".1em" }}>Match Score</div>
              <DonutRing pct={res.matchPct} size={130} stroke={11} color="auto" label="%" />
              <div style={{ marginTop: 14, fontSize: 12, color: "var(--text2)", textAlign: "center", lineHeight: 1.6 }}>{res.summary}</div>
            </div>
            {/* Radar */}
            <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".1em", alignSelf: "flex-start" }}>Skill Dimensions</div>
              <RadarChart data={res.radar} size={210} />
            </div>
            {/* Bars */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 16, textTransform: "uppercase", letterSpacing: ".1em" }}>Dimension Breakdown</div>
              {res.radar.map(r => <Bar key={r.label} label={r.label} value={r.value} color={r.value >= 70 ? "var(--green)" : r.value >= 45 ? "var(--amber)" : "var(--red)"} />)}
            </div>
          </div>

          {/* Skills grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
            {[
              { title: "✅ Strengths", items: res.strengths, cls: "b-green", border: "rgba(16,185,129,0.2)" },
              { title: "❌ Missing", items: res.missing, cls: "b-red", border: "rgba(239,68,68,0.2)" },
              { title: "⚠️ Weak Areas", items: res.weakAreas, cls: "b-amber", border: "rgba(245,158,11,0.2)" },
              { title: "🚀 Learn Next", items: res.recommended, cls: "b-neon", border: "rgba(0,255,224,0.2)" },
            ].map(g => (
              <div key={g.title} className="card" style={{ padding: 18, borderColor: g.border }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{g.title}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {g.items.map(s => <span key={s} className={`badge ${g.cls}`} style={{ fontSize: 11 }}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Timeline + courses */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="card" style={{ padding: 20, background: "linear-gradient(135deg,rgba(0,255,224,0.04),rgba(77,159,255,0.04))", borderColor: "rgba(0,255,224,0.15)" }}>
              <div style={{ fontSize: 11, color: "var(--neon)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".1em" }}>Estimated Timeline</div>
              <div style={{ fontFamily: "var(--fd)", fontSize: 40, color: "var(--neon)" }}>{res.timeline}</div>
              <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 4 }}>to bridge the skill gap for {form.role}</div>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 11, color: "var(--violet2)", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".1em" }}>Recommended Courses</div>
              {res.courses?.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid var(--border)", fontSize: 13, color: "var(--text2)" }}>
                  <span style={{ fontFamily: "var(--fm)", color: "var(--violet2)", fontSize: 12 }}>0{i+1}</span>{c}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROADMAP
═══════════════════════════════════════════════════════════ */
function RoadmapPage() {
  const [form, setForm] = useState({ role: "", skills: "", dur: "6" });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function generate() {
    if (!form.role.trim()) { setErr("Enter a target role."); return; }
    setErr(""); setLoading(true); setData(null);
    try {
      const raw = await callClaude([{ role: "user", content: `${form.dur}-month career roadmap to become ${form.role}. Current skills: ${form.skills||"none"}. Return ONLY compact JSON: {"title":"string","months":[{"month":1,"phase":"Phase name","topics":["t1","t2","t3"],"project":"project idea","milestone":"milestone","hours":40}],"finalGoal":"string","resources":["r1","r2","r3"],"salary":"₹X-Y LPA after completion"}` }], "Return ONLY valid compact JSON, no markdown, no code blocks.");
      setData(JSON.parse(cleanJSON(raw)));
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  }

  const phaseColors = ["var(--neon)", "var(--blue)", "var(--violet2)", "var(--amber)", "var(--pink)", "var(--green)", "var(--orange)", "var(--red)"];

  return (
    <div style={{ padding: "44px 52px", maxWidth: 1000, position: "relative", zIndex: 1 }}>
      <SH eyebrow="Feature" title="CAREER ROADMAP" sub="Get a personalized, visual learning timeline crafted by AI." />

      <div className="card fade-up" style={{ padding: 28, marginBottom: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 160px 120px", gap: 14, alignItems: "flex-end" }}>
          <div><label>Target Role</label><input className="inp" placeholder="Data Scientist, DevOps..." value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></div>
          <div><label>Current Skills (optional)</label><input className="inp" placeholder="Python, SQL..." value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} /></div>
          <div><label>Duration</label>
            <select className="inp" value={form.dur} onChange={e => setForm({ ...form, dur: e.target.value })}>
              {["3","4","5","6","8","12"].map(v => <option key={v}>{v} months</option>)}
            </select>
          </div>
          <div>
            {err && <div style={{ fontSize: 11, color: "var(--red)", marginBottom: 6 }}>{err}</div>}
            <button className="btn btn-neon" onClick={generate} disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
              {loading ? <><Spinner size={14} /> ...</> : "⬢ Generate"}
            </button>
          </div>
        </div>
      </div>

      {data && (
        <div className="fade-up">
          {/* Header banner */}
          <div className="card" style={{ padding: 24, marginBottom: 20, background: "linear-gradient(135deg,rgba(0,255,224,0.06),rgba(77,159,255,0.05))", borderColor: "rgba(0,255,224,0.18)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontFamily: "var(--fd)", fontSize: 22, letterSpacing: ".04em", marginBottom: 6 }}>{data.title}</div>
                <div style={{ fontSize: 13, color: "var(--text2)" }}>🏆 {data.finalGoal}</div>
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--fd)", fontSize: 28, color: "var(--neon)" }}>{data.months?.length}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)" }}>Months</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--fd)", fontSize: 28, color: "var(--green)" }}>{data.salary || "High"}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)" }}>Expected CTC</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar overview */}
          <div className="card" style={{ padding: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 14, textTransform: "uppercase", letterSpacing: ".1em" }}>Roadmap Progress</div>
            <div style={{ display: "flex", gap: 2 }}>
              {data.months?.map((m, i) => (
                <div key={i} style={{ flex: 1, height: 8, background: phaseColors[i % phaseColors.length], borderRadius: 4, opacity: 0.7 }} data-tip={`Month ${m.month}: ${m.phase}`} className="tip" />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 10, color: "var(--text4)" }}>Start</span>
              <span style={{ fontSize: 10, color: "var(--text4)" }}>Month {data.months?.length}</span>
            </div>
          </div>

          {/* Timeline steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative", marginBottom: 20 }}>
            <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg,var(--neon),var(--blue),var(--violet2))", opacity: 0.3 }} />
            {data.months?.map((m, i) => (
              <div key={m.month} style={{ display: "flex", gap: 20, marginBottom: 12 }}>
                {/* Node */}
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: phaseColors[i % phaseColors.length], display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--fd)", fontSize: 16, color: "#000", flexShrink: 0, zIndex: 1, boxShadow: `0 0 0 4px var(--dark),0 0 16px ${phaseColors[i % phaseColors.length]}50` }}>
                  {m.month}
                </div>
                <div className="card" style={{ padding: 18, flex: 1, borderColor: `${phaseColors[i % phaseColors.length]}20` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <span style={{ fontSize: 10, color: phaseColors[i % phaseColors.length], textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700 }}>Month {m.month}</span>
                      <div style={{ fontFamily: "var(--fd)", fontSize: 17, letterSpacing: ".04em", marginTop: 2 }}>{m.phase}</div>
                    </div>
                    {m.hours && <span className="badge b-neon" style={{ fontSize: 10 }}>⏱ {m.hours}h</span>}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    {m.topics.map(t => <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "var(--dark3)", color: "var(--text3)", border: "1px solid var(--border)" }}>{t}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                    <span style={{ color: "var(--text3)" }}>🛠 <span style={{ color: "var(--text2)" }}>{m.project}</span></span>
                    <span style={{ color: "var(--green)" }}>✅ {m.milestone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resources */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 11, color: "var(--violet2)", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".1em" }}>Learning Resources</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.resources?.map(r => <span key={r} className="badge b-violet">{r}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   RESUME ANALYZER — PDF/Image/Text upload
═══════════════════════════════════════════════════════════ */
function ResumePage() {
  const [mode, setMode] = useState("text"); // text | image | pdf
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [preview, setPreview] = useState(null);
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [drag, setDrag] = useState(false);
  const fileRef = useRef();

  function handleFile(f) {
    if (!f) return;
    setFile(f);
    setErr("");
    const isImg = f.type.startsWith("image/");
    if (isImg) { setMode("image"); const r = new FileReader(); r.onload = e => setPreview(e.target.result); r.readAsDataURL(f); }
    else if (f.type === "application/pdf") { setMode("pdf"); setPreview(null); }
    else { setErr("Only PDF or image files accepted."); setFile(null); }
  }

  function handleDrop(e) {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files[0]; handleFile(f);
  }

  async function analyze() {
    setErr(""); setLoading(true); setRes(null);
    try {
      let imageData = null;
      let prompt = `Analyze this resume${role ? ` for the role: ${role}` : ""}. Return ONLY compact JSON no markdown: {"atsScore":72,"overallScore":68,"sections":{"contact":80,"summary":60,"experience":75,"skills":85,"education":70,"keywords":55},"strengths":["s1","s2","s3"],"improvements":["i1","i2","i3","i4"],"missingKeywords":["k1","k2","k3","k4","k5"],"formatting":["f1","f2"],"grammarIssues":["g1"],"summary":"one sentence.","verdict":"Good"}`;

      if (mode === "image" && file) {
        const b64 = preview.split(",")[1];
        imageData = { type: "image", mediaType: file.type, data: b64 };
      } else if (mode === "pdf" && file) {
        const b64 = await new Promise((res, rej) => {
          const r = new FileReader();
          r.onload = e => res(e.target.result.split(",")[1]);
          r.onerror = rej;
          r.readAsDataURL(file);
        });
        imageData = { type: "document", data: b64 };
      } else if (mode === "text") {
        if (!text.trim()) { setErr("Paste your resume text."); setLoading(false); return; }
        prompt = `Analyze this resume text${role ? ` for role: ${role}` : ""}:\n\n${text.substring(0, 2000)}\n\n` + prompt;
      }

      const raw = await callClaude([{ role: "user", content: prompt }], "You are a senior ATS expert and career coach. Return ONLY valid compact JSON, no markdown.", imageData);
      setRes(JSON.parse(cleanJSON(raw)));
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  }

  const sectionLabels = { contact: "Contact Info", summary: "Summary", experience: "Experience", skills: "Skills", education: "Education", keywords: "Keywords" };

  return (
    <div style={{ padding: "44px 52px", maxWidth: 1000, position: "relative", zIndex: 1 }}>
      <SH eyebrow="Feature" title="RESUME AI" sub="Upload PDF, image, or paste text — get ATS scoring with visual breakdown." />

      {/* Mode tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {[["text", "📝 Paste Text"], ["image", "🖼️ Image Upload"], ["pdf", "📄 PDF Upload"]].map(([m, l]) => (
          <button key={m} className={mode === m ? "btn btn-neon" : "btn btn-outline"} style={{ fontSize: 13, padding: "9px 20px" }} onClick={() => { setMode(m); setFile(null); setPreview(null); setErr(""); }}>{l}</button>
        ))}
      </div>

      <div className="card fade-up" style={{ padding: 28, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <label>Target Role (optional)</label>
          <input className="inp" placeholder="e.g. Senior Software Engineer at Google" value={role} onChange={e => setRole(e.target.value)} />
        </div>

        {mode === "text" && (
          <div style={{ marginBottom: 16 }}>
            <label>Resume Text</label>
            <textarea className="inp" rows={9} placeholder="Paste your full resume content here..." value={text} onChange={e => setText(e.target.value)} />
          </div>
        )}

        {(mode === "image" || mode === "pdf") && (
          <div style={{ marginBottom: 16 }}>
            <input ref={fileRef} type="file" accept={mode === "image" ? "image/*" : "application/pdf"} style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
            <div className={`upload-zone${drag ? " drag-over" : ""}`}
              onDragOver={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}>
              {file ? (
                <div>
                  {preview && <img src={preview} alt="resume" style={{ maxHeight: 200, maxWidth: "100%", borderRadius: 8, marginBottom: 10 }} />}
                  <div style={{ fontSize: 14, color: "var(--neon)", fontWeight: 600 }}>✅ {file.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>{(file.size / 1024).toFixed(1)} KB · Click to change</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{mode === "pdf" ? "📄" : "🖼️"}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Drop your {mode === "pdf" ? "PDF" : "image"} here</div>
                  <div style={{ fontSize: 13, color: "var(--text3)" }}>or click to browse · {mode === "pdf" ? "PDF files only" : "JPG, PNG, WebP"}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {err && <div style={{ fontSize: 13, color: "var(--red)", marginBottom: 12 }}>{err}</div>}
        <button className="btn btn-neon" onClick={analyze} disabled={loading || (mode !== "text" && !file)}>
          {loading ? <><Spinner /> Analyzing Resume...</> : "▣ Analyze Resume"}
        </button>
      </div>

      {res && (
        <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Score row */}
          <div style={{ display: "grid", gridTemplateColumns: "180px 180px 1fr", gap: 16 }}>
            <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".12em" }}>ATS Score</div>
              <DonutRing pct={res.atsScore} size={120} stroke={10} color="auto" label="ATS" />
            </div>
            <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".12em" }}>Overall</div>
              <DonutRing pct={res.overallScore} size={120} stroke={10} color="var(--violet2)" label="Score" />
            </div>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 14 }}>Section Breakdown</div>
              {Object.entries(res.sections || {}).map(([k, v]) => (
                <Bar key={k} label={sectionLabels[k] || k} value={v} height={5} color={v >= 70 ? "var(--green)" : v >= 50 ? "var(--amber)" : "var(--red)"} />
              ))}
            </div>
          </div>

          {/* Verdict banner */}
          <div className="card" style={{ padding: 16, background: "linear-gradient(135deg,rgba(0,255,224,0.05),rgba(77,159,255,0.04))", borderColor: "rgba(0,255,224,0.15)", display: "flex", alignItems: "center", gap: 16 }}>
            <span className={`badge ${res.atsScore >= 75 ? "b-green" : res.atsScore >= 55 ? "b-amber" : "b-red"}`} style={{ fontSize: 14, padding: "8px 18px" }}>{res.verdict || (res.atsScore >= 75 ? "Strong" : res.atsScore >= 55 ? "Good" : "Needs Work")}</span>
            <div style={{ fontSize: 14, color: "var(--text2)" }}>{res.summary}</div>
          </div>

          {/* 4 col detail */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
            {[
              { title: "✅ Strengths", items: res.strengths, cls: "b-green" },
              { title: "💡 Improvements", items: res.improvements, cls: "b-amber" },
              { title: "🔑 Missing Keywords", items: res.missingKeywords, cls: "b-neon" },
              { title: "⚠️ Issues", items: [...(res.formatting || []), ...(res.grammarIssues || [])], cls: "b-red" },
            ].map(g => (
              <div key={g.title} className="card" style={{ padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>{g.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {g.items?.map((s, i) => <span key={i} className={`badge ${g.cls}`} style={{ fontSize: 11, alignSelf: "flex-start" }}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MARKET INTEL
═══════════════════════════════════════════════════════════ */
function TrendsPage() {
  const [domain, setDomain] = useState("AI & Machine Learning");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const domains = ["AI & Machine Learning", "Full Stack Web", "Cybersecurity", "Cloud & DevOps", "Data Science", "Mobile Dev", "Blockchain", "UI/UX Design"];

  async function fetch_() {
    setLoading(true); setData(null);
    try {
      const raw = await callClaude([{ role: "user", content: `Job market intelligence for ${domain} in India 2025. Return ONLY compact JSON: {"skills":[{"name":"React","demand":92,"yoy":"+15%","salary":"₹12-20 LPA"},{"name":"TypeScript","demand":85,"yoy":"+22%","salary":"₹10-18 LPA"},{"name":"Node.js","demand":80,"yoy":"+10%","salary":"₹10-16 LPA"},{"name":"AWS","demand":76,"yoy":"+18%","salary":"₹14-25 LPA"},{"name":"Docker","demand":72,"yoy":"+25%","salary":"₹12-22 LPA"}],"avgSalary":"₹14-28 LPA","topRoles":["Role 1","Role 2","Role 3","Role 4","Role 5"],"emerging":["Tech1","Tech2","Tech3","Tech4"],"companies":["Co1","Co2","Co3","Co4","Co5"],"outlook":"Positive","growth":"+34%","summary":"Two sentence market insight.","heatmap":[{"city":"Bangalore","score":95},{"city":"Hyderabad","score":88},{"city":"Mumbai","score":82},{"city":"Pune","score":76},{"city":"Chennai","score":72},{"city":"Delhi NCR","score":80}]}` }], "Return ONLY valid compact JSON, no markdown.");
      setData(JSON.parse(cleanJSON(raw)));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetch_(); }, []);

  return (
    <div style={{ padding: "44px 52px", maxWidth: 1100, position: "relative", zIndex: 1 }}>
      <SH eyebrow="Feature" title="MARKET INTEL" sub="Real-time job demand, salary benchmarks, and hiring trends by domain." />

      {/* Domain pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {domains.map(d => (
          <button key={d} onClick={() => { setDomain(d); setTimeout(fetch_, 0); }}
            className={d === domain ? "btn btn-neon" : "btn btn-ghost"} style={{ fontSize: 12, padding: "7px 16px" }}>{d}</button>
        ))}
        <button className="btn btn-outline" onClick={fetch_} disabled={loading} style={{ marginLeft: 4 }}>
          {loading ? <Spinner size={14} /> : "⟳ Refresh"}
        </button>
      </div>

      {loading && (
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[1,2,3,4].map(i => <div key={i} className="skel" style={{ width: 200, height: 100 }} />)}
        </div>
      )}

      {data && (
        <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
            <StatCard icon="💰" value={data.avgSalary} label="Avg Salary Range" color="var(--green)" />
            <StatCard icon="📈" value={data.growth} label="YoY Market Growth" color="var(--neon)" />
            <StatCard icon="✨" value={data.outlook} label="Market Outlook" color={data.outlook === "Positive" ? "var(--green)" : "var(--amber)"} />
            <StatCard icon="🏢" value={data.companies?.length + "+"} label="Top Hiring Companies" color="var(--blue)" />
          </div>

          <p style={{ fontSize: 14, color: "var(--text2)", padding: "13px 18px", background: "var(--card)", borderRadius: 10, border: "1px solid var(--border)", lineHeight: 1.7 }}>{data.summary}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Skills demand bars */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontFamily: "var(--fd)", fontSize: 16, letterSpacing: ".06em", marginBottom: 4 }}>SKILL DEMAND INDEX</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 18 }}>Demand score + YoY growth</div>
              {data.skills?.map((s, i) => (
                <div key={s.name} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
                      <span style={{ fontSize: 11, color: "var(--green)", fontFamily: "var(--fm)", fontWeight: 600 }}>{s.yoy}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "var(--text2)", fontFamily: "var(--fm)" }}>{s.demand}%</div>
                      <div style={{ fontSize: 10, color: "var(--text3)" }}>{s.salary}</div>
                    </div>
                  </div>
                  <div style={{ height: 7, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
                    <BarAnimated w={s.demand} i={i} />
                  </div>
                </div>
              ))}
            </div>

            {/* City heatmap */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontFamily: "var(--fd)", fontSize: 16, letterSpacing: ".06em", marginBottom: 4 }}>CITY DEMAND HEATMAP</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 18 }}>Hiring activity by city</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {data.heatmap?.sort((a,b)=>b.score-a.score).map((c, i) => (
                  <div key={c.city} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 28, fontSize: 12, color: "var(--text3)", fontFamily: "var(--fm)", flexShrink: 0 }}>#{i+1}</div>
                    <div style={{ width: 90, fontSize: 13, fontWeight: 500 }}>{c.city}</div>
                    <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${c.score}%`, background: `hsl(${c.score + 80},80%,55%)`, opacity: 0.8, borderRadius: 4, transition: "width 1s ease" }} />
                    </div>
                    <div style={{ width: 36, fontSize: 12, color: "var(--text2)", fontFamily: "var(--fm)", textAlign: "right" }}>{c.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {[
              { title: "💼 Top Roles", items: data.topRoles, cls: "b-violet" },
              { title: "🚀 Emerging Tech", items: data.emerging, cls: "b-amber" },
              { title: "🏢 Top Companies", items: data.companies, cls: "b-neon" },
            ].map(g => (
              <div key={g.title} className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 12 }}>{g.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {g.items?.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text2)", padding: "5px 0", borderBottom: "1px solid var(--border)" }}>
                      <span style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--text4)" }}>0{i+1}</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BarAnimated({ w, i }) {
  const [width, setWidth] = useState(0);
  const colors = ["var(--neon)", "var(--blue)", "var(--violet2)", "var(--amber)", "var(--pink)"];
  useEffect(() => { const t = setTimeout(() => setWidth(w), 100 + i * 80); return () => clearTimeout(t); }, []);
  return <div style={{ height: "100%", width: `${width}%`, background: colors[i % colors.length], borderRadius: 4, transition: "width 1s cubic-bezier(.4,0,.2,1)" }} />;
}

/* ═══════════════════════════════════════════════════════════
   AI MENTOR CHAT
═══════════════════════════════════════════════════════════ */
function ChatPage() {
  const [msgs, setMsgs] = useState([{ role: "assistant", content: "Hello! I'm SkillBridge AI, your personal career intelligence assistant.\n\nI can help you with career strategy, skill planning, interview prep, salary negotiation, and more. What's on your mind?" }]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();
  const chips = ["How do I become a Data Scientist?", "Best AI/ML learning path?", "How to negotiate salary?", "What to learn after React?", "Crack FAANG interviews?"];

  async function send(msg) {
    const m = msg || inp.trim(); if (!m) return;
    setInp("");
    const newMsgs = [...msgs, { role: "user", content: m }];
    setMsgs(newMsgs);
    setLoading(true);
    try {
      const reply = await callClaude(newMsgs.map(x => ({ role: x.role, content: x.content })), "You are SkillBridge AI — an elite career intelligence advisor. Give sharp, structured, actionable advice. Use short bullet points. Be direct and high-signal. No fluff.");
      setMsgs(prev => [...prev, { role: "assistant", content: reply }]);
    } catch { setMsgs(prev => [...prev, { role: "assistant", content: "Error — please try again." }]); }
    setLoading(false);
  }

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: 820, padding: "44px 52px 0", position: "relative", zIndex: 1 }}>
      <SH eyebrow="Feature" title="AI MENTOR" sub="Real-time career guidance powered by Claude." />

      {/* Chips */}
      {msgs.length <= 1 && (
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 20 }}>
          {chips.map(c => <button key={c} className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => send(c)}>{c}</button>)}
        </div>
      )}

      {/* Messages */}
      <div className="chat-scroll" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, paddingBottom: 16, paddingRight: 4 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 10, alignItems: "flex-start" }}>
            {m.role === "assistant" && (
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,var(--neon2),var(--blue2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, marginTop: 2, boxShadow: "0 0 12px rgba(0,255,224,0.3)" }}>◉</div>
            )}
            <div className={m.role === "user" ? "bubble-user" : "bubble-ai"}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,var(--neon2),var(--blue2))", display: "flex", alignItems: "center", justifyContent: "center" }}>◉</div>
            <div className="bubble-ai" style={{ padding: "14px 18px" }}>
              <div style={{ display: "flex", gap: 5 }}>
                {[0,1,2].map(j => <div key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--neon)", animation: `pulse 1.2s ${j*0.25}s ease infinite` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{ padding: "14px 0 24px", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input className="inp" placeholder="Ask your AI career mentor anything..." value={inp}
            onChange={e => setInp(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()} />
          <button className="btn btn-neon" onClick={() => send()} disabled={loading || !inp.trim()} style={{ whiteSpace: "nowrap", padding: "11px 24px" }}>Send →</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   INTERVIEW SIM
═══════════════════════════════════════════════════════════ */
function InterviewPage() {
  const [stage, setStage] = useState("setup");
  const [form, setForm] = useState({ role: "", type: "Technical", level: "Mid Level" });
  const [qs, setQs] = useState([]);
  const [curr, setCurr] = useState(0);
  const [ans, setAns] = useState("");
  const [fb, setFb] = useState(null);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);

  async function start() {
    if (!form.role.trim()) return;
    setLoading(true);
    try {
      const raw = await callClaude([{ role: "user", content: `Generate 5 ${form.type} interview questions for ${form.level} ${form.role}. Return ONLY compact JSON: {"questions":["Q1?","Q2?","Q3?","Q4?","Q5?"]}` }], "Return ONLY valid compact JSON.");
      const d = JSON.parse(cleanJSON(raw));
      setQs(d.questions); setCurr(0); setAll([]); setStage("interview");
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function submitAns() {
    if (!ans.trim()) return;
    setLoading(true); setFb(null);
    try {
      const raw = await callClaude([{ role: "user", content: `Interview question: "${qs[curr]}" for ${form.level} ${form.role}. Answer: "${ans}". Return ONLY compact JSON: {"score":7,"verdict":"Good","strengths":["s1","s2"],"gaps":["g1","g2"],"ideal":"Key points for a 10/10 answer.","tip":"One quick tip."}` }], "You are a strict technical interviewer. Return ONLY compact JSON.");
      const f = JSON.parse(cleanJSON(raw));
      setFb(f); setAll(prev => [...prev, { q: qs[curr], a: ans, f }]);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  function next() {
    if (curr < qs.length - 1) { setCurr(c => c + 1); setAns(""); setFb(null); }
    else { setStage("results"); }
  }

  const avg = all.length ? (all.reduce((a, x) => a + x.f.score, 0) / all.length).toFixed(1) : 0;

  return (
    <div style={{ padding: "44px 52px", maxWidth: 860, position: "relative", zIndex: 1 }}>
      <SH eyebrow="Feature" title="INTERVIEW SIM" sub="AI-powered practice with real-time scoring and feedback." />

      {stage === "setup" && (
        <div className="card fade-up" style={{ padding: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
            <div><label>Target Role</label><input className="inp" placeholder="Software Engineer..." value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></div>
            <div><label>Interview Type</label>
              <select className="inp" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                {["Technical", "HR/Behavioral", "System Design", "Mixed"].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div><label>Level</label>
              <select className="inp" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
                {["Fresher", "Entry Level", "Mid Level", "Senior Level"].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <button className="btn btn-neon" onClick={start} disabled={loading || !form.role.trim()}>
            {loading ? <><Spinner /> Generating...</> : "▷ Start Interview"}
          </button>
        </div>
      )}

      {stage === "interview" && (
        <div>
          {/* Progress */}
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {qs.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < curr ? "var(--green)" : i === curr ? "var(--neon)" : "var(--border2)", transition: "background .3s" }} />
            ))}
          </div>

          {/* Question */}
          <div className="card" style={{ padding: 28, marginBottom: 20, background: "linear-gradient(135deg,rgba(0,255,224,0.04),rgba(77,159,255,0.03))", borderColor: "rgba(0,255,224,0.15)" }}>
            <div style={{ fontSize: 10, color: "var(--neon)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 10 }}>Question {curr + 1} / {qs.length} · {form.type}</div>
            <div style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 600, lineHeight: 1.6 }}>{qs[curr]}</div>
          </div>

          {!fb && (
            <div>
              <label>Your Answer</label>
              <textarea className="inp" rows={6} placeholder="Type your answer..." value={ans} onChange={e => setAns(e.target.value)} style={{ marginBottom: 12 }} />
              <button className="btn btn-neon" onClick={submitAns} disabled={loading || !ans.trim()}>
                {loading ? <><Spinner /> Evaluating...</> : "Submit Answer →"}
              </button>
            </div>
          )}

          {fb && (
            <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Score */}
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 16 }}>
                <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <DonutRing pct={fb.score * 10} size={110} stroke={9} color="auto" label={`${fb.score}/10`} animate />
                  <span className={`badge ${fb.score >= 8 ? "b-green" : fb.score >= 6 ? "b-amber" : "b-red"}`} style={{ marginTop: 10, fontSize: 12 }}>{fb.verdict}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div className="card" style={{ padding: 14 }}>
                    <div style={{ fontSize: 11, color: "var(--green)", marginBottom: 6, fontWeight: 600 }}>✅ STRENGTHS</div>
                    {fb.strengths?.map(s => <div key={s} style={{ fontSize: 13, color: "var(--text2)", padding: "3px 0" }}>• {s}</div>)}
                  </div>
                  <div className="card" style={{ padding: 14 }}>
                    <div style={{ fontSize: 11, color: "var(--red)", marginBottom: 6, fontWeight: 600 }}>⚠️ GAPS</div>
                    {fb.gaps?.map(g => <div key={g} style={{ fontSize: 13, color: "var(--text2)", padding: "3px 0" }}>• {g}</div>)}
                  </div>
                </div>
              </div>
              <div className="card" style={{ padding: 16, borderColor: "rgba(139,92,246,0.2)" }}>
                <div style={{ fontSize: 11, color: "var(--violet2)", marginBottom: 6, fontWeight: 600 }}>💡 IDEAL ANSWER POINTS</div>
                <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>{fb.ideal}</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div className="card" style={{ padding: 12, flex: 1, borderColor: "rgba(0,255,224,0.15)", background: "rgba(0,255,224,0.04)" }}>
                  <span style={{ fontSize: 12, color: "var(--neon)" }}>⚡ {fb.tip}</span>
                </div>
                <button className="btn btn-neon" onClick={next}>{curr < qs.length - 1 ? "Next →" : "View Results 🏆"}</button>
              </div>
            </div>
          )}
        </div>
      )}

      {stage === "results" && (
        <div className="fade-up">
          <div className="card" style={{ padding: 36, textAlign: "center", marginBottom: 20, background: "linear-gradient(135deg,rgba(0,255,224,0.05),rgba(77,159,255,0.04))" }}>
            <div style={{ fontFamily: "var(--fd)", fontSize: 72, letterSpacing: ".04em", color: avg >= 7 ? "var(--green)" : avg >= 5 ? "var(--amber)" : "var(--red)" }}>{avg}</div>
            <div style={{ fontSize: 14, color: "var(--text2)", marginTop: 6 }}>Average Score / 10 · {form.role}</div>
            <div style={{ marginTop: 14 }}>
              {avg >= 8 ? <span className="badge b-green">🏆 Outstanding</span> : avg >= 6 ? <span className="badge b-amber">👍 Good Performance</span> : <span className="badge b-red">📚 Needs Practice</span>}
            </div>
          </div>
          {all.map((item, i) => (
            <div key={i} className="card" style={{ padding: 16, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Q{i+1}: {item.q.substring(0, 80)}...</div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>{item.f.verdict}</div>
              </div>
              <DonutRing pct={item.f.score * 10} size={60} stroke={6} color="auto" label={item.f.score} animate={false} />
            </div>
          ))}
          <button className="btn btn-neon" onClick={() => { setStage("setup"); setAll([]); }} style={{ marginTop: 8 }}>🔄 Try Again</button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SALARY ORACLE
═══════════════════════════════════════════════════════════ */
function SalaryPage() {
  const [form, setForm] = useState({ role: "", skills: "", exp: "2", loc: "Bangalore", edu: "B.Tech/BE" });
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  async function predict() {
    if (!form.role.trim()) return;
    setLoading(true); setRes(null);
    try {
      const raw = await callClaude([{ role: "user", content: `Salary prediction for: Role: ${form.role}, Skills: ${form.skills}, ${form.exp} years exp, ${form.loc}, ${form.edu}. Return ONLY compact JSON: {"min":800000,"avg":1300000,"max":2000000,"currency":"INR","minStr":"₹8 LPA","avgStr":"₹13 LPA","maxStr":"₹20 LPA","factors":[{"name":"Experience","impact":75,"effect":"positive"},{"name":"Location","impact":60,"effect":"positive"},{"name":"Skills","impact":85,"effect":"positive"},{"name":"Education","impact":50,"effect":"neutral"}],"companies":["Co1","Co2","Co3","Co4"],"tips":["tip1","tip2","tip3"],"future3yr":"₹22-38 LPA","future5yr":"₹35-60 LPA","percentile":65,"vs_market":"12% above average"}` }], "Return ONLY valid compact JSON.");
      setRes(JSON.parse(cleanJSON(raw)));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ padding: "44px 52px", maxWidth: 1000, position: "relative", zIndex: 1 }}>
      <SH eyebrow="Feature" title="SALARY ORACLE" sub="AI-powered compensation prediction based on your full profile." />

      <div className="card fade-up" style={{ padding: 28, marginBottom: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
          <div style={{ gridColumn: "span 2" }}><label>Role</label><input className="inp" placeholder="Senior React Developer" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></div>
          <div style={{ gridColumn: "span 2" }}><label>Key Skills</label><input className="inp" placeholder="React, Node.js, AWS..." value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} /></div>
          <div><label>Years Exp</label><input className="inp" type="number" min="0" max="30" value={form.exp} onChange={e => setForm({ ...form, exp: e.target.value })} /></div>
          <div><label>City</label>
            <select className="inp" value={form.loc} onChange={e => setForm({ ...form, loc: e.target.value })}>
              {["Bangalore","Hyderabad","Mumbai","Pune","Chennai","Delhi NCR","Noida","Gurgaon","Remote"].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: "span 2" }}><label>Education</label>
            <select className="inp" value={form.edu} onChange={e => setForm({ ...form, edu: e.target.value })}>
              {["High School","Diploma","B.Tech/BE","BCA/BSc","MCA/M.Tech","MBA","PhD"].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button className="btn btn-neon" onClick={predict} disabled={loading || !form.role.trim()} style={{ width: "100%", justifyContent: "center" }}>
              {loading ? <><Spinner size={14} /> ...</> : "◆ Predict"}
            </button>
          </div>
        </div>
      </div>

      {res && (
        <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Salary range visual */}
          <div className="card" style={{ padding: 32, background: "linear-gradient(135deg,rgba(0,255,224,0.04),rgba(77,159,255,0.04))", borderColor: "rgba(0,255,224,0.15)" }}>
            <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 20, textAlign: "center" }}>Salary Range for {form.role} · {form.loc}</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 32 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 6 }}>MINIMUM</div>
                <div style={{ fontFamily: "var(--fd)", fontSize: 28, color: "var(--amber)" }}>{res.minStr}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 6 }}>AVERAGE</div>
                <div style={{ fontFamily: "var(--fd)", fontSize: 52, color: "var(--green)", lineHeight: 1 }}>{res.avgStr}</div>
                <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 6 }}>{res.vs_market}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 6 }}>MAXIMUM</div>
                <div style={{ fontFamily: "var(--fd)", fontSize: 28, color: "var(--neon)" }}>{res.maxStr}</div>
              </div>
            </div>
            {/* Range bar */}
            <div style={{ maxWidth: 400, margin: "24px auto 0", height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, background: "linear-gradient(90deg,var(--amber),var(--green),var(--neon))", borderRadius: 4, opacity: 0.8 }} />
              <div style={{ position: "absolute", left: `${res.percentile || 50}%`, top: -3, width: 14, height: 14, borderRadius: "50%", background: "#fff", border: "2px solid var(--green)", transform: "translateX(-50%)" }} />
            </div>
            <div style={{ maxWidth: 400, margin: "6px auto 0", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 10, color: "var(--text4)" }}>Low</span>
              <span style={{ fontSize: 10, color: "var(--green)" }}>{res.percentile}th percentile</span>
              <span style={{ fontSize: 10, color: "var(--text4)" }}>High</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {/* Factors */}
            <div className="card" style={{ padding: 22 }}>
              <div style={{ fontFamily: "var(--fd)", fontSize: 15, letterSpacing: ".06em", marginBottom: 16 }}>SALARY FACTORS</div>
              {res.factors?.map(f => (
                <div key={f.name} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13 }}>{f.name}</span>
                    <span className={`badge ${f.effect === "positive" ? "b-green" : "b-amber"}`} style={{ fontSize: 10 }}>{f.impact}%</span>
                  </div>
                  <Bar label="" value={f.impact} height={5} color={f.effect === "positive" ? "var(--green)" : "var(--amber)"} showVal={false} />
                </div>
              ))}
            </div>

            {/* Growth trajectory */}
            <div className="card" style={{ padding: 22 }}>
              <div style={{ fontFamily: "var(--fd)", fontSize: 15, letterSpacing: ".06em", marginBottom: 20 }}>GROWTH PATH</div>
              {[["Now", res.avgStr, "var(--neon)"], ["3 Years", res.future3yr, "var(--blue)"], ["5 Years", res.future5yr, "var(--violet2)"]].map(([t, v, c]) => (
                <div key={t} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "var(--text3)" }}>{t}</span>
                  <span style={{ fontFamily: "var(--fd)", fontSize: 20, color: c }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Tips + Companies */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="card" style={{ padding: 18, flex: 1 }}>
                <div style={{ fontSize: 12, color: "var(--violet2)", marginBottom: 10, fontWeight: 700 }}>💡 BOOST SALARY</div>
                {res.tips?.map((t, i) => <div key={i} style={{ fontSize: 12, color: "var(--text2)", padding: "5px 0", borderBottom: "1px solid var(--border)", display: "flex", gap: 6 }}><span style={{ color: "var(--violet2)" }}>{i+1}.</span>{t}</div>)}
              </div>
              <div className="card" style={{ padding: 18 }}>
                <div style={{ fontSize: 12, color: "var(--amber)", marginBottom: 10, fontWeight: 700 }}>🏢 TOP PAYERS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {res.companies?.map(c => <span key={c} className="badge b-amber" style={{ fontSize: 11 }}>{c}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const pages = { home: HomePage, dashboard: DashboardPage, "skill-gap": SkillGapPage, roadmap: RoadmapPage, resume: ResumePage, trends: TrendsPage, chat: ChatPage, interview: InterviewPage, salary: SalaryPage };
  const Page = pages[page] || HomePage;

  return (
    <>
      <GS />
      <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
      <div style={{ display: "flex", minHeight: "100vh", position: "relative", zIndex: 1 }}>
        <Sidebar page={page} setPage={setPage} />
        <main style={{ flex: 1, overflowY: "auto", background: "transparent" }}>
          <Page setPage={setPage} />
        </main>
      </div>
    </>
  );
}