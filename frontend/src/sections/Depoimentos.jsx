import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

function Depoimentos() {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  const depoimentos = [
    { nome: "Caio Accorsi", tempo: "1 ano atrás", texto: "Excelente profissional, sempre me mantendo informado e atenta ao caso", inicial: "C", corBg: "#C2410C" },
    { nome: "Luana Bitto", tempo: "1 ano atrás", texto: "Excelente profissional, justa e eficaz ! Super recomendo.. Uma pessoa maravilhosa..", inicial: "L", corBg: "#DB2777" },
    { nome: "Rogerio Almeida", tempo: "1 ano atrás", texto: "Exelente profissional, atenciosa me ajudou mesmo não sendo seu cliente, sem palavras obrigado", inicial: "R", corBg: "#4F46E5" },
    { nome: "Marineide Santos", tempo: "1 ano atrás", texto: "Ecenlente pessoa tira todas minhas dúvida mim ajudou como advogada como amiga sempre vai ser minha advogada brigado doutora", inicial: "M", corBg: "#059669" },
    { nome: "Arlindo Marques", tempo: "1 ano atrás", texto: "Trabalho da Dra Rosemeire excelente qualidade e responsabilidade", inicial: "A", corBg: "#0284C7" },
    { nome: "Neusa Alves", tempo: "1 ano atrás", texto: "Excelente profissional", inicial: "N", corBg: "#16A34A" },
    { nome: "Josefa Victoria", tempo: "1 ano atrás", texto: "Este usuário deixou apenas uma avaliação.", inicial: "J", corBg: "#EA580C" }
  ];

  useEffect(() => {
    
    const handleResize = () => {
      
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }

    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  
  }, []);

  useEffect(() => {
   
    if (currentIndex > depoimentos.length - cardsPerPage) {
      setCurrentIndex(depoimentos.length - cardsPerPage);
    }
  
  }, [cardsPerPage]);

  const nextSlide = () => {
  
    if (currentIndex < depoimentos.length - cardsPerPage) {
      setCurrentIndex((prev) => prev + 1);
    }
  
  };

  const prevSlide = () => {
  
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  
  };

  const renderStars = () => {
    
    return Array(5).fill(0).map((_, i) => (
      <span key={i} style={{ color: '#FFB300', fontSize: '1.1rem', marginRight: '2px' }}>★</span>
    ));
  
  };

  return (
  
  <section id="depoimentos" style={{ background: 'var(--dep-bg, #260303)', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 0', transition: 'background 0.4s ease-in-out', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
      
    <div className="container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 2 }}>

      <ScrollReveal direction="up">
        <h2 style={{ color: 'var(--dep-title, #FFF)', transition: 'color 0.4s ease-in-out', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', textAlign: 'center', marginBottom: '10px', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}> Depoimentos dos nossos clientes </h2>
        <p style={{ color: 'var(--dep-text, #BBBBBB)', transition: 'color 0.4s ease-in-out', fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', textAlign: 'center', opacity: 0.8, maxWidth: '700px', margin: '0 auto 48px', fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}> Conheça as histórias de quem confiou em meu trabalho e alcançou resultados positivos. </p>
      </ScrollReveal>

      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%', maxWidth: '1140px', margin: '0 auto 40px', opacity: 'var(--dep-content-opacity, 1)', transition: 'opacity 0.4s ease-in-out' }}>

        {currentIndex > 0 && (
          <button onClick={prevSlide} style={{ background: '#FFFFFF', border: 'none', borderRadius: '50%', width: '46px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#540808', cursor: 'pointer', position: 'absolute', left: '-20px', zIndex: 10, boxShadow: '0 4px 14px rgba(0,0,0,0.3)', transition: 'transform 0.2s', padding: 0 }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}> <ChevronLeft size={24} strokeWidth={2.5} /> </button>
        )}

        <div style={{ width: '100%', overflow: 'hidden', padding: '10px 0' }}>
          <div style={{ display: 'flex', transform: `translateX(-${currentIndex * (100 / depoimentos.length)}%)`, transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)', width: `${(depoimentos.length / cardsPerPage) * 100}%` }}>
              
            {depoimentos.map((dep, index) => (
              
              <div key={index} style={{ width: `${100 / depoimentos.length}%`, padding: '0 12px', boxSizing: 'border-box', flexShrink: 0 }}>
                <div style={{ background: '#540808', borderRadius: '12px', padding: '24px', height: '242px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.2)', boxSizing: 'border-box' }}>
                  <div>
                    
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: dep.corBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1rem', fontFamily: 'Poppins, sans-serif', flexShrink: 0 }}>
                          {dep.inicial}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <h4 style={{ color: '#FFF', margin: 0, fontSize: '0.95rem', fontWeight: 600, fontFamily: 'Poppins, sans-serif', lineHeight: '1.2', textAlign: 'left' }}>{dep.nome}</h4>
                          <span style={{ color: '#BBB', fontSize: '0.75rem', fontFamily: 'Poppins, sans-serif', marginTop: '2px', textAlign: 'left' }}>{dep.tempo}</span>
                        </div>
                
                      </div>

                      <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', marginTop: '2px', flexShrink: 0 }}>
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
              
                    </div>

                    <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      {renderStars()}
                      <span style={{ marginLeft: '6px', color: '#4ADE80', fontSize: '0.85rem' }}>✓</span>
                    </div>

                    <p style={{ color: '#F3F4F6', margin: 0, fontSize: '0.88rem', lineHeight: 1.5, fontFamily: 'Poppins, sans-serif', textAlign: 'left', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}> {dep.texto} </p>
                  
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {currentIndex < depoimentos.length - cardsPerPage && (
          <button onClick={nextSlide} disabled={currentIndex >= depoimentos.length - cardsPerPage} style={{ background: '#FFFFFF', border: 'none', borderRadius: '50%', width: '46px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#540808', cursor: 'pointer', position: 'absolute', right: '-20px', zIndex: 10, boxShadow: '0 4px 14px rgba(0,0,0,0.3)', transition: 'transform 0.2s', padding: 0, }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}> <ChevronRight size={24} strokeWidth={2.5} /> </button>
        )}

      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', position: 'relative', zIndex: 99, opacity: 'var(--dep-content-opacity, 1)', transition: 'opacity 0.4s ease-in-out' }}>
        <a href="https://www.google.com/maps/place/Rosemary+Soares+Advocacia/@-23.1892464,-46.8875792,17z/data=!4m8!3m7!1s0x94cf26936c10e613:0x2b6f809733775de9!8m2!3d-23.1892464!4d-46.8850043!9m1!1b1!16s%2Fg%2F11dynpftp8?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: 'var(--dep-btn-bg, #190202)', color: 'var(--dep-btn-text, #fff)', borderRadius: '50px', textDecoration: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', fontWeight: 600, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.2s ease, background 0.4s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}> Ver mais avaliações <ExternalLink size={16} strokeWidth={1.5} /> </a>
      </div>

    </div>

  </section>
  );
}

export default Depoimentos;