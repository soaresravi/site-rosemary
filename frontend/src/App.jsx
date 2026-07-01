import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AreaCliente from './pages/AreaCliente';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/area-cliente" element={<AreaCliente />} />
      </Routes>
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;