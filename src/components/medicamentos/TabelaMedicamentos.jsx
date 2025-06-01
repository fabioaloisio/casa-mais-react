//Aldruin Bonfim de Lima Souza - RA 10482416915
import { FaEdit, FaTrash } from 'react-icons/fa';

const TabelaMedicamentos = ({ medicamentos, onEditar, onExcluir }) => {
  // Função para formatar data
  const formatarData = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };
  return (
    <div className="tabela-container ">
      <table className="tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Validade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.length > 0 ? (
            medicamentos.map((med) => (
              <tr key={med.id}>
                <td>{med.nome}</td>
                <td>{med.tipo}</td>
                <td>{med.quantidade}</td>
                <td>{formatarData(med.validade)}</td>
                <td>
                  <div>
                    <button
                      className="btn-editar"
                      onClick={() => onEditar(med)}
                    >
                      <FaEdit /> Editar
                    </button>

                    <button
                      className="btn-excluir"
                      onClick={() => onExcluir(med)}
                    >
                      <FaTrash /> Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="nenhum-registro">
                Nenhum medicamento encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaMedicamentos;