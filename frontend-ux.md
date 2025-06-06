# Pull Request: Melhorias de UX e Interface do Frontend

## Summary

- Corrige detecção incorreta de mudanças no modal de assistidas
- Padroniza textos dos botões para "Cadastrar" ao invés de "Novo"
- Melhora layout com espaçamento simétrico do container principal
- Reorganiza menu lateral agrupando "Gestão de Doadores" em "Gestão de Pessoas"

## Principais Melhorias

### 🐛 Correção de Bug Crítico
- **Modal de Assistidas**: Resolve problema onde o modal solicitava confirmação mesmo sem alterações do usuário
- Causa: cálculo automático da idade estava criando mudanças "fantasma"
- Solução: normalização de dados antes da comparação no hook `useUnsavedChanges`

### 🎨 Melhorias de Interface  
- **Textos dos Botões**: "Novo Doador" → "Cadastrar Doador", "Nova Doação" → "Cadastrar Doação"
- **Layout Simétrico**: Padding direito igual ao esquerdo para melhor equilíbrio visual
- **Organização do Menu**: Move "Gestão de Doadores" para seção "Gestão de Pessoas"

## Detalhamento das Alterações

### 1. Correção do Modal de Assistidas
**Problema**: O modal detectava falsas mudanças devido ao recálculo automático da idade
**Solução**: 
- Implementada normalização de dados no `useUnsavedChanges`
- Preservação da idade original nos registros históricos
- Detecção apenas de mudanças reais do usuário

**Arquivos alterados:**
- `src/components/assistidas/Formulario.jsx`

### 2. Padronização de Textos
**Mudanças**:
- "Novo Doador" → "Cadastrar Doador"
- "Nova Doação" → "Cadastrar Doação"

**Arquivos alterados:**
- `src/pages/Doadores.jsx`
- `src/components/doacoes/DoadorSelector.jsx`
- `src/pages/Doacoes.jsx`
- `src/components/doacoes/DoacaoModal.jsx`

### 3. Layout Simétrico
**Melhoria**: Espaçamento uniforme entre sidebar e bordas
- Desktop: 2rem de padding em ambos os lados
- Tablet: 1.5rem de padding em ambos os lados
- Mobile: responsividade preservada

**Arquivos alterados:**
- `src/components/Layout.css`

### 4. Reorganização do Menu
**Mudança**: "Gestão de Doadores" movido para "Gestão de Pessoas"
- Organização mais lógica agrupando gestão de pessoas
- Melhora a navegabilidade

**Arquivos alterados:**
- `src/components/Sidebar.jsx`

## Test Plan

- [ ] Testar abertura/fechamento do modal de assistidas sem alterações
- [ ] Verificar textos dos botões atualizados em Doadores e Doações  
- [ ] Validar espaçamento simétrico do layout em desktop e tablet
- [ ] Confirmar nova posição de "Gestão de Doadores" no menu

## Impacto na Experiência do Usuário

### Antes
- Modal de assistidas com falsos positivos de mudanças
- Botões com nomenclatura inconsistente ("Novo" vs "Cadastrar")
- Layout assimétrico visualmente desbalanceado
- Menu com organização menos intuitiva

### Depois
- Modal funciona corretamente apenas com mudanças reais
- Nomenclatura padronizada e consistente
- Layout visualmente equilibrado e profissional
- Menu organizado logicamente por tipo de gestão

## Compatibilidade

✅ Todas as alterações são backward-compatible
✅ Nenhuma breaking change
✅ Funcionalidades existentes preservadas
✅ Responsividade mantida em todos os dispositivos