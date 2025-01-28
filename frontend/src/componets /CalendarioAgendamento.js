import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';

const CalendarioAgendamento = () => {
    const { profissionalId } = useParams();
    const [dataSelecionada, setDataSelecionada] = useState(new Date());
    const [disponibilidade, setDisponibilidade] = useState([]);
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');
    const [servicoSelecionado, setServicoSelecionado] = useState('');
    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        axios.get(`/servicos/${profissionalId}`)
            .then(response => setServicos(response.data))
            .catch(error => console.log(error));
    }, [profissionalId]);

    useEffect(() => {
        axios.get(`/agendamento/${profissionalId}?data=${dataSelecionada.toISOString()}`)
            .then(response => setDisponibilidade(response.data.disponibilidade))
            .catch(error => console.log(error));
    }, [profissionalId, dataSelecionada]);

    const handleAgendar = (e) => {
        e.preventDefault();
        axios.post(`/agendamento/${profissionalId}/agendar`, {
            clienteId: 'cliente123',  // Substituir pelo ID real do cliente
            data: dataSelecionada.toISOString().split('T')[0],
            hora_inicio: horaInicio,
            servicoSelecionado: servicoSelecionado,
            duracao: servicoSelecionado.duracao
        })
            .then(response => {
                alert('Agendamento realizado com sucesso!');
                setHoraInicio('');
                setHoraFim('');
                setServicoSelecionado('');
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h1>Agendar Serviço</h1>
            <Calendar
                onChange={setDataSelecionada}
                value={dataSelecionada}
            />
            <div>
                <h2>Horários Disponíveis</h2>
                {/* Lista de disponibilidade */}
                {disponibilidade.map((slot, index) => (
                    <div key={index}>
                        <p>{slot.hora_inicio} - {slot.hora_fim}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleAgendar}>
                <label>Hora de Início:</label>
                <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} required />
                <label>Serviço:</label>
                <select value={servicoSelecionado} onChange={e => setServicoSelecionado(e.target.value)} required>
                    {servicos.map(servico => (
                        <option key={servico._id} value={servico}>
                            {servico.nome} - {servico.duracao} min
                        </option>
                    ))}
                </select>
                <button type="submit">Agendar</button>
            </form>
        </div>
    );
};

export default CalendarioAgendamento;
