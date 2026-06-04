const Turma = require('../models/turmaModel');

const turmaController = {

    listar: (req, res) => {

        Turma.listarTodos((erro, resultados) => {

            if(erro){

                return res.status(500).json({

                    erro: 'Erro ao listar turmas'
                });
            }

            res.status(200).json(resultados);
        });
    },

    buscarPorId: (req, res) => {

        const id = req.params.id;

        Turma.buscarPorId(id, (erro, resultados) => {

            if(erro) {

                return res.status(500).json({

                    erro: 'Erro ao buscar turma'

                });
                
            }

            if(resultados.length === 0) {

                return res.status(404).json({

                    erro: 'turma não encontrada'

                });
            }

            res.status(200).json(resultados);

        });

    },

    criar: (req, res) => {

        const dados = req.body;

        if(!dados.nome || !dados.turno || !dados.ano){

            return res.status(400).json({
                erro: 'Todos os campos são obrigatórios'
            });
        }

        Turma.criar(dados, (erro, resultados) => {

            if(erro) {

                return res.status(500).json({
                    erro: 'Erro ao cadastrar turma'
                });
            }

            res.status(201).json({

                mensagem: 'turma cadastrada com sucesso',
                id: resultados.insertId
            });

        });
    },

    atualizar: (req, res) => {

        const id = req.params.id;

        const dados = req.body;

        Turma.atualizar(id, dados, (erro, resultados) => {

            if(erro) {

                return res.status(500).json({
                    erro: 'Erro ao atualizar turma'
                });
            }

            if(resultados.affectedRows === 0) {
                return res.status(404).json({
                    erro: 'Turma não encontrada'
                });
            }

            res.status(200).json({
                mensagem: 'Turma atualizada com sucesso'
            });
        })
    },

    deletar: (req, res) => {

        const id = req.params.id;

        Turma.deletar(id, (erro, resultados) => {

            if(erro) {
                return res.status(500).json({
                    erro: 'Erro ao deletar turma'
                });
            }

            if(resultados.affectedRows === 0) {
                return res.status(404).json({
                    erro: 'Turma não encontrada'
                });

            }

            res.status(200).json({
                mensagem: 'Turma deletada com sucesso'
            });
        });
    }
};

module.exports = turmaController;