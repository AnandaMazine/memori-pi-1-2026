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

const modelagensNoDB = [
  { id: "m1", nome: "Placa Mãe 3D", tipo: "Modelagem" },
  { id: "m2", nome: "Processador 3D", tipo: "Modelagem" },
];

export default function StoryBatchBuilder() {
  const [historias, setHistorias] = useState([]);
  const [tituloHistoria, setTituloHistoria] = useState("");
  const [storyline, setStoryline] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado expandido para o Novo Capítulo
  const [novoCapitulo, setNovoCapitulo] = useState({ 
    titulo: "", 
    conteudo: "", 
    personagemId: "", 
    pose: "Neutro" 
  });

  const addExistingItem = (item, type) => {
    const block = {
      tempId: Math.random().toString(36).substr(2, 9),
      type: type,
      isNew: false,
      refId: item.id,
      displayNome: item.nome
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

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 flex flex-col gap-12">
        <header className="border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">História</h1>
          <p className="mt-2 text-sm text-gray-500 font-medium">Configuração de histórias</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* PAINEL DE ADIÇÃO */}
          <div className="xl:col-span-4">
            <div className="bg-gray-50 p-6 rounded-lg outline outline-1 outline-gray-200 sticky top-8">
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="w-full mb-6 flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-gray-800 transition-all shadow-md"
              >
                + Adicionar Capítulo
              </button>
              
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Elementos de Apoio</h3>
                {desafiosNoDB.map(d => (
                  <button key={d.id} onClick={() => addExistingItem(d, 'Desafio')} className="w-full text-left p-3 text-xs font-semibold bg-white outline outline-1 outline-gray-200 rounded-md hover:outline-red-400 flex justify-between group transition-all">
                    {d.nome} <span className="text-red-400 opacity-0 group-hover:opacity-100">+</span>
                  </button>
                ))}
                {modelagensNoDB.map(m => (
                  <button key={m.id} onClick={() => addExistingItem(m, 'Modelagem')} className="w-full text-left p-3 text-xs font-semibold bg-white outline outline-1 outline-gray-200 rounded-md hover:outline-blue-400 flex justify-between group transition-all">
                    {m.nome} <span className="text-blue-400 opacity-0 group-hover:opacity-100">+</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LINHA DO TEMPO */}
          <div className="xl:col-span-8">
            <div className="bg-white rounded-lg outline outline-1 outline-gray-200 p-8 shadow-sm min-h-[400px]">
              <input 
                type="text" 
                placeholder="Título da História..." 
                value={tituloHistoria} 
                onChange={(e) => setTituloHistoria(e.target.value)} 
                className="w-full text-3xl font-bold border-none focus:ring-0 placeholder:text-gray-200 mb-8 p-0" 
              />
              
              <div className="space-y-4">
                {storyline.map((item, index) => (
                  <div key={item.tempId} className="flex items-center gap-4">
                    <div className="w-6 text-xs font-black text-gray-300">{index + 1}</div>
                    <div className="flex-1 p-4 rounded-md outline outline-1 outline-gray-100 bg-gray-50/30 flex justify-between items-center">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded text-white ${item.type === 'Capítulo' ? 'bg-red-400' : 'bg-blue-400'}`}>
                            {item.type}
                          </span>
                          <span className="text-sm font-bold text-gray-900">{item.displayNome}</span>
                        </div>
                        {item.meta && (
                          <span className="text-[10px] text-gray-500 italic">
                            Personagem: <b>{item.meta.personagem}</b> | Pose: <b>{item.meta.pose}</b>
                          </span>
                        )}
                      </div>
                      <button onClick={() => setStoryline(storyline.filter((_, i) => i !== index))} className="text-gray-300 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MODAL COM OS DROPDOWNS DE PERSONAGEM E POSE */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-lg w-full max-w-2xl outline outline-1 outline-gray-200 shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                 <h2 className="text-lg font-black uppercase tracking-tight">Configurar Diálogo</h2>
                 <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 font-bold">FECHAR</button>
              </div>
              
              <form onSubmit={handleAddTempChapter} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* DROPDOWN PERSONAGEM */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Quem fala?</label>
                    <select 
                      required
                      value={novoCapitulo.personagemId}
                      onChange={(e) => setNovoCapitulo({...novoCapitulo, personagemId: e.target.value})}
                      className="w-full rounded-md outline outline-1 outline-gray-300 p-2.5 text-sm focus:outline-red-400 bg-white"
                    >
                      <option value="">Selecione o Personagem...</option>
                      {personagensDisponiveis.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                    </select>
                  </div>

                  {/* DROPDOWN POSE */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Pose / Emoção</label>
                    <select 
                      value={novoCapitulo.pose}
                      onChange={(e) => setNovoCapitulo({...novoCapitulo, pose: e.target.value})}
                      className="w-full rounded-md outline outline-1 outline-gray-300 p-2.5 text-sm focus:outline-red-400 bg-white"
                    >
                      {posesDisponiveis.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Título do Bloco</label>
                  <input 
                    type="text" required placeholder="Ex: Alex explica o processador" 
                    value={novoCapitulo.titulo} 
                    onChange={(e) => setNovoCapitulo({...novoCapitulo, titulo: e.target.value})} 
                    className="w-full rounded-md outline outline-1 outline-gray-300 p-2.5 text-sm focus:outline-red-400" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Conteúdo do Diálogo</label>
                  <textarea 
                    rows={5} required placeholder="O que o personagem vai dizer..." 
                    value={novoCapitulo.conteudo} 
                    onChange={(e) => setNovoCapitulo({...novoCapitulo, conteudo: e.target.value})} 
                    className="w-full rounded-md outline outline-1 outline-gray-300 p-2.5 text-sm focus:outline-red-400 resize-none" 
                  />
                </div>

                <button type="submit" className="w-full bg-red-400 py-3 text-white font-bold rounded-md text-sm hover:bg-red-300 transition-all shadow-lg shadow-red-100">
                  Adicionar à trilha narrativa
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}