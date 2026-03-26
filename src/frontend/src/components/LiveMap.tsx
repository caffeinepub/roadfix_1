import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useRef, useState } from "react";

// Fix leaflet default icon
(L.Icon.Default.prototype as any)._getIconUrl = undefined;
L.Icon.Default.mergeOptions({ iconUrl, shadowUrl: iconShadow });

const CHENNAI = { lat: 13.0827, lng: 80.2707 };

const FAKE_CAPTAINS = [
  { name: "Murugan S", offsetLat: 0.003, offsetLng: -0.004 },
  { name: "Senthil M", offsetLat: -0.002, offsetLng: 0.005 },
  { name: "Karthik R", offsetLat: 0.005, offsetLng: 0.003 },
];

export default function LiveMap({
  className = "h-72",
}: { className?: string }) {
  const mapDiv = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let canceled = false;

    const buildMap = (coords: { lat: number; lng: number }) => {
      if (canceled || !mapDiv.current || mapInstance.current) return;

      const map = L.map(mapDiv.current, {
        zoomControl: true,
        scrollWheelZoom: true,
      }).setView([coords.lat, coords.lng], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // User blue dot
      L.circleMarker([coords.lat, coords.lng], {
        radius: 10,
        fillColor: "#3B82F6",
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      })
        .addTo(map)
        .bindPopup("<b>You are here</b>")
        .openPopup();

      // Fake captain markers
      const yellowIcon = L.divIcon({
        className: "",
        html: `<div style="background:#FACC15;width:28px;height:28px;border-radius:50%;border:3px solid #000;display:flex;align-items:center;justify-content:center;font-size:12px;">&#128295;</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      for (const c of FAKE_CAPTAINS) {
        L.marker([coords.lat + c.offsetLat, coords.lng + c.offsetLng], {
          icon: yellowIcon,
        })
          .addTo(map)
          .bindPopup(`<b>${c.name}</b><br/>Available`);
      }

      mapInstance.current = map;
      setReady(true);
    };

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        buildMap({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => buildMap(CHENNAI),
    );

    return () => {
      canceled = true;
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className={`relative ${className} bg-card overflow-hidden`}>
      <div ref={mapDiv} className="w-full h-full" />
      {ready && (
        <div className="absolute top-3 right-3 z-[1000] bg-black/80 rounded-xl px-3 py-2 text-xs pointer-events-none">
          <span className="text-[#FACC15] font-bold">8</span>{" "}
          <span className="text-gray-300">nearby</span>
        </div>
      )}
    </div>
  );
}
