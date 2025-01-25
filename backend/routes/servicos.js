const express = require('express');
const router = express.Router();
const { adicionarServico, listarServicos } = require('../controllers/servicosController');

router.post('/', (req, res) => {
    const { profissionalId, nome, descricao, duracao } = req.body;
    adicionarServico(profissionalId, nome, descricao, duracao, (resultado) => {
        if (resultado.success) {
            res.status(200).send('Serviço adicionado com sucesso!');
        } else {
            res.status(400).send('Falha ao adicionar serviço');
        }
    });
});

router.get('/:id', (req, res) => {
    const profissionalId = req.params.id;
    listarServicos(profissionalId, (servicos) => {
        if (servicos) {
            res.status(200).json(servicos);
        } else {
            res.status(404).send('Serviços não encontrados');
        }
    });
});

module.exports = router;
