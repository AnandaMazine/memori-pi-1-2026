"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

// --- MOCKS DE CONFIGURAÇÃO ---
const personagensDisponiveis = [
  { id: "p1", nome: "Alex (O Guia)" },
  { id: "p2", nome: "Dra. Byte" },
  { id: "p3", nome: "Bit (Robô Assistente)" },
];

const posesDisponiveis = ["Neutro", "Feliz", "Explicando", "Preocupado", "Alerta", "Apontando"];

const desafiosNoDB = [
  { id: "d1", nome: "Quiz: Memória RAM", tipo: "Desafio" },
  { id: "d2", nome: "Puzzle: Socket CPU", tipo: "Desafio" },
];

// Banco geral de modelagens
const modelagensNoDB = [
  { id: "m1", nome: "Placa Mãe 3D", tipo: "Modelagem" },
  { id: "m2", nome: "Processador 3D", tipo: "Modelagem" },
  { id: "m3", nome: "Roteador 3D", tipo: "Modelagem" },
  { id: "m4", nome: "Cabo de Rede 3D", tipo: "Modelagem" },
];

// Novo Mock de Quests com suas respectivas modelagens associadas
const questsNoDB = [
  { id: "q1", nome: "Exploração de Hardware", modelosIds: ["m1", "m2"] },
  { id: "q2", nome: "Desafio de Rede", modelosIds: ["m3", "m4"] },
];

// --- MOCK DO BANCO DE DADOS DE HISTÓRIAS ---
const historiasNoDB = [
  {
    id: "h1",
    titulo: "Introdução ao Hardware",
    questId: "q1",
    created_at: "2023-10-25T10:00:00Z",
    timeline: [
      { type: "Capítulo", displayNome: "Alex dá as boas vindas" },
      { type: "Modelagem", displayNome: "Placa Mãe 3D" },
      { type: "Desafio", displayNome: "Quiz: Memória RAM" }
    ]
  },
  {
    id: "h2",
    titulo: "A Jornada do Processador",
    questId: "",
    created_at: "2023-10-26T14:30:00Z",
    timeline: [
      { type: "Capítulo", displayNome: "Dra. Byte explica CPU" },
      { type: "Modelagem", displayNome: "Processador 3D" }
    ]
  }
];

export default function StoryBatchBuilder() {
  const [historias, setHistorias] = useState(historiasNoDB);
  const [tituloHistoria, setTituloHistoria] = useState("");
  const [questSelecionadaId, setQuestSelecionadaId] = useState("");
  const [storyline, setStoryline] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const [novoCapitulo, setNovoCapitulo] = useState({ 
    titulo: "", 
    conteudo: "", 
    personagemId: "", 
    pose: "Neutro" 
  });

  // Derivando os dados da Quest selecionada
  const questSelecionadaObj = questsNoDB.find(q => q.id === questSelecionadaId);
  const modelosDaQuest = questSelecionadaObj 
    ? modelagensNoDB.filter(m => questSelecionadaObj.modelosIds.includes(m.id))
    : [];

  // Modelos soltos (aqueles que não pertencem à quest selecionada, ou todos se nenhuma quest for selecionada)
  const modelosSoltos = modelagensNoDB.filter(m => !modelosDaQuest.find(mq => mq.id === m.id));

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

  const handleAddTempChapter = (e) => {
    e.preventDefault();
    const personagemNome = personagensDisponiveis.find(p => p.id === novoCapitulo.personagemId)?.nome || "Desconhecido";
    
    const block = {
      tempId: Math.random().toString(36).substr(2, 9),
      type: "Capítulo",
      isNew: true,
      displayNome: novoCapitulo.titulo,
      meta: {
        personagem: personagemNome,
        pose: novoCapitulo.pose,
        conteudo: novoCapitulo.conteudo
      }
    };
    setStoryline([...storyline, block]);
    setNovoCapitulo({ titulo: "", conteudo: "", personagemId: "", pose: "Neutro" });
    setIsModalOpen(false);
  };

  const handleSaveStory = () => {
    if (!tituloHistoria || storyline.length === 0) return;
    
    setIsSaving(true);
    
    const novaHistoria = {
      id: Math.random().toString(36).substr(2, 5),
      titulo: tituloHistoria,
      questId: questSelecionadaId,
      created_at: new Date().toISOString(),
      timeline: storyline
    };

    setTimeout(() => {
      setHistorias([novaHistoria, ...historias]);
      setStoryline([]);
      setTituloHistoria("");
      setQuestSelecionadaId("");
      setIsSaving(false);
    }, 500);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setHistorias(historias.filter(h => h.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 flex flex-col gap-12">
        <header className="border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Histórias</h1>
          <p className="mt-2 text-sm text-gray-500">Configuração e gerenciamento das narrativas e vínculo com Quests</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* PAINEL DE ADIÇÃO (TOOLBOX) */}
          <div className="xl:col-span-4">
            <div className="bg-gray-50 p-6 rounded-lg outline outline-1 outline-gray-200 sticky top-8">
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="w-full mb-8 flex items-center justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 transition-colors"
              >
                + Adicionar Capítulo
              </button>
              
              <div className="space-y-8">
                
                {/* SESSÃO: MODELAGENS DA QUEST (APARECE DINAMICAMENTE) */}
                {questSelecionadaObj && modelosDaQuest.length > 0 && (
                  <div className="space-y-3 bg-red-50/50 p-3 -mx-3 rounded-lg outline outline-1 outline-red-100">
                    <h3 className="text-xs font-bold text-red-900 border-b border-red-200 pb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                      Modelos da Quest "{questSelecionadaObj.nome}"
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

                {/* SESSÃO: DESAFIOS */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-900 border-b border-gray-200 pb-2">Desafios Gerais</h3>
                  <div className="space-y-2">
                    {desafiosNoDB.map(d => (
                      <button key={d.id} onClick={() => addExistingItem(d, 'Desafio')} className="w-full text-left px-3 py-2 text-sm font-medium bg-white outline outline-1 outline-gray-200 rounded-md hover:outline-red-400 flex justify-between items-center group transition-all text-gray-700 shadow-sm">
                        {d.nome} <span className="text-red-400 opacity-0 group-hover:opacity-100 font-bold">+</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* SESSÃO: MODELAGENS SOLTAS */}
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

          {/* ÁREA DE CRIAÇÃO E LINHA DO TEMPO */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-lg outline outline-1 outline-gray-200 p-8 shadow-sm min-h-[400px] flex flex-col">
              
              {/* CABEÇALHO DO FORMULÁRIO */}
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
                    {questsNoDB.map(q => (
                      <option key={q.id} value={q.id}>{q.nome}</option>
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
                      <button onClick={() => setStoryline(storyline.filter((_, i) => i !== index))} className="text-gray-400 hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {storyline.length > 0 && (
                <button 
                  onClick={handleSaveStory}
                  disabled={isSaving || !tituloHistoria}
                  className="mt-8 w-full flex justify-center rounded-md bg-red-400 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Salvando..." : "Publicar História"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* TABELA PADRÃO CMS */}
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
                    const questVinculada = questsNoDB.find(q => q.id === h.questId);
                    
                    return (
                      <tr key={h.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                            {h.titulo}
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
                          <button className="text-red-500 hover:text-red-400 mr-4">Editar</button>
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

      {/* MODAL DE ADIÇÃO DE CAPÍTULO */}
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
                    onChange={(e) => setNovoCapitulo({...novoCapitulo, personagemId: e.target.value})}
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
                    className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                  >
                    {posesDisponiveis.map(p => <option key={p} value={p}>{p}</option>)}
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

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
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