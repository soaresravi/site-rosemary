import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Shield, Home, Users, Building2, X, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { createPortal } from 'react-dom';

const areasData = [
 
  { id: 'civil', nome: 'Direito civil', Icon: Scale, desc: 'Ações indenizatórias, contratos, cobranças judiciais, recuperação de bens.', detalhes: [
    'Ação perante juizados especiais / Juizado de pequenas causas',
    'Recuperação de bens',
    'Cobrança judicial',
    'Ações indenizatórias por danos morais, materiais e lucros cessantes',
    'Ações envolvendo contratos',
    'Ação de revisão de contratos bancários',
    'Ação de indenização por danos patrimoniais',
    'Empresas – Dissolução societária',
    'Posse e usufruto',
    'Ação de despejo',
    'Aluguel de imóvel',
    'Compra e venda de imóveis',
    'Usucapião',
    'Atraso na entrega de imóvel',
    'Revisão de financiamento de imóvel',
    'Revisão de financiamento de veículos',
    'Má prestação de serviços',
    'Cobrança abusiva',
    'Plano de saúde',
    'Erro médico',
    'Dano moral nas redes sociais',
    'Ação contra empresas aéreas (atraso de voo, overbooking, cancelamento, extravio)',
  ], },
  
  { id: 'consumidor', nome: 'Direito do consumidor', Icon: Shield, desc: 'Defesa do consumidor em planos de saúde, financiamentos, compras online.', detalhes: [
    'Financiamento (revisão de financiamento)',
    'Empréstimos bancários',
    'Revisão de contratos bancários',
    'Renegociação de dívidas bancárias',
    'Compra pela internet',
    'Cartão de crédito',
    'Cheque especial',
    'Capitalização de juros',
    'Inclusão indevida no SPC/SERASA',
    'Venda casada',
    'Atraso na entrega de produtos/mercadorias',
    'Propaganda enganosa',
    'Produto com vício ou defeito',
    'Direito de arrependimento',
    'Recusa de venda',
    'Reajuste abusivo de plano de saúde',
    'Cláusulas abusivas de plano de saúde',
    'Erro médico',
    'Negativa de exames e cirurgias de plano de saúde',
    'Responsabilidade do fornecedor',
    'Responsabilidade do fabricante',
    'Problemas com serviços de telefonia',
    'Problemas com serviço de internet',
    'Problema com serviço de TV a cabo',
    'Problema com serviço de energia elétrica',
    'Água e esgoto',
    'Transporte',
    'Extravio de bagagem',
    'Cancelamento de voo',
    'Atraso no voo',
    'Overbooking',
    'Pacote turístico',
    'Seguro de veículos',
    'Constrangimento em cobrança',
    'Devolução em dobro',
  ], },

  { id: 'imobiliario', nome: 'Direito imobiliário', Icon: Home, desc: 'Locações, usucapião, reintegração de posse, despejo.', detalhes: [
    'Desapropriação',
    'Usucapião',
    'Retificação de área',
    'Reintegração de posse',
    'Contrato de locação',
    'Renovatória de locação',
    'Despejo',
    'Rescisão contratual',
    'Demarcatória',
    'Processos administrativos',
    'Assessoria jurídica',
  ], },

  { id: 'familia', nome: 'Direito de família', Icon: Users, desc: 'Divórcios, guarda, heranças, partilhas.', detalhes: [
    'Divórcio consensual',
    'Divórcio extrajudicial (em cartório)',
    'Divórcio litigioso',
    'Reconhecimento de união estável (hétero e homossexual)',
    'Dissolução de união estável',
    'Anulação de casamento',
    'Alteração de regime de bens',
    'Partilha de bens',
    'Arrolamentos de bens',
    'Alimentos gravídicos',
    'Ação de alimentos',
    'Carta rogatória de pensão alimentícia',
    'Execução de pensão alimentícia',
    'Revisão de pensão alimentícia',
    'Majoração e minoração de pensão alimentícia',
    'Exoneração da obrigação de pagar pensão',
    'Ação para regulamentação de guarda de menor',
    'Alienação parental',
    'Guarda de filho (compartilhada, unilateral e alternada)',
    'Regulamentação de visitas',
    'Autorização para viagem de menores',
    'Investigação de paternidade',
    'Negatória de paternidade',
    'Suspensão e perda do poder familiar',
    'Medidas cautelares',
    'Pacto antenupcial',
    'Adoção',
    'Testamentos',
    'Anulação de testamento',
    'Doações',
    'Inventário judicial',
    'Inventário extrajudicial (em cartório)',
    'Direito de menor',
    'ECA – Estatuto da Criança e do Adolescente',
    'Violência doméstica',
  ], },

  { id: 'trabalhista', nome: 'Direito trabalhista', Icon: Briefcase, desc: 'Rescisões, horas extras, assédio, vínculo empregatício.', detalhes: [
    'Demissão por justa causa',
    'Reversão de justa causa',
    'Acidente de trabalho',
    'Direito do empregado doméstico',
    'Trabalho temporário',
    'Repouso semanal',
    'Férias',
    'Dobras e horas-extras',
    'Adicional noturno',
    'Licença maternidade',
    'Licença paternidade',
    'LER (Lesões por Esforços Repetitivos)',
    'Acidente de percurso / Acidente de trajeto',
    'Adicional de insalubridade e periculosidade',
    'Rescisão indireta do contrato de trabalho',
    'Ação indenizatória',
    'Assédio moral',
    'Reclamação trabalhista',
    'Equiparação salarial',
    'Reenquadramento de salário',
    'Reintegração ao trabalho',
    'Fundo de garantia / FGTS',
    'Defesas de empresas em reclamatórias trabalhistas',
    'Consultoria trabalhista empresarial',
  ], },
  
  { id: 'previdenciario', nome: 'Direito previdenciário', Icon: Building2, desc: 'Aposentadorias, revisões, benefícios por incapacidade.', detalhes: [
    'Aposentadoria por tempo de contribuição',
    'Aposentadoria integral',
    'Aposentadoria especial',
    'Aposentadoria por idade',
    'Aposentadoria por invalidez',
    'Aposentadoria rural',
    'Auxílio acidente',
    'Auxílio doença',
    'Auxílio reclusão',
    'Pensão por morte',
    'Salário maternidade',
    'Assistência social (LOAS)',
    'Contagem de tempo de serviço',
    'Revisão de aposentadoria',
  ], },

];

