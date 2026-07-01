import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

function ScrollProgress({ progress = 0 }) {
  
  const isEnd = progress >= 95;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || ('ontouchstart' in window);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  
  }, []);

  if (isMobile) return null;

  return (
 
  <AnimatePresence>

    {!isEnd && (
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{ position: 'fixed', bottom: '30px', right: '96px', color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', zIndex: 100, pointerEvents: 'none', mixBlendMode: 'difference', }}>
        
        <span style={{ fontFamily: 'Poppins, sans-serif' }}>Role para baixo</span>

        <div style={{ width: '60px', height: '1px', background: 'rgba(255,255,255,0.18)', position: 'relative' }}>
          <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.08, ease: 'linear' }} style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: 'rgba(255,255,255,0.75)', }} />
        </div>

        <span style={{ fontSize: '0.82rem', fontWeight: 300, minWidth: '35px' }}> {progress}% </span>
      
      </motion.div>
    
    )}
  
  </AnimatePresence>
  );
}

export default ScrollProgress;