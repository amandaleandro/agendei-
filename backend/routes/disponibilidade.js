const express = require('express');
const router = express.Router();
const { bloquearHorario, getDisponibilidadePorId } = require('../controllers/disponibilidadeController');

router.post('/bloquear', (req, res) => {
    const { profissionalId, data, horaInicio, horaFim } = req.body;
    bloquearHorario(profissionalId, data, horaInicio, horaFim, (resultado) => {
        if (resultado.success) {
            res.status(200).send('Horário bloqueado com sucesso!');
        } else {
            res.status(400).send('Falha ao bloquear horário');
        }
    });
});

router.get('/:id', (req, res) => {
    const profissionalId = req.params.id;
    getDisponibilidadePorId(profissionalId, (disponibilidade) => {
        if (disponibilidade) {
            res.status(200).json(disponibilidade);
        } else {
            res.status(404).send('Disponibilidade não encontrada');
        }
    });
});

module.exports = router;
