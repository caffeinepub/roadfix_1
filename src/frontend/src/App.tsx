import { useState } from "react";
import AuthModal from "./components/AuthModal";
import AdminPanel from "./pages/AdminPanel";
import CaptainDashboard from "./pages/CaptainDashboard";
import CaptainRegistration from "./pages/CaptainRegistration";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";

export type Role = "guest" | "user" | "captain" | "admin";
export type Screen =
  | "home"
  | "bookings"
  | "chat"
  | "profile"
  | "captain-reg"
  | "admin";

export interface AppUser {
  name: string;
  role: Role;
  email: string;
}

export default function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [screen, setScreen] = useState<Screen>("home");
  const [showAuth, setShowAuth] = useState(false);
  const [lang, setLang] = useState<"en" | "ta">("en");

  const t = (en: string, ta: string) => (lang === "en" ? en : ta);

  const loginAs = (role: Role) => {
    const demos: Record<Role, AppUser> = {
      guest: { name: "", role: "guest", email: "" },
      user: { name: "Ravi Kumar", role: "user", email: "ravi@example.com" },
      captain: {
        name: "Murugan S",
        role: "captain",
        email: "murugan@example.com",
      },
      admin: { name: "Admin", role: "admin", email: "admin@roadfix.com" },
    };
    setUser(demos[role]);
    setShowAuth(false);
    setScreen("home");
  };

  const logout = () => {
    setUser(null);
    setScreen("home");
  };

  if (user?.role === "admin")
    return (
      <AdminPanel
        user={user}
        onLogout={logout}
        t={t}
        lang={lang}
        setLang={setLang}
      />
    );
  if (user?.role === "captain")
    return (
      <CaptainDashboard
        user={user}
        onLogout={logout}
        t={t}
        lang={lang}
        setLang={setLang}
      />
    );
  if (user?.role === "user")
    return (
      <UserDashboard
        user={user}
        screen={screen}
        setScreen={setScreen}
        onLogout={logout}
        t={t}
        lang={lang}
        setLang={setLang}
      />
    );

  return (
    <div className="min-h-screen bg-[#0b0c0e]">
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={loginAs}
          onCaptainReg={() => {
            setShowAuth(false);
            setScreen("captain-reg");
          }}
          t={t}
        />
      )}
      {screen === "captain-reg" ? (
        <CaptainRegistration onBack={() => setScreen("home")} t={t} />
      ) : (
        <LandingPage
          onLogin={() => setShowAuth(true)}
          t={t}
          lang={lang}
          setLang={setLang}
          loginAs={loginAs}
        />
      )}
    </div>
  );
}
