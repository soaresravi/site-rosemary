import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock } from 'lucide-react';
import logoImg from '../assets/logo.png';

function Footer() {
 
  return (
    
  <footer style={{ background: '#520A0A', color: '#fff', padding: '32px 16px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', }}>
    
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2.5fr 2fr 1fr 2fr', gap: '2rem', marginBottom: '1.5rem', alignItems: 'start'}}>

        <div style={{ textAlign: 'left' }}>

          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.8rem', flexWrap: 'wrap', textDecoration: 'none' }}>
            
            <img src={logoImg} alt="Logo Rosemary Soares Advocacia" style={{ height: '40px', width: 'auto', objectFit: 'contain'}} />
            
            <h4 style={{ fontFamily: 'Cinzel, serif', color: '#ffffff', margin: 0, fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)', letterSpacing: '0.5px', fontWeight: 700, lineHeight: 1.2, cursor: 'pointer' }}>
              Rosemary Soares
              <span style={{  display: 'block', fontSize: '0.6rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px', textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}> Advocacia </span>
            </h4>
          
          </Link>

          <p style={{ fontSize: 'clamp(0.7rem, 0.8vw, 0.9rem)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: '0 0 0.8rem 0', fontFamily: 'Poppins, sans-serif', textAlign: 'left' }}> Rua do Rosário, 647. Centro — Jundiaí/SP </p>

          <div style={{ textAlign: 'left' }}>
            
            <h5 style={{ fontSize: '0.8rem', color: '#ffffff', fontFamily: 'Poppins, sans-serif', margin: '0 0 4px 0', fontWeight: 600 }}> Horário de atendimento </h5>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', justifyContent: 'flex-start', }}>
              <Clock size={12} color="rgba(255,255,255,0.4)" style={{ marginTop: '3px', flexShrink: 0 }}/>
              <span style={{ fontSize: 'clamp(0.65rem, 0.7vw, 0.85rem)', color: 'rgba(255,255,255,0.5)', textAlign: 'left', fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}> Segunda: 10h às 18h30 <br></br> Terça à quinta: 09h30 às 18h30 <br></br> Sexta: 09h30 às 18h </span>
            </div>
        
          </div>

        </div>

        <div style={{ width: '100%' }}>
          
          <div style={{ width: '100%', height: 'clamp(120px, 15vw, 160px)', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.4779471319266!2d-46.885004300000006!3d-23.1892464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf26936c10e613%3A0x2b6f809733775de9!2sRosemary%20Soares%20Advocacia!5e0!3m2!1spt-BR!2sbr!4v1782326130055!5m2!1spt-BR!2sbr" width="100%" height="100%"  style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Localização Rosemary Soares Advocacia" />
          </div>
        
        </div>

        <div style={{ textAlign: 'left' }}>
          
          <h5 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.4)', marginBottom: '0.8rem', fontWeight: 600, fontFamily: 'Poppins, sans-serif'}}> Menu </h5>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', fontFamily: 'Poppins, sans-serif'}}>
            
            {['Início', 'Sobre nós', 'Áreas', 'Depoimentos', 'FAQ', 'Contato'].map((item) => {
              
              const idMap = {
                'Início': 'inicio',
                'Sobre nós': 'sobre',
                'Áreas': 'areas',
                'Depoimentos': 'depoimentos',
                'FAQ': 'faq',
                'Contato': 'contato',
              };
              
              const sectionId = idMap[item];
              
              return (
              
              <li key={item} style={{ marginBottom: '0.3rem' }}>
                
                <button onClick={() => window.fullpage_api?.moveToId(sectionId)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 'clamp(0.7rem, 0.8vw, 0.9rem)', transition: 'all 0.3s ease', display: 'inline-block', cursor: 'pointer', padding: 0, fontFamily: 'Poppins, sans-serif', }} onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'translateX(4px)';
                }} onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255,255,255,0.6)';
                  e.target.style.transform = 'translateX(0)';
                }}> {item} </button>
              
              </li>
              );
            
            })}

          </ul>
        
        </div>

        <div style={{ textAlign: 'left' }}>
          
          <h5 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.4)', marginBottom: '0.8rem', fontWeight: 600, fontFamily: 'Poppins, sans-serif',}}> Contato </h5>
            
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.8rem', textAlign: 'left' }}>
            <a href="https://wa.me/5511996173362" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', fontFamily: 'Poppins, sans-serif', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 'clamp(0.7rem, 0.75vw, 0.8rem)', transition: 'color 0.3s ease', justifyContent: 'flex-start' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}> <Phone size={13} color="rgba(255,255,255,0.4)" /> (11) 9 9617-3362 </a>
            <a href="mailto:rosemary@rsoaresadvocacia.com.br" style={{ display: 'flex', fontFamily: 'Poppins, sans-serif', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', transition: 'color 0.3s ease', wordBreak: 'break-all', justifyContent: 'flex-start' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}> <Mail size={13} color="rgba(255,255,255,0.4)" /> rosemary@rsoaresadvocacia.com.br </a>
          </div>

          <Link to="/area-cliente" style={{ display: 'inline-flex', fontFamily: 'Poppins, sans-serif', alignItems: 'center', gap: '6px', background: '#fff', color: '#520A0A', padding: '6px 14px', borderRadius: '11px', textDecoration: 'none', fontSize: 'clamp(0.7rem, 0.75vw, 0.75rem)', fontWeight: 600, transition: 'all 0.3s ease' }} onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.transform = 'translateY(0)';
          }}> Área do cliente </Link>
          
        </div>
      
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', }}>  
        <Link to="/" style={{ fontSize: 'clamp(0.6rem, 0.65vw, 0.7rem)', color: 'rgba(255,255,255,0.4)', margin: 0, textAlign: 'left', fontFamily: 'Poppins, sans-serif', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.4)'}> Rosemary Soares Advocacia © {new Date().getFullYear()} Todos os direitos reservados </Link>
        <p style={{ fontSize: 'clamp(0.55rem, 0.6vw, 0.7rem)', color: 'rgba(255,255,255,0.3)', margin: 0, textAlign: 'right', fontFamily: 'Poppins, sans-serif' }}> Desenvolvido por:{' '}<a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s ease', fontFamily: 'Poppins, sans-serif'}} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.4)'}> Ravi Brocco </a> </p>
      </div>
    
    </div>
    
    <style>{`
      
      @media (max-width: 900px) {
      
        .footer-grid {
          grid-template-columns: 1fr 1fr !important;
          gap: 1.5rem !important;
        }

        .footer-grid > div:first-child {
          grid-column: 1 / -1 !important;
        }
      
      }
      
      @media (max-width: 600px) {

        footer {
          padding: 24px 12px 12px !important;
        }
    
        .footer-grid {
          grid-template-columns: 1fr !important;
          gap: 1.2rem !important;
        }

        .footer-grid > div:first-child {
          grid-column: 1 !important;
        }
       
        .footer-grid > div:last-child {
          margin-bottom: 0 !important;
        }

        footer [style*="text-align: left"] {
          text-align: left !important;
        }
      
        footer [style*="justify-content: flex-start"] {
          justify-content: flex-start !important;
        }

        footer .footer-grid > div {
          text-align: left !important;
        }

        footer .footer-grid > div * {
          text-align: left !important;
          justify-content: flex-start !important;
        }

        footer ul {
          text-align: left !important;
        }

        footer ul li {
          text-align: left !important;
        }

        footer ul li button {
          text-align: left !important;
        }

        footer .footer-grid > div:last-child {
          text-align: left !important;
        }

        footer .footer-grid > div:last-child * {
          text-align: left !important;
          justify-content: flex-start !important;
        }

        footer [style*="justify-content: space-between"] {
          flex-direction: column !important;
          text-align: left !important;
          gap: 0.3rem !important;
          align-items: flex-start !important;
        }
      
      }
    
    `}</style>
  
  </footer>
  );
}

export default Footer;