import ConfirmModal from '../common/ConfirmModal';

const ModalConfirmacao = ({ onClose, onConfirm, mensagem }) => {
  return (
    <ConfirmModal
      show={true}
      onHide={onClose}
      onConfirm={onConfirm}
      title="Confirmação"
      message={mensagem}
      variant="info"
      confirmLabel="Confirmar"
      cancelLabel="Cancelar"
    />
  );
};

export default ModalConfirmacao;