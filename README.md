# Casa Mais - Frontend

Interface web do sistema de gestão para a organização social Casa de Lázaro de Betânia.

## 📋 Informações do Projeto

- **Nome do Pacote**: casa-mais-react
- **Versão**: 0.0.0
- **Tipo**: module (ES Modules)

## 📚 Estrutura do Projeto

Este projeto está dividido em dois repositórios:
- **Frontend (este diretório)**: Aplicação React
- **Backend**: API Node.js/Express (disponível em `/backend`)

## 🚀 Tecnologias

### Dependências Principais
- **React 19.1.0** - Biblioteca para construção de interfaces
- **React DOM 19.1.0** - Renderização React para web
- **React Router DOM 7.6.1** - Roteamento de páginas
- **Bootstrap 5.3.6** + **React Bootstrap 2.10.10** - Framework UI responsivo
- **React Icons 5.5.0** - Biblioteca de ícones
- **React Input Mask 2.0.4** - Máscaras de input para formulários
- **React IMask 7.6.1** - Máscaras avançadas de input
- **PropTypes 15.8.1** - Validação de tipos

### Ferramentas de Desenvolvimento

- **Vite 6.3.5** - Build tool com HMR (Hot Module Replacement)
- **ESLint 9.18.0** - Linter para JavaScript
- **@vitejs/plugin-react 4.3.5** - Plugin React para Vite
- **globals 15.14.0** - Variáveis globais para ESLint

## 🚀 Início Rápido

### 1. Pré-requisitos

- Node.js 16+ e npm/yarn instalados
- Backend do Casa Mais rodando (porta 3003)

### 2. Instalação

```bash
# A partir do diretório principal do projeto
cd frontend

# Instalar dependências
npm install

# Copiar arquivo de configuração
cp .env.example .env

# Ou criar manualmente
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
├── components/                         # Componentes reutilizáveis da interface
│   ├── assistidas/                    # Componentes específicos para gestão de assistidas
│   │   ├── Assistidas.css             # Estilização da página de assistidas
│   │   ├── ConfirmDeleteModal.jsx     # Modal de confirmação para exclusão
│   │   ├── form.css                   # Estilo dos formulários de assistidas
│   │   ├── Formulario.jsx             # Formulário completo de assistidas
│   │   ├── FormularioSimples.jsx      # Versão simplificada do formulário
│   │   ├── internacoes.jsx            # Listagem de internações vinculadas
│   │   └── ListaAssistidas.jsx        # Tabela com filtro e ações
│
│   ├── common/                        # Componentes genéricos reutilizáveis
│   │   ├── BaseModal.jsx              # Modal base padrão
│   │   ├── ConfirmModal.jsx           # Modal de confirmação
│   │   ├── FormModal.jsx              # Modal com formulário interno
│   │   ├── Toast.jsx                  # Notificações do tipo toast
│   │   └── useUnsavedChanges.js       # Hook para detectar mudanças não salvas
│
│   ├── doacoes/                       # Componentes relacionados a doações
│   │   ├── ConfirmDeleteModal.jsx     # Modal de confirmação de exclusão
│   │   ├── DoacaoModal.css            # Estilo do modal de doações
│   │   └── DoacaoModal.jsx            # Modal para cadastrar/editar doações
│
│   ├── medicamentos/                  # Componentes para medicamentos
│   │   ├── ModalCadastroMedicamento.jsx # Modal de criação
│   │   ├── ModalEditarMedicamento.jsx  # Modal de edição
│   │   ├── ModalExclusaoMedicamento.jsx # Modal de exclusão
│   │   └── TabelaMedicamentos.jsx      # Tabela geral de medicamentos
│
│   ├── usuarios/                      # Componentes para usuários do sistema
│   │   └── UsuarioModal.jsx           # Modal de cadastro/edição de usuário
│
│   ├── Layout.jsx / Layout.css        # Layout principal com sidebar
│   ├── Logo.jsx                       # Componente do logo
│   ├── Sidebar.jsx / Sidebar.css      # Navegação lateral
│   └── TitleHandler.jsx               # Gerenciador de títulos de página

├── config/                             # Configurações globais da aplicação
│   └── api.js                         # Configuração da API (URL base, headers, timeout)

├── pages/                              # Páginas principais do sistema
│   ├── AgendarConsulta.jsx            # Página para agendar consultas
│   ├── Assistidas.jsx                 # Página de gestão de assistidas
│   ├── CadastroUsuario.jsx            # Cadastro de novo usuário
│   ├── Consultas.jsx                  # Histórico de consultas
│   ├── Dashboard.jsx / .css           # Painel com indicadores
│   ├── Despesas.jsx                   # Controle de despesas
│   ├── DetalhesAssistida.jsx          # Perfil completo da assistida
│   ├── Doacoes.jsx / .css             # Página de doações
│   ├── EstoqueEntradas.jsx           # Entradas no estoque
│   ├── EstoqueSaidas.jsx             # Saídas do estoque
│   ├── GerenciarMedicamentos.jsx     # Tela de controle de medicamentos
│   ├── GerenciarMedicamentos.css     # Estilo da tela de medicamentos
│   ├── LancarDespesa.jsx             # Lançamento de despesas
│   └── Usuarios.jsx / .css            # Tela de administração de usuários

├── services/                           # 🟡 Camada de serviços (API)
│   ├── api.js                         # ✅ Cliente HTTP genérico (fetch nativo)
│   ├── assistidasService.js          # ✅ Serviço de assistidas com API ready
│   ├── doacoesService.js             # ✅ Serviço de doações integrado com API
│   └── MedicamentoService.js         # ✅ Serviço de medicamentos integrado com API

├── styles/                             # Estilos globais e variáveis
│   └── theme.css                      # Tema com cores e resets

├── utils/                              # Funções auxiliares
│   ├── masks.js                       # Máscaras de CPF, data, etc.
│   └── validations.js                 # Funções de validação de formulários

├── App.jsx / App.css                   # Estrutura principal da aplicação
├── Layout.jsx / Layout.css             # Layout principal com Sidebar
├── Logo.jsx                            # Componente do logotipo
├── Sidebar.jsx / Sidebar.css           # Navegação lateral responsiva
├── TitleHandler.jsx                    # Gerenciador de títulos de página
└── main.jsx                            # Entrada principal (ReactDOM.render)

public/
└── logocasa+.png                       # Logo da aplicação
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

**⚠️ Importante**: 
- Use o prefixo `VITE_` para variáveis de ambiente acessíveis no cliente
- O arquivo `.env.example` já está configurado com as variáveis necessárias

### Serviços Disponíveis

- **ApiService** - Cliente HTTP genérico com fetch nativo e error handling
- **AssistidasService** - Serviço de gestão de assistidas
- **DoacoesService** - Serviço completo para gestão de doações
- **MedicamentoService** - Integração com API de medicamentos

### Recursos da Integração

- ✅ Comunicação HTTP com error handling
- ✅ Loading states e feedback visual
- ✅ CORS configurado
- ✅ Validação de dados no cliente e servidor
- ✅ Formatação automática de datas (DD/MM/YYYY)
- ✅ Máscaras de input (CPF, telefone, CEP, etc.)

### Como Integrar com o Backend

#### 1. Configure e inicie o backend

```bash
# A partir do diretório principal do projeto
cd backend

