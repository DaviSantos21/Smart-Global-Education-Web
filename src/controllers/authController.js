const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/userModel');

const authController = {

    login: (req, res) => {

        const {email, senha} = req.body;

        if(!email || !senha) {
            return res.status(400).json({erro: 'Email e senha são obrigatórios'});
        }

        user.buscarPorEmail(email, async (erro, resultados) => {

            if(erro){
                return res.status(500).json({erro: 'Erro interno'});
            }

            if(resultados.length === 0) {
                return res.status(401).json({erro: 'Credenciais inválidas'});
            }
            
            const user = resultados[0];

            const senhaCorreta = await bcrypt.compare(senha, user.senha);

            if(!senhaCorreta){
                return res.status(401).json({erro: 'Credenciais inválidas'})
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                    acesso: user.acesso
                },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            res.status(200).json({
                token,
                user: {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                    acesso: user.acesso
                }
            });

            
        });
    }
};

module.exports = authController;