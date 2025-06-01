# Casa Mais - Frontend

Interface web do sistema de gestão para a organização social Casa de Lázaro de Betânia.

## 📚 Repositórios

- **Frontend React**: https://github.com/fabioaloisio/casa-mais-react
- **Backend Node.js**: https://github.com/fabioaloisio/casa-mais-backend

## 🚀 Tecnologias

- **React 19.1.0** - Biblioteca para construção de interfaces
- **Vite 6.3.5** - Build tool com HMR (Hot Module Replacement)
- **React Router DOM 7.6.1** - Roteamento de páginas
- **Bootstrap 5.3.6** + **React Bootstrap 2.10.10** - Framework UI responsivo
- **React Icons 5.5.0** - Ícones (Font Awesome)
- **React Input Mask 2.0.4** - Máscaras de input
- **PropTypes 15.8.1** - Validação de tipos
- **Design Responsivo** - Mobile-first com breakpoints para tablet e desktop

## 🚀 Início Rápido

### 1. Clone o Frontend

```bash
# Clone este repositório
git clone https://github.com/fabioaloisio/casa-mais-react.git
cd casa-mais-react
```

### 2. Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
echo "VITE_API_URL=http://localhost:3003/api" > .env

# Iniciar servidor de desenvolvimento
npm run dev
```

**🌐 Aplicação rodando em**: `http://localhost:5173`

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
├── services/           # Camada de serviços (API)
│   ├── api.js         # Cliente HTTP genérico
│   ├── doacoesService.js # Serviço de doações integrado com API
│   └── MedicamentoService.js # Serviço de medicamentos integrado com API
├── config/             # Configurações da aplicação
│   └── api.js         # Configuração da API (URL, timeout, headers)
├── utils/              # Funções utilitárias
│   ├── masks.js       # Máscaras de formatação
│   └── validations.js # Validações de formulário
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
- ✅ Layout responsivo para mobile e tablet

## 🔄 Integração com Backend

### Configuração da API

```bash
# Arquivo .env (Vite usa VITE_ como prefixo)
VITE_API_URL=http://localhost:3003/api
```

**⚠️ Importante**: Use o prefixo `VITE_` para variáveis de ambiente acessíveis no cliente.

### Serviços Disponíveis

- **ApiService** - Cliente HTTP genérico com retry e error handling
- **DoacoesService** - Serviço completo para gestão de doações
- **MedicamentosService** - Integração com API de medicamentos

### Recursos da Integração

- ✅ Comunicação HTTP com retry automático
- ✅ Loading states e error handling
- ✅ CORS configurado
- ✅ Validação de dados no cliente e servidor
- ✅ Formatação automática de datas (DD/MM/YYYY)

### Como Integrar com o Backend

#### 1. Clone e configure o backend

```bash
# Clone o repositório do backend
git clone https://github.com/fabioaloisio/casa-mais-backend.git
cd casa-mais-backend

# Instale as dependências
npm install

# Configure o banco de dados MySQL
# Edite o arquivo src/config/database.js com suas credenciais
# Ou use as variáveis de ambiente:
echo "DB_HOST=localhost" > .env
echo "DB_USER=root" >> .env
echo "DB_PASSWORD=sua_senha" >> .env
echo "DB_NAME=casa_mais" >> .env

# Execute o setup do banco (cria tabelas)
npm run setup-db

# Popule o banco de dados (opicional)
npm run populate-db

# Inicie o servidor
npm run dev
```

#### 2. Acesse a aplicação

- **Backend API**: `http://localhost:3003`
- **Frontend**: `http://localhost:5173`

## 📱 Design Responsivo

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Recursos Mobile

- ✅ **Navegação móvel** com menu hambúrguer
- ✅ **Tabelas responsivas** com scroll horizontal
- ✅ **Touch-friendly** - alvos de toque ≥ 44px
- ✅ **Formulários otimizados** para mobile
- ✅ **Cards adaptáveis** em layouts de grid
- ✅ **Overlay semitransparente** para navegação

### Componentes Responsivos

