import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const juegoService = {
  obtenerTodos: () => axios.get(`${API_URL}/juegos`),
  obtenerPorId: (id) => axios.get(`${API_URL}/juegos/${id}`),
  crear: (juego) => axios.post(`${API_URL}/juegos`, juego),
  actualizar: (id, juego) => axios.put(`${API_URL}/juegos/${id}`, juego),
  eliminar: (id) => axios.delete(`${API_URL}/juegos/${id}`),
  obtenerEstadisticas: () => axios.get(`${API_URL}/juegos/stats/resumen`)
};

export const reseñaService = {
  obtenerTodas: () => axios.get(`${API_URL}/reseñas`),
  obtenerPorJuego: (juegoId) => axios.get(`${API_URL}/reseñas/juego/${juegoId}`),
  crear: (reseña) => axios.post(`${API_URL}/reseñas`, reseña),
  actualizar: (id, reseña) => axios.put(`${API_URL}/reseñas/${id}`, reseña),
  eliminar: (id) => axios.delete(`${API_URL}/reseñas/${id}`)
};