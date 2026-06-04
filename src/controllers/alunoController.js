const Aluno = require('../models/alunoModel');  

const alunoController = {

    listar: (req, res) => {

        Aluno.listarTodos((erro, resultados) => {

            if(erro){

                return res.status(500).json({

                    erro: 'Erro ao listar alunos'
                });
            }

                    res.status(200).json(resultados);

        } );
    
    },

    buscarPorId: (req, res) => {

        const id = req.params.id;

        Aluno.buscarPorId(id, (erro, resultados) => {
            
            if(erro){

                return res.status(500).json({

                    erro: 'Erro ao buscar aluno'

                });

            }

            if(resultados.length === 0){

                return res.status(404).json({
                    
                    erro: 'Aluno não encontrado'

                });

            }

            res.status(200).json(resultados[0]);


        });
    },

    criar: (req, res) => {

        const dados = req.body;

        if(!dados.nome || !dados.email || !dados.data_nascimento){
            return res.status(400).json({
                erro: 'Todos os campos são obrigatórios'
            });
        }

        
        Aluno.criar(dados,(erro, resultado) => {

            if(erro){

                return res.status(500).json({

                    erro: 'Erro ao cadastrar aluno'
                });
            }

            res.status(201).json({

                mensagem: 'Aluno cadastrado com sucesso',
                id: resultado.insertId
            });


        });


    },

    atualizar: (req, res) => {

        const id = req.params.id;

        const dados = req.body;

        Aluno.atualizar(id, dados, (erro, resultado) => {

            if(erro){
                return res.status(500).json({

                    erro: 'Erro ao atualizar aluno'
                });
            }

            if(resultado.affecteRows === 0) {

                return res.status(404).json({
                    erro: 'Aluno não encontrado'
                })
            }

            res.status(200).json({

                mensagem: 'Aluno atualizado com sucesso'
            });

        });

    },

    deletar: (req,res) => {

        const id = req.params.id
        
        Aluno.deletar(id,(erro,resultado) => {
            if(erro){
                return res.status(500).json({
                    erro: 'Erro ao deletar aluno'
                });
            }

            if(resultado.affecteRows === 0){
                return res.status(404).json({
                    erro: 'Aluno não encontrado'
                });
            }

            res.status(200).json({
                mensagem: 'Aluno deletado com sucesso'
            });


        });
    }



};

module.exports = alunoController;

