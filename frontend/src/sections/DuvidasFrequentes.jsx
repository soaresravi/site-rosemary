import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const faqs = [
  { pergunta: 'Como funciona o atendimento do escritório?', resposta: 'O atendimento é personalizado e focado nas necessidades individuais de cada cliente. Ofereço consultas presenciais e online para maior conveniência, garantindo que você receba o suporte necessário onde quer que esteja.', },
  { pergunta: 'Quais as principais áreas de atuação?', resposta: 'Atuo em em Direito Civil, Consumidor, Imobiliário, Família, Trabalhista e Previdenciário, garantindo soluções estratégicas e eficientes para cada caso, sempre com ética e transparência.', },
  { pergunta: 'O escritório atende apenas em Jundiaí?', resposta: 'Não, atendo clientes em Jundiaí e toda a região, com possibilidade de consultas online para pessoas de outras localidades. A distância nunca será um impedimento para receber um atendimento de qualidade.', },
  { pergunta: 'Como posso agendar uma consulta?', resposta: 'Você pode agendar sua consulta pelo telefone, WhatsApp ou pelo formulário de contato disponível no site. Nossa equipe entrará em contato para confirmar o horário e orientar sobre os documentos necessários.', },
  { pergunta: 'Atende empregadores e empregados?', resposta: 'Sim, ofereço suporte jurídico completo para ambos os lados, sempre buscando soluções justas e eficientes. Acredito que um bom entendimento é a base para qualquer relação trabalhista saudável.', },
  { pergunta: 'Quais documentos levar para a consulta?', resposta: 'Os documentos variam conforme o caso específico. No momento do agendamento, nossa equipe orientará detalhadamente sobre toda a documentação necessária para que sua consulta seja produtiva.', },
];

function DuvidasFrequentes() {
  
  const [open, setOpen] = useState(null);

  const toggleFaq = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
  
  <section id="duvidas" style={{ background: 'var(--duvidas-bg, #520A0A)', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '60px 0 80px', transition: 'background 0.4s ease-in-out', position: 'relative', overflow: 'hidden', }}>
    
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.05) 0%, transparent 70%)', zIndex: 0,}} />
    <div className="container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 2, opacity: 'calc((var(--duvidas-reveal-prog) - 50) * 3 / 100)', transform: 'scale(calc(0.92 + (var(--duvidas-reveal-prog) - 50) * 0.12 / 100))', willChange: 'transform, opacity', transition: 'opacity 0.1s linear, transform 0.1s linear', }}>

      <ScrollReveal direction="up">
    
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
         
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', padding: '6px 16px 6px 12px', borderRadius: '50px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.06)', marginTop: '100px' }}>  
            <HelpCircle size={14} color="#d4a0a0" />
            <span style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d4a0a0', fontFamily: 'Poppins, sans-serif', }}> Tire suas dúvidas </span>
          </div>
          
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.5px', }}> Perguntas frequentes </h2>
          <div style={{ width: '50px', height: '3px', background: '#d4a0a0', margin: '0.75rem auto 0', borderRadius: '2px', }} />
        
        </div>
      
      </ScrollReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '0.75rem 1.5rem', maxWidth: '1000px', margin: '0 auto', alignItems: 'start', }}>
        
        {faqs.map((faq, index) => {
          
          const isOpen = open === index;
            
          return (
          
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} onClick={() => toggleFaq(index)} style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)', overflow: 'hidden', boxShadow: isOpen ? '0 8px 30px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.05)', }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = 'rgba(84,8,8,0.2)';      
            }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', gap: '0.75rem', minHeight: '56px', }}>
                
                <span style={{ fontSize: 'clamp(0.85rem, 0.95vw, 0.95rem)', fontWeight: 500, color: '#540808', lineHeight: 1.4, fontFamily: 'Poppins, sans-serif', flex: 1, transition: 'color 0.3s ease', }}> {faq.pergunta} </span>
                
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: isOpen ? 'rgba(84,8,8,0.1)' : 'rgba(0,0,0,0.04)', flexShrink: 0, transition: 'background 0.3s ease', }}>
                  <ChevronDown size={16} color={isOpen ? '#540808' : '#666'} strokeWidth={2} />
                </motion.div>
              
              </div>
              
              <AnimatePresence>
            
                {isOpen && (
                  
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
                    
                    <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid rgba(84,8,8,0.08)', }}>
                      <p style={{ margin: 0, paddingTop: '0.75rem', fontSize: 'clamp(0.8rem, 0.85vw, 0.88rem)', color: '#212121', lineHeight: 1.7, fontFamily: 'Poppins, sans-serif', }}> {faq.resposta} </p>
                    </div>
                  
                  </motion.div>
                
                )}
              
              </AnimatePresence>
            
            </motion.div>
          );
        })}
      </div>
      
      <ScrollReveal direction="up" delay={0.2}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '2.5rem', flexWrap: 'wrap', }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.06)', }}>
            <MessageCircle size={14} color="#d4a0a0" />
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', }}> Outras dúvidas? </span>
          </div>
          
          <button onClick={() => window.fullpage_api?.moveToId('contato')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 28px', background: '#ffffff', color: '#520A0A', borderRadius: '50px', border: 'none', textDecoration: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', cursor: 'pointer', }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
            e.currentTarget.style.background = '#f5f0f0';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
            e.currentTarget.style.background = '#ffffff';
          }}> Entre em contato <MessageCircle size={16} strokeWidth={1.5} /> </button>
        
        </div>

      </ScrollReveal>

    </div>
    
    <style>{`
      
      @media (max-width: 768px) {
        
        #duvidas .container {
          padding: 0 16px;
        }
  
        #duvidas [style*="gridTemplateColumns"] {
          grid-template-columns: 1fr !important;
        }
      
        #duvidas [style*="minHeight: 56px"] {
          min-height: 48px !important;
          padding: 0.75rem 1rem !important;
        }
      
      }
    
    `}</style>
  
  </section>
  );
}

export default DuvidasFrequentes;