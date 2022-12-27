const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("item")) || []

// ----------------- Carregando itens guardados no array do localStorage -----------------
itens.forEach((elemento) => {
    criaElemento(elemento)
})

// ----------------- Botão de "Adicionar" -----------------
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(arrayItens => arrayItens.nome === nome.value)
    // arrayItens: elemento já dentro do array \\ nome.value: elemento que foi inserido no input 
    // existe: true ou false (se é valor da array ou do input)

    const itemAtual = {
        // dados do item que acabou de ser enviado
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    // ----------------- Criação do elemento caso ele já exista, ou de um novo elemento -----------------
    if (existe) {
        // caso exista
        itemAtual.id = existe.id //  recebendo o própio ID

        atualizaElemento(itemAtual)

        itens[itens.findIndex(item => item.id === existe.id)] = itemAtual
        // buscando pelo index o ID para atualizar o array com o novo valor do item
    } else {
        // caso não exista
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0 // definicao de ID
        // se esse index for negativo ? true: esse index +1 : false: esse index vira o index 0

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    // ----------------- Adicionando array atualizada no localStorage-----------------
    localStorage.setItem("item", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
    // limpando input
})


// ----------------- Criando elemento CSS -----------------
function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    if (item.quantidade === ""){
        numeroItem.innerHTML = "01"
    }else if(item.quantidade < 10){
        numeroItem.innerHTML = 0 + item.quantidade
    }else{
        numeroItem.innerHTML = item.quantidade
    }

    // numeroItem.innerHTML = item.quantidade ? item.quantidade : 1
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome[0].toUpperCase() + item.nome.substring(1)

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

// ----------------- Atualizando valor de item já existente -----------------
function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
    // (dataset de id do item) = quantidade atual
}

// ----------------- Criando botão CSS -----------------
function botaoDeleta(id) {
    const botao = document.createElement('button')
    botao.classList.add('btn-deleta')
    botao.innerHTML = 'X'

    botao.addEventListener('click', function () {
        deletaElemento(this.parentNode, id) // parentNode: pai do elemento onde a função é chamada \\ pai do botão: li
    })

    return botao
}

// ----------------- Deletando elemento -----------------
function deletaElemento(tag, id) { // tag: li \\ tag: elemento a ser deletado, id: id do item a ser deletado
    tag.remove() // removendo li da lista

    itens.splice(itens.findIndex(tag => tag.id === id), 1) // removendo item do array
    // buscando item pelo id e removendo

    localStorage.setItem("item", JSON.stringify(itens))
}