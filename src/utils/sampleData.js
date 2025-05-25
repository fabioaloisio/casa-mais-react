// Dados de exemplo para popular o localStorage na primeira vez
export const sampleDoacoes = [
  {
    id: '1',
    tipoDoador: 'PF',
    nomeDoador: 'Maria Silva Santos',
    documento: '12345678901',
    email: 'maria.silva@email.com',
    telefone: '(11) 98765-4321',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    valor: 500.00,
    dataDoacao: '2024-01-15',
    observacoes: 'Doação mensal',
    dataCadastro: '2024-01-15T10:00:00.000Z'
  },
  {
    id: '2',
    tipoDoador: 'PJ',
    nomeDoador: 'Empresa ABC Ltda',
    documento: '12345678000190',
    email: 'contato@empresaabc.com.br',
    telefone: '(11) 3456-7890',
    endereco: 'Av. Paulista, 1000',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01310-100',
    valor: 2500.00,
    dataDoacao: '2024-01-20',
    observacoes: 'Doação anual',
    dataCadastro: '2024-01-20T14:30:00.000Z'
  },
  {
    id: '3',
    tipoDoador: 'PF',
    nomeDoador: 'João Pedro Oliveira',
    documento: '98765432109',
    email: 'joao.pedro@email.com',
    telefone: '(21) 99876-5432',
    endereco: 'Rua do Comércio, 456',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    cep: '20040-020',
    valor: 300.00,
    dataDoacao: '2024-02-01',
    observacoes: '',
    dataCadastro: '2024-02-01T09:15:00.000Z'
  },
  {
    id: '4',
    tipoDoador: 'PJ',
    nomeDoador: 'Supermercado XYZ S.A.',
    documento: '98765432000112',
    email: 'doacoes@supermercadoxyz.com',
    telefone: '(11) 2345-6789',
    endereco: 'Rua do Mercado, 789',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '02345-678',
    valor: 1500.00,
    dataDoacao: '2024-02-10',
    observacoes: 'Doação de alimentos também realizada',
    dataCadastro: '2024-02-10T16:45:00.000Z'
  },
  {
    id: '5',
    tipoDoador: 'PF',
    nomeDoador: 'Ana Carolina Ferreira',
    documento: '11122233344',
    email: 'ana.ferreira@email.com',
    telefone: '(31) 98765-1234',
    endereco: 'Av. dos Estados, 234',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    cep: '30140-110',
    valor: 750.00,
    dataDoacao: '2024-02-15',
    observacoes: 'Doação trimestral',
    dataCadastro: '2024-02-15T11:20:00.000Z'
  }
];

// Função para inicializar dados de exemplo
export const initializeSampleData = () => {
  const existingData = localStorage.getItem('casa_mais_doacoes');
  
  if (!existingData || JSON.parse(existingData).length === 0) {
    localStorage.setItem('casa_mais_doacoes', JSON.stringify(sampleDoacoes));
    return true;
  }
  
  return false;
};