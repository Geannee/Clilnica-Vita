const db = require ('../db');  //falar com o banco de dados.

module.exports = {
    listar : async () => {
        return db.query('SELECT * FROM pacientes ORDER BY id DESC'); // LISTAR PACIENTES EM ORDEM DECRESCENTE POR ID
    },
    criar: async (nome, email, telefone, nascimento_mes, nascimento_ano) => {
        const sql = 'INSERT INTO pacientes (nome, email, telefone, nascimento_mes, nascimento_ano) VALUES (?, ?, ?, ?, ?)';
        return db.query(sql, [nome, email, telefone, nascimento_mes, nascimento_ano]);
    },
    
    atualizar: async (id, nome, telefone) => {
        const sql = 'UPDATE pacientes SET nome = ?, telefone = ? WHERE id = ?';
        return db.query(sql, [nome, telefone, id]);
    }
};  