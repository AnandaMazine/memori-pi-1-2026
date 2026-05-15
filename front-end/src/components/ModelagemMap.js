"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function CliqueNoMapa({ setFormData }) {
  useMapEvents({
    click(e) {
      setFormData((prev) => ({
        ...prev,
        latitude: parseFloat(e.latlng.lat.toFixed(6)),
        longitude: parseFloat(e.latlng.lng.toFixed(6)),
      }));
    },
  });

  return null;
}

export default function ModelagemMap({ center, latitude, longitude, setFormData }) {
  return (
    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />
      <CliqueNoMapa setFormData={setFormData} />

      {latitude && longitude && <Marker position={[latitude, longitude]} icon={customIcon} />}
    </MapContainer>
  );
}
