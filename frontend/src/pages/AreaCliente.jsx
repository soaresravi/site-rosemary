import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Eye, EyeOff, Calendar, Clock, AlertCircle, CheckCircle, LogOut, Building2, Scale, Gavel, MapPin, User, ChevronDown, ChevronUp } from 'lucide-react';
import { API } from '../config/api';

export default function AreaCliente() {
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', senha: '', confirmarSenha: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [processos, setProcessos] = useState([]);
  const [processoSelecionado, setProcessoSelecionado] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    
    window.dispatchEvent(new CustomEvent('navbgchange', { detail: { isLight: true } }));
    
    document.body.style.overflow = 'auto';
    document.querySelector('#root')?.style.setProperty('border', 'none');
    document.querySelector('#root')?.style.setProperty('outline', 'none');
    document.querySelector('#root')?.style.setProperty('box-shadow', 'none');
    document.body?.style.setProperty('border', 'none');
    document.body?.style.setProperty('outline', 'none');
    document.documentElement?.style.setProperty('border', 'none');
    document.documentElement?.style.setProperty('outline', 'none');
    document.documentElement.style.overflow = 'auto';
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.querySelector('#root')?.style.removeProperty('border');
      document.querySelector('#root')?.style.removeProperty('outline');
      document.querySelector('#root')?.style.removeProperty('box-shadow');
      document.body?.style.removeProperty('border');
      document.body?.style.removeProperty('outline');
      document.documentElement?.style.removeProperty('border');
      document.documentElement?.style.removeProperty('outline');
    };

  }, []);

  const buscarProcessos = async (email, token) => {
    
    try {
    
      const res = await fetch(API.clienteProcessos(email), {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao buscar processos');
    
      setProcessos(data);
      setIsAuthenticated(true);
    
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  
  };

  const handleLogin = async (e) => {
   
    e.preventDefault();
    setIsLoading(true);
    setError('');
   
    try {
   
      const res = await fetch(API.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, senha: formData.senha }),
      });
   
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao fazer login');
     
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', formData.email);
      await buscarProcessos(formData.email, data.token);
   
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  
  };

  const handleCadastro = async (e) => {
   
    e.preventDefault();
   
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }
   
    setIsLoading(true);
    setError('');
   
    try {
   
      const res = await fetch(API.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, senha: formData.senha }),
      });
     
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao cadastrar');
     
      alert('Cadastro realizado! Agora faça login.');
      setIsLogin(true);
      setFormData({ email: '', senha: '', confirmarSenha: '' });
   
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsAuthenticated(false);
    setProcessos([]);
    setProcessoSelecionado(null);
    navigate('/area-cliente');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) buscarProcessos(email, token);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  if (isAuthenticated && processos.length > 0) {
    
    return (
    
    <div style={{ minHeight: '100vh', background: '#f9f9f7', marginTop: '150px', }}>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ margin: '0 auto', background: '#540808', borderRadius: '20px', padding: 'clamp(1.5rem, 3vw, 2.5rem)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', width: '100%', }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0', flexWrap: 'wrap', gap: '0.8rem', }}>
          
          <div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', color: '#fff', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', margin: 0, fontWeight: 600 }}> Meus processos </h2>
            <p style={{ color: '#e0e0e0', fontSize: '0.82rem', marginTop: '2px', fontFamily: 'Poppins, sans-serif' }}> {processos[0]?.clienteNome || 'Acompanhe seus processos'} </p>
          </div>
          
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: 'none', color: '#540808', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'Poppins, sans-serif', fontWeight: 500, transition: 'all 0.3s ease', }} onMouseMove={(e) => { e.currentTarget.style.background = 'rgba(255,255,255.0.06)' }} onMouseLeave={(e) => { e.currentTarget.style.color = '#540808' }}> <LogOut size={14} /> Sair </button>
        
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          
          {processos.map((processo, index) => {
            
            const isOpen = processoSelecionado === index;
            
            return (
            
            <motion.div key={processo.id || index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} onClick={() => setProcessoSelecionado(isOpen ? null : index)} style={{ background: isOpen ? '#f9f9f7' : '#fff', borderRadius: '12px', border: isOpen ? '1px solid rgba(84,8,8,0.15)' : '1px solid #e8e8e8', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s ease', }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', gap: '1rem', flexWrap: 'wrap', }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0, background: processo.status === 'ATIVO' ? 'rgba(84,8,8,0.08)' : 'rgba(76,175,80,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                
                    {processo.status === 'ATIVO' ?
                      <Clock size={17} color="#540808" />
                    :
                      <CheckCircle size={17} color="#4CAF50" />
                    }
                
                  </div>
                  
                  <div>
                  
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', fontFamily: 'Poppins, sans-serif' }}>
                      {processo.tipoAcao || 'Processo'}
                    </div>
                    
                    <div style={{ fontSize: '0.7rem', color: '#999', fontFamily: 'Poppins, sans-serif' }}>
                      Nº {processo.numeroProcesso || '—'}
                    </div>
              
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  
                  <span style={{ fontSize: '0.7rem', padding: '2px 10px', borderRadius: '50px', background: processo.status === 'ATIVO' ? 'rgba(84,8,8,0.08)' : 'rgba(76,175,80,0.1)', color: processo.status === 'ATIVO' ? '#540808' : '#4CAF50', fontFamily: 'Poppins, sans-serif', fontWeight: 500, }}> {processo.status || '—'} </span>
                  
                  {isOpen ?
                    <ChevronUp size={16} color="#888" />
                  :
                    <ChevronDown size={16} color="#888" />
                  }
                
                </div>
              
              </div>

              {isOpen && (
              
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }} style={{ padding: '0 16px 16px', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.5rem', paddingTop: '12px', }}>
                    
                    {[
                    
                      { icon: User, label: 'Cliente', value: processo.clienteNome },
                      { icon: MapPin, label: 'Comarca', value: processo.comarca },
                      { icon: Calendar, label: 'Data início', value: processo.dataInicio ? new Date(processo.dataInicio).toLocaleDateString('pt-BR') : null },
                      { icon: AlertCircle, label: 'Fase', value: processo.fase },
                      { icon: Building2, label: 'Instância', value: processo.instancia },
                      { icon: Scale, label: 'Resultado', value: processo.resultado },
                      { icon: Gavel, label: 'Vara', value: processo.vara },
                  
                    ].map(({ icon: Icon, label, value }, i) => (
                      
                      <div key={i} style={{ background: '#fff', padding: '6px 10px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1px' }}>
                          <Icon size={11} color="#aaa" />
                          <span style={{ fontSize: '0.55rem', color: '#bbb', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
                        </div>
                        
                        <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#1a1a1a', fontFamily: 'Poppins, sans-serif', display: 'block', wordBreak: 'break-word' }}> {value || '—'} </span>
                      
                      </div>
                      
                    ))}
                  
                  </div>
                  
                  {processo.observacoes && (
                    
                    <div style={{ marginTop: '8px', padding: '8px 12px', background: '#fff', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                      <span style={{ fontSize: '0.55rem', color: '#bbb', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Observações</span>
                      <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#444', fontFamily: 'Poppins, sans-serif' }}>{processo.observacoes}</p>
                    </div>
                
                  )}
              
                </motion.div>
              )}
            </motion.div>
            );
          })}
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f0f0f0', fontSize: '0.75rem', color: '#fff', fontFamily: 'Poppins, sans-serif' }}> Dúvidas? WhatsApp (11) 9 9617-3362 </p>
      
      </motion.div>
    
    </div>
    );
  }

  return (
  
  <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 0 50px', background: '#ffffff', }}>
    
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: '420px', width: '100%', background: '#520A0A', padding: 'clamp(1.8rem, 4vw, 2.8rem)', borderRadius: '20px', boxShadow: '0 8px 40px rgba(82,10,10,0.18)',  border: 'none', outline: 'none' }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Poppins, sans-serif', color: '#ffffff', fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)', margin: '0 0 4px', fontWeight: 700, }}> {isLogin ? 'Área do cliente' : 'Criar senha'} </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.83rem', margin: 0, fontFamily: 'Poppins, sans-serif', }}> {isLogin ? 'Acesse seus processos' : 'Crie uma senha no seu e-mail cadastrado para acompanhar seus processos'} </p>
      </div>
  
      {error && (

        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(244,67,54,0.12)', color: '#ff8a80', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '1.2rem', fontFamily: 'Poppins, sans-serif', border: '1px solid rgba(244,67,54,0.2)', }}>
          {error}
        </motion.div>
    
      )}
  
      <form onSubmit={isLogin ? handleLogin : handleCadastro}>

        <div style={{ marginBottom: '1rem' }}>
          
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.78rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', fontFamily: 'Poppins, sans-serif', textAlign: 'left', }}> Email </label>
          
          <div style={{ position: 'relative' }}>
            <Mail size={15} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', }} />
            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="email@email.com.br" style={{ width: '100%', padding: '11px 14px 11px 36px', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', background: 'rgba(255,255,255,0.07)', color: '#ffffff', fontFamily: 'Poppins, sans-serif', transition: 'border-color 0.3s ease', }} onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.4)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
          </div>
      
        </div>
        
        <div style={{ marginBottom: isLogin ? '1.8rem' : '1rem' }}>
          
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.78rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', fontFamily: 'Poppins, sans-serif', textAlign: 'left', }}> Senha </label>
          
          <div style={{ position: 'relative' }}>
            <Lock size={15} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', }} />
            <input type={showPassword ? 'text' : 'password'} name="senha" required value={formData.senha} onChange={handleChange} placeholder="******" style={{ width: '100%', padding: '11px 40px 11px 36px', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', background: 'rgba(255,255,255,0.07)', color: '#ffffff', fontFamily: 'Poppins, sans-serif', transition: 'border-color 0.3s ease', }} onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.4)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: '2px', }}> {showPassword ? <EyeOff size={15} /> : <Eye size={15} />} </button>
          </div>
      
        </div>
  
        {!isLogin && (
        
          <div style={{ marginBottom: '1.8rem' }}>
            
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.78rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', fontFamily: 'Poppins, sans-serif', textAlign: 'left', }}> Confirmar senha </label>
            
            <div style={{ position: 'relative' }}>
              <Lock size={15} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', }} />
              <input type={showPassword ? 'text' : 'password'} name="confirmarSenha" required value={formData.confirmarSenha} onChange={handleChange} placeholder="******" style={{ width: '100%', padding: '11px 14px 11px 36px', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', background: 'rgba(255,255,255,0.07)', color: '#ffffff', fontFamily: 'Poppins, sans-serif', transition: 'border-color 0.3s ease', }} onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.4)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
      
          </div>

        )}
  
        <button type="submit" disabled={isLoading} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#ffffff', color: '#520A0A', border: 'none', padding: '13px', fontSize: '0.92rem', fontWeight: 700, borderRadius: '10px', cursor: isLoading ? 'not-allowed' : 'pointer', fontFamily: 'Poppins, sans-serif', opacity: isLoading ? 0.7 : 1, transition: 'background 0.3s ease', }} onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = '#f0e8e8'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; }}>
          
          {isLoading ?
            'Carregando...'
          :
            <> {isLogin ? 'Entrar' : 'Cadastrar'}<ArrowRight size={15} strokeWidth={2.5} /></>
          }
        
        </button>
    
      </form>
      
      <p style={{ textAlign: 'left', marginTop: '1.2rem', fontSize: '0.83rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'Poppins, sans-serif', }}>
        
        {isLogin ? 'Ainda não tem senha?' : 'Já criou sua senha?'} {' '}
        
        <button onClick={() => {
          setIsLogin(!isLogin);
          setFormData({ email: '', senha: '', confirmarSenha: '' });
          setError('');
        }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.85)', fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', textDecoration: 'underline', textUnderlineOffset: '2px', padding: 0, }}> {isLogin ? 'Cadastre-se' : 'Então faça login'} </button>
      
      </p>
  
    </motion.div>
  
  </div>
  );
}