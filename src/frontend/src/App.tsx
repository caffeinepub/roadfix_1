import { useState } from "react";
import AdminPanel from "./pages/AdminPanel";
import CaptainDashboard from "./pages/CaptainDashboard";
import CaptainRegistration from "./pages/CaptainRegistration";
import LandingPage from "./pages/LandingPage";
import LocationPermPage from "./pages/LocationPermPage";
import LoginPage from "./pages/LoginPage";
import NotificationPrefPage from "./pages/NotificationPrefPage";
import OtpPage from "./pages/OtpPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import SuccessPage from "./pages/SuccessPage";
import UserDashboard from "./pages/UserDashboard";

export type Role = "guest" | "user" | "captain" | "admin";
export type Screen =
  | "home"
  | "bookings"
  | "chat"
  | "profile"
  | "captain-reg"
  | "admin";

export type AuthScreen =
  | "landing"
  | "login"
  | "otp"
  | "profile-setup"
  | "notif-pref"
  | "location-perm"
  | "success"
  | "captain-reg";

export interface AppUser {
  name: string;
  role: Role;
  email: string;
}

interface OnboardingData {
  phone: string;
  name: string;
  gender: string;
  notifPref: string;
  location: { lat: number; lng: number } | null;
}

export default function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [screen, setScreen] = useState<Screen>("home");
  const [authScreen, setAuthScreen] = useState<AuthScreen>("landing");
  const [lang, setLang] = useState<"en" | "ta">("en");
  const [onboarding, setOnboarding] = useState<OnboardingData>({
    phone: "",
    name: "",
    gender: "",
    notifPref: "",
    location: null,
  });

  const t = (en: string, ta: string) => (lang === "en" ? en : ta);

  const loginAs = (role: Role, nameOverride?: string) => {
    const demos: Record<Role, AppUser> = {
      guest: { name: "", role: "guest", email: "" },
      user: {
        name: nameOverride || "Ravi Kumar",
        role: "user",
        email: "ravi@example.com",
      },
      captain: {
        name: "Murugan S",
        role: "captain",
        email: "murugan@example.com",
      },
      admin: { name: "Admin", role: "admin", email: "admin@roadfix.com" },
    };
    setUser(demos[role]);
    setAuthScreen("landing");
    setScreen("home");
  };

  const logout = () => {
    setUser(null);
    setAuthScreen("landing");
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

  // Auth flow
  if (authScreen === "login")
    return (
      <LoginPage
        onSendOtp={(phone) => {
          setOnboarding((prev) => ({ ...prev, phone }));
          setAuthScreen("otp");
        }}
        onDemoLogin={loginAs}
      />
    );

  if (authScreen === "otp")
    return (
      <OtpPage
        phone={onboarding.phone}
        onVerified={() => setAuthScreen("profile-setup")}
        onBack={() => setAuthScreen("login")}
      />
    );

  if (authScreen === "profile-setup")
    return (
      <ProfileSetupPage
        onContinue={(name, gender) => {
          setOnboarding((prev) => ({ ...prev, name, gender }));
          setAuthScreen("notif-pref");
        }}
      />
    );

  if (authScreen === "notif-pref")
    return (
      <NotificationPrefPage
        onContinue={(notifPref) => {
          setOnboarding((prev) => ({ ...prev, notifPref }));
          setAuthScreen("location-perm");
        }}
      />
    );

  if (authScreen === "location-perm")
    return (
      <LocationPermPage
        onContinue={(location) => {
          setOnboarding((prev) => ({ ...prev, location }));
          setAuthScreen("success");
        }}
      />
    );

  if (authScreen === "success")
    return (
      <SuccessPage
        onDone={() => {
          loginAs("user", onboarding.name || "Ravi Kumar");
        }}
      />
    );

  if (authScreen === "captain-reg")
    return (
      <CaptainRegistration onBack={() => setAuthScreen("landing")} t={t} />
    );

  return (
    <div className="min-h-screen bg-[#0b0c0e]">
      <LandingPage
        onLogin={() => setAuthScreen("login")}
        t={t}
        lang={lang}
        setLang={setLang}
        loginAs={loginAs}
      />
    </div>
  );
}
