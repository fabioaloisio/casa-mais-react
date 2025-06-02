import apiService from './api';

const STORAGE_KEY = 'assistidas';

// Dados iniciais para fallback quando API não está disponível
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
    droga1_tipo: "Álcool",
    droga1_idade: "20",
    droga1_tempo: "20 anos",
    droga1_intensidade: "Alta",
    uso_medicamentos: "sim",
    quais_medicamentos: "Clonazepam",
    internado: "sim",
    quantidade_internacoes: "2",
    local1: "Clínica Esperança",
    duracao1: "30 dias",
    data1: "2022-01-10",
    local2: "Casa Recomeço",
    duracao2: "45 dias",
    data2: "2023-03-05",
    motivacao_internacoes: "Tentativas de reabilitação por alcoolismo",
    fatos_marcantes: "Perda da guarda dos filhos",
    infancia: "Cresceu em situação de vulnerabilidade",
    adolescencia: "Envolvimento com más companhias"
  },
  {
    id: 2,
    nome: "Ana Paula Lima",
    cpf: "987.654.321-99",
    rg: "SP-98.765.432",
    idade: "36",
    data_nascimento: "1988-02-20",
    nacionalidade: "Brasileira",
    estado_civil: "Casada",
    profissao: "Auxiliar de Limpeza",
    escolaridade: "Ensino Médio",
    status: "Em Tratamento",
    logradouro: "Avenida Central",
    bairro: "Jardim das Palmeiras",
    numero: "500",
    cep: "04000-200",
    estado: "SP",
    cidade: "São Paulo",
    telefone: "(11) 91234-5678",
    telefone_contato: "(11) 93456-7890",
    data_atendimento: "2025-05-10",
    hora: "09:00",
    historia_patologica: "Dependência de crack nos últimos 10 anos.",
    tempo_sem_uso: "3 semanas",
    droga1_tipo: "Crack",
    droga1_idade: "26",
    droga1_tempo: "10 anos",
    droga1_intensidade: "Muito Alta",
    droga2_tipo: "Maconha",
    droga2_idade: "20",
    droga2_tempo: "5 anos",
    droga2_intensidade: "Média",
    uso_medicamentos: "nao",
    quais_medicamentos: "",
    internado: "nao",
    quantidade_internacoes: "0",
    fatos_marcantes: "Perda do emprego por uso",
    infancia: "Família instável e violenta",
    adolescencia: "Morou na rua por um tempo"
  }
];

// Função para migrar dados do localStorage para API (quando disponível)
const migrarDadosLocalStorage = async () => {
  try {
    const dadosLocal = localStorage.getItem(STORAGE_KEY);
    if (dadosLocal) {
      const assistidas = JSON.parse(dadosLocal);
      console.log('Migrando dados de assistidas do localStorage para API...');
      
      // Fazer backup dos dados locais
      localStorage.setItem(`${STORAGE_KEY}_backup`, dadosLocal);
      
      // Migrar cada assistida para a API
      for (const assistida of assistidas) {
        try {
          await assistidasService.create(assistida);
        } catch (error) {
          console.warn('Erro ao migrar assistida:', assistida.nome, error);
        }
      }
      
      // Limpar localStorage após migração bem-sucedida
      localStorage.removeItem(STORAGE_KEY);
      console.log('Migração de assistidas concluída');
    }
  } catch (error) {
    console.error('Erro durante migração de assistidas:', error);
  }
};

// Função para inicializar dados no localStorage (fallback)
const inicializarDadosLocal = () => {
  const dadosExistentes = localStorage.getItem(STORAGE_KEY);
  if (!dadosExistentes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosIniciais));
    return dadosIniciais;
  }
  return JSON.parse(dadosExistentes);
};

export const assistidasService = {
  // Buscar todas as assistidas
  obterTodos: async (filtros = {}) => {
    try {
      const response = await apiService.get('/assistidas', { params: filtros });
      return response.success ? response.data : [];
    } catch (error) {
      console.warn('API não disponível, usando localStorage:', error.message);
      // Fallback para localStorage
      return inicializarDadosLocal();
    }
  },

  // Buscar assistida por ID
  obterPorId: async (id) => {
    try {
      const response = await apiService.get(`/assistidas/${id}`);
      return response.success ? response.data : null;
    } catch (error) {
      console.warn('API não disponível, usando localStorage:', error.message);
      // Fallback para localStorage
      const dadosLocal = inicializarDadosLocal();
      return dadosLocal.find(assistida => assistida.id === parseInt(id)) || null;
    }
  },

  // Criar nova assistida
  create: async (assistidaData) => {
    try {
      const response = await apiService.post('/assistidas', assistidaData);
      return response;
    } catch (error) {
      console.warn('API não disponível, salvando no localStorage:', error.message);
      // Fallback para localStorage
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

  // Atualizar assistida
  update: async (id, assistidaData) => {
    try {
      const response = await apiService.put(`/assistidas/${id}`, assistidaData);
      return response;
    } catch (error) {
      console.warn('API não disponível, atualizando no localStorage:', error.message);
      // Fallback para localStorage
      const dadosLocal = inicializarDadosLocal();
      const index = dadosLocal.findIndex(assistida => assistida.id === parseInt(id));
      
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

  // Excluir assistida
  delete: async (id) => {
    try {
      const response = await apiService.delete(`/assistidas/${id}`);
      return response;
    } catch (error) {
      console.warn('API não disponível, removendo do localStorage:', error.message);
      // Fallback para localStorage
      const dadosLocal = inicializarDadosLocal();
      const novosDados = dadosLocal.filter(assistida => assistida.id !== parseInt(id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novosDados));
      
      return {
        success: true,
        message: 'Assistida removida localmente'
      };
    }
  },

  // Obter estatísticas
  obterEstatisticas: async (filtros = {}) => {
    try {
      const response = await apiService.get('/assistidas/stats', { params: filtros });
      return response.success ? response.data : null;
    } catch (error) {
      console.warn('API não disponível, calculando estatísticas localmente:', error.message);
      // Fallback para localStorage
      const dadosLocal = inicializarDadosLocal();
      
      const stats = {
        total: dadosLocal.length,
        ativas: dadosLocal.filter(a => a.status === 'Ativa').length,
        inativas: dadosLocal.filter(a => a.status === 'Inativa').length,
        emTratamento: dadosLocal.filter(a => a.status === 'Em Tratamento').length,
        ultimaCadastrada: dadosLocal.length > 0 ? dadosLocal[dadosLocal.length - 1] : null
      };
      
      return stats;
    }
  },

  // Migrar dados quando API estiver disponível
  migrarDados: migrarDadosLocalStorage,

  // Métodos legados para compatibilidade
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