import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useRef, useState } from "react";

// Fix leaflet default icon
(L.Icon.Default.prototype as any)._getIconUrl = undefined;
L.Icon.Default.mergeOptions({ iconUrl, shadowUrl: iconShadow });

const CHENNAI = { lat: 13.0827, lng: 80.2707 };

export default function LocationPermPage({
  onContinue,
}: {
  onContinue: (location: { lat: number; lng: number } | null) => void;
}) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [requesting, setRequesting] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);

  const initMap = (coords: { lat: number; lng: number }) => {
    if (!mapRef.current || leafletMap.current) return;
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([coords.lat, coords.lng], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    L.circleMarker([coords.lat, coords.lng], {
      radius: 10,
      fillColor: "#3B82F6",
      color: "#fff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
    })
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();
    leafletMap.current = map;
  };

  const handleAllow = () => {
    setRequesting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setLocation(coords);
        setRequesting(false);
        setTimeout(() => initMap(coords), 100);
      },
      () => {
        setLocation(CHENNAI);
        setRequesting(false);
        setTimeout(() => initMap(CHENNAI), 100);
      },
    );
  };

  useEffect(() => {
    return () => {
      leafletMap.current?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c0e] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="text-3xl mb-3">📍</div>
          <h2
            className="text-white font-black text-2xl"
            style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          >
            Allow Live Location Access
          </h2>
          <p className="text-gray-400 text-sm mt-1 text-center">
            We need your location to find nearby captains and provide accurate
            ETA
          </p>
        </div>

        {location ? (
          <div className="mb-5">
            <div
              ref={mapRef}
              className="h-48 rounded-2xl overflow-hidden border border-white/10"
            />
            <p className="text-green-400 text-xs text-center mt-2 font-semibold">
              ✓ Location accessed
            </p>
          </div>
        ) : (
          <div className="bg-[#141518] rounded-2xl p-5 border border-white/10 mb-5 text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-gray-400 text-sm">
              Your location preview will appear here
            </p>
          </div>
        )}

        {!location && (
          <button
            type="button"
            onClick={handleAllow}
            disabled={requesting}
            className="w-full bg-[#FACC15] text-black font-black text-base rounded-full py-3.5 mb-3 hover:bg-yellow-300 transition-colors disabled:opacity-60"
            data-ocid="location.allow.button"
          >
            {requesting ? "Getting location..." : "Allow Location"}
          </button>
        )}

        <button
          type="button"
          onClick={() => onContinue(location)}
          className={`w-full font-black text-base rounded-full py-3.5 transition-colors ${
            location
              ? "bg-[#FACC15] text-black hover:bg-yellow-300"
              : "border border-white/20 text-gray-500 hover:text-gray-300"
          }`}
          data-ocid="location.continue.button"
        >
          {location ? "Continue" : "Skip for now"}
        </button>
      </div>
    </div>
  );
}
