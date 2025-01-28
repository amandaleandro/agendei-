const User = require('../models/User'); 

exports.registrar = (req, res) => {
    const { nome, email, senha } = req.body;
    const novoUsuario = new User({ nome, email, senha });

    novoUsuario.save((err) => {
        if (err) {
            res.status(400).send('Erro ao registrar usuário');
        } else {
            res.status(200).send('Usuário registrado com sucesso');
        }
    });
};

exports.login = (req, res) => {
    const { email, senha } = req.body;
    User.findOne({ email, senha }, (err, usuario) => {
        if (err || !usuario) {
            res.status(400).send('Credenciais inválidas');
        } else {
            res.status(200).json(usuario);
        }
    });
};

