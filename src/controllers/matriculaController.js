const Matricula = require('../models/matriculaModel');

const matriculaController = {

    listar: (req, res) => {

        Matricula.listar((erro, resultados) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao listar matrículas'
                });
            }

            res.status(200).json(resultados);
        });
    },

    criar: (req, res) => {

        const dados = req.body;

        Matricula.criar(dados, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao matricular aluno'
                });
            }

            res.status(201).json({
                mensagem: 'Matrícula realizada com sucesso',
                id: resultado.insertId
            });
        });
    }
};

module.exports = matriculaController;