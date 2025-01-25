const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.enviarSms = (numero, mensagem) => {
    client.messages.create({
        body: mensagem,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: numero
    }).then((message) => console.log(`SMS enviado: ${message.sid}`))
      .catch((error) => console.error(`Erro ao enviar SMS: ${error.message}`));
};
