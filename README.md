# 🎬Base de dados Animes

Este repositório contém o código-fonte de um visualizador interativo (frontend) para a **Base de dados Animes**, 
uma coleção de dados estruturados em JSON sobre diversas obras da cultura pop japonesa.

O visualizador implementa um sistema de "scroll de página inteira" e uma busca dinâmica, proporcionando uma experiência de 
navegação otimizada para explorar o catálogo.

<img width="1365" height="627" alt="Captura de tela 2025-11-22 005320" src="https://github.com/user-attachments/assets/8e7e5ddd-bacd-4678-b460-7cb382d5c052" />

## ⚙️ Funcionalidades Principais

* **Base de Dados:** Carrega informações do arquivo `data.json`.
* **Visualização Paginada:** Exibe os animes em páginas verticais, com 3 cards por página.
* **Navegação por Scroll:** Transição suave entre as páginas através do scroll (roda do mouse).
* **Busca Dinâmica:** Filtra os resultados em tempo real por **Título**, **Descrição** (Sinopse) e **Tags/Categorias** (Gênero, Estúdio, etc.).

## 💾 Estrutura de Dados (data.json)

O visualizador espera que o arquivo `data.json` siga o *schema* adaptado para animes, garantindo que todos os campos sejam renderizados corretamente:

| Campo | Tipo | Exemplo | Descrição no Frontend |
| :--- | :--- | :--- | :--- |
| `nome` | String | "Jujutsu Kaisen" | Título principal (`<h2>`) |
| `descricao` | String | "Yuji Itadori..." | Sinopse (`<p>`) |
| `data_lancamento` | String | "2020" | Ano de Lançamento (`<p>`) |
| `link_principal` | String | `https://...` | Link "Saiba mais" direciona para pagina onde podera assistir o anime (`<a>`) |
| `imagem_url` | String | `https://.../poster.jpg` | Pôster do anime (`<img>`) |
| `tags_categoria` | Array | `["Shonen", "Mappa", "Sobrenatural"]` | Exibidas como tags (`<span>`) |

## 💻 Arquivos do Projeto

### `index.html` (Estrutura)

Contém a estrutura base do frontend, incluindo o campo de busca e os containers principais:

```html
<main>
    <div class="scroll-wrapper">
        </div>
</main>
<input type="text" class="campoBusca"> 
script.js (Lógica e Interação)
Este é o arquivo que gerencia todo o carregamento e interação dos dados.

carregarDados(): Faz o fetch do data.json e inicializa a renderização.

renderizarCards(dados):

Divide o array de dados em "páginas" (itemsPerPage = 3).

Cria os elementos div.page e article.card e insere os dados.

iniciarBusca():

Ativa um filtro em tempo real no evento input do campo de busca.

Filtra os dados por nome, descrição e tags_categoria.

Lógica de Scroll (main.addEventListener('wheel', ...)):

Controla o estado de isScrolling para evitar saltos.

Usa transform: translateY() para mover o .scroll-wrapper e simular a navegação de página inteira.

style.css (Estilização)
(Assumimos que o CSS está configurado para o layout de página inteira e cards.)

Necessita de estilização para fazer o main ocupar 100vh e o .scroll-wrapper usar transform: translateY() para o efeito de paginação vertical.

🚀 Como Executar Localmente
Clone este repositório.

Certifique-se de que o arquivo data.json esteja presente e formatado corretamente.

Abra o arquivo index.html em seu navegador (recomendado usar uma extensão de "Live Server" ou um servidor local para evitar problemas de CORS com o fetch).
