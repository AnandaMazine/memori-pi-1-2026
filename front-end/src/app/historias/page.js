"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { buildApiUrl } from "@/lib/api";

const POSES_PADRAO = [
  "Neutro",
  "Feliz",
  "Triste",
  "Bravo",
  "Explicando",
  "Preocupado",
  "Alerta",
  "Apontando",
  "Pensativo",
];

const normalizePersonagem = (p) => ({
  ...p,
  id: p.id || p._id,
  nome: p.nomePersonagem || p.nome || "Sem nome",
  poses: Array.isArray(p.poses)
    ? p.poses
        .map((poseItem, index) => {
          if (typeof poseItem === "string") {
            return POSES_PADRAO[index] || `Pose ${index + 1}`;
          }

          return poseItem?.pose || poseItem?.nome || POSES_PADRAO[index] || `Pose ${index + 1}`;
        })
        .filter(Boolean)
    : [],
});

const normalizeQuest = (quest) => ({
  ...quest,
  id: quest.id || quest._id,
  nome: quest.nomeQuest || quest.nome,
});

const normalizeModelagem = (modelagem) => ({
  ...modelagem,
  id: modelagem.id || modelagem._id,
  nome: modelagem.nomeModelagem || modelagem.nome,
});

const normalizeDesafio = (desafio) => ({
  ...desafio,
  id: desafio.id || desafio._id,
  nome: desafio.pergunta || desafio.nome,
});

const normalizeCapitulo = (capitulo) => {
  const tipoOriginal = capitulo.tipoBloco || capitulo.type;
  const tipoBloco = tiposBlocoValidos.has(tipoOriginal) ? tipoOriginal : "Capítulo";
  const idPersonagemNormalizado =
    capitulo.idPersonagem?._id || capitulo.idPersonagem || capitulo.personagemId || "";
  const idHistoriaNormalizado = capitulo.idHistoria?._id || capitulo.idHistoria || "";
  const idReferenciaNormalizado = capitulo.idReferencia || capitulo.refId || "";

  return {
    ...capitulo,
    id: capitulo.id || capitulo._id,
    titulo: capitulo.tituloBloco || capitulo.titulo || "Sem título",
    conteudo: capitulo.conteudoDialogo || capitulo.conteudo || "",
    pose: capitulo.pose || "Neutro",
    ordem: capitulo.ordem || 0,
    personagemId: String(idPersonagemNormalizado || ""),
    tipoBloco,
    idReferencia: String(idReferenciaNormalizado || ""),
    idHistoria: String(idHistoriaNormalizado || ""),
  };
};

const getCreatedAtFromId = (id) => {
  if (!id || String(id).length < 8) return new Date().toISOString();

  const seconds = Number.parseInt(String(id).slice(0, 8), 16);
  if (Number.isNaN(seconds)) return new Date().toISOString();

  return new Date(seconds * 1000).toISOString();
};

const isMongoId = (value) => /^[a-fA-F0-9]{24}$/.test(String(value || ""));

const tiposBlocoValidos = new Set(["Quest", "Desafio", "Modelagem", "Capítulo"]);

const sameId = (a, b) => String(a || "") === String(b || "");

const inferTipoBloco = (capitulo, lookups = {}) => {
  const tipoExplicito = capitulo.tipoBloco || capitulo.type;
  if (tiposBlocoValidos.has(tipoExplicito)) {
    return tipoExplicito;
  }

  const idReferencia = String(capitulo.idReferencia || capitulo.refId || "");
  if (!idReferencia) {
    return "Capítulo";
  }

  if (Array.isArray(lookups.quests) && lookups.quests.some((quest) => sameId(quest.id, idReferencia))) {
    return "Quest";
  }

  if (Array.isArray(lookups.modelagens) && lookups.modelagens.some((modelagem) => sameId(modelagem.id, idReferencia))) {
    return "Modelagem";
  }

  if (Array.isArray(lookups.desafios) && lookups.desafios.some((desafio) => sameId(desafio.id, idReferencia))) {
    return "Desafio";
  }

  return "Capítulo";
};

