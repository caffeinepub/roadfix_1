import { Navigation, Star, TrendingUp } from "lucide-react";
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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="bg-card border-b border-border px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-primary">
            <span className="text-primary-foreground font-display font-black text-sm">
              R
            </span>
          </div>
          <span className="font-display font-black text-lg">RoadFix</span>
          <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full font-bold ml-1">
            Captain
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ta" : "en")}
            className="text-primary text-xs font-bold"
          >
            {lang === "en" ? "தமிழ்" : "EN"}
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="text-xs text-muted-foreground hover:text-foreground"
            data-ocid="captain.logout.button"
          >
            {t("Logout", "வெளியேறு")}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto pb-20 p-4 space-y-4">
        {tab === "home" && (
          <>
            {/* Online Toggle — Rapido style large pill */}
            <div
              className={`rounded-3xl p-5 border-2 transition-all ${
                isOnline
                  ? "bg-success/10 border-success/40"
                  : "bg-card border-border"
              }`}
              data-ocid="captain.status.card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-black text-xl">
                    {isOnline
                      ? t("You are Online", "நீங்கள் ஆன்லைனில் இருக்கிறீர்கள்")
                      : t("You are Offline", "நீங்கள் ஆஃப்லைனில் இருக்கிறீர்கள்")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isOnline
                      ? t("Accepting ride requests", "பயண கோரிக்கைகளை ஏற்கிறோம்")
                      : t(
                          "Go online to start earning",
                          "சம்பாதிக்க ஆன்லைனில் செல்லவும்",
                        )}
                  </p>
                </div>
                {/* Large Rapido-style toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOnline(!isOnline);
                    if (!isOnline) setRequestState("none");
                  }}
                  className={`relative w-20 h-10 rounded-full transition-all duration-300 ${
                    isOnline
                      ? "bg-success"
                      : "bg-secondary border border-border"
                  }`}
                  data-ocid="captain.online.toggle"
                >
                  <div
                    className={`absolute top-1 w-8 h-8 rounded-full shadow-lg transition-all duration-300 ${
                      isOnline
                        ? "left-11 bg-white"
                        : "left-1 bg-muted-foreground/50"
                    }`}
                  />
                </button>
              </div>
              {isOnline && (
                <div className="flex items-center gap-1.5 mt-3">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-success text-xs font-bold">
                    {t(
                      "Live — receiving requests",
                      "நேரடி — கோரிக்கைகளை பெறுகிறோம்",
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Incoming Request */}
            {isOnline && requestState === "none" && (
              <div className="bg-card rounded-3xl p-4 border border-border text-center">
                <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-muted-foreground font-semibold">
                  {t(
                    "Waiting for requests...",
                    "கோரிக்கைகளுக்காக காத்திருக்கிறோம்...",
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setRequestState("incoming")}
                  className="mt-2 text-xs text-primary underline font-semibold"
                >
                  {t("Simulate Request (Demo)", "கோரிக்கை உருவகப்படுத்து")}
                </button>
              </div>
            )}

            {requestState === "incoming" && (
              <div
                className="bg-card rounded-3xl p-5 border-2 border-primary/60"
                data-ocid="captain.request.card"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-ping" />
                  <span className="text-primary font-display font-black">
                    {t("New Request!", "புதிய கோரிக்கை!")}
                  </span>
                </div>
                <div className="space-y-2 mb-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("User", "பயனர்")}
                    </span>
                    <span className="font-semibold">Ravi Kumar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("Service", "சேவை")}
                    </span>
                    <span className="font-semibold">Tire Change</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("Distance", "தூரம்")}
                    </span>
                    <span className="font-semibold">1.2 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("Fare", "கட்டணம்")}
                    </span>
                    <span className="text-primary font-display font-black text-lg">
                      ₹150
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setRequestState("active")}
                    className="flex-1 bg-success hover:bg-success/90 text-success-foreground font-display font-black py-3 rounded-full text-sm"
                    data-ocid="captain.request.confirm_button"
                  >
                    {t("Accept", "ஏற்கவும்")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestState("none")}
                    className="flex-1 border-2 border-destructive/40 text-destructive py-3 rounded-full text-sm font-bold"
                    data-ocid="captain.request.cancel_button"
                  >
                    {t("Reject", "நிராகரி")}
                  </button>
                </div>
              </div>
            )}

            {requestState === "active" && (
              <div
                className="bg-card rounded-3xl p-5 border-2 border-success/40"
                data-ocid="captain.active.card"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-success font-bold text-sm">
                    {t("Active Ride", "செயலில் உள்ள பயணம்")}
                  </span>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("User", "பயனர்")}
                    </span>
                    <span className="font-semibold">Ravi Kumar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("Service", "சேவை")}
                    </span>
                    <span className="font-semibold">Tire Change</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("Fare", "கட்டணம்")}
                    </span>
                    <span className="text-primary font-display font-black text-lg">
                      ₹150
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-display font-black py-3 rounded-full text-sm mb-2 shadow-primary"
                  data-ocid="captain.active.navigate.button"
                >
                  <Navigation size={14} />
                  {t("Navigate to User", "பயனரை நோக்கி செல்லவும்")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRequestState("none");
                  }}
                  className="w-full border-2 border-success/40 text-success py-3 rounded-full text-sm font-bold"
                  data-ocid="captain.active.complete.button"
                >
                  {t("Mark Complete", "முடிந்தது என்று குறிக்கவும்")}
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-3xl p-4 border border-border">
                <p className="text-xs text-muted-foreground font-semibold">
                  {t("Today", "இன்று")}
                </p>
                <p className="text-2xl font-display font-black text-primary">
                  ₹480
                </p>
              </div>
              <div className="bg-card rounded-3xl p-4 border border-border">
                <p className="text-xs text-muted-foreground font-semibold">
                  {t("Rating", "மதிப்பீடு")}
                </p>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-primary text-primary" />
                  <p className="text-2xl font-display font-black">4.8</p>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "earnings" && (
          <div className="space-y-4">
            <h2 className="font-display font-black text-xl">
              {t("Earnings", "வருவாய்")}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: t("Today", "இன்று"), val: "₹480" },
                { label: t("This Week", "இந்த வாரம்"), val: "₹3,240" },
                { label: t("Total", "மொத்தம்"), val: "₹28,500" },
              ].map((e) => (
                <div
                  key={e.label}
                  className="bg-card rounded-3xl p-4 border border-border text-center"
                >
                  <TrendingUp size={16} className="text-primary mx-auto mb-1" />
                  <p className="font-display font-black text-primary text-lg">
                    {e.val}
                  </p>
                  <p className="text-xs text-muted-foreground">{e.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-card rounded-3xl p-4 border border-border">
              <h3 className="font-display font-bold mb-3 text-sm">
                {t("Recent Rides", "சமீபத்திய பயணங்கள்")}
              </h3>
              {[
                { s: "Tire Change", fare: 150, date: "25 Mar" },
                { s: "Battery Jumpstart", fare: 280, date: "23 Mar" },
                { s: "Towing", fare: 95, date: "20 Mar" },
              ].map((r) => (
                <div
                  key={r.s}
                  className="flex justify-between items-center py-2.5 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-semibold">{r.s}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                  <span className="text-primary font-display font-black">
                    ₹{r.fare}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "profile" && (
          <div className="space-y-4">
            <h2 className="font-display font-black text-xl">
              {t("Captain Profile", "கேப்டன் சுயவிவரம்")}
            </h2>
            <div className="bg-card rounded-3xl p-5 border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center text-primary font-display font-black text-2xl">
                  {user.name[0]}
                </div>
                <div>
                  <p className="font-display font-black text-lg">{user.name}</p>
                  <p className="text-sm text-muted-foreground">Bike Mechanic</p>
                  <span className="text-xs bg-success/15 text-success px-2 py-0.5 rounded-full font-semibold">
                    ✓ Approved
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-secondary rounded-2xl p-3">
                  <p className="font-display font-black text-primary">47</p>
                  <p className="text-xs text-muted-foreground">
                    {t("Rides", "பயணங்கள்")}
                  </p>
                </div>
                <div className="bg-secondary rounded-2xl p-3">
                  <p className="font-display font-black text-primary">4.8</p>
                  <p className="text-xs text-muted-foreground">
                    {t("Rating", "மதிப்பீடு")}
                  </p>
                </div>
                <div className="bg-secondary rounded-2xl p-3">
                  <p className="font-display font-black text-primary">98%</p>
                  <p className="text-xs text-muted-foreground">
                    {t("Accept", "ஏற்பு")}
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="w-full border-2 border-destructive/40 text-destructive py-3 rounded-full text-sm font-bold"
              data-ocid="captain.profile.logout.button"
            >
              {t("Log Out", "வெளியேறு")}
            </button>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex">
        {(
          [
            ["home", "🏠", t("Home", "முகப்பு")],
            ["earnings", "💰", t("Earnings", "வருவாய்")],
            ["profile", "👤", t("Profile", "சுயவிவரம்")],
          ] as const
        ).map(([s, icon, label]) => (
          <button
            type="button"
            key={s}
            onClick={() => setTab(s)}
            className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors ${
              tab === s ? "text-primary" : "text-muted-foreground"
            }`}
            data-ocid={`captain.nav.${s}.link`}
          >
            <span className="text-xl">{icon}</span>
            <span className="text-[10px] font-semibold">{label}</span>
            {tab === s && <div className="w-1 h-1 bg-primary rounded-full" />}
          </button>
        ))}
      </nav>
    </div>
  );
}
