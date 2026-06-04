const conexao = require('../config/db');

const Mensagem = {

    listarTodas: (callback) => {

        const sql = `
            SELECT *
            FROM mensagens
            ORDER BY dataEnvio DESC
        `;

        conexao.query(sql, callback);
    },

    criar: (dados, callback) => {

        const sql = `
            INSERT INTO mensagens
            (nome, email, assunto, mensagem)
            VALUES (?, ?, ?, ?)
        `;

        conexao.query(
            sql,
              [
                dados.nome,
                dados.email,
                dados.assunto,
                dados.mensagem],

            callback
        );
    }

};

module.exports = Mensagem;