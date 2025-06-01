//Aldruin Bonfim de Lima Souza - RA 10482416915
import React, { useState, useEffect } from 'react';
import './modal.css';

const ModalEditarMedicamento = ({ medicamento, onClose, onSave }) => {
  const [form, setForm] = useState({ ...medicamento });
  const [erro, setErro] = useState('');

  useEffect(() => {
    setForm({ ...medicamento });
    setErro('');
  }, [medicamento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nome.trim()) {
      setErro('O nome do medicamento é obrigatório.');
      return;
    }
    if (!form.tipo.trim()) {
      setErro('O tipo é obrigatório.');
      return;
    }
    if (!form.validade.trim()) {
      setErro('A validade é obrigatória.');
      return;
    }
    if (form.quantidade === '' || Number(form.quantidade) < 0) {
      setErro('A quantidade deve ser um número maior ou igual a zero.');
      return;
    }

    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Editar Medicamento</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome"
          />
          <input
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            placeholder="Tipo"
          />
          <input
            name="quantidade"
            value={form.quantidade}
            onChange={handleChange}
            placeholder="Quantidade"
            type="number"
          />
          <input
            name="validade"
            value={form.validade}
            onChange={handleChange}
            placeholder="Validade"
          />

          {erro && <p className="erro">{erro}</p>}

          <div className="modal-buttons">
            <button type="submit" className="btn-salvar">
              Salvar
            </button>
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarMedicamento;