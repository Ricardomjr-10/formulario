// const formClientes = document.getElementById('cadastro-cliente');
// const formProdutos = document.getElementById('cadastro-produto');

// function showForm(formId) {
//     if (formId === 'cadastro-cliente') {
//         formProdutos.style.display = 'none';
//         formClientes.style.display = 'flex';
//     } else if (formId === 'cadastro-produto') {
//         formProdutos.style.display = 'flex'
//         formClientes.style.display = 'none';
//     }
// }


// criar conexao com banco de dados 

const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('clientes.db')

// criar tabela

db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT,
        address TEXT
    )`)

    // inserir dados 

    db.run(` 
        INSERT INTO clientes (name, email, phone, address)
         VALUES ('Joaquim', '7mE0w@example.com', '123456789', 'Rua A, 123')
        `)

        //consultar dados

        db.all('SELECT * FROM clientes', (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                console.log(rows)
            }
        })

        // fechar conexao

        db.close()

        //instalando express

        //npm install express   
    // importando express

    const express = require('express')

    const app = express()