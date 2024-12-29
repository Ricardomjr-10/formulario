const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('clientes.db');

db.serialize(() => {
db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone INTEGER,
        address TEXT
    )`, (err) => {
        if (err) {
            return console.error("Erro ao criar tabela usuarios:", err.message);
        }
    })


db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name TEXT,
        product_description TEXT,
        product_price REAL,
        product_quantity INTEGER
    )`, (err) => {
        if (err) {
            return console.error("Erro ao criar tabela usuarios:", err.message);
        }
    });

});

module.exports = db