const buildHistoriaWithTimeline = (historia, capitulos, lookups = {}) => {
  const historiaId = historia.id || historia._id;

  const timeline = capitulos
    .filter((capitulo) => String(capitulo.idHistoria || "") === String(historiaId || ""))
    .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
    .map((capitulo) => {
      const tipoFinal = inferTipoBloco(capitulo, lookups);
      const isCapitulo = tipoFinal === "Capítulo";

      const personagemObj = isCapitulo && Array.isArray(lookups.personagens)
        ? lookups.personagens.find((p) => sameId(p.id, capitulo.personagemId))
        : null;

      return {
        tempId: capitulo.id || capitulo._id,
        type: tipoFinal,
        isNew: false,
        refId: isCapitulo ? "" : String(capitulo.idReferencia || ""),
        displayNome: capitulo.titulo || capitulo.conteudo || tipoFinal,
        meta: isCapitulo
          ? {
              personagemId: capitulo.personagemId || "",
              personagem: personagemObj?.nome || "Desconhecido",
              pose: capitulo.pose || "Neutro",
              conteudo: capitulo.conteudo || "",
            }
          : {
              conteudo: capitulo.conteudo || "",
            },
      };
    });

  return {
    ...historia,
    id: historiaId,
    questId: historia.idQuest || historia.questId || "",
    created_at: historia.created_at || historia.createdAt || getCreatedAtFromId(historiaId),
    timeline,
  };
};

