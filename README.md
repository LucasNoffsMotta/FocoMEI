# FocoMEI

Aplicação web para apoiar o **Microempreendedor Individual (MEI)** no controle de produtos e vendas, com uma API em .NET 8 e um frontend em Next.js.

O projeto é dividido em duas pastas:

- `FocoMEI_Backend` — API REST em ASP.NET Core 8 com banco SQLite.
- `FocoMEI_Frontend` — aplicação Next.js (App Router) em TypeScript.

---

## Stack

**Backend**
- .NET 8 / ASP.NET Core
- Entity Framework Core 8 (provedor SQLite)
- Swashbuckle (Swagger UI)

**Frontend**
- Next.js 16 (App Router)
- React 19
- TypeScript 5.7
- Tailwind CSS 4
- Radix UI

---

## Pré-requisitos

Antes de começar, instale:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 20+](https://nodejs.org/) (Next.js 16 exige Node 20 ou superior)
- [pnpm](https://pnpm.io/installation) (recomendado) ou npm
- Git

Para conferir as versões instaladas:

```bash
dotnet --version
node --version
pnpm --version
```

---

## Como rodar

Clone o repositório:

```bash
git clone https://github.com/LucasNoffsMotta/FocoMEI.git
cd FocoMEI
```

### 1. Backend (API)

Em um terminal, dentro da pasta do backend:

```bash
cd FocoMEI_Backend
dotnet restore
dotnet run
```

A API sobe em:

- HTTP: <http://localhost:5086>
- HTTPS: <https://localhost:7217>

Em ambiente de desenvolvimento, o Swagger UI fica disponível em <http://localhost:5086/swagger> com a documentação interativa dos endpoints.

O banco SQLite (`FocoMEI.db`) já está incluído no repositório com dados iniciais (alguns produtos e um usuário de exemplo), então não é necessário rodar migrations para começar.

### 2. Frontend

Em outro terminal, dentro da pasta do frontend:

```bash
cd FocoMEI_Frontend
pnpm install
pnpm dev
```

Se preferir npm:

```bash
cd FocoMEI_Frontend
npm install
npm run dev
```

A aplicação ficará disponível em <http://localhost:3000>.

---

## Endpoints da API

Endpoints atualmente expostos:

### Produtos

| Método | Rota           | Descrição                  |
| ------ | -------------- | -------------------------- |
| GET    | `/api/product` | Lista todos os produtos    |
| POST   | `/api/product` | Cria um novo produto       |

### Vendas

| Método | Rota                        | Descrição                                |
| ------ | --------------------------- | ---------------------------------------- |
| GET    | `/api/sale`                 | Lista todas as vendas                    |
| GET    | `/api/sale/{id}`            | Busca uma venda pelo ID                  |
| GET    | `/api/sale/byUser/{userId}` | Lista todas as vendas de um usuário      |
| POST   | `/api/sale/create`          | Cria uma nova venda                      |

O endpoint de criação de venda recebe um `CreateSaleDto` no corpo da requisição e retorna a venda criada em caso de sucesso.

O arquivo `FocoMEI_Backend/tests.http` traz requisições prontas para testar a API a partir do Visual Studio ou da extensão REST Client do VS Code.

---

## Estrutura do projeto

```text
FocoMEI/
├── FocoMEI_Backend/
│   ├── Controller/        # Controllers da API (Product, Sale)
│   ├── Data/              # AppDbContext, DTOs e configurações do EF Core
│   ├── Map/               # Conversões entre Models e DTOs
│   ├── Migrations/        # Migrations do EF Core
│   ├── Models/            # Entidades (Product, Sale, User, ModelBase)
│   ├── Services/          # Serviços (Products, Sales)
│   ├── Properties/        # launchSettings.json
│   ├── appsettings.json   # Configurações (connection string)
│   ├── FocoMEI.db         # Banco SQLite com dados iniciais
│   └── Program.cs         # Bootstrap da aplicação
└── FocoMEI_Frontend/
    ├── app/               # Rotas e layouts (App Router do Next.js)
    ├── components/        # Componentes React (chat, ui)
    ├── hooks/             # React hooks
    ├── lib/               # Utilitários
    ├── public/            # Assets estáticos
    └── styles/            # Estilos globais
```

---

## Scripts úteis (frontend)

| Comando         | O que faz                                  |
| --------------- | ------------------------------------------ |
| `pnpm dev`      | Sobe o servidor de desenvolvimento         |
| `pnpm build`    | Faz o build de produção                    |
| `pnpm start`    | Roda o build de produção                   |
| `pnpm lint`     | Roda o ESLint                              |
