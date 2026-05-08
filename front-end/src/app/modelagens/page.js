"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

// Importações do Leaflet
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Correção para os ícones padrão do Leaflet no React/Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- MOCKS DE DADOS ---
const mockQuests = [
  { _id: "64a1b2c3d4e5f60001234567", titulo: "A Lenda do Rio Ribeira" },
  { _id: "64a1b2c3d4e5f60001234568", titulo: "Mistério do Chá Preto" },
  { _id: "64a1b2c3d4e5f60001234569", titulo: "Desbravando o Centro Histórico" },
];

const mockModelagens = [
  {
    _id: "m1",
    nomeModelagem: "Monumento da Praça",
    nomeCidade: "Registro",
    arquivoModelagem: "monumento_praca_v1.glb",
    arquivoQrCode: "qr_monumento.png",
    idQuest: "64a1b2c3d4e5f60001234567",
    latitude: -24.4882,
    longitude: -47.8348,
  },
  {
    _id: "m2",
    nomeModelagem: "Antiga Estação de Trem",
    nomeCidade: "Registro",
    arquivoModelagem: "estacao_old.glb",
    arquivoQrCode: "qr_estacao.png",
    idQuest: "64a1b2c3d4e5f60001234569",
    latitude: -24.4921,
    longitude: -47.8410,
  }
];

// COMPONENTE DO MAPA PARA SELECIONAR COORDENADAS
function MapSelector({ position, setPosition }) {
  const defaultCenter = [-24.4882, -47.8348];

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition({
          latitude: e.latlng.lat.toFixed(6),
          longitude: e.latlng.lng.toFixed(6),
        });
      },
    });
    return null;
  };

  return (
    <MapContainer 
      center={position.latitude ? [position.latitude, position.longitude] : defaultCenter} 
      zoom={14} 
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      className="rounded-lg border-2 border-gray-200"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      {position.latitude && position.longitude && (
        <Marker position={[position.latitude, position.longitude]} />
      )}
    </MapContainer>
  );
}

