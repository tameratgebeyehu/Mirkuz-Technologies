import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, CheckCircle2, User, Mail, Smartphone } from 'lucide-react';
import { G } from '../data/portfolioData';

export default function TallPathSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate a brief loading transition for premium feel
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Construct Telegram deep link message
      const textMessage = `Hello,

I would like to join the TallPath Early Access Program.

Name: ${name}
Email: ${email}

Thank you.`;

      const telegramUrl = `https://t.me/silencewarrenty?text=${encodeURIComponent(textMessage)}`;
      
      // Open Telegram in a new tab/window
      window.open(telegramUrl, '_blank');
    }, 1200);
  };

  return (
    <section id="tallpath-early-access" style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
      
      {/* Decorative Blur Background Accent */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '60vw', height: '40vh',
        background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.05) 0%, transparent 70%)',
        filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="glass-card tallpath-card"
        >
          {/* Main Layout Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'center',
          }} className="tallpath-layout-grid">
            
            {/* LEFT: Marketing Information & App Mockup */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* Early Access Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: 20, padding: '5px 14px',
                  color: '#10b981', fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.05em', textTransform: 'uppercase'
                }}>
                  <Smartphone size={12} /> TallPath Early Access
                </span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: 20, padding: '5px 14px',
                  color: '#f59e0b', fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.05em', textTransform: 'uppercase'
                }}>
                  Beta Program Open
                </span>
              </div>

              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900,
                color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em',
                marginBottom: 0
              }}>
                Be Among the First to Experience TallPath
              </h2>

              <p style={{
                color: 'rgba(255, 255, 255, 0.55)', fontSize: 15, lineHeight: 1.7,
                marginBottom: 8
              }}>
                TallPath is currently in active development. Join our Early Access Program and get exclusive access to upcoming features before the public launch. Help shape the future of TallPath by providing feedback and testing new features.
              </p>

              {/* Graphic Mockup Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                  position: 'relative',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(0,0,0,0.2)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}
              >
                <img
                  src="/tallpath-mockup.png"
                  alt="TallPath App Mockup Preview"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 280,
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </motion.div>

            </div>

            {/* RIGHT: Validation Form Container */}
            <div className="tallpath-form-container">
              
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="access-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                  >
                    <div style={{ marginBottom: 4 }}>
                      <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Apply for Access</h3>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.5 }}>
                        Approved applicants will be added to the Google Play testing track.
                      </p>
                    </div>

                    {/* Name Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600 }}>Your Name</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }}>
                          <User size={16} />
                        </span>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          style={{
                            width: '100%',
                            padding: '14px 16px 14px 42px',
                            background: 'rgba(255,255,255,0.03)',
                            border: errors.name ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 12,
                            color: '#fff',
                            fontSize: 14,
                            outline: 'none',
                            transition: 'all 0.25s ease',
                            caretColor: '#10b981',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#10b981'}
                          onBlur={(e) => e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(255,255,255,0.08)'}
                        />
                      </div>
                      {errors.name && (
                        <span style={{ color: '#ef4444', fontSize: 12, fontWeight: 500, marginTop: 2 }}>{errors.name}</span>
                      )}
                    </div>

                    {/* Email Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600 }}>Email Address</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }}>
                          <Mail size={16} />
                        </span>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          style={{
                            width: '100%',
                            padding: '14px 16px 14px 42px',
                            background: 'rgba(255,255,255,0.03)',
                            border: errors.email ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 12,
                            color: '#fff',
                            fontSize: 14,
                            outline: 'none',
                            transition: 'all 0.25s ease',
                            caretColor: '#10b981',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#10b981'}
                          onBlur={(e) => e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(255,255,255,0.08)'}
                        />
                      </div>
                      {errors.email && (
                        <span style={{ color: '#ef4444', fontSize: 12, fontWeight: 500, marginTop: 2 }}>{errors.email}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(16,185,129,0.2)' }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: '#10b981',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 12,
                        padding: '16px',
                        fontWeight: 800,
                        fontSize: 15,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                        cursor: 'pointer',
                        marginTop: 8,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {loading ? (
                        <>
                          <div style={{
                            width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)',
                            borderTop: '2px solid #fff', borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite'
                          }} />
                          Processing Application...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Request Early Access
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '20px 0',
                    }}
                  >
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: 'rgba(16,185,129,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 20, border: '1px solid rgba(16,185,129,0.25)'
                    }}>
                      <CheckCircle2 size={30} color="#10b981" />
                    </div>
                    
                    <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Application Prepared!</h3>
                    
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: 14,
                      lineHeight: 1.6,
                      marginBottom: 24,
                    }}>
                      Thank you for your interest in TallPath. Your application has been prepared and will be sent through Telegram for review.
                    </p>

                    <motion.button
                      onClick={() => setSuccess(false)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.8)',
                        borderRadius: 10,
                        padding: '10px 20px',
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Fill another request
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </motion.div>
      </div>

      {/* Local style classes */}
      <style>{`
        .tallpath-card {
          padding: 50px 40px;
          background: rgba(255, 255, 255, 0.01) !important;
          border: 1px solid rgba(255, 255, 255, 0.06) !important;
          border-radius: 32px !important;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35) !important;
        }
        .tallpath-form-container {
          background: rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 24px;
          padding: 36px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 880px) {
          .tallpath-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .tallpath-card {
            padding: 32px 24px !important;
            border-radius: 24px !important;
          }
          .tallpath-form-container {
            padding: 24px !important;
            border-radius: 20px !important;
          }
        }
        @media (max-width: 480px) {
          .tallpath-card {
            padding: 24px 16px !important;
            border-radius: 20px !important;
          }
          .tallpath-form-container {
            padding: 20px 16px !important;
            border-radius: 16px !important;
          }
        }
      `}</style>

    </section>
  );
}
