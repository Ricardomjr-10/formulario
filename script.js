const formClientes = document.getElementById('cadastro-cliente');
const formProdutos = document.getElementById('cadastro-produto');

function showForm(formId) {
    if (formId === 'cadastro-cliente') {
        formProdutos.style.display = 'none';
        formClientes.style.display = 'flex';
    } else if (formId === 'cadastro-produto') {
        formProdutos.style.display = 'flex';
        formClientes.style.display = 'none';
    }
}

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('banco.db');

db.serialize(function() {
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

    db.close();
});

function saveData(event, formId) {
    event.preventDefault(); // Prevents the default form submission behavior

    const db = new sqlite3.Database('banco.db');
    
    if (formId === 'cadastro-cliente') {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        db.run(`
            INSERT INTO clientes (nome, email, telefone, endereco)
            VALUES (?, ?, ?, ?)
        `, [name, email, phone, address], function(err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Client with ID ${this.lastID} added`);
            }
        });
    } else if (formId === 'cadastro-produto') {
        const productName = document.getElementById('product_name').value;
        const productDescription = document.getElementById('product_description').value;
        const productPrice = parseFloat(document.getElementById('product_price').value);
        const productQuantity = parseInt(document.getElementById('product_quantity').value);

        db.run(`
            INSERT INTO produtos (nome, descricao, preco, quantidade)
            VALUES (?, ?, ?, ?)
        `, [productName, productDescription, productPrice, productQuantity], function(err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Product with ID ${this.lastID} added`);
            }
        });
    }

    db.close();
}

document.getElementById('cadastro-cliente').addEventListener('submit', function(event) {
    saveData(event, 'cadastro-cliente');
});

document.getElementById('cadastro-produto').addEventListener('submit', function(event) {
    saveData(event, 'cadastro-produto');
});

const clientesDiv = document.createElement('div');
clientesDiv.id = 'clientes-list';
document.body.appendChild(clientesDiv);

function mostrarClientes() {
    const db = new sqlite3.Database('banco.db');
    db.all("SELECT * FROM clientes", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }
        clientesDiv.innerHTML = '<h2>Clientes Cadastrados</h2>';
        rows.forEach(row => {
            clientesDiv.innerHTML += `<p>Nome: ${row.nome}, Email: ${row.email}, Telefone: ${row.telefone}, Endereço: ${row.endereco}</p>`;
        });
    });
    db.close();
}

mostrarClientes();
