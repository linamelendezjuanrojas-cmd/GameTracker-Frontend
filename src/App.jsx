
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerJuegos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/juegos');
        setJuegos(response.data.juegos);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    obtenerJuegos();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <header>
        <h1>GamerTracker</h1>
      </header>
      <main>
        {juegos.map(juego => (
          <div key={juego.id}>
            <h2>{juego.nombre}</h2>
            <p>Año: {juego.año}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;