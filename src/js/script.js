const ul                = document.querySelector('ul')
const todos             = document.querySelector('#todos')
const hortifruti        = document.querySelector('#hortifruti')
const panificadora      = document.querySelector('#panificadora')
const laticinios        = document.querySelector('#laticinios')
const input             = document.querySelector('.campoBuscaPorNome')
const btnBusca          = document.querySelector('.estiloGeralBotoes--botaoBuscaPorNome')
const spanTotal         = document.querySelector('.total')
const listaCarrinho     = document.querySelector('.listaCarrinho')
const divInfoCarrinho   = document.querySelector('.quantidade-total')

todos.addEventListener("click", filtroTodos)
hortifruti.addEventListener("click", filtroHortiFruti)
panificadora.addEventListener("click", filtroPanificadora)
laticinios.addEventListener("click", filtroLaticinios)
ul.addEventListener("click", interceptandoProduto)
listaCarrinho.addEventListener("click", interceptandoProdutoCarrinho)

let carrinho = []

listarProdutos(data)

function listarProdutos(arr){
    ul.innerHTML = ""

    for(let i = 0; i < arr.length; i++){
        let produto     = arr[i]
        let cardProduto = criarCardProduto(produto)

        ul.appendChild(cardProduto)
    }
}

function criarCardProduto(produto){
    let nome    = produto.nome
    let secao   = produto.secao
    let preco   = produto.preco
    let imagem  = produto.img
    let id      = produto.id

    let li              = document.createElement('li')
    let figure          = document.createElement('figure')
    let img             = document.createElement('img')
    let h3Titulo        = document.createElement('h3')
    let pCategoria      = document.createElement('p')
    let divBotaoPreco   = document.createElement('div')
    let olNutrientes    = document.createElement('ol')
    let container       = document.createElement('div')
    let spanPreco       = document.createElement('span')
    let btnComprar      = document.createElement('button')

    btnComprar.setAttribute('id', id)

    olNutrientes.className = 'ol-nutrientes'
    img.src                 = imagem
    h3Titulo.innerText      = nome
    pCategoria.innerText    = secao
    spanPreco.innerText     = `R$ ${Number(preco).toFixed(2).toString().replace(".", ",")}`
    btnComprar.innerText    = 'comprar'
    
    produto.componentes.forEach((elem)=>{
        let liNutrientes = document.createElement('li')

         liNutrientes.innerText = elem

         olNutrientes.append(liNutrientes)
    })

    divBotaoPreco.append(spanPreco, btnComprar)
    figure.appendChild(img)
    container.append(spanPreco, btnComprar)
    li.append(figure, h3Titulo, pCategoria, olNutrientes, divBotaoPreco, container)

    return li
}

function interceptandoProduto(event){
    let btnComprar = event.target

    if(btnComprar.tagName == "BUTTON"){
        
        let idProdutos  = btnComprar.id
        let produtos    = data.find(function(produtos){
            if(produtos.id == idProdutos){
                return produtos
            }
        })
        adicionarProdutoCarrinho(produtos)
        esconderInfosCarrinho(carrinho)
    }
}

function adicionarProdutoCarrinho(produtos){
    listaCarrinho.innerHTML = ""
    carrinho.push(produtos)
    criarCardCarrinho(carrinho)
}

