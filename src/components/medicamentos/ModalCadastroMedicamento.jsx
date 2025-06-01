import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import FormModal from '../common/FormModal';

const ModalCadastroMedicamento = ({ isOpen, onClose, onCadastrar }) => {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    quantidade: '',
    validade: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.tipo.trim()) {
      newErrors.tipo = 'Tipo é obrigatório';
    }
    
    if (!formData.quantidade || parseInt(formData.quantidade) <= 0) {
      newErrors.quantidade = 'Quantidade deve ser maior que zero';
    }
    
    if (!formData.validade) {
      newErrors.validade = 'Validade é obrigatória';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const validadeFormatada = formData.validade
      ? formData.validade.split('-').reverse().join('/')
      : '';

    const novoMedicamento = {
      id: Date.now(),
      nome: formData.nome,
      tipo: formData.tipo,
      quantidade: parseInt(formData.quantidade),
      validade: validadeFormatada,
    };

    await onCadastrar(novoMedicamento);
    onClose();

    setFormData({
      nome: '',
      tipo: '',
      quantidade: '',
      validade: ''
    });
    setErrors({});
  };

  return (
    <FormModal
      show={isOpen}
      onHide={onClose}
      onSubmit={handleSubmit}
      title="Cadastrar Medicamento"
      size="md"
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
              min="1"
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

export default ModalCadastroMedicamento;