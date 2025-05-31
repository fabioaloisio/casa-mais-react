import { Link, useLocation } from 'react-router-dom'
import { Nav, Accordion } from 'react-bootstrap'
import { FaDonate, FaHome, FaIdCard, FaMoneyBillWave, FaPills, FaStethoscope, FaUsers } from 'react-icons/fa'
import './Sidebar.css'
import Logo from './logo'

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <Logo />
      </div>
      <Nav className="flex-column menu">
        <Nav.Link as={Link} to="/dashboard" className={location.pathname === '/' || location.pathname === '/dashboard' ? 'active' : ''}>
          <FaHome />
          Dashboard
        </Nav.Link>

        <div className="menu-section">
          <div className="menu-section-title">Gestão de Pessoas</div>
          <Nav.Link as={Link} to="/usuarios" className={location.pathname.includes('/usuarios') ? 'active' : ''}>
            <FaUsers />
            Gestão de Usuários
          </Nav.Link>
          <Nav.Link as={Link} to="/assistidas" className={location.pathname.includes('/assistidas') ? 'active' : ''}>
            <FaIdCard />
            Gestão de Assistidas
          </Nav.Link>
        </div>

        <div className="menu-section">
          <div className="menu-section-title">Atendimento e Saúde</div>
          <Nav.Link as={Link} to="/consultas" className={location.pathname.includes('/consultas') ? 'active' : ''}>
            <FaStethoscope />
            Gestão de Consultas
          </Nav.Link>
          <Nav.Link as={Link} to="/medicamentos" className={location.pathname.includes('/medicamentos') ? 'active' : ''}>
            <FaPills />
            Gestão de Medicamentos
          </Nav.Link>
        </div>

        <div className="menu-section">
          <div className="menu-section-title">Controle Financeiro</div>
          <Nav.Link as={Link} to="/doacoes" className={location.pathname.includes('/doacoes') ? 'active' : ''}>
            <FaDonate />
            Gestão de Doações
          </Nav.Link>
          <Nav.Link as={Link} to="/despesas" className={location.pathname.includes('/despesas') ? 'active' : ''}>
            <FaMoneyBillWave />
            Gestão de Despesas
          </Nav.Link>
        </div>
      </Nav>
    </aside>
  )
}

export default Sidebar