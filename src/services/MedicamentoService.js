//Aldruin Bonfim de Lima Souza - RA 10482416915

const CHAVE_STORAGE = 'medicamentos';

export const MedicamentoService = {
  obterTodos: () => {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  },

  salvarTodos: (medicamentos) => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(medicamentos));
  },
};