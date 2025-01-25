import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgendamentosPrestador = ({ profissionalId }) => {
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        axios.get(`/agendamento/listar/${profissionalId}`)
            .then(response => setAgendamentos(response.data))
            .catch(error => console.log(error));
    }, [profissionalId]);

    const handleCancelar = (agendamentoId) => {
        axios.post(`/agendamento/cancelar/${agendamentoId}`)
            .then(response => {
                alert(response.data);
                setAgendamentos(agendamentos.filter(agendamento => agendamento._id !== agendamentoId));
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h1>Meus Agendamentos</h1>
            <ul>
                {agendamentos.map(agendamento => (
                    <li key={agendamento._id}>
                        <p>Data: {agendamento.data}</p>
                        <p>Hora: {agendamento.hora_inicio} - {agendamento.hora_fim}</p>
                        <p>Serviços: {agendamento.servicos_selecionados.join(', ')}</p>
                        <button onClick={() => handleCancelar(agendamento._id)}>Cancelar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AgendamentosPrestador;
// Compare this snippet from backend/controllers/notificationsController.js: