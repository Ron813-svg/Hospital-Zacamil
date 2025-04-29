import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login exitoso:', data);
        alert('¡Se ha iniciado sesión correctamente!, Bienvenido ' + email);
        navigate('/');
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      console.error(error);
      alert('Error al iniciar sesión. Por favor, revisa tus credenciales.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm" style={{ maxWidth: '22rem', width: '100%' }}>
        <div className="card-header bg-primary text-white text-center">
          <h5 className="mb-0">Iniciar sesión</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
          </form>
        </div>
        <div className="card-footer text-center">
          <small className="text-muted">¿Olvidaste tu contraseña?</small>
        </div>
      </div>
    </div>
  );
};

export default Login;
