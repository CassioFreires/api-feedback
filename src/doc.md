├── src/                              # Código-fonte
│   ├── config/                       # Configurações (DB, variáveis de ambiente)
│   │   └── index.ts
│   ├── controllers/                  # Camada de Apresentação (API Controllers)
│   │   └── user.controller.ts
│   ├── routes/                       # Definição de rotas (routers)
│   │   └── user.routes.ts
│   ├── middlewares/                  # Middlewares (autenticação, logging, etc.)
│   │   └── auth.middleware.ts
│   ├── services/                     # Camada de Aplicação (Use Cases / Services)
│   │   └── user.service.ts
│   ├── repositories/                 # Camada de Infraestrutura (acesso a dados)
│   │   └── user.repository.ts
│   ├── models/                       # Modelos de domínio / Schemas (ORM / ODM)
│   │   └── user.model.ts
│   ├── dtos/                         # Data Transfer Objects (validação/Type definitions)
│   │   └── user.dto.ts
│   ├── utils/                        # Funções utilitárias genéricas
│   │   └── logger.ts
│   ├── interfaces/                   # Contratos / Interfaces TypeScript
│   │   └── IUserRepository.ts
│   └── index.ts                      # Entry point (bootstrap da aplicação)
│
├── tests/                            # Testes unitários/integrados
│   └── user.service.spec.ts
│
├── dist/                             # Código transpilado (gerado pelo tsc)
│
├── .env                              # Variáveis de ambiente
├── tsconfig.json                     # Configuração do TypeScript
├── package.json
└── README.md
