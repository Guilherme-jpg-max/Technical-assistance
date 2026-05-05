API REST para gerenciamento de uma assistência técnica, com controle de entrada de aparelhos, orçamentos e autenticação com segundo fator de segurança.

## Tecnologias

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT para autenticação
- Bcrypt para criptografia de senhas
- Cloudinary para upload de imagens
- Nodemailer para envio de código 2FA
- Swagger para documentação interativa
- CORS configurado por origem

---

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse a documentação em: `http://localhost:3000/api-docs`

---

## Variáveis de ambiente (.env)

```
PORT=3000
JWT_SECRET=sua_chave_secreta
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/assistencia
CLOUDINARY_NAME=seu_cloud
CLOUDINARY_KEY=sua_key
CLOUDINARY_SECRET=seu_secret
FRONTEND_URL=https://seu-dominio.vercel.app
EMAIL_USER=seu@gmail.com
EMAIL_PASS=senha_de_app_gmail
```

---

## Rotas

### Autenticação — `/api/auth`

| POST | `/api/auth/logar` | Recebe email e senha. Se válidos, envia código 2FA por e-mail |
| POST | `/api/auth/verificar-2fa` | Recebe email e código. Se válido, retorna o token JWT |

Todas as rotas protegidas exigem o header: `Authorization: Bearer <token>`

---

### Entrada de Aparelhos — `/api/entrada-aparelhos`

| GET | `/api/entrada-aparelhos` | Lista todos os aparelhos cadastrados |
| GET | `/api/entrada-aparelhos/:id` | Busca um aparelho pelo ID |
| GET | `/api/entrada-aparelhos/search/:codigo` | Busca um aparelho pelo código |
| GET | `/api/entrada-aparelhos/pdf/download` | Gera e retorna um PDF com a lista de aparelhos |
| POST | `/api/entrada-aparelhos` | Cadastra um novo aparelho (suporta upload de imagem) |
| PUT | `/api/entrada-aparelhos/:id` | Atualiza os dados de um aparelho |
| DELETE | `/api/entrada-aparelhos/:id` | Remove um aparelho |


### Orçamentos — `/api/orcamentos`


| GET | `/api/orcamentos` | Lista todos os orçamentos |
| GET | `/api/orcamentos/:id` | Busca um orçamento pelo ID |
| POST | `/api/orcamentos` | Cria um novo orçamento |
| PUT | `/api/orcamentos/:id` | Atualiza um orçamento |
| DELETE | `/api/orcamentos/:id` | Remove um orçamento |

---

### Logs — `/api`

| GET | `/api/logs` | Retorna os registros de requisições em uma data informada |



## Middlewares

- authMiddleware** — valida o token JWT antes de acessar rotas protegidas
- logMiddleware** — registra o horário e a rota de cada requisição realizada
- weekdayMiddleware** — bloqueia o acesso à API fora do intervalo de segunda a sexta-feira

---

## Segurança

- Senhas criptografadas com bcrypt antes de salvar no banco
- Autenticação em dois fatores (2FA) via e-mail no login
- Token JWT com expiração de 8 horas
- CORS restrito à origem configurada no `.env`
- Chaves sensíveis armazenadas em variáveis de ambiente