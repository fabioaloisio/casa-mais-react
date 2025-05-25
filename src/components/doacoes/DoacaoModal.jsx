import { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { validateDoacaoForm } from '../../utils/validations';
import { maskCurrency, parseCurrency } from '../../utils/masks';

const DoacaoModal = ({ show, onHide, onSave, doacao }) => {
  const [formData, setFormData] = useState({
    tipoDoador: 'PF',
    nomeDoador: '',
    documento: '',
    email: '',
    telefone: '',
    valor: '',
    dataDoacao: new Date().toISOString().split('T')[0],
    observacoes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (show) {
      // Sempre resetar o estado de submissão quando o modal abre
      setIsSubmitting(false);
      setErrors({});
      
      if (doacao) {
        setFormData({
          tipoDoador: doacao.tipoDoador || 'PF',
          nomeDoador: doacao.nomeDoador || '',
          documento: doacao.documento || '',
          email: doacao.email || '',
          telefone: doacao.telefone || '',
          endereco: doacao.endereco || '',
          cidade: doacao.cidade || '',
          estado: doacao.estado || '',
          cep: doacao.cep || '',
          valor: doacao.valor ? `R$ ${doacao.valor.toFixed(2).replace('.', ',')}` : '',
          dataDoacao: doacao.dataDoacao ? doacao.dataDoacao.split('T')[0] : new Date().toISOString().split('T')[0],
          observacoes: doacao.observacoes || ''
        });
      } else {
        setFormData({
          tipoDoador: 'PF',
          nomeDoador: '',
          documento: '',
          email: '',
          telefone: '',
          valor: '',
          dataDoacao: new Date().toISOString().split('T')[0],
          observacoes: ''
        });
      }
    } else {
      // Quando o modal fecha, resetar estados
      setIsSubmitting(false);
      setErrors({});
    }
  }, [doacao, show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Se mudou o tipo de doador, limpa o documento para aplicar nova máscara
    if (name === 'tipoDoador') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        documento: '' // Limpa o documento quando muda o tipo
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleValorChange = (e) => {
    maskCurrency(e);
    setFormData(prev => ({
      ...prev,
      valor: e.target.value
    }));
  };

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    if (value.length > 11) {
      value = value.slice(0, 11); // Limita a 11 dígitos
    }
    
    // Aplica a máscara baseada no tamanho
    if (value.length >= 11) {
      // (99) 99999-9999
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 7) {
      // (99) 9999-9999 ou (99) 99999-999
      if (value.length === 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else {
        value = value.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
      }
    } else if (value.length >= 3) {
      // (99) 9999
      value = value.replace(/(\d{2})(\d+)/, '($1) $2');
    } else if (value.length >= 1) {
      // (99
      value = value.replace(/(\d+)/, '($1');
    }
    
    setFormData(prev => ({
      ...prev,
      telefone: value
    }));
    
    // Limpar erro do campo
    if (errors.telefone) {
      setErrors(prev => ({
        ...prev,
        telefone: ''
      }));
    }
  };

  const handleDocumentoChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    if (formData.tipoDoador === 'PF') {
      // CPF: 999.999.999-99
      if (value.length > 11) {
        value = value.slice(0, 11);
      }
      if (value.length >= 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
      } else if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
      } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d+)/, '$1.$2');
      }
    } else {
      // CNPJ: 99.999.999/9999-99
      if (value.length > 14) {
        value = value.slice(0, 14);
      }
      if (value.length >= 12) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, '$1.$2.$3/$4-$5');
      } else if (value.length >= 8) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
      } else if (value.length >= 5) {
        value = value.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
      } else if (value.length >= 2) {
        value = value.replace(/(\d{2})(\d+)/, '$1.$2');
      }
    }
    
    setFormData(prev => ({
      ...prev,
      documento: value
    }));
    
    // Limpar erro do campo
    if (errors.documento) {
      setErrors(prev => ({
        ...prev,
        documento: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateDoacaoForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const dataToSave = {
      ...formData,
      documento: formData.documento.replace(/\D/g, ''),
      valor: parseCurrency(formData.valor)
    };

    // Chamar onSave diretamente, sem try-catch
    onSave(dataToSave);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{doacao ? 'Editar Doação' : 'Nova Doação'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Debug temporário */}
        {false && (
          <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '10px', fontSize: '12px' }}>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          {/* Tipo de Doador e Data */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Tipo de Doador *</Form.Label>
                <Form.Select
                  name="tipoDoador"
                  value={formData.tipoDoador}
                  onChange={handleInputChange}
                  isInvalid={!!errors.tipoDoador}
                >
                  <option value="PF">Pessoa Física</option>
                  <option value="PJ">Pessoa Jurídica</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.tipoDoador}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Data da Doação *</Form.Label>
                <Form.Control
                  type="date"
                  name="dataDoacao"
                  value={formData.dataDoacao}
                  onChange={handleInputChange}
                  isInvalid={!!errors.dataDoacao}
                  max={new Date().toISOString().split('T')[0]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dataDoacao}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Nome e Documento */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nome do Doador *</Form.Label>
                <Form.Control
                  type="text"
                  name="nomeDoador"
                  value={formData.nomeDoador}
                  onChange={handleInputChange}
                  isInvalid={!!errors.nomeDoador}
                  placeholder="Nome completo ou razão social"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nomeDoador}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>{formData.tipoDoador === 'PF' ? 'CPF' : 'CNPJ'} *</Form.Label>
                <Form.Control
                  type="text"
                  name="documento"
                  value={formData.documento}
                  onChange={handleDocumentoChange}
                  isInvalid={!!errors.documento}
                  placeholder={formData.tipoDoador === 'PF' ? 'Digite apenas os números do CPF' : 'Digite apenas os números do CNPJ'}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.documento}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Email e Telefone */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isInvalid={!!errors.email}
                  placeholder="email@exemplo.com"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Telefone *</Form.Label>
                <Form.Control
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleTelefoneChange}
                  isInvalid={!!errors.telefone}
                  placeholder="Digite apenas os números"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.telefone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Valor e Observações */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Valor da Doação *</Form.Label>
                <Form.Control
                  type="text"
                  name="valor"
                  value={formData.valor}
                  onChange={handleValorChange}
                  isInvalid={!!errors.valor}
                  placeholder="R$ 0,00"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.valor}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Observações</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleInputChange}
                  placeholder="Observações adicionais..."
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="d-flex align-items-center gap-2"
        >
          {isSubmitting && <Spinner animation="border" size="sm" />}
          {isSubmitting ? 'Salvando...' : (doacao ? 'Atualizar' : 'Cadastrar')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DoacaoModal;