import { motion } from 'framer-motion';

function WhatsAppButton() {
 
  const phoneNumber = '5511996173362';
  const message = 'Olá! Gostaria de agendar uma consulta.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    
    <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5, }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#25D366', color: '#fff', borderRadius: '50%', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)', zIndex: 1000, textDecoration: 'none', fontSize: '2rem', transition: 'box-shadow 0.3s ease', }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.6)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)'; }}>
     
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
        <path d="M12.032 21.965c-1.78 0-3.516-.46-5.037-1.333l-3.595 1.177 1.203-3.503c-.927-1.556-1.417-3.33-1.417-5.17 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm0-18.422c-4.637 0-8.41 3.773-8.41 8.41 0 1.867.614 3.665 1.77 5.152l-.307.913-1.114 3.244 3.347-1.094.893.524c1.414.796 3.037 1.217 4.72 1.217 4.637 0 8.41-3.773 8.41-8.41s-3.773-8.41-8.41-8.41zm4.76 6.61c-.25-.416-.583-.458-.914-.46-.398-.002-.832-.003-1.286-.003-.412 0-.613.283-.796.507-.282.346-.543.788-.543 1.29 0 .46.134.884.597 1.305.185.168.297.357.297.59 0 .232-.112.44-.296.58-.184.14-.423.182-.66.182-.684 0-1.387-.396-1.963-1.146-.504-.654-.822-1.47-.935-2.268-.023-.158-.065-.387-.065-.496 0-.275.13-.505.313-.637.184-.133.386-.18.56-.18.066 0 .124-.008.182-.02.114-.024.232-.022.34-.022.12 0 .21-.022.294.18.087.214.127.424.127.636 0 .483-.368 1.08-.368 1.08s.507.637 1.175.92c.16.07.357.118.567.118.232 0 .463-.058.664-.17.202-.113.362-.282.478-.49.116-.207.17-.444.17-.68 0-.166-.075-.324-.222-.446-.264-.217-.554-.324-.884-.434-.34-.113-.833-.415-1.172-.95-.34-.535-.491-1.15-.448-1.754.02-.287.095-.568.224-.83.128-.263.307-.494.517-.68.316-.28.694-.43 1.08-.476.234-.028.47-.018.704-.018.076 0 .154.006.23.015.172.022.355.034.537.11.182.078.312.204.383.392.1.263.137.55.088.825-.05.274-.157.535-.285.75-.194.32-.394.618-.576.73.04.142.112.267.213.367.21.22.494.316.826.316.345 0 .656-.15.905-.405.264-.266.455-.622.539-1.02.094-.416.07-.87-.114-1.25z"/>
      </svg>
    
    </motion.a>
    
  );
}

export default WhatsAppButton;