function criarCardCarrinho(carrinho){
    carrinho.forEach(elemento => {
        let nome            = elemento.nome
        let imgProduto      = elemento.img
        let secao           = elemento.secao
        let preco           = elemento.preco
        let id              = elemento.id
        let srcImgBotao     = "./src/img/trash.png"

        let li              = document.createElement('li')
        let img             = document.createElement('img')
        let divDescricao    = document.createElement('div')
        let h2Titulo        = document.createElement('h2')
        let pSecao          = document.createElement('p')
        let spanPreco       = document.createElement('span')
        let divBotao        = document.createElement('div')
        let btnRemove       = document.createElement('button')
        let imgBotao        = document.createElement('img')
        
        imgBotao.setAttribute("id", id)
        
        li.className = 'item-carrinho'
        img.className = 'img-produto-carrinho'
        divDescricao.className = 'info-produto-carrinho'
        divBotao.className = 'flex-botao'
        btnRemove.className = 'btn-remove'

        img.src = imgProduto
        img.alt = nome
        h2Titulo.innerText = nome
        pSecao.innerText = secao
        spanPreco.innerText = `R$ ${preco}`
        imgBotao.src = srcImgBotao

        li.append(img, divDescricao, divBotao)
        divDescricao.append(h2Titulo, pSecao, spanPreco)
        divBotao.appendChild(btnRemove)
        btnRemove.appendChild(imgBotao)
        listaCarrinho.appendChild(li)

    })
    renderTotal()
}

function interceptandoProdutoCarrinho(event){
    let btnRemove = event.target

    if(btnRemove.tagName == "IMG"){
        let idRemove = btnRemove.id
        let removerItem = carrinho.findIndex(elemento => idRemove == elemento.id)

        carrinho = carrinho.filter((elem, i) => i !== removerItem)
        listaCarrinho.innerHTML = ""
        criarCardCarrinho(carrinho)
    }
}

btnBusca.addEventListener("click", function(){

    let pesquisaUsuario = input.value.toLowerCase().trim()
    let resultadoBusca  = busca(pesquisaUsuario)
    
    listarProdutos(resultadoBusca)
    
})
    
function busca(valorPesquisa){
        let resultBusca = [] 
         
    
        for(let i = 0; i < data.length; i++){
        let nomeProduto = data[i].nome.toLowerCase().trim()
        let categoria   = data[i].categoria.toLowerCase().trim()
        let secao       = data[i].secao.toLowerCase().trim()
    
            if(nomeProduto.includes(valorPesquisa) || categoria.includes(valorPesquisa) || secao.includes(valorPesquisa)){
                input.value = ""
                resultBusca.push(data[i])
                
            }
        }
        return resultBusca
}

function filtro(arr, secao){
    let result = []
    for(let i = 0; i < arr.length; i++){
        if(arr[i].secao == secao){
            result.push(arr[i])
        }
    }
    listarProdutos(result)
}

function filtroTodos(){
    listarProdutos(data)
}

function filtroHortiFruti(){
    filtro(data, "Hortifruti")
}

function filtroPanificadora(){
    filtro(data, "Panificadora")
}

function filtroLaticinios(){
    filtro(data, "Laticinio")
}

function renderTotal (){
    divInfoCarrinho.innerText = ""
    const soma = carrinho.reduce((prev, curr) => prev + Number(curr.preco),0)
    
    let divQuantidade   = document.createElement('div')
    let pQuantidade     = document.createElement('p')
    let spanQuantidade  = document.createElement('span')
    let divTotal        = document.createElement('div')
    let pTotal          = document.createElement('p')
    let spanTotal       = document.createElement('span')

    pQuantidade.innerText       = 'Quantidade'
    spanQuantidade.innerText    = `${carrinho.length}`
    pTotal.innerText            = 'Total'
    spanTotal.innerText         = `R$ ${soma.toFixed(2).toString().replace(".", ",")}`

    divQuantidade.className = 'quantidade'
    divTotal.className      = 'total-carrinho'

    divQuantidade.append(pQuantidade, spanQuantidade)
    divTotal.append(pTotal, spanTotal)
    divInfoCarrinho.append(divQuantidade, divTotal)
    
    esconderInfosCarrinho(carrinho)
}

function esconderInfosCarrinho(arr){
    let esconder = document.querySelector('.quantidade-total')
    if(arr.length == 0){
        esconder.classList.remove('mostrar')
        esconder.classList.add('esconder')        
    }else{
        esconder.classList.remove('esconder')
        esconder.classList.add('mostrar')
    }
}