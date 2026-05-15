"use client";

import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { buildApiUrl } from "@/lib/api";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const checkpointsMock = [
  { id: 1, name: "Checkpoint Alfa", lat: -23.5505, lng: -46.6333 },
  { id: 2, name: "Checkpoint Bravo", lat: -23.5515, lng: -46.6343 },
];

const rankingMock = [
  { id: "1", usuario: "Ana Silva", username: "@anasilva", pontosTotal: 1550, posicao: 1 },
  { id: "2", usuario: "Lucas Rocha", username: "@lucas_r", pontosTotal: 1420, posicao: 2 },
  { id: "3", usuario: "Beatriz M.", username: "@beame", pontosTotal: 1200, posicao: 3 },
];

const pontuacaoRecenteMock = [
  { id: "101", usuario: "Ana Silva", desafio: "Check-in Alfa", pontos: 250, data: "07/05/2026" },
  { id: "102", usuario: "Lucas Rocha", desafio: "Ronda Norte", pontos: 180, data: "06/05/2026" },
  { id: "103", usuario: "Carlos D.", desafio: "Check-in Bravo", pontos: 150, data: "06/05/2026" },
];

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const decodeJwt = (token) => {
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payload = parts[1];
      const padded = payload.padEnd(payload.length + (4 - (payload.length % 4)) % 4, '=');
      const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(json);
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('memori_token') || '';
      if (!token) return;
      const payload = decodeJwt(token);
      const id = payload?.id;
      if (!id) return;
      setLoadingUser(true);
      try {
        const res = await fetch(buildApiUrl(`usuario/${id}`), { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const json = await res.json();
          setUser(json.usuario || null);
        } else {
          console.warn('Failed to load user for dashboard', res.status);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, []);

  
  const getIcon = () => {
    if (typeof window === "undefined") return null;
    const L = require("leaflet");
    return new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', // Alterado para vermelho
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 flex flex-col gap-8">
        <header className="border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-500 font-medium">Visão Geral do Sistema</p>
        </header>

        {/* GRID SUPERIOR: CREDENCIAL + MAPA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CREDENCIAL (ESTILO CARD LOGIN) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm outline outline-1 -outline-offset-1 outline-gray-200 overflow-hidden relative sticky top-8">
              <div className="h-2 bg-red-400 w-full" />
              
              <div className="px-6 py-8 flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">{user ? user.nome : (loadingUser ? 'Carregando...' : 'Usuário')}</h2>
                  <p className="text-sm font-semibold text-red-500 mt-1">{user ? (user.nomeUsuario || '@usuario') : '@usuario'}</p>
                </div>

                <div className="w-full space-y-4 border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</span>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {user ? 'Ativo' : '—'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</span>
                    <span className="text-sm font-semibold text-gray-900">{user ? (user.permissao ? 'Administrador' : 'Usuário') : '—'}</span>
                  </div>

                  <div className="flex flex-col gap-1 pt-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail de Acesso</span>
                    <span className="text-sm font-medium text-gray-900 truncate">{user ? (user.emailUsuario || '—') : '—'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAPA */}
          <div className="lg:col-span-2">            
            <div className="bg-white rounded-lg shadow-sm outline outline-1 -outline-offset-1 outline-gray-200 p-4 h-[500px] flex flex-col">
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Mapa de Atividades</h3>
                <span className="text-[10px] text-gray-400 font-medium">Real-time Data</span>
              </div>  
              <div className="flex-1 rounded-md overflow-hidden outline outline-1 outline-gray-100 relative z-0">
                <MapContainer center={[-24.490, -47.844]} zoom={15} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {checkpointsMock.map((point) => (
                    <Marker key={point.id} position={[point.lat, point.lng]} icon={getIcon()}>
                      <Popup>{point.name}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>

        {/* GRID INFERIOR: RANKING + HISTÓRICO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
          
          {/* RANKING */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm outline outline-1 -outline-offset-1 outline-gray-200 p-6 flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6 border-b border-gray-100 pb-3">Ranking Global</h3>
            <div className="space-y-3">
              {rankingMock.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-md bg-white outline outline-1 outline-gray-100 hover:outline-red-200 transition-all">
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold ${item.posicao === 1 ? 'bg-red-400 text-white shadow-sm' : 'bg-gray-100 text-gray-600'}`}>
                      {item.posicao}º
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.usuario}</p>
                      <p className="text-xs text-gray-500">{item.username}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-500">{item.pontosTotal}</p>
                    <p className="text-[9px] text-gray-400 uppercase font-bold tracking-tight">Pontos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TABELA DE PONTUAÇÕES */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm outline outline-1 -outline-offset-1 outline-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
               <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Pontuações Recentes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr className="text-xs font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-100">
                    <th className="py-3 px-6">Agente</th>
                    <th className="py-3 px-6">Quest</th>
                    <th className="py-3 px-6">Data</th>
                    <th className="py-3 px-6 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pontuacaoRecenteMock.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-semibold text-gray-900">{row.usuario}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
                          {row.desafio}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-500">{row.data}</td>
                      <td className="py-4 px-6 text-right font-bold text-gray-900">+{row.pontos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}