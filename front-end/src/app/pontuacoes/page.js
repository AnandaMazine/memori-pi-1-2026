"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { buildApiUrl } from "@/lib/api";

export default function PontuacoesAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ id: null, usuario: '', desafio: '', pontos: 0, data: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const isEditing = !!form.id;

  async function load() {
    try {
      const res = await fetch(buildApiUrl('pontuacao'));
      if (res.ok) { const json = await res.json(); setItems(json.pontuacoes || []); }
    } catch (err) { console.error(err); }
  }
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { usuario: form.usuario, desafio: form.desafio, pontos: Number(form.pontos), data: form.data };
      if (isEditing) {
        const res = await fetch(buildApiUrl(`pontuacao/${form.id}`), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (res.ok) await load();
      } else {
        const res = await fetch(buildApiUrl('pontuacao'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (res.status === 201) await load();
      }
      setForm({ id: null, usuario: '', desafio: '', pontos: 0, data: '' });
    } catch (err) { console.error(err); }
  };

  const handleEdit = (p) => setForm({ id: p._id || p.id, usuario: p.usuario, desafio: p.desafio, pontos: p.pontos, data: p.data });

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const res = await fetch(buildApiUrl(`pontuacao/${deleteConfirm.id || deleteConfirm._id}`), { method: 'DELETE' });
      if (res.status === 204) await load();
    } catch (err) { console.error(err); }
    setDeleteConfirm(null);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">Pontuações</h1>
          <p className="text-sm text-gray-500">Registre e edite pontuações</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <form onSubmit={handleSubmit} className="xl:col-span-1 space-y-3 sticky top-8 bg-gray-50 p-4 rounded">
            <input value={form.usuario} onChange={(e) => setForm({...form, usuario: e.target.value})} placeholder="Usuário ID" className="w-full p-2 border rounded" />
            <input value={form.desafio} onChange={(e) => setForm({...form, desafio: e.target.value})} placeholder="Desafio ID" className="w-full p-2 border rounded" />
            <input type="number" value={form.pontos} onChange={(e) => setForm({...form, pontos: e.target.value})} placeholder="Pontos" className="w-full p-2 border rounded" />
            <input type="date" value={form.data} onChange={(e) => setForm({...form, data: e.target.value})} className="w-full p-2 border rounded" />
            <button className="w-full bg-red-400 text-white px-3 py-2 rounded">{isEditing ? 'Atualizar' : 'Criar'}</button>
          </form>

          <div className="xl:col-span-3 bg-white rounded shadow p-4">
            <table className="min-w-full">
              <thead><tr><th>Usuário</th><th>Desafio</th><th>Pontos</th><th className="text-right">Ações</th></tr></thead>
              <tbody>
                {items.map(i => (
                  <tr key={i._id || i.id} className="border-t">
                    <td className="py-2">{i.usuario}</td>
                    <td className="py-2">{i.desafio}</td>
                    <td className="py-2">{i.pontos}</td>
                    <td className="py-2 text-right">
                      <button onClick={() => handleEdit(i)} className="text-red-500 mr-3">Editar</button>
                      <button onClick={() => setDeleteConfirm({ id: i._id || i.id })} className="text-gray-600">Excluir</button>
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
