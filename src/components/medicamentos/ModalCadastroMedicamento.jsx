import { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import FormModal from '../common/FormModal';
import { UnidadeMedidaService } from '../../services/unidadesMedidaService.js';

const ModalCadastroMedicamento = ({ isOpen, onClose, onCadastrar }) => {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    quantidade: '',
    unidadeMedida: '' // Mantido
  });

  const [errors, setErrors] = useState({});
  const [unidadesMedida, setUnidadesMedida] = useState([]);

  useEffect(() => {
    const carregarUnidadesMedida = async () => {
      try {
        const dados = await UnidadeMedidaService.obterTodas();
        setUnidadesMedida(dados);
      } catch (error) {
        console.error('Erro ao carregar unidades de medida:', error);
      }
    };

    carregarUnidadesMedida();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <FormModal
      show={isOpen}
      onHide={onClose}
      onSubmit={() => onCadastrar(formData)}
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
            <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{errors.tipo}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{errors.quantidade}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Unidade de Medida *</Form.Label>
            <Form.Control
              as="select"
              name="unidade_medida_id"
              value={formData.unidade_medida_id || ''}
              onChange={(e) => setFormData({ ...formData, unidade_medida_id: e.target.value })}
              isInvalid={!!errors.unidade_medida_id}
            >
              <option value="">Selecione...</option>
              {unidadesMedida.map((unidade) => (
                <option key={unidade.id} value={unidade.id}>
                  {unidade.nome} ({unidade.sigla})
                </option>
              ))}
            </Form.Control>

            <Form.Control.Feedback type="invalid">{errors.unidadeMedida}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </FormModal>
  );
};

export default ModalCadastroMedicamento;