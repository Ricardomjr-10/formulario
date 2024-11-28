// criando servidor express

const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000





// criar rota para servir arquivos estaticos

app.use(express.static('clientes'))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)    
})

module.exports = app