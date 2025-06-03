import apiService from './api';

const STORAGE_KEY = 'assistidas';

// Dados iniciais com estrutura normalizada
const dadosIniciais = [
  {
    id: 1,
    nome: "Maria das Dores",
    cpf: "123.456.789-00",
    rg: "MG-12.345.678",
    idade: "42",
    data_nascimento: "1983-09-15",
    nacionalidade: "Brasileira",
    estado_civil: "Solteira",
    profissao: "Cozinheira",
    escolaridade: "Ensino Fundamental",
    status: "Ativa",
    logradouro: "Rua das Flores",
    bairro: "Centro",
    numero: "120",
    cep: "30100-000",
    estado: "MG",
    cidade: "Belo Horizonte",
    telefone: "(31) 99999-8888",
    telefone_contato: "(31) 98888-7777",
    data_atendimento: "2025-05-01",
    hora: "14:30",
    historia_patologica: "Histórico de alcoolismo desde os 20 anos.",
    tempo_sem_uso: "6 meses",
    medicamentos: [
      {
        nome: "Clonazepam",
        dosagem: "2mg",
        frequencia: "1x ao dia"
      }
    ],
    motivacao_internacoes: "Tentativas de reabilitação por alcoolismo",
    drogas: [
      {
        tipo: "Álcool",
        idade_inicio: "20",
        tempo_uso: "20 anos",
        intensidade: "Alta"
      }
    ],
    internacoes: [
      {
        local: "Clínica Esperança",
        duracao: "30 dias",
        data: "2022-01-10"
      },
      {
        local: "Casa Recomeço",
        duracao: "45 dias",
        data: "2023-03-05"
      }
    ],
    fatos_marcantes: "Perda da guarda dos filhos",
    infancia: "Cresceu em situação de vulnerabilidade",
    adolescencia: "Envolvimento com más companhias"
  }
];

// Função de fallback
const inicializarDadosLocal = () => {
  const dadosExistentes = localStorage.getItem(STORAGE_KEY);
  if (!dadosExistentes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosIniciais));
    return dadosIniciais;
  }
  return JSON.parse(dadosExistentes);
};

export const assistidasService = {
  obterTodos: async (filtros = {}) => {
    try {
      const response = await apiService.get('/assistidas', { params: filtros });
      return response.success ? response.data : [];
    } catch (error) {
      console.warn('API não disponível, usando localStorage:', error.message);
      return inicializarDadosLocal();
    }
  },

  obterPorId: async (id) => {
    try {
      const response = await apiService.get(`/assistidas/${id}`);
      return response.success ? response.data : null;
    } catch (error) {
      console.warn('API não disponível, usando localStorage:', error.message);
      const dadosLocal = inicializarDadosLocal();
      return dadosLocal.find(a => a.id === parseInt(id)) || null;
    }
  },

  create: async (assistidaData) => {
    try {
      const response = await apiService.post('/assistidas', assistidaData);
      return response;
    } catch (error) {
      console.warn('API não disponível, salvando no localStorage:', error.message);
      const dadosLocal = inicializarDadosLocal();
      const novaAssistida = {
        ...assistidaData,
        id: dadosLocal.length > 0 ? Math.max(...dadosLocal.map(a => a.id)) + 1 : 1
      };
      const novosAssistidas = [...dadosLocal, novaAssistida];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novosAssistidas));

      return {
        success: true,
        data: novaAssistida,
        message: 'Assistida cadastrada localmente'
      };
    }
  },

  update: async (id, assistidaData) => {
    try {
      const response = await apiService.put(`/assistidas/${id}`, assistidaData);
      return response;
    } catch (error) {
      console.warn('API não disponível, atualizando no localStorage:', error.message);
      const dadosLocal = inicializarDadosLocal();
      const index = dadosLocal.findIndex(a => a.id === parseInt(id));

      if (index !== -1) {
        dadosLocal[index] = { ...dadosLocal[index], ...assistidaData, id: parseInt(id) };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosLocal));

        return {
          success: true,
          data: dadosLocal[index],
          message: 'Assistida atualizada localmente'
        };
      } else {
        throw new Error('Assistida não encontrada');
      }
    }
  },

  delete: async (id) => {
    try {
      const response = await apiService.delete(`/assistidas/${id}`);
      return response;
    } catch (error) {
      console.warn('API não disponível, removendo do localStorage:', error.message);
      const dadosLocal = inicializarDadosLocal();
      const novosDados = dadosLocal.filter(a => a.id !== parseInt(id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novosDados));

      return {
        success: true,
        message: 'Assistida removida localmente'
      };
    }
  },

  obterEstatisticas: async (filtros = {}) => {
    try {
      const response = await apiService.get('/assistidas/stats', { params: filtros });
      return response.success ? response.data : null;
    } catch (error) {
      const dadosLocal = inicializarDadosLocal();
      return {
        total: dadosLocal.length,
        ativas: dadosLocal.filter(a => a.status === 'Ativa').length,
        inativas: dadosLocal.filter(a => a.status === 'Inativa').length,
        emTratamento: dadosLocal.filter(a => a.status === 'Em Tratamento').length,
        ultimaCadastrada: dadosLocal.length > 0 ? dadosLocal[dadosLocal.length - 1] : null
      };
    }
  },

  getAll: async () => {
    console.warn('getAll está obsoleto. Use obterTodos()');
    return await assistidasService.obterTodos();
  },

  getById: async (id) => {
    console.warn('getById está obsoleto. Use obterPorId()');
    return await assistidasService.obterPorId(id);
  },

  add: async (assistidaData) => {
    console.warn('add está obsoleto. Use create()');
    return await assistidasService.create(assistidaData);
  },

  remove: async (id) => {
    console.warn('remove está obsoleto. Use delete()');
    return await assistidasService.delete(id);
  }
};

export default assistidasService;