export default function StoryBatchBuilder() {
  const [historias, setHistorias] = useState([]);
  const [capitulos, setCapitulos] = useState([]);
  const [quests, setQuests] = useState([]);
  const [modelagens, setModelagens] = useState([]);
  const [desafios, setDesafios] = useState([]);
  const [personagensDisponiveis, setPersonagensDisponiveis] = useState([]);
  const [tituloHistoria, setTituloHistoria] = useState("");
  const [questSelecionadaId, setQuestSelecionadaId] = useState("");
  const [storyline, setStoryline] = useState([]);
  
  const [editingHistoriaId, setEditingHistoriaId] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const [novoCapitulo, setNovoCapitulo] = useState({ 
    titulo: "", 
    conteudo: "", 
    personagemId: "", 
    pose: "Neutro" 
  });

  const reloadPublishedData = async () => {
    const [historiaRes, capituloRes] = await Promise.all([
      fetch(buildApiUrl("historia")),
      fetch(buildApiUrl("capitulo")),
    ]);

    if (!historiaRes.ok || !capituloRes.ok) {
      return;
    }

    const hData = await historiaRes.json();
    const cData = await capituloRes.json();
    const capitulosApi = Array.isArray(cData.capitulos) ? cData.capitulos : [];
    const capitulosNormalizados = capitulosApi.map(normalizeCapitulo);
    setCapitulos(capitulosNormalizados);
    const historiasApi = Array.isArray(hData.historia) ? hData.historia : [];
    setHistorias(historiasApi.map((historia) => buildHistoriaWithTimeline(historia, capitulosNormalizados, {
      quests,
      modelagens,
      desafios,
      personagens: personagensDisponiveis,
    })));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [questRes, modelRes, desRes, historiaRes, capituloRes, personagemRes] = await Promise.all([
          fetch(buildApiUrl("quest")),
          fetch(buildApiUrl("modelagem")),
          fetch(buildApiUrl("desafio")),
          fetch(buildApiUrl("historia")),
          fetch(buildApiUrl("capitulo")),
          fetch(buildApiUrl("personagem")),
        ]);

        const qData = questRes.ok ? await questRes.json() : {};
        const mData = modelRes.ok ? await modelRes.json() : {};
        const dData = desRes.ok ? await desRes.json() : {};

        const questsApi = Array.isArray(qData.quests) ? qData.quests : [];
        const modelagensApi = Array.isArray(mData.modelagens) ? mData.modelagens : [];
        const desafiosApi = Array.isArray(dData.desafios) ? dData.desafios : [];

        const questsNormalizadas = questsApi.map(normalizeQuest);
        const modelagensNormalizadas = modelagensApi.map(normalizeModelagem);
        const desafiosNormalizados = desafiosApi.map(normalizeDesafio);

        setQuests(questsNormalizadas);
        setModelagens(modelagensNormalizadas);
        setDesafios(desafiosNormalizados);

        if (capituloRes.ok) {
          const cData = await capituloRes.json();
          const capitulosApi = Array.isArray(cData.capitulos) ? cData.capitulos : [];
          const capitulosNormalizados = capitulosApi.map(normalizeCapitulo);
          setCapitulos(capitulosNormalizados);

          if (historiaRes.ok) {
            const hData = await historiaRes.json();
            const historiasApi = Array.isArray(hData.historia) ? hData.historia : [];
            setHistorias(historiasApi.map((historia) => buildHistoriaWithTimeline(historia, capitulosNormalizados, {
              quests: questsNormalizadas,
              modelagens: modelagensNormalizadas,
              desafios: desafiosNormalizados,
              personagens: personagensDisponiveis,
            })));
          }
        }

        if (personagemRes) {
          if (personagemRes.ok) {
            const pData = await personagemRes.json();
            const personagensApi = Array.isArray(pData.personagens)
              ? pData.personagens
              : Array.isArray(pData.personagem)
              ? pData.personagem
              : [];
            console.debug("Loaded personagens:", personagensApi.length, personagensApi.map(p => p._id || p.id), pData);
            setPersonagensDisponiveis(personagensApi.map(normalizePersonagem));
          } else {
            console.warn("Falha ao buscar personagens:", personagemRes.status);
          }
        } else if (historiaRes.ok) {
          const hData = await historiaRes.json();
          const historiasApi = Array.isArray(hData.historia) ? hData.historia : [];
          setHistorias(historiasApi.map((historia) => buildHistoriaWithTimeline(historia, [], {
            quests,
            modelagens,
            desafios,
            personagens: personagensDisponiveis,
          })));
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };
    loadData();
  }, []);

  const questSelecionadaObj = quests.find(q => q._id === questSelecionadaId || q.id === questSelecionadaId);
  const modelosDaQuest = questSelecionadaObj 
    ? modelagens.filter(m => {
        const questModelosIds = Array.isArray(questSelecionadaObj.modelosIds) ? questSelecionadaObj.modelosIds : [];
        return questModelosIds.includes(m._id || m.id);
      })
    : [];

  const personagemSelecionado = personagensDisponiveis.find(
    (personagem) => personagem.id === novoCapitulo.personagemId,
  );
  const posesDoPersonagemSelecionado = Array.isArray(personagemSelecionado?.poses)
    ? personagemSelecionado.poses.filter(Boolean)
    : [];
  const posesDisponiveis = posesDoPersonagemSelecionado.length > 0
    ? posesDoPersonagemSelecionado
    : ["Neutro"];

  const modelosSoltos = modelagens.filter(m => !modelosDaQuest.find(mq => (mq._id || mq.id) === (m._id || m.id)));

  const addExistingItem = (item, type) => {
    const block = {
      tempId: Math.random().toString(36).substr(2, 9),
      type: type,
      isNew: false,
      refId: item.id,
      displayNome: item.nome,
    };
    setStoryline([...storyline, block]);
  };

  const handleAddTempChapter = async (e) => {
    e.preventDefault();
    const personagemNome = personagensDisponiveis.find(p => p.id === novoCapitulo.personagemId)?.nome || "Desconhecido";
    
    const block = {
      tempId: Math.random().toString(36).substr(2, 9),
      type: "Capítulo",
      isNew: true,
      personagemId: novoCapitulo.personagemId,
      displayNome: novoCapitulo.titulo,
      meta: {
        personagemId: novoCapitulo.personagemId,
        personagem: personagemNome,
        pose: novoCapitulo.pose,
        conteudo: novoCapitulo.conteudo
      }
    };

    if (editingHistoriaId) {
      try {
        const capituloRes = await fetch(buildApiUrl("capitulo"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tituloBloco: novoCapitulo.titulo,
            conteudoDialogo: novoCapitulo.conteudo,
            pose: novoCapitulo.pose,
            tipoBloco: "Capítulo",
            idReferencia: "",
            ordem: storyline.length + 1,
            idHistoria: editingHistoriaId,
            ...(isMongoId(novoCapitulo.personagemId) ? { idPersonagem: novoCapitulo.personagemId } : {}),
          }),
        });

        if (!capituloRes.ok) {
          throw new Error("Falha ao salvar capítulo");
        }

        setStoryline([...storyline, block]);
        await reloadPublishedData();
      } catch (error) {
        console.error("Erro ao salvar capítulo:", error);
      }
    } else {
      setStoryline([...storyline, block]);
    }

    setNovoCapitulo({ titulo: "", conteudo: "", personagemId: "", pose: "Neutro" });
    setIsModalOpen(false);
  };

  const handlePersonagemChange = (personagemId) => {
    const personagem = personagensDisponiveis.find((item) => item.id === personagemId);
    const posesDoPersonagem = Array.isArray(personagem?.poses) ? personagem.poses.filter(Boolean) : [];
    const poseAtualValida = posesDoPersonagem.includes(novoCapitulo.pose);

    setNovoCapitulo({
      ...novoCapitulo,
      personagemId,
      pose: poseAtualValida ? novoCapitulo.pose : (posesDoPersonagem[0] || "Neutro"),
    });
  };

  const handleEditHistoria = (historia) => {
    setTituloHistoria(historia.titulo);
    setQuestSelecionadaId(historia.questId || "");

    const built = buildHistoriaWithTimeline(historia, capitulos, {
      quests,
      modelagens,
      desafios,
      personagens: personagensDisponiveis,
    });

    setStoryline(
      (built.timeline || []).map((item) => ({
        ...item,
        tempId: item.tempId || Math.random().toString(36).substr(2, 9),
      })),
    );

    setEditingHistoriaId(historia.id);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setTituloHistoria("");
    setQuestSelecionadaId("");
    setStoryline([]);
    setEditingHistoriaId(null);
  };

  const handleRemoveTimelineItem = (index, item) => {
    if (item.type === "Quest") {
      setQuestSelecionadaId("");
    }

    setStoryline(storyline.filter((_, currentIndex) => currentIndex !== index));
  };

  const handleSaveStory = async () => {
    const itensParaSalvar = storyline;
    if (itensParaSalvar.length === 0) return;
    
    setIsSaving(true);
    
    try {
      const tituloParaSalvar = tituloHistoria.trim() || `História sem título`;

      const historiaPayload = {
        titulo: tituloParaSalvar,
        descricao: tituloParaSalvar,
        idQuest: questSelecionadaId || null,
      };

      let historiaId = editingHistoriaId;

      if (editingHistoriaId) {
        const updateRes = await fetch(buildApiUrl(`historia/${editingHistoriaId}`), {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(historiaPayload),
        });

        if (!updateRes.ok) {
          throw new Error("Falha ao atualizar história");
        }

        await fetch(buildApiUrl(`capitulo/historia/${editingHistoriaId}`), {
          method: "DELETE",
        });
      } else {
        const createRes = await fetch(buildApiUrl("historia"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(historiaPayload),
        });

        if (!createRes.ok) {
          throw new Error("Falha ao publicar história");
        }

        const createJson = await createRes.json();
        historiaId = createJson.historia?.id || createJson.historia?._id || historiaId;
      }

      if (!historiaId) {
        throw new Error("Não foi possível identificar a história criada");
      }

      const capitulosParaSalvar = itensParaSalvar.map((item, index) => {
        const tipoBloco = tiposBlocoValidos.has(item.type) ? item.type : "Capítulo";
        const isCapitulo = tipoBloco === "Capítulo";
        const personagemId = item.meta?.personagemId || item.personagemId || "";

        return {
          tituloBloco: item.displayNome || item.titulo || `Bloco ${index + 1}`,
          conteudoDialogo: item.meta?.conteudo || item.conteudo || "",
          pose: isCapitulo ? (item.meta?.pose || item.pose || "Neutro") : "",
          tipoBloco,
          idReferencia: isCapitulo ? "" : String(item.refId || item.idReferencia || ""),
          ordem: index + 1,
          idHistoria: historiaId,
          ...(isCapitulo && isMongoId(personagemId)
            ? { idPersonagem: personagemId }
            : {}),
        };
      });

      for (const capitulo of capitulosParaSalvar) {
        const capituloRes = await fetch(buildApiUrl("capitulo"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(capitulo),
        });

        if (!capituloRes.ok) {
          throw new Error("Falha ao salvar capítulo");
        }
      }

      await reloadPublishedData();

      handleCancelEdit();
    } catch (error) {
      console.error("Erro ao publicar história:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      try {
        const res = await fetch(buildApiUrl(`historia/${deleteConfirm.id}`), {
          method: "DELETE",
        });

        if (!res.ok && res.status !== 204) {
          throw new Error("Falha ao excluir história");
        }

        await (async () => {
          const [historiaRes, capituloRes] = await Promise.all([
            fetch(buildApiUrl("historia")),
            fetch(buildApiUrl("capitulo")),
          ]);

          if (historiaRes.ok && capituloRes.ok) {
            const hData = await historiaRes.json();
            const cData = await capituloRes.json();
            const capitulosApi = Array.isArray(cData.capitulos) ? cData.capitulos : [];
            const capitulosNormalizados = capitulosApi.map(normalizeCapitulo);
            setCapitulos(capitulosNormalizados);
            const historiasApi = Array.isArray(hData.historia) ? hData.historia : [];
            setHistorias(historiasApi.map((historia) => buildHistoriaWithTimeline(historia, capitulosNormalizados, {
              quests,
              modelagens,
              desafios,
              personagens: personagensDisponiveis,
            })));
          }
        })();

        if (editingHistoriaId === deleteConfirm.id) {
          handleCancelEdit();
        }
        setDeleteConfirm(null);
      } catch (error) {
        console.error("Erro ao excluir história:", error);
      }
    }
  };

  const isEditing = editingHistoriaId !== null;
  const hasEditableTimelineItems = storyline.some((item) => item.type !== "Quest");

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 flex flex-col gap-12">
        <header className="border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Histórias</h1>
          <p className="mt-2 text-sm text-gray-500">
            {isEditing ? `Editando história: ${tituloHistoria}` : "Crie, edite ou remova histórias"}
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          <div className="xl:col-span-4">
            <div className="bg-gray-50 p-6 rounded-lg outline outline-1 outline-gray-200 sticky top-8">
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="w-full mb-8 flex items-center justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 transition-colors"
              >
                + Adicionar Capítulo
              </button>
              
              <div className="space-y-8">
                
                {questSelecionadaObj && modelosDaQuest.length > 0 && (
                  <div className="space-y-3 bg-red-50/50 p-3 -mx-3 rounded-lg outline outline-1 outline-red-100">
                    <h3 className="text-xs font-bold text-red-900 border-b border-red-200 pb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </h3>
                    <div className="space-y-2">
                      {modelosDaQuest.map(m => (
                        <button key={m.id} onClick={() => addExistingItem(m, 'Modelagem')} className="w-full text-left px-3 py-2 text-sm font-medium bg-white outline outline-1 outline-red-200 rounded-md hover:outline-red-400 flex justify-between items-center group transition-all text-gray-900 shadow-sm">
                          {m.nome} <span className="text-red-400 opacity-0 group-hover:opacity-100 font-bold">+</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-900 border-b border-gray-200 pb-2">Desafios Gerais</h3>
                  <div className="space-y-2">
                    {desafios.map(d => (
                      <button key={d._id || d.id} onClick={() => addExistingItem(d, 'Desafio')} className="w-full text-left px-3 py-2 text-sm font-medium bg-white outline outline-1 outline-gray-200 rounded-md hover:outline-red-400 flex justify-between items-center group transition-all text-gray-700 shadow-sm">
                        {d.pergunta || d.nome} <span className="text-red-400 opacity-0 group-hover:opacity-100 font-bold">+</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-900 border-b border-gray-200 pb-2">Outras Modelagens</h3>
                  <div className="space-y-2">
                    {modelosSoltos.map(m => (
                      <button key={m.id} onClick={() => addExistingItem(m, 'Modelagem')} className="w-full text-left px-3 py-2 text-sm font-medium bg-white outline outline-1 outline-gray-200 rounded-md hover:outline-red-400 flex justify-between items-center group transition-all text-gray-700 shadow-sm">
                        {m.nome} <span className="text-red-400 opacity-0 group-hover:opacity-100 font-bold">+</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="xl:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-lg outline outline-1 outline-gray-200 p-8 shadow-sm min-h-[400px] flex flex-col">
              
              <div className="mb-8 space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Título da História..." 
                    value={tituloHistoria} 
                    onChange={(e) => setTituloHistoria(e.target.value)} 
                    className="w-full text-2xl font-bold tracking-tight text-gray-900 border-none focus:ring-0 placeholder:text-gray-300 p-0" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Vincular a uma Quest (Opcional)</label>
                  <select 
                    value={questSelecionadaId}
                    onChange={(e) => setQuestSelecionadaId(e.target.value)}
                    className="block w-full max-w-md rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                  >
                    <option value="">História avulsa (Sem quest)</option>
                    {quests.map(q => (
                      <option key={q._id || q.id} value={q._id || q.id}>{q.nomeQuest || q.nome}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* LINHA DO TEMPO */}
              <div className="space-y-4 flex-1">
                {storyline.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-sm font-medium text-gray-400 border-2 border-dashed border-gray-200 rounded-lg p-10 text-center">
                    A linha do tempo está vazia. <br/>
                    Adicione capítulos, desafios ou modelos usando o painel ao lado.
                  </div>
                )}

                {storyline.map((item, index) => (
                  <div key={item.tempId} className="flex gap-4">
                    <div className="w-6 mt-3 text-sm font-bold text-gray-300">{index + 1}</div>
                    
                    <div className="flex-1 p-4 rounded-md outline outline-1 outline-gray-200 bg-gray-50 flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            item.type === 'Quest' ? 'bg-amber-50 text-amber-700 ring-amber-600/10' :
                            item.type === 'Capítulo' ? 'bg-red-50 text-red-700 ring-red-600/10' : 
                            item.type === 'Desafio' ? 'bg-indigo-50 text-indigo-700 ring-indigo-600/10' :
                            'bg-gray-50 text-gray-600 ring-gray-500/10'
                          }`}>
                            {item.type}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">{item.displayNome}</span>
                        </div>
                        {item.meta && (
                          <span className="text-xs text-gray-500 mt-1">
                            Personagem: <span className="font-medium text-gray-700">{item.meta.personagem}</span> | Pose: <span className="font-medium text-gray-700">{item.meta.pose}</span>
                          </span>
                        )}
                      </div>
                      <button onClick={() => handleRemoveTimelineItem(index, item)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {hasEditableTimelineItems && (
                <div className="mt-8 flex flex-col gap-3">
                  <button 
                    onClick={handleSaveStory}
                    disabled={isSaving || !hasEditableTimelineItems}
                    className="w-full flex justify-center rounded-md bg-red-400 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Processando..." : isEditing ? "Atualizar História" : "Publicar História"}
                  </button>
                  
                  {isEditing && (
                    <button 
                      onClick={handleCancelEdit}
                      className="w-full flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm outline outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      Cancelar Edição
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Histórias Publicadas</h2>
          
          <div className="overflow-hidden bg-white outline outline-1 -outline-offset-1 outline-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">História e Quest</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Criação</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">Passos</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {historias.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-sm font-medium text-gray-500">
                      Nenhuma história publicada ainda.
                    </td>
                  </tr>
                ) : (
                  historias.map((h) => {
                    const questVinculada = quests.find(q => (q._id || q.id) === (h.idQuest || h.questId));
                    
                    return (
                      <tr key={h.id} className={editingHistoriaId === h.id ? "bg-red-50/30" : "hover:bg-gray-50/50 transition-colors"}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                            {h.titulo}
                            {editingHistoriaId === h.id && (
                              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                Editando
                              </span>
                            )}
                          </div>
                          {questVinculada ? (
                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              Quest: {questVinculada.nome}
                            </div>
                          ) : (
                            <div className="text-xs text-gray-400 mt-1 italic">Sem quest vinculada</div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {new Date(h.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">
                          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {h.timeline.length} {h.timeline.length === 1 ? 'Passo' : 'Passos'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <button onClick={() => handleEditHistoria(h)} className="text-red-500 hover:text-red-400 mr-4">Editar</button>
                          <button onClick={() => setDeleteConfirm(h)} className="text-gray-400 hover:text-gray-600">Excluir</button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-2xl outline outline-1 outline-gray-200 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
               <h3 className="text-sm font-bold text-gray-900">Configurar Diálogo</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-white p-1.5 rounded-md outline outline-1 outline-gray-200 shadow-sm transition-colors">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
               </button>
            </div>
            
            <form onSubmit={handleAddTempChapter} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Quem fala?</label>
                  <select 
                    required
                    value={novoCapitulo.personagemId}
                    onChange={(e) => handlePersonagemChange(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                  >
                    <option value="">Selecione...</option>
                    {personagensDisponiveis.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Pose / Emoção</label>
                  <select 
                    value={novoCapitulo.pose}
                    onChange={(e) => setNovoCapitulo({...novoCapitulo, pose: e.target.value})}
                    disabled={!novoCapitulo.personagemId}
                    className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    {!novoCapitulo.personagemId ? (
                      <option value="">Selecione um personagem primeiro</option>
                    ) : (
                      posesDisponiveis.map((pose) => (
                        <option key={pose} value={pose}>{pose}</option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Título do Bloco</label>
                <input 
                  type="text" required placeholder="Ex: Alex explica o processador" 
                  value={novoCapitulo.titulo} 
                  onChange={(e) => setNovoCapitulo({...novoCapitulo, titulo: e.target.value})} 
                  className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Conteúdo do Diálogo</label>
                <textarea 
                  rows={5} required placeholder="O que o personagem vai dizer..." 
                  value={novoCapitulo.conteudo} 
                  onChange={(e) => setNovoCapitulo({...novoCapitulo, conteudo: e.target.value})} 
                  className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 resize-none" 
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm outline outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 transition-colors"
                >
                  Confirmar Inserção
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden outline outline-1 outline-gray-200">
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900">Confirmar exclusão</h3>
              <p className="mt-2 text-sm text-gray-500">
                Tem certeza que deseja remover a história <span className="font-bold text-gray-900">{deleteConfirm.titulo}</span>?
              </p>
            </div>
            <div className="flex bg-gray-50 p-4 gap-3">
              <button 
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm outline outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}