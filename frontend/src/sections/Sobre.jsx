import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import estatuaPng from '../assets/estatua-advocacia.png'; 

function Sobre() {
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  
  }, []);

  return (
  
  <section id="sobre" style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', background: 'var(--sobre-bg, #260303)', padding: isMobile ? '40px 16px' : '60px 0 80px 0', overflow: 'hidden', transition: 'background-color 0.4s ease, color 0.4s ease', }}>
    
    <style>{`
      
      @keyframes floatAnimation {
        0% { transform: translateY(10px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(10px); }
      }
      
      .sobre-textos-container {
        transform: translateY(var(--sobre-content-shift-y, 0px));
        will-change: transform;
        transition: transform 0.08s linear;
      }
      
      .entidade-viva-container {
        transform: translateY(var(--estatua-shift-y, 0px));
        will-change: transform;
        transition: transform 0.08s linear;
      }

      @media (max-width: 768px) {
        
        .entidade-viva-container {
          display: none !important;
        }
      
      }
    
    `}</style>

    <div className="container" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr', gap: isMobile ? '0' : '2rem', alignItems: 'center', height: '100%', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 16px' : '0', position: 'relative' }}>

      <div className="sobre-textos-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: isMobile ? 'center' : 'flex-start', width: '100%', height: isMobile ? '100%' : 'auto', padding: isMobile ? '20px 0' : '0', }}>
        
        <ScrollReveal direction={isMobile ? 'up' : 'left'}>
        
          <div style={{ width: '100%', maxWidth: isMobile ? '100%' : 'none', display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'left', }}>
      
            <h2 className="section-title" style={{ textAlign: isMobile ? 'center' : 'center', color: 'var(--sobre-title, #260303)', fontSize: isMobile ? 'clamp(1.6rem, 6vw, 2.2rem)' : 'clamp(1.8rem, 3.2vw, 2.8rem)', marginBottom: isMobile ? '1rem' : '1.2rem', marginTop: isMobile ? '0' : '-100px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', width: '100%', }}> Conheça o escritório </h2>
      
            <p style={{ fontSize: isMobile ? 'clamp(0.85rem, 3.5vw, 0.95rem)' : '0.98rem', color: 'var(--sobre-text, #444)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.7, marginBottom: isMobile ? '0.8rem' : '1rem', textAlign: isMobile ? 'center' : 'left', maxWidth: isMobile ? '100%' : 'none', }}> Tenho como objetivo oferecer serviços jurídicos de altíssimo nível, buscando êxito e rapidez nas causas que me são confiadas. </p>  
            <p style={{ fontSize: isMobile ? 'clamp(0.85rem, 3.5vw, 0.95rem)' : '0.98rem', color: 'var(--sobre-text, #444)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.7, marginBottom: isMobile ? '1.2rem' : '1.5rem', textAlign: isMobile ? 'center' : 'left', maxWidth: isMobile ? '100%' : 'none', }}> Atuo de forma preventiva e contenciosa, com seriedade, competência, ética e sem nenhum tipo de discriminação. </p>  
      
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr', gap: isMobile ? '0.5rem' : '0.75rem', marginTop: isMobile ? '0.5rem' : '0.5rem', width: '100%', maxWidth: isMobile ? '100%' : 'none', }}>
              <AnimatedCounter target={10} label="Anos de experiência" suffix="+" />
              <AnimatedCounter target={500} label="Casos resolvidos" suffix="+" />
              <AnimatedCounter target={98} label="Clientes satisfeitos" suffix="%" />
              <AnimatedCounter target={6} label="Áreas de atuação" />
            </div>
    
          </div>
      
        </ScrollReveal>
      
      </div>

      {!isMobile && (
      
        <div style={{ height: '100vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', position: 'relative', }}>
          
          <div className="entidade-viva-container">
            <img src={estatuaPng} className="entidade-viva" alt="Estátua da Justiça" style={{ height: '90vh', objectFit: 'contain', objectPosition: 'bottom center', animation: 'floatAnimation 6s ease-in-out infinite', }} />
          </div>
        
        </div>
      
      )}
    
    </div>
  
  </section>
  );
}

export default Sobre;