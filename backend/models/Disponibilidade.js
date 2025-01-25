const mongoose = require('mongoose');

const disponibilidadeSchema = new mongoose.Schema({
    profissional_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profissional' },
    data: Date,
    hora_inicio: String,
    hora_fim: String
});

module.exports = mongoose.model('Disponibilidade', disponibilidadeSchema);
