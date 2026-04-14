import { useState, useEffect } from 'react';
// 1. Adjust CSS module import if needed
import style from "@/components/ConsultarModelagens/ConsultarModelagens.module.css";
import dynamic from 'next/dynamic';
import { getModelagens, createModelagem, updateModelagem, deleteModelagem, getquests } from '@/services/api';

const ModalViewer3D = dynamic(
    () => import('@/components/ModalViewer3D'),
    { ssr: false }
);

const ConsultarModelagens = () => {
    // --- State for IBGE Cities (existing) ---
    const API_CIDADES_SP_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/municipios';
    const [cidades, setCidades] = useState([]);
    const [isLoadingCities, setIsLoadingCities] = useState(true); // Renamed for clarity

    // --- States for Form Inputs (match service) ---
    const [nomeModelagem, setNomeModelagem] = useState('');
    const [nomeCidade, setNomeCidade] = useState('');
    const [nomequest, setNomequest] = useState(''); // quest name

    const [arquivoQrCodeFile, setArquivoQrCodeFile] = useState(null); // File object
    const [arquivoQrCodeFileName, setArquivoQrCodeFileName] = useState(''); // Display name
    const [arquivoModelagemFile, setArquivoModelagemFile] = useState(null); // File object (ZIP)
    const [arquivoModelagemFileName, setArquivoModelagemFileName] = useState(''); // Display name
    const [arquivoQrCodeExistente, setArquivoQrCodeExistente] = useState(''); // path stored in DB
    const [arquivoModelagemExistente, setArquivoModelagemExistente] = useState(''); // path stored in DB
    const [editingId, setEditingId] = useState(null);

    const [modelagens, setModelagens] = useState([]); // List for table
    const [quests, setquests] = useState([]); // List for dropdown

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modeloSelecionadoUrl, setModeloSelecionadoUrl] = useState(''); // URL/Path for the modal

    useEffect(() => {
        // Fetch Cities
        setIsLoadingCities(true);
        fetch(API_CIDADES_SP_URL)
            .then(response => response.json())
            .then(data => {
                const cidadesOrdenadas = data.sort((a, b) => a.nome.localeCompare(b.nome));
                setCidades(cidadesOrdenadas);
                setIsLoadingCities(false);
            })
            .catch(error => {
                console.error('Erro ao buscar cidades de SP:', error);
                setIsLoadingCities(false);
            });

        // Fetch Modelagens and quests from our API
        fetchModelagens();
        fetchquests();
    }, []);

    // --- API Fetch Functions ---
    const fetchModelagens = async () => {
        try {
            const response = await getModelagens();
            setModelagens(response.data.modelagens || []);
        } catch (error) {
            console.error("Erro no fetchModelagens:", error);
            alert("Não foi possível carregar as modelagens.");
        }
    };

    const fetchquests = async () => {
        try {
            const response = await getquests();
            setquests(response.data.quests || []);
        } catch (error) {
            console.error("Erro no fetchquests (dropdown):", error);
        }
    };

    // --- CRUD Handlers ---
    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir esta modelagem? Os arquivos associados (QR Code e pasta do modelo) também serão removidos permanentemente.")) {
            return;
        }
        try {
            const response = await deleteModelagem(id);
            if (response.status === 204) {
                alert("Modelagem excluída com sucesso!");
                fetchModelagens(); // Refresh table
            }
        } catch (error) {
            console.error("Erro no handleDelete (Modelagem):", error);
            alert(`Erro: ${error.response?.data?.error || "Erro ao excluir modelagem"}`);
        }
    };

    const handleEditClick = (modelagem) => {
        // Populate form with existing data for editing
        setNomeModelagem(modelagem.nomeModelagem || '');
        setNomeCidade(modelagem.nomeCidade || '');
        setNomequest(modelagem.nomequest || '');
        // store existing file paths so we can send them if user doesn't change files
        setArquivoQrCodeExistente(modelagem.arquivoQrCode || '');
        setArquivoModelagemExistente(modelagem.arquivoModelagem || '');
        // Reset selected File objects (user can choose new ones)
        setArquivoQrCodeFile(null);
        setArquivoModelagemFile(null);
        setArquivoQrCodeFileName(modelagem.arquivoQrCode ? modelagem.arquivoQrCode.split('/').pop() : '');
        setArquivoModelagemFileName(modelagem.arquivoModelagem ? modelagem.arquivoModelagem.split('/').pop() : '');
        setEditingId(modelagem._id);
        // Optionally scroll to form or focus
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearForm = () => {
        setNomeModelagem('');
        setNomeCidade('');
        setNomequest('');
        setArquivoQrCodeFile(null);
        setArquivoQrCodeFileName('');
        setArquivoModelagemFile(null);
        setArquivoModelagemFileName('');
        setArquivoQrCodeExistente('');
        setArquivoModelagemExistente('');
        setEditingId(null);
        // Reset file input fields visually
        const qrInput = document.getElementById('upload-arquivoQrCode'); // Use correct ID
        const zipInput = document.getElementById('upload-arquivoModelagem'); // Use correct ID
        if (qrInput) qrInput.value = null;
        if (zipInput) zipInput.value = null;
    };

    // --- File Input Handlers ---
    const handleQrCodeFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setArquivoQrCodeFile(e.target.files[0]);
            setArquivoQrCodeFileName(e.target.files[0].name);
        } else {
            setArquivoQrCodeFile(null); setArquivoQrCodeFileName('');
        }
    };

    const handleModelagemFileChange = (e) => { // Handles ZIP file
        if (e.target.files && e.target.files[0]) {
            if (!e.target.files[0].name.toLowerCase().endsWith('.zip')) {
                alert("Por favor, selecione um arquivo .zip para o modelo 3D.");
                e.target.value = null; // Clear invalid selection
                setArquivoModelagemFile(null); setArquivoModelagemFileName('');
                return;
            }
            setArquivoModelagemFile(e.target.files[0]);
            setArquivoModelagemFileName(e.target.files[0].name);
        } else {
            setArquivoModelagemFile(null); setArquivoModelagemFileName('');
        }
    };

    // --- Form Submission ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for files
        // If we're editing, files are optional; if creating, require both
        if (!editingId && (!arquivoQrCodeFile || !arquivoModelagemFile)) {
            alert("Por favor, selecione a imagem do QR Code e o arquivo .zip da modelagem.");
            return;
        }

        const formData = new FormData();

        // Append text fields
        formData.append('nomeModelagem', nomeModelagem);
        formData.append('nomeCidade', nomeCidade);
        formData.append('nomequest', nomequest);

        // Files: if new files selected, append them; otherwise append existing path strings so backend preserves
        if (arquivoQrCodeFile) {
            formData.append('arquivoQrCode', arquivoQrCodeFile);
        } else if (arquivoQrCodeExistente) {
            formData.append('arquivoQrCode', arquivoQrCodeExistente);
        }

        if (arquivoModelagemFile) {
            formData.append('arquivoModelagem', arquivoModelagemFile);
        } else if (arquivoModelagemExistente) {
            formData.append('arquivoModelagem', arquivoModelagemExistente);
        }

        try {
            let response;
            if (editingId) {
                // Update existing modelagem
                response = await updateModelagem(editingId, formData);
                if (response.status === 200) {
                    alert("Modelagem atualizada com sucesso!");
                    clearForm();
                    setEditingId(null);
                    fetchModelagens();
                }
            } else {
                // Create new
                response = await createModelagem(formData);
                if (response.status === 201) {
                    alert("Modelagem cadastrada com sucesso!");
                    clearForm(); // Clear the form
                    fetchModelagens(); // Refresh the table
                }
            }
        } catch (error) {
            console.error("Erro no handleSubmit (Modelagem):", error);
            alert(`Erro: ${error.response?.data?.error || "Erro ao cadastrar/atualizar modelagem"}`);
        }
    };

    // --- Modal Handlers ---
    const handleAbrirModal = (modelagem) => {
        // Pega o caminho da PASTA salvo no banco
        const basePath = modelagem.arquivoModelagem; // Ex: /uploads/modelagens/extracted/MeuModelo-12345
        if (!basePath) {
            console.error("Caminho da modelagem não encontrado para:", modelagem.nomeModelagem);
            alert("Não foi possível encontrar o caminho para o modelo 3D.");
            return;
        }
        // Assume que o arquivo principal dentro da pasta é 'scene.gltf'
        // *** SE FOR OUTRO NOME (ex: model.glb), AJUSTE AQUI ***
        const modelUrl = `${basePath}/scene.gltf`;

        console.log("Abrindo modal para:", modelUrl); // Para debug
        setModeloSelecionadoUrl(modelUrl); // Define a URL para o modal
        setIsModalOpen(true); // Abre o modal
    };

    // 5. Função para FECHAR o modal
    const handleFecharModal = () => {
        setIsModalOpen(false);
        setModeloSelecionadoUrl(''); // Limpa a URL ao fechar
    };

    //DADOS MOCKADOS
    const handleAbrirModalMock = () => {
        const mockModelUrl = "/modelos/teste/scene.gltf"; // Sua URL mockada

        console.log("Abrindo modal (MOCK) para:", mockModelUrl);
        setModeloSelecionadoUrl(mockModelUrl);
        setIsModalOpen(true);
    };


    return(
        <>
            <div className={style.wrapperModelagens}>

            {/* Form Section */}
            <div className={style.formModelagens}>
                <p className={style.formTitle}>Cadastro de Modelagens</p>

                {/* 3. Form uses onSubmit */}
                <form onSubmit={handleSubmit} className={style.cadastroModelagens}>
                    {/* Nome Modelagem */}
                    <div className={style.inputWrapper}>
                        <input
                            type="text"
                            placeholder="Nome da modelagem"
                            className={style.inputField}
                            value={nomeModelagem}
                            onChange={(e) => setNomeModelagem(e.target.value)}
                            required
                        />
                    </div>

                    {/* Cidade (using IBGE datalist) */}
                    <div className={style.inputWrapper}>
                        <input
                            type="text"
                            list="cidades-sp-lista"
                            placeholder={isLoadingCities ? "Carregando cidades..." : "Cidade (SP)"}
                            disabled={isLoadingCities}
                            className={style.inputField}
                            value={nomeCidade}
                            onChange={(e) => setNomeCidade(e.target.value)}
                            required
                        />
                        <datalist id="cidades-sp-lista">
                            {cidades.map((cidade) => (
                                <option key={cidade.id} value={cidade.nome} />
                            ))}
                        </datalist>
                    </div>

                    {/* quest Dropdown (Dynamic) */}
                    <div className={style.inputWrapper}>
                        <select
                            className={style.inputField}
                            value={nomequest}
                            onChange={(e) => setNomequest(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecione um quest</option>
                            {/* 4. Map dynamic quests */}
                            {quests.length > 0 ? (
                                quests.map((cp) => (
                                    <option key={cp._id} value={cp.nomequest}>
                                        {cp.nomequest}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Carregando...</option>
                            )}
                        </select>
                    </div>

                    {/* QR Code File Upload */}
                    <div className={style.inputWrapper}>
                        {/* 5. Correct id, htmlFor, onChange */}
                        <label htmlFor="upload-arquivoQrCode" className={style.uploadButton}>
                            {arquivoQrCodeFileName ? `QR Code: ${arquivoQrCodeFileName}` : 'Upload de QR Code (.png, .jpg)'}
                        </label>
                        <input
                            id="upload-arquivoQrCode" // Match htmlFor and multer field name idea
                            type="file"
                            accept="image/*" // Standard image types
                            className={style.hiddenInput}
                            onChange={handleQrCodeFileChange}
                            // 'required' handled in handleSubmit validation
                        />
                    </div>

                    {/* Modelagem ZIP File Upload */}
                    <div className={style.inputWrapper}>
                         {/* 6. Correct id, htmlFor, onChange, accept */}
                        <label htmlFor="upload-arquivoModelagem" className={style.uploadButton}>
                            {arquivoModelagemFileName ? `Modelo: ${arquivoModelagemFileName}` : 'Upload Modelo 3D (.zip)'}
                        </label>
                        <input
                            id="upload-arquivoModelagem" // Match htmlFor and multer field name idea
                            type="file"
                            accept=".zip,application/zip,application/x-zip-compressed" // ZIP types
                            className={style.hiddenInput}
                            onChange={handleModelagemFileChange}
                             // 'required' handled in handleSubmit validation
                        />
                    </div>

                    <button type="submit" className={style.submitButton}>Cadastrar</button>
                </form>
            </div>

            {/* Table Section */}
            <div className={style.tableContainer}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>QR Code</th>
                            <th>Nome Modelagem</th>
                            <th>Cidade</th>
                            <th>quest</th>
                            <th>Visualizar</th> {/* Changed from Modelagem */}
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                         {/* Dados mockados */}
                        <tr>
                        <td data-label="Id">01</td>
                        <td><img src="/qr.png" className={style.tableImage} alt="QR Code Mock"/></td>
                        <td data-label="Título">Galpões do KKKK</td>
                        <td data-label="Cidade">Registro</td>
                        <td data-label="quest">Galpões do KKKK</td>
                         <td data-label="Modelagem">
                                   <button
                                        // *** USA O HANDLER DE MOCK AQUI ***
                                        onClick={handleAbrirModalMock}
                                        // *** FIM DA MODIFICAÇÃO ***
                                        className={`${style.actionButton} ${style.visualizarButton}`}
                                    >
                                        Visualizar
                                    </button>
                        </td>
                        <td data-label="Ações">
                                        <button onClick={() => handleEditClick(modelagem)} className={`${style.actionButton} ${style.editarButton}`}>
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(modelagem._id)} className={`${style.actionButton} ${style.excluirButton}`}>
                                            Excluir
                                        </button>
                                    </td>
                    </tr>

                        {/* 7. Map dynamic modelagens */}
                        {modelagens.length > 0 ? (
                            modelagens.map((modelagem) => (
                                <tr key={modelagem._id}>
                                    <td data-label="Id">{modelagem._id.slice(-6)}</td>
                                    {/* QR Code Image */}
                                    <td data-label="QR Code">
                                        <img
                                            // 8. Use correct field from DB (arquivoQrCode)
                                            src={modelagem.arquivoQrCode || "/logo_quadrado.png"}
                                            className={style.tableImage}
                                            alt="QR Code Preview"
                                            onError={(e) => e.target.src = "/logo_quadrado.png"}
                                        />
                                    </td>
                                    {/* Other Data Fields */}
                                    <td data-label="Nome Modelagem">{modelagem.nomeModelagem}</td>
                                    <td data-label="Cidade">{modelagem.nomeCidade}</td>
                                    <td data-label="quest">{modelagem.nomequest}</td>
                                    {/* Visualize Button */}
                                    <td data-label="Visualizar">
                                        <button
                                            // 9. Pass the specific modelagem to the handler
                                            onClick={() => handleAbrirModal(modelagem)}
                                            className={`${style.actionButton} ${style.visualizarButton}`} // Ensure .visualizarButton exists in CSS
                                        >
                                            Visualizar
                                        </button>
                                    </td>
                                    {/* Action Buttons */}
                                    <td data-label="Ações">
                                        <button onClick={() => handleEditClick(modelagem)} className={`${style.actionButton} ${style.editarButton}`}>
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(modelagem._id)} className={`${style.actionButton} ${style.excluirButton}`}>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                {/* 10. Adjust colspan */}
                                <td colSpan="7" style={{ textAlign: 'center' }}>Nenhuma modelagem encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Modal conditionally rendered */}
        {isModalOpen && (
            <ModalViewer3D
                onClose={handleFecharModal}
                // 11. Pass dynamic URL
                urlModelo={modeloSelecionadoUrl}
            />
        )}
    </>
    );
}

export default ConsultarModelagens;