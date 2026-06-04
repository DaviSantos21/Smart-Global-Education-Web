const conexao = require('../config/db');

const Matricula = {

    criar: (dados, callback) => {

        const sql = `
            INSERT INTO matriculas
            (alunoId, turmaId)
            VALUES (?, ?)
        `;

        conexao.query(
            sql,
            [dados.alunoId, dados.turmaId],
            callback
        );
    },

    listar: (callback) => {

        const sql = `
            SELECT
                m.id,
                a.nome AS aluno,
                t.nome AS turma,
                m.dataMatricula

            FROM matriculas m

            INNER JOIN alunos a
                ON a.id = m.alunoId

            INNER JOIN turmas t
                ON t.id = m.turmaId
        `;

        conexao.query(sql, callback);
    }
};

module.exports = Matricula;