export default function ModelagensCMS() {
  const [modelagens, setModelagens] = useState(mockModelagens);
  const [isSaving, setIsSaving] = useState(false);
  
  // Modais
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewingModel, setViewingModel] = useState(null);

  // Estado dos campos de texto e select
  const [formData, setFormData] = useState({
    nomeModelagem: "",
    nomeCidade: "",
    idQuest: "",
    latitude: "",
    longitude: "",
  });
  
  // Estados para os arquivos
  const [arquivoZip, setArquivoZip] = useState(null);
  const [arquivoQrCode, setArquivoQrCode] = useState(null);
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleZipFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setArquivoZip(e.target.files[0]);
    }
  };

  const handleQrCodeFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setArquivoQrCode(e.target.files[0]);
    }
  };

  const updateCoordinates = (coords) => {
    setFormData((prev) => ({
      ...prev,
      latitude: coords.latitude,
      longitude: coords.longitude,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    /* --- LÓGICA DE INTEGRAÇÃO FUTURA ---
      const formDataToSend = new FormData();
      formDataToSend.append("nomeModelagem", formData.nomeModelagem);
      formDataToSend.append("nomeCidade", formData.nomeCidade);
      formDataToSend.append("idQuest", formData.idQuest);
      formDataToSend.append("latitude", formData.latitude);
      formDataToSend.append("longitude", formData.longitude);
      
      // Enviando os dois arquivos na mesma requisição
      if (arquivoZip) formDataToSend.append("arquivoModelagemZip", arquivoZip);
      if (arquivoQrCode) formDataToSend.append("arquivoQrCodeImg", arquivoQrCode);

      await fetch('/api/modelagens', { method: 'POST', body: formDataToSend });
    */

    setTimeout(() => {
      // Mock: Simulando os nomes dos arquivos após upload
      const nomeSimuladoPosExtracao = arquivoZip ? arquivoZip.name.replace('.zip', '/modelo.glb') : "modelo_desconhecido.glb";
      const nomeSimuladoQrCode = arquivoQrCode ? arquivoQrCode.name : "qr_code.png";

      const novaModelagem = {
        _id: Math.random().toString(36).substr(2, 9),
        arquivoModelagem: nomeSimuladoPosExtracao,
        arquivoQrCode: nomeSimuladoQrCode,
        ...formData,
      };

      setModelagens([novaModelagem, ...modelagens]);
      setIsSaving(false);
      
      // Reseta os estados e os inputs visuais
      setFormData({
        nomeModelagem: "",
        nomeCidade: "",
        idQuest: "",
        latitude: "",
        longitude: "",
      });
      setArquivoZip(null);
      setArquivoQrCode(null);
      document.getElementById('arquivoModelagem').value = "";
      document.getElementById('arquivoQrCode').value = "";
    }, 800);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setModelagens(modelagens.filter(m => m._id !== deleteConfirm._id));
      setDeleteConfirm(null);
    }
  };

  const getQuestName = (questId) => {
    return mockQuests.find(q => q._id === questId)?.titulo || "Quest Desconhecida";
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 flex flex-col gap-8">
        <header className="border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Modelagens 3D</h1>
          <p className="mt-2 text-sm text-gray-500">Faça o upload dos pacotes (.zip), imagens de QR Code e gerencie no mapa.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* COLUNA ESQUERDA: FORMULÁRIO */}
          <div className="xl:col-span-4">
            <div className="bg-gray-50 p-6 rounded-lg outline outline-1 outline-gray-200 sticky top-8 z-10">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-3 mb-5">Nova Modelagem</h3>
              
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Nome da Modelagem</label>
                  <input type="text" name="nomeModelagem" required value={formData.nomeModelagem} onChange={handleInputChange} className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400" placeholder="Ex: Chafariz Principal" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Nome da Cidade</label>
                  <input type="text" name="nomeCidade" required value={formData.nomeCidade} onChange={handleInputChange} className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400" placeholder="Ex: Registro" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Vincular à Quest</label>
                  <select name="idQuest" required value={formData.idQuest} onChange={handleInputChange} className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400">
                    <option value="">Selecione...</option>
                    {mockQuests.map(q => (
                      <option key={q._id} value={q._id}>{q.titulo}</option>
                    ))}
                  </select>
                </div>

                {/* UPLOAD ZIP */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Pacote 3D (.zip)</label>
                  <input 
                    type="file" 
                    id="arquivoModelagem"
                    name="arquivoModelagem" 
                    accept=".zip,application/zip" 
                    required 
                    onChange={handleZipFileChange} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 outline outline-1 -outline-offset-1 outline-gray-300 rounded-md bg-white cursor-pointer" 
                  />
                </div>

                {/* UPLOAD QR CODE */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">QR Code (Imagem)</label>
                  <input 
                    type="file" 
                    id="arquivoQrCode"
                    name="arquivoQrCode" 
                    accept="image/*" 
                    required 
                    onChange={handleQrCodeFileChange} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 outline outline-1 -outline-offset-1 outline-gray-300 rounded-md bg-white cursor-pointer" 
                  />
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-xs font-medium text-gray-700">Localização</label>
                    <span className="text-[10px] text-gray-500">Clique no mapa para marcar</span>
                  </div>
                  
                  {/* MAPA */}
                  <div className="w-full h-48 mb-3 bg-gray-200 rounded-lg relative overflow-hidden">
                    {isClient && (
                      <MapSelector 
                        position={{ latitude: formData.latitude, longitude: formData.longitude }} 
                        setPosition={updateCoordinates} 
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-medium text-gray-500 uppercase">Lat</label>
                      <input type="number" step="any" name="latitude" required value={formData.latitude} onChange={handleInputChange} className="block w-full rounded-md bg-gray-50 px-2 py-1.5 text-xs text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400" placeholder="-24.4882" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-gray-500 uppercase">Lng</label>
                      <input type="number" step="any" name="longitude" required value={formData.longitude} onChange={handleInputChange} className="block w-full rounded-md bg-gray-50 px-2 py-1.5 text-xs text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400" placeholder="-47.8348" />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSaving} className="mt-4 w-full rounded-md bg-red-400 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-300 disabled:opacity-50 transition-colors">
                  {isSaving ? "Enviando Arquivos..." : "Salvar Arquivos e Dados"}
                </button>
              </form>
            </div>
          </div>

          {/* COLUNA DIREITA: TABELA */}
          <div className="xl:col-span-8 z-0">
            <div className="overflow-hidden bg-white outline outline-1 -outline-offset-1 outline-gray-200 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Modelagem & Arquivos</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Quest Vinculada</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Localização</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {modelagens.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                        Nenhuma modelagem cadastrada.
                      </td>
                    </tr>
                  ) : (
                    modelagens.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{item.nomeModelagem}</div>
                          <div className="text-xs text-gray-500 mb-2">{item.nomeCidade}</div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setViewingModel(item)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 ring-1 ring-inset ring-blue-600/20 rounded-md hover:bg-blue-100 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                              Ver 3D
                            </button>
                            <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium text-gray-600 bg-gray-100 rounded-md">
                              📷 {item.arquivoQrCode}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {getQuestName(item.idQuest)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500">
                          <div><span className="font-semibold text-gray-700">Lat:</span> {item.latitude}</div>
                          <div><span className="font-semibold text-gray-700">Lng:</span> {item.longitude}</div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <button className="text-red-500 hover:text-red-400 mr-4">Editar</button>
                          <button onClick={() => setDeleteConfirm(item)} className="text-gray-400 hover:text-gray-600">Excluir</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE VISUALIZAÇÃO 3D */}
      {viewingModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden outline outline-1 outline-gray-200 flex flex-col h-[600px]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
               <div>
                 <h3 className="text-sm font-bold text-gray-900">{viewingModel.nomeModelagem}</h3>
                 <p className="text-xs text-gray-500">Pasta Extraída: {viewingModel.arquivoModelagem}</p>
               </div>
               <button onClick={() => setViewingModel(null)} className="text-gray-400 hover:text-gray-600 bg-white p-1.5 rounded-md outline outline-1 outline-gray-200 shadow-sm">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
               </button>
            </div>
            
            <div className="flex-1 bg-gray-100 flex items-center justify-center relative inner-shadow">
              <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                <h4 className="text-gray-700 font-medium mb-1">Visualizador 3D</h4>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                  Este componente irá ler o arquivo <strong>{viewingModel.arquivoModelagem}</strong> que foi extraído na pasta `public`.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-500/75 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden outline outline-1 outline-gray-200">
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900">Confirmar exclusão</h3>
              <p className="mt-2 text-sm text-gray-500">
                Remover a modelagem <span className="font-bold text-gray-900">{deleteConfirm.nomeModelagem}</span>?
              </p>
            </div>
            <div className="flex bg-gray-50 p-4 gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm outline outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={confirmDelete} className="flex-1 rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 transition-colors">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}