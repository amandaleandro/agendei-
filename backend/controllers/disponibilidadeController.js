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
    let disponibilidade = [
        { data: '2025-01-21', hora_inicio: '09:00', hora_fim: '12:00' },
        { data: '2025-01-22', hora_inicio: '14:00', hora_fim: '18:00' }
    ];
    callback(disponibilidade);
};
