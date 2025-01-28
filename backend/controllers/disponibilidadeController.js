const Disponibilidade = require('../models/Disponibilidade');

exports.bloquearHorario = (profissionalId, data, horaInicio, horaFim, callback) => {
    const bloqueio = new Disponibilidade({
        profissional_id: profissionalId,
        data: data,
        hora_inicio: horaInicio,
        hora_fim: horaFim
    });

    bloqueio.save((err) => {
        if (err) {
            callback({ success: false });
        } else {
            callback({ success: true });
        }
    });
};

exports.getDisponibilidadePorId = (profissionalId, callback) => {
    Disponibilidade.find({ profissional_id: profissionalId }, (err, disponibilidade) => {
        if (err || !disponibilidade) {
            callback(null);
        } else {
            callback(disponibilidade);
        }
    });
};
