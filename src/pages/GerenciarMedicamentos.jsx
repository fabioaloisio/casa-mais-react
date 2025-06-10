// Aldruin Bonfim de Lima Souza - RA 10482416915
import React, { useState, useEffect } from 'react';
import TabelaMedicamentos from '../components/medicamentos/TabelaMedicamentos';
import ModalCadastroMedicamento from '../components/medicamentos/ModalCadastroMedicamento';
import ModalEditarMedicamento from '../components/medicamentos/ModalEditarMedicamento';
import ModalExclusaoMedicamento from '../components/medicamentos/ModalExclusaoMedicamento';
import { MedicamentoService } from '../services/MedicamentoService';
import Toast from '../components/common/Toast';
import './GerenciarMedicamentos.css';
import './Doacoes.css';
import { FaPlus } from 'react-icons/fa';

const GerenciarMedicamentos = () => {
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [nomeFiltro, setNomeFiltro] = useState('');

  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalCadastroOpen, setIsModalCadastroOpen] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);

  const [medSelecionado, setMedSelecionado] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const mostrarToast = (mensagem, tipo = 'success') => {
    setToast({ show: true, message: mensagem, type: tipo });
  };

  useEffect(() => {
    carregarMedicamentos();
  }, []);

  const carregarMedicamentos = async () => {
    try {
      setLoading(true);
      const dados = await MedicamentoService.obterTodos();
      setMedicamentos(dados);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar medicamentos:', err);
      setError('Erro ao carregar medicamentos. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const tiposUnicos = [...new Set(medicamentos.map((m) => m.tipo))];

  const abrirModalEditar = (med) => {
    setMedSelecionado(med);
    setModalEditarAberto(true);
  };

  const abrirModalExcluir = (med) => {
    setMedSelecionado(med);
    setModalExcluirAberto(true);
  };

  const fecharModais = () => {
    setIsModalCadastroOpen(false);
    setModalEditarAberto(false);
    setModalExcluirAberto(false);
    setMedSelecionado(null);
  };

  const handleCadastrar = async (novoMedicamento) => {
    try {
      const response = await MedicamentoService.criar(novoMedicamento);
      if (response.success) {
        await carregarMedicamentos();
        mostrarToast('Medicamento cadastrado com sucesso!', 'success');
        fecharModais();
      } else {
        mostrarToast('Erro ao cadastrar medicamento: ' + response.message, 'error');
      }
    } catch (error) {
      mostrarToast('Erro ao cadastrar medicamento: ' + error.message, 'error');
    }
  };

  const salvarEdicao = async (medAtualizado) => {
    try {
      const response = await MedicamentoService.atualizar(medAtualizado.id, medAtualizado);
      if (response.success) {
        await carregarMedicamentos();
        mostrarToast('Medicamento atualizado com sucesso!', 'success');
        fecharModais();
      } else {
        mostrarToast('Erro ao atualizar medicamento: ' + response.message, 'error');
      }
    } catch (error) {
      mostrarToast('Erro ao atualizar medicamento: ' + error.message, 'error');
    }
  };

  const confirmarExclusao = async () => {
    try {
      const response = await MedicamentoService.excluir(medSelecionado.id);
      if (response.success) {
        fecharModais();
        await carregarMedicamentos();
        mostrarToast('Medicamento excluído com sucesso!', 'success');
      } else {
        mostrarToast('Erro ao excluir medicamento: ' + response.message, 'error');
      }
    } catch (error) {
      mostrarToast('Erro ao excluir medicamento: ' + error.message, 'error');
    }
  };

  const medicamentosFiltrados = medicamentos.filter((med) => {
    const filtroTipo = tipoFiltro === 'todos' || med.tipo === tipoFiltro;
    const filtroNome = med.nome.toLowerCase().includes(nomeFiltro.toLowerCase());
    return filtroTipo && filtroNome;
  });

  if (loading) {
    return (
      <div className="conteudo">
        <div className="topo">
          <h1>Gerenciar Medicamentos</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Carregando medicamentos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="conteudo">
        <div className="topo">
          <h1>Gerenciar Medicamentos</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          <p>{error}</p>
          <button onClick={carregarMedicamentos} style={{ marginTop: '10px' }}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="conteudo">
      <div className="topo">
        <h1>Gerenciar Medicamentos</h1>
        <p>Gerencie o estoque de medicamentos da organização</p>
      </div>

      <div className="top-bar">
        <button
          className="btn-cadastrar"
          onClick={() => setIsModalCadastroOpen(true)}
        >
          <FaPlus />  Cadastrar Medicamento
        </button>

        <div className="filtros">
          <select
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
            className="select-filtro"
          >
            <option value="todos">Todos os tipos</option>
            {tiposUnicos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Filtrar por nome..."
            value={nomeFiltro}
            onChange={(e) => setNomeFiltro(e.target.value)}
            className="input-filtro"
          />
        </div>
      </div>

      <TabelaMedicamentos
        medicamentos={medicamentosFiltrados}
        onEditar={abrirModalEditar}
        onExcluir={abrirModalExcluir}
      />

      {isModalCadastroOpen && (
        <ModalCadastroMedicamento
          isOpen={isModalCadastroOpen}
          onClose={fecharModais}
          onCadastrar={handleCadastrar}
        />
      )}

      {modalEditarAberto && medSelecionado && (
        <ModalEditarMedicamento
          medicamento={medSelecionado}
          onClose={fecharModais}
          onSave={salvarEdicao}
        />
      )}

      {modalExcluirAberto && medSelecionado && (
        <ModalExclusaoMedicamento
          medicamento={medSelecionado}
          onClose={fecharModais}
          onConfirm={confirmarExclusao}
        />
      )}

      <Toast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        type={toast.type}
      />
    </div>
  );
};

export default GerenciarMedicamentos;