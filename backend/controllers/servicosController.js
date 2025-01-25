const Servico = require('../models/Servico');

exports.adicionarServico = (profissionalId, nome, descricao, duracao, callback) => {
    const novoServico = new Servico({
        profissional_id: profissionalId,
        nome: nome,
        descricao: descricao,
        duracao: duracao
    });

    novoServico.save((err) => {
        if (err) {
            callback({ success: false });
        } else {
            callback({ success: true });
        }
    });
};

exports.listarServicos = (profissionalId, callback) => {
    Servico.find({ profissional_id: profissionalId }, (err, servicos) => {
        if (err) {
            callback(null);
        } else {
            callback(servicos);
        }
    });
};
