const STORAGE_KEY = 'casa_mais_doacoes';

class DoacoesService {
  // Obter todas as doações
  getAll() {
    const doacoes = localStorage.getItem(STORAGE_KEY);
    return doacoes ? JSON.parse(doacoes) : [];
  }

  // Obter doação por ID
  getById(id) {
    const doacoes = this.getAll();
    return doacoes.find(doacao => doacao.id === id);
  }

  // Criar nova doação
  create(doacao) {
    const doacoes = this.getAll();
    const newDoacao = {
      ...doacao,
      id: Date.now().toString(),
      dataCadastro: new Date().toISOString()
    };
    doacoes.push(newDoacao);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doacoes));
    return newDoacao;
  }

  // Atualizar doação
  update(id, doacaoData) {
    const doacoes = this.getAll();
    const index = doacoes.findIndex(doacao => doacao.id === id);
    
    if (index !== -1) {
      doacoes[index] = {
        ...doacoes[index],
        ...doacaoData,
        id,
        dataAtualizacao: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(doacoes));
      return doacoes[index];
    }
    return null;
  }

  // Deletar doação
  delete(id) {
    const doacoes = this.getAll();
    const filteredDoacoes = doacoes.filter(doacao => doacao.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDoacoes));
    return filteredDoacoes.length < doacoes.length;
  }

  // Obter estatísticas
  getStats() {
    const doacoes = this.getAll();
    const total = doacoes.reduce((sum, doacao) => sum + parseFloat(doacao.valor || 0), 0);
    const totalPF = doacoes.filter(d => d.tipoDoador === 'PF').length;
    const totalPJ = doacoes.filter(d => d.tipoDoador === 'PJ').length;
    
    return {
      totalDoacoes: doacoes.length,
      valorTotal: total,
      totalPessoaFisica: totalPF,
      totalPessoaJuridica: totalPJ
    };
  }
}

export default new DoacoesService();