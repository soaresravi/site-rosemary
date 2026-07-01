import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ target, label, suffix = '', duration = 1.5 }) {
  
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    
    if (!inView) return;
    let start = 0;
    
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      
      start += step;
      
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    
    }, 16);

    return () => clearInterval(timer);
  
  }, [inView, target, duration]);

  return (
  
  <div ref={ref} style={{ textAlign: 'center' }}>
    
    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}>

      <div style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.8rem)', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: 'var(--sobre-number, #520A0A)', transition: 'color 0.4s ease', }}>
        {count} {suffix}
      </div>
    
    </motion.div>
  
    <div style={{ fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)', fontFamily: 'Poppins, sans-serif', color: 'var(--sobre-text, #444)', marginTop: '0.2rem', transition: 'color 0.4s ease', }}>
      {label}
    </div>
  
  </div>
  );

}

export default AnimatedCounter;