import {
  Navigation,
  Star,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import type { AppUser } from "../App";

export default function CaptainDashboard({
  user,
  onLogout,
  t,
  lang,
  setLang,
}: {
  user: AppUser;
  onLogout: () => void;
  t: (en: string, ta: string) => string;
  lang: string;
  setLang: (l: "en" | "ta") => void;
}) {
  const [isOnline, setIsOnline] = useState(false);
  const [requestState, setRequestState] = useState<
    "none" | "incoming" | "active"
  >("none");
  const [tab, setTab] = useState<"home" | "earnings" | "profile">("home");

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white flex flex-col">
      <header className="bg-[#1c1f23] border-b border-white/10 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xs">R</span>
          </div>
          <span className="font-bold">RoadFix</span>
          <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full ml-1">
            Captain
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ta" : "en")}
            className="text-orange-400 text-xs"
          >
            {lang === "en" ? "தமிழ்" : "EN"}
          </button>
          <button
            onClick={onLogout}
            className="text-xs text-gray-400 hover:text-white"
          >
            {t("Logout", "வெளியேறு")}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto pb-20 p-4 space-y-4">
        {tab === "home" && (
          <>
            {/* Online Toggle */}
            <div
              className={`rounded-2xl p-5 border ${
                isOnline
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-[#1c1f23] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">
                    {isOnline
                      ? t("You are Online", "நீங்கள் ஆன்லைனில் இருக்கிறீர்கள்")
                      : t("You are Offline", "நீங்கள் ஆஃப்லைனில் இருக்கிறீர்கள்")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isOnline
                      ? t("Accepting ride requests", "பயண கோரிக்கைகளை ஏற்கிறோம்")
                      : t(
                          "Go online to start earning",
                          "சம்பாதிக்க ஆன்லைனில் செல்லவும்",
                        )}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsOnline(!isOnline);
                    if (!isOnline) setRequestState("none");
                  }}
                  className="transition-colors"
                >
                  {isOnline ? (
                    <ToggleRight size={44} className="text-green-400" />
                  ) : (
                    <ToggleLeft size={44} className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Incoming Request */}
            {isOnline && requestState === "none" && (
              <div className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10 text-center">
                <div className="w-10 h-10 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-400">
                  {t(
                    "Waiting for requests...",
                    "கோரிக்கைகளுக்காக காத்திருக்கிறோம்...",
                  )}
                </p>
                <button
                  onClick={() => setRequestState("incoming")}
                  className="mt-2 text-xs text-orange-400 underline"
                >
                  {t("Simulate Request (Demo)", "கோரிக்கை உருவகப்படுத்து")}
                </button>
              </div>
            )}

            {requestState === "incoming" && (
              <div className="bg-[#1c1f23] rounded-2xl p-4 border border-orange-500/40 animate-pulse">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping" />
                  <span className="text-orange-400 font-semibold text-sm">
                    {t("New Request!", "புதிய கோரிக்கை!")}
                  </span>
                </div>
                <div className="space-y-1.5 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t("User", "பயனர்")}</span>
                    <span>Ravi Kumar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      {t("Service", "சேவை")}
                    </span>
                    <span>Tire Change</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      {t("Distance", "தூரம்")}
                    </span>
                    <span>1.2 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t("Fare", "கட்டணம்")}</span>
                    <span className="text-orange-400 font-bold">₹150</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRequestState("active")}
                    className="flex-1 bg-green-500 hover:bg-green-400 text-black font-bold py-2.5 rounded-xl text-sm"
                  >
                    {t("Accept", "ஏற்கவும்")}
                  </button>
                  <button
                    onClick={() => setRequestState("none")}
                    className="flex-1 border border-red-500/40 text-red-400 py-2.5 rounded-xl text-sm"
                  >
                    {t("Reject", "நிராகரி")}
                  </button>
                </div>
              </div>
            )}

            {requestState === "active" && (
              <div className="bg-[#1c1f23] rounded-2xl p-4 border border-green-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-semibold text-sm">
                    {t("Active Ride", "செயலில் உள்ள பயணம்")}
                  </span>
                </div>
                <div className="space-y-1.5 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t("User", "பயனர்")}</span>
                    <span>Ravi Kumar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      {t("Service", "சேவை")}
                    </span>
                    <span>Tire Change</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t("Fare", "கட்டணம்")}</span>
                    <span className="text-orange-400 font-bold">₹150</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-bold py-2.5 rounded-xl text-sm mb-2"
                >
                  <Navigation size={14} />
                  {t("Navigate to User", "பயனரை நோக்கி செல்லவும்")}
                </button>
                <button
                  onClick={() => {
                    setRequestState("none");
                  }}
                  className="w-full border border-green-500/40 text-green-400 py-2.5 rounded-xl text-sm"
                >
                  {t("Mark Complete", "முடிந்தது என்று குறிக்கவும்")}
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-gray-400">{t("Today", "இன்று")}</p>
                <p className="text-2xl font-bold text-orange-400">₹480</p>
              </div>
              <div className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-gray-400">
                  {t("Rating", "மதிப்பீடு")}
                </p>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-orange-400 text-orange-400" />
                  <p className="text-2xl font-bold">4.8</p>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "earnings" && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg">{t("Earnings", "வருவாய்")}</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: t("Today", "இன்று"), val: "₹480" },
                { label: t("This Week", "இந்த வாரம்"), val: "₹3,240" },
                { label: t("Total", "மொத்தம்"), val: "₹28,500" },
              ].map((e) => (
                <div
                  key={e.label}
                  className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10 text-center"
                >
                  <TrendingUp
                    size={16}
                    className="text-orange-400 mx-auto mb-1"
                  />
                  <p className="font-bold text-orange-400 text-lg">{e.val}</p>
                  <p className="text-xs text-gray-400">{e.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10">
              <h3 className="font-semibold mb-3 text-sm">
                {t("Recent Rides", "சமீபத்திய பயணங்கள்")}
              </h3>
              {[
                { s: "Tire Change", fare: 150, date: "25 Mar" },
                { s: "Battery Jumpstart", fare: 280, date: "23 Mar" },
                { s: "Towing", fare: 95, date: "20 Mar" },
              ].map((r, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{r.s}</p>
                    <p className="text-xs text-gray-400">{r.date}</p>
                  </div>
                  <span className="text-orange-400 font-bold">₹{r.fare}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "profile" && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg">
              {t("Captain Profile", "கேப்டன் சுயவிவரம்")}
            </h2>
            <div className="bg-[#1c1f23] rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold text-2xl">
                  {user.name[0]}
                </div>
                <div>
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-sm text-gray-400">Bike Mechanic</p>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                    ✓ Approved
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="font-bold text-orange-400">47</p>
                  <p className="text-xs text-gray-400">
                    {t("Rides", "பயணங்கள்")}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="font-bold text-orange-400">4.8</p>
                  <p className="text-xs text-gray-400">
                    {t("Rating", "மதிப்பீடு")}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="font-bold text-orange-400">98%</p>
                  <p className="text-xs text-gray-400">{t("Accept", "ஏற்பு")}</p>
                </div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full border border-red-500/40 text-red-400 py-3 rounded-xl text-sm"
            >
              {t("Log Out", "வெளியேறு")}
            </button>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1c1f23] border-t border-white/10 flex">
        {(
          [
            ["home", "🏠", t("Home", "முகப்பு")],
            ["earnings", "💰", t("Earnings", "வருவாய்")],
            ["profile", "👤", t("Profile", "சுயவிவரம்")],
          ] as const
        ).map(([s, icon, label]) => (
          <button
            key={s}
            onClick={() => setTab(s)}
            className={`flex-1 flex flex-col items-center py-3 gap-0.5 ${
              tab === s ? "text-orange-400" : "text-gray-500"
            }`}
          >
            <span className="text-xl">{icon}</span>
            <span className="text-[10px]">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