| Componente  | Mobile                    | Tablet            | Desktop           |
| ----------- | ------------------------- | ----------------- | ----------------- |
| Sidebar     | Menu hambúrguer + overlay | Sidebar menor     | Sidebar completa  |
| Tabelas     | Scroll horizontal         | Scroll horizontal | Largura completa  |
| Formulários | Layout vertical           | Layout misto      | Layout horizontal |
| Cards       | Coluna única              | Grid 2 colunas    | Grid 3+ colunas   |

## 📱 Design Responsivo

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Recursos Mobile

- ✅ **Navegação móvel** com menu hambúrguer
- ✅ **Tabelas responsivas** com scroll horizontal
- ✅ **Touch-friendly** - alvos de toque ≥ 44px
- ✅ **Formulários otimizados** para mobile
- ✅ **Cards adaptáveis** em layouts de grid
- ✅ **Overlay semitransparente** para navegação

### Componentes Responsivos

| Componente | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Sidebar | Menu hambúrguer + overlay | Sidebar menor | Sidebar completa |
| Tabelas | Scroll horizontal | Scroll horizontal | Largura completa |
| Formulários | Layout vertical | Layout misto | Layout horizontal |
| Cards | Coluna única | Grid 2 colunas | Grid 3+ colunas |

## 🛠️ Desenvolvimento

### Padrões de Código

- Componentes funcionais com Hooks
- PropTypes para validação de props
- ESLint para linting
- Nomes de componentes em PascalCase
- Arquivos de componentes com extensão `.jsx`
- CSS modules ou classes específicas para componentes

### Fluxo de Trabalho

1. Criar branch para nova feature
2. Desenvolver e testar localmente
3. Testar responsividade em diferentes dispositivos
4. Executar `npm run lint` antes do commit
5. Criar pull request para review

## 📋 Módulos Principais

- **Dashboard** - Visão geral com estatísticas
- **Usuários** - Gestão de usuários do sistema
- **Assistidas** - Cadastro de beneficiárias
- **Consultas** - Agendamento médico
- **Medicamentos** - Controle de estoque (integrado com API)
- **Doações** - Registro de contribuições (integrado com API MySQL)
- **Despesas** - Controle financeiro

### Status de Integração

| Módulo           | Status           | Banco de Dados | Repositório Backend |
| ---------------- | ---------------- | -------------- | ------------------- |
| Dashboard        | 🟡 Parcial       | localStorage   | -                   |
| Usuários         | 🔴 Local         | localStorage   | -                   |
| Assistidas       | 🔴 Local         | localStorage   | -                   |
| Consultas        | 🔴 Local         | localStorage   | -                   |
| **Medicamentos** | **🟢 Integrado** | **MySQL API**  | **✅ Implementado** |
| **Doações**      | **🟢 Integrado** | **MySQL API**  | **✅ Implementado** |
| Despesas         | 🔴 Local         | localStorage   | -                   |

### Pré-requisitos para Integração

Para usar os módulos integrados (Medicamentos e Doações), você precisa:

1. **MySQL** instalado e rodando
2. **Backend Node.js** configurado e rodando
3. **Variáveis de ambiente** configuradas no frontend

### Estrutura da API

```
Backend: http://localhost:3003/api/
├── /medicamentos    # CRUD completo de medicamentos
├── /doacoes        # CRUD completo de doações
└── /health         # Status da API
```

## 🔒 Segurança

- Não commitar arquivos `.env`
- Usar variáveis de ambiente para configurações sensíveis
- Validar todos os inputs do usuário
- Sanitizar dados antes de exibir

## 🚨 Troubleshooting

### Problemas Comuns

#### Erro "process is not defined"

```bash
# Certifique-se que está usando VITE_ no prefixo das variáveis
echo "VITE_API_URL=http://localhost:3003/api" > .env
```

#### Backend não conecta

```bash
# Verifique se o MySQL está rodando
sudo service mysql start

# Teste a conexão da API
curl http://localhost:3003/api/health
```

#### Tabelas não existem

```bash
# Execute o setup do banco novamente
cd casa-mais-backend
npm run setup-db
```

## 👥 Contribuindo

1. Fork os projetos:
   - Frontend: https://github.com/fabioaloisio/casa-mais-react
   - Backend: https://github.com/fabioaloisio/casa-mais-backend
2. Crie sua feature branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request no repositório correspondente
