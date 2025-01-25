const User = require('../models/User');

exports.login = (req, res) => {
    const { email, senha } = req.body;
    res.status(200).send('Login bem-sucedido!');
};

exports.register = (req, res) => {
    const { nome, email, senha } = req.body;
    const novoUsuario = new User({ nome, email, senha });
    novoUsuario.save((err) => {
        if (err) {
            res.status(400).send('Erro ao registrar usuário');
        } else {
            res.status(200).send('Registro bem-sucedido!');
        }
    });
};
