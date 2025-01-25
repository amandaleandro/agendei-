const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
    profissional_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profissional' },
    cliente_id: String,
    servicos_selecionados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servico' }],
    data: Date,
    hora_inicio: String,
    hora_fim: String
});

module.exports = mongoose.model('Agendamento', agendamentoSchema);
