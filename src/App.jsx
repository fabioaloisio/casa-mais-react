import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Usuarios from './pages/Usuarios'
import CadastroUsuario from './pages/CadastroUsuario'
import Assistidas from './pages/Assistidas'
import CadastroAssistida from './pages/CadastroAssistida'
import Consultas from './pages/Consultas'
import AgendarConsulta from './pages/AgendarConsulta'
import Medicamentos from './pages/GerenciarMedicamentos'
import CadastroMedicamento from './pages/CadastroMedicamento'
import Doacoes from './pages/Doacoes'
import Despesas from './pages/Despesas'
import LancarDespesa from './pages/LancarDespesa'
import EstoqueEntradas from './pages/EstoqueEntradas'
import EstoqueSaidas from './pages/EstoqueSaidas'
import TitleHandler from "./components/TitleHandler";
import './App.css'

function App() {
  return (
    <Router>
      <TitleHandler />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="usuarios/cadastro" element={<CadastroUsuario />} />
          <Route path="assistidas" element={<Assistidas />} />
          <Route path="assistidas/cadastro" element={<CadastroAssistida />} />
          <Route path="consultas" element={<Consultas />} />
          <Route path="consultas/agendar" element={<AgendarConsulta />} />
          <Route path="medicamentos" element={<Medicamentos />} />
          <Route path="medicamentos/cadastro" element={<CadastroMedicamento />} />
          <Route path="doacoes" element={<Doacoes />} />
          <Route path="despesas" element={<Despesas />} />
          <Route path="despesas/lancar" element={<LancarDespesa />} />
          <Route path="estoque/entradas" element={<EstoqueEntradas />} />
          <Route path="estoque/saidas" element={<EstoqueSaidas />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App