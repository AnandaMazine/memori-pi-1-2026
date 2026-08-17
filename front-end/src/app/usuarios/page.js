"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { buildApiUrl } from "@/lib/api";

export default function UsuariosCMS() {
  const [usuarios, setUsuarios] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id: null, nome: "", nomeUsuario: "", emailUsuario: "", senhaUsuario: "", permissao: false
  });
  const [token, setToken] = useState("");
  const [tokenReady, setTokenReady] = useState(false);

  const isEditing = formData.id !== null;

  const normalizeUsuario = (usuario) => ({
    ...usuario,
    id: usuario._id || usuario.id,
  });

  const loadUsuarios = async () => {
    setLoading(true);
    setError("");

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(buildApiUrl("usuario"), { headers });

      if (response.status === 401) {
        setError("Faça login para carregar usuários.");
        return false;
      }

      if (!response.ok) {
        throw new Error(`Falha ao carregar usuários (${response.status})`);
      }

      const data = await response.json();
      if (Array.isArray(data.usuarios)) {
        setUsuarios(data.usuarios.map(normalizeUsuario));
      } else {
        setUsuarios([]);
      }

      return true;
    } catch (loadError) {
      setError("Não foi possível carregar os usuários.");
      console.error(loadError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedToken = typeof window !== "undefined" ? localStorage.getItem("memori_token") || "" : "";
    setToken(savedToken);
    setTokenReady(true);
  }, []);

  useEffect(() => {
    if (!tokenReady) {
      return;
    }

    void loadUsuarios();
  }, [token, tokenReady]);

  const handleEdit = (user) => {
    setFormData({
      id: user.id, nome: user.nome, nomeUsuario: user.nomeUsuario,
      emailUsuario: user.emailUsuario, senhaUsuario: "", permissao: user.permissao
    });
  };

  const handleCancel = () => {
    setFormData({ id: null, nome: "", nomeUsuario: "", emailUsuario: "", senhaUsuario: "", permissao: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        nome: formData.nome,
        nomeUsuario: formData.nomeUsuario,
        emailUsuario: formData.emailUsuario,
        permissao: formData.permissao,
      };

      if (!isEditing) {
        payload.senhaUsuario = formData.senhaUsuario;
      } else if (formData.senhaUsuario) {
        payload.senhaUsuario = formData.senhaUsuario;
      }

      const response = await fetch(
        isEditing ? buildApiUrl(`usuario/${formData.id}`) : buildApiUrl("usuario"),
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            ...(isEditing && token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.status === 401) {
        setError("Token inválido ou expirado. Faça login novamente.");
        return;
      }

      if (!response.ok && response.status !== 201) {
        throw new Error("Falha ao salvar usuário");
      }

      await loadUsuarios();
      handleCancel();
    } catch (submitError) {
      setError("Não foi possível salvar o usuário.");
      console.error(submitError);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      (async () => {
        setLoading(true);
        setError("");
        try {
          const response = await fetch(buildApiUrl(`usuario/${deleteConfirm.id}`), {
            method: "DELETE",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });

          if (response.status === 401) {
            setError("Token inválido ou expirado. Faça login novamente.");
            return;
          }

          if (!response.ok && response.status !== 204) {
            throw new Error("Falha ao excluir usuário");
          }

          setUsuarios(usuarios.filter(u => u.id !== deleteConfirm.id));
          setDeleteConfirm(null);
        } catch (deleteError) {
          setError("Não foi possível excluir o usuário.");
          console.error(deleteError);
        } finally {
          setLoading(false);
        }
      })();
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 flex flex-col gap-8">
        <header className="border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Usuários</h1>
          <p className="mt-2 text-sm text-gray-500">
            {isEditing ? `Editando o usuário ${formData.nomeUsuario}` : "Crie, edite ou remova usuários"}
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-x-8 gap-y-10">
          
          <div className="xl:col-span-1">
            <form className="space-y-6 sticky top-8" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-inset ring-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-900">Nome Completo</label>
                <div className="mt-2">
                  <input 
                    type="text" 
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Ex: João Silva"
                    className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
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
                    className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
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
                    className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
                  />
                </div>
              </div>

              {!isEditing && (
                <div>
                  <label className="block text-sm font-medium text-gray-900">Senha</label>
                  <div className="mt-2">
                    <input 
                      type="password" 
                      value={formData.senhaUsuario}
                      onChange={(e) => setFormData({...formData, senhaUsuario: e.target.value})}
                      className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400"
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
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline-offset-2 focus-visible:outline-red-400 transition-colors"
                >
                  {loading ? "Salvando..." : isEditing ? "Atualizar Usuário" : "Cadastrar Usuário"}
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

          <div className="xl:col-span-3">
            <div className="overflow-hidden bg-white outline-1 -outline-offset-1 outline-gray-200 rounded-lg shadow-sm">
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
                  {usuarios.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                        {loading ? "Carregando usuários..." : "Nenhum usuário encontrado. Faça login ou cadastre o primeiro usuário."}
                      </td>
                    </tr>
                  ) : (
                    usuarios.map((user) => (
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/75 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden outline-1 outline-gray-200">
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900">Confirmar exclusão</h3>
              <p className="mt-2 text-sm text-gray-500">
                Tem certeza que deseja remover <span className="font-bold text-gray-900">{deleteConfirm.nomeUsuario}</span>?
              </p>
            </div>
            <div className="flex bg-gray-50 p-4 gap-3">
              <button 
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50"
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