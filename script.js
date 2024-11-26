const formClientes = document.getElementById('cadastro-cliente');
const formProdutos = document.getElementById('cadastro-produto');
const lista = document.getElementById('lista-clientes');
const mostrarClientesBtn = document.getElementById('mostrar-clientes');


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
    

function showForm(formId) {
    if (formId === 'cadastro-cliente') {
        formProdutos.style.display = 'none';
        formClientes.style.display = 'flex';
    } else if (formId === 'cadastro-produto') {
        formProdutos.style.display = 'flex'
        formClientes.style.display = 'none';
    }
}

// criar funcao do submit clientes

formClientes.addEventListener('submit', (event) => {
    event.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value
    const address = document.getElementById('address').value

    // inserir dados no banco de dados

    db.run(`
        INSERT INTO clientes (name, email, phone, address)
         VALUES ('${name}', '${email}', ${phone}, '${address})
        `)

        // limpar formulario

        formClientes.reset()

        alert('Cliente cadastrado com sucesso!')

})

// criar funcao do submit produtos

formProdutos.addEventListener('submit', (event) => {
    event.preventDefault()

    const product_name = document.getElementById('product_name').value
    const product_description = document.getElementById('product_description').value
    const product_price = document.getElementById('product_price').value
    const product_quantity = document.getElementById('product_quantity').value

    // inserir dados no banco de dados

    db.run(`
        INSERT INTO produtos (product_name, product_description, product_price, product_quantity)
         VALUES ('${product_name}', '${product_description}', ${product_price}, ${product_quantity})
        `)

        // limpar formulario

        formProdutos.reset()

        alert('Produto cadastrado com sucesso!')
        
})

// mostrar clientes cadastrados

 mostrarClientesBtn.addEventListener('click', ()  => {
    db.all('SELECT * FROM clientes', (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            rows.forEach((row) => {
                lista.innerHTML = ''
                const li = document.createElement('li')
                li.textContent = `${row.name} - ${row.email} - ${row.phone} - ${row.address}`
                lista.appendChild(li)
            })
        }
    })
})


    // // inserir dados 

    // db.run(` 
    //     INSERT INTO clientes (name, email, phone, address)
    //      VALUES ('Joaquim', '7mE0w@example.com', '123456789', 'Rua A, 123')
    //     `)

        //consultar dados

        // db.all('SELECT * FROM clientes', (err, rows) => {
        //     if (err) {
        //         console.log(err)
        //     } else {
        //         console.log(rows)
        //     }
        // })

        // fechar conexao

        db.close()

        //instalando express

        //npm install express   
    // importando express

    // const express = require('express')
    // const app = express()

    // //criando rotas 

    // app.get('/clientes', (req, res) => {
    //     db.all('SELECT * FROM clientes', (err, rows) => {
    //         if (err) {
    //             res.status(500).send(err)
    //         } else {
    //             res.json(rows)
    //         }
    //     })
    // })
    // // iniciando servidor na porta 3000s

    // app.listen(3000, () => {
    //     console.log('Servidor rodando na porta 3000')
    // })