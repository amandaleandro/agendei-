import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatalogoServicos = ({ profissionalId }) => {
    const [servicos, setServicos] = useState([]);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [duracao, setDuracao] = useState('');

    useEffect(() => {
        axios.get(`/servicos/${profissionalId}`)
            .then(response => setServicos(response.data))
            .catch(error => console.log(error));
    }, [profissionalId]);

    const handleAdicionarServico = (e) => {
        e.preventDefault();
        axios.post('/servicos', {
            profissionalId,
            nome,
            descricao,
            duracao: parseInt(duracao)
        })
            .then(response => {
                setServicos([...servicos, response.data]);
                setNome('');
                setDescricao('');
                setDuracao('');
                alert('Serviço adicionado com sucesso!');
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h1>Catálogo de Serviços</h1>
            <form onSubmit={handleAdicionarServico}>
                <label>Nome do Serviço:</label>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                <label>Descrição:</label>
                <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} required />
                <label>Duração (em minutos):</label>
                <input type="number" value={duracao} onChange={e => setDuracao(e.target.value)} required />
                <button type="submit">Adicionar Serviço</button>
            </form>
            <h2>Serviços Oferecidos</h2>
            <ul>
                {servicos.map(servico => (
                    <li key={servico._id}>
                        <p><strong>Nome:</strong> {servico.nome}</p>
                        <p><strong>Descrição:</strong> {servico.descricao}</p>
                        <p><strong>Duração:</strong> {servico.duracao} minutos</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CatalogoServicos;
