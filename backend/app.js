const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Importar rotas
const agendamentoRoutes = require('./routes/agendamento');
const authRoutes = require('./routes/auth');
const disponibilidadeRoutes = require('./routes/disponibilidade');
const pagamentosRoutes = require('./routes/pagamentos');
const servicosRoutes = require('./routes/servicos');

const app = express();

app.use(bodyParser.json());

app.use('/agendamento', agendamentoRoutes);
app.use('/auth', authRoutes);
app.use('/disponibilidade', disponibilidadeRoutes);
app.use('/pagamentos', pagamentosRoutes);
app.use('/servicos', servicosRoutes);

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Conectado ao banco de dados');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
