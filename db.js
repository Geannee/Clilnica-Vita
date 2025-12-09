const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',    
    user: 'root',         
    password: 'Lu181922', 
    database: 'clinica_chatbot',
});

async function query(sql, params) {
    const [rows] = await pool.promise().query(sql, params);
    return rows;
}

module.exports = {
    pool, query
};