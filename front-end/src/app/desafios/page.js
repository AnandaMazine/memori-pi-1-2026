"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { buildApiUrl } from "@/lib/api";

export default function DesafiosCMS() {
  const [desafios, setDesafios] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const [formData, setFormData] = useState({
    id: null,
    pergunta: "",
    tipoDesafio: "Ordenação",
    dificuldade: 1,
    tempoLimite: 30,
    estadoInicial: "",
    estadoCorreto: "",
    numeroPeca: 0
  });

  const isEditing = formData.id !== null;

  const normalizeDesafio = (item) => ({
    ...item,
    id: item.id || item._id,
  });

  const handleEdit = (item) => {
    setFormData({ ...item });
  };

  const handleCancel = () => {
    setFormData({ id: null, pergunta: "", tipoDesafio: "Ordenação", dificuldade: 1, tempoLimite: 30, estadoInicial: "", estadoCorreto: "", numeroPeca: 0 });
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;

    (async () => {
      try {
        const targetId = deleteConfirm.id || deleteConfirm._id;
        const res = await fetch(buildApiUrl(`desafio/${targetId}`), { method: 'DELETE' });
        if (res.status === 204) {
          setDesafios((prev) => prev.filter((d) => d.id !== targetId));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setDeleteConfirm(null);
      }
    })();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const { id, _id, ...payload } = formData;
        if (isEditing) {
          const res = await fetch(buildApiUrl(`desafio/${formData.id}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            const json = await res.json();
            const desafioAtualizado = normalizeDesafio(json.desafio || {});
            setDesafios((prev) => prev.map((d) => (d.id === desafioAtualizado.id ? desafioAtualizado : d)));
          }
        } else {
          const res = await fetch(buildApiUrl('desafio'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.status === 201) await loadDesafios();
        }
      } catch (err) {
        console.error(err);
      } finally {
        handleCancel();
      }
    })();
  };

  async function loadDesafios() {
    try {
      const res = await fetch(buildApiUrl('desafio'));
      if (res.ok) {
        const json = await res.json();
        const list = Array.isArray(json.desafios) ? json.desafios.map(normalizeDesafio) : [];
        setDesafios(list);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadDesafios();
  }, []);

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 flex flex-col gap-8">
        <header className="border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Desafios</h1>
          <p className="mt-2 text-sm text-gray-500">
            {isEditing ? `Editando desafio ID: ${formData.id}` : "Crie, edite ou remova desafios"}
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-x-8 gap-y-10">
          
          <div className="xl:col-span-1">
            <form className="space-y-5 sticky top-8" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-900">Pergunta</label>
                <div className="mt-2">
                  <textarea 
                    rows={3}
                    value={formData.pergunta}
                    onChange={(e) => setFormData({...formData, pergunta: e.target.value})}
                    placeholder="Ex: Qual o barramento principal?"
                    className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">Tipo</label>
                  <select 
                    value={formData.tipoDesafio}
                    onChange={(e) => setFormData({...formData, tipoDesafio: e.target.value})}
                    className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                  >
                    <option>Ordenação</option>
                    <option>Seleção</option>
                    <option>Encaixe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Dificuldade</label>
                  <input 
                    type="number" min="1" max="5"
                    value={formData.dificuldade}
                    onChange={(e) => setFormData({...formData, dificuldade: Number(e.target.value)})}
                    className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">Tempo (seg)</label>
                  <input 
                    type="number"
                    value={formData.tempoLimite}
                    onChange={(e) => setFormData({...formData, tempoLimite: Number(e.target.value)})}
                    className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Nº de Peças</label>
                  <input 
                    type="number"
                    value={formData.numeroPeca}
                    onChange={(e) => setFormData({...formData, numeroPeca: Number(e.target.value)})}
                    className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Estado Inicial (String)</label>
                <input 
                  type="text"
                  value={formData.estadoInicial}
                  onChange={(e) => setFormData({...formData, estadoInicial: e.target.value})}
                  placeholder="Ex: 0,0,0"
                  className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Estado Correto (String)</label>
                <input 
                  type="text"
                  value={formData.estadoCorreto}
                  onChange={(e) => setFormData({...formData, estadoCorreto: e.target.value})}
                  placeholder="Ex: 1,2,3"
                  className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button 
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 transition-colors"
                >
                  {isEditing ? "Atualizar Desafio" : "Criar Desafio"}
                </button>
                {isEditing && (
                  <button onClick={handleCancel} className="text-sm font-semibold text-gray-600 hover:text-gray-900">
                    Descartar alterações
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="xl:col-span-3">
            <div className="overflow-hidden bg-white outline outline-1 -outline-offset-1 outline-gray-200 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Desafio</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">Dificuldade</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {desafios.map((item) => (
                    <tr key={item.id || item._id} className={formData.id === item.id ? "bg-red-50/30" : "hover:bg-gray-50/50 transition-colors"}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900 truncate max-w-xs">{item.pergunta}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.tempoLimite}s de limite • {item.numeroPeca} peças</div>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                          {item.tipoDesafio}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`h-1.5 w-1.5 rounded-full ${i < item.dificuldade ? 'bg-red-400' : 'bg-gray-200'}`} />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                        <button onClick={() => handleEdit(item)} className="text-red-500 hover:text-red-400 mr-4">Editar</button>
                        <button onClick={() => setDeleteConfirm(item)} className="text-gray-400 hover:text-gray-600">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/75 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden outline outline-1 outline-gray-200">
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900">Remover Desafio</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Tem certeza que deseja apagar este desafio? Os dados de performance dos usuários associados podem ser afetados.
              </p>
            </div>
            <div className="flex bg-gray-50 p-4 gap-3">
              <button 
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm outline outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300"
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