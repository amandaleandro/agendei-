const express = require('express');
const router = express.Router();
const { verificarDisponibilidade, criarAgendamento, listarAgendamentos, cancelarAgendamento } = require('../controllers/agendamentoController');

// Rota para verificar disponibilidade
router.get('/:id', (req, res) => {
    const profissionalId = req.params.id;

    getDisponibilidadePorId(profissionalId, (disponibilidade) => {
        if (disponibilidade) {
            res.status(200).json({ profissionalId, disponibilidade });
        } else {
            res.status(404).send('Profissional não encontrado');
        }
    });
});

// Rota para criar agendamento
router.post('/:id/agendar', (req, res) => {
    const profissionalId = req.params.id;
    const { clienteId, data, hora_inicio, servicoSelecionado } = req.body;

    const duracao = servicoSelecionado.duracao; // Supondo que a duração vem do front-end
    criarAgendamento(profissionalId, clienteId, data, hora_inicio, duracao, servicoSelecionado, (resultado) => {
        if (resultado.success) {
            res.status(200).send('Agendamento confirmado!');
        } else {
            res.status(400).send(resultado.mensagem);
        }
    });
});

// Nova rota para listar agendamentos do profissional
router.get('/listar/:profissionalId', (req, res) => {
    const profissionalId = req.params.profissionalId;
    listarAgendamentos(profissionalId, (agendamentos) => {
        if (agendamentos) {
            res.status(200).json(agendamentos);
        } else {
            res.status(404).send('Nenhum agendamento encontrado');
        }
    });
});

// Nova rota para cancelar agendamentos
router.post('/cancelar/:agendamentoId', (req, res) => {
    const agendamentoId = req.params.agendamentoId;
    cancelarAgendamento(agendamentoId, (resultado) => {
        if (resultado.success) {
            res.status(200).send('Agendamento cancelado com sucesso!');
        } else {
            res.status(400).send('Erro ao cancelar o agendamento');
        }
    });
});

module.exports = router;
