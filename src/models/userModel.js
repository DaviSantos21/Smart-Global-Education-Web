const conexao = require('../config/db');

const User = {

    listar: (callback) => {
        const sql = 'SELECT id, nome, email, acesso, cadastro FROM users';
        conexao.query(sql, callback);
    },

    buscarPorEmail: (email, callback) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        conexao.query(sql, [email], callback);
    },

    criar: (dados, callback) => {
        const sql = `INSERT INTO users (nome, email, senha, acesso)
         VALUES(?, ?, ?, ?) `;

         conexao.query(sql, [dados.nome, dados.email, dados.senha, dados.acesso], callback);
    },

    atualizar: (id, dados, callback) => {
        const sql = `UPDATE users 
        SET nome = ?, email = ? , senha = ?, acesso = ? WHERE id = ? `;

        conexao.query(sql, [dados.nome, dados.email, dados.senha, dados.acesso, id], callback);
    },

    deletar: (id, callback) => {
        const sql = 'DELETE FROM users WHERE id = ?'
        conexao.query(sql, [id], callback);
    }
};

module.exports = User;