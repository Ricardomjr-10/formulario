// criando servidor express
const db = require('./database')
const express = require('express')
//const fs = require('fs')
const app = express()
const port = 3000





// criar rota para servir arquivos estaticos
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('clientes'))

//cadastrar clientes
app.post('/submit_client', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const address = req.body.address

    db.run(`
        INSERT INTO clientes (name, email, phone, address)
         VALUES ('${name}', '${email}', ${phone}, '${address}')
        `)
})

//cadastrar produtos
app.post('/submit_product', (req, res) => {
    const product_name = req.body.product_name
    const product_description = req.body.product_description
    const product_price = req.body.product_price
    const product_quantity = req.body.product_quantity

    db.run(`
        INSERT INTO produtos (product_name, product_description, product_price, product_quantity)
         VALUES ('${product_name}', '${product_description}', ${product_price}, ${product_quantity})
        `)
})

//mostrar clientes
app.get('/get_clients', (req, res) => {
    db.all('SELECT * FROM clientes', (err, rows) => {
        if (err) {
            res.status(500).send('Erro ao buscar clientes')
        } else {
            res.json(rows)
        }
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)    
})

