
import { useState } from 'react'
import '../styles/FormularioJuego.css'

export default function FormularioJuego({ onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    titulo: '',
    plataforma: 'PC',
    año: new Date().getFullYear(),
    genero: 'RPG',
    portada: '',
    descripcion: '',
    horasJugadas: 0,
    puntuacion: 0
  })

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const generos = [
    'Acción', 'RPG', 'Estrategia', 'Aventura', 'Puzzle',
    'Carreras', 'Deportes', 'Simulación', 'Terror', 'Otro'
  ]

  const plataformas = [
    'PC', 'PlayStation 4', 'PlayStation 5',
    'Xbox One', 'Xbox Series X/S', 'Nintendo Switch', 'Mobile'
  ]

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.titulo.trim()) {
      setError('El título es requerido')
      return
    }

    if (!formData.genero) {
      setError('Selecciona un género')
      return
    }

    try {
      setCargando(true)
      await onGuardar(formData)

      setFormData({
        titulo: '',
        plataforma: 'PC',
        año: new Date().getFullYear(),
        genero: 'RPG',
        portada: '',
        descripcion: '',
        horasJugadas: 0,
        puntuacion: 0
      })
    } catch (err) {
      setError('Error al guardar: ' + err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="formulario-section">
      <h2>➕ Agregar Nuevo Juego</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-field">
            <label className="form-label">Título *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ej: The Legend of Zelda"
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label"> Plataforma</label>
            <select
              name="plataforma"
              value={formData.plataforma}
              onChange={handleChange}
              className="form-select"
            >
              {plataformas.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label className="form-label"> Año</label>
            <input
              type="number"
              name="año"
              value={formData.año}
              onChange={handleChange}
              min="1970"
              max={new Date().getFullYear() + 1}
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label className="form-label"> Género *</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="form-select"
              required
            >
              {generos.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label className="form-label"> Horas Jugadas</label>
            <input
              type="number"
              name="horasJugadas"
              value={formData.horasJugadas}
              onChange={handleChange}
              min="0"
              step="0.5"
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label className="form-label">⭐ Puntuación (0-5)</label>
            <input
              type="number"
              name="puntuacion"
              value={formData.puntuacion}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.5"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label className="form-label"> URL de Portada</label>
            <input
              type="url"
              name="portada"
              value={formData.portada}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label className="form-label"> Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Cuéntanos sobre el juego..."
              className="form-textarea"
            />
          </div>
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            disabled={cargando}
            className="btn-guardar"
          >
            {cargando ? 'Guardando...' : 'Guardar Juego'}
          </button>

          <button
            type="button"
            onClick={onCancelar}
            className="btn-cancelar"
          >
            ✕ Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}