import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

import ScrollReveal from '../components/ScrollReveal';

function Contato() {
 
  const [formData, setFormData] = useState({ 
    nome: '', 
    telefone: '', 
    email: '', 
    mensagem: '' 
  });
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
 
  }, []);

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
  };

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);

    if (params.get('success') === 'true') {

      setSubmitStatus('success');
      setFormData({ nome: '', telefone: '', email: '', mensagem: '' });
      setIsSubmitting(false);
      
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => setSubmitStatus(null), 5000);
  
    }
  
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isMobile) {
   
    return (
   
    <section id="contato" style={{ background: 'var(--contato-bg, #520A0A)', minHeight: '100vh', boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '20px 0', transition: 'background 0.4s ease', position: 'relative', overflow: 'hidden', width: '100%', }}>
      
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.04) 0%, transparent 70%)', zIndex: 0, }} />
      <div style={{ maxWidth: '1100px', width: '100%', minHeight: '100vh', margin: '0 auto', padding: '80px 16px 20px', position: 'relative', zIndex: 2, opacity: 'var(--contato-reveal-prog, 1)', transition: 'opacity 0.2s ease', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
          
        <ScrollReveal direction="up">
          
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', padding: '4px 14px', borderRadius: '50px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.06)', }}>    
              <MessageCircle size={12} color="#d4a0a0" />
              <span style={{ fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--contato-subtitle, #d4a0a0)', fontFamily: 'Poppins, sans-serif', }}> Fale conosco </span>
            </div>
            
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.4rem, 6vw, 1.8rem)', fontWeight: 700, color: 'var(--contato-title, #ffffff)', margin: 0, letterSpacing: '-0.5px', }}> Formulário de contato </h2>
            <div style={{ width: '40px', height: '3px', background: 'var(--contato-title, #ffffff)', margin: '0.4rem auto 0', borderRadius: '2px', }} />
          
          </div>
        
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem', marginBottom: '2rem', alignItems: 'start', }}>
            
          <ScrollReveal direction="up" delay={0.1}>
            
            <motion.div initial={{ opacity: 0, x: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ background: 'var(--contato-card-bg, #2c0a0a)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', transition: 'background 0.4s ease', }}>

              <form action="https://formsubmit.co/rosemary@rsoaresadvocacia.com.br" method="POST" onSubmit={handleSubmit}>

                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="Novo contato via site!" />
                <input type="hidden" name="_next" value={window.location.origin + '/?success=true'} />
                  
                {[
                
                  { name: 'nome', label: 'Nome completo', type: 'text', placeholder: 'Seu nome completo' },
                  { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '(11) 9 9999-9999' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'email@email.com.br' },
                
                ].map(({ name, label, type, placeholder }) => (
                  
                  <div key={name} style={{ marginBottom: '0.5rem' }}>
                    
                    <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.7rem', fontWeight: 500, color: 'var(--contato-label, #d4a0a0)', fontFamily: 'Poppins, sans-serif', }}> {label} </label>
                    
                    <input type={type} name={name} required value={formData[name]} onChange={handleChange} placeholder={placeholder} onClick={(e) => e.stopPropagation()} style={{ width: '100%', padding: '8px 12px', border: '1.5px solid var(--contato-input-border, #540808)', borderRadius: '10px', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', background: 'var(--contato-input-bg, #1a0303)', color: 'var(--contato-text, #ffffff)', transition: 'all 0.3s ease', fontFamily: 'Poppins, sans-serif', }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#d4a0a0';
                      e.target.style.boxShadow = '0 0 0 3px rgba(212,160,160,0.1)';
                    }} onBlur={(e) => {
                      e.target.style.borderColor = 'var(--contato-input-border, #540808)';
                      e.target.style.boxShadow = 'none';
                    }} />
                  
                  </div>
                
                ))}

                <div style={{ marginBottom: '0.6rem' }}>
                 
                  <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.7rem', fontWeight: 500, color: 'var(--contato-label, #d4a0a0)', fontFamily: 'Poppins, sans-serif', }}> Mensagem </label>
                 
                  <textarea name="mensagem" required rows={3} value={formData.mensagem} onChange={handleChange} placeholder="Escreva sua mensagem aqui..." onClick={(e) => e.stopPropagation()} style={{ width: '100%', padding: '8px 12px', border: '1.5px solid var(--contato-input-border, #540808)', borderRadius: '10px', fontSize: '0.85rem', fontFamily: 'Poppins, sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box', background: 'var(--contato-input-bg, #1a0303)', color: 'var(--contato-text, #ffffff)', transition: 'all 0.3s ease', }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#d4a0a0';
                    e.target.style.boxShadow = '0 0 0 3px rgba(212,160,160,0.1)';
                  }} onBlur={(e) => {
                    e.target.style.borderColor = 'var(--contato-input-border, #540808)';
                    e.target.style.boxShadow = 'none';
                  }} />
                
                </div>

                <button type="submit" disabled={isSubmitting} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'var(--contato-btn-bg, #ffffff)', color: 'var(--contato-btn-text, #540808)', border: 'none', padding: '10px', fontSize: '0.85rem', fontWeight: 600, borderRadius: '10px', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', marginBottom: '20px', fontFamily: 'Poppins, sans-serif', opacity: isSubmitting ? 0.7 : 1, }}
                onMouseEnter={(e) => {
                  
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                  }
                
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}> {isSubmitting ? 'Enviando...' : 'Enviar mensagem'} </button>

                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem', padding: '10px', background: 'rgba(76, 175, 80, 0.15)', border: '1px solid rgba(76, 175, 80, 0.3)', borderRadius: '8px', color: '#81C784', textAlign: 'center', fontSize: '0.8rem', fontFamily: 'Poppins, sans-serif', }}> Mensagem enviada com sucesso! </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem', padding: '10px', background: 'rgba(244, 67, 54, 0.15)', border: '1px solid rgba(244, 67, 54, 0.3)', borderRadius: '8px', color: '#EF9A9A', textAlign: 'center', fontSize: '0.8rem', fontFamily: 'Poppins, sans-serif', }}> Erro ao enviar. Tente o WhatsApp. </motion.div>
                )}
              
              </form>
            
            </motion.div>
          
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ background: 'var(--contato-info-bg, #ffffff)', color: 'var(--contato-info-text, #540808)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', }}>
            
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.8rem', color: 'inherit', }}> Contatos </h3>
                
                {[
              
                  { icon: Phone, label: 'WhatsApp', value: '(11) 9 9617-3362', link: 'https://wa.me/5511996173362' },
                  { icon: Mail, label: 'Email', value: 'rosemary@rsoaresadvocacia.com.br', link: 'mailto:rosemary@rsoaresadvocacia.com.br' },
                  { icon: MapPin, label: 'Endereço', value: 'Rua do Rosário, 647. Centro — Jundiaí/SP', link: 'https://maps.app.goo.gl/GTz3ktt6GE2YAHzy7' },
                
                ].map((item, i) => {
                  
                  const Icon = item.icon;
                  
                  return (
                  
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: i < 2 ? '0.6rem' : 0, gap: '8px', }}>
                    
                    <Icon size={14} style={{ marginTop: '2px', opacity: 0.7, flexShrink: 0 }} />
                   
                    <div style={{ textAlign: 'left' }}> 
                    
                      <div style={{ fontSize: '0.55rem', opacity: 0.5, marginBottom: '1px', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', }}>
                        {item.label}
                      </div>
                    
                      {item.link?
                        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontWeight: 500, fontSize: '0.78rem', color: 'inherit', fontFamily: 'Poppins, sans-serif', textAlign: 'left', display: 'block', wordBreak: 'break-word', }}> {item.value} </a>
                      :
                        <span style={{ fontSize: '0.78rem', textAlign: 'left', display: 'block', }}> {item.value} </span>
                      }
                  
                    </div>
                
                  </div>
                  );
                
                })}
              </div>

              <div style={{ background: 'var(--contato-hours-bg, #1a0303)', border: '1px solid var(--contato-input-border, #540808)', padding: '0.8rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', textAlign: 'center', }}>
              
                <span style={{ fontSize: '0.7rem', color: 'var(--contato-label, #d4a0a0)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.6, }}>
                  <Clock size={14} color="var(--contato-label, #d4a0a0)" style={{ marginRight: '5px' }} />
                  Segunda: <strong style={{ fontWeight: 600 }}>10h às 18h30</strong> <br /> Terça à quinta: <strong style={{ fontWeight: 600 }}>09h30 às 18h30</strong> <br />  Sexta: <strong style={{ fontWeight: 600 }}>09h30 às 18h</strong>
                </span>
              
              </div>

              <a href="https://wa.me/5511996173362" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '10px', background: '#25D366', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.3s ease', }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.3)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}> <Phone size={14} /> Falar no WhatsApp </a>
            
            </div>
          </ScrollReveal>
        </div>
      </div>
    
    </section>
    );
  }

  return (
  
  <section id="contato" style={{ background: 'var(--contato-bg, #520A0A)', height: '100vh', boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '10px 0', transition: 'background 0.4s ease', position: 'relative', overflow: 'hidden', width: '100%', }}>
    
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.04) 0%, transparent 70%)', zIndex: 0, }} />
    <div style={{ maxWidth: '1100px', width: '100%', height: '100%', margin: '0 auto', padding: '100px 20px 0', position: 'relative', zIndex: 2, opacity: 'var(--contato-reveal-prog, 1)', transition: 'opacity 0.2s ease', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
        
      <ScrollReveal direction="up">
        
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', padding: '6px 16px', borderRadius: '50px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.06)', }}>  
            <MessageCircle size={14} color="#d4a0a0" />
            <span style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--contato-subtitle, #d4a0a0)', fontFamily: 'Poppins, sans-serif', }}> Fale conosco </span>
          </div>
        
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--contato-title, #ffffff)', margin: 0, letterSpacing: '-0.5px', }}> Formulário de contato </h2>
          <div style={{ width: '50px', height: '3px', background: 'var(--contato-title, #ffffff)', margin: '0.5rem auto 0', borderRadius: '2px', }} />
      
        </div>
      
      </ScrollReveal>

      <div className="contato-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', marginBottom: '8rem', alignItems: 'start', }}>
          
        <ScrollReveal direction="left" delay={0.1}>
          
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="contato-card" style={{ background: 'var(--contato-card-bg, #2c0a0a)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', transition: 'background 0.4s ease', }}>

            <form action="https://formsubmit.co/rosemary@rsoaresadvocacia.com.br" method="POST" onSubmit={handleSubmit}>
            
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="Novo contato via site!" />
              <input type="hidden" name="_next" value={window.location.origin + '/?success=true'} />
                
              {[
              
                { name: 'nome', label: 'Nome completo', type: 'text', placeholder: 'Seu nome completo' },
                { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '(11) 9 9999-9999' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'email@email.com.br' },
      
              ].map(({ name, label, type, placeholder }) => (
              
                <div key={name} style={{ marginBottom: '0.65rem' }}>
                
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.78rem', fontWeight: 500, color: 'var(--contato-label, #d4a0a0)', fontFamily: 'Poppins, sans-serif', }}> {label} </label>
                
                  <input type={type} name={name} required value={formData[name]} onChange={handleChange} placeholder={placeholder} onClick={(e) => e.stopPropagation()} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--contato-input-border, #540808)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', background: 'var(--contato-input-bg, #1a0303)', color: 'var(--contato-text, #ffffff)', transition: 'all 0.3s ease', fontFamily: 'Poppins, sans-serif', }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#d4a0a0';
                    e.target.style.boxShadow = '0 0 0 3px rgba(212,160,160,0.1)';
                  }} onBlur={(e) => {
                    e.target.style.borderColor = 'var(--contato-input-border, #540808)';
                    e.target.style.boxShadow = 'none';
                  }} />
              
                </div>

              ))}
            
              <div style={{ marginBottom: '0.8rem' }}>
              
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.78rem', fontWeight: 500, color: 'var(--contato-label, #d4a0a0)', fontFamily: 'Poppins, sans-serif', }}> Mensagem </label>
              
                <textarea name="mensagem" required rows={3} value={formData.mensagem} onChange={handleChange} placeholder="Escreva sua mensagem aqui..." onClick={(e) => e.stopPropagation()} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--contato-input-border, #540808)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box', background: 'var(--contato-input-bg, #1a0303)', color: 'var(--contato-text, #ffffff)', transition: 'all 0.3s ease', }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#d4a0a0';
                  e.target.style.boxShadow = '0 0 0 3px rgba(212,160,160,0.1)';
                }} onBlur={(e) => {
                  e.target.style.borderColor = 'var(--contato-input-border, #540808)';
                  e.target.style.boxShadow = 'none';
                }} />
            
              </div>

              <button type="submit" disabled={isSubmitting} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'var(--contato-btn-bg, #ffffff)', color: 'var(--contato-btn-text, #540808)', border: 'none', padding: '12px', fontSize: '0.95rem', fontWeight: 600, borderRadius: '10px', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', marginBottom: '20px', fontFamily: 'Poppins, sans-serif', opacity: isSubmitting ? 0.7 : 1, }}
              onMouseEnter={(e) => {
      
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                }
            
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}> {isSubmitting ? 'Enviando...' : 'Enviar mensagem'} </button>

              {submitStatus === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem', padding: '10px', background: 'rgba(76, 175, 80, 0.15)', border: '1px solid rgba(76, 175, 80, 0.3)', borderRadius: '8px', color: '#81C784', textAlign: 'center', fontSize: '0.85rem', fontFamily: 'Poppins, sans-serif', }}> Mensagem enviada com sucesso! </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem', padding: '10px', background: 'rgba(244, 67, 54, 0.15)', border: '1px solid rgba(244, 67, 54, 0.3)', borderRadius: '8px', color: '#EF9A9A', textAlign: 'center', fontSize: '0.85rem', fontFamily: 'Poppins, sans-serif', }}> Erro ao enviar. Tente o WhatsApp. </motion.div>
              )}
          
            </form>
    
          </motion.div>
     
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.2}>
       
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="contato-info" style={{ background: 'var(--contato-info-bg, #ffffff)', color: 'var(--contato-info-text, #540808)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', }}>
            
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.05rem', fontWeight: 600, margin: '0 0 1rem', color: 'inherit', }}> Contatos </h3>
            
              {[
             
                { icon: Phone, label: 'WhatsApp', value: '(11) 9 9617-3362', link: 'https://wa.me/5511996173362' },
                { icon: Mail, label: 'Email', value: 'rosemary@rsoaresadvocacia.com.br', link: 'mailto:rosemary@rsoaresadvocacia.com.br' },
                { icon: MapPin, label: 'Endereço', value: 'Rua do Rosário, 647. Centro — Jundiaí/SP', link: 'https://maps.app.goo.gl/GTz3ktt6GE2YAHzy7' },
            
              ].map((item, i) => {
              
                const Icon = item.icon;
              
                return (
              
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: i < 2 ? '0.8rem' : 0, gap: '10px', }}>
                
                  <Icon size={16} style={{ marginTop: '2px', opacity: 0.7, flexShrink: 0 }} />
                
                  <div style={{ textAlign: 'left' }}>
                  
                    <div style={{ fontSize: '0.65rem', opacity: 0.5, marginBottom: '1px', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', }}>
                      {item.label}
                    </div>
                  
                    {item.link ?
                      <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontWeight: 500, fontSize: '0.85rem', color: 'inherit', fontFamily: 'Poppins, sans-serif', textAlign: 'left', display: 'block', }}> {item.value} </a>
                    :
                      <span style={{ fontSize: '0.85rem', textAlign: 'left', display: 'block', }}> {item.value} </span>
                    }
                
                  </div>

                </div>
                );

              })}

            </div>
          
            <div style={{ background: 'var(--contato-hours-bg, #1a0303)', border: '1px solid var(--contato-input-border, #540808)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', }}>
            
              <span style={{ fontSize: '0.8rem', color: 'var(--contato-label, #d4a0a0)', fontFamily: 'Poppins, sans-serif', }}>
                <Clock size={16} color="var(--contato-label, #d4a0a0)" style={{ marginRight: '5px' }} />
                Segunda: <strong style={{ fontWeight: 600 }}>10h às 18h30</strong> <br /> Terça à quinta: <strong style={{ fontWeight: 600 }}>09h30 às 18h30</strong> <br />  Sexta: <strong style={{ fontWeight: 600 }}>09h30 às 18h</strong>
              </span>
        
            </div>

            <a href="https://wa.me/5511996173362" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px', background: '#25D366', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.3s ease', }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.3)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}> <Phone size={16} /> Falar no WhatsApp </a>
        
          </div>
        </ScrollReveal>
      </div>
    </div>
  
  </section>
  );
}

export default Contato;