import { Card, Row, Col } from 'react-bootstrap'
import './Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Bem-vindo à Dashboard</h1>
      
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <h3>Usuários Ativos</h3>
              <p className="dashboard-number">12</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <h3>Assistidas Ativas</h3>
              <p className="dashboard-number">34</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <h3>Consultas Hoje</h3>
              <p className="dashboard-number">5</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard