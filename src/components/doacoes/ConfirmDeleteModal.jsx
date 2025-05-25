import { Modal, Button } from 'react-bootstrap';
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa';

const ConfirmDeleteModal = ({ show, onHide, onConfirm, doacao }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2">
          <FaExclamationTriangle className="text-warning" />
          Confirmar Exclusão
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <FaTrash size={48} className="text-danger mb-3" />
          <h5>Tem certeza que deseja excluir esta doação?</h5>
          {doacao && (
            <div className="mt-3 p-3 bg-light rounded">
              <p className="mb-1"><strong>Doador:</strong> {doacao.nomeDoador}</p>
              <p className="mb-1"><strong>Valor:</strong> R$ {doacao.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              <p className="mb-0"><strong>Data:</strong> {new Date(doacao.dataDoacao).toLocaleDateString('pt-BR')}</p>
            </div>
          )}
          <p className="text-muted mt-3 mb-0">
            Esta ação não pode ser desfeita.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button 
          variant="danger" 
          onClick={onConfirm}
          className="d-flex align-items-center gap-2"
        >
          <FaTrash /> Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;