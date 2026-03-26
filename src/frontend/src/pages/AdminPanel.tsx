import { Check, TrendingUp, Users, X } from "lucide-react";
import { useState } from "react";
import type { AppUser } from "../App";

type Captain = {
  id: number;
  name: string;
  vehicle: string;
  status: "approved" | "pending" | "rejected";
  rating: number;
  rides: number;
};

const INITIAL_CAPTAINS: Captain[] = [
  {
    id: 1,
    name: "Murugan S",
    vehicle: "Bike",
    status: "approved",
    rating: 4.8,
    rides: 47,
  },
  {
    id: 2,
    name: "Selvan K",
    vehicle: "Car",
    status: "pending",
    rating: 0,
    rides: 0,
  },
  {
    id: 3,
    name: "Deepak R",
    vehicle: "Mechanic",
    status: "rejected",
    rating: 0,
    rides: 0,
  },
];

const BOOKINGS = [
  {
    id: 1,
    user: "Ravi Kumar",
    captain: "Murugan S",
    service: "Tire Change",
    fare: 150,
    status: "Completed",
  },
  {
    id: 2,
    user: "Priya Sharma",
    captain: "Murugan S",
    service: "Battery Jumpstart",
    fare: 280,
    status: "Completed",
  },
  {
    id: 3,
    user: "Arjun Das",
    captain: "Murugan S",
    service: "Towing",
    fare: 95,
    status: "Completed",
  },
];

export default function AdminPanel({
  user: _user,
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
  const [tab, setTab] = useState<
    "dashboard" | "captains" | "users" | "bookings"
  >("dashboard");
  const [captains, setCaptains] = useState<Captain[]>(INITIAL_CAPTAINS);

  const approve = (id: number) =>
    setCaptains((cs) =>
      cs.map((c) => (c.id === id ? { ...c, status: "approved" } : c)),
    );
  const reject = (id: number) =>
    setCaptains((cs) =>
      cs.map((c) => (c.id === id ? { ...c, status: "rejected" } : c)),
    );

  const statusColor = (s: Captain["status"]) =>
    ({
      approved: "bg-green-500/20 text-green-400",
      pending: "bg-yellow-500/20 text-yellow-400",
      rejected: "bg-red-500/20 text-red-400",
    })[s];

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white flex flex-col">
      <header className="bg-[#1c1f23] border-b border-white/10 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xs">R</span>
          </div>
          <span className="font-bold">RoadFix</span>
          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full ml-1">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ta" : "en")}
            className="text-orange-400 text-xs"
          >
            {lang === "en" ? "தமிழ்" : "EN"}
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="text-xs text-gray-400"
          >
            {t("Logout", "வெளியேறு")}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto pb-20 p-4 space-y-4">
        {tab === "dashboard" && (
          <>
            <h2 className="font-bold text-lg">{t("Dashboard", "டாஷ்போர்டு")}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: <Users size={18} />,
                  label: t("Total Users", "மொத்த பயனர்கள்"),
                  val: "3",
                  color: "text-blue-400",
                },
                {
                  icon: <Users size={18} />,
                  label: t("Captains", "கேப்டன்கள்"),
                  val: "3",
                  color: "text-orange-400",
                },
                {
                  icon: <TrendingUp size={18} />,
                  label: t("Total Rides", "மொத்த பயணங்கள்"),
                  val: "47",
                  color: "text-green-400",
                },
                {
                  icon: <TrendingUp size={18} />,
                  label: t("Revenue", "வருவாய்"),
                  val: "₹28,500",
                  color: "text-purple-400",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10"
                >
                  <div className={`${s.color} mb-1`}>{s.icon}</div>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10">
              <h3 className="font-semibold text-sm mb-3">
                {t("Captain Status", "கேப்டன் நிலை")}
              </h3>
              <div className="space-y-2">
                {[
                  {
                    label: t("Approved", "அங்கீகரிக்கப்பட்டது"),
                    val: captains.filter((c) => c.status === "approved").length,
                    color: "bg-green-400",
                  },
                  {
                    label: t("Pending", "நிலுவையில்"),
                    val: captains.filter((c) => c.status === "pending").length,
                    color: "bg-yellow-400",
                  },
                  {
                    label: t("Rejected", "நிராகரிக்கப்பட்டது"),
                    val: captains.filter((c) => c.status === "rejected").length,
                    color: "bg-red-400",
                  },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${r.color}`} />
                    <span className="text-sm text-gray-300 flex-1">
                      {r.label}
                    </span>
                    <span className="font-bold">{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "captains" && (
          <>
            <h2 className="font-bold text-lg">{t("Captains", "கேப்டன்கள்")}</h2>
            {captains.map((c) => (
              <div
                key={c.id}
                className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold">
                    {c.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-gray-400">
                      {c.vehicle} · {c.rides} {t("rides", "பயணங்கள்")}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(c.status)}`}
                  >
                    {t(
                      c.status.charAt(0).toUpperCase() + c.status.slice(1),
                      c.status === "approved"
                        ? "அங்கீகரிக்கப்பட்டது"
                        : c.status === "pending"
                          ? "நிலுவையில்"
                          : "நிராகரிக்கப்பட்டது",
                    )}
                  </span>
                </div>
                {c.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => approve(c.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-green-500/20 text-green-400 border border-green-500/30 py-2 rounded-xl text-sm hover:bg-green-500/30"
                    >
                      <Check size={14} />
                      {t("Approve", "அங்கீகரி")}
                    </button>
                    <button
                      type="button"
                      onClick={() => reject(c.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-red-500/10 text-red-400 border border-red-500/30 py-2 rounded-xl text-sm hover:bg-red-500/20"
                    >
                      <X size={14} />
                      {t("Reject", "நிராகரி")}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {tab === "users" && (
          <>
            <h2 className="font-bold text-lg">{t("Users", "பயனர்கள்")}</h2>
            {["Ravi Kumar", "Priya Sharma", "Arjun Das"].map((name, i) => (
              <div
                key={name}
                className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">
                  {name[0]}
                </div>
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-gray-400">
                    user{i + 1}@example.com · {i + 1} {t("rides", "பயணங்கள்")}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "bookings" && (
          <>
            <h2 className="font-bold text-lg">
              {t("All Bookings", "அனைத்து முன்பதிவுகள்")}
            </h2>
            {BOOKINGS.map((b) => (
              <div
                key={b.id}
                className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{b.service}</p>
                    <p className="text-xs text-gray-400">
                      {b.user} → {b.captain}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-400">₹{b.fare}</p>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                      {b.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1c1f23] border-t border-white/10 flex">
        {(
          [
            ["dashboard", "📊", t("Dashboard", "டாஷ்")],
            ["captains", "👷", t("Captains", "கேப்டன்")],
            ["users", "👥", t("Users", "பயனர்")],
            ["bookings", "📋", t("Bookings", "பதிவுகள்")],
          ] as const
        ).map(([s, icon, label]) => (
          <button
            type="button"
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
