const formClientes = document.getElementById('cadastro-cliente');
const formProdutos = document.getElementById('cadastro-produto');

function showForm(formId) {
    if (formId === 'cadastro-cliente') {
        formProdutos.style.display = 'none';
        formClientes.style.display = 'flex';
    } else if (formId === 'cadastro-produto') {
        formProdutos.style.display = 'flex'
        formClientes.style.display = 'none';
    }
}


const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('loja.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados.');

    db.run(`
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            telefone TEXT,
            endereco TEXT
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            descricao TEXT,
            preco REAL,
            quantidade INTEGER
            );
    `);
});

