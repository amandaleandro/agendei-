const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema({
    profissional_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profissional' },
    nome: String,
    descricao: String,
    duracao: Number
});

module.exports = mongoose.model('Servico', servicoSchema);
