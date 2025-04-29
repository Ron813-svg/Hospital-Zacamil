import React from 'react';
import './RegCardD.css';

const DoctorForm = () => {
    return (
        <div className="form-container">
            <h1>Registro de Doctores</h1>
            <form action="/api/doctores" method="POST">
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="specialty">Especialidad:</label>
                <input type="text" id="specialty" name="specialty" required />

                <label htmlFor="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" required />

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default DoctorForm;
