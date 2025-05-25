import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Form, Modal, Row, Col } from 'react-bootstrap'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './Usuarios.css'

function Usuarios() {
  const [showModal, setShowModal] = useState(false)
  const [filtro, setFiltro] = useState('')
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: ''
  })

  const [usuarios] = useState([
    {
      id: 1,
      nome: 'Juliano Campos',
      email: 'juliano.kampus@gmail.com',
      tipo: 'Administrador'
    },
    {
      id: 2,
      nome: 'Aldruin Bonfim de Lima Souza',
      email: 'aldruin.lima@gmail.com',
      tipo: 'Administrador'
    },
    {
      id: 3,
      nome: 'Fabio Aloisio Gonçalves',
      email: 'fabio.aloisio@gmail.com',
      tipo: 'Administrador'
    }
  ])

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Cadastrar usuário:', formData)
    handleClose()
  }

  const usuariosFiltrados = usuarios.filter(usuario => 
    usuario.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    usuario.email.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className="conteudo">
      <div className="topo">
        <h1>Gestão de Usuários</h1>
        <p>
          Gerencie os usuários do sistema, seus perfis de acesso e permissões. 
          Aqui você pode adicionar, editar ou remover usuários.
        </p>
      </div>

      <div className="filtros mb-4">
        <Button 
          className="azul d-flex align-items-center gap-2"
          onClick={handleShow}
        >
          <FaPlus /> Novo Usuário
        </Button>

        <div className="d-flex align-items-center gap-2">
          <FaSearch className="text-muted" />
          <Form.Control
            type="text"
            placeholder="Filtrar por nome ou e-mail..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            id="filtroUsuario"
          />
        </div>
      </div>

      <div className="tabela-container">
        <Table className="tabela-assistidas" hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <div className="text-muted">
                    <p className="mb-0">Nenhum usuário encontrado</p>
                    <small>Clique em "Novo Usuário" para começar</small>
                  </div>
                </td>
              </tr>
            ) : (
              usuariosFiltrados.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td className="fw-medium">{usuario.nome}</td>
                  <td className="text-muted">{usuario.email}</td>
                  <td>
                    <span className={`status ${usuario.tipo === 'Administrador' ? 'ativa' : 'tratamento'}`}>
                      {usuario.tipo}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button 
                        className="d-flex align-items-center gap-1 btn-outline-custom btn-sm fs-7"
                        onClick={() => console.log('Editar', usuario.id)}
                      >
                        <FaEdit /> Editar
                      </Button>
                      <Button 
                        className="d-flex align-items-center gap-1 btn-sm fs-7"
                        variant="outline-danger"
                        onClick={() => console.log('Excluir', usuario.id)}
                      >
                        <FaTrash /> Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome Completo:</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Senha:</Form.Label>
              <Form.Control
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Usuário:</Form.Label>
              <Form.Select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Administrador">Administrador</option>
                <option value="Operador">Operador</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Usuarios