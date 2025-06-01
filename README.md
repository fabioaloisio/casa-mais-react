# Casa Mais - Frontend

Interface web do sistema de gestão para a organização social Casa de Lázaro de Betânia.

## 🚀 Tecnologias

- **React 19.1.0** - Biblioteca para construção de interfaces
- **Vite 6.3.5** - Build tool com HMR (Hot Module Replacement)
- **React Router DOM 7.6.1** - Roteamento de páginas
- **Bootstrap 5.3.6** + **React Bootstrap 2.10.10** - Framework UI
- **React Icons 5.5.0** - Ícones (Font Awesome)
- **React Input Mask 2.0.4** - Máscaras de input
- **PropTypes 15.8.1** - Validação de tipos

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente (já existe .env.example)
cp .env.example .env

# Iniciar servidor de desenvolvimento
npm run dev
```

## 🎯 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run lint` - Executa o ESLint
- `npm run preview` - Visualiza o build de produção

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── common/         # Componentes genéricos
│   │   ├── BaseModal.jsx
│   │   ├── ConfirmModal.jsx
│   │   ├── FormModal.jsx
│   │   └── Toast.jsx
│   ├── doacoes/        # Componentes de doações
│   ├── medicamentos/   # Componentes de medicamentos
│   └── usuarios/       # Componentes de usuários
├── pages/              # Páginas da aplicação
├── services/           # Camada de serviços (API + migração localStorage)
│   ├── api.js         # Cliente HTTP genérico
│   └── doacoesService.js # Serviço de doações integrado com API
├── config/             # Configurações da aplicação
│   └── api.js         # Configuração da API (URL, timeout, headers)
├── utils/              # Funções utilitárias
│   ├── masks.js       # Máscaras de formatação
│   ├── validations.js # Validações de formulário
│   └── sampleData.js  # Dados de exemplo
└── styles/             # Estilos globais
```

## 🎨 Sistema de Modais

O projeto utiliza um sistema padronizado de modais com componentes base reutilizáveis:

### Componentes Base

- **BaseModal** - Modal base com configurações padrão
- **FormModal** - Modal para formulários com validação
- **ConfirmModal** - Modal de confirmação/exclusão

### Recursos

- ✅ Suporte a tecla ESC para fechar
- ✅ Detecção de mudanças não salvas
- ✅ Loading states
- ✅ Validação de formulários
- ✅ Acessibilidade (ARIA)

## 🔄 Integração com Backend

**✅ Integrado**: O frontend está totalmente integrado com a API do backend.

### Configuração da API

```bash
# Arquivo .env
REACT_APP_API_URL=http://localhost:3003/api
NODE_ENV=development
```

### Serviços Disponíveis

- **ApiService** - Cliente HTTP genérico com retry e error handling
- **DoacoesService** - Serviço completo para gestão de doações
- **MedicamentosService** - Integração com API de medicamentos

### Recursos da Integração

- ✅ Comunicação HTTP com retry automático
- ✅ Loading states e error handling
- ✅ Migração automática do localStorage para API
- ✅ CORS configurado
- ✅ Validação de dados no cliente e servidor

### Como Usar

```bash
# 1. Iniciar o backend (com nodemon para hot reload)
cd ../casa-mais-backend
npm run dev

# 2. Iniciar o frontend
npm run dev
```

Backend estará em: `http://localhost:3003`  
Frontend estará em: `http://localhost:5173`

## 🛠️ Desenvolvimento

### Padrões de Código

- Componentes funcionais com Hooks
- PropTypes para validação de props
- ESLint para linting
- Nomes de componentes em PascalCase
- Arquivos de componentes com extensão `.jsx`

### Fluxo de Trabalho

1. Criar branch para nova feature
2. Desenvolver e testar localmente
3. Executar `npm run lint` antes do commit
4. Criar pull request para review

## 📋 Módulos Principais

- **Dashboard** - Visão geral com estatísticas
- **Usuários** - Gestão de usuários do sistema
- **Assistidas** - Cadastro de beneficiárias
- **Consultas** - Agendamento médico
- **Medicamentos** - Controle de estoque (integrado com API)
- **Doações** - Registro de contribuições (integrado com API MySQL)
- **Despesas** - Controle financeiro

### Status de Integração

| Módulo | Status | Banco de Dados |
|--------|--------|----------------|
| Dashboard | 🟡 Parcial | localStorage |
| Usuários | 🔴 Local | localStorage |
| Assistidas | 🔴 Local | localStorage |
| Consultas | 🔴 Local | localStorage |
| Medicamentos | 🟢 Integrado | MySQL API |
| **Doações** | **🟢 Integrado** | **MySQL API** |
| Despesas | 🔴 Local | localStorage |

## 🔒 Segurança

- Não commitar arquivos `.env`
- Usar variáveis de ambiente para configurações sensíveis
- Validar todos os inputs do usuário
- Sanitizar dados antes de exibir

## 👥 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request