function AreasAtuacao() {
  
  const [expanded, setExpanded] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  
  }, []);

  const handleCardClick = (area) => {
    
    if (expanded === area.id) {
      setExpanded(null);
      setSelectedArea(null);
    } else {
      setExpanded(area.id);
      setSelectedArea(area);
      window.dispatchEvent(new CustomEvent('modalToggle', { detail: { isOpen: true } }));
    }

  };

  const closeModal = () => {
    setExpanded(null);
    setSelectedArea(null);
    window.dispatchEvent(new CustomEvent('modalToggle', { detail: { isOpen: false } }));
    setTimeout(() => window.fullpage_focus?.(), 50);
  };

  return (
  
  <section id="areas" style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', background: '#520A0A', padding: isMobile ? '20px 0' : '40px 0', overflow: 'hidden', position: 'relative', }}>
    
    <style>{`
      
      .reveal-dynamic-content {
        --progress: var(--areas-reveal-prog, 100);
        --activation: calc((var(--progress) - 60) / 40);
        opacity: clamp(0, var(--activation), 1);
        transform: scale(calc(0.85 + (0.15 * clamp(0, var(--activation), 1))));
        transform-origin: center center;
        transition: transform 0.1s linear, opacity 0.1s linear;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      @keyframes modalFadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      
      @media (max-width: 768px) {
    
        .reveal-dynamic-content {
          padding: 0 16px;
        }
  
      }
    
    `}</style>

    <div className="container" style={{ height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 12px' : '0', }}>
        
      <div className="reveal-dynamic-content">
          
        <ScrollReveal direction="up">
          <h2 className="text-white-force" style={{ color: 'white', textAlign: 'center', marginBottom: isMobile ? '12px' : '20px', fontFamily: 'Poppins, sans-serif', fontSize: isMobile ? 'clamp(1.6rem, 6vw, 2.2rem)' : 'clamp(1.8rem, 3vw, 2.8rem)', marginTop: isMobile ? '40px' : '120px', fontWeight: '700' }}> Áreas de atuação </h2>
          <p className="section-subtitle" style={{ marginBottom: isMobile ? '1rem' : '1.5rem', color: '#fff', textAlign: 'center', fontSize: isMobile ? 'clamp(0.8rem, 3.5vw, 0.95rem)' : 'clamp(0.85rem, 1.1vw, 1rem)', padding: isMobile ? '0 10px' : '0', }}> Saiba com o que trabalho e em como posso te ajudar. </p>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? '0.6rem' : '1rem', }}>
          
          {areasData.map((area, index) => {
            
            const Icon = area.Icon;
            const isExpanded = expanded === area.id;
              
            return (
            
            <ScrollReveal key={area.id} direction="up" delay={index * 0.05}>
              
              <div onClick={() => handleCardClick(area)} style={{ background: '#ffffff', padding: isMobile ? '0.8rem' : '1.2rem', borderRadius: isMobile ? '12px' : '16px', cursor: 'pointer', border: isExpanded ? '2px solid #520A0A' : '2px solid rgba(0,0,0,0.06)', transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', boxShadow: isExpanded ? '0 8px 30px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.06)', transform: isExpanded ? 'scale(1.02)' : 'scale(1)', height: '100%', display: 'flex', flexDirection: 'column', }}
              onMouseEnter={(e) => {

                if (!isExpanded) {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                }

              }} onMouseLeave={(e) => {
                
                if (!isExpanded) {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.06)';
                }
      
              }}>
                
                <Icon size={isMobile ? 24 : 32} color="#520A0A" strokeWidth={1.5} style={{ marginBottom: isMobile ? '0.2rem' : '0.3rem' }} />
                
                <h3 style={{ color: '#520A0A', fontSize: isMobile ? 'clamp(0.7rem, 2.8vw, 0.85rem)' : 'clamp(0.85rem, 1vw, 1rem)', fontFamily: 'Poppins, sans-serif', marginBottom: isMobile ? '0.15rem' : '0.3rem', lineHeight: 1.2, }}> {area.nome} </h3>
                <p style={{ fontSize: isMobile ? 'clamp(0.6rem, 2.2vw, 0.7rem)' : 'clamp(0.75rem, 0.8vw, 0.82rem)', color: '#444444', fontFamily: 'Poppins, sans-serif', lineHeight: 1.4, margin: 0, flex: 1, }}> {area.desc} </p>
                
                <div style={{ marginTop: isMobile ? '0.4rem' : '0.6rem', color: '#520A0A', fontSize: isMobile ? '0.6rem' : '0.7rem', fontWeight: 500, fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '4px', }}>
                
                  {isExpanded ? (

                    <>
                      <ChevronUp size={isMobile ? 12 : 14} /> Ver menos
                    </>
                
                  ) : (

                    <>
                      <ChevronDown size={isMobile ? 12 : 14} /> Ver detalhes
                    </>
                
                  )}
              
                </div>

              </div>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
    
    {typeof document !== 'undefined' && createPortal(
    
      <AnimatePresence>
      
        {expanded && selectedArea && (
        
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '12px' : '20px', }}>
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 20 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }} onClick={(e) => e.stopPropagation()} style={{ background: '#520A0A', maxWidth: isMobile ? '100%' : '600px', width: '100%', maxHeight: isMobile ? '90vh' : '75vh', overflowY: 'auto', borderRadius: isMobile ? '16px' : '20px', padding: isMobile ? '20px 16px 24px' : '28px 32px 32px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 80px rgba(0,0,0,0.7)', position: 'relative', scrollbarWidth: 'thin', scrollbarColor: '#fff transparent', }}>
            
              <button onClick={closeModal} style={{ position: 'sticky', top: 0, float: 'right', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', transition: 'transform 0.3s ease', zIndex: 10, padding: '4px', }} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}> <X size={isMobile ? 20 : 22} strokeWidth={1.5} /> </button>
          
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', justifyContent: 'center', }}>
                <h2 style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontWeight: 600, margin: 0, letterSpacing: '-0.5px', textAlign: 'center', }}> {selectedArea.nome} </h2>
              </div>
            
              <p style={{ color: '#d4a0a0', marginBottom: '20px', fontFamily: 'Poppins, sans-serif', fontSize: isMobile ? '0.8rem' : '0.9rem', lineHeight: 1.4, borderLeft: '2px solid rgba(255,255,255,0.4)', textAlign: 'center', paddingLeft: '14px', }}> {selectedArea.desc} </p>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: isMobile ? '0.65rem' : '0.75rem', marginBottom: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.7, }}> Áreas de atuação </p>
            
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2px 16px' }}>
              
                {selectedArea.detalhes.map((item, idx) => (
                
                  <div key={idx} style={{ color: '#fff', padding: '5px 0', fontFamily: 'Poppins, sans-serif', fontSize: isMobile ? '0.75rem' : '0.82rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'flex-start', gap: '6px', }}>
                    <span style={{ color: '#d4a0a0', fontSize: '0.6rem', marginTop: '4px', flexShrink: 0 }}>▸</span>
                    {item}
                  </div>
              
                ))}
            
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'center', }}>
                <button onClick={closeModal} style={{ background: '#fff', color: '#520A0A', border: 'none', padding: isMobile ? '10px 32px' : '8px 28px', borderRadius: '50px', fontFamily: 'Poppins, sans-serif', fontSize: isMobile ? '0.85rem' : '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.3s ease', width: isMobile ? '100%' : 'auto', }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}> Fechar </button>
              </div>
        
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body 
    )}

  </section>
  );
}

export default AreasAtuacao;