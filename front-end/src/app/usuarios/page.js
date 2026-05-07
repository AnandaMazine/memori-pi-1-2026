"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const usuariosIniciais = [
  { id: "1", nome: "Ana Silva", nomeUsuario: "@anasilva", emailUsuario: "ana@memori.com.br", permissao: true },
  { id: "2", nome: "Lucas Rocha", nomeUsuario: "@lucas_r", emailUsuario: "lucas@memori.com.br", permissao: false },
];

export default function UsuariosCMS() {
  const [usuarios, setUsuarios] = useState(usuariosIniciais);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    id: null, nome: "", nomeUsuario: "", emailUsuario: "", senhaUsuario: "", permissao: false
  });

  const isEditing = formData.id !== null;

  const handleEdit = (user) => {
    setFormData({
      id: user.id, nome: user.nome, nomeUsuario: user.nomeUsuario,
      emailUsuario: user.emailUsuario, senhaUsuario: "", permissao: user.permissao
    });
  };

  const handleCancel = () => {
    setFormData({ id: null, nome: "", nomeUsuario: "", emailUsuario: "", senhaUsuario: "", permissao: false });
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setUsuarios(usuarios.filter(u => u.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 flex flex-col gap-8">
        <header className="border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">CMS: Usuários</h1>
          <p className="mt-2 text-sm text-gray-500">
            {isEditing ? `Editando o usuário ${formData.nomeUsuario}` : "Gerenciamento de credenciais."}
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-x-8 gap-y-10">
          
          {/* FORMULÁRIO ESTILO LOGIN */}
          <div className="xl:col-span-1">
            <form className="space-y-6 sticky top-8" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-900">Nome Completo</label>
                <div className="mt-2">
                  <input 
                    type="text" 
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Ex: João Silva"
                    className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Nome de Usuário</label>
                <div className="mt-2">
                  <input 
                    type="text" 
                    value={formData.nomeUsuario}
                    onChange={(e) => setFormData({...formData, nomeUsuario: e.target.value})}
                    placeholder="@usuario"
                    className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">E-mail</label>
                <div className="mt-2">
                  <input 
                    type="email" 
                    value={formData.emailUsuario}
                    onChange={(e) => setFormData({...formData, emailUsuario: e.target.value})}
                    placeholder="email@exemplo.com"
                    className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                  />
                </div>
              </div>

              {!isEditing && (
                <div>
                  <label className="block text-sm font-medium text-gray-900">Senha</label>
                  <div className="mt-2">
                    <input 
                      type="password" 
                      className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                    />
                  </div>
                </div>
              )}

              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="permissao"
                    type="checkbox"
                    checked={formData.permissao}
                    onChange={(e) => setFormData({...formData, permissao: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-400"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="permissao" className="font-medium text-gray-900">Acesso de Administrador</label>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 transition-colors"
                >
                  {isEditing ? "Atualizar Usuário" : "Cadastrar Usuário"}
                </button>
                {isEditing && (
                  <button 
                    onClick={handleCancel}
                    className="text-sm font-semibold text-gray-600 hover:text-gray-900"
                  >
                    Cancelar edição
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* TABELA AJUSTADA PARA A IDENTIDADE */}
          <div className="xl:col-span-3">
            <div className="overflow-hidden bg-white outline outline-1 -outline-offset-1 outline-gray-200 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Usuário</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">E-mail</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {usuarios.map((user) => (
                    <tr key={user.id} className={formData.id === user.id ? "bg-red-50/30" : "hover:bg-gray-50/50 transition-colors"}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{user.nome}</div>
                        <div className="text-sm text-red-500 font-medium">{user.nomeUsuario}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {user.emailUsuario}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          user.permissao 
                            ? "bg-red-50 text-red-700 ring-red-600/10" 
                            : "bg-gray-50 text-gray-600 ring-gray-500/10"
                        }`}>
                          {user.permissao ? "Admin" : "Padrão"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <button onClick={() => handleEdit(user)} className="text-red-500 hover:text-red-400 mr-4">Editar</button>
                        <button onClick={() => setDeleteConfirm(user)} className="text-gray-400 hover:text-gray-600">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {/* POPUP DE EXCLUSÃO ESTILO LOGIN */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/75 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden outline outline-1 outline-gray-200">
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900">Confirmar exclusão</h3>
              <p className="mt-2 text-sm text-gray-500">
                Tem certeza que deseja remover <span className="font-bold text-gray-900">{deleteConfirm.nomeUsuario}</span>?
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