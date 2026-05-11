"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { buildApiUrl } from "@/lib/api";

export default function RankingsAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ id: null, usuario: '', username: '', pontosTotal: 0, posicao: 0 });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const isEditing = !!form.id;

  async function load() {
    try {
      const res = await fetch(buildApiUrl('ranking'));
      if (res.ok) { const json = await res.json(); setItems(json.rankings || []); }
    } catch (err) { console.error(err); }
  }
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { usuario: form.usuario, username: form.username, pontosTotal: Number(form.pontosTotal), posicao: Number(form.posicao) };
      if (isEditing) {
        const res = await fetch(buildApiUrl(`ranking/${form.id}`), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (res.ok) await load();
      } else {
        const res = await fetch(buildApiUrl('ranking'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (res.status === 201) await load();
      }
      setForm({ id: null, usuario: '', username: '', pontosTotal: 0, posicao: 0 });
    } catch (err) { console.error(err); }
  };

  const handleEdit = (r) => setForm({ id: r._id || r.id, usuario: r.usuario, username: r.username, pontosTotal: r.pontosTotal, posicao: r.posicao });

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const res = await fetch(buildApiUrl(`ranking/${deleteConfirm.id || deleteConfirm._id}`), { method: 'DELETE' });
      if (res.status === 204) await load();
    } catch (err) { console.error(err); }
    setDeleteConfirm(null);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">Rankings</h1>
          <p className="text-sm text-gray-500">Gerencie o ranking de jogadores</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <form onSubmit={handleSubmit} className="xl:col-span-1 space-y-3 sticky top-8 bg-gray-50 p-4 rounded">
            <input value={form.usuario} onChange={(e) => setForm({...form, usuario: e.target.value})} placeholder="Usuário ID" className="w-full p-2 border rounded" />
            <input value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} placeholder="Username" className="w-full p-2 border rounded" />
            <input type="number" value={form.pontosTotal} onChange={(e) => setForm({...form, pontosTotal: e.target.value})} placeholder="Pontos totais" className="w-full p-2 border rounded" />
            <input type="number" value={form.posicao} onChange={(e) => setForm({...form, posicao: e.target.value})} placeholder="Posição" className="w-full p-2 border rounded" />
            <button className="w-full bg-red-400 text-white px-3 py-2 rounded">{isEditing ? 'Atualizar' : 'Criar'}</button>
          </form>

          <div className="xl:col-span-3 bg-white rounded shadow p-4">
            <table className="min-w-full">
              <thead><tr><th>Usuário</th><th>Username</th><th>Pontos</th><th className="text-right">Ações</th></tr></thead>
              <tbody>
                {items.map(r => (
                  <tr key={r._id || r.id} className="border-t">
                    <td className="py-2">{r.usuario}</td>
                    <td className="py-2">{r.username}</td>
                    <td className="py-2">{r.pontosTotal}</td>
                    <td className="py-2 text-right">
                      <button onClick={() => handleEdit(r)} className="text-red-500 mr-3">Editar</button>
                      <button onClick={() => setDeleteConfirm({ id: r._id || r.id })} className="text-gray-600">Excluir</button>
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
