const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.processarPagamento = async (clienteId, valor, callback) => {
    try {
        const pagamento = await stripe.paymentIntents.create({
            amount: valor * 100, // Valor em centavos
            currency: 'brl',
            payment_method_types: ['card'],
            description: `Pagamento de cliente ${clienteId}`,
        });
        callback({ success: true, pagamento });
    } catch (error) {
        console.error(error);
        callback({ success: false, mensagem: 'Erro ao processar pagamento' });
    }
};

exports.reembolsarPagamento = async (pagamentoId, callback) => {
    try {
        const reembolso = await stripe.refunds.create({
            payment_intent: pagamentoId,
        });
        callback({ success: true, reembolso });
    } catch (error) {
        console.error(error);
        callback({ success: false, mensagem: 'Erro ao processar reembolso' });
    }
};
