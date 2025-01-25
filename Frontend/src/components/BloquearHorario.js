import React, { useState } from 'react';
import axios from 'axios';

const BloquearHorario = ({ profissionalId }) => {
    const [data, setData] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/disponibilidade/bloquear', { profissionalId, data, horaInicio, horaFim })
            .then(response => {
                alert('Horário bloqueado com sucesso!');
                // Limpar os campos após o bloqueio
                setData('');
                setHoraInicio('');
                setHoraFim('');
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h1>Bloquear Horário</h1>
            <form onSubmit={handleSubmit}>
                <label>Data:</label>
                <input type="date" value={data} onChange={e => setData(e.target.value)} required />
                <label>Hora de Início:</label>
                <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} required />
                <label>Hora de Término:</label>
                <input type="time" value={horaFim} onChange={e => setHoraFim(e.target.value)} required />
                <button type="submit">Bloquear</button>
            </form>
        </div>
    );
};

export default BloquearHorario;
