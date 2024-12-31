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


    if(btnCliente && btnProduto) {
        
        btnCliente.addEventListener('click', () => {
            showForm('cadastro-cliente')
        })
        btnProduto.addEventListener('click', () => {
            showForm('cadastro-produto')
        })
    }
    const showForm = (formId) => {
        if (tela.style.display === 'none') {
            tela.style.display = 'flex';
            lista.innerHTML = ''
            listaProdutos.innerHTML = ''
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
    if(formClientes) {
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
}

    // criar funcao do submit produtos
    if(formProdutos) {
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
                console.log('Data received:', data)
                alert('Produto cadastrado com sucesso!')
                formProdutos.reset()
            })
            .catch(error => {
                console.error('Error:', error)
            })
        // limpar formulario
    })
}

    // mostrar clientes cadastrados
    if(mostrarClientesBtn) {
    mostrarClientesBtn.addEventListener('click', () => {
        tela.style.display = 'none'
        lista.innerHTML = ''
        listaProdutos.innerHTML = ''
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
}

    // mostrar produtos cadastrados
    if(mostrarProdutosBtn) {
    mostrarProdutosBtn.addEventListener('click', () => {
        tela.style.display = 'none'
        listaProdutos.innerHTML = ''
        lista.innerHTML = ''
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
    }
})

//falta fazer
//limpar formulario
//se o protudo ou cliente ja estiverem cadastrados nao deixar cadastrar
//fazer a parte de editar e deletar produtos e clientes
//fazer um botao de vendas para cadastrar vendas em que selecionar o produto e o cliente e a quantidade e o valor da venda e dar saida de estoque
//mostar os produtos e clientes cadastrados em uma tabela
//criar o layout para smartphone
//criar o layout para tablet
//criar tela de login para cadastro de usuarios e permitir acesso aos cadastros de produtos e clientes somente para usuarios logados

