import { useState, useEffect, useRef } from 'react'; // Adicionado useRef
import style from "@/components/ConsultarQuizzes/ConsultarQuizzes.module.css";
// Importar updateQuiz
import { getQuizzes, createQuiz, deleteQuiz, getquests, updateQuiz } from '@/services/api';

const ConsultarQuizzes = () => {

    // --- Estados do Formulário ---
    const [pergunta, setPergunta] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [alternativaCorreta, setAlternativaCorreta] = useState('');
    const [questSelecionado, setquestSelecionado] = useState(''); // Armazena nomequest

    // --- Estados Dinâmicos ---
    const [quests, setquests] = useState([]); // Para dropdown
    const [quizzes, setQuizzes] = useState([]); // Para tabela

    // --- NOVO: Estado para Edição ---
    const [idParaEditar, setIdParaEditar] = useState(null); // null = Criando, ID = Editando

    // --- Ref para o Formulário ---
    const formRef = useRef(null);

    // --- Busca Inicial ---
    useEffect(() => {
        fetchQuizzes();
        fetchquests();
    }, []);

    // --- Funções API Fetch ---
    const fetchQuizzes = async () => {
        try {
            const response = await getQuizzes();
            setQuizzes(response.data.quizzes || []);
        } catch (error) {
            console.error("Erro no fetchQuizzes:", error);
            alert("Não foi possível carregar os quizzes.");
        }
    };

    const fetchquests = async () => {
        try {
            const response = await getquests();
            setquests(response.data.quests || []);
        } catch (error) {
            console.error("Erro no fetchquests:", error);
            // Pode omitir alerta
        }
    };

    // --- Funções CRUD ---

    // --- handleEditClick IMPLEMENTADO ---
    const handleEditClick = (quiz) => {
        console.log("Editando quiz:", quiz);
        setIdParaEditar(quiz._id); // Define ID para modo edição

        // Preenche o formulário com dados do quiz
        setPergunta(quiz.pergunta || '');
        setAlternativaA(quiz.alternativaA || '');
        setAlternativaB(quiz.alternativaB || '');
        setAlternativaC(quiz.alternativaC || '');
        setAlternativaD(quiz.alternativaD || '');
        setAlternativaCorreta(quiz.alternativaCorreta || '');
        setquestSelecionado(quiz.questQuiz || ''); // Usa o nome do quest salvo

        // Rola para o formulário
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // --- handleDelete (com ajuste para edição) ---
    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este quiz?")) { return; }
        try {
            const response = await deleteQuiz(id);
            if (response.status === 204) {
                alert("Quiz excluído com sucesso!");
                // Se o quiz excluído era o que estava sendo editado, cancela a edição
                if (id === idParaEditar) {
                    clearForm();
                }
                fetchQuizzes();
            }
        } catch (error) {
            console.error("Erro no handleDelete:", error);
            const errorMsg = error.response?.data?.error || "Erro ao excluir quiz";
            alert(`Erro: ${errorMsg}`);
        }
    };

    // --- clearForm ATUALIZADO ---
    const clearForm = () => {
        setPergunta(''); setAlternativaA(''); setAlternativaB(''); setAlternativaC(''); setAlternativaD('');
        setAlternativaCorreta(''); setquestSelecionado('');
        setIdParaEditar(null); // <<< Reseta modo edição
    };

     // --- NOVA FUNÇÃO: Cancelar Edição ---
    const handleCancelEdit = () => {
        clearForm(); // Limpa e sai do modo de edição
    };

    // --- handleSubmit ATUALIZADO ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Monta o objeto com os dados do formulário
        const quizData = {
            pergunta,
            questQuiz: questSelecionado, // Nome do campo esperado pelo backend
            alternativaA,
            alternativaB,
            alternativaC,
            alternativaD,
            alternativaCorreta
        };

        // --- Lógica de Criação vs Atualização ---
        if (idParaEditar) {
            // --- ATUALIZANDO ---
            console.log("Atualizando Quiz ID:", idParaEditar);
            try {
                // Chama a API de UPDATE
                const response = await updateQuiz(idParaEditar, quizData);
                if (response.status === 200) { // Update bem-sucedido (geralmente 200 OK)
                    alert("Quiz atualizado com sucesso!");
                    clearForm(); // Limpa e sai do modo de edição
                    fetchQuizzes(); // Atualiza a tabela
                }
            } catch (error) {
                console.error("Erro no handleSubmit (Update Quiz):", error);
                alert(`Erro ao atualizar quiz: ${error.response?.data?.error || "Erro desconhecido"}`);
                 // Não limpa o form em caso de erro para permitir correção
            }

        } else {
            // --- CRIANDO ---
            console.log("Criando novo Quiz...");
            try {
                // Chama a API de CREATE
                const response = await createQuiz(quizData);
                if (response.status === 201) { // Criação bem-sucedida
                    alert("Quiz cadastrado com sucesso!");
                    clearForm();
                    fetchQuizzes();
                }
            } catch (error) {
                console.error("Erro no handleSubmit (Create Quiz):", error);
                alert(`Erro ao cadastrar quiz: ${error.response?.data?.error || "Erro desconhecido"}`);
            }
        }
    };

    return(
        <>
        {/* Adiciona ref ao wrapper */}
        <div ref={formRef} className={style.wrapperQuizzes}>

            {/* Formulário de Cadastro/Edição de Quizzes */}
            <div className={style.formQuizzes}>
                 {/* Título Dinâmico */}
                <p className={style.formTitle}>
                    {idParaEditar ? `Editando Quiz` : 'Cadastro de Quizzes'}
                </p>

                <form onSubmit={handleSubmit} className={style.cadastroQuizzes}>

                    {/* Linha Pergunta + Correta */}
                    <div className={`${style.inputWrapper} ${style.perguntaWrapper}`}>
                        <input
                            type="text"
                            placeholder="Pergunta"
                            className={`${style.inputField} ${style.perguntaInput}`}
                            value={pergunta} // <<< Vincula ao state
                            onChange={(e) => setPergunta(e.target.value)} required
                        />
                        <select
                            className={`${style.inputField} ${style.respostaSelect}`}
                            value={alternativaCorreta} // <<< Vincula ao state
                            onChange={(e) => setAlternativaCorreta(e.target.value)}
                            required
                        >
                            <option value="" disabled>Correta?</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>

                    {/* Alternativas */}
                    <div className={style.inputWrapper}>
                        <input type="text" placeholder="Alternativa A" className={style.inputField}
                            value={alternativaA} // <<< Vincula ao state
                            onChange={(e) => setAlternativaA(e.target.value)}
                        required />
                    </div>
                    <div className={style.inputWrapper}>
                        <input type="text" placeholder="Alternativa B" className={style.inputField}
                            value={alternativaB} // <<< Vincula ao state
                            onChange={(e) => setAlternativaB(e.target.value)}
                        required/>
                    </div>
                    <div className={style.inputWrapper}>
                        <input type="text" placeholder="Alternativa C" className={style.inputField}
                             value={alternativaC} // <<< Vincula ao state
                             onChange={(e) => setAlternativaC(e.target.value)}
                         required/>
                    </div>
                    <div className={style.inputWrapper}>
                        <input type="text" placeholder="Alternativa D" className={style.inputField}
                            value={alternativaD} // <<< Vincula ao state
                            onChange={(e) => setAlternativaD(e.target.value)}
                        required/>
                    </div>

                    {/* Select quest + Botão Submit */}
                   <div className={style.inputWrapper}>
                        <select
                            className={style.inputField}
                            value={questSelecionado} // <<< Vincula ao state
                            onChange={(e) => setquestSelecionado(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecione um quest</option>
                            {quests.length > 0 ? (
                                quests.map((quest) => (
                                    <option key={quest._id} value={quest.nomequest}>
                                        {quest.nomequest}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Carregando quests...</option>
                            )}
                        </select>

                        {/* Botão Submit (Texto Dinâmico) */}
                        <button type="submit" className={style.submitButton}>
                           {idParaEditar ? 'Atualizar Quiz' : 'Cadastrar'}
                        </button>
                    </div>

                     {/* Botão Cancelar Edição (Condicional) */}
                     {idParaEditar && (
                        <div className={style.inputWrapper} style={{ justifyContent: 'flex-end' }}> {/* Alinha botão à direita */}
                            <button
                                type="button" // Previne submit
                                onClick={handleCancelEdit}
                                className={style.submitButton} // Reutiliza estilo ou cria um novo
                                style={{ backgroundColor: '#aaa', borderColor: '#999', width: 'auto', padding: '10px 20px' }} // Estilo para diferenciar
                            >
                                Cancelar Edição
                            </button>
                        </div>
                    )}
                </form>
            </div>

            {/* Tabela */}
            <div className={style.tableContainer}>
               <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Pergunta</th>
                            <th>Alt. A</th> {/* Abreviado */}
                            <th>Alt. B</th>
                            <th>Alt. C</th>
                            <th>Alt. D</th>
                            <th>Correta</th>
                            <th>quest</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz) => (
                                <tr key={quiz._id}>
                                    <td data-label="Id">{quiz._id.slice(-6)}</td>
                                    <td data-label="Pergunta">{quiz.pergunta}</td>
                                    <td data-label="Alt. A">{quiz.alternativaA}</td>
                                    <td data-label="Alt. B">{quiz.alternativaB}</td>
                                    <td data-label="Alt. C">{quiz.alternativaC}</td>
                                    <td data-label="Alt. D">{quiz.alternativaD}</td>
                                    <td data-label="Correta">{quiz.alternativaCorreta}</td>
                                    <td data-label="quest">{quiz.questQuiz}</td>
                                    <td data-label="Ações">
                                        {/* Botão Editar chama handleEditClick */}
                                        <button onClick={() => handleEditClick(quiz)} className={`${style.actionButton} ${style.editarButton}`}>
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(quiz._id)} className={`${style.actionButton} ${style.excluirButton}`}>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center' }}>Nenhum quiz encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
             </div>
          </div>
        </>
    );
}

export default ConsultarQuizzes;