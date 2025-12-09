const db = require('../db');

module.exports = {
    listar: async () => {
        return db.query('SELECT * FROM avaliacoes ORDER BY criado_em DESC');
    },
    
    criar: async (nome, email, telefone, avaliacao, estrelas) => {
        const sql = 'INSERT INTO avaliacoes (nome, email, telefone, avaliacao, estrelas) VALUES (?, ?, ?, ?, ?)';
        return db.query(sql, [nome, email, telefone, avaliacao, estrelas]);
    }
};
