import { useEffect } from 'react';

function SmoothScroll({ children, onProgressChange }) {
  
  useEffect(() => {
    
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      onProgressChange?.(progress);
    };
    
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  
  }, [onProgressChange]);

  return <>{children}</>;

}

export default SmoothScroll;