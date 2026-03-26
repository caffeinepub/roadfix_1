import {
  AlertTriangle,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { useState } from "react";
import type { AppUser, Screen } from "../App";

const BOOKINGS = [
  {
    id: 1,
    captain: "Murugan S",
    service: "Tire Change",
    fare: 150,
    date: "25 Mar 2026",
    status: "Completed",
    rating: 5,
  },
  {
    id: 2,
    captain: "Karthik R",
    service: "Battery Jumpstart",
    fare: 280,
    date: "20 Mar 2026",
    status: "Completed",
    rating: 4,
  },
  {
    id: 3,
    captain: "Vijay P",
    service: "Towing",
    fare: 95,
    date: "10 Mar 2026",
    status: "Completed",
    rating: 5,
  },
];

export default function UserDashboard({
  user,
  screen,
  setScreen,
  onLogout,
  t,
  lang,
  setLang,
}: {
  user: AppUser;
  screen: Screen;
  setScreen: (s: Screen) => void;
  onLogout: () => void;
  t: (en: string, ta: string) => string;
  lang: string;
  setLang: (l: "en" | "ta") => void;
}) {
  const [requestState, setRequestState] = useState<
    "idle" | "searching" | "accepted"
  >("idle");
  const [selectedService, setSelectedService] = useState("Tire Change");

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white flex flex-col">
      <header className="bg-[#1c1f23] border-b border-white/10 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xs">R</span>
          </div>
          <span className="font-bold">RoadFix</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ta" : "en")}
            className="text-orange-400 text-xs font-medium"
          >
            {lang === "en" ? "தமிழ்" : "EN"}
          </button>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-7 h-7 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold text-xs">
              {user.name[0]}
            </div>
            <span className="hidden md:block text-sm">{user.name}</span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="text-xs text-gray-400 hover:text-white"
          >
            {t("Logout", "வெளியேறு")}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto pb-20">
        {screen === "home" && (
          <div className="relative">
            <div className="relative h-72 bg-[#1a1d23] overflow-hidden">
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="g2"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 60 0 L 0 0 0 60"
                      fill="none"
                      stroke="#4a5568"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#g2)" />
              </svg>
              <div className="absolute top-8 left-16 bg-[#1c1f23]/90 border border-white/20 rounded-full px-3 py-1 text-xs flex items-center gap-1">
                <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                  <MapPin size={8} className="text-black" />
                </div>
                <span>Murugan S · 4 min</span>
              </div>
              <div className="absolute top-16 right-12 bg-[#1c1f23]/90 border border-white/20 rounded-full px-3 py-1 text-xs flex items-center gap-1">
                <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                  <MapPin size={8} className="text-black" />
                </div>
                <span>Senthil M · 9 min</span>
              </div>
              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-blue-500 rounded-full w-4 h-4 border-2 border-white shadow-lg"
                title="Your location"
              />
              <div className="absolute top-3 right-3 bg-[#1c1f23]/90 rounded-xl px-3 py-2 text-xs">
                <span className="text-orange-400 font-bold">8</span>{" "}
                <span className="text-gray-400">nearby</span>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {requestState === "idle" && (
                <div className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={14} className="text-orange-400" />
                    <span className="text-sm text-gray-300">
                      {t("Current Location", "தற்போதைய இடம்")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Tire Change", "Battery", "Towing", "Engine"].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSelectedService(s)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          selectedService === s
                            ? "bg-orange-500 border-orange-500 text-black font-semibold"
                            : "border-white/20 text-gray-300"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setRequestState("searching")}
                    className="w-full bg-orange-500 hover:bg-orange-400 text-black font-bold py-3 rounded-xl text-sm"
                  >
                    {t("Request Help Now", "இப்போது உதவி கோரவும்")}
                  </button>
                </div>
              )}
              {requestState === "searching" && (
                <div className="bg-[#1c1f23] rounded-2xl p-4 border border-orange-500/30 text-center">
                  <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="font-semibold">
                    {t(
                      "Finding nearby captains...",
                      "அருகிலுள்ள கேப்டன்களை தேடுகிறோம்...",
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {t(
                      "Usually takes 30–60 seconds",
                      "பொதுவாக 30-60 வினாடிகள் ஆகும்",
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => setRequestState("accepted")}
                    className="mt-3 text-xs text-orange-400 underline"
                  >
                    {t("Simulate Accept (Demo)", "ஏற்பு உருவகப்படுத்து")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestState("idle")}
                    className="mt-2 w-full border border-white/20 py-2 rounded-xl text-sm text-gray-400"
                  >
                    {t("Cancel", "ரத்து")}
                  </button>
                </div>
              )}
              {requestState === "accepted" && (
                <div className="bg-[#1c1f23] rounded-2xl p-4 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm font-semibold">
                      {t("Captain on the way!", "கேப்டன் வழியில் உள்ளார்!")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold">
                      M
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Murugan S</p>
                      <div className="flex items-center gap-1">
                        <Star
                          size={12}
                          className="fill-orange-400 text-orange-400"
                        />
                        <span className="text-xs text-gray-400">
                          4.8 · Bike Mechanic
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-orange-400 font-bold">4 min</p>
                      <p className="text-xs text-gray-400">ETA</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-2.5 text-sm hover:bg-white/10"
                    >
                      <Phone size={14} />
                      {t("Call", "அழைக்கவும்")}
                    </button>
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-2.5 text-sm hover:bg-white/10"
                    >
                      <MessageCircle size={14} />
                      {t("Chat", "சாட்")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRequestState("idle")}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl py-2.5 text-sm text-red-400"
                    >
                      {t("Cancel", "ரத்து")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {screen === "bookings" && (
          <div className="p-4 space-y-3">
            <h2 className="font-bold text-lg mb-4">
              {t("Booking History", "முன்பதிவு வரலாறு")}
            </h2>
            {BOOKINGS.map((b) => (
              <div
                key={b.id}
                className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{b.service}</p>
                    <p className="text-xs text-gray-400">
                      {b.captain} · {b.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-400">₹{b.fare}</p>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                      {b.status}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(b.rating)].map((_, idx) => (
                    <Star
                      key={`${b.id}-star-${idx}`}
                      size={12}
                      className="fill-orange-400 text-orange-400"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {screen === "chat" && (
          <div className="p-4">
            <h2 className="font-bold text-lg mb-4">
              {t("Messages", "செய்திகள்")}
            </h2>
            <div className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10 text-center text-gray-400 text-sm py-12">
              {t(
                "No active chats. Start a request to chat with your captain.",
                "செயலில் உள்ள அரட்டைகள் இல்லை.",
              )}
            </div>
          </div>
        )}

        {screen === "profile" && (
          <div className="p-4">
            <h2 className="font-bold text-lg mb-4">
              {t("Profile", "சுயவிவரம்")}
            </h2>
            <div className="bg-[#1c1f23] rounded-2xl p-5 border border-white/10 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold text-2xl">
                  {user.name[0]}
                </div>
                <div>
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                    User
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="font-bold text-orange-400">3</p>
                  <p className="text-xs text-gray-400">
                    {t("Rides", "பயணங்கள்")}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="font-bold text-orange-400">₹525</p>
                  <p className="text-xs text-gray-400">{t("Spent", "செலவு")}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="font-bold text-orange-400">4.9</p>
                  <p className="text-xs text-gray-400">
                    {t("Rating", "மதிப்பீடு")}
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="w-full border border-red-500/40 text-red-400 py-3 rounded-xl text-sm"
            >
              {t("Log Out", "வெளியேறு")}
            </button>
          </div>
        )}
      </div>

      {requestState !== "idle" && (
        <button
          type="button"
          className="fixed right-4 bottom-24 z-40 bg-red-500 hover:bg-red-400 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-red-500/40"
        >
          <AlertTriangle size={24} />
        </button>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1c1f23] border-t border-white/10 flex">
        {(["home", "bookings", "chat", "profile"] as const).map((s) => {
          const icons: Record<string, string> = {
            home: "🏠",
            bookings: "📋",
            chat: "💬",
            profile: "👤",
          };
          const labels: Record<string, string> = {
            home: t("Home", "முகப்பு"),
            bookings: t("Bookings", "முன்பதிவுகள்"),
            chat: t("Chat", "சாட்"),
            profile: t("Profile", "சுயவிவரம்"),
          };
          return (
            <button
              type="button"
              key={s}
              onClick={() => setScreen(s)}
              className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors ${
                screen === s ? "text-orange-400" : "text-gray-500"
              }`}
            >
              <span className="text-xl">{icons[s]}</span>
              <span className="text-[10px]">{labels[s]}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
