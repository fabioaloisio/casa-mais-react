import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Nav, Accordion } from 'react-bootstrap'
import { FaDonate, FaHome, FaIdCard, FaMoneyBillWave, FaPills, FaStethoscope, FaUsers, FaBars, FaTimes, FaUserTie } from 'react-icons/fa'
import './Sidebar.css'
import Logo from './logo'

function Sidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Botão hambúrguer */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'show' : ''}`} 
        onClick={closeSidebar}
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="logo-container">
        <Logo />
      </div>
      <Nav className="flex-column menu">
        <Nav.Link 
          as={Link} 
          to="/dashboard" 
          onClick={closeSidebar}
          className={location.pathname === '/' || location.pathname === '/dashboard' ? 'active' : ''}>
          <FaHome />
          Dashboard
        </Nav.Link>

        <div className="menu-section">
          <div className="menu-section-title">Gestão de Pessoas</div>
          <Nav.Link 
            as={Link} 
            to="/usuarios" 
            onClick={closeSidebar}
            className={location.pathname.includes('/usuarios') ? 'active' : ''}>
            <FaUsers />
            Gestão de Usuários
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/assistidas" 
            onClick={closeSidebar}
            className={location.pathname.includes('/assistidas') ? 'active' : ''}>
            <FaIdCard />
            Gestão de Assistidas
          </Nav.Link>
        </div>

        <div className="menu-section">
          <div className="menu-section-title">Atendimento e Saúde</div>
          <Nav.Link as={Link} onClick={closeSidebar} to="/consultas" className={location.pathname.includes('/consultas') ? 'active' : ''}>
            <FaStethoscope />
            Gestão de Consultas
          </Nav.Link>
          <Nav.Link as={Link} onClick={closeSidebar} to="/medicamentos" className={location.pathname.includes('/medicamentos') ? 'active' : ''}>
            <FaPills />
            Gestão de Medicamentos
          </Nav.Link>
        </div>

        <div className="menu-section">
          <div className="menu-section-title">Controle Financeiro</div>
          <Nav.Link as={Link} onClick={closeSidebar} to="/doadores" className={location.pathname.includes('/doadores') ? 'active' : ''}>
            <FaUserTie />
            Gestão de Doadores
          </Nav.Link>
          <Nav.Link as={Link} onClick={closeSidebar} to="/doacoes" className={location.pathname.includes('/doacoes') ? 'active' : ''}>
            <FaDonate />
            Gestão de Doações
          </Nav.Link>
          <Nav.Link as={Link} onClick={closeSidebar} to="/despesas" className={location.pathname.includes('/despesas') ? 'active' : ''}>
            <FaMoneyBillWave />
            Gestão de Despesas
          </Nav.Link>
        </div>
      </Nav>
    </aside>
    </>
  )
}

export default Sidebar