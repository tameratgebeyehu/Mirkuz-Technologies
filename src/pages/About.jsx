import React, { useEffect } from 'react';
import { Mail, Github, Linkedin, Send, Phone, MapPin } from 'lucide-react';
import { G, SKILLS_DETAILED, HONORS } from '../data/portfolioData';

export default function About() {
  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease"
  };

  useEffect(() => {
    document.title = "About Tamerat Gebeyehu — Student Builder Ethiopia";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Learn about Tamerat Gebeyehu's journey as a student developer in Ethiopia, his work with the Red Cross, and his vision for digital infrastructure.");
  }, []);

  return (
    <section style={{ padding: "100px 0" }}>
      <div className="container animate-up">
        
        {/* Profile & Narrative Header */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 80, alignItems: "center", marginBottom: 120 }}>
          <div style={{ position: "relative" }}>
            <div style={{ 
              width: "100%", 
              aspectRatio: "1/1", 
              borderRadius: 40, 
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)"
            }}>
              <img 
                src="/Logo's/profile image.jpg" 
                alt="Tamerat Gebeyehu" 
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ position: "absolute", bottom: -20, right: -20, background: G.green, color: "#fff", padding: "16px 32px", borderRadius: 20, fontSize: 14, fontWeight: 900, boxShadow: "0 10px 30px rgba(16,185,129,0.4)" }}>
              DODOLA, ETHIOPIA
            </div>
          </div>

          <div>
            <div className="section-badge">My Narrative</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, marginBottom: 32, lineHeight: 1.1 }}>
              Bridging Local Service with <span style={{ color: G.green }}>Global Innovation.</span>
            </h2>
            <p style={{ color: G.slate, fontSize: 18, lineHeight: 1.8, marginBottom: 32 }}>
              I am an 11th-grade developer based in Dodola, Oromia—a "Global Student" dedicated to solving local challenges with international standards. 
              My path is a unique blend of community leadership through the <strong>Ethiopian Red Cross</strong> and rigorous technical training from institutions like <strong>Princeton</strong> and <strong>UChicago</strong>.
            </p>
            <div style={{ fontStyle: "italic", color: G.white, fontSize: 22, fontWeight: 700, borderLeft: `4px solid ${G.green}`, paddingLeft: 24, marginBottom: 40 }}>
              "I don't just write code; I build bridges between current challenges and future opportunities."
            </div>
          </div>
        </div>

        {/* Technical Toolkit */}
        <div style={{ marginBottom: 120 }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 16 }}>The Technical Toolkit</h2>
            <p style={{ color: G.slate }}>Specialized skills forged through institutional rigor and real-world deployment.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24 }}>
            {SKILLS_DETAILED.map((skill, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "40px" }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: G.green, marginBottom: 24 }}>{skill.category}</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  {skill.items.map((item, i) => (
                    <li key={i} style={{ color: G.white, fontSize: 14, display: "flex", gap: 12 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: G.green, marginTop: 8 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Honors */}
        <div style={{ marginBottom: 120 }}>
           <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 40, textAlign: "center" }}>Honors & Recognition</h2>
           <div style={{ maxWidth: 800, margin: "0 auto" }}>
             {HONORS.map((h, idx) => (
               <div key={idx} className="glass-card" style={{ padding: "48px", borderLeft: `6px solid ${G.green}`, marginBottom: 32 }}>
                  <div style={{ color: G.green, fontSize: 12, fontWeight: 900, textTransform: "uppercase", marginBottom: 16 }}>{h.org} · {h.year}</div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>{h.title}</h3>
                  <p style={{ color: G.slate, fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>{h.desc}</p>
                  <div style={{ padding: "20px", background: "rgba(16,185,129,0.05)", borderRadius: 16, fontSize: 14, color: G.white, fontWeight: 600 }}>
                    <span style={{ color: G.green, fontWeight: 900 }}>SIGNIFICANCE:</span> {h.significance}
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Connect Section - Information + Interactive Form */}
        <div className="glass-card" style={{ padding: "clamp(32px, 5vw, 64px)", textAlign: "left" }}>
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 64 }}>
             
             {/* Left Column: Contact Info */}
             <div>
                <div className="section-badge">Connect</div>
                <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Let's Build the Future.</h2>
                <p style={{ color: G.slate, marginBottom: 40, maxWidth: 450 }}>Available for global collaborations and high-impact digital infrastructure projects.</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                   {/* Phone Numbers */}
                   <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                     <a href={`tel:${G.phone1}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12, color: G.white, fontWeight: 700 }}>
                       <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: G.green }}>
                         <Phone size={18} />
                       </div>
                       {G.phone1}
                     </a>
                     <a href={`tel:${G.phone2}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12, color: G.white, fontWeight: 700 }}>
                       <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: G.green }}>
                         <Phone size={18} />
                       </div>
                       {G.phone2}
                     </a>
                   </div>

                   {/* Social Icons */}
                   <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                     {[
                       { icon: <Mail size={20} />, link: `mailto:${G.email}` },
                       { icon: <Linkedin size={20} />, link: G.linkedin },
                       { icon: <Github size={20} />, link: G.github },
                       { icon: <Send size={20} />, link: G.telegram }
                     ].map((social, i) => (
                       <a key={i} href={social.link} target={social.link.startsWith('mailto') ? "_self" : "_blank"} rel="noopener noreferrer" style={{ 
                         width: 52, height: 52, borderRadius: 16, 
                         background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", 
                         display: "flex", alignItems: "center", justifyContent: "center", 
                         color: G.white, transition: "all 0.3s ease" 
                       }} className="social-btn">
                         {social.icon}
                       </a>
                     ))}
                   </div>
                </div>
             </div>

             {/* Right Column: Interactive Form */}
             <form style={{ display: "flex", flexDirection: "column", gap: 16 }} onSubmit={(e) => {
               e.preventDefault();
               const form = e.target;
               const btn = form.querySelector('button');
               const originalText = btn.innerText;
               
               // Anti-Spam: Honeypot Check
               if (form.querySelector('input[name="_gotcha"]').value) {
                 return; // Silent fail for bots
               }

               btn.innerText = "SENDING...";
               btn.disabled = true;

               fetch(import.meta.env.VITE_FORMSPREE_URL, { 
                 method: "POST",
                 body: new FormData(form),
                 headers: { 'Accept': 'application/json' }
               }).then(response => {
                 if (response.ok) {
                   btn.innerText = "MESSAGE SENT!";
                   btn.style.background = "#059669";
                   form.reset();
                   setTimeout(() => {
                     btn.innerText = originalText;
                     btn.disabled = false;
                     btn.style.background = G.green;
                   }, 3000);
                 } else {
                   btn.innerText = "ERROR - TRY AGAIN";
                   btn.disabled = false;
                 }
               });
             }}>
                {/* Honeypot field (hidden from humans) */}
                <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 800, color: G.slate, textTransform: "uppercase", letterSpacing: "0.05em" }}>Full Name</label>
                    <input type="text" name="name" required placeholder="Tamerat Gebeyehu" style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 800, color: G.slate, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email Address</label>
                    <input type="email" name="email" required placeholder="your@email.com" style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 800, color: G.slate, textTransform: "uppercase", letterSpacing: "0.05em" }}>Project Details</label>
                  <textarea name="message" required placeholder="Tell me about your vision..." rows="4" style={{ ...inputStyle, resize: "none" }}></textarea>
                </div>
                <button type="submit" className="btn-main primary" style={{ width: "100%", marginTop: 8 }}>
                  SEND MESSAGE
                </button>
             </form>

           </div>
        </div>
      </div>

      <style>{`
        .social-btn:hover {
          background: rgba(16,185,129,0.1) !important;
          border-color: ${G.green} !important;
          color: ${G.green} !important;
          transform: translateY(-4px);
        }
      `}</style>
      <style>{`
        .social-btn:hover { background: ${G.green}; transform: translateY(-5px); box-shadow: 0 10px 20px ${G.green}40; }
      `}</style>
    </section>
  );
}
