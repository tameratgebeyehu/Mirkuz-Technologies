import React, { useEffect } from 'react';
import { Award, ExternalLink, CheckCircle, GraduationCap, ArrowRight } from 'lucide-react';
import { G, ACADEMIC_FOUNDATION, TECHNICAL_SPECIALIZATIONS, CERTIFICATIONS } from '../data/portfolioData';

// Import Logos for Specializations
import princetonImg from '../logos/princeton logo.jpg';
import uchicagoImg from '../logos/uchicago logo.png';
import worldquantImg from '../logos/worldquant logo 2.png';
import evangadiImg from '../logos/evangadi logo.jpg';
import googleImg from '../logos/google logo.png';
import macquarieImg from '../logos/macquarie logo (2).jpg';
import hplifeImg from '../logos/hp life logo.png';
import udacityImg from '../logos/udacity logo.png';
import redcrossImg from '../logos/ethiopian red cross society logo.jpg';

export default function Education() {
  // Map textual logos to imported images
  const logoMap = {
    "WQ": worldquantImg,
    "UC": uchicagoImg,
    "P": princetonImg,
    "ET": evangadiImg,
    "G": googleImg,
    "AN": "🚀",
    "MQ": macquarieImg,
    
    // Credentials mapping
    "Google": googleImg,
    "HP Life": hplifeImg,
    "Udacity": udacityImg,
    "ERCS": redcrossImg,
    "Macquarie University": macquarieImg,
    "Nestlé": "🥛",
    "Blue Ocean Strategy": "🌊"
  };
  useEffect(() => {
    document.title = "Tamerat Gebeyehu — Education & Certifications";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "The technical and academic foundation behind Mirkuz Technologies, featuring credentials from global institutions.");
  }, []);

  return (
    <section style={{ padding: "100px 0", position: "relative" }}>
       {/* Background Ambience */}
       <div style={{ position: "absolute", top: "10%", right: "5%", width: "30vw", height: "30vw", background: "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)", filter: "blur(100px)", zIndex: 0 }} />

       <div className="container" style={{ position: "relative", zIndex: 1 }}>
         <div style={{ textAlign: "center", marginBottom: 100 }} className="animate-up">
           <div className="section-badge">Mastery & Credentials</div>
           <h1 className="text-gradient">The Intellectual<br />Foundation.</h1>
           <p style={{ color: G.slate, fontSize: 18, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
             A strategic blend of local academic excellence and global technical rigor, focused on building the infrastructure of the future.
           </p>
         </div>

         {/* 1. Global Certifications */}
         <div style={{ marginBottom: 120 }} className="animate-up">
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
             <div>
               <h2 style={{ fontSize: 32, fontWeight: 900 }}>Global Credentials</h2>
               <p style={{ color: G.slate, fontSize: 15 }}>International certifications from Google, Udacity, and HP.</p>
             </div>
             <div style={{ padding: "8px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", fontSize: 12, fontWeight: 700, color: G.green }}>
                {CERTIFICATIONS.length} VERIFIED BADGES
             </div>
           </div>
           
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 20 }}>
              {CERTIFICATIONS.map((c, idx) => {
                const isLinkable = c.link && c.link !== "#";
                const CardTag = isLinkable ? "a" : "div";
                
                return (
                  <CardTag 
                    key={c.id} 
                    href={isLinkable ? c.link : undefined}
                    target={isLinkable ? "_blank" : undefined}
                    rel={isLinkable ? "noopener noreferrer" : undefined}
                    className="glass-card"
                    style={{ 
                      padding: "40px 32px", 
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 20,
                      cursor: isLinkable ? "pointer" : "default",
                      border: isLinkable ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(16,185,129,0.1)"
                    }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: G.green, overflow: "hidden" }}>
                       {logoMap[c.org] && typeof logoMap[c.org] === 'string' && logoMap[c.org].length > 10 ? (
                          <img src={logoMap[c.org]} alt={c.org} style={{ width: "65%", height: "65%", objectFit: "contain" }} />
                       ) : (
                          logoMap[c.org] || <CheckCircle size={24} />
                       )}
                    </div>
                    <div>
                       <div style={{ fontSize: 11, fontWeight: 900, color: G.green, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{c.org}</div>
                       <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{c.title}</h3>
                       <p style={{ color: G.slate, fontSize: 14, lineHeight: 1.6 }}>{c.desc}</p>
                    </div>
                    <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 8, color: isLinkable ? G.green : G.slate, fontSize: 12, fontWeight: 800 }}>
                      {isLinkable ? (
                        <>VERIFY CREDENTIAL <ArrowRight size={14} /></>
                      ) : (
                        <span style={{ opacity: 0.6 }}>OFFLINE RECORD — COMING SOON</span>
                      )}
                    </div>
                  </CardTag>
                );
              })}
           </div>
         </div>

         {/* 2. Technical Specializations - Premium Square Layout */}
         <div style={{ marginBottom: 120 }} className="animate-up">
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 32, fontWeight: 900 }}>Technical Specializations</h2>
              <p style={{ color: G.slate, fontSize: 15 }}>Rigorous deep-dives into Data Science, ML, and Aerospace Engineering.</p>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", gap: 24 }}>
              {TECHNICAL_SPECIALIZATIONS.map((s, idx) => (
                <div 
                  key={idx} 
                  className="glass-card"
                  style={{ 
                    padding: "40px", 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "space-between",
                    minHeight: "400px"
                  }}
                >
                  <div>
                    <div style={{ 
                      width: 60, height: 60, borderRadius: 18, background: s.color + "15", 
                      display: "flex", alignItems: "center", justifyContent: "center", 
                      fontSize: 22, fontWeight: 900, color: s.color, marginBottom: 32,
                      border: `1px solid ${s.color}30`,
                      overflow: "hidden"
                    }}>
                      {logoMap[s.logo] && typeof logoMap[s.logo] === 'string' && logoMap[s.logo].length > 10 ? (
                        <img src={logoMap[s.logo]} alt={s.org} style={{ width: "70%", height: "70%", objectFit: "contain" }} />
                      ) : (
                        logoMap[s.logo] || s.logo
                      )}
                    </div>
                    <div style={{ color: G.green, fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>{s.org}</div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>{s.title}</h3>
                    <p style={{ color: G.slate, fontSize: 15, lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                  
                  <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                       <span style={{ fontSize: 10, color: G.slate, fontWeight: 800, textTransform: "uppercase" }}>Duration</span>
                       <span style={{ fontSize: 13, color: G.white, fontWeight: 700 }}>{s.date}</span>
                    </div>
                    {s.date.includes("Present") || s.date === "Current" ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,0.1)", padding: "6px 12px", borderRadius: 100 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: G.green, boxShadow: `0 0 10px ${G.green}` }} />
                        <span style={{ fontSize: 10, color: G.green, fontWeight: 900 }}>ACTIVE</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
         </div>

         {/* 3. Academic Foundation */}
         <div className="animate-up">
           <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 40 }}>Academic Foundation</h2>
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))", gap: 24 }}>
             {ACADEMIC_FOUNDATION.map((a, idx) => (
               <div key={idx} className="glass-card" style={{ padding: "48px" }}>
                 <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                       <GraduationCap color={G.green} size={28} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{a.org}</h3>
                      <div style={{ color: G.green, fontSize: 13, fontWeight: 800, marginBottom: 24 }}>{a.role} · {a.location}</div>
                      <p style={{ color: G.slate, fontSize: 16, lineHeight: 1.8 }}>{a.desc}</p>
                    </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>
    </section>
  );
}
