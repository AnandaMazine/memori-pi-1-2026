"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { buildApiUrl } from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', confirm: '' });
  const [busy, setBusy] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return alert('As senhas não coincidem');
    setBusy(true);
    try {
      const payload = { nome: form.name, nomeUsuario: form.username, emailUsuario: form.email, senhaUsuario: form.password, permissao: false };
      const res = await fetch(buildApiUrl('usuario'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.status === 201) {
        alert('Cadastro realizado com sucesso. Faça login.');
        window.location.href = '/login';
      } else {
        const json = await res.json();
        alert(json.error || 'Falha no cadastro');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar');
    } finally { setBusy(false); }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src="/images/logo.png" alt="MemoriPI" width={48} height={48} className="mx-auto h-12 w-auto rounded-lg"/>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Crie sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegister}>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Nome completo
            </label>
            <div className="mt-2">
              <input id="name" name="name" type="text" required placeholder="Ex: João Silva" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm"/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Usuário
            </label>
            <div className="mt-2">
              <input id="username" name="username" type="text" required placeholder="Ex: @João Silva" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm"/>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Endereço de e-mail
            </label>
            <div className="mt-2">
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="Ex: joao.silva@email.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm"/>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Senha
            </label>
            <div className="mt-2">
              <input id="password" name="password" type="password" required value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm"/>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900">
              Confirmar senha
            </label>
            <div className="mt-2">
              <input id="confirm-password" name="confirm-password" type="password" required value={form.confirm} onChange={(e) => setForm({...form, confirm: e.target.value})}
              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm"/>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={busy}
              className="flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 transition-colors disabled:opacity-50"
            >
              {busy ? 'Enviando...' : 'Criar minha conta'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Já possui uma conta?
          <Link href="/login" className="font-semibold text-red-500 hover:text-red-400">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}