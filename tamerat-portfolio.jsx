import { useState, useEffect } from "react"
import { Github, Linkedin, Youtube, Mail, Phone, Menu, X, ExternalLink, Code2, BookOpen, Award, Briefcase, Zap, ChevronRight, MapPin, Download, Globe, Smartphone, Database, Terminal, ArrowUpRight, Heart, Star, Activity, MessageCircle, Send } from "lucide-react"

// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────

const PROJECTS = [
  { id: 1, title: "Zemen Scholar", category: "EdTech", status: "Live", description: "Digital gateway for Ethiopian students to US higher education — 4-year roadmap, GPA converter, Visa Wizard, and Scholar's Glossary.", tech: ["Flutter", "Supabase", "Dart"], type: "Mobile", color: "#059669", icon: "🎓" },
  { id: 2, title: "Zemen Academy", category: "EdTech", status: "Live", description: "Offline-first quiz platform with 5,000+ practice questions aligned to Ethiopia's New Curriculum. Dual modes: Instant & Exam.", tech: ["Flutter", "Supabase", "SQL"], type: "Mobile", color: "#2563EB", icon: "📚" },
  { id: 3, title: "SindeTrack", category: "AgriTech", status: "Live", description: "Smart procurement system for the wheat trade — thermal-print receipts, multilingual UI, automated ledger. 80% faster bookkeeping.", tech: ["React", "Thermal Print", "SQL"], type: "Mobile", color: "#D97706", icon: "🌾" },
  { id: 4, title: "Visit Dodola", category: "Utility", status: "Live", description: "Trilingual offline-first directory for Dodola town — 11+ public services, digital heritage museum, works with zero connectivity.", tech: ["Flutter", "Local Storage", "Afaan Oromoo"], type: "Mobile", color: "#16A34A", icon: "🏔️" },
  { id: 5, title: "TallPath", category: "HealthTech", status: "Beta", description: "Gamified lifestyle app with GitHub-style activity maps, 18+ achievement badges, spinal exercises, and time-based nutrition guides.", tech: ["React", "Supabase", "Framer Motion"], type: "Web", color: "#7C3AED", icon: "💪" },
  { id: 6, title: "AbayKey", category: "Utility", status: "Beta", description: "High-performance Ethiopian keyboard engine with a gesture-family system for fast, natural Ethiopic script typing on mobile.", tech: ["Flutter", "Custom Engine", "Amharic"], type: "Mobile", color: "#DB2777", icon: "⌨️" },
]

const LAB_PROJECTS = [
  { id: 7, title: "TDA Trading Bot", status: "Backtesting", progress: 40, vision: "Automating market entry & exit logic without human emotion or fatigue.", tech: ["Python", "TradingView API", "Algo"], icon: "📈" },
  { id: 8, title: "DELALA", status: "Researching", progress: 25, vision: "Professionalizing Ethiopia's informal brokerage system into a trusted digital marketplace.", tech: ["React Native", "Supabase", "Maps API"], icon: "🤝" },
  { id: 9, title: "QOTABI Pay", status: "Prototyping", progress: 30, vision: "A localized micro-savings companion and digital wallet for Ethiopia's informal workforce.", tech: ["React Native", "Fintech API", "Offline-first"], icon: "💳" },
  { id: 10, title: "ADE Coffee", status: "Researching", progress: 20, vision: "Direct-to-consumer platform connecting Ethiopian coffee farmers to premium global buyers.", tech: ["Next.js", "Stripe", "Supabase"], icon: "☕" },
  { id: 11, title: "ADDE", status: "Prototyping", progress: 35, vision: "A premium resell marketplace blending Apple-level UX with AliExpress-level logistics.", tech: ["React", "Node.js", "PostgreSQL"], icon: "🛍️" },
]

const EDU = [
  { org: "Princeton University", course: "CS: Programming with a Purpose", type: "Current", color: "#F97316", logo: "P" },
  { org: "University of Chicago", course: "Machine Learning: Concepts & Applications", type: "Current", color: "#8B0000", logo: "UC" },
  { org: "WorldQuant University", course: "Applied Data Science Lab", type: "Current", color: "#1E3A5F", logo: "WQ" },
  { org: "Evangadi Tech", course: "Full-Stack Software Engineering", type: "2024–Present", color: "#059669", logo: "ET" },
  { org: "Google", course: "IT Support Professional Certificate", type: "Current", color: "#4285F4", logo: "G" },
  { org: "Macquarie University", course: "Excel Skills for Business", type: "Completed", color: "#C41E3A", logo: "MQ" },
  { org: "Admas Aero Nexus", course: "Aerospace Engineering & Aircraft Design", type: "Mar 2026–Present", color: "#64748B", logo: "AN" },
  { org: "Hawiko Academy", course: "Grade 11 · Natural Sciences", type: "Current", color: "#10B981", logo: "HA" },
]

