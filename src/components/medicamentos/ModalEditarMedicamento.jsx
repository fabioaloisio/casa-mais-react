import { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import FormModal from '../common/FormModal';
import useUnsavedChanges from '../common/useUnsavedChanges';

const ModalEditarMedicamento = ({ medicamento, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    quantidade: '',
    validade: ''
  });
  const [errors, setErrors] = useState({});
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    if (medicamento) {
      // Converter validade para formato de input date (YYYY-MM-DD)
      let validadeFormatada = '';
      if (medicamento.validade) {
        // Se vier do backend como ISO string
        if (medicamento.validade.includes('T')) {
          validadeFormatada = medicamento.validade.split('T')[0];
        } 
        // Se vier no formato DD/MM/YYYY
        else if (medicamento.validade.includes('/')) {
          const [dia, mes, ano] = medicamento.validade.split('/');
          if (dia && mes && ano) {
            validadeFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
          }
        }
      }
      
      const dadosIniciais = {
        ...medicamento,
        validade: validadeFormatada
      };
      setFormData(dadosIniciais);
      setInitialData(dadosIniciais);
      setErrors({});
    }
  }, [medicamento]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'O nome do medicamento é obrigatório';
    }
    
    if (!formData.tipo.trim()) {
      newErrors.tipo = 'O tipo é obrigatório';
    }
    
    if (!formData.quantidade || Number(formData.quantidade) < 0) {
      newErrors.quantidade = 'A quantidade deve ser maior ou igual a zero';
    }
    
    if (!formData.validade) {
      newErrors.validade = 'A validade é obrigatória';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Converter validade de volta para MM/YYYY
    const validadeFormatada = formData.validade
      ? formData.validade.split('-').reverse().join('/')
      : '';

    const medicamentoAtualizado = {
      ...formData,
      quantidade: Number(formData.quantidade),
      validade: validadeFormatada
    };

    await onSave(medicamentoAtualizado);
  };

  const { hasUnsavedChanges, confirmClose } = useUnsavedChanges(initialData, formData);

  const handleClose = () => {
    confirmClose(onClose);
  };

  if (!medicamento) return null;

  return (
    <FormModal
      show={true}
      onHide={handleClose}
      onSubmit={handleSubmit}
      title="Editar Medicamento"
      size="md"
      submitLabel="Salvar"
      validated={Object.keys(errors).length > 0}
    >
      <Row className="mb-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Nome do Medicamento *</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Digite o nome do medicamento"
              isInvalid={!!errors.nome}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nome}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Tipo *</Form.Label>
            <Form.Control
              type="text"
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              placeholder="Ex: Comprimido, Xarope, etc."
              isInvalid={!!errors.tipo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.tipo}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Quantidade *</Form.Label>
            <Form.Control
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleInputChange}
              placeholder="Informe a quantidade"
              min="0"
              isInvalid={!!errors.quantidade}
            />
            <Form.Control.Feedback type="invalid">
              {errors.quantidade}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Validade *</Form.Label>
            <Form.Control
              type="date"
              name="validade"
              value={formData.validade}
              onChange={handleInputChange}
              min={new Date().toISOString().slice(0, 10)}
              isInvalid={!!errors.validade}
            />
            <Form.Control.Feedback type="invalid">
              {errors.validade}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </FormModal>
  );
};

export default ModalEditarMedicamento;