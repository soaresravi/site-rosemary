const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const API = {
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
  clienteProcessos: (email) => `${API_URL}/clientes/${encodeURIComponent(email)}/processos`,
};