import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const effects = {

  wipeUp: {
    
    initial: { clipPath: 'inset(100% 0% 0% 0%)' },
    
    animate: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
    },

  },

  slash: {
    
    initial: { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
    
    animate: {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
    },

  },

};

function SectionReveal({ children, effect = 'wipeUp', threshold = 0.12 }) {
 
  const ref = useRef(null);
  const inView = useInView(ref, { threshold, once: true });

  const { initial, animate } = effects[effect] || effects.wipeUp;

  return (
 
  <div ref={ref}>
    
    <motion.div initial={initial} animate={inView ? animate : initial}>
      {children}
    </motion.div>
  
  </div>
  );
  
}

export default SectionReveal;