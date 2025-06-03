import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Col, Form, Modal, Row, Table, Alert, ProgressBar } from "react-bootstrap";
import { IMaskInput } from "react-imask";
import PropTypes from 'prop-types';
import { formatDataForInput, calcularIdadePorDataNascimento } from "../../utils/masks";
import { FaUser, FaHome, FaMedkit, FaHeartbeat, FaCheck, FaExclamationTriangle } from 'react-icons/fa';


const Formulario = ({ showModal, setShowModal, onSubmit, assistidaParaEditar, modoEdicao }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ status: 'Ativa' });
    const [formErrors, setFormErrors] = useState({});
    const [initialData, setInitialData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [completedSteps, setCompletedSteps] = useState([]);

    // Função para normalizar dados do formulário (apenas campos relevantes)
    const normalizeFormData = (data) => {
        const formFields = [
            'nome', 'cpf', 'rg', 'idade', 'data_nascimento', 'nacionalidade',
            'estado_civil', 'profissao', 'escolaridade', 'status',
            'logradouro', 'bairro', 'numero', 'cep', 'estado', 'cidade',
            'telefone', 'telefone_contato',
            'data_atendimento', 'hora', 'historia_patologica', 'usuaria_drogas',
            'quantidade_drogas', 'tempo_sem_uso', 'uso_medicamentos', 'quantidade_medicamentos',
            'internada', 'quantidade_internacoes', 'motivacao_internacoes',
            'fatos_marcantes', 'infancia', 'adolescencia'
        ];

        const normalized = {};
        formFields.forEach(field => {
            if (field === 'nacionalidade' && !data[field]) {
                normalized[field] = 'Brasileira';
            } else {
                normalized[field] = data[field] || '';
            }
        });

        // Adicionar campos dinâmicos de drogas
        if (data.quantidade_drogas) {
            const qtd = parseInt(data.quantidade_drogas) || 0;
            for (let i = 1; i <= qtd; i++) {
                ['tipo', 'idade', 'tempo', 'intensidade'].forEach(campo => {
                    const fieldName = `droga${i}_${campo}`;
                    normalized[fieldName] = data[fieldName] || '';
                });
            }
        }

        // Adicionar campos dinâmicos de internações
        if (data.quantidade_internacoes) {
            const qtd = parseInt(data.quantidade_internacoes) || 0;
            for (let i = 1; i <= qtd; i++) {
                ['local', 'duracao', 'data'].forEach(campo => {
                    const fieldName = `${campo}${i}`;
                    normalized[fieldName] = data[fieldName] || '';
                });
            }
        }

        // Adicionar campos dinâmicos de medicamentos
        if (data.quantidade_medicamentos) {
            const qtd = parseInt(data.quantidade_medicamentos) || 0;
            for (let i = 1; i <= qtd; i++) {
                ['nome', 'dosagem', 'frequencia'].forEach(campo => {
                    const fieldName = `medicamento${i}_${campo}`;
                    normalized[fieldName] = data[fieldName] || '';
                });
            }
        }

        return normalized;
    };

    const handleClose = () => {
        setShowModal(false);
    };

    // Efeito para carregar dados da assistida quando está editando
    useEffect(() => {
        if (showModal) {
            if (modoEdicao && assistidaParaEditar) {
                // Carregar dados da assistida para edição
                const dadosFormatados = {
                    ...assistidaParaEditar,
                    // Formatar data de nascimento para input date
                    data_nascimento: formatDataForInput(assistidaParaEditar.data_nascimento),
                    data_atendimento: formatDataForInput(assistidaParaEditar.data_atendimento)
                };
                const dadosNormalizados = normalizeFormData(dadosFormatados);
                setFormData(dadosNormalizados);
                setInitialData(dadosNormalizados);
                setCompletedSteps([]);
            } else {
                // Limpar formulário para novo cadastro
                const dadosIniciais = normalizeFormData({ status: 'Ativa' });
                setFormData(dadosIniciais);
                setInitialData(dadosIniciais);
                setCompletedSteps([]);
            }
        }
    }, [modoEdicao, assistidaParaEditar, showModal]);

    // Limpar formulário quando fechar o modal
    useEffect(() => {
        if (!showModal) {
            setStep(1);
            setFormErrors({});
            setCompletedSteps([]);
            if (!modoEdicao) {
                setFormData({ status: 'Ativa' });
            }
        }
    }, [showModal, modoEdicao]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const newData = { ...prev, [name]: value };

            // Auto-calcular idade quando data de nascimento mudar
            if (name === 'data_nascimento' && value) {
                const idade = calcularIdadePorDataNascimento(value);
                if (idade) {
                    newData.idade = idade.toString();
                }
            }

            // Limpar erro do campo quando ele for preenchido
            if (formErrors[name]) {
                setFormErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[name];
                    return newErrors;
                });
            }

            return newData;
        });
    };

    const handleMaskChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const validateStep = () => {
        const errors = {};

        if (step === 1) {
            ["nome", "cpf", "rg", "idade", "data_nascimento", "nacionalidade", "estado_civil", "profissao", "escolaridade"].forEach((field) => {
                if (!formData[field]) errors[field] = "Campo obrigatório";
            });
        }

        if (step === 2) {
            ["logradouro", "bairro", "numero", "cep", "estado", "cidade", "telefone"].forEach((field) => {
                if (!formData[field]) errors[field] = "Campo obrigatório";
            });
        }

        if (step === 3) {
            const camposObrigatorios = ["data_atendimento", "hora", "historia_patologica"];
            camposObrigatorios.forEach((field) => {
                if (!formData[field]) errors[field] = "Campo obrigatório";
            });

            // Validar se os campos de sim/não foram preenchidos
            if (!formData.usuaria_drogas) {
                errors["usuaria_drogas"] = "Campo obrigatório";
            }

            if (!formData.uso_medicamentos) {
                errors["uso_medicamentos"] = "Campo obrigatório";
            }

            // Se usuária de drogas, validar campos relacionados
            if (formData.usuaria_drogas === "sim") {
                if (!formData.quantidade_drogas || parseInt(formData.quantidade_drogas) < 1) {
                    errors["quantidade_drogas"] = "Informe a quantidade";
                } else {
                    const quantidade = parseInt(formData.quantidade_drogas);
                    for (let i = 1; i <= quantidade; i++) {
                        ["tipo", "idade", "tempo", "intensidade"].forEach((campo) => {
                            const field = `droga${i}_${campo}`;
                            if (!formData[field]) {
                                errors[field] = "Campo obrigatório";
                            }
                        });
                    }
                }

                if (!formData.tempo_sem_uso) {
                    errors["tempo_sem_uso"] = "Campo obrigatório";
                }
            }

            // Se usa medicamentos, validar campos relacionados
            if (formData.uso_medicamentos === "sim") {
                if (!formData.quantidade_medicamentos || parseInt(formData.quantidade_medicamentos) < 1) {
                    errors["quantidade_medicamentos"] = "Informe a quantidade de medicamentos";
                } else {
                    const quantidade = parseInt(formData.quantidade_medicamentos);
                    for (let i = 1; i <= quantidade; i++) {
                        const nomeField = `medicamento${i}_nome`;
                        if (!formData[nomeField]) {
                            errors[nomeField] = "Nome do medicamento é obrigatório";
                        }
                    }
                }
            }
        }

        // if (step === 4) {
        //     if (formData.internada === "sim") {
        //         if (!formData.quantidade_internacoes || parseInt(formData.quantidade_internacoes) < 1) {
        //             errors["quantidade_internacoes"] = "Campo obrigatório";
        //         } else {
        //             const quantidade = parseInt(formData.quantidade_internacoes);
        //             if (isNaN(quantidade) || quantidade <= 0) {
        //                 errors["quantidade_internacoes"] = "Informe um número válido";
        //             } else {
        //                 for (let i = 1; i <= quantidade; i++) {
        //                     ["local", "duracao", "data"].forEach((campo) => {
        //                         const field = `${campo}${i}`;
        //                         if (!formData[field]) {
        //                             errors[field] = "Campo obrigatório";
        //                         }
        //                     });
        //                 }
        //             }
        //         }

        //         if (!formData.motivacao_internacoes) {
        //             errors["motivacao_internacoes"] = "Campo obrigatório";
        //         }
        //     }
        // }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleNext = () => {
        if (validateStep()) {
            setCompletedSteps(prev => [...new Set([...prev, step])]);
            nextStep();
        }
    };

    const handleStepClick = (targetStep) => {
        if (targetStep > step) {
            if (validateStep()) {
                setStep(targetStep);
            }
        } else {
            setStep(targetStep);
        }
    };

    const validateAllSteps = () => {
        const errors = {};
        const steps = {
            1: ["nome", "cpf", "rg", "idade", "data_nascimento", "nacionalidade", "estado_civil", "profissao", "escolaridade"],
            2: ["logradouro", "bairro", "numero", "cep", "estado", "cidade", "telefone"],
            3: ["data_atendimento", "hora", "historia_patologica"],
        };

        let firstErrorStep = null;

        for (const [stepNumber, fields] of Object.entries(steps)) {
            for (const field of fields) {
                if (!formData[field]) {
                    errors[field] = "Campo obrigatório";
                    if (!firstErrorStep) firstErrorStep = parseInt(stepNumber);
                }
            }
        }

        // Validação específica do passo 4
        if (formData.internada === "sim") {
            if (!formData.quantidade_internacoes || formData.quantidade_internacoes.trim() === "") {
                errors["quantidade_internacoes"] = "Campo obrigatório";
                if (!firstErrorStep) firstErrorStep = 4;
            } else {
                const quantidade = parseInt(formData.quantidade_internacoes, 10);
                if (isNaN(quantidade) || quantidade <= 0) {
                    errors["quantidade_internacoes"] = "Informe um número válido";
                    if (!firstErrorStep) firstErrorStep = 4;
                } else {
                    for (let i = 1; i <= quantidade; i++) {
                        ["local", "duracao", "data"].forEach((campo) => {
                            const field = `${campo}${i}`;
                            if (!formData[field]) {
                                errors[field] = "Campo obrigatório";
                                if (!firstErrorStep) firstErrorStep = 4;
                            }
                        });
                    }
                }
            }
        }

        setFormErrors(errors);
        if (firstErrorStep) setStep(firstErrorStep);

        return Object.keys(errors).length === 0;
    };


    const campos = [
        "fatos_marcantes",
        "infancia",
        "adolescencia"
    ];

    const formatarFormDataParaEnvio = (data) => {
        const assistida = { ...data };

        // Transformar drogas
        if (data.usuaria_drogas === "sim" && parseInt(data.quantidade_drogas) > 0) {
            assistida.drogas = Array.from({ length: parseInt(data.quantidade_drogas) }, (_, i) => {
                const index = i + 1;
                return {
                    tipo: data[`droga${index}_tipo`] || '',
                    idade_inicio: data[`droga${index}_idade`] || '',
                    tempo_uso: data[`droga${index}_tempo`] || '',
                    intensidade: data[`droga${index}_intensidade`] || '',
                };
            });
        } else {
            assistida.drogas = [];
        }

        // Transformar medicamentos
        if (data.uso_medicamentos === "sim" && parseInt(data.quantidade_medicamentos) > 0) {
            assistida.medicamentos = Array.from({ length: parseInt(data.quantidade_medicamentos) }, (_, i) => {
                const index = i + 1;
                return {
                    nome: data[`medicamento${index}_nome`] || '',
                    dosagem: data[`medicamento${index}_dosagem`] || '',
                    frequencia: data[`medicamento${index}_frequencia`] || '',
                };
            });
        } else {
            assistida.medicamentos = [];
        }

        // Transformar internações
        if (data.internada === "sim" && parseInt(data.quantidade_internacoes) > 0) {
            assistida.internacoes = Array.from({ length: parseInt(data.quantidade_internacoes) }, (_, i) => {
                const index = i + 1;
                return {
                    local: data[`local${index}`] || '',
                    duracao: data[`duracao${index}`] || '',
                    data: data[`data${index}`] || '',
                };
            });
        } else {
            assistida.internacoes = [];
        }

        // Remover campos temporários dinâmicos
        const camposDinamicos = Object.keys(assistida).filter(k =>
            k.match(/^droga\d+_/) ||
            k.match(/^medicamento\d+_/) ||
            k.match(/^(local|duracao|data)\d+$/)
        );
        for (const campo of camposDinamicos) {
            delete assistida[campo];
        }

        // Remover contadores auxiliares
        delete assistida.quantidade_drogas;
        delete assistida.quantidade_medicamentos;
        delete assistida.quantidade_internacoes;

        return assistida;
    };

    return (

        <Modal
            show={showModal}
            onHide={handleClose}
            backdrop={true}
            keyboard={true}
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {modoEdicao ? 'Editar Assistida' : 'Cadastro de Assistida'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="step-indicator mb-4">
                    <ProgressBar className="mb-3" style={{ height: '6px' }}>
                        <ProgressBar
                            variant="success"
                            now={(completedSteps.length / 4) * 100}
                            animated
                        />
                    </ProgressBar>
                    <div className="d-flex justify-content-around">
                        {[
                            { label: "Dados Pessoais", icon: FaUser },
                            { label: "Contato e Endereço", icon: FaHome },
                            { label: "Histórico Médico I", icon: FaMedkit },
                            { label: "Histórico Médico II", icon: FaHeartbeat }
                        ].map(({ label, icon: Icon }, index) => (
                            <div
                                key={index}
                                className={`step ${step === index + 1 ? 'active' : ''} ${completedSteps.includes(index + 1) ? 'completed' : ''}`}
                                onClick={() => handleStepClick(index + 1)}
                                style={{ cursor: "pointer", textAlign: 'center' }}
                            >
                                <div className="circle">
                                    {completedSteps.includes(index + 1) ? (
                                        <FaCheck />
                                    ) : (
                                        <Icon />
                                    )}
                                </div>
                                <span className="step-label">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Form noValidate>
                    {step === 1 && (
                        <div className="w-100">
                            {/* Header do Step 1 */}
                            <div className="bg-primary p-3 rounded-top">
                                <h4 className="mb-0 text-center" style={{ color: 'white' }}>Dados Pessoais</h4>
                            </div>

                            <fieldset className='d-flex justify-content-center field rounded-bottom border-top-0'>
                                <Row className="d-flex flex-wrap justify-content-center">
                                    {[
                                        { name: "nome", label: "Nome Completo", col: 6 },
                                        { name: "cpf", label: "CPF", mask: "000.000.000-00" },
                                        { name: "rg", label: "RG", mask: "00.000.000-0" },
                                        { name: "data_nascimento", label: "Data de Nascimento", type: "date" },
                                        { name: "idade", label: "Idade", type: "number", readonly: true },
                                        { name: "nacionalidade", label: "Nacionalidade", defaultValue: "Brasileira" },
                                        { name: "estado_civil", label: "Estado Civil", type: "select", options: ["Solteira", "Casada", "Divorciada", "Viúva", "União Estável"] },
                                        { name: "profissao", label: "Profissão" },
                                        { name: "escolaridade", label: "Escolaridade", type: "select", options: ["Fundamental Incompleto", "Fundamental Completo", "Médio Incompleto", "Médio Completo", "Superior Incompleto", "Superior Completo"] },
                                        { name: "status", label: "Status", type: "select", options: ["Ativa", "Inativa", "Em Tratamento"] }
                                    ].map(({ name, label, type = "text", options, mask, col = 3, defaultValue, readonly }, idx) => (
                                        <Col md={col} key={idx} className="mb-3">
                                            <Form.Group>
                                                <Form.Label>
                                                    {label}
                                                    {["nome", "cpf", "rg", "data_nascimento", "nacionalidade", "estado_civil", "profissao", "escolaridade"].includes(name) && (
                                                        <span className="text-danger ms-1">*</span>
                                                    )}
                                                </Form.Label>
                                                {mask ? (
                                                    <IMaskInput
                                                        mask={mask}
                                                        name={name}
                                                        value={formData[name] || defaultValue || ''}
                                                        unmask={true}
                                                        onAccept={(value) => handleMaskChange(name, value)}
                                                        className={`form-control ${formErrors[name] ? 'is-invalid' : ''}`}
                                                        placeholder={mask.replace(/0/g, "_")}
                                                    />
                                                ) : type === "select" ? (
                                                    <Form.Select
                                                        name={name}
                                                        value={formData[name] || 'Ativa'}
                                                        onChange={handleChange}
                                                        isInvalid={!!formErrors[name]}
                                                        disabled={name === "status"}
                                                    >
                                                        <option value="">Selecione</option>
                                                        {options.map((option, i) => (
                                                            <option key={i} value={option}>{option}</option>
                                                        ))}
                                                    </Form.Select>
                                                ) : (
                                                    <Form.Control
                                                        name={name}
                                                        type={type}
                                                        value={name === 'nacionalidade' && !formData[name] ? 'Brasileira' : (formData[name] || defaultValue || '')}
                                                        onChange={handleChange}
                                                        isInvalid={!!formErrors[name]}
                                                        readOnly={readonly}
                                                    />
                                                )}
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors[name]}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    ))}
                                </Row>
                            </fieldset>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="w-100">
                            {/* Header do Step 2 */}
                            <div className="bg-primary p-3 rounded-top">
                                <h4 className="mb-0 text-center" style={{ color: 'white' }}>Contato e Endereço</h4>
                            </div>

                            <fieldset className="field rounded-bottom border-top-0 p-4">
                                <Row className="w-100">
                                    <Col md={12}>
                                        {/* Seção de Endereço */}
                                        <h5 className="mb-3">Endereço</h5>
                                        <Row className="mb-4">
                                            {[
                                                { field: "logradouro", label: "Logradouro", col: 7 },
                                                { field: "numero", label: "Número", type: "text", col: 2 },
                                                { field: "cep", label: "CEP", mask: "00000-000", col: 3 },
                                                { field: "bairro", label: "Bairro", col: 4 },
                                                { field: "cidade", label: "Cidade", col: 6 },
                                                {
                                                    field: "estado", label: "Estado", type: "select", col: 2, options: [
                                                        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
                                                        "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
                                                        "RS", "RO", "RR", "SC", "SP", "SE", "TO"
                                                    ]
                                                }
                                            ].map(({ field, label, type = "text", mask, col, options }, idx) => (
                                                <Col md={col} key={idx} className="mb-3">
                                                    <Form.Group>
                                                        <Form.Label>
                                                            {label}
                                                            {["logradouro", "bairro", "numero", "cep", "estado", "cidade", "telefone"].includes(field) && (
                                                                <span className="text-danger ms-1">*</span>
                                                            )}
                                                        </Form.Label>
                                                        {mask ? (
                                                            <IMaskInput
                                                                mask={mask}
                                                                name={field}
                                                                value={formData[field] || ''}
                                                                unmask={true}
                                                                onAccept={(value) => handleMaskChange(field, value)}
                                                                className={`form-control ${formErrors[field] ? 'is-invalid' : ''}`}
                                                                placeholder={mask.replace(/0/g, "_")}
                                                            />
                                                        ) : type === "select" ? (
                                                            <Form.Select
                                                                name={field}
                                                                value={formData[field] || ''}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors[field]}
                                                            >
                                                                <option value="">Selecione...</option>
                                                                {options.map((option, i) => (
                                                                    <option key={i} value={option}>{option}</option>
                                                                ))}
                                                            </Form.Select>
                                                        ) : (
                                                            <Form.Control
                                                                name={field}
                                                                type={type}
                                                                value={formData[field] || ''}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors[field]}
                                                            />
                                                        )}
                                                        <Form.Control.Feedback type="invalid">
                                                            {formErrors[field]}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            ))}
                                        </Row>

                                        {/* Seção de Contato */}
                                        <h5 className="mb-3">Contato</h5>
                                        <Row>
                                            {[
                                                { field: "telefone", label: "Telefone", mask: "(00) 00000-0000", col: 4 },
                                                { field: "telefone_contato", label: "Telefone de Contato", mask: "(00) 00000-0000", col: 4 }
                                            ].map(({ field, label, mask, col }, idx) => (
                                                <Col md={col} key={`contact-${idx}`} className="mb-3">
                                                    <Form.Group>
                                                        <Form.Label>
                                                            {label}
                                                            {field === "telefone" && (
                                                                <span className="text-danger ms-1">*</span>
                                                            )}
                                                        </Form.Label>
                                                        <IMaskInput
                                                            mask={mask}
                                                            name={field}
                                                            value={formData[field] || ''}
                                                            unmask={true}
                                                            onAccept={(value) => handleMaskChange(field, value)}
                                                            className={`form-control ${formErrors[field] ? 'is-invalid' : ''}`}
                                                            placeholder={mask.replace(/0/g, "_")}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {formErrors[field]}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Col>
                                </Row>
                            </fieldset>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="w-100">
                            {/* Header do Step 3 */}
                            <div className="bg-primary p-3 rounded-top">
                                <h4 className="mb-0 text-center" style={{ color: 'white' }}>Histórico Médico I</h4>
                            </div>

                            <fieldset className="field d-flex justify-content-center rounded-bottom border-top-0">
                                <Row className="w-100">
                                    <Col md={12} className="mb-3">
                                        <Alert variant="info" className="d-flex align-items-center">
                                            <FaExclamationTriangle className="me-2" />
                                            <small>Preencha com atenção os dados médicos e histórico de uso de substâncias.</small>
                                        </Alert>
                                    </Col>
                                    {[{ name: "data_atendimento", label: "Data do Último Atendimento", type: "date" },
                                    { name: "hora", label: "Hora", type: "time" },
                                    { name: "historia_patologica", label: "História Patológica", as: "textarea", placeholder: "Descreva o histórico médico e condições de saúde..." }
                                    ].map(({ name, label, type = "text", as, placeholder }, idx) => (
                                        <Col md={name === "historia_patologica" ? 6 : 3} key={idx} className="mb-3">
                                            <Form.Group>
                                                <Form.Label>
                                                    {label}
                                                    <span className="text-danger ms-1">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    name={name}
                                                    type={type}
                                                    as={as}
                                                    rows={as ? 4 : undefined}
                                                    placeholder={placeholder}
                                                    value={formData[name] || ''}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors[name]}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors[name]}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    ))}

                                    {/* Usuária de drogas */}
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>
                                                Usuária de drogas?
                                                <span className="text-danger ms-1">*</span>
                                            </Form.Label>
                                            <Form.Select
                                                name="usuaria_drogas"
                                                value={formData.usuaria_drogas || ''}
                                                onChange={handleChange}
                                                isInvalid={!!formErrors["usuaria_drogas"]}
                                            >
                                                <option value="">Selecione...</option>
                                                <option value="nao">Não</option>
                                                <option value="sim">Sim</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {formErrors["usuaria_drogas"]}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                    </Col>

                                    {/* Campos adicionais para usuária de drogas */}
                                    {formData.usuaria_drogas === "sim" && (
                                        <>
                                            <Form.Group as={Col} md={3}>
                                                <Form.Label>Quantas Substâncias?</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    name="quantidade_drogas"
                                                    value={formData.quantidade_drogas || ''}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors["quantidade_drogas"]} // <- isso ativa o erro visual
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors["quantidade_drogas"]}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Col md={3}>
                                                <Form.Group>
                                                    <Form.Label>Quanto tempo sem uso</Form.Label>
                                                    <Form.Control
                                                        name="tempo_sem_uso"
                                                        value={formData.tempo_sem_uso || ''}
                                                        onChange={handleChange}
                                                        isInvalid={!!formErrors["tempo_sem_uso"]}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formErrors["tempo_sem_uso"]}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col md={12}>
                                                {formData.quantidade_drogas > 0 && (
                                                    <div className="mt-4">
                                                        <h5 className="mb-3">Histórico de Uso de Substâncias</h5>
                                                        <Table bordered hover responsive>
                                                            <thead className="table-light">
                                                                <tr>
                                                                    <th>Tipo</th>
                                                                    <th>Idade Início</th>
                                                                    <th>Tempo de Uso</th>
                                                                    <th>Intensidade</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Array.from({ length: parseInt(formData.quantidade_drogas) || 0 }, (_, i) => i + 1).map((i) => (
                                                                    <tr key={i}>
                                                                        {["tipo", "idade", "tempo", "intensidade"].map((campo) => {
                                                                            const fieldName = `droga${i}_${campo}`;
                                                                            return (
                                                                                <td key={campo}>
                                                                                    <Form.Control
                                                                                        name={fieldName}
                                                                                        value={formData[fieldName] || ''}
                                                                                        onChange={handleChange}
                                                                                        isInvalid={!!formErrors[fieldName]}
                                                                                    />
                                                                                    <Form.Control.Feedback type="invalid">
                                                                                        {formErrors[fieldName]}
                                                                                    </Form.Control.Feedback>
                                                                                </td>
                                                                            );
                                                                        })}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                )}

                                            </Col>
                                        </>
                                    )}

                                    {/* Usa medicamentos */}
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>
                                                Usa medicamentos?
                                                <span className="text-danger ms-1">*</span>
                                            </Form.Label>
                                            <Form.Select
                                                name="uso_medicamentos"
                                                value={formData.uso_medicamentos || ''}
                                                onChange={handleChange}
                                                isInvalid={!!formErrors["uso_medicamentos"]}
                                            >
                                                <option value="">Selecione...</option>
                                                <option value="nao">Não</option>
                                                <option value="sim">Sim</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {formErrors["uso_medicamentos"]}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    {formData.uso_medicamentos === "sim" && (
                                        <>
                                            <Col md={3}>
                                                <Form.Group>
                                                    <Form.Label>Quantos medicamentos?</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        min="1"
                                                        max="10"
                                                        name="quantidade_medicamentos"
                                                        value={formData.quantidade_medicamentos || ''}
                                                        onChange={handleChange}
                                                        isInvalid={!!formErrors["quantidade_medicamentos"]}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formErrors["quantidade_medicamentos"]}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col md={12}>
                                                {formData.quantidade_medicamentos > 0 && (
                                                    <div className="mt-4">
                                                        <h5 className="mb-3">Lista de Medicamentos em Uso</h5>
                                                        <Table bordered hover responsive>
                                                            <thead className="table-light">
                                                                <tr>
                                                                    <th style={{ width: '50%' }}>Nome do Medicamento</th>
                                                                    <th style={{ width: '25%' }}>Dosagem</th>
                                                                    <th style={{ width: '25%' }}>Frequência</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Array.from({ length: parseInt(formData.quantidade_medicamentos) || 0 }, (_, i) => i + 1).map((i) => (
                                                                    <tr key={i}>
                                                                        <td>
                                                                            <Form.Control
                                                                                name={`medicamento${i}_nome`}
                                                                                value={formData[`medicamento${i}_nome`] || ''}
                                                                                onChange={handleChange}
                                                                                placeholder="Ex: Paracetamol"
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <Form.Control
                                                                                name={`medicamento${i}_dosagem`}
                                                                                value={formData[`medicamento${i}_dosagem`] || ''}
                                                                                onChange={handleChange}
                                                                                placeholder="Ex: 500mg"
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <Form.Control
                                                                                name={`medicamento${i}_frequencia`}
                                                                                value={formData[`medicamento${i}_frequencia`] || ''}
                                                                                onChange={handleChange}
                                                                                placeholder="Ex: 2x ao dia"
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                )}
                                            </Col>
                                        </>
                                    )}
                                </Row>
                            </fieldset>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="w-100">
                            {/* Header do Step 4 */}
                            <div className="bg-primary p-3 rounded-top">
                                <h4 className="mb-0 text-center" style={{ color: 'white' }}>Internações Anteriores e Vida Pessoal</h4>
                            </div>

                            <fieldset className="field rounded-bottom border-top-0 p-4">
                                <Row className="w-100">
                                    <Col md={12}>
                                        {/* Seção de Internações - Perguntas iniciais */}
                                        <Row className="mb-3">
                                            <Col md={3}>
                                                <Form.Group>
                                                    <Form.Label>Já esteve internada?</Form.Label>
                                                    <Form.Select
                                                        name="internada"
                                                        value={formData.internada || ''}
                                                        onChange={handleChange}
                                                        isInvalid={!!formErrors['internada']}
                                                    >
                                                        <option value="">Selecione...</option>
                                                        <option value="nao">Não</option>
                                                        <option value="sim">Sim</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            {formData.internada === "sim" && (
                                                <Col md={3}>
                                                    <Form.Group>
                                                        <Form.Label>Quantas vezes?</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            name="quantidade_internacoes"
                                                            value={formData.quantidade_internacoes || ''}
                                                            onChange={handleChange}
                                                            isInvalid={!!formErrors['quantidade_internacoes']}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {formErrors['quantidade_internacoes']}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            )}
                                        </Row>

                                        {/* Detalhes das Internações */}
                                        {formData.internada === "sim" && formData.quantidade_internacoes > 0 && (
                                            <div className="border rounded p-4 bg-light">
                                                <h5 className="mb-3">Detalhes das Internações</h5>
                                                <Table bordered hover responsive className="mb-4">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th style={{ width: '50%' }}>Local</th>
                                                            <th style={{ width: '25%' }}>Duração</th>
                                                            <th style={{ width: '25%' }}>Data</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Array.from({ length: parseInt(formData.quantidade_internacoes) || 0 }, (_, i) => i + 1).map((i) => (
                                                            <tr key={i}>
                                                                <td>
                                                                    <Form.Control
                                                                        name={`local${i}`}
                                                                        value={formData[`local${i}`] || ''}
                                                                        onChange={handleChange}
                                                                        placeholder="Nome do hospital/clínica"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Form.Control
                                                                        name={`duracao${i}`}
                                                                        value={formData[`duracao${i}`] || ''}
                                                                        onChange={handleChange}
                                                                        placeholder="Ex: 3 meses"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Form.Control
                                                                        type="date"
                                                                        name={`data${i}`}
                                                                        value={formData[`data${i}`] || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>

                                                <Form.Group>
                                                    <Form.Label className="fw-bold">Motivação das Internações</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={5}
                                                        name="motivacao_internacoes"
                                                        value={formData.motivacao_internacoes || ''}
                                                        onChange={handleChange}
                                                        placeholder="Descreva detalhadamente os motivos que levaram às internações..."
                                                        style={{ resize: 'vertical' }}
                                                    />
                                                </Form.Group>
                                            </div>
                                        )}
                                    </Col>
                                </Row>

                                {/* Seção de Vida Pessoal */}
                                <Row className="w-100">
                                    <Col md={12}>
                                        <h5 className="mb-3">História de Vida</h5>
                                    </Col>
                                    {campos.map((campo, idx) => (
                                        <Col md={6} key={idx}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-bold">
                                                    {campo === 'fatos_marcantes' ? 'Fatos Marcantes' :
                                                        campo === 'infancia' ? 'Infância' :
                                                            campo === 'adolescencia' ? 'Adolescência' :
                                                                campo.replace(/_/g, " ").toUpperCase()}
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={6}
                                                    name={campo}
                                                    value={formData[campo] || ''}
                                                    onChange={handleChange}
                                                    placeholder={campo === 'fatos_marcantes' ? 'Descreva eventos importantes e marcantes na vida da assistida...' :
                                                        campo === 'infancia' ? 'Relate informações sobre a infância...' :
                                                            campo === 'adolescencia' ? 'Descreva o período da adolescência...' : ''}
                                                    style={{ minHeight: '120px', resize: 'vertical' }}
                                                />
                                            </Form.Group>
                                        </Col>
                                    ))}
                                </Row>
                            </fieldset>
                        </div>
                    )}

                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <div>
                    {step > 1 && (
                        <Button variant="outline-secondary" onClick={prevStep}>
                            ← Voltar
                        </Button>
                    )}
                </div>
                <div className="d-flex gap-2">
                    <Button variant="outline-danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    {step < 4 ? (
                        <Button variant="primary" onClick={handleNext}>
                            Próximo →
                        </Button>
                    ) : (
                        <Button
                            variant="success"
                            disabled={isSubmitting}
                            onClick={async () => {
                                setIsSubmitting(true);
                                try {
                                    if (validateAllSteps()) {
                                        const dadosProntos = formatarFormDataParaEnvio(formData);
                                        await onSubmit(dadosProntos);
                                        setShowModal(false);
                                        if (!modoEdicao) {
                                            setFormData({ status: 'Ativa' });
                                        }
                                        setStep(1);
                                        setFormErrors({});
                                        setCompletedSteps([]);
                                    }
                                } catch (error) {
                                    console.error('Erro ao salvar:', error);
                                } finally {
                                    setIsSubmitting(false);
                                }
                            }}
                        >
                            {isSubmitting ? 'Salvando...' : (modoEdicao ? 'Atualizar Assistida' : 'Finalizar Cadastro')}
                        </Button>
                    )}
                </div>
            </Modal.Footer>
        </Modal>
    );
};

Formulario.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    assistidaParaEditar: PropTypes.object,
    modoEdicao: PropTypes.bool
};

Formulario.defaultProps = {
    assistidaParaEditar: null,
    modoEdicao: false
};

export default Formulario;
