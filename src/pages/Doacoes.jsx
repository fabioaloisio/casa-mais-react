import { useState, useEffect } from 'react';
import { Button, Table, Form, Card, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaDollarSign, FaUsers, FaBuilding, FaChartLine } from 'react-icons/fa';
import doacoesService from '../services/doacoesService';
import { formatCPF, formatCNPJ, formatCurrency } from '../utils/masks';
import DoacaoModal from '../components/doacoes/DoacaoModal';
import ConfirmDeleteModal from '../components/doacoes/ConfirmDeleteModal';
import Toast from '../components/common/Toast';
import { initializeSampleData } from '../utils/sampleData';
import './Doacoes.css';

const Doacoes = () => {
  const [doacoes, setDoacoes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [doacaoEdit, setDoacaoEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [doacaoToDelete, setDoacaoToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  const [stats, setStats] = useState({
    totalDoacoes: 0,
    valorTotal: 0,
    totalPessoaFisica: 0,
    totalPessoaJuridica: 0
  });

  // Carregar doações ao montar o componente
  useEffect(() => {
    initializeSampleData(); // Inicializar com dados de exemplo se necessário
    loadDoacoes();
  }, []);

  const loadDoacoes = () => {
    const allDoacoes = doacoesService.getAll();
    setDoacoes(allDoacoes);
    setStats(doacoesService.getStats());
  };

  const handleShowModal = (doacao = null) => {
    setDoacaoEdit(doacao);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDoacaoEdit(null);
  };

  const handleSaveDoacao = (doacaoData) => {
    // Usar setTimeout para garantir que o feedback visual apareça
    setTimeout(() => {
      try {
        if (doacaoEdit) {
          doacoesService.update(doacaoEdit.id, doacaoData);
          setToast({
            show: true,
            message: 'Doação atualizada com sucesso!',
            type: 'success'
          });
        } else {
          doacoesService.create(doacaoData);
          setToast({
            show: true,
            message: 'Nova doação cadastrada com sucesso!',
            type: 'success'
          });
        }
        loadDoacoes();
        handleCloseModal();
      } catch (error) {
        setToast({
          show: true,
          message: 'Erro ao salvar doação. Tente novamente.',
          type: 'warning'
        });
        // Se houver erro, também fechar o modal para resetar o estado
        handleCloseModal();
      }
    }, 500); // 500ms de delay para mostrar o feedback
  };

  const handleShowDeleteModal = (doacao) => {
    setDoacaoToDelete(doacao);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDoacaoToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (doacaoToDelete) {
      try {
        doacoesService.delete(doacaoToDelete.id);
        setToast({
          show: true,
          message: 'Doação excluída com sucesso!',
          type: 'success'
        });
        loadDoacoes();
        handleCloseDeleteModal();
      } catch (error) {
        setToast({
          show: true,
          message: 'Erro ao excluir doação. Tente novamente.',
          type: 'warning'
        });
      }
    }
  };

  const formatDocumento = (documento, tipo) => {
    if (!documento) return '';
    return tipo === 'PF' ? formatCPF(documento) : formatCNPJ(documento);
  };

  const doacoesFiltradas = doacoes.filter(doacao => {
    const searchTerm = filtro.toLowerCase();
    return (
      doacao.nomeDoador.toLowerCase().includes(searchTerm) ||
      doacao.documento.includes(searchTerm) ||
      (doacao.email && doacao.email.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="conteudo">
      <div className="topo">
        <h1>Gestão de Doações</h1>
        <p>
          Gerencie as doações recebidas pela instituição. Aqui você pode cadastrar novos doadores,
          registrar doações monetárias e acompanhar o histórico de contribuições.
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="stats-card">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted mb-1">Total de Doações</h6>
                <h3 className="mb-0">{stats.totalDoacoes}</h3>
              </div>
              <FaChartLine size={30} className="text-primary" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stats-card">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted mb-1">Valor Total</h6>
                <h3 className="mb-0">{formatCurrency(stats.valorTotal)}</h3>
              </div>
              <FaDollarSign size={30} className="text-success" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stats-card">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted mb-1">Pessoa Física</h6>
                <h3 className="mb-0">{stats.totalPessoaFisica}</h3>
              </div>
              <FaUsers size={30} className="text-info" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stats-card">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted mb-1">Pessoa Jurídica</h6>
                <h3 className="mb-0">{stats.totalPessoaJuridica}</h3>
              </div>
              <FaBuilding size={30} className="text-warning" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Barra de ações */}
      <div className="filtros mb-4">
        <Button 
          className="azul d-flex align-items-center gap-2"
          onClick={() => handleShowModal()}
        >
          <FaPlus /> Nova Doação
        </Button>

        <div className="d-flex align-items-center gap-2">
          <FaSearch className="text-muted" />
          <Form.Control
            type="text"
            placeholder="Filtrar por nome, documento ou email..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            id="filtroUsuario"
          />
        </div>
      </div>

      {/* Tabela de doações */}
      <div className="tabela-container">
        <Table className="tabela-assistidas" hover responsive>
          <thead>
            <tr>
              <th>Data</th>
              <th>Doador</th>
              <th>Tipo</th>
              <th>Documento</th>
              <th>Contato</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {doacoesFiltradas.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  <div className="text-muted">
                    <p className="mb-0">Nenhuma doação cadastrada</p>
                    <small>Clique em "Nova Doação" para começar</small>
                  </div>
                </td>
              </tr>
            ) : (
              doacoesFiltradas.map(doacao => (
                <tr key={doacao.id}>
                  <td>
                    {new Date(doacao.dataDoacao).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="fw-medium">{doacao.nomeDoador}</td>
                  <td>
                    <span className={`status ${doacao.tipoDoador === 'PF' ? 'tratamento' : 'ativa'}`}>
                      {doacao.tipoDoador === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                    </span>
                  </td>
                  <td className="text-muted">{formatDocumento(doacao.documento, doacao.tipoDoador)}</td>
                  <td>
                    <div>{doacao.telefone}</div>
                    {doacao.email && (
                      <small className="text-muted">{doacao.email}</small>
                    )}
                  </td>
                  <td className="text-end fw-bold text-success">
                    {formatCurrency(doacao.valor)}
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button 
                        className="d-flex align-items-center gap-1 btn-outline-custom btn-sm fs-7"
                        onClick={() => handleShowModal(doacao)}
                      >
                        <FaEdit /> Editar
                      </Button>
                      <Button 
                        className="d-flex align-items-center gap-1 btn-sm fs-7"
                        variant="outline-danger"
                        onClick={() => handleShowDeleteModal(doacao)}
                      >
                        <FaTrash /> Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal de cadastro/edição */}
      <DoacaoModal
        show={showModal}
        onHide={handleCloseModal}
        onSave={handleSaveDoacao}
        doacao={doacaoEdit}
      />

      {/* Modal de confirmação de exclusão */}
      <ConfirmDeleteModal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        doacao={doacaoToDelete}
      />

      {/* Toast de notificação */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default Doacoes;