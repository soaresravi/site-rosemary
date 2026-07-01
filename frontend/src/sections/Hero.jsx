import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import heroImage from '../assets/hero.webp';

function Hero() {
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
  
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  
  }, []);

  if (isMobile) {
    
    return (
    
    <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', backgroundColor: '#520A0A', padding: '0 24px', textAlign: 'center', }}>
      
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)', zIndex: 0, }} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
        
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2rem, 8vw, 2.8rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: '0.8rem', }}> Rosemary Soares <br /> <span style={{ color: '#fff', fontSize: 'clamp(1.6rem, 6vw, 2.2rem)' }}> Advocacia </span> </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} style={{ fontSize: 'clamp(0.85rem, 3.5vw, 1rem)', color: 'rgba(255,255,255,0.88)', fontFamily: 'Poppins, sans-serif', maxWidth: '100%', marginBottom: '2rem', lineHeight: 1.7, fontWeight: 300, }}> Especializada em Direito Civil, Consumidor, Imobiliário, Família, Trabalhista e Previdenciário. 10 anos de experiência como advogada e sendo referência em Jundiaí e região. </motion.p>
        
        <motion.button initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} onClick={() => { window.fullpage_api?.moveToId('contato'); }} style={{ background: '#ffffff', color: '#540808', border: 'none', padding: '14px 32px', fontSize: 'clamp(0.85rem, 3.5vw, 1rem)', fontWeight: 600, borderRadius: '50px', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px', width: '100%', maxWidth: '300px', }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px) scale(1.02)';
          e.target.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4)';
          e.target.style.background = '#f5f0f0';
        }} onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
          e.target.style.background = '#ffffff';
        }}> Entrar em contato </motion.button>
      
      </div>
    
    </div>
    );

  }

  return (
  
  <div style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', backgroundColor: '#520A0A', }}>
    
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)', zIndex: 0, }} />
    
    <div style={{ position: 'relative', zIndex: 1, maxWidth: '1300px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 0.8fr', alignItems: 'center', gap: '2rem', padding: '0 24px', }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', }}>
       
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: '1rem', }}> Rosemary Soares <br /> <span style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}> Advocacia </span> </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', color: 'rgba(255,255,255,0.88)', fontFamily: 'Poppins, sans-serif', maxWidth: '700px', marginBottom: '2rem', lineHeight: 1.8, fontWeight: 300, textAlign: 'center', }}> Especializada em Direito Civil, Consumidor, Imobiliário, Família, Trabalhista e Previdenciário. 10 anos de experiência como sua advogada e sendo referência em Jundiaí e região. </motion.p>
       
        <motion.button initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} onClick={() => { window.fullpage_api?.moveToId('contato'); }} style={{ background: '#ffffff', color: '#540808', border: 'none', padding: '16px 44px', fontSize: '1rem', fontWeight: 600, borderRadius: '50px', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px', }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px) scale(1.02)';
          e.target.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4)';
          e.target.style.background = '#f5f0f0';
        }} onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
          e.target.style.background = '#ffffff';
        }}> Entrar em contato </motion.button>
      
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', }}>
        
        <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.08)', maxWidth: '420px', width: '100%', }}>
        
          <img src={heroImage} alt="Rosemary Soares Advocacia" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '4/3', }} />
        
          <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(82,10,10,0.85)', backdropFilter: 'blur(8px)', padding: '8px 16px', borderRadius: '10px', color: '#f0c0c0', fontSize: '0.75rem', fontFamily: 'Poppins, sans-serif', border: '1px solid rgba(255,255,255,0.12)', letterSpacing: '1px', }}>
            +10 anos
          </div>
        
        </div>
      
      </motion.div>
      
    </div>
  
  </div>
  );
}

export default Hero;