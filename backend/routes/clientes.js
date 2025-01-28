const express = require('express');
const router = express.Router();
const { adicionarCliente, listarClientes, buscarCliente } = require('../controllers/clienteController');

router.post('/adicionar', adicionarCliente);
router.get('/listar', listarClientes);
router.get('/:id', buscarCliente);

module.exports = router;
