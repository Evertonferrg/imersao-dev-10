const campoBusca = document.querySelector('input[type="text"]');
const scrollWrapper = document.querySelector(".scroll-wrapper");
const main = document.querySelector("main");
let dados = [];

let currentPage = 0;
// Mostrar 3 itens por página (layout em grade) — adaptável via CSS
const itemsPerPage = 3;
let totalPages = 0;
let isScrolling = false;

// Função para carregar os dados do JSON assim que a página carregar
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Exibe todos os cards inicialmente
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function iniciarBusca() {
    const termoBuscado = campoBusca.value.toLowerCase();

    if (termoBuscado.trim() === "") {
        renderizarCards(dados); // Se a busca estiver vazia, mostra todos os cards
        return;
    }

    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBuscado) || 
        dado.descricao.toLowerCase().includes(termoBuscado)
    );

    renderizarCards(resultados);
}

function renderizarCards(dados) {
    scrollWrapper.innerHTML = ""; // Limpa as páginas existentes
    totalPages = Math.ceil(dados.length / itemsPerPage);
    currentPage = 0; // Reseta para a primeira página

    for (let i = 0; i < dados.length; i += itemsPerPage) {
        const page = document.createElement("div");
        page.classList.add("page");
        
        const pageData = dados.slice(i, i + itemsPerPage);

        for (let dado of pageData) {
            let article = document.createElement("article");
            article.classList.add("card");
            article.innerHTML = ` 
                <img src="${dado.imagem}" alt="Imagem de ${dado.nome}">
                <div class="card-info">
                    <h2>${dado.nome}</h2>
                    <p><strong>Ano:</strong> ${dado.ano}</p>
                    <p>${dado.descricao}</p>
                    <a href="${dado.link}" target="_blank">Saiba mais</a>
                </div>
            `;
            page.appendChild(article);
        }
        scrollWrapper.appendChild(page);
    }
    goToPage(0); // Garante que a visualização comece na primeira página
}

function goToPage(page) {
    const newY = page * -100;
    scrollWrapper.style.transform = `translateY(${newY}%)`;
}

main.addEventListener('wheel', (event) => {
    if (isScrolling) return;
    isScrolling = true;

    event.preventDefault(); // Previne a rolagem padrão da página

    if (event.deltaY > 0) {
        // Rolou para baixo
        if (currentPage < totalPages - 1) {
            currentPage++;
            goToPage(currentPage);
        }
    }
    else {
        // Rolou para cima
        if (currentPage > 0) {
            currentPage--;
            goToPage(currentPage);
        }
    }

    // Previne múltiplas rolagens rápidas
    setTimeout(() => {
        isScrolling = false;
    }, 800); // Duração da transição do CSS
});


// Chama a função para carregar os dados quando o script for executado
carregarDados();
