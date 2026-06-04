const Mensagem = require('../models/mensagemModel');

const mensagemController = {

    listar: (req, res) => {

        Mensagem.listarTodas((erro, resultados) => {

            if (erro) {

                return res.status(500).json({
                    erro: 'Erro ao listar mensagens'
                });

            }

            res.status(200).json(resultados);

        });

    },

    criar: (req, res) => {

        const dados = req.body;

        if (
            !dados.nome ||
            !dados.email ||
            !dados.assunto ||
            !dados.mensagem
        ) {

            return res.status(400).json({
                erro: 'Todos os campos são obrigatórios'
            });

        }

        Mensagem.criar(dados, (erro, resultado) => {

            if (erro) {

                return res.status(500).json({
                    erro: 'Erro ao enviar mensagem'
                });

            }

            res.status(201).json({
                mensagem: 'Mensagem enviada com sucesso',
                id: resultado.insertId
            });

        });

    }

};

module.exports = mensagemController;