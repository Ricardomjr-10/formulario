

const formClientes = document.getElementById('cadastro-cliente');
const formProdutos = document.getElementById('cadastro-produto');
const lista = document.getElementById('lista-clientes');
const mostrarClientesBtn = document.getElementById('mostrar-clientes');


// criar conexao com banco de dados sqlite

const db = new sqlite3.Database('clientes.db');

db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone INTEGER,
        address TEXT
    )
`)

db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name TEXT,
        product_description TEXT,
        product_price REAL,
        product_quantity INTEGER
    )
`)


    

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
            lista.innerHTML = 'Erro ao buscar clientes'
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



