const conexao = require('../config/db');

const user = {

    buscarPorEmail: (email, callback) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        conexao.query(sql, [email], callback);
    }
};

module.exports = user;