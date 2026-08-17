"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const MapContainer = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.MapContainer
    ),
  { ssr: false }
);

const TileLayer = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.TileLayer
    ),
  { ssr: false }
);

const Marker = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.Marker
    ),
  { ssr: false }
);

const useMapEvents = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.useMapEvents
    ),
  { ssr: false }
);

const getCustomIcon = () => {
  if (typeof window === "undefined") return null;

  const L = require("leaflet");

  return new L.Icon({
    iconUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
};

function CliqueNoMapa({ setFormData }) {
  const mapEvents = useMapEvents();

  useEffect(() => {
    if (!mapEvents) return;

    const handleClick = (e) => {
      setFormData((prev) => ({
        ...prev,
        latitude: parseFloat(
          e.latlng.lat.toFixed(6)
        ),
        longitude: parseFloat(
          e.latlng.lng.toFixed(6)
        ),
      }));
    };

    mapEvents.on("click", handleClick);

    return () => {
      mapEvents.off("click", handleClick);
    };
  }, [mapEvents, setFormData]);

  return null;
}

export default function ModelagemMap({
  center,
  latitude,
  longitude,
  setFormData,
}) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />

      <CliqueNoMapa setFormData={setFormData} />

      {latitude && longitude && (
        <Marker
          position={[latitude, longitude]}
          icon={getCustomIcon()}
        />
      )}
    </MapContainer>
  );
}