//Aldruin Bonfim de Lima Souza - RA 10482416915
import React from 'react';
import './modal.css';

const ModalConfirmacao = ({ onClose, onConfirm, mensagem }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirmação</h3>
        <p>{mensagem}</p>
        <div className="modal-buttons">
          <button className="btn-confirmar" onClick={onConfirm}>Confirmar</button>
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacao;