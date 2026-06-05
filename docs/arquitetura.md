# Sistema de Controle de Assistência Técnica - Backend

Este projeto implementa o backend para um sistema de controle de assistência técnica de celulares, conforme os requisitos da disciplina de Web 2. Ele gerencia o fluxo completo desde a entrada do aparelho até a entrega ao cliente, incluindo autenticação, controle de acesso por dias úteis, log de requisições e geração de relatórios em PDF.

## 1. Arquitetura do Projeto

### 1.1. Visão Geral

O projeto segue uma arquitetura em camadas, separando as responsabilidades em:

**Camada de Apresentação (Rotas):** Responsável por receber as requisições HTTP, validar os dados de entrada e chamar os serviços correspondentes. Utiliza o Express.js para definir as rotas.

**Camada de Serviço:** Contém a lógica de negócio da aplicação. Orquestra as operações, aplica as regras de negócio e interage com a camada de acesso a dados.

**Camada de Acesso a Dados (Repositório):** Abstrai a comunicação com o banco de dados. Neste projeto, como os dados são mockados, essa camada manipula arrays de dados em memória.

### 1.2. Padrões de Projeto

**Injeção de Dependência:** As dependências (como os serviços) são injetadas nos controladores (rotas) para facilitar os testes e a manutenção.

**Middleware:** Utiliza middlewares no Express.js para tarefas como autenticação, logging e controle de acesso, promovendo a reutilização de código.

**Repository Pattern:** Embora os dados sejam mockados, a criação de uma camada de repositório prepara a aplicação para uma futura integração com um banco de dados real, como o MongoDB, sem impactar a camada de serviço.

### 1.3. Estrutura de Pastas e Arquivos

backend-assistencia/
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── itemController.js
│   │   │   └── logController.js
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   ├── weekdayMiddleware.js
│   │   │   └── logMiddleware.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── itemRoutes.js
│   │   │   └── logRoutes.js
│   │   └── services/
│   │       ├── itemService.js
│   │       ├── pdfService.js
│   │       └── logService.js
│   ├── config/             
│   │   └── index.js
│   ├── data/              
│   │   └── mockData.js
│   ├── models/
│   │   └── itemModel.js
│   └── app.js
├── .gitignore
├── package.json
└── vercel.json

## 2. Configuração do Projeto

# 2.1. Pré-requisitos

Certifique-se de ter o Node.js e o npm (ou pnpm/yarn) instalados em sua máquina.

### 2.2. Instalação

1.  **Clone o repositório:**
    git clone https://github.com/Guilherme-jpg-max/project-web-1.git

2.  **Crie o arquivo `package.json`:**

    Crie um arquivo `package.json` na raiz do projeto (`backend-assistencia/`) com o seguinte conteúdo:

    json
    {
      "name": "backend-assistencia",
      "version": "1.0.0",
      "description": "Backend para o sistema de controle de assistência técnica.",
      "main": "src/app.js",
      "scripts": {
        "start": "node src/app.js",
        "dev": "nodemon src/app.js"
      },
      "keywords": [
        "api",
        "express",
        "nodejs"
      ],
      "author": "Seu Nome",
      "license": "ISC",
      "dependencies": {
        "bcryptjs": "^2.4.3",
        "cors": "^2.8.5",
        "dotenv": "^16.0.3",
        "express": "^4.18.2",
        "jspdf": "^2.5.1",
        "jspdf-autotable": "^3.5.28",
        "jsonwebtoken": "^9.0.0",
        "luxon": "^3.3.0",
        "morgan": "^1.10.0",
        "uuid": "^9.0.0"
      },
      "devDependencies": {
        "nodemon": "^2.0.22"
      }
    }
    ```

3.  **Instale as dependências:**
    npm install
    # ou pnpm install
    # ou yarn install

4.  **Variáveis de Ambiente:**

    Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

    PORT=3000
    JWT_SECRET=suaChaveSecretaMuitoSegura

### 2.3. Como Rodar o Projeto

**Modo de Desenvolvimento (com `nodemon` para recarregar automaticamente):**

    npm run dev

O servidor estará rodando em `http://localhost:3000` (ou na porta definida em `PORT`).

## 3. Endpoints da API

Todos os endpoints abaixo devem ser acessados com o prefixo `/api`. Por exemplo: `http://localhost:3000/api/auth/logar`.

### 3.1. Autenticação