const CERTS = [
  { name: "AI Fundamentals", issuer: "Google", color: "#4285F4" },
  { name: "AI Fundamentals", issuer: "Udacity", color: "#01B3E3" },
  { name: "AI for Business Professionals", issuer: "HP Life", color: "#0096D6" },
  { name: "Data Science & Analytics", issuer: "HP Life", color: "#0096D6" },
  { name: "Applied Data Science Lab", issuer: "WorldQuant University", color: "#1E3A5F" },
  { name: "Excel Skills for Business", issuer: "Macquarie University", color: "#C41E3A" },
  { name: "Professional Networking", issuer: "HP Life", color: "#0096D6" },
  { name: "Emergency Response", issuer: "Ethiopian Red Cross", color: "#C41E3A" },
  { name: "Blue Ocean Competition", issuer: "Participant", color: "#0369A1" },
]

const BLOG_POSTS = [
  { title: "Vibe Coding: How I Build 13+ Projects in Grade 11", date: "Apr 2026", read: "7 min", tag: "#VibeCoding", excerpt: "How AI-assisted architecture changed everything about how I ship software — and what it means for the next generation of Ethiopian developers." },
  { title: "The Offline-First Reality: Designing for Dodola", date: "Mar 2026", read: "5 min", tag: "#LocalTech", excerpt: "Building Visit Dodola taught me that empathy for your user's constraints is the most important architectural decision you can make." },
  { title: "From Bronze Medals to Aerospace Engineering", date: "Feb 2026", read: "6 min", tag: "#MyStory", excerpt: "How a single competition in January 2024 set a chain reaction in motion — from basic computing to orbital mechanics and LLM fine-tuning." },
  { title: "Why I'm Building AbayKey", date: "Jan 2026", read: "4 min", tag: "#Language", excerpt: "Language is the foundation of culture. The digital world should speak ours. Here's the technical story behind Ethiopia's gesture-based keyboard." },
]

// ──────────────────────────────────────────────
// STYLES
// ──────────────────────────────────────────────

const G = {
  dark: "#0A0F1E",
  card: "#111827",
  cardBorder: "#1F2937",
  green: "#10B981",
  greenDim: "#064E3B",
  slate: "#94A3B8",
  slateLight: "#CBD5E1",
  white: "#F8FAFC",
}

const tagStyle = (color) => ({
  display: "inline-block",
  padding: "2px 10px",
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 600,
  background: color + "22",
  color: color,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
})

// ──────────────────────────────────────────────
// NAV
// ──────────────────────────────────────────────

