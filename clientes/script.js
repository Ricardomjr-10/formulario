document.addEventListener('DOMContentLoaded', () => {
    
const tela = document.getElementById('tela');
const formClientes = document.getElementById('cadastro-cliente');
const formProdutos = document.getElementById('cadastro-produto');
const lista = document.getElementById('lista-clientes');
const listaProdutos = document.getElementById('lista-produtos');
const mostrarClientesBtn = document.getElementById('mostrar-clientes');
const mostrarProdutosBtn = document.getElementById('mostrar-produtos');
const btnCliente = document.getElementById('btnCliente');
const btnProduto = document.getElementById('btnProduto');


  
btnCliente.addEventListener('click', () => {
    showForm('cadastro-cliente')
})
btnProduto.addEventListener('click', () => {
    showForm('cadastro-produto')
})
const showForm = (formId) => {
    if(tela.style.display === 'none') {
        tela.style.display = 'flex';
       lista.innerHTML = ''
    } 
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
    fetch('/submit_client', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, address })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data received:', data)
        alert('Cliente cadastrado com sucesso!')
        formClientes.reset()
    })
    .catch(error => {
        console.error('Error:', error)
    })

        // limpar formulario



})

// criar funcao do submit produtos

formProdutos.addEventListener('submit', (event) => {
    event.preventDefault()
    const product_name = document.getElementById('product_name').value
    const product_description = document.getElementById('product_description').value
    const product_price = document.getElementById('product_price').value
    const product_quantity = document.getElementById('product_quantity').value

    // inserir dados no banco de dados
    fetch('/submit_product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_name, product_description, product_price, product_quantity })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data received:',data)
        alert('Produto cadastrado com sucesso!')
        formProdutos.reset()
    })
    .catch(error => {
        console.error('Error:', error)
    })


        // limpar formulario



})

// mostrar clientes cadastrados
 mostrarClientesBtn.addEventListener('click', () => {
     tela.style.display = 'none'
     lista.innerHTML = ''
     fetch('/get_clients')
         .then(response => response.json())
         .then(data => {
             data.forEach(client => {
                 const li = document.createElement('li')
                 li.textContent = `${client.name} - ${client.email} - ${client.phone} - ${client.address}`
                 lista.appendChild(li)
             })
         })
 })

 // mostrar produtos cadastrados
 mostrarProdutosBtn.addEventListener('click', () => {
     tela.style.display = 'none'
     listaProdutos.innerHTML = ''
     fetch('/get_products')
         .then(response => response.json())
         .then(data => {
             data.forEach(product => {
                 const li = document.createElement('li')
                 li.textContent = `${product.product_name} - ${product.product_description} - ${product.product_price} - ${product.product_quantity}`
                 listaProdutos.appendChild(li)
             })
         })
 })

})