# Instale as dependências
npm install

# Configure o banco de dados MySQL
# Edite o arquivo src/config/database.js com suas credenciais
# Ou use as variáveis de ambiente:
echo "DB_HOST=localhost" > .env
echo "DB_USER=root" >> .env
echo "DB_PASSWORD=sua_senha" >> .env
echo "DB_NAME=casamais_db" >> .env

# Execute o setup do banco (cria tabelas)
node setup-db.js

# Popule o banco de dados (opcional)
node populate-db.js

# Inicie o servidor
npm start
```

#### 2. Acesse a aplicação

- **Backend API**: `http://localhost:3003/api`
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
- **🆕 Assistidas** - **Gestão completa de beneficiárias** com formulário multi-etapas
- **Consultas** - Agendamento médico
- **Medicamentos** - Controle de estoque (integrado com API)
- **Doações** - Registro de contribuições (integrado com API MySQL)
- **Despesas** - Controle financeiro

### Status de Integração

| Módulo            | Status           | Funcionalidades             | Banco de Dados               |
| ----------------- | ---------------- | --------------------------- | ---------------------------- |
| Dashboard         | 🟡 Parcial       | Estatísticas básicas        | localStorage                 |
| Usuários          | 🔴 Local         | CRUD básico                 | localStorage                 |
| **🆕 Assistidas** | **🟢 Completo**  | **CRUD + Filtros + Perfil** | **localStorage + API Ready** |
| Consultas         | 🔴 Local         | CRUD básico                 | localStorage                 |
| **Medicamentos**  | **🟢 Integrado** | **CRUD completo**           | **MySQL API**                |
| **Doações**       | **🟢 Integrado** | **CRUD completo**           | **MySQL API**                |
| Despesas          | 🔴 Local         | CRUD básico                 | localStorage                 |

### 🆕 Módulo Assistidas - Funcionalidades

O módulo de Gestão de Assistidas agora está **completamente implementado** com:

- ✅ **CRUD Completo**: Criar, visualizar, editar e excluir assistidas
- ✅ **Formulário Multi-etapas**: 4 etapas de cadastro com validação
- ✅ **Sistema de Filtros**: Por nome, CPF, idade e status
- ✅ **Página de Perfil**: Visualização completa dos dados da assistida
- ✅ **Cards de Estatísticas**: Total, ativas, em tratamento e inativas
- ✅ **Design Responsivo**: Otimizado para mobile, tablet e desktop
- ✅ **Pronto para API**: Service preparado para integração com backend

### Pré-requisitos para Integração

Para usar os módulos integrados (Medicamentos, Doações e Assistidas), você precisa:

1. **MySQL** instalado e rodando
2. **Backend Node.js** configurado e rodando
3. **Variáveis de ambiente** configuradas no frontend

### Estrutura da API

```
Backend: http://localhost:3003/api
├── /medicamentos    # CRUD completo de medicamentos ✅
├── /doacoes        # CRUD completo de doações ✅
├── /assistidas     # CRUD completo de assistidas ✅
└── /health         # Status da API
```

## 🧹 Limpeza de Código

O projeto foi **otimizado e limpo** removendo:

- ✅ **Arquivos duplicados**: `DetalheAssistida.jsx` (vazio)
- ✅ **Componentes não utilizados**: CSS vazios, modais antigos
- ✅ **Páginas obsoletas**: Cadastros substituídos por modais
- ✅ **Assets desnecessários**: React SVG, CSS não utilizados
- ✅ **Imports quebrados**: Componentes removidos das importações

**Resultado**: Redução de 453 → 449 módulos no build e código mais limpo.

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
cd backend
node setup-db.js
```

## 👥 Contribuindo

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request
