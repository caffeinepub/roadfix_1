import {
  AlertTriangle,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { useState } from "react";
import type { AppUser, Screen } from "../App";
import LiveMap from "../components/LiveMap";

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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="bg-card border-b border-border px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-primary">
            <span className="text-primary-foreground font-display font-black text-sm">
              R
            </span>
          </div>
          <span className="font-display font-black text-lg">RoadFix</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ta" : "en")}
            className="text-primary text-xs font-bold"
          >
            {lang === "en" ? "தமிழ்" : "EN"}
          </button>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center text-primary font-display font-bold text-xs">
              {user.name[0]}
            </div>
            <span className="hidden md:block text-sm font-semibold">
              {user.name}
            </span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="text-xs text-muted-foreground hover:text-foreground"
            data-ocid="user.logout.button"
          >
            {t("Logout", "வெளியேறு")}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto pb-20">
        {screen === "home" && (
          <div className="relative">
            <LiveMap className="h-72" />

            <div className="p-4 space-y-4">
              {requestState === "idle" && (
                <div className="bg-card rounded-3xl p-5 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={14} className="text-primary" />
                    <span className="text-sm font-semibold">
                      {t("Current Location", "தற்போதைய இடம்")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["Tire Change", "Battery", "Towing", "Engine"].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSelectedService(s)}
                        className={`text-xs px-3 py-1.5 rounded-full border-2 transition-all font-semibold ${
                          selectedService === s
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-primary/60"
                        }`}
                        data-ocid="user.service.tab"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setRequestState("searching")}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display font-black py-4 rounded-full text-base shadow-primary transition-all"
                    data-ocid="user.request.primary_button"
                  >
                    {t("Request Help Now", "இப்போது உதவி கோரவும்")}
                  </button>
                </div>
              )}
              {requestState === "searching" && (
                <div
                  className="bg-card rounded-3xl p-5 border-2 border-primary/40 text-center"
                  data-ocid="user.searching.loading_state"
                >
                  <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="font-display font-bold">
                    {t(
                      "Finding nearby captains...",
                      "அருகிலுள்ள கேப்டன்களை தேடுகிறோம்...",
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t(
                      "Usually takes 30–60 seconds",
                      "பொதுவாக 30-60 வினாடிகள் ஆகும்",
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => setRequestState("accepted")}
                    className="mt-3 text-xs text-primary underline font-semibold"
                  >
                    {t("Simulate Accept (Demo)", "ஏற்பு உருவகப்படுத்து")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestState("idle")}
                    className="mt-2 w-full border border-border py-2.5 rounded-full text-sm text-muted-foreground font-semibold"
                    data-ocid="user.searching.cancel_button"
                  >
                    {t("Cancel", "ரத்து")}
                  </button>
                </div>
              )}
              {requestState === "accepted" && (
                <div
                  className="bg-card rounded-3xl p-5 border-2 border-success/40"
                  data-ocid="user.accepted.card"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-success text-sm font-bold">
                      {t("Captain on the way!", "கேப்டன் வழியில் உள்ளார்!")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center text-primary font-display font-black text-lg">
                      M
                    </div>
                    <div className="flex-1">
                      <p className="font-display font-bold">Murugan S</p>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-primary text-primary" />
                        <span className="text-xs text-muted-foreground">
                          4.8 · Bike Mechanic
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-display font-black">
                        4 min
                      </p>
                      <p className="text-xs text-muted-foreground">ETA</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 bg-secondary border border-border rounded-full py-2.5 text-sm hover:bg-secondary/80 font-semibold"
                      data-ocid="user.captain.call.button"
                    >
                      <Phone size={14} />
                      {t("Call", "அழைக்கவும்")}
                    </button>
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 bg-secondary border border-border rounded-full py-2.5 text-sm hover:bg-secondary/80 font-semibold"
                      data-ocid="user.captain.chat.button"
                    >
                      <MessageCircle size={14} />
                      {t("Chat", "சாட்")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRequestState("idle")}
                      className="flex-1 flex items-center justify-center gap-2 bg-destructive/10 border border-destructive/30 rounded-full py-2.5 text-sm text-destructive font-semibold"
                      data-ocid="user.captain.cancel_button"
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
          <div className="p-4 space-y-3" data-ocid="user.bookings.list">
            <h2 className="font-display font-black text-xl mb-4">
              {t("Booking History", "முன்பதிவு வரலாறு")}
            </h2>
            {BOOKINGS.map((b, idx) => (
              <div
                key={b.id}
                className="bg-card rounded-3xl p-4 border border-border"
                data-ocid={`user.bookings.item.${idx + 1}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-display font-bold">{b.service}</p>
                    <p className="text-xs text-muted-foreground">
                      {b.captain} · {b.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-black text-primary">
                      ₹{b.fare}
                    </p>
                    <span className="text-xs bg-success/15 text-success px-2 py-0.5 rounded-full font-semibold">
                      {b.status}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(b.rating)].map((_, idx2) => (
                    <Star
                      key={`${b.id}-star-${idx2}`}
                      size={12}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {screen === "chat" && (
          <div className="p-4">
            <h2 className="font-display font-black text-xl mb-4">
              {t("Messages", "செய்திகள்")}
            </h2>
            <div
              className="bg-card rounded-3xl p-4 border border-border text-center text-muted-foreground text-sm py-12"
              data-ocid="user.chat.empty_state"
            >
              {t(
                "No active chats. Start a request to chat with your captain.",
                "செயலில் உள்ள அரட்டைகள் இல்லை.",
              )}
            </div>
          </div>
        )}

        {screen === "profile" && (
          <div className="p-4">
            <h2 className="font-display font-black text-xl mb-4">
              {t("Profile", "சுயவிவரம்")}
            </h2>
            <div className="bg-card rounded-3xl p-5 border border-border mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center text-primary font-display font-black text-2xl">
                  {user.name[0]}
                </div>
                <div>
                  <p className="font-display font-black text-lg">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full font-semibold">
                    User
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-secondary rounded-2xl p-3">
                  <p className="font-display font-black text-primary">3</p>
                  <p className="text-xs text-muted-foreground">
                    {t("Rides", "பயணங்கள்")}
                  </p>
                </div>
                <div className="bg-secondary rounded-2xl p-3">
                  <p className="font-display font-black text-primary">₹525</p>
                  <p className="text-xs text-muted-foreground">
                    {t("Spent", "செலவு")}
                  </p>
                </div>
                <div className="bg-secondary rounded-2xl p-3">
                  <p className="font-display font-black text-primary">4.9</p>
                  <p className="text-xs text-muted-foreground">
                    {t("Rating", "மதிப்பீடு")}
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="w-full border-2 border-destructive/40 text-destructive py-3 rounded-full text-sm font-bold"
              data-ocid="user.profile.logout.button"
            >
              {t("Log Out", "வெளியேறு")}
            </button>
          </div>
        )}
      </div>

      {requestState !== "idle" && (
        <button
          type="button"
          className="fixed right-4 bottom-24 z-40 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          data-ocid="user.sos.button"
        >
          <AlertTriangle size={24} />
        </button>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex">
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
                screen === s ? "text-primary" : "text-muted-foreground"
              }`}
              data-ocid={`user.nav.${s}.link`}
            >
              <span className="text-xl">{icons[s]}</span>
              <span className="text-[10px] font-semibold">{labels[s]}</span>
              {screen === s && (
                <div className="w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