function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false)
  const links = ["Home", "Projects", "Education", "Lab", "Blog", "About"]

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(10,15,30,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid #1F2937" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => setPage("Home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #10B981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>TG</div>
          <span style={{ color: G.white, fontWeight: 700, fontSize: 15, fontFamily: "Syne, sans-serif", letterSpacing: "0.02em" }}>Tamerat<span style={{ color: G.green }}>.</span></span>
        </button>
        <nav style={{ display: "flex", gap: 4 }} className="desktop-nav">
          {links.map(l => (
            <button key={l} onClick={() => setPage(l)} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, color: page === l ? G.green : G.slate, transition: "all 0.2s", fontFamily: "inherit" }}>
              {l}
            </button>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: G.slate, display: "none" }} className="hamburger">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div style={{ background: G.card, borderTop: "1px solid " + G.cardBorder, padding: "16px 24px" }}>
          {links.map(l => (
            <button key={l} onClick={() => { setPage(l); setOpen(false) }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "12px 0", fontSize: 15, color: page === l ? G.green : G.slate, fontFamily: "inherit" }}>
              {l}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

// ──────────────────────────────────────────────
// HOME
// ──────────────────────────────────────────────

function Home({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: "88vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(16,185,129,0.04)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "5%", width: 200, height: 200, borderRadius: "50%", background: "rgba(37,99,235,0.05)", filter: "blur(60px)" }} />

        <div style={{ maxWidth: 800, position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#064E3B", borderRadius: 20, padding: "6px 16px", marginBottom: 32 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: G.green, animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 12, color: G.green, fontWeight: 600, letterSpacing: "0.05em" }}>DODOLA, ETHIOPIA · GRADE 11</span>
          </div>

          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, color: G.white, lineHeight: 1.1, margin: "0 0 24px", fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}>
            Bridging the Gap Between<br />
            <span style={{ color: G.green }}>Code and Community</span>
          </h1>

          <p style={{ fontSize: 18, color: G.slate, lineHeight: 1.7, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
            Building digital infrastructure for opportunity in Ethiopia — from agricultural supply chains to educational gateways.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("Projects")} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: G.green, color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "transform 0.2s" }}>
              View My Work <ArrowUpRight size={16} />
            </button>
            <button onClick={() => setPage("About")} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: G.slateLight, border: "1px solid #334155", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              About Me
            </button>
          </div>
        </div>
      </section>

      {/* Identity Grid */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[
            { icon: <Code2 size={22} color={G.green} />, label: "Self-Taught Developer", desc: "13+ mobile & web apps shipped while in Grade 11" },
            { icon: <Database size={22} color="#60A5FA" />, label: "Data Analyst", desc: "Training with Princeton, WorldQuant & UChicago" },
            { icon: <Heart size={22} color="#F87171" />, label: "Humanitarian Volunteer", desc: "Ethiopian Red Cross emergency response certified" },
          ].map(({ icon, label, desc }) => (
            <div key={label} style={{ background: G.card, border: "1px solid " + G.cardBorder, borderRadius: 16, padding: "28px 24px" }}>
              <div style={{ marginBottom: 14 }}>{icon}</div>
              <div style={{ color: G.white, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{label}</div>
              <div style={{ color: G.slate, fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Logo ribbon */}
      <section style={{ padding: "48px 24px", borderTop: "1px solid " + G.cardBorder, borderBottom: "1px solid " + G.cardBorder, marginBottom: 80 }}>
        <p style={{ textAlign: "center", color: G.slate, fontSize: 12, letterSpacing: "0.12em", marginBottom: 32, textTransform: "uppercase" }}>Learning from the world's leading institutions</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, alignItems: "center" }}>
          {[
            { name: "Princeton", color: "#F97316" }, { name: "UChicago", color: "#8B0000" }, { name: "WorldQuant", color: "#1E3A5F" },
            { name: "Google", color: "#4285F4" }, { name: "Evangadi", color: "#059669" }, { name: "Macquarie", color: "#C41E3A" },
          ].map(({ name, color }) => (
            <div key={name} style={{ color: "#475569", fontSize: 15, fontWeight: 700, fontFamily: "Syne, sans-serif", letterSpacing: "0.04em", padding: "8px 20px", border: "1px solid #1F2937", borderRadius: 8, transition: "all 0.2s" }}>
              <span style={{ color }}>{name.charAt(0)}</span>{name.slice(1)}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
          <div>
            <p style={{ color: G.green, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Featured Work</p>
            <h2 style={{ color: G.white, fontSize: 32, fontWeight: 800, margin: 0, fontFamily: "Syne, sans-serif" }}>Selected Projects</h2>
          </div>
          <button onClick={() => setPage("Projects")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: G.green, fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}>
            All Projects <ChevronRight size={16} />
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {PROJECTS.slice(0, 4).map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: G.card, borderTop: "1px solid " + G.cardBorder, textAlign: "center" }}>
        <h2 style={{ color: G.white, fontSize: 36, fontWeight: 800, fontFamily: "Syne, sans-serif", marginBottom: 16 }}>Let's Build Something Together</h2>
        <p style={{ color: G.slate, fontSize: 16, marginBottom: 32 }}>Open to collaborations, research partnerships, and global opportunities.</p>
        <button onClick={() => setPage("About")} style={{ background: G.green, color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          Get In Touch
        </button>
      </section>
    </div>
  )
}

// ──────────────────────────────────────────────
// PROJECT CARD
// ──────────────────────────────────────────────

function ProjectCard({ project: p, lab = false }) {
  const [hover, setHover] = useState(false)
  const statusColor = p.status === "Live" ? G.green : p.status === "Beta" ? "#F59E0B" : "#60A5FA"

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: G.card, border: "1px solid " + (hover ? "#334155" : G.cardBorder), borderRadius: 16, overflow: "hidden", transition: "all 0.3s", transform: hover ? "translateY(-4px)" : "none", boxShadow: hover ? "0 20px 40px rgba(0,0,0,0.4)" : "none" }}
    >
      {/* Color bar header */}
      <div style={{ background: p.color + "20", borderBottom: "1px solid " + p.color + "33", padding: "28px 24px", fontSize: 36, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>{p.icon}</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ ...tagStyle(statusColor) }}>{p.status}</span>
          {p.type && <span style={{ ...tagStyle("#64748B") }}>{p.type}</span>}
        </div>
      </div>
      <div style={{ padding: "20px 24px" }}>
        <h3 style={{ color: G.white, fontSize: 18, fontWeight: 700, margin: "0 0 10px", fontFamily: "Syne, sans-serif" }}>{p.title}</h3>
        <p style={{ color: G.slate, fontSize: 14, lineHeight: 1.65, margin: "0 0 16px" }}>{p.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.tech?.map(t => (
            <span key={t} style={{ background: "#1F2937", color: "#94A3B8", fontSize: 11, padding: "3px 10px", borderRadius: 6, fontFamily: "monospace" }}>#{t}</span>
          ))}
        </div>
        {lab && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: G.slate }}>Progress</span>
              <span style={{ fontSize: 11, color: G.green, fontWeight: 600 }}>{p.progress}%</span>
            </div>
            <div style={{ height: 4, background: "#1F2937", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: p.progress + "%", background: "linear-gradient(90deg, " + G.green + ", #059669)", borderRadius: 2, transition: "width 1s ease" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// PROJECTS PAGE
// ──────────────────────────────────────────────

const CATEGORIES = ["All", "EdTech", "AgriTech", "HealthTech", "Utility", "Under Development"]

function Projects() {
  const [filter, setFilter] = useState("All")

  const filtered = filter === "All"
    ? [...PROJECTS, ...LAB_PROJECTS.map(l => ({ ...l, category: "Under Development", status: l.status, color: "#475569" }))]
    : filter === "Under Development"
      ? LAB_PROJECTS.map(l => ({ ...l, category: "Under Development", status: l.status, color: "#475569" }))
      : PROJECTS.filter(p => p.category === filter)

  return (
    <div style={{ padding: "64px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ color: G.green, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>My Work</p>
        <h1 style={{ color: G.white, fontSize: 48, fontWeight: 800, fontFamily: "Syne, sans-serif", margin: "0 0 16px", letterSpacing: "-0.02em" }}>All Projects</h1>
        <p style={{ color: G.slate, fontSize: 17, maxWidth: 540, margin: "0 auto" }}>From educational infrastructure to agricultural logistics — building tools that solve real-world problems.</p>
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 48 }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ background: filter === cat ? G.green : G.card, color: filter === cat ? "#fff" : G.slate, border: "1px solid " + (filter === cat ? G.green : G.cardBorder), borderRadius: 20, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {filtered.map(p => <ProjectCard key={p.id} project={p} lab={p.category === "Under Development"} />)}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// EDUCATION PAGE
// ──────────────────────────────────────────────

function Education() {
  return (
    <div style={{ padding: "64px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ color: G.green, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>The Journey</p>
        <h1 style={{ color: G.white, fontSize: 48, fontWeight: 800, fontFamily: "Syne, sans-serif", margin: "0 0 16px", letterSpacing: "-0.02em" }}>Experience & Education</h1>
        <p style={{ color: G.slate, fontSize: 17, maxWidth: 560, margin: "0 auto" }}>Local leadership meets global technical training — combining local community leadership with international academic rigor.</p>
      </div>

      {/* Download CV */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 56 }}>
        <button style={{ display: "inline-flex", alignItems: "center", gap: 8, background: G.green, color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          <Download size={15} /> Download CV
        </button>
      </div>

      {/* Professional Experience */}
      <div style={{ marginBottom: 64 }}>
        <h2 style={{ color: G.white, fontSize: 24, fontWeight: 700, fontFamily: "Syne, sans-serif", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <Briefcase size={20} color={G.green} /> Developer Experience
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { role: "Lead Developer — SindeTrack", period: "2025–Present", desc: "Digitizing agricultural logistics for local wheat trade. Reduced daily bookkeeping time by 80%, eliminated paper-based data loss.", tag: "AgriTech" },
            { role: "Founder — Zemen Projects", period: "2024–Present", desc: "Developed educational infrastructure — Scholar for US admissions guidance, Academy for curriculum-aligned practice.", tag: "EdTech" },
            { role: "Emergency Response Volunteer — ERCS", period: "2024–Present", desc: "Certified in community service, emergency response, and humanitarian leadership by the Ethiopian Red Cross Society.", tag: "Humanitarian" },
          ].map(exp => (
            <div key={exp.role} style={{ background: G.card, border: "1px solid " + G.cardBorder, borderRadius: 14, padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ color: G.white, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{exp.role}</div>
                <div style={{ color: G.slate, fontSize: 14, lineHeight: 1.6, maxWidth: 560 }}>{exp.desc}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: G.slate, fontSize: 13, marginBottom: 8 }}>{exp.period}</div>
                <span style={{ ...tagStyle(G.green) }}>{exp.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Global Classroom */}
      <div style={{ marginBottom: 64 }}>
        <h2 style={{ color: G.white, fontSize: 24, fontWeight: 700, fontFamily: "Syne, sans-serif", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <BookOpen size={20} color={G.green} /> The Global Classroom
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {EDU.map(e => (
            <div key={e.org + e.course} style={{ background: G.card, border: "1px solid " + G.cardBorder, borderRadius: 14, padding: "20px 22px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: e.color + "22", border: "1px solid " + e.color + "44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: e.color, flexShrink: 0, fontFamily: "Syne, sans-serif" }}>{e.logo}</div>
              <div>
                <div style={{ color: G.white, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{e.org}</div>
                <div style={{ color: G.slate, fontSize: 12, lineHeight: 1.5, marginBottom: 8 }}>{e.course}</div>
                <span style={{ ...tagStyle("#475569"), fontSize: 10 }}>{e.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div style={{ marginBottom: 64 }}>
        <h2 style={{ color: G.white, fontSize: 24, fontWeight: 700, fontFamily: "Syne, sans-serif", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <Award size={20} color={G.green} /> Honors & Awards
        </h2>
        <div style={{ background: G.card, border: "1px solid " + G.cardBorder, borderRadius: 14, padding: "28px" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: "#92400E22", border: "1px solid #92400E44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🥉</div>
            <div>
              <div style={{ color: G.white, fontWeight: 700, fontSize: 17 }}>Bronze Medal · Computer Skills Competition</div>
              <div style={{ color: G.slate, fontSize: 14, marginTop: 4 }}>Victory Wisdom School · January 2024 · The catalyst for everything that followed.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div style={{ marginBottom: 64 }}>
        <h2 style={{ color: G.white, fontSize: 24, fontWeight: 700, fontFamily: "Syne, sans-serif", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <Star size={20} color={G.green} /> Certifications
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {CERTS.map(c => (
            <div key={c.name + c.issuer} style={{ background: G.card, border: "1px solid " + G.cardBorder, borderRadius: 12, padding: "18px 20px" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: c.color + "22", border: "1px solid " + c.color + "44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: c.color, marginBottom: 12, fontFamily: "Syne, sans-serif" }}>{c.issuer.charAt(0)}</div>
              <div style={{ color: G.white, fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{c.name}</div>
              <div style={{ color: G.slate, fontSize: 11, marginBottom: 12 }}>{c.issuer}</div>
              <button style={{ background: "none", border: "1px solid " + G.cardBorder, borderRadius: 6, padding: "5px 12px", color: G.slate, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Verify →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 style={{ color: G.white, fontSize: 24, fontWeight: 700, fontFamily: "Syne, sans-serif", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <Zap size={20} color={G.green} /> Skills Matrix
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[
            { label: "Core Tech", color: G.green, skills: ["Flutter", "React", "Supabase", "Node.js", "SQL", "Dart", "Python"] },
            { label: "AI & Data", color: "#60A5FA", skills: ["Prompt Engineering", "LLM Architecture", "Excel Analytics", "Statistical Modeling", "Vibe Coding"] },
            { label: "Creative & Leadership", color: "#F472B6", skills: ["Video Production", "Pitch Design", "Amharic / Afaan Oromoo UI", "Emergency Response", "Multilingual Localization"] },
          ].map(group => (
            <div key={group.label} style={{ background: G.card, border: "1px solid " + G.cardBorder, borderRadius: 14, padding: "24px" }}>
              <div style={{ color: group.color, fontWeight: 700, fontSize: 13, marginBottom: 16, letterSpacing: "0.06em", textTransform: "uppercase" }}>{group.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.skills.map(s => (
                  <span key={s} style={{ background: group.color + "15", color: group.color, border: "1px solid " + group.color + "30", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// LAB PAGE
// ──────────────────────────────────────────────

function Lab() {
  return (
    <div style={{ background: "#030712", minHeight: "100vh", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ color: "#22D3EE", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12, fontFamily: "monospace" }}>$ cd /innovation-lab</p>
          <h1 style={{ color: "#F1F5F9", fontSize: 48, fontWeight: 800, fontFamily: "Syne, sans-serif", margin: "0 0 16px", letterSpacing: "-0.02em" }}>The Innovation Lab</h1>
          <p style={{ color: "#64748B", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>Where curiosity meets code. Exploring the future of AI, Finance, and Logistics in Ethiopia.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, marginBottom: 56 }}>
          {LAB_PROJECTS.map(p => (
            <LabCard key={p.id} project={p} />
          ))}
        </div>

        {/* What I'm Learning */}
        <div style={{ background: "#0F172A", border: "1px solid #1E293B", borderRadius: 16, padding: "32px" }}>
          <h2 style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 700, fontFamily: "Syne, sans-serif", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <Activity size={18} color="#22D3EE" /> Current Lab Skills
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Advanced LLM Fine-tuning", "Aerospace Structural Analysis", "Financial Modeling", "Backtesting Algorithms", "React Native Offline Arch", "Fintech API Integration"].map(s => (
              <span key={s} style={{ background: "#1E293B", color: "#94A3B8", border: "1px solid #334155", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontFamily: "monospace" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function LabCard({ project: p }) {
  const [hover, setHover] = useState(false)
  const statusColors = { "Backtesting": "#22D3EE", "Researching": "#A78BFA", "Prototyping": "#34D399" }
  const sc = statusColors[p.status] || "#94A3B8"

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: "#0F172A", border: "1px solid " + (hover ? sc + "66" : "#1E293B"), borderRadius: 16, padding: "24px", transition: "all 0.3s", boxShadow: hover ? "0 0 24px " + sc + "22" : "none" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ fontSize: 28 }}>{p.icon}</span>
        <div style={{ background: sc + "20", border: "1px solid " + sc + "44", borderRadius: 6, padding: "3px 10px" }}>
          <span style={{ fontSize: 10, color: sc, fontWeight: 600, fontFamily: "monospace", letterSpacing: "0.05em" }}>STATUS: {p.status.toUpperCase()}</span>
        </div>
      </div>
      <h3 style={{ color: "#F1F5F9", fontSize: 18, fontWeight: 700, margin: "0 0 10px", fontFamily: "Syne, sans-serif" }}>{p.title}</h3>
      <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.65, margin: "0 0 16px" }}>{p.vision}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {p.tech.map(t => <span key={t} style={{ background: "#1E293B", color: "#64748B", fontSize: 11, padding: "3px 8px", borderRadius: 5, fontFamily: "monospace" }}>{t}</span>)}
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: "#475569" }}>Progress</span>
          <span style={{ fontSize: 11, color: sc, fontWeight: 600 }}>{p.progress}%</span>
        </div>
        <div style={{ height: 3, background: "#1E293B", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: p.progress + "%", background: sc, borderRadius: 2 }} />
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// BLOG PAGE
// ──────────────────────────────────────────────

function Blog() {
  return (
    <div style={{ padding: "64px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ color: G.green, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>The Digital Ledger</p>
        <h1 style={{ color: G.white, fontSize: 48, fontWeight: 800, fontFamily: "Syne, sans-serif", margin: "0 0 16px", letterSpacing: "-0.02em" }}>Writing & Thought</h1>
        <p style={{ color: G.slate, fontSize: 17, maxWidth: 520, margin: "0 auto" }}>Thoughts on AI, local infrastructure, and the journey of a self-taught developer in Ethiopia.</p>
      </div>

      {/* Featured post */}
      <div style={{ background: G.card, border: "1px solid " + G.cardBorder, borderRadius: 20, padding: "40px", marginBottom: 32 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <span style={{ ...tagStyle(G.green) }}>Featured</span>
          <span style={{ ...tagStyle("#64748B") }}>#VibeCoding</span>
          <span style={{ color: G.slate, fontSize: 13 }}>Apr 2026 · 7 min read</span>
        </div>
        <h2 style={{ color: G.white, fontSize: 28, fontWeight: 800, fontFamily: "Syne, sans-serif", margin: "0 0 16px", lineHeight: 1.2 }}>Vibe Coding: How I Build 13+ Projects in Grade 11</h2>
        <p style={{ color: G.slate, fontSize: 16, lineHeight: 1.7, marginBottom: 24, maxWidth: 640 }}>How AI-assisted architecture changed everything about how I ship software — and what it means for the next generation of Ethiopian developers who don't have access to traditional CS education paths.</p>
        <button style={{ display: "inline-flex", alignItems: "center", gap: 6, background: G.green, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          Read Post <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Post grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginBottom: 56 }}>
        {BLOG_POSTS.slice(1).map(post => (
          <div key={post.title} style={{ background: G.card, border: "1px solid " + G.cardBorder, borderRadius: 14, padding: "24px" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
              <span style={{ ...tagStyle("#475569"), fontSize: 10 }}>{post.tag}</span>
              <span style={{ color: G.slate, fontSize: 12 }}>{post.date} · {post.read}</span>
            </div>
            <h3 style={{ color: G.white, fontSize: 16, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.3, fontFamily: "Syne, sans-serif" }}>{post.title}</h3>
            <p style={{ color: G.slate, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{post.excerpt}</p>
          </div>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div style={{ background: "linear-gradient(135deg, #064E3B, #065F46)", borderRadius: 20, padding: "48px 40px", textAlign: "center" }}>
        <h3 style={{ color: "#fff", fontSize: 24, fontWeight: 700, fontFamily: "Syne, sans-serif", marginBottom: 10 }}>Join the Journey</h3>
        <p style={{ color: "#6EE7B7", fontSize: 15, marginBottom: 24 }}>Get notified when I launch new projects or publish new insights.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <input placeholder="your@email.com" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "12px 20px", color: "#fff", fontSize: 14, width: 240, outline: "none", fontFamily: "inherit" }} />
          <button style={{ background: G.green, color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Subscribe</button>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// ABOUT PAGE
// ──────────────────────────────────────────────

const SOCIALS = [
  { label: "GitHub", icon: <Github size={20} />, color: "#E2E8F0", href: "#" },
  { label: "LinkedIn", icon: <Linkedin size={20} />, color: "#0A66C2", href: "#" },
  { label: "YouTube", icon: <Youtube size={20} />, color: "#FF0000", href: "#" },
  { label: "Email", icon: <Mail size={20} />, color: G.green, href: "mailto:tamerat@email.com" },
  { label: "Telegram", icon: <Send size={20} />, color: "#229ED9", href: "#" },
  { label: "Discord", icon: <MessageCircle size={20} />, color: "#5865F2", href: "#" },
  { label: "Phone", icon: <Phone size={20} />, color: "#34D399", href: "tel:+251" },
  { label: "TikTok", icon: <Globe size={20} />, color: "#FF004F", href: "#" },
]

function About() {
  return (
    <div style={{ padding: "64px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "start" }}>

        {/* About Narrative */}
        <div>
          <p style={{ color: G.green, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>The Human Behind the Code</p>

          {/* Profile placeholder */}
          <div style={{ width: 110, height: 110, borderRadius: 18, background: "linear-gradient(135deg, #064E3B, #065F46)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, marginBottom: 28, border: "3px solid " + G.green + "44" }}>
            👨‍💻
          </div>

          <h1 style={{ color: G.white, fontSize: 36, fontWeight: 800, fontFamily: "Syne, sans-serif", margin: "0 0 6px", letterSpacing: "-0.02em" }}>Tamerat Gebeheyu</h1>
          <p style={{ color: G.green, fontSize: 14, fontWeight: 600, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={14} /> Dodola, Oromia, Ethiopia
          </p>

          <blockquote style={{ borderLeft: "3px solid " + G.green, paddingLeft: 20, margin: "0 0 24px", color: G.slateLight, fontSize: 16, fontStyle: "italic", lineHeight: 1.7 }}>
            "I don't just write code; I build bridges between current challenges and future opportunities."
          </blockquote>

          <p style={{ color: G.slate, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
            I'm a Grade 11 student and self-taught software developer based in Dodola, Ethiopia. My journey began in January 2024 when a bronze medal in a computer skills competition proved that technology was my language.
          </p>
          <p style={{ color: G.slate, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
            Since then, I've taken a "Global Classroom" approach — combining academic rigor from Princeton, WorldQuant, and the University of Chicago with the local insights of daily life in Oromia, creating tools that solve real problems for real communities.
          </p>
          <p style={{ color: G.slate, fontSize: 15, lineHeight: 1.8 }}>
            I am a developer, a data enthusiast, and a humanitarian volunteer. I am building the digital future of Ethiopia — one line of code at a time.
          </p>
        </div>

        {/* Contact Hub */}
        <div>
          <h2 style={{ color: G.white, fontSize: 28, fontWeight: 800, fontFamily: "Syne, sans-serif", margin: "0 0 8px" }}>Let's Build Something</h2>
          <p style={{ color: G.slate, fontSize: 15, marginBottom: 32 }}>Open to global collaborations, research partnerships, and university opportunities.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {SOCIALS.map(s => (
              <SocialCard key={s.label} {...s} />
            ))}
          </div>

          <div style={{ marginTop: 32, background: G.card, border: "1px solid " + G.cardBorder, borderRadius: 14, padding: "24px" }}>
            <div style={{ color: G.white, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Quick Message</div>
            <textarea placeholder="Say hello or propose a collaboration..." style={{ width: "100%", background: "#0F172A", border: "1px solid " + G.cardBorder, borderRadius: 8, padding: "12px", color: G.slateLight, fontSize: 14, resize: "vertical", minHeight: 100, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
            <button style={{ marginTop: 12, background: G.green, color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", width: "100%" }}>
              Send Message
            </button>
          </div>

          <p style={{ color: G.slate, fontSize: 12, textAlign: "center", marginTop: 24, fontStyle: "italic" }}>
            Currently based in Dodola, Ethiopia. Available for global collaborations.
          </p>
        </div>
      </div>
    </div>
  )
}

function SocialCard({ label, icon, color, href }) {
  const [hover, setHover] = useState(false)
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", alignItems: "center", gap: 12, background: hover ? G.card : "transparent", border: "1px solid " + (hover ? "#334155" : G.cardBorder), borderRadius: 12, padding: "14px 16px", textDecoration: "none", transition: "all 0.2s", cursor: "pointer" }}>
      <span style={{ color, transition: "transform 0.2s", transform: hover ? "scale(1.15)" : "none" }}>{icon}</span>
      <span style={{ color: G.slateLight, fontSize: 13, fontWeight: 600 }}>{label}</span>
    </a>
  )
}

// ──────────────────────────────────────────────
// FOOTER
// ──────────────────────────────────────────────

function Footer({ setPage }) {
  return (
    <footer style={{ background: "#030712", borderTop: "1px solid #0F172A", padding: "56px 24px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 48 }}>

          {/* Identity */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #10B981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>TG</div>
              <span style={{ color: "#F8FAFC", fontWeight: 700, fontSize: 16, fontFamily: "Syne, sans-serif" }}>Tamerat Gebeheyu</span>
            </div>
            <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>Building digital infrastructure for Ethiopia's future.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748B", fontSize: 12 }}>
              <MapPin size={12} /> Dodola, Ethiopia
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ color: "#94A3B8", fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Quick Links</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Home", "Projects", "Lab", "Education", "Blog", "About"].map(l => (
                <button key={l} onClick={() => setPage(l)} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 13, textAlign: "left", padding: 0, fontFamily: "inherit", transition: "color 0.2s" }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <div style={{ color: "#94A3B8", fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Connect</div>
            <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
              {[<Github size={18} />, <Linkedin size={18} />, <Youtube size={18} />, <Send size={18} />].map((icon, i) => (
                <a key={i} href="#" style={{ color: "#475569", transition: "color 0.2s" }}>{icon}</a>
              ))}
            </div>
            <button onClick={() => { window.scrollTo(0, 0) }} style={{ display: "flex", alignItems: "center", gap: 6, background: "#0F172A", border: "1px solid #1E293B", borderRadius: 8, padding: "8px 16px", color: "#64748B", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
              ↑ Back to top
            </button>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #0F172A", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "#334155", fontSize: 12 }}>© 2026 Tamerat Gebeheyu · Built with React, Supabase, and AI</span>
          <span style={{ color: "#334155", fontSize: 12, fontStyle: "italic" }}>Learning globally, building locally.</span>
        </div>
      </div>
    </footer>
  )
}

// ──────────────────────────────────────────────
// APP
// ──────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("Home")

  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
    document.head.appendChild(link)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  const PAGES = { Home, Projects, Education, Lab, Blog, About }
  const PageComponent = PAGES[page] || Home

  return (
    <div style={{ background: G.dark, minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", color: G.white }}>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .hamburger { display: flex !important; } }
        button:hover { opacity: 0.9; }
        a { transition: color 0.2s; }
        a:hover { color: #10B981 !important; }
        input::placeholder, textarea::placeholder { color: #475569; }
      `}</style>
      <Nav page={page} setPage={setPage} />
      <main>
        <PageComponent setPage={setPage} />
      </main>
      <Footer setPage={setPage} />
    </div>
  )
}
