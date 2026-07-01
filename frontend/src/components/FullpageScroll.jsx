import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';

const SECTION_TRANSITIONS = ['scrollNativo', 'wipeUp', 'scrollNativo', 'wipeUp', 'scrollNativo'];

function FullpageScroll({ children, onProgressChange }) {
  
  const allChildren = React.Children.toArray(children);
  const footerSection = allChildren[allChildren.length - 1];
  const sections = allChildren.slice(0, -1);
  const total = sections.length;

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const scrollContainerRef = useRef(null);
  const viewportRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const sectionEls = useRef([]);
  
  const updateCSSVariables = useCallback((curIdx, lp) => {
    
    const setProp = (k, v) => document.documentElement.style.setProperty(k, v);

    if (curIdx === 0) {
      const isDark = lp < 85;
      setProp('--sobre-bg', isDark ? '#520A0A' : '#f9f9f7');
      setProp('--sobre-title', isDark ? '#ffffff' : '#520A0A');
      setProp('--sobre-text', isDark ? '#e0e0e0' : '#444444');
      setProp('--sobre-number', isDark ? '#fff' : '#520A0A' );
    }
   
    if (curIdx === 1) {
      setProp('--estatua-shift-y', `${(180 * lp) / 100}px`);
      setProp('--sobre-content-shift-y', `${(200 * lp) / 100}px`);
      setProp('--areas-reveal-prog', `${lp}`);
    }
    
    if (curIdx === 2) {
      
      const isLate = lp >= 80;
      
      setProp('--dep-bg', isLate ? '#ffffff' : '#520A0A');
      setProp('--dep-title', isLate ? '#520A0A' : '#ffffff');
      setProp('--dep-text', isLate ? '#444444' : '#e0e0e0');
      setProp('--dep-card-bg', isLate ? '#f9f9f7' : '#330a0a');
      setProp('--dep-btn-bg', isLate ? '#260303' : '#ffffff');
      setProp('--dep-btn-text', isLate ? '#ffffff' : '#260303');
      setProp('--dep-content-opacity', isLate ? '1' : '0');
      setProp('--dep-content-pointer', isLate ? 'auto' : 'none');
   
    }
    
    setProp('--duvidas-reveal-prog', curIdx === 3 ? `${lp}` : curIdx > 3 ? '100' : '0');

    if (curIdx === 3 && !handleScroll._depoInit) {
      handleScroll._depoInit = true;
      window.dispatchEvent(new CustomEvent('depoInit'));
    }

    setProp('--contato-reveal-prog', curIdx === 4 ? `${lp}` : '0');

    if (curIdx === 4) {
     
      const isLight = lp >= 80;
     
      setProp('--contato-bg', isLight ? '#f9f9f7' : '#520A0A');
      setProp('--contato-card-bg', isLight ? '#ffffff' : '#2c0a0a');
      setProp('--contato-title', isLight ? '#540808' : '#ffffff');
      setProp('--contato-subtitle', isLight ? '#888888' : '#d4a0a0');
      setProp('--contato-text', isLight ? '#333333' : '#ffffff');
      setProp('--contato-label', isLight ? '#520A0A' : '#d4a0a0');
      setProp('--contato-input-bg', isLight ? '#ffffff' : '#1a0303');
      setProp('--contato-input-border', isLight ? '#e0e0e0' : '#2C0A0A');
      setProp('--contato-info-bg', isLight ? '#540808' : '#ffffff');
      setProp('--contato-info-text', isLight ? '#ffffff' : '#540808');
      setProp('--contato-hours-bg', isLight ? '#f9f9f7' : '#1a0303');
      setProp('--contato-btn-bg', isLight ? '#540808' : '#ffffff');
      setProp('--contato-btn-text', isLight ? '#ffffff' : '#540808');
    
    }

  }, []);

  const handleScroll = useCallback(() => {
    
    const container = scrollContainerRef.current;
    const viewport = viewportRef.current;
    if (!container || !viewport) return;

    const scrollTop = container.scrollTop;
    const maxScroll = container.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    onProgressChange?.(Math.round((scrollTop / maxScroll) * 100));

    const vh = window.innerHeight;
    const transHeight = (total - 1) * vh;
    const lastIdx = total - 1;

    if (scrollTop >= transHeight) {

      viewport.style.transform = `translateY(-${scrollTop - transHeight}px)`;
      sectionEls.current.forEach((el, i) => {
      
        if (!el) return;
      
        Object.assign(el.style, {
          visibility: i === lastIdx ? 'visible' : 'hidden',
          zIndex: i === lastIdx ? '5' : '1',
          transform: 'none',
          clipPath: 'none',
        });
     
      });

      const isLightNow = true;
      
      if (isLightNow !== handleScroll._lastLight) {
        handleScroll._lastLight = isLightNow;
        window.dispatchEvent(new CustomEvent('navbgchange', { detail: { isLight: isLightNow } }));
      }

      return;
 
    }

    viewport.style.transform = 'none';

    const fatias = total - 1;
    const sliceW = 100 / fatias;
    const progRest = (scrollTop / transHeight) * 100;
    const curIdx = Math.min(Math.floor(progRest / sliceW), fatias - 1);
    const nxtIdx = curIdx + 1;
    const lp = ((progRest - curIdx * sliceW) / sliceW) * 100;
    const effect = SECTION_TRANSITIONS[curIdx] ?? 'scrollNativo';

    const isLightNow = ((curIdx === 0 && lp >= 90) || curIdx === 1 || curIdx === 3 || (curIdx === 4 && lp >= 90));
    
    if (isLightNow !== handleScroll._lastLight) {
      handleScroll._lastLight = isLightNow;
      window.dispatchEvent(new CustomEvent('navbgchange', { detail: { isLight: isLightNow } }));
    }
    
    updateCSSVariables(curIdx, lp);

    sectionEls.current.forEach((el, i) => {
     
      if (!el) return;

      let zIndex = '1';
      let visibility = 'hidden';
      let transform = i < curIdx ? 'translateY(-100%)' : 'translateY(100%)';
      let clipPath = 'none';

      if (i === curIdx) {
        zIndex = '4';
        visibility = 'visible';
        transform = effect === 'scrollNativo' ? `translateY(${-lp}%)` : 'none';
      } else if (i === nxtIdx) {
     
        zIndex = '5';
        visibility = 'visible';
        transform = effect === 'scrollNativo' ? `translateY(${100 - lp}%)` : 'none';
     
        if (effect === 'wipeUp') {
          const dp = Math.max(0, lp - 15) * (100 / 85);
          clipPath = `inset(${100 - dp}% 0% 0% 0%)`;
        }
     
      } else if (i < curIdx) {
        visibility = 'visible';
      }

      Object.assign(el.style, { zIndex, visibility, transform, clipPath });
   
    });
 
  }, [total, onProgressChange, updateCSSVariables]);

  useEffect(() => {

    const handleModalToggle = (e) => {

      const isOpen = e.detail.isOpen;
      setIsModalOpen(isOpen);
      const container = scrollContainerRef.current;
     
      if (container) {
        container.style.overflowY = isOpen ? 'hidden' : 'scroll';
      }
    
    };
  
    window.addEventListener('modalToggle', handleModalToggle);
    return () => window.removeEventListener('modalToggle', handleModalToggle);
  
  }, []);

  useEffect(() => {

    if (isMobile) return;
    
    const container = scrollContainerRef.current;
    if (!container) return;

    const lenis = new Lenis({
      wrapper: container,
      content: container.firstElementChild,
      duration: 10,
      lerp: 0.01,
      smoothWheel: true,
    });

    let rafId;
   
    const raf = (t) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
   
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  
  }, [isMobile]);

  useEffect(() => {
    
    if (!isMobile) return;
    const container = mobileScrollRef.current;
    if (!container) return;
  
    const handleMobileScroll = () => {
     
      const scrollTop = container.scrollTop;
      const vh = window.innerHeight;
      const rawIndex = Math.floor(scrollTop / vh);
      const lp = ((scrollTop % vh) / vh) * 100;
  
      if (rawIndex >= total - 1) {
        updateCSSVariables(4, 100);
        document.documentElement.style.setProperty('--contato-reveal-prog', '100');
      } else {
        updateCSSVariables(rawIndex, lp);
      }

      const isLightNow = (
        (rawIndex === 0 && lp >= 90) ||
        rawIndex === 1 ||
        rawIndex === 3 ||
        rawIndex === 5
      );
  
      if (isLightNow !== handleMobileScroll._lastLight) {
        handleMobileScroll._lastLight = isLightNow;
        window.dispatchEvent(new CustomEvent('navbgchange', { detail: { isLight: isLightNow } }));
      }

      if (rawIndex >= 3 && !handleMobileScroll._depoInit) {
        handleMobileScroll._depoInit = true;
        window.dispatchEvent(new CustomEvent('depoInit'));
      }
      
    };
  
    container.addEventListener('scroll', handleMobileScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleMobileScroll);
  
  }, [isMobile, updateCSSVariables, total]);

  useEffect(() => {
 
    const container = scrollContainerRef.current;
    if (!container) return;

    container.focus();

    const triggerFocus = () => container.focus({ preventScroll: true });
    window.fullpage_focus = triggerFocus;
    window.addEventListener('click', triggerFocus);

    return () => {
      delete window.fullpage_focus;
      window.removeEventListener('click', triggerFocus);
    };

  }, []);

  useEffect(() => {

    const moveTo = (index) => {
      const container = isMobile ? mobileScrollRef.current : scrollContainerRef.current;
      if (!container || index < 0 || index >= total) return;
      const targetScroll = index * window.innerHeight;
      container.scrollTo({ top: targetScroll, behavior: 'smooth' });
    };
  
    const idMap = {
      inicio: 0,
      sobre: 1,
      areas: 2,
      depoimentos: 3,
      duvidas: 4,
      faq: 4,
      contato: 5,
    };
  
    window.fullpage_api = {
     
      moveTo,
     
      moveToId: (id) => {
        const index = idMap[id.replace('#', '')];
        if (index !== undefined) moveTo(index);
      },
    
    };
  
    return () => { delete window.fullpage_api; };
 
  }, [total, isMobile]);

  if (isMobile) {

    return (
    
    <div ref={mobileScrollRef} style={{ overflowY: 'scroll', overflowX: 'hidden', height: '100vh', position: 'relative',  scrollBehavior: 'smooth', }}>
  
      {sections.map((section, index) => (
      
        <div key={index} style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden', }}>
          {section}
        </div>
      
      ))}

      <div style={{ position: 'relative', zIndex: 12 }}>
        {footerSection}
      </div>

    </div>
    );
 
  }

  return (
  <>
    
    <div ref={scrollContainerRef} onScroll={handleScroll} tabIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', overflowY: isModalOpen ? 'hidden' : 'scroll',  overflowX: 'hidden', zIndex: 10, scrollbarWidth: 'none', msOverflowStyle: 'none', outline: 'none', pointerEvents: 'none' }}>
      
      <div style={{ pointerEvents: 'none' }}>
        
        <div style={{ height: `${total * 100}vh` }} />
        
        <div style={{ position: 'relative', zIndex: 12, background: 'transparent', pointerEvents: 'auto' }}>
          {footerSection}
        </div>
      
      </div>
    
    </div>

    <div ref={viewportRef} style={{ height: '100vh', overflow: 'visible', position: 'fixed', width: '100%', top: 0, left: 0, zIndex: 6, backgroundColor: 'transparent', willChange: 'transform', pointerEvents: 'auto', }}>
      
      {sections.map((section, index) => (
        
        <div key={index} ref={(el) => { sectionEls.current[index] = el; }} style={{ position: 'absolute', inset: 0, zIndex: index === 0 ? 4 : 1, visibility: index === 0 ? 'visible' : 'hidden', overflow: 'hidden', willChange: 'clip-path, transform', }}>
          {section}
        </div>
      
      ))}
    
    </div>
  
  </>
  );
}

export default FullpageScroll;