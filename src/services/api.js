import axios from 'axios';

const API = axios.create({
  baseURL: 'https://gametracker-backend-30o5.onrender.com/api'
});;

export const obtenerJuegos = () => API.get('/juegos');
export const crearJuego = (data) => API.post('/juegos', data);
export const actualizarJuego = (id, data) => API.put(`/juegos/${id}`, data);
export const eliminarJuego = (id) => API.delete(`/juegos/${id}`);
export const buscarJuegos = (criterio) => API.get(`/juegos/buscar/${criterio}`);

export default API;