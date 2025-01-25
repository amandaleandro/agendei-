const mongoose = require('mongoose');

const profissionalSchema = new mongoose.Schema({
    nome: String,
    contato: String,
});

module.exports = mongoose.model('Profissional', profissionalSchema);
