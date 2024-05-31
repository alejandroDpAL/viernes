import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/registrar', {
        nombre
      });

      if (response.status === 201) {
        alert('Usuario registrado con exito!');
      } else {
        alert('Error: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error al registrar un usuario!', error);
      alert('Error al registrar con exito!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default App;
