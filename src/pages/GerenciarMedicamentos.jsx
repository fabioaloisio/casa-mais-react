//Aldruin Bonfim de Lima Souza - RA 10482416915
import React, { useState, useEffect } from 'react';
import TabelaMedicamentos from '../components/medicamentos/TabelaMedicamentos';
import ModalCadastroMedicamento from '../components/medicamentos/ModalCadastroMedicamento';
import ModalEditarMedicamento from '../components/medicamentos/ModalEditarMedicamento';
import ModalExclusaoMedicamento from '../components/medicamentos/ModalExclusaoMedicamento';
import { MedicamentoService } from '../services/MedicamentoService';
import './GerenciarMedicamentos.css';

const GerenciarMedicamentos = () => {
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [nomeFiltro, setNomeFiltro] = useState('');

  const [medicamentos, setMedicamentos] = useState(() => {
    const dadosSalvos = MedicamentoService.obterTodos();
    return dadosSalvos.length > 0 ? dadosSalvos : [
      { id: 1, nome: 'Paracetamol 750mg com 20 Comprimidos Genérico EMS', tipo: 'Comprimido', quantidade: 10, validade: '10/2026' },
      { id: 2, nome: 'Dipirona 500mg 10 Comprimidos EMS', tipo: 'Comprimido', quantidade: 15, validade: '08/2026' },
      { id: 3, nome: 'Amoxicilina 500mg 21 Cápsulas', tipo: 'Cápsula', quantidade: 8, validade: '12/2025' },
      { id: 4, nome: 'Nimesulida 100mg 12 Comprimidos', tipo: 'Comprimido', quantidade: 5, validade: '05/2026' },
      { id: 5, nome: 'Ibuprofeno 50mg/mL Gotas 20mL', tipo: 'Gotas', quantidade: 2, validade: '09/2025' },
      { id: 6, nome: 'Loratadina 10mg 12 Comprimidos', tipo: 'Comprimido', quantidade: 7, validade: '04/2027' },
      { id: 7, nome: 'Xarope de Guaco 100ml Herbarium', tipo: 'Xarope', quantidade: 3, validade: '02/2025' },
      { id: 8, nome: 'Xarope Vick Mel 120ml', tipo: 'Xarope', quantidade: 2, validade: '01/2025' },
      { id: 9, nome: 'Nebacetin Pomada 15g', tipo: 'Pomada', quantidade: 1, validade: '11/2025' },
      { id: 10, nome: 'Andolba Creme para Dores Musculares 60g', tipo: 'Pomada', quantidade: 1, validade: '06/2026' },
    ];
  });

  useEffect(() => {
    MedicamentoService.salvarTodos(medicamentos);
  }, [medicamentos]);

  const [isModalCadastroOpen, setIsModalCadastroOpen] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);

  const [medSelecionado, setMedSelecionado] = useState(null);

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

  const handleCadastrar = (novoMedicamento) => {
    const novoId = medicamentos.length > 0 ? Math.max(...medicamentos.map(m => m.id)) + 1 : 1;
    setMedicamentos([...medicamentos, { ...novoMedicamento, id: novoId }]);
    setIsModalCadastroOpen(false);
  };

  const salvarEdicao = (medAtualizado) => {
    setMedicamentos((prev) =>
      prev.map((med) => (med.id === medAtualizado.id ? medAtualizado : med))
    );
    fecharModais();
  };

  const confirmarExclusao = () => {
    setMedicamentos((prev) => prev.filter((med) => med.id !== medSelecionado.id));
    fecharModais();
  };

  const medicamentosFiltrados = medicamentos.filter((med) => {
    const filtroTipo = tipoFiltro === 'todos' || med.tipo === tipoFiltro;
    const filtroNome = med.nome.toLowerCase().includes(nomeFiltro.toLowerCase());
    return filtroTipo && filtroNome;
  });

  return (
    <div className="page-container">
      <h2 className="titulo">Gerenciar Medicamentos</h2>

      <div className="top-bar">
        <button
          className="btn-cadastrar" onClick={() => setIsModalCadastroOpen(true)}>
          Cadastrar Medicamento
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
    </div>
  );
};

export default GerenciarMedicamentos;
