import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

import logo from '../assets/logo.png';

function Navbar() {
  
  const [isLight, setIsLight] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handler = (e) => setIsLight(e.detail.isLight);
    window.addEventListener('navbgchange', handler);
    return () => window.removeEventListener('navbgchange', handler);
  }, []);

  const scrollToSection = (id) => {
   
    setIsMobileMenuOpen(false);
   
    if (isHome) {
      window.fullpage_api?.moveToId(id);
    } else {
      window.location.href = `/#${id}`;
    }
  
  };

  const navLinks = [
    { label: 'Início', href: 'inicio' },
    { label: 'Sobre', href: 'sobre' },
    { label: 'Áreas', href: 'areas' },
    { label: 'Depoimentos', href: 'depoimentos' },
    { label: 'FAQ', href: 'faq' },
    { label: 'Contato', href: 'contato' },
  ];

  const nav = {
    bg: isLight ? 'rgba(240,240,236,0.5)' : 'rgba(69, 0, 0, 0.5)',
    border: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
    logoMain: isLight ? '#540808' : '#ffffff',
    logoSub: isLight ? '#888' : 'rgba(255,255,255,0.55)',
    link: isLight ? '#540808' : 'rgba(255,255,255,0.85)',
    linkHover: isLight ? '#540808' : '#d4a0a0',
    btnBg: isLight ? '#540808' : '#ffffff',
    btnColor: isLight ? '#ffffff' : '#540808',
    btnBorder: isLight ? '#540808' : '#ffffff',
    btnHoverBg: isLight ? '#7a0c0c' : 'rgba(255,255,255,0.85)',
  };

  return (
  <>
    
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '12px 16px', background: nav.bg, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${nav.border}`, transition: 'all 0.5s ease', }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
        
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0, }}>
          
          <img src={logo} alt="Rosemary Soares Advocacia" style={{ height: 'clamp(40px, 5vw, 50px)', width: 'auto', objectFit: 'contain' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)', fontWeight: 700, color: nav.logoMain, display: 'block', lineHeight: 1.1, transition: 'color 0.5s ease', }}> Rosemary Soares </span>
            <span style={{ fontSize: 'clamp(0.5rem, 0.65vw, 0.65rem)', color: nav.logoSub, fontFamily: 'Poppins, sans-serif', letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'color 0.5s ease', }}> Advocacia </span>
          </div>
        
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', }}>
          
          <ul style={{ display: 'flex', listStyle: 'none', gap: '1.5rem', margin: 0, padding: 0, }}>
            
            {navLinks.map(({ label, href }) => (
              
              <li key={label} style={{ display: 'flex' }}>
                
                <button onClick={() => scrollToSection(href)} style={{ background: 'none', border: 'none', borderBottom: '2px solid transparent', color: nav.link, fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)', fontFamily: 'Poppins, sans-serif', fontWeight: 600, cursor: 'pointer', padding: '4px 0', transition: 'color 0.3s ease, border-color 0.3s ease', whiteSpace: 'nowrap', }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = nav.linkHover;
                  e.currentTarget.style.borderBottomColor = nav.linkHover;
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = nav.link;
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}> {label} </button>
              
              </li>
            
            ))}
          
          </ul>

          <Link to="/area-cliente" className="desktop-client-btn" style={{ background: nav.btnBg, color: nav.btnColor, border: `2px solid ${nav.btnBorder}`, padding: 'clamp(6px, 0.8vw, 10px) clamp(14px, 1.5vw, 24px)', borderRadius: '50px', textDecoration: 'none', fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)', fontFamily: 'Poppins, sans-serif', fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.3s ease', flexShrink: 0, }} onMouseEnter={(e) => { e.currentTarget.style.background = nav.btnHoverBg; }} onMouseLeave={(e) => { e.currentTarget.style.background = nav.btnBg; }}> Área do cliente </Link>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: nav.logoMain, cursor: 'pointer', padding: '4px 8px', transition: 'color 0.3s ease', }}> {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />} </button>
        
        </div>
      
      </div>
    </nav>
    
    <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`} style={{ position: 'fixed', top: 0, right: 0, width: 'clamp(280px, 75vw, 380px)', height: '100vh', background: isLight ? '#ffffff' : '#540808', zIndex: 9999, transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)', boxShadow: '-8px 0 40px rgba(0,0,0,0.3)', padding: '24px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`, }}>  
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 700, color: isLight ? '#540808' : '#ffffff', }}> Menu </span>
        <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: isLight ? '#333' : '#fff', cursor: 'pointer', padding: '4px', }}> <X size={24} strokeWidth={1.5} /> </button>
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, }}>
        
        {navLinks.map(({ label, href }) => (
          
          <li key={label}>
            
            <button onClick={() => scrollToSection(href)} style={{ background: 'none', border: 'none', color: isLight ? '#333' : '#fff', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', fontFamily: 'Poppins, sans-serif', cursor: 'pointer', padding: '12px 16px', width: '100%', textAlign: 'left', fontWeight: 500, transition: 'all 0.3s ease', borderRadius: '8px', borderLeft: `3px solid transparent`, }}
            
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isLight ? 'rgba(84,8,8,0.05)' : 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderLeftColor = '#540808';
              e.currentTarget.style.color = '#540808';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderLeftColor = 'transparent';
              e.currentTarget.style.color = isLight ? '#333' : '#fff';
            }}> {label} </button>
          
          </li>
        
        ))}
      
      </ul>

      <div style={{ paddingTop: '1rem', borderTop: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`, marginTop: 'auto', }}>
        <Link to="/area-cliente" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', background: '#fff', color: '#540808', padding: '14px 24px', borderRadius: '30px', textDecoration: 'none', textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1rem', transition: 'background 0.3s ease', }} onMouseEnter={(e) => e.currentTarget.style.background = '#7a0c0c'} onMouseLeave={(e) => e.currentTarget.style.background = '#540808'}> Área do cliente </Link>
      </div>
    
    </div>

    <div className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}  onClick={() => setIsMobileMenuOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 9998, opacity: isMobileMenuOpen ? 1 : 0, pointerEvents: isMobileMenuOpen ? 'auto' : 'none', transition: 'opacity 0.35s ease', backdropFilter: 'blur(4px)', }} />

    <style>{`
       
      @media (min-width: 769px) {
       
        .mobile-menu-btn {
          display: none !important;
        }

      }

      @media (max-width: 768px) {
          
        .mobile-menu-btn {
          display: flex !important;
          align-items: center;
          justify-content: center;
        }
          
        nav ul {
          display: none !important;
        }
          
        .desktop-client-btn {
          display: none !important;
        }
         
        nav {
          padding: 10px 14px !important;
        }

        body.sidebar-open {
          overflow: hidden !important;
        }
      
      }

      @media (max-width: 1024px) and (min-width: 769px) {
       
        nav ul li:last-child {
          display: none !important;
        }
       
        nav ul {
          gap: 1rem !important;
        }
       
      }
      
    `}</style>

  </>
  );
}

export default Navbar;