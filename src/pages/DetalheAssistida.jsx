import { useParams, useNavigate } from "react-router-dom";
import assistidasService from "../services/assistidasService";

const DetalheAssistida = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const assistida = assistidasService.getById(id);

    if (!assistida) {
        return (
            <div style={{ padding: "2rem", color: "#c53030" }}>
                Assistida não encontrada.
                <button
                    className="botao editar"
                    style={{ marginLeft: "1rem" }}
                    onClick={() => navigate(-1)}
                >
                    Voltar
                </button>
            </div>
        );
    }

    // Funções para formatar dados
    const formatCPF = (cpf) => {
        if (!cpf) return "";
        return cpf.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    const formatRG = (rg) => {
        if (!rg) return "";

        // Remove tudo que não for número ou letra
        const onlyNumbers = rg.replace(/\D/g, "");

        // Aplica máscara no formato 11.111.111-1
        // Exemplo: 123456789 vira 12.345.678-9
        if (onlyNumbers.length <= 9) {
            return onlyNumbers
                .replace(/^(\d{2})(\d)/, "$1.$2")           // insere ponto após 2 números
                .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // insere segundo ponto após 5 números
                .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4"); // insere hífen após 8 números
        }

        return rg; // se tiver formato diferente, retorna original
    };


    const formatTelefone = (tel) => {
        if (!tel) return "";
        const cleaned = tel.replace(/\D/g, "");
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else if (cleaned.length === 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
        return tel;
    };

    const formatCEP = (cep) => {
        if (!cep) return "";
        return cep.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");
    };

    const formatData = (data) => {
        if (!data) return "";
        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    };

    // Dados formatados
    const cpfFormatado = formatCPF(assistida.cpf);
    const rgFormatado = formatRG(assistida.rg);
    const telefoneFormatado = formatTelefone(assistida.telefone);
    const telefoneContatoFormatado = formatTelefone(assistida.telefone_contato);
    const cepFormatado = formatCEP(assistida.cep);
    const dataNascimentoFormatada = formatData(assistida.data_nascimento);
    const dataAtendimentoFormatada = formatData(assistida.data_atendimento);
    const data1Formatada = formatData(assistida.data1);
    const data2Formatada = formatData(assistida.data2);
    const data3Formatada = formatData(assistida.data3);

    // Mapeamento para status colorido
    const statusClass = assistida.status.toLowerCase().replace(" ", "");

    return (
        <div
            className="perfil-container"
            style={{
                padding: "2rem",
                maxWidth: "800px",
                margin: "auto",
                background: "#f5f8fa",
                borderRadius: "12px",
                boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            }}
        >
            <h2 style={{ marginBottom: "1rem", color: "#0f1c2f" }}>{assistida.nome}</h2>
            <span className={`status ${statusClass}`}>{assistida.status}</span>

            <section style={{ marginTop: "1.5rem" }}>
                <h3>Dados Pessoais</h3>
                <p><b>CPF:</b> {cpfFormatado}</p>
                <p><b>RG:</b> {rgFormatado}</p>
                <p><b>Idade:</b> {assistida.idade}</p>
                <p><b>Data de Nascimento:</b> {dataNascimentoFormatada}</p>
                <p><b>Nacionalidade:</b> {assistida.nacionalidade}</p>
                <p><b>Estado Civil:</b> {assistida.estado_civil}</p>
                <p><b>Profissão:</b> {assistida.profissao}</p>
                <p><b>Escolaridade:</b> {assistida.escolaridade}</p>
            </section>

            <section style={{ marginTop: "1.5rem" }}>
                <h3>Contato</h3>
                <p><b>Telefone:</b> {telefoneFormatado}</p>
                <p><b>Telefone Contato:</b> {telefoneContatoFormatado}</p>
                <p>
                    <b>Endereço:</b> {`${assistida.logradouro}, ${assistida.numero} - ${assistida.bairro}, ${assistida.cidade} - ${assistida.estado}, CEP: ${cepFormatado}`}
                </p>
            </section>

            <section style={{ marginTop: "1.5rem" }}>
                <h3>Histórico Clínico e Tratamento</h3>
                <p><b>Data do último atendimento:</b> {dataAtendimentoFormatada} às {assistida.hora}</p>
                <p><b>História Patológica:</b> {assistida.historia_patologica}</p>
                <p><b>Tempo sem uso:</b> {assistida.tempo_sem_uso}</p>

                <h5 style={{ marginTop: "1rem" }}>Drogas / Bebidas Utilizadas</h5>
                {(assistida.droga1_tipo && assistida.droga1_tipo.toLowerCase() !== "nenhuma") ? (
                    <table className="table table-bordered table-sm">
                        <thead className="table-light">
                            <tr>
                                <th>Substância</th>
                                <th>Idade de Início</th>
                                <th>Tempo de Uso</th>
                                <th>Intensidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assistida.droga1_tipo.toLowerCase() !== "nenhuma" && (
                                <tr>
                                    <td>{assistida.droga1_tipo}</td>
                                    <td>{assistida.droga1_idade}</td>
                                    <td>{assistida.droga1_tempo}</td>
                                    <td>{assistida.droga1_intensidade}</td>
                                </tr>
                            )}
                            {assistida.droga2_tipo && assistida.droga2_tipo.toLowerCase() !== "nenhuma" && (
                                <tr>
                                    <td>{assistida.droga2_tipo}</td>
                                    <td>{assistida.droga2_idade}</td>
                                    <td>{assistida.droga2_tempo}</td>
                                    <td>{assistida.droga2_intensidade}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhuma substância informada.</p>
                )}

                <p><b>Uso de Medicamentos:</b> {assistida.uso_medicamentos === "sim" ? `Sim, ${assistida.quais_medicamentos}` : "Não"}</p>
                <p><b>Internações:</b> {assistida.internado === "sim" ? `Sim, ${assistida.quantidade_internacoes} vezes` : "Não"}</p>

                {assistida.internado === "sim" && (
                    <>
                        <p><b>Local 1:</b> {assistida.local1} | Duração: {assistida.duracao1} | Data: {formatData(assistida.data1)}</p>
                        <p><b>Local 2:</b> {assistida.local2} | Duração: {assistida.duracao2} | Data: {formatData(assistida.data2)}</p>
                        {assistida.local3 && (
                            <p><b>Local 3:</b> {assistida.local3} | Duração: {assistida.duracao3} | Data: {formatData(assistida.data3)}</p>
                        )}
                        <p><b>Motivação das internações:</b> {assistida.motivacao_internacoes}</p>
                    </>
                )}
            </section>


            <section style={{ marginTop: "1.5rem" }}>
                <h3>Dados Pessoais Complementares</h3>
                <p><b>Fatos Marcantes:</b> {assistida.fatos_marcantes}</p>
                <p><b>Infância:</b> {assistida.infancia || assistida.infancia}</p>
                <p><b>Adolescência:</b> {assistida.adolescencia}</p>
            </section>
        </div>
    );
};

export default DetalheAssistida;
