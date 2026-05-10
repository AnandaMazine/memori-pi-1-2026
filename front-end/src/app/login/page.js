"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentativa de login no CMS");
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src="/images/logo.png" alt="Memori" width={48} height={48} className="mx-auto h-12 w-auto rounded-lg"/>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Entrar na sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Endereço de e-mail
            </label>
            <div className="mt-2">
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="Ex: joao.silva@email.com" className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Senha
              </label>
              <div className="text-sm">
                <Link href="#" className="font-semibold text-red-500 hover:text-red-400">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" required autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 transition-colors"> Acessar Painel </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Ainda não tem uma conta?
          <Link href="/register" className="font-semibold text-red-500 hover:text-red-400">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}