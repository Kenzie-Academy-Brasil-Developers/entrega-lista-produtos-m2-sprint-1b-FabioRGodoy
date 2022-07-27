const ul = document.querySelector('ul')
const todos = document.querySelector('#todos')
const hortifruti = document.querySelector('#hortifruti')
const panificadora = document.querySelector('#panificadora')
const laticinios = document.querySelector('#laticinios')
const input = document.querySelector('.campoBuscaPorNome')
const btnBusca = document.querySelector('.estiloGeralBotoes--botaoBuscaPorNome')
const spanTotal = document.querySelector('.total')

todos.addEventListener("click", filtroTodos)
hortifruti.addEventListener("click", filtroHortiFruti)
panificadora.addEventListener("click", filtroPanificadora)
laticinios.addEventListener("click", filtroLaticinios)

function listarProdutos(arr){
    ul.innerHTML = ""

    for(let i = 0; i < arr.length; i++){
        let produto = arr[i]
        let cardProduto = criarCardProduto(produto)

        ul.appendChild(cardProduto)
    }
}
listarProdutos(produtos)

function criarCardProduto(produto){
    let nome    = produto.nome
    let secao   = produto.secao
    let preco   = produto.preco
    let imagem  = produto.img

    let li              = document.createElement('li')
    let img             = document.createElement('img')
    let h3Titulo        = document.createElement('h3')
    let spanCategoria   = document.createElement('span')
    let pPreco          = document.createElement('p')

    img.src                 = imagem
    h3Titulo.innerText      = nome
    spanCategoria.innerText = secao
    pPreco.innerText        = `R$ ${preco},00`

    li.append(img, h3Titulo, spanCategoria, pPreco)

    return li
}

btnBusca.addEventListener("click", function(){

    let pesquisaUsuario = input.value.toLowerCase().trim()
    let resultadoBusca  = busca(pesquisaUsuario)
    
    listarProdutos(resultadoBusca)
    
})
    
function busca(valorPesquisa){
        let resultBusca = [] 
         
    
        for(let i = 0; i < produtos.length; i++){
        let nomeProduto = produtos[i].nome.toLowerCase().trim()
        let categoria = produtos[i].categoria.toLowerCase().trim()
    
            if(nomeProduto.includes(valorPesquisa) || categoria.includes(valorPesquisa) ){
                input.value = ""
                resultBusca.push(produtos[i])
                
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
    calculaTotal(result)
}

function filtroTodos(){
    listarProdutos(produtos)
    calculaTotal(produtos)
}

function filtroHortiFruti(){
    filtro(produtos, "Hortifruti")
}

function filtroPanificadora(){
    filtro(produtos, "Panificadora")
}

function filtroLaticinios(){
    filtro(produtos, "Laticínio")
}

function calculaTotal(arr){
    const soma = arr.reduce((prev, curr)=>{
        return prev + curr.preco
    }, 0)
    console.log(soma)

    spanTotal.innerText = `R$ ${soma},00`
}
calculaTotal(produtos)