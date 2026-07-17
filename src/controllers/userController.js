const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const userController = {

    listar: (req, res) => {

        User.listar((erro, resultados) => {

            if(erro){
               return res.status(500).json({
                erro: 'Erro ao listar usuários'
               });
            }

            res.status(200).json(resultados);
        });
    },

    criar: async (req, res) => {
        

        const {nome, email, senha, acesso} = req.body;

        if(!nome || !email || !senha || !acesso){
            return res.status(400).json({erro: 'Todos todos os campos são obrigátorios.'});
        }
        
        try{
            const hash = await bcrypt.hash(senha, 10);

            const dados = {nome, email, senha: hash, acesso};

            User.criar(dados, (erro, resultado) => {


                if(erro){

                    if(erro.errno === 1062){
                        return res.status(400).json({erro: 'E-mail já cadastrado.'});
                    }
                    return res.status(500).json({erro: 'Erro ao cadastrar usuário'});
                }
                
                res.status(201).json({
                    mensagem: 'Usuário cadastrado com sucesso',
                    id: resultado.insertId
                });
            });
        }catch(erro){
            return res.status(500).json({erro: 'Erro interno'});
        }


    },

    atualizar: (req, res) => {

        const id = req.params.id;

        const dados = req.body;

        if(!dados.nome || !dados.email || !dados.acesso){
            return res.status(400).json({erro: 'Preencha todos os campos.'});
        }

        

        User.atualizar(id, dados, (erro, resultado) => {
            if(erro){
                return res.status(500).json({erro: 'Erro ao atualizar aluno'});
            }

            if(resultado.affectedRows === 0){
                return res.status(404).json({erro: 'Usuário não encontrado'});
            }

            res.status(200).json({mensagem: 'Usuário atualizado com sucesso'});
        });
    },

    deletar: (req, res) => {

        const id = req.params.id;

        if(parseInt(id) === req.user.id) {
            return res.status(400).json({erro: 'Você não pode deletar seu próprio usuário'});
        }

        User.deletar(id, (erro, resultado) => {

            if(erro){
                return res.status(500).json({erro: 'Erro ao deletar usuário'});
            }

            if(resultado.affectedRows === 0){
                return res.status(404).json({erro: 'Usuário não encontrado'});
            }

            res.status(200).json({mensagem: 'Usuário deletado com sucesso'});
        })
    }
}

module.exports = userController;