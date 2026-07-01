import { useState } from 'react';

import FullpageScroll from '../components/FullpageScroll';
import ScrollProgress from '../components/ScrollProgress';
import Hero from '../sections/Hero';
import Sobre from '../sections/Sobre';
import AreasAtuacao from '../sections/AreasAtuacao';
import Depoimentos from '../sections/Depoimentos';
import DuvidasFrequentes from '../sections/DuvidasFrequentes';
import Contato from '../sections/Contato';
import Footer from '../components/Footer';

function Home() {

  const [progress, setProgress] = useState(0);

  return (
  
  <>
    
    <FullpageScroll onProgressChange={setProgress}>
      <Hero />
      <Sobre />
      <AreasAtuacao />
      <Depoimentos />
      <DuvidasFrequentes />
      <Contato />
      <Footer />
    </FullpageScroll>

    <ScrollProgress progress={progress} />
  
  </>
  );
}

export default Home;