
import { useState } from 'react'
import '../styles/TarjetaJuego.css'

export default function TarjetaJuego({ juego, onEliminar, onActualizar }) {
  const [mostrarOpciones, setMostrarOpciones] = useState(false)

  const handleToggleCompletado = () => {
    onActualizar(juego._id, { ...juego, completado: !juego.completado })
  }

  const renderStars = (puntuacion) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className="estrella">
        {i < puntuacion ? '⭐' : '☆'}
      </span>
    ))
  }

  return (
    <div className="tarjeta-juego">
      {/* PORTADA */}
      <div className="tarjeta-portada">
        <img
          src={juego.portada || 'https://via.placeholder.com/300x400?text=Sin+Portada'}
          alt={juego.titulo}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=' + juego.titulo.slice(0, 15)
          }}
        />
        {juego.completado && (
          <div className="badge-completado">✓</div>
        )}
      </div>

      {/* CONTENIDO */}
      <div className="tarjeta-contenido">
        <h3 className="tarjeta-titulo">{juego.titulo}</h3>

        <div className="tarjeta-info">
          <div className="info-item">
            <span>📱</span>
            <span>{juego.plataforma}</span>
          </div>
          <div className="info-item">
            <span>📅</span>
            <span>{juego.año}</span>
          </div>
          <div className="info-item">
            <span>🎯</span>
            <span className="genero-badge">{juego.genero}</span>
          </div>
        </div>

        {/* PUNTUACIÓN */}
        {juego.puntuacion > 0 && (
          <div className="tarjeta-puntuacion">
            {renderStars(juego.puntuacion)}
            <span className="puntuacion-texto">{juego.puntuacion}/5</span>
          </div>
        )}

        {/* HORAS */}
        {juego.horasJugadas > 0 && (
          <div className="tarjeta-horas">
            ⏱️ {juego.horasJugadas} horas
          </div>
        )}

        {/* BOTONES */}
        <div className="tarjeta-botones">
          <button
            onClick={handleToggleCompletado}
            className={`btn-tarjeta btn-completado ${juego.completado ? 'activo' : ''}`}
          >
            {juego.completado ? '✅ Completado' : '⏳ Marcar completado'}
          </button>

          {!mostrarOpciones ? (
            <button
              onClick={() => setMostrarOpciones(true)}
              className="btn-tarjeta btn-opciones"
            >
              ⚙️ Opciones
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  onEliminar(juego._id)
                  setMostrarOpciones(false)
                }}
                className="btn-tarjeta btn-eliminar"
              >
                🗑️ Eliminar
              </button>
              <button
                onClick={() => setMostrarOpciones(false)}
                className="btn-tarjeta btn-cerrar"
              >
                ✕ Cerrar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}