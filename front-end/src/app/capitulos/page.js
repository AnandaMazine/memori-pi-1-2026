"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { buildApiUrl } from "@/lib/api";

export default function CapitulosAdmin() {
  const [capitulos, setCapitulos] = useState([]);
  const [form, setForm] = useState({ id: null, titulo: '', conteudo: '', pose: '', ordem: 0, idHistoria: '', idPersonagem: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const isEditing = !!form.id;

  async function load() {
    try {
      const res = await fetch(buildApiUrl('capitulo'));
      if (res.ok) {
        const json = await res.json();
        setCapitulos(json.capitulos || []);
      }
    } catch (err) { console.error(err); }
  }

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { tituloBloco: form.titulo, conteudo: form.conteudo, pose: form.pose, ordem: Number(form.ordem), idHistoria: form.idHistoria, idPersonagem: form.idPersonagem };
      if (isEditing) {
        const res = await fetch(buildApiUrl(`capitulo/${form.id}`), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (res.ok) await load();
      } else {
        const res = await fetch(buildApiUrl('capitulo'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (res.status === 201) await load();
      }
      setForm({ id: null, titulo: '', conteudo: '', pose: '', ordem: 0, idHistoria: '', idPersonagem: '' });
    } catch (err) { console.error(err); }
  };

  const handleEdit = (c) => setForm({ id: c._id || c.id, titulo: c.tituloBloco || c.titulo, conteudo: c.conteudoDialogo || c.conteudo, pose: c.pose || '', ordem: c.ordem || 0, idHistoria: c.idHistoria || '', idPersonagem: c.idPersonagem || '' });

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const res = await fetch(buildApiUrl(`capitulo/${deleteConfirm.id || deleteConfirm._id}`), { method: 'DELETE' });
      if (res.status === 204) await load();
    } catch (err) { console.error(err); }
    setDeleteConfirm(null);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">Capítulos</h1>
          <p className="text-sm text-gray-500">Crie, edite ou remova capítulos</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <form onSubmit={handleSubmit} className="xl:col-span-1 space-y-4 sticky top-8 bg-gray-50 p-4 rounded">
            <input value={form.titulo} onChange={(e) => setForm({...form, titulo: e.target.value})} placeholder="Título do bloco" className="w-full p-2 border rounded" />
            <textarea value={form.conteudo} onChange={(e) => setForm({...form, conteudo: e.target.value})} rows={4} placeholder="Conteúdo / diálogo" className="w-full p-2 border rounded" />
            <input value={form.pose} onChange={(e) => setForm({...form, pose: e.target.value})} placeholder="Pose" className="w-full p-2 border rounded" />
            <input type="number" value={form.ordem} onChange={(e) => setForm({...form, ordem: e.target.value})} placeholder="Ordem" className="w-full p-2 border rounded" />
            <input value={form.idHistoria} onChange={(e) => setForm({...form, idHistoria: e.target.value})} placeholder="ID História" className="w-full p-2 border rounded" />
            <input value={form.idPersonagem} onChange={(e) => setForm({...form, idPersonagem: e.target.value})} placeholder="ID Personagem" className="w-full p-2 border rounded" />
            <button className="w-full bg-red-400 text-white px-3 py-2 rounded">{isEditing ? 'Atualizar' : 'Criar'}</button>
          </form>

          <div className="xl:col-span-3 bg-white rounded shadow p-4">
            <table className="min-w-full">
              <thead><tr><th className="text-left">Título</th><th>Ordem</th><th className="text-right">Ações</th></tr></thead>
              <tbody>
                {capitulos.map(c => (
                  <tr key={c._id || c.id} className="border-t">
                    <td className="py-2">{c.tituloBloco || c.titulo}</td>
                    <td className="py-2 text-center">{c.ordem}</td>
                    <td className="py-2 text-right">
                      <button onClick={() => handleEdit(c)} className="text-red-500 mr-3">Editar</button>
                      <button onClick={() => setDeleteConfirm({ id: c._id || c.id })} className="text-gray-600">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {deleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="bg-white p-4 rounded">
              <p className="mb-4">Confirmar exclusão?</p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 border">Cancelar</button>
                <button onClick={confirmDelete} className="px-3 py-1 bg-red-400 text-white">Confirmar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
