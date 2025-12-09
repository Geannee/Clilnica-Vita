const db = require('../db');

module.exports = {
    listar: async () => {
        return db.query('SELECT * FROM agendamentos ORDER BY id DESC');
    },
    
    criar: async (paciente_id, data_consulta, tratamento, periodo, horario, tipo_consulta, queixa) => {
        const sql = 'INSERT INTO agendamentos (paciente_id, data_consulta, tratamento, periodo, horario, tipo_consulta, queixa) VALUES (?, ?, ?, ?, ?, ?, ?)';
        return db.query(sql, [paciente_id, data_consulta, tratamento, periodo, horario, tipo_consulta, queixa]);
    },

    atualizar: async (id, data_consulta, tratamento, periodo, horario, tipo_consulta, queixa) => {
        const sql = 'UPDATE agendamentos SET data_consulta = ?, tratamento = ?, periodo = ?, horario = ?, tipo_consulta = ?, queixa = ? WHERE id = ?';
        return db.query(sql, [data_consulta, tratamento, periodo, horario, tipo_consulta, queixa, id]);
    },

    atualizarStatus: async (id, status) => {
        const sql = 'UPDATE agendamentos SET status = ? WHERE id = ?';
        return db.query(sql, [status, id]);
    },

    excluir: async (id) => {
        const sql = 'DELETE FROM agendamentos WHERE id = ?';
        return db.query(sql, [id]);
    }
};