-   **`POST /api/auth/logar`**
    -   **Descrição:** Autentica um usuário e retorna um token JWT.
    -   **Corpo da Requisição:**
        ```json
        {
          "email": "joao@assistencia.com",
          "senha": "123456"
        }
        ```
    -   **Resposta de Sucesso (200 OK):**
        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```
    -   **Observação:** O token retornado deve ser incluído no cabeçalho `Authorization: Bearer <token>` para acessar as rotas protegidas.

### 3.2. Entrada de Aparelhos (CRUD)

-   **`GET /api/entrada-aparelhos`**
    -   **Descrição:** Retorna uma lista de todos os aparelhos em assistência.
    -   **Requer Autenticação:** Sim

-   **`GET /api/entrada-aparelhos/:id`**
    -   **Descrição:** Retorna os detalhes de um aparelho específico pelo ID.
    -   **Requer Autenticação:** Sim

-   **`POST /api/entrada-aparelhos`**
    -   **Descrição:** Insere um novo aparelho na assistência.
    -   **Corpo da Requisição:**
        ```json
        {
          "nome_atendente": "João Silva",
          "nome_cliente": "Novo Cliente",
          "numero_cliente": "11999998888",
          "modelo_aparelho": "Modelo X",
          "marca_aparelho": "Marca Y",
          "descricao_problema": "Problema Z",
          "data_previsao": "2024-03-20T17:00:00Z"
        }
        ```
    -   **Requer Autenticação:** Sim

-   **`PUT /api/entrada-aparelhos/:id`**
    -   **Descrição:** Atualiza os dados de um aparelho existente.
    -   **Corpo da Requisição:** (Campos a serem atualizados)
        ```json
        {
          "status": "em_reparo"
        }
        ```
    -   **Requer Autenticação:** Sim

-   **`DELETE /api/entrada-aparelhos/:id`**
    -   **Descrição:** Exclui um aparelho da assistência.
    -   **Requer Autenticação:** Sim

-   **`GET /api/entrada-aparelhos/search/:codigo`**
    -   **Descrição:** Pesquisa um aparelho pelo campo `codigo`.
    -   **Requer Autenticação:** Sim

-   **`GET /api/entrada-aparelhos/pdf/download`**
    -   **Descrição:** Gera um arquivo PDF para download contendo a lista de todos os aparelhos em assistência.
    -   **Requer Autenticação:** Sim

### 3.3. Orçamentos (CRUD)

-   **`GET /api/orcamentos`**
    -   **Descrição:** Retorna uma lista de todos os orçamentos.
    -   **Requer Autenticação:** Sim

-   **`GET /api/orcamentos/:id`**
    -   **Descrição:** Retorna os detalhes de um orçamento específico pelo ID.
    -   **Requer Autenticação:** Sim

-   **`POST /api/orcamentos`**
    -   **Descrição:** Insere um novo orçamento.
    -   **Corpo da Requisição:**
        ```json
        {
          "fk_id_entrada": "<ID_DO_APARELHO>",
          "nome_atendente": "Maria Souza",
          "descricao_servico": "Troca de tela",
          "valor_orcamento": 350.00,
          "aprovado": false,
          "observacoes": "Peça em falta"
        }
        ```
    -   **Requer Autenticação:** Sim

-   **`PUT /api/orcamentos/:id`**
    -   **Descrição:** Atualiza os dados de um orçamento existente.
    -   **Corpo da Requisição:** (Campos a serem atualizados)
        ```json
        {
          "aprovado": true
        }
        ```
    -   **Requer Autenticação:** Sim

-   **`DELETE /api/orcamentos/:id`**
    -   **Descrição:** Exclui um orçamento.
    -   **Requer Autenticação:** Sim

### 3.4. Logs de Requisições

-   **`GET /api/logs`**
    -   **Descrição:** Retorna todos os logs de requisições realizadas na API.
    -   **Requer Autenticação:** Sim

-   **`GET /api/logs/:date`**
    -   **Descrição:** Retorna os logs de requisições para uma data específica (formato `YYYY-MM-DD`).
    -   **Exemplo:** `/api/logs/2024-03-11`
    -   **Requer Autenticação:** Sim

## 4. Middlewares Implementados

-   **`authMiddleware`:**
    -   **Localização:** `src/api/middlewares/authMiddleware.js`
    -   **Função:** Verifica a presença e validade de um token JWT no cabeçalho `Authorization`. Protege as rotas que exigem autenticação.

-   **`weekdayMiddleware`:**
    -   **Localização:** `src/api/middlewares/weekdayMiddleware.js`
    -   **Função:** Permite o acesso à API apenas de segunda a sexta-feira. Retorna um erro `403 Forbidden` em sábados e domingos.

-   **`logMiddleware`:**
    -   **Localização:** `src/api/middlewares/logMiddleware.js`
    -   **Função:** Registra o horário, rota, método, IP e user-agent de cada requisição em um array de logs em memória.

## 5. Dados Mockados

Os dados do sistema (atendentes, aparelhos, orçamentos e logs) são armazenados em memória no arquivo `src/data/mockData.js`. Isso simula um banco de dados para fins de desenvolvimento e teste, sem a necessidade de configurar um MongoDB real neste momento.

-   **Atendentes:** Contém usuários pré-definidos com senhas hashadas (`123456` para todos).
-   **Entrada Aparelhos:** Lista de aparelhos em assistência com diferentes status.
-   **Orçamentos:** Orçamentos vinculados aos aparelhos.
-   **Logs:** Array vazio que será preenchido pelos logs das requisições.

## 6. Deploy na Vercel

O projeto está configurado para deploy na Vercel utilizando o arquivo `vercel.json` na raiz do projeto.

1.  **Instale a Vercel CLI:**

    ```bash
    npm install -g vercel
    ```

2.  **Faça login na Vercel:**

    ```bash
    vercel login
    ```

3.  **Faça o deploy do projeto:**

    ```bash
    vercel
    ```

    Siga as instruções no terminal para configurar seu projeto. A Vercel detectará automaticamente que é um projeto Node.js e usará o `vercel.json` para o build e as rotas.

