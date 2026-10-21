
/* ==========================================
   1. VARIÁVEIS GLOBAIS
   ========================================== */

// Cria um array vazio para armazenar produtos e serviços.
var itens = [];

// Localiza o campo de valor total no HTML pelo seu ID.
// A variável guarda uma referência a esse elemento.
var campoTotal = document.getElementById("total");


/* ==========================================
   2. FUNÇÃO PARA FORMATAR VALORES EM REAIS
   ========================================== */

// Recebe um número e retorna seu valor formatado em reais.
function moeda(valor) {

    // Converte o número para o formato monetário brasileiro.
    return valor.toLocaleString("pt-BR", {

        // Define que o resultado será um valor monetário.
        style: "currency",

        // Define o real brasileiro como moeda utilizada.
        currency: "BRL"
    });
}


/* ==========================================
   3. FUNÇÃO PARA CALCULAR O DESCONTO
   ========================================== */

// Calcula o desconto conforme o valor total da compra.
function calcular() {

    // Lê o valor digitado no campo total.
    // Number() converte o texto recebido para número.
    var total = Number(campoTotal.value);

    // Armazena o valor final após aplicar o desconto.
    var tDesconto = 0;

    // Armazena o valor em reais que será descontado.
    var desconto = 0;

    // Armazena a porcentagem de desconto aplicada.
    var percentual = 0;


    /* PRIMEIRA CONDIÇÃO: COMPRA ABAIXO DE R$ 100 */

    // Verifica se o valor total é menor que 100 reais.
    if (total < 100) {

        // Não aplica desconto.
        // O valor final permanece igual ao valor original.
        tDesconto = total;
    }


    /* SEGUNDA CONDIÇÃO: COMPRA DE R$ 100 ATÉ R$ 1.996 */

    // Verifica se o valor está entre 100 e 1996 reais.
    else if (total >= 100 && total <= 1996) {

        // Calcula 5% do valor total.
        // 0.05 representa 5 dividido por 100.
        desconto = total * 0.05;

        // Subtrai o desconto do valor original.
        tDesconto = total - desconto;

        // Registra a porcentagem aplicada.
        percentual = 5;
    }


    /* TERCEIRA CONDIÇÃO: COMPRA ACIMA DE R$ 1.996 */

    // Executado quando as condições anteriores são falsas.
    else {

        // Calcula 10% do valor total.
        // 0.10 representa 10 dividido por 100.
        desconto = total * 0.10;

        // Calcula o valor final após o desconto.
        tDesconto = total - desconto;

        // Registra a porcentagem aplicada.
        percentual = 10;
    }


    /* ATUALIZAÇÃO DOS RESULTADOS NO HTML */

    // Localiza o campo percentual e altera seu valor.
    document.getElementById("percentual").value =
        percentual + "%";

    // Exibe o desconto formatado em reais.
    // textContent altera o conteúdo textual do elemento.
    document.getElementById("desconto").textContent =
        moeda(desconto);

    // Exibe o valor final da compra após o desconto.
    document.getElementById("totalFinal").textContent =
        moeda(tDesconto);

    // Essas alterações acontecem sem recarregar a página.
}


/* ==========================================
   4. FUNÇÃO PARA ATUALIZAR A LISTA DE ITENS
   ========================================== */

