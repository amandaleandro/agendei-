const express = require('express');
const router = express.Router();

router.use('/agendamento', require('./agendamento'));
router.use('/auth', require('./auth'));
router.use('/disponibilidade', require('./disponibilidade'));
router.use('/pagamentos', require('./pagamentos'));
router.use('/servicos', require('./servicos'));

module.exports = router;
