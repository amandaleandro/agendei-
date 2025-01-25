const Agendamento = require('../models/Agendamento');
const Disponibilidade = require('../models/Disponibilidade');
const { enviarSms } = require('./notificationsController');
const { processarPagamento, reembolsarPagamento } = require('./pagamentosController');
const cron = require('node-cron');

exports.verificarDisponibilidade = (profissionalId, data, hora_inicio, hora_fim) => {
    return Promise.all([
        Agendamento.find({
            profissional_id: profissionalId,
            data: data,
            $or: [
                { hora_inicio: { $lt: hora_fim }, hora_fim: { $gt: hora_inicio } }
            ]
        }),
        Disponibilidade.find({
            profissional_id: profissionalId,
            data: data,
            $or: [
                { hora_inicio: { $lt: hora_fim }, hora_fim: { $gt: hora_inicio } }
            ]
        })
    ]).then(([agendamentos, bloqueios]) => {
        return agendamentos.length === 0 && bloqueios.length === 0;
    });
};

exports.criarAgendamento = (profissionalId, clienteId, data, hora_inicio, duracao, servicosSelecionados, callback) => {
    const hora_fim = calcularHoraFim(hora_inicio, duracao);

    verificarDisponibilidade(profissionalId, data, hora_inicio, hora_fim).then(disponivel => {
        if (disponivel) {
            const novoAgendamento = new Agendamento({
                profissional_id: profissionalId,
                cliente_id: clienteId,
                servicos_selecionados: servicosSelecionados,
                data: data,
                hora_inicio: hora_inicio,
                hora_fim: hora_fim
            });

            novoAgendamento.save((err) => {
                if (err) {
                    callback({ success: false, mensagem: 'Erro ao criar agendamento' });
                } else {
                    bloquearHorario(profissionalId, data, hora_inicio, hora_fim, () => {
                        enviarSms(clienteId, 'Seu serviço foi agendado com sucesso!');
                        agendarLembretesSMS(clienteId, data, hora_inicio);
                        callback({ success: true });
                    });
                }
            });
        } else {
            callback({ success: false, mensagem: 'Horário não disponível' });
        }
    });
};

exports.listarAgendamentos = (profissionalId, callback) => {
    Agendamento.find({ profissional_id: profissionalId }, (err, agendamentos) => {
        if (err || !agendamentos) {
            callback(null);
        } else {
            callback(agendamentos);
        }
    });
};

exports.cancelarAgendamento = (agendamentoId, callback) => {
    Agendamento.findById(agendamentoId, (err, agendamento) => {
        if (err || !agendamento) {
            callback({ success: false, mensagem: 'Agendamento não encontrado' });
        } else {
            Agendamento.findByIdAndDelete(agendamentoId, (err) => {
                if (err) {
                    callback({ success: false, mensagem: 'Erro ao cancelar agendamento' });
                } else {
                    Disponibilidade.findOneAndDelete({ agendamento_id: agendamentoId }, (err) => {
                        if (err) {
                            callback({ success: false, mensagem: 'Erro ao remover bloqueio de disponibilidade' });
                        } else {
                            // Processar reembolso do pagamento
                            reembolsarPagamento(agendamento.pagamento_id, (resultado) => {
                                if (resultado.success) {
                                    enviarSms(agendamento.cliente_id, 'Seu serviço foi cancelado e o pagamento foi estornado.');
                                    callback({ success: true, mensagem: 'Agendamento cancelado com sucesso e pagamento estornado!' });
                                } else {
                                    callback({ success: false, mensagem: 'Erro ao processar o reembolso' });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

function calcularHoraFim(horaInicio, duracao) {
    let [hours, minutes] = horaInicio.split(':').map(Number);
    minutes += duracao;
    hours += Math.floor(minutes / 60);
    minutes %= 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function bloquearHorario(profissionalId, data, horaInicio, horaFim, callback) {
    const bloqueio = new Disponibilidade({
        profissional_id: profissionalId,
        data: data,
        hora_inicio: horaInicio,
        hora_fim: horaFim
    });

    bloqueio.save((err) => {
        if (err) {
            callback(false);
        } else {
            callback(true);
        }
    });
}

function agendarLembretesSMS(clienteId, data, hora_inicio) {
    const dataAgendamento = new Date(`${data}T${hora_inicio}:00`);

    // Lembrete na semana do serviço
    const umaSemanaAntes = new Date(dataAgendamento.getTime() - 7 * 24 * 60 * 60 * 1000);
    cron.schedule(`0 9 ${umaSemanaAntes.getDate()} ${umaSemanaAntes.getMonth() + 1} *`, () => {
        enviarSms(clienteId, 'Lembrete: Seu serviço está agendado para daqui uma semana.');
    });

    // Lembrete dois dias antes
    const doisDiasAntes = new Date(dataAgendamento.getTime() - 2 * 24 * 60 * 60 * 1000);
    cron.schedule(`0 9 ${doisDiasAntes.getDate()} ${doisDiasAntes.getMonth() + 1} *`, () => {
        enviarSms(clienteId, 'Lembrete: Seu serviço está agendado para daqui dois dias.');
    });

    // Lembrete no dia do serviço
    cron.schedule(`0 9 ${dataAgendamento.getDate()} ${dataAgendamento.getMonth() + 1} *`, () => {
        enviarSms(clienteId, 'Lembrete: Seu serviço está agendado para hoje.');
    });

    // Lembrete uma hora antes do serviço
    const umaHoraAntes = new Date(dataAgendamento.getTime() - 1 * 60 * 60 * 1000);
    cron.schedule(`${umaHoraAntes.getMinutes()} ${umaHoraAntes.getHours()} ${umaHoraAntes.getDate()} ${umaHoraAntes.getMonth() + 1} *`, () => {
        enviarSms(clienteId, 'Lembrete: Seu serviço está agendado para daqui uma hora.');
    });
}
