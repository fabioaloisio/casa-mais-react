// Máscaras para formatação
export const masks = {
  cpf: '999.999.999-99',
  cnpj: '99.999.999/9999-99',
  telefone: '(99) 99999-9999',
  cep: '99999-999',
  valor: (value) => {
    // Remove tudo exceto números
    const cleanValue = value.replace(/\D/g, '');
    
    // Converte para número e divide por 100 para ter centavos
    const numericValue = parseFloat(cleanValue) / 100;
    
    // Formata como moeda brasileira
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numericValue);
  }
};

// Formatar CPF
export const formatCPF = (cpf) => {
  const cleaned = cpf.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Formatar CNPJ
export const formatCNPJ = (cnpj) => {
  const cleaned = cnpj.replace(/\D/g, '');
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

// Formatar valor monetário
export const formatCurrency = (value) => {
  if (!value) return 'R$ 0,00';
  
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'))
    : value;
    
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numericValue);
};

// Remover formatação de valor monetário
export const parseCurrency = (value) => {
  if (!value) return 0;
  return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
};

// Aplicar máscara de valor monetário em input
export const maskCurrency = (event) => {
  let value = event.target.value;
  value = value.replace(/\D/g, '');
  value = (parseInt(value) / 100).toFixed(2) + '';
  value = value.replace('.', ',');
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  event.target.value = 'R$ ' + value;
};