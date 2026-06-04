const conexao = require('../config/db');

const Turma = {

    listarTodos: (callback) => {

        const sql = 'SELECT * FROM turmas';

        conexao.query(sql, callback);
    },

    buscarPorId: (id, callback) => {

        const sql = 'SELECT * FROM turmas WHERE id = ?'

        conexao.query(sql,[id],callback);
    },

    criar: (dados, callback) => {

        const sql = 'INSERT INTO turmas(nome, turno, ano) VALUES( ?, ?, ?)';

        conexao.query(sql, [dados.nome, dados.turno, dados.ano], callback);
    },

    atualizar: (id, dados, callback) => {

        const sql = 'UPDATE turmas SET nome = ?, turno = ?, ano = ? WHERE id = ?';

        conexao.query(sql, [dados.nome, dados.turno, dados.ano, id], callback);

    },

    deletar: (id, callback) => {

        const sql = 'DELETE FROM turmas WHERE id = ?';

        conexao.query(sql, [id], callback);
    }

    
};

module.exports = Turma;