const Cliente = require('../models/Cliente');

exports.adicionarCliente = (req, res) => {
    const { nome, contato, endereco } = req.body;
    const novoCliente = new Cliente({ nome, contato, endereco });

    novoCliente.save((err) => {
        if (err) {
            res.status(400).send('Erro ao adicionar cliente');
        } else {
            res.status(200).send('Cliente adicionado com sucesso');
        }
    });
};

exports.listarClientes = (req, res) => {
    Cliente.find({}, (err, clientes) => {
        if (err) {
            res.status(400).send('Erro ao buscar clientes');
        } else {
            res.status(200).json(clientes);
        }
    });
};

exports.buscarCliente = (req, res) => {
    const { id } = req.params;
    Cliente.findById(id, (err, cliente) => {
        if (err || !cliente) {
            res.status(400).send('Cliente não encontrado');
        } else {
            res.status(200).json(cliente);
        }
    });
};
