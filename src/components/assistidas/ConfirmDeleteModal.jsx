import ConfirmModal from '../common/ConfirmModal';
import PropTypes from 'prop-types';

const ConfirmDeleteModal = ({ show, onHide, onConfirm, assistida, loading }) => {
  if (!assistida) return null;

  const detailsContent = (
    <div>
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '10px'
      }}>
        <strong>{assistida.nome}</strong><br />
        <small className="text-muted">CPF: {assistida.cpf}</small><br />
        <small className="text-muted">Status: {assistida.status}</small>
      </div>
    </div>
  );

  return (
    <ConfirmModal
      show={show}
      onHide={onHide}
      onConfirm={onConfirm}
      title="Confirmar Exclusão"
      message={`Tem certeza que deseja excluir a assistida "${assistida.nome}"? Esta ação não pode ser desfeita.`}
      variant="delete"
      confirmLabel="Excluir Assistida"
      cancelLabel="Cancelar"
      loading={loading}
      details={detailsContent}
    />
  );
};

ConfirmDeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  assistida: PropTypes.object,
  loading: PropTypes.bool
};

ConfirmDeleteModal.defaultProps = {
  assistida: null,
  loading: false
};

export default ConfirmDeleteModal;