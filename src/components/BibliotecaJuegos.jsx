import { useState, useEffect } from 'react'
import { obtenerJuegos, crearJuego, eliminarJuego, actualizarJuego, buscarJuegos } from '../services/api'
import TarjetaJuego from './TarjetaJuego'
import FormularioJuego from './FormularioJuego'
import '../styles/BibliotecaJuegos.css'

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([])
  const [filtro, setFiltro] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [mostrarForm, setMostrarForm] = useState(false)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarJuegos()
  }, [])

  const cargarJuegos = async () => {
    try {
      const { data } = await obtenerJuegos()
      setJuegos(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setCargando(false)
    }
  }

  const handleBusqueda = async (valor) => {
    setBusqueda(valor)
    if (valor.trim()) {
      try {
        const { data } = await buscarJuegos(valor)
        setJuegos(data)
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      cargarJuegos()
    }
  }

  const handleAgregar = async (nuevoJuego) => {
    try {
      const { data } = await crearJuego(nuevoJuego)
      setJuegos([data, ...juegos])
      setMostrarForm(false)
      setBusqueda('')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este juego?')) {
      try {
        await eliminarJuego(id)
        setJuegos(juegos.filter(j => j._id !== id))
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  const handleActualizar = async (id, datos) => {
    try {
      const { data } = await actualizarJuego(id, datos)
      setJuegos(juegos.map(j => j._id === id ? data : j))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const juegosFiltrables = juegos.filter(j => {
    const cumpleFiltro = filtro === 'todos' || 
                        (filtro === 'completados' && j.completado) ||
                        (filtro === 'pendientes' && !j.completado)
    return cumpleFiltro
  })

  const stats = {
    total: juegos.length,
    completados: juegos.filter(j => j.completado).length,
    horas: juegos.reduce((sum, j) => sum + (j.horasJugadas || 0), 0)
  }

  return (
    <div className="biblioteca-container">
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <span>🎮</span>
            <div>
              <h1>GameTracker</h1>
              <p className="header-subtitle">Tu biblioteca de videojuegos</p>
            </div>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Buscar juegos..."
              value={busqueda}
              onChange={(e) => handleBusqueda(e.target.value)}
              className="search-input"
            />
            <button
              onClick={() => setMostrarForm(!mostrarForm)}
              className="btn-agregar"
            >
              ➕ Agregar
            </button>
          </div>

          <div className="filtros">
            {['todos', 'completados', 'pendientes'].map(opt => (
              <button
                key={opt}
                onClick={() => setFiltro(opt)}
                className={`btn-filtro ${filtro === opt ? 'activo' : ''}`}
              >
                {opt === 'todos' ? ' Todos' : opt === 'completados' ? ' Completados' : ' Pendientes'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="main-content">
        {mostrarForm && (
          <div className="form-section">
            <FormularioJuego 
              onGuardar={handleAgregar}
              onCancelar={() => setMostrarForm(false)}
            />
          </div>
        )}

        {cargando ? (
          <div className="no-juegos">
            <div className="no-juegos-emoji">🎮</div>
            <p>Cargando juegos...</p>
          </div>
        ) : juegosFiltrables.length === 0 ? (
          <div className="no-juegos">
            <div className="no-juegos-emoji">📭</div>
            <p>No hay juegos para mostrar</p>
          </div>
        ) : (
          <div className="juegos-grid">
            {juegosFiltrables.map(juego => (
              <TarjetaJuego
                key={juego._id}
                juego={juego}
                onEliminar={handleEliminar}
                onActualizar={handleActualizar}
              />
            ))}
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span>🎮</span>
              <span>Total de Juegos</span>
            </div>
            <div className="stat-number">{stats.total}</div>
            <p className="stat-subtitle">en tu biblioteca</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>✅</span>
              <span>Completados</span>
            </div>
            <div className="stat-number">{stats.completados}</div>
            <p className="stat-subtitle">{Math.round((stats.completados / stats.total) * 100 || 0)}% completado</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>⏱️</span>
              <span>Horas Jugadas</span>
            </div>
            <div className="stat-number">{stats.horas}h</div>
            <p className="stat-subtitle">total acumulado</p>
          </div>
        </div>
      </main>
    </div>
  )
}
