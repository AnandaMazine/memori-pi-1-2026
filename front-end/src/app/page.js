import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Memori Logo" width={40} height={40} className="rounded-md object-contain"/>
        </div>
      <a href="/login" className="text-sm font-medium hover:text-blue-400 transition-colors"> Área do Administrador → </a>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-20 flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wide text-red-400 uppercase bg-red-100 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
        MEMORI
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
         Faça da sua visita<br />
          <span className="text-red-400">uma viagem no tempo.</span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10">
          Uma plataforma desenvolvida para ensinar história de através do uso de Realidade Aumentada. Disponível mobile.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button className="flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-red-400 text-white font-bold hover:bg-red-200 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
            Instalar Aplicativo
          </button>
        </div>

        <div className="mt-20 w-full max-w-5xl border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl bg-black">
          <div className="bg-zinc-100 dark:bg-zinc-900 p-4 border-b border-zinc-200 dark:border-zinc-800 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>

          <div className="relative w-full aspect-video">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://youtu.be/embed/N-Y7f6mqlNQ?autoplay=1&mute=1" 
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-sm text-zinc-500 border-t border-zinc-100 dark:border-zinc-900">
        <p>© 2026 MemoriPI - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}