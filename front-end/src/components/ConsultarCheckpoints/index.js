import { useState, useEffect, useRef } from 'react'; // Adicionado useRef
import style from "@/components/Consultarquests/Consultarquests.module.css";

// Importar as funções da sua camada de API, incluindo updatequest
import { getquests, createquest, deletequest, getRotas, updatequest } from '@/services/api';

const Consultarquests = () => {

    // --- Estados do Formulário ---
    const [nomequest, setNomequest] = useState('');
    const [descricaoquest, setDescricaoquest] = useState('');
    const [rotaSelecionada, setRotaSelecionada] = useState(''); // Armazena o tituloRota selecionado
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [capaquestFile, setCapaquestFile] = useState(null); // O objeto File
    const [capaquestFileName, setCapaquestFileName] = useState(''); // Nome para exibição

    // --- Estados da Tabela e Dropdown ---
    const [quests, setquests] = useState([]);
    const [rotas, setRotas] = useState([]);

    // --- NOVO: Estado para Edição ---
    const [idParaEditar, setIdParaEditar] = useState(null); // null = Criando, ID = Editando
    const [nomeCapaAtual, setNomeCapaAtual] = useState(''); // Guarda nome da capa atual durante edição

    // --- Ref para o Formulário ---
    const formRef = useRef(null);

    // --- Efeito para Buscar Dados (GET) ---
    useEffect(() => {
        fetchquests();
        fetchRotas(); // Continua buscando rotas para o dropdown
    }, []);

    const fetchquests = async () => {
        try {
            const response = await getquests();
            setquests(response.data.quests || []);
        } catch (error) {
            console.error("Erro no fetchquests:", error);
            alert("Não foi possível carregar os quests.");
        }
    };

    const fetchRotas = async () => {
        try {
            const response = await getRotas();
            setRotas(response.data.rotas || []);
        } catch (error) {
            console.error("Erro no fetchRotas:", error);
            // Pode omitir alerta aqui, apenas logar
        }
    };

    // --- Funções de Manipulação de Eventos ---

    // --- handleEditClick IMPLEMENTADO ---
    const handleEditClick = (quest) => {
        console.log("Editando quest:", quest);
        setIdParaEditar(quest._id); // Define o ID para modo de edição

        // Preenche o formulário com os dados existentes
        setNomequest(quest.nomequest || '');
        setDescricaoquest(quest.descricaoquest || '');
        setRotaSelecionada(quest.tituloRota || ''); // Assume que o campo no quest é tituloRota
        setLatitude(quest.latitudequest !== undefined && quest.latitudequest !== null ? String(quest.latitudequest) : '');
        setLongitude(quest.longitudequest !== undefined && quest.longitudequest !== null ? String(quest.longitudequest) : '');

        // Limpa a seleção de NOVO arquivo
        setCapaquestFile(null);

        // Define o nome do arquivo ATUAL para exibição no label
        // Assumindo que o campo da imagem no quest é 'imagemquest'
        const currentFilename = quest.imagemquest ? quest.imagemquest.split('/').pop() : 'Nenhuma';
        setCapaquestFileName(`Manter: ${currentFilename}`);
        setNomeCapaAtual(currentFilename); // Guarda nome original

        // Opcional: Rola para o formulário
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // --- clearForm ATUALIZADO ---
    const clearForm = () => {
        setNomequest('');
        setDescricaoquest('');
        setRotaSelecionada('');
        setLatitude('');
        setLongitude('');
        setCapaquestFile(null);
        setCapaquestFileName('');
        setIdParaEditar(null); // <<< Reseta o modo de edição
        setNomeCapaAtual(''); // <<< Reseta nome da capa atual

        // Limpa visualmente o input de arquivo
        const fileInput = document.getElementById('upload-capaquest');
        if (fileInput) fileInput.value = null;
    };

    // --- NOVA FUNÇÃO: Cancelar Edição ---
    const handleCancelEdit = () => {
        clearForm(); // Limpa e sai do modo de edição
    };

    // --- handlecapaquestFileChange ATUALIZADO ---
    const handlecapaquestFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCapaquestFile(e.target.files[0]);
            // Mostra nome do NOVO arquivo
            setCapaquestFileName(e.target.files[0].name);
        } else {
            // Se cancelou a seleção, volta a mostrar o nome antigo (se estiver editando)
            setCapaquestFile(null);
            setCapaquestFileName(idParaEditar ? `Manter: ${nomeCapaAtual}` : '');
        }
    };

    // --- Função de Criar/Atualizar (POST/PUT) ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Criar o FormData
        const formData = new FormData();

        // 2. Adicionar os campos de texto SEMPRE
        formData.append('nomequest', nomequest);
        formData.append('descricaoquest', descricaoquest);
        formData.append('tituloRota', rotaSelecionada); // Backend espera 'tituloRota'
        formData.append('latitudequest', latitude);
        formData.append('longitudequest', longitude);

        // --- Lógica de Criação vs Atualização ---
        if (idParaEditar) {
            // --- ATUALIZANDO ---
            console.log("Atualizando quest ID:", idParaEditar);

            // 3. Adicionar a NOVA imagem SÓ SE selecionada
            if (capaquestFile) {
                console.log("Anexando NOVA capa:", capaquestFileName);
                // Nome 'capaquest' deve bater com uploadquest.single('capaquest')
                formData.append('capaquest', capaquestFile);
            } else {
                console.log("Mantendo capa existente.");
            }

            try {
                // 4. Chamar a API de UPDATE
                const response = await updatequest(idParaEditar, formData);
                if (response.status === 200) { // Update bem-sucedido (geralmente 200 OK)
                    alert("quest atualizado com sucesso!");
                    clearForm(); // Limpa e sai do modo de edição
                    fetchquests(); // Atualiza a tabela
                }
            } catch (error) {
                console.error("Erro no handleSubmit (Update quest):", error);
                alert(`Erro ao atualizar quest: ${error.response?.data?.error || "Erro desconhecido"}`);
                // Não limpa o form em caso de erro para permitir correção
            }

        } else {
            // --- CRIANDO ---
            console.log("Criando novo quest...");

            // 3. Validar e adicionar a imagem (obrigatória na criação)
            if (!capaquestFile) {
                alert("Por favor, selecione uma imagem de capa para cadastrar.");
                return;
            }
            formData.append('capaquest', capaquestFile);

            try {
                // 4. Chamar a API de CREATE
                const response = await createquest(formData);
                if (response.status === 201) { // Criação bem-sucedida
                    alert("quest cadastrado com sucesso!");
                    clearForm();
                    fetchquests(); // Atualiza a tabela
                }
            } catch (error) {
                console.error("Erro no handleSubmit (Create quest):", error);
                alert(`Erro ao cadastrar quest: ${error.response?.data?.error || "Erro desconhecido"}`);
            }
        }
    };

    // --- Função de Deletar (DELETE) ---
    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este quest?")) {
            return;
        }

        try {
            // O backend deve cuidar da exclusão do arquivo associado
            const response = await deletequest(id);
            if (response.status === 204) {
                alert("quest excluído com sucesso!");
                 // Se o item excluído era o que estava sendo editado, cancela a edição
                if (id === idParaEditar) {
                    clearForm();
                }
                fetchquests(); // Atualiza a tabela
            }
        } catch (error) {
            console.error("Erro no handleDelete:", error);
            const errorMsg = error.response?.data?.error || "Erro ao excluir quest";
            alert(`Erro: ${errorMsg}`);
        }
    };


    // --- Renderização JSX ---
    return (
        <>
            {/* Adiciona ref ao wrapper */}
            <div ref={formRef} className={style.wrapperquests}>
                <div className={style.formquests}>
                    {/* Título Dinâmico */}
                    <p className={style.formTitle}>
                       {idParaEditar ? `Editando quest (ID: ...${idParaEditar.slice(-6)})` : 'Cadastro de quests'}
                    </p>

                    <form onSubmit={handleSubmit} className={style.cadastroquests}>
                        {/* Input Título */}
                        <div className={style.inputWrapper}>
                            <input
                                type="text"
                                placeholder="Título do quest"
                                className={style.inputField}
                                value={nomequest}
                                onChange={(e) => setNomequest(e.target.value)}
                                required
                            />
                        </div>

                        {/* Input Descrição */}
                        <div className={style.inputWrapper}>
                            <input
                                type="text"
                                placeholder="Descrição do quest"
                                className={style.inputField}
                                value={descricaoquest}
                                onChange={(e) => setDescricaoquest(e.target.value)}
                                required
                            />
                        </div>

                        {/* Select de Rotas Dinâmico */}
                        <div className={style.inputWrapper}>
                            <select
                                className={style.inputField}
                                value={rotaSelecionada}
                                onChange={(e) => setRotaSelecionada(e.target.value)}
                                required
                            >
                                <option value="" disabled>Selecione uma rota</option>
                                {rotas.length > 0 ? (
                                    rotas.map((rota) => (
                                        // Usa tituloRota como valor, pois é o que o backend espera
                                        <option key={rota._id} value={rota.tituloRota}>
                                            {rota.tituloRota}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Carregando rotas...</option>
                                )}
                            </select>
                        </div>

                         {/* Inputs Latitude/Longitude */}
                        <div className={style.inputWrapper}>
                            <input
                                type="number"
                                step="any"
                                placeholder="Latitude (ex: -23.5505)"
                                className={style.inputField}
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                required
                            />
                        </div>
                        <div className={style.inputWrapper}>
                            <input
                                type="number"
                                step="any"
                                placeholder="Longitude (ex: -46.6333)"
                                className={style.inputField}
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                required
                            />
                        </div>

                        {/* Input de Arquivo (Label dinâmico) */}
                        <div className={style.inputWrapper}>
                            <label htmlFor="upload-capaquest" className={style.uploadButton}>
                               {capaquestFile ? `Nova Capa: ${capaquestFileName}` : (idParaEditar ? `Capa: ${capaquestFileName}` : 'Upload de capa do quest')}
                            </label>
                            <input
                                id="upload-capaquest"
                                type="file"
                                accept="image/*"
                                className={style.hiddenInput}
                                onChange={handlecapaquestFileChange}
                                // Required apenas na criação
                                required={!idParaEditar}
                            />
                        </div>

                        {/* Botão Submit (Texto dinâmico) */}
                        <button type="submit" className={style.submitButton}>
                           {idParaEditar ? 'Atualizar quest' : 'Cadastrar'}
                        </button>

                         {/* Botão Cancelar Edição (Condicional) */}
                         {idParaEditar && (
                            <button
                                type="button" // Previne submit
                                onClick={handleCancelEdit}
                                className={style.submitButton} // Reutiliza estilo ou cria um novo
                                style={{ marginTop: '10px', backgroundColor: '#aaa', borderColor: '#999' }}
                            >
                                Cancelar Edição
                            </button>
                        )}
                    </form>
                </div>

                {/* Tabela */}
                <div className={style.tableContainer}>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Imagem</th>
                                <th>Título</th>
                                <th>Descrição</th>
                                <th>Rota</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quests.length > 0 ? (
                                quests.map((quest) => (
                                    <tr key={quest._id}>
                                        <td data-label="Id">{quest._id.slice(-6)}</td>
                                        <td>
                                            <img
                                                // CONFIRME: O campo no DB é 'imagemquest'?
                                                src={quest.imagemquest || "/logo_quadrado.png"}
                                                className={style.tableImage}
                                                alt="Capa do quest"
                                                onError={(e) => e.target.src = "/logo_quadrado.png"}
                                            />
                                        </td>
                                        <td data-label="Título">{quest.nomequest}</td>
                                        <td data-label="Descrição">{quest.descricaoquest}</td>
                                        <td data-label="Rota">{quest.tituloRota}</td>
                                        <td data-label="Latitude">{quest.latitudequest}</td>
                                        <td data-label="Longitude">{quest.longitudequest}</td>
                                        <td data-label="Ações">
                                            {/* Botão Editar chama handleEditClick */}
                                            <button onClick={() => handleEditClick(quest)} className={`${style.actionButton} ${style.editarButton}`}>
                                                Editar
                                            </button>
                                            <button onClick={() => handleDelete(quest._id)} className={`${style.actionButton} ${style.excluirButton}`}>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center' }}>Nenhum quest encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Consultarquests;