// Exibe os itens cadastrados e calcula o valor da compra.
function atualizarItens() {

    // Localiza a lista de produtos existente no HTML.
    var lista = document.getElementById("listaItens");

    // Cria uma variável para acumular o valor dos produtos.
    var total = 0;

    // Remove os elementos anteriores da lista.
    // A lista será construída novamente com os itens atuais.
    lista.innerHTML = "";


    /* PERCORRE TODOS OS PRODUTOS CADASTRADOS */

    // O laço for percorre os elementos do array itens.
    // i começa em zero e aumenta uma unidade por repetição.
    for (let i = 0; i < itens.length; i++) {

        // Obtém o produto correspondente à posição atual.
        var item = itens[i];

        // Multiplica a quantidade pelo preço unitário.
        // Soma o resultado ao valor total da compra.
        total = total + item.quantidade * item.preco;


        /* CRIAÇÃO DOS ELEMENTOS HTML */

        // Cria um elemento <li> para representar o produto.
        var linha = document.createElement("li");

        // Cria um elemento <span> para mostrar as informações.
        var texto = document.createElement("span");

        // Cria um botão para permitir remover o produto.
        var botao = document.createElement("button");


        /* DEFINE O TEXTO EXIBIDO PARA CADA PRODUTO */

        // Exibe nome, quantidade e subtotal do produto.
        // O operador + também concatena textos.
        texto.textContent =
            item.nome + " (" + item.quantidade + "x) - " +
            moeda(item.quantidade * item.preco);


        /* CONFIGURAÇÃO DO BOTÃO REMOVER */

        // Define o texto que aparece no botão.
        botao.textContent = "Remover";

        // Define que o botão não enviará um formulário.
        botao.type = "button";


        /* EVENTO DE CLIQUE NO BOTÃO REMOVER */

        // A função será executada quando o botão for clicado.
        botao.onclick = function() {

            // Remove um elemento do array itens.
            // i indica a posição do produto.
            // 1 indica a quantidade de elementos removidos.
            itens.splice(i, 1);

            // Atualiza a lista e recalcula o orçamento.
            atualizarItens();
        };


        /* INSERE OS ELEMENTOS NA PÁGINA */

        // Coloca o texto dentro do elemento li.
        linha.appendChild(texto);

        // Coloca o botão Remover dentro do mesmo li.
        linha.appendChild(botao);

        // Adiciona o elemento li à lista exibida na página.
        lista.appendChild(linha);
    }


    /* ATUALIZAÇÃO DO VALOR TOTAL */

    // Apresenta o total com duas casas decimais.
    // toFixed(2) retorna uma representação em texto.
    campoTotal.value = total.toFixed(2);

    // Executa novamente o cálculo de desconto.
    calcular();
}


/* ==========================================
   5. CADASTRO DE UM NOVO PRODUTO OU SERVIÇO
   ========================================== */

// Localiza o formulário de cadastro pelo seu ID.
// onsubmit define a função executada no envio.
document.getElementById("formItem").onsubmit =
    function(evento) {

    // Impede que o formulário recarregue a página.
    evento.preventDefault();


    /* OBTÉM OS DADOS PREENCHIDOS */

    // Lê o nome do produto ou serviço.
    var nome =
        document.getElementById("nomeItem").value;

    // Lê a quantidade e converte seu valor para número.
    var quantidade =
        Number(document.getElementById("quantidade").value);

    // Lê o preço unitário e converte para número.
    var preco =
        Number(document.getElementById("preco").value);


    /* ADICIONA O PRODUTO AO ARRAY */

    // push() insere um novo elemento no final do array.
    // Cada item é um objeto com nome, quantidade e preço.
    itens.push({
        nome: nome,
        quantidade: quantidade,
        preco: preco
    });


    /* ATUALIZA A INTERFACE */

    // Atualiza a lista de produtos e o valor total.
    atualizarItens();

    // Limpa o formulário após cadastrar o produto.
    // Os campos retornam aos valores iniciais do HTML.
    this.reset();
};


/* ==========================================
   6. CÁLCULO MANUAL DO DESCONTO
   ========================================== */

// Localiza o formulário responsável pelo resumo da compra.
document.getElementById("formCompra").onsubmit =
    function(evento) {

    // Impede o recarregamento da página.
    evento.preventDefault();

    // Calcula o desconto com base no valor informado.
    calcular();
};


/* ==========================================
   7. ALTERAÇÃO MANUAL DO VALOR TOTAL
   ========================================== */

// Define a ação quando o usuário modifica o campo total.
campoTotal.oninput = function() {

    // Esvazia o array de produtos cadastrados.
    itens = [];

    // Remove visualmente todos os produtos da lista.
    document.getElementById("listaItens").innerHTML = "";

    // O resultado do desconto será atualizado
    // quando o formulário de compra for enviado.
};


/* ==========================================
   8. INICIALIZAÇÃO DO SISTEMA
   ========================================== */

// Executa a função calcular() ao carregar a aplicação.
// Assim, os resultados começam com os valores iniciais.
calcular();
