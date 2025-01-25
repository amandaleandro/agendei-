const express = require('express');
const router = express.Router();
const { processarPagamento, reembolsarPagamento } = require('../controllers/pagamentosController');

router.post('/pagar', (req, res) => {
    const { clienteId, valor } = req.body;
    processarPagamento(clienteId, valor, (resultado) => {
        if (resultado.success) {
            res.status(200).send('Pagamento processado com sucesso!');
        } else {
            res.status(400).send('Falha ao processar pagamento');
        }
    });
});

router.post('/reembolsar', (req, res) => {
    const { pagamentoId } = req.body;
    reembolsarPagamento(pagamentoId, (resultado) => {
        if (resultado.success) {
            res.status(200).send('Reembolso processado com sucesso!');
        } else {
            res.status(400).send('Falha ao processar reembolso');
        }
    });
});

module.exports = router;
