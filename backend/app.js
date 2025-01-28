const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsing do corpo das requisições
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importar rotas
const agendamentoRoutes = require('./routes/agendamento');
const disponibilidadeRoutes = require('./routes/disponibilidade');
const authRoutes = require('./routes/auth');
const pagamentosRoutes = require('./routes/pagamentos');
const servicosRoutes = require('./routes/servicos');
const clientesRoutes = require('./routes/clientes'); // Nova rota de clientes

// Usar rotas
app.use('/agendamento', agendamentoRoutes);
app.use('/disponibilidade', disponibilidadeRoutes);
app.use('/auth', authRoutes);
app.use('/pagamentos', pagamentosRoutes);
app.use('/servicos', servicosRoutes);
app.use('/clientes', clientesRoutes); // Nova rota de clientes

// Rota raiz para verificação
app.get('/', (req, res) => {
    res.send('API de Agendamento em Funcionamento');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
