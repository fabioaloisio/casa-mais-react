//Aldruin Bonfim de Lima Souza - RA 10482416915
import React, { useState } from 'react';
import './modal.css';
import { FaRegCalendarAlt } from 'react-icons/fa';

const ModalCadastroMedicamento = ({ isOpen, onClose, onCadastrar }) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [validade, setValidade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const validadeFormatada = validade
      ? validade.split('-').reverse().join('/')
      : '';

    const novoMedicamento = {
      id: Date.now(),
      nome,
      tipo,
      quantidade: parseInt(quantidade),
      validade: validadeFormatada,
    };

    onCadastrar(novoMedicamento);
    onClose();

    setNome('');
    setTipo('');
    setQuantidade('');
    setValidade('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Cadastrar Medicamento</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do medicamento"
            required
          />

          <label>Tipo:</label>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            placeholder="Digite o tipo do medicamento"
            required
          />

          <label>Quantidade:</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Informe a quantidade"
            required
          />

          <label>Validade:</label>
          <input
            type="month"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            required
          />
          <FaRegCalendarAlt
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: '#3b82f6',
              fontSize: '20px',
            }}
          />

          <div className="modal-buttons">
            <button type="submit" className="btn-salvar">Cadastrar</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCadastroMedicamento;