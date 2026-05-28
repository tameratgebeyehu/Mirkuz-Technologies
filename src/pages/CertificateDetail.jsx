import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Award, ShieldCheck, CheckCircle2, Calendar, FileText, Globe, Trophy, Waves, Lightbulb } from 'lucide-react';
import { CERTIFICATIONS, G } from '../data/portfolioData';

// Import Logos for Credentials
import googleImg from '../logos/google logo.png';
import hplifeImg from '../logos/hp life logo.png';
import udacityImg from '../logos/udacity logo.png';
import redcrossImg from '../logos/ethiopian red cross society logo.jpg';
import macquarieImg from '../logos/macquarie logo (2).jpg';

export default function CertificateDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [cert, setCert] = useState(null);

  // Map textual logos to imported images
  const logoMap = {
    "Google": googleImg,
    "HP Life": hplifeImg,
    "Udacity": udacityImg,
    "ERCS": redcrossImg,
    "Macquarie University": macquarieImg,
    "Nestlé": <Lightbulb size={48} color={G.green} />,
    "Blue Ocean Strategy": <Waves size={48} color={G.green} />
  };

  useEffect(() => {
    const found = CERTIFICATIONS.find(c => c.slug === slug);
    if (found) {
      setCert(found);
      document.title = `${found.title} — Certificate Details`;
    } else {
      navigate('/education');
    }
  }, [slug, navigate]);

  if (!cert) return null;

  const fd = cert.fullDescription || {};
  const isLinkable = cert.link && cert.link !== "#";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: 100 }}
    >
      {/* Hero Header Section */}
      <section style={{
        position: 'relative',
        background: `linear-gradient(180deg, rgba(16,185,129,0.08) 0%, #060913 100%)`,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '80px 0 60px'
      }}>
        {/* Dynamic Background Glow */}
        <div style={{ position: "absolute", top: "20%", left: "10%", width: "25vw", height: "25vw", background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)", filter: "blur(80px)", zIndex: 0, pointerEvents: "none" }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Link to="/education" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 8, 
            color: G.slate, 
            textDecoration: 'none', 
            fontSize: 14, 
            fontWeight: 600,
            background: "rgba(255,255,255,0.03)", 
            padding: "8px 16px", 
            borderRadius: "20px", 
            border: "1px solid rgba(255,255,255,0.05)",
            marginBottom: 48,
            transition: 'all 0.2s'
          }} className="back-btn">
            <ArrowLeft size={16} /> Back to Education
          </Link>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              style={{
                width: 120, height: 120,
                borderRadius: 28,
                background: `linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))`,
                border: `1px solid rgba(16,185,129,0.25)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 20px 40px rgba(16,185,129,0.05)`,
                overflow: 'hidden',
                flexShrink: 0
              }}
            >
              {logoMap[cert.org] && typeof logoMap[cert.org] === 'string' && logoMap[cert.org].length > 10 ? (
                <img 
                  src={logoMap[cert.org]} 
                  alt={cert.org} 
                  style={{ width: "65%", height: "65%", objectFit: "contain" }} 
                />
              ) : (
                logoMap[cert.org] || <Trophy size={48} color={G.green} />
              )}
            </motion.div>

            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(16,185,129,0.1)', color: G.green, padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid rgba(16,185,129,0.2)' }}>
                  Verified Badge
                </span>
                <span style={{ background: 'rgba(255,255,255,0.05)', color: G.slateLight, padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {cert.org}
                </span>
              </div>
              
              <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 900, marginBottom: 16, lineHeight: 1.2, color: '#fff' }}>{cert.title}</h1>
              <p style={{ fontSize: '18px', color: G.slateLight, fontWeight: 500, maxWidth: 700, lineHeight: 1.5 }}>
                {cert.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="container" style={{ marginTop: 60 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 60 }}>
          
          {/* Left Column: Details & Modules */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            <div>
              <h3 style={{ color: G.white, fontSize: 22, fontWeight: 800, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Award size={20} color={G.green} /> Overview & Strategic Context
              </h3>
              <p style={{ color: G.slate, fontSize: 16, lineHeight: 1.8 }}>{fd.overview}</p>
            </div>

            {fd.syllabus && (
              <div>
                <h3 style={{ color: G.white, fontSize: 22, fontWeight: 800, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FileText size={20} color={G.green} /> Syllabus & Scope
                </h3>
                <p style={{ color: G.slate, fontSize: 16, lineHeight: 1.8 }}>{fd.syllabus}</p>
              </div>
            )}

            {fd.modules && fd.modules.length > 0 && (
              <div>
                <h3 style={{ color: G.white, fontSize: 22, fontWeight: 800, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle2 size={20} color={G.green} /> Core Curriculum Modules
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {fd.modules.map((m, idx) => (
                    <div key={idx} style={{ 
                      background: 'rgba(255,255,255,0.01)', 
                      border: '1px solid rgba(255,255,255,0.04)', 
                      padding: '16px 20px', 
                      borderRadius: 16,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16
                    }}>
                      <div style={{ color: G.green, fontWeight: 900, fontSize: 14 }}>{String(idx + 1).padStart(2, '0')}</div>
                      <div style={{ fontSize: 15, color: G.slateLight, fontWeight: 600 }}>{m}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Metadata & Skills Gained */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            
            {/* Verification Metadata Box */}
            <div style={{ 
              background: 'rgba(255,255,255,0.01)', 
              border: '1px solid rgba(255,255,255,0.05)', 
              borderRadius: 24, 
              padding: 32,
              backdropFilter: 'blur(10px)'
            }}>
              <h4 style={{ fontSize: 12, fontWeight: 900, color: G.slate, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>
                Credential Verification
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 12 }}>
                  <span style={{ fontSize: 14, color: G.slate }}>Authority</span>
                  <span style={{ fontSize: 14, color: '#fff', fontWeight: 700 }}>{cert.org}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 12 }}>
                  <span style={{ fontSize: 14, color: G.slate }}>Credential ID</span>
                  <span style={{ fontSize: 13, color: '#fff', fontWeight: 500, fontFamily: 'monospace', opacity: 0.8 }}>{fd.credentialId || cert.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 12 }}>
                  <span style={{ fontSize: 14, color: G.slate }}>Verification</span>
                  <span style={{ fontSize: 13, color: isLinkable ? G.green : '#f43f5e', fontWeight: 800 }}>
                    {isLinkable ? "ONLINE VERIFIED" : "OFFLINE RECORD"}
                  </span>
                </div>
              </div>

              {isLinkable ? (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn-main primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '14px', fontSize: 14 }}>
                  <Globe size={16} style={{ marginRight: 8 }} /> Verify on Issuer Website <ExternalLink size={14} style={{ marginLeft: 4 }} />
                </a>
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  fontSize: 13, 
                  color: G.slate, 
                  padding: '12px', 
                  borderRadius: 12, 
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)' 
                }}>
                  Offline Record Verified via School Registry
                </div>
              )}
            </div>

            {/* Skills Gained */}
            {fd.skills && fd.skills.length > 0 && (
              <div>
                <h4 style={{ fontSize: 12, fontWeight: 900, color: G.slate, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                  Skills Formulated
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {fd.skills.map(skill => (
                    <span key={skill} style={{ 
                      background: 'rgba(16,185,129,0.06)', 
                      padding: '8px 16px', 
                      borderRadius: 100, 
                      fontSize: 13, 
                      fontWeight: 700, 
                      color: G.green,
                      border: '1px solid rgba(16,185,129,0.15)'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      <style>{`
        .back-btn:hover { 
          background: rgba(255,255,255,0.08) !important;
          color: #fff !important; 
          border-color: rgba(255,255,255,0.1);
        }
      `}</style>
    </motion.div>
  );
}
