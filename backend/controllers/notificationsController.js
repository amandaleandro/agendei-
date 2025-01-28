const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.enviarWhatsApp = (numero, mensagem) => {
    client.messages.create({
        body: mensagem,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${numero}`
    }).then((message) => console.log(`WhatsApp enviado: ${message.sid}`))
      .catch((error) => console.error(`Erro ao enviar WhatsApp: ${error.message}`));
};
