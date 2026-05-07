"use client";

import { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";

// Dados mockados
const questsIniciais = [
  { 
    id: "1", 
    nomeQuest: "Exploração de Hardware", 
    latitudeQuest: -23.5505, 
    longitudeQuest: -46.6333, 
    descricaoQuest: "Localize os componentes básicos no laboratório central.",
    imagemQuest: "https://images.unsplash.com/photo-1591799264318-7e698ddb7c1d?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "2", 
    nomeQuest: "Desafio de Rede", 
    latitudeQuest: -23.5515, 
    longitudeQuest: -46.6343, 
    descricaoQuest: "Siga o caminho dos pacotes de dados até o roteador principal.",
    imagemQuest: ""
  },
];

export default function QuestsCMS() {
  const [quests, setQuests] = useState(questsIniciais);
  const [uploading, setUploading] = useState(false);
  const [viewingImage, setViewingImage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    id: null, 
    nomeQuest: "", 
    latitudeQuest: 0, 
    longitudeQuest: 0, 
    descricaoQuest: "", 
    imagemQuest: ""
  });

  const isEditing = formData.id !== null;

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.set('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const result = await res.json();
      if (result.url) {
        setFormData(prev => ({ ...prev, [field]: result.url }));
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao processar arquivo.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setQuests(quests.map(q => q.id === formData.id ? formData : q));
    } else {
      const novaQuest = { ...formData, id: Math.random().toString(36).substr(2, 9) };
      setQuests([...quests, novaQuest]);
    }
    handleCancel();
  };

  const handleEdit = (quest) => setFormData({ ...quest });

  const handleCancel = () => {
    setFormData({ id: null, nomeQuest: "", latitudeQuest: 0, longitudeQuest: 0, descricaoQuest: "", imagemQuest: "" });
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 flex flex-col gap-8">
        <header className="border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">CMS: Quests</h1>
          <p className="mt-2 text-sm text-gray-500 font-medium">Gerencie pontos de interesse e a descrição das missões.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-x-8 gap-y-10">
          
          {/* FORMULÁRIO */}
          <div className="xl:col-span-1">
            <form className="space-y-5 sticky top-8" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-900">Nome da Quest</label>
                <input type="text" required value={formData.nomeQuest} onChange={(e) => setFormData({...formData, nomeQuest: e.target.value})} className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-sm outline outline-1 outline-gray-300 focus:outline-2 focus:outline-red-400 transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Latitude</label>
                  <input type="number" step="any" placeholder="Lat" value={formData.latitudeQuest} onChange={(e) => setFormData({...formData, latitudeQuest: parseFloat(e.target.value)})} className="block w-full rounded-md bg-white px-3 py-2 text-sm outline outline-1 outline-gray-300 focus:outline-red-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Longitude</label>
                  <input type="number" step="any" placeholder="Lng" value={formData.longitudeQuest} onChange={(e) => setFormData({...formData, longitudeQuest: parseFloat(e.target.value)})} className="block w-full rounded-md bg-white px-3 py-2 text-sm outline outline-1 outline-gray-300 focus:outline-red-400 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Descrição da Missão</label>
                <textarea 
                  rows={4}
                  required 
                  value={formData.descricaoQuest} 
                  onChange={(e) => setFormData({...formData, descricaoQuest: e.target.value})} 
                  className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-sm outline outline-1 outline-gray-300 focus:outline-red-400 resize-none transition-all"
                  placeholder="Instruções para o usuário..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Imagem da Capa</label>
                <input 
                  type="file" ref={fileInputRef} accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'imagemQuest')}
                  className="mt-2 block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer transition-all"
                />
              </div>

              <button 
                type="submit" 
                disabled={uploading}
                className="w-full rounded-md bg-red-400 px-3 py-2.5 text-sm font-bold text-white hover:bg-red-300 transition-colors shadow-sm disabled:opacity-50"
              >
                {uploading ? "Aguarde..." : isEditing ? "SALVAR ALTERAÇÕES" : "CRIAR QUEST"}
              </button>
              
              {isEditing && (
                <button type="button" onClick={handleCancel} className="w-full text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                  Descartar Edição
                </button>
              )}
            </form>
          </div>

          {/* LISTAGEM */}
          <div className="xl:col-span-3">
            <div className="overflow-hidden bg-white outline outline-1 outline-gray-200 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-left border-collapse">
                <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Informações</th>
                    <th className="px-6 py-4">Descrição</th>
                    <th className="px-6 py-4 text-center">Preview</th>
                    <th className="px-6 py-4 text-right w-32">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {quests.map((quest) => (
                    <tr key={quest.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{quest.nomeQuest}</div>
                        <div className="text-[10px] text-gray-400 font-mono">LAT: {quest.latitudeQuest} / LNG: {quest.longitudeQuest}</div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-500 line-clamp-2 max-w-[200px]">
                          {quest.descricaoQuest}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button 
                            onClick={() => setViewingImage(quest.imagemQuest)}
                            disabled={!quest.imagemQuest}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-[10px] font-black transition-all ${quest.imagemQuest ? "border-gray-200 bg-white text-gray-700 hover:border-red-400 hover:text-red-400" : "opacity-10 cursor-not-allowed"}`}
                          >
                            VER CAPA
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {/* Container Flex para impedir quebra de linha */}
                        <div className="flex justify-end items-center gap-4">
                          <button 
                            onClick={() => handleEdit(quest)} 
                            className="text-xs font-bold text-red-500 hover:text-red-300 transition-colors"
                          >
                            EDITAR
                          </button>
                          <button 
                            onClick={() => setDeleteConfirm(quest)} 
                            className="text-xs font-bold text-gray-300 hover:text-gray-600 transition-colors"
                          >
                            EXCLUIR
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL PREVIEW */}
      {viewingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm" onClick={() => setViewingImage(null)}>
          <div className="relative bg-white rounded-lg p-1 max-w-2xl shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <button onClick={() => setViewingImage(null)} className="absolute -top-10 right-0 text-white font-black flex items-center gap-2 hover:text-red-400 transition-colors">
              FECHAR <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <img src={viewingImage} alt="Preview" className="max-w-full max-h-[80vh] rounded shadow-inner object-contain" />
          </div>
        </div>
      )}

      {/* MODAL EXCLUSÃO */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/75 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden outline outline-1 outline-gray-200">
            <div className="p-8 text-center">
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Excluir Quest?</h3>
              <p className="mt-2 text-sm text-gray-500">Isso removerá <b>{deleteConfirm.nomeQuest}</b> definitivamente.</p>
            </div>
            <div className="flex bg-gray-50 p-4 gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-md bg-white px-3 py-2 text-xs font-bold text-gray-900 outline outline-1 outline-gray-200 hover:bg-gray-100 transition-all">CANCELAR</button>
              <button onClick={() => { setQuests(quests.filter(q => q.id !== deleteConfirm.id)); setDeleteConfirm(null); }} className="flex-1 rounded-md bg-red-400 px-3 py-2 text-xs font-bold text-white hover:bg-red-500 transition-all shadow-sm">CONFIRMAR</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}