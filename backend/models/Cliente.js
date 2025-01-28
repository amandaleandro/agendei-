const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nome: String,
    contato: String,
    endereco: String,
});

module.exports = mongoose.model('Cliente', clienteSchema);
