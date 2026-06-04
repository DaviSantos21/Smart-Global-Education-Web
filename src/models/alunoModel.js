const conexao = require('../config/db');

const Aluno = {

     listarTodos: (callback) => {

        const sql = 'SELECT * FROM alunos'; 

        conexao.query(sql, callback);

        
    },
    
    
    buscarPorId: (id, callback) => {
        
        const sql = 'SELECT * FROM alunos WHERE id = ?';

        conexao.query(sql, [id], callback);

    },

    criar: (dados, callback) => {

        const sql = 'INSERT INTO alunos (nome, email, data_nascimento) VALUES (?, ?, ?) ';

        conexao.query(sql, [dados.nome, dados.email, dados.data_nascimento], callback);
    
    },

    atualizar: (id, dados, callback) => {
        
        const sql = 'UPDATE alunos SET nome = ?, email = ?, data_nascimento = ? WHERE id = ?';

        conexao.query(sql, [dados.nome, dados.email, dados.data_nascimento, id], callback) ;   
    },

    deletar: (id, callback) => {
        
        const sql = 'DELETE FROM alunos WHERE id = ?';

        conexao.query(sql, [id], callback);
    }   




};

module.exports = Aluno;