"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const menuItems = [
  { 
    name: "Dashboard", 
    href: "/dashboard", 
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  { 
    name: "Desafios", 
    href: "/desafios", 
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.306 3.5 3.5 0 015.438 0 3.42 3.42 0 001.946 1.306 3.5 3.5 0 012.112 3.63 3.42 3.42 0 001.063 2.152 3.5 3.5 0 010 5.438 3.42 3.42 0 00-1.063 2.152 3.5 3.5 0 01-2.112 3.63 3.42 3.42 0 00-1.946 1.306 3.5 3.5 0 01-5.438 0 3.42 3.42 0 00-1.946-1.306 3.5 3.5 0 01-2.112-3.63 3.42 3.42 0 00-1.063-2.152 3.5 3.5 0 010-5.438 3.42 3.42 0 001.063-2.152 3.5 3.5 0 012.112-3.63z" />
      </svg>
    )
  },
  { 
    name: "Histórias", 
    href: "/historias", 
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  { 
    name: "Modelagens", 
    href: "/modelagens", 
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" points="3.27 6.96 12 12.01 20.73 6.96" />
        <line strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    )
  },
  { 
    name: "Personagens", 
    href: "/personagens", 
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    name: "Quests", 
    href: "/quests", 
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  { 
    name: "Usuários", 
    href: "/usuarios", 
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
];

export default function Sidebar() {
  // Alterado apenas o estado inicial para true
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  return (
    <aside 
      className={`h-screen sticky top-0 border-r border-gray-200 bg-white flex flex-col font-sans transition-all duration-300 relative z-50 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Trocado overflow-hidden para overflow-visible para o botão não sumir */}
      <div className="flex h-16 items-center border-b border-gray-100 px-4 gap-2 overflow-visible">
        <div className={`flex items-center gap-3 transition-all ${isCollapsed ? "w-full justify-center" : "flex-1"}`}>
            <Image src="/images/logo.png" alt="Memori" width={32} height={32} className="h-8 w-auto rounded-lg flex-shrink-0"/>
            {!isCollapsed && (
                <span className="text-xl font-bold text-gray-900 truncate tracking-tight"> MEMORI</span>
            )}
        </div>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ${isCollapsed ? "hidden" : "block"}`}
          title={isCollapsed ? "Expandir" : "Recolher"}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        {isCollapsed && (
            <button onClick={() => setIsCollapsed(false)} className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-sm text-gray-400 hover:text-red-500 transition-all">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7" />
                </svg>
            </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md py-2.5 text-sm font-semibold transition-all ${
                isCollapsed ? "justify-center px-0" : "px-3"
              } ${
                isActive
                  ? "bg-red-50 text-red-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title={isCollapsed ? item.name : ""}
            >
              {item.icon(`h-6 w-6 flex-shrink-0 ${isCollapsed ? "" : "mr-3"} ${isActive ? "text-red-500" : "text-gray-400 group-hover:text-gray-500"}`)}
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 p-4">
        <button 
          onClick={() => console.log("Logout disparado")}
          className={`flex w-full items-center rounded-md py-2 text-sm font-bold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors group ${
            isCollapsed ? "justify-center px-0" : "px-3 gap-3"
          }`}
        >
          <svg className="h-6 w-6 group-hover:text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && <span>Sair do Sistema</span>}
        </button>
      </div>
    </aside>
  );
}