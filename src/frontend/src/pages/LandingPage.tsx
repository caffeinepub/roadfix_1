import { MapPin, Menu, Phone, Shield, Star, X, Zap } from "lucide-react";
import { useState } from "react";
import type { Role } from "../App";

const CAPTAIN_MARKERS = [
  { id: 1, name: "Murugan S", eta: "4 min", top: "28%", left: "22%" },
  { id: 2, name: "Karthik R", eta: "7 min", top: "42%", left: "58%" },
  { id: 3, name: "Vijay P", eta: "11 min", top: "60%", left: "35%" },
  { id: 4, name: "Senthil M", eta: "9 min", top: "35%", left: "72%" },
];

const SERVICE_TYPES = [
  "Tire Change",
  "Battery Jumpstart",
  "Towing",
  "Engine Issue",
  "Fuel Delivery",
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    text: "Got stranded at 11pm, a captain arrived in 6 minutes. Lifesaver!",
    rating: 5,
  },
  {
    name: "Arjun Das",
    text: "Professional service, fair pricing. Best breakdown app in Chennai.",
    rating: 5,
  },
  {
    name: "Meena R",
    text: "The live tracking gave me peace of mind. Highly recommended.",
    rating: 5,
  },
];

export default function LandingPage({
  onLogin,
  t,
  lang,
  setLang,
  loginAs,
}: {
  onLogin: () => void;
  t: (en: string, ta: string) => string;
  lang: string;
  setLang: (l: "en" | "ta") => void;
  loginAs: (role: Role) => void;
}) {
  const [selectedService, setSelectedService] = useState("Tire Change");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0b0c0e]/90 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-xl">RoadFix</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <a href="#how" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#why" className="hover:text-white transition-colors">
              Why RoadFix
            </a>
            <a href="#reviews" className="hover:text-white transition-colors">
              Reviews
            </a>
            <button
              onClick={() => setLang(lang === "en" ? "ta" : "en")}
              className="text-orange-400 font-medium"
            >
              {lang === "en" ? "தமிழ்" : "EN"}
            </button>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onLogin}
              className="border border-orange-500 text-orange-400 px-4 py-1.5 rounded-full text-sm hover:bg-orange-500 hover:text-black transition-all"
            >
              {t("Log In / Sign Up", "உள்நுழை / பதிவு")}
            </button>
          </div>
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#141518] border-t border-white/10 p-4 flex flex-col gap-3 text-sm">
            <button
              onClick={onLogin}
              className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold"
            >
              {t("Log In / Sign Up", "உள்நுழை / பதிவு")}
            </button>
            <button
              onClick={() => setLang(lang === "en" ? "ta" : "en")}
              className="text-orange-400"
            >
              {lang === "en" ? "தமிழ்" : "EN"}
            </button>
          </div>
        )}
      </header>

      {/* Hero - Map Section */}
      <section className="relative h-[92vh] min-h-[600px] overflow-hidden">
        {/* Fake Map Background */}
        <div className="absolute inset-0 bg-[#1a1d23]">
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
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
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* Road lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="40%"
              x2="100%"
              y2="38%"
              stroke="#4a5568"
              strokeWidth="8"
            />
            <line
              x1="30%"
              y1="0"
              x2="32%"
              y2="100%"
              stroke="#4a5568"
              strokeWidth="8"
            />
            <line
              x1="65%"
              y1="0"
              x2="63%"
              y2="100%"
              stroke="#4a5568"
              strokeWidth="6"
            />
            <line
              x1="0"
              y1="70%"
              x2="100%"
              y2="68%"
              stroke="#4a5568"
              strokeWidth="6"
            />
          </svg>
        </div>

        {/* Captain Markers */}
        {CAPTAIN_MARKERS.map((m) => (
          <div
            key={m.id}
            className="absolute z-10 flex items-center gap-1.5 bg-[#1c1f23]/90 border border-white/20 rounded-full px-3 py-1.5 shadow-lg text-xs"
            style={{ top: m.top, left: m.left }}
          >
            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin size={10} className="text-black" />
            </div>
            <div>
              <div className="text-white font-medium">{m.name}</div>
              <div className="text-orange-400">{m.eta} away</div>
            </div>
          </div>
        ))}

        {/* Right Stats Panel */}
        <div className="absolute top-6 right-4 z-20 hidden md:flex flex-col gap-3 w-52">
          <div className="bg-[#1c1f23]/90 backdrop-blur border border-white/10 rounded-xl p-3">
            <div className="text-xs text-gray-400">Nearby Captains</div>
            <div className="text-2xl font-bold text-orange-400">8 Online</div>
          </div>
          <div className="bg-[#1c1f23]/90 backdrop-blur border border-white/10 rounded-xl p-3">
            <div className="text-xs text-gray-400">Est. Arrival</div>
            <div className="text-2xl font-bold text-white">5–10 min</div>
          </div>
          <div className="bg-[#1c1f23]/90 backdrop-blur border border-white/10 rounded-xl p-4">
            <div className="text-xs text-gray-400 mb-2">Recent Activity</div>
            {[
              "Arjun rescued in 7min",
              "Priya - battery fixed",
              "Raj - tire changed",
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-xs text-gray-300">{a}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Request Card */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
          <div className="bg-[#1c1f23]/95 backdrop-blur border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h1 className="text-xl font-bold text-white mb-1">
              {t("Need Breakdown Assistance?", "வாகன கோளாறு உதவி வேண்டுமா?")}
            </h1>
            <p className="text-xs text-gray-400 mb-4">
              {t(
                "Instant Help for Your Vehicle, Anytime Anywhere",
                "எப்போதும் எங்கும் உடனடி உதவி",
              )}
            </p>
            <div className="flex items-center gap-2 bg-[#262a31] rounded-lg px-3 py-2.5 mb-4 border border-white/10">
              <MapPin size={16} className="text-orange-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">
                {t("Current Location detected", "தற்போதைய இடம் கண்டறியப்பட்டது")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {SERVICE_TYPES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedService(s)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    selectedService === s
                      ? "bg-orange-500 border-orange-500 text-black font-semibold"
                      : "border-white/20 text-gray-300 hover:border-orange-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              onClick={onLogin}
              className="w-full bg-orange-500 hover:bg-orange-400 text-black font-bold py-3 rounded-xl transition-all text-sm"
            >
              {t("Request Help Now", "இப்போது உதவி கோரவும்")}
            </button>
            {/* Demo login shortcuts */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-2 text-center">
                Demo Quick Login
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {(["user", "captain", "admin"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => loginAs(r)}
                    className="text-xs py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 capitalize"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tab Bar Mock */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-[#1c1f23]/90 backdrop-blur border border-white/10 rounded-full px-6 py-3 flex items-center gap-6">
            {[
              { icon: "🏠", label: "Home", active: true },
              { icon: "📋", label: "Bookings" },
              { icon: "💬", label: "Chat" },
              { icon: "👤", label: "Profile" },
            ].map((tab) => (
              <div
                key={tab.label}
                className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                  tab.active ? "text-orange-400" : "text-gray-500"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-[10px]">{tab.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-[#0f1012]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("How RoadFix Works", "RoadFix எவ்வாறு செயல்படுகிறது")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <MapPin size={28} />,
                title: t("Request Help", "உதவி கோரவும்"),
                desc: t(
                  "Tap Request Help, share your location and issue type.",
                  "உதவி கோரவும் என்பதை தட்டி உங்கள் இடம் மற்றும் பிரச்சனை தெரிவிக்கவும்.",
                ),
              },
              {
                icon: <Zap size={28} />,
                title: t("Captain Arrives", "கேப்டன் வருகிறார்"),
                desc: t(
                  "Nearest verified captain accepts and navigates to you in minutes.",
                  "அருகிலுள்ள சரிபார்க்கப்பட்ட கேப்டன் சில நிமிடங்களில் வருவார்.",
                ),
              },
              {
                icon: <Shield size={28} />,
                title: t("Problem Solved", "பிரச்சனை தீர்ந்தது"),
                desc: t(
                  "Service completed, pay securely, and rate your experience.",
                  "சேவை முடிந்தது, பாதுகாப்பாக பணம் செலுத்தி உங்கள் அனுபவத்தை மதிப்பிடவும்.",
                ),
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-[#1c1f23] rounded-2xl p-6 border border-white/10"
              >
                <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <div className="text-xs text-orange-400 font-semibold mb-1">
                  STEP {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section id="why" className="py-20 bg-[#0b0c0e]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("Why Choose RoadFix?", "RoadFix ஏன் தேர்ந்தெடுக்க வேண்டும்?")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: t("Fastest Response", "விரைவான பதில்"),
                desc: t(
                  "Average 6-minute arrival time across all cities.",
                  "அனைத்து நகரங்களிலும் சராசரி 6 நிமிட வருகை நேரம்.",
                ),
              },
              {
                icon: "✅",
                title: t("Verified Captains", "சரிபார்க்கப்பட்ட கேப்டன்கள்"),
                desc: t(
                  "All captains are document-verified and admin approved.",
                  "அனைத்து கேப்டன்களும் ஆவண சரிபார்ப்பு மற்றும் நிர்வாக அனுமதி பெற்றவர்கள்.",
                ),
              },
              {
                icon: "💰",
                title: t("Transparent Pricing", "வெளிப்படையான விலை நிர்ணயம்"),
                desc: t(
                  "Upfront fare. No hidden charges. Cash or online payment.",
                  "முன்கூட்டியே கட்டணம். மறைமுக கட்டணம் இல்லை.",
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 bg-[#1c1f23] rounded-2xl border border-white/10"
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 bg-[#0f1012]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("What Users Say", "பயனர்கள் கூறுவது")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t2, i) => (
              <div
                key={i}
                className="bg-[#1c1f23] rounded-2xl p-6 border border-white/10"
              >
                <div className="flex mb-3">
                  {Array.from({ length: t2.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="fill-orange-400 text-orange-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-300 mb-4 italic">
                  &ldquo;{t2.text}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold text-sm">
                    {t2.name[0]}
                  </div>
                  <span className="text-sm font-medium">{t2.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b0c0e] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-xs">R</span>
                </div>
                <span className="font-bold">RoadFix</span>
              </div>
              <p className="text-xs text-gray-500">
                {t(
                  "Instant Help for Your Vehicle, Anytime Anywhere",
                  "எப்போதும் எங்கும் உடனடி உதவி",
                )}
              </p>
            </div>
            {[
              ["Quick Links", ["Home", "How It Works", "Pricing", "Support"]],
              ["Services", ["Tire Change", "Towing", "Battery", "Engine"]],
              ["Legal", ["Privacy Policy", "Terms", "Refund Policy"]],
            ].map(([heading, links]) => (
              <div key={heading as string}>
                <h4 className="font-semibold text-sm mb-3">
                  {heading as string}
                </h4>
                {(links as string[]).map((l) => (
                  <div
                    key={l}
                    className="text-xs text-gray-500 mb-1.5 cursor-pointer hover:text-gray-300"
                  >
                    {l}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">
              © 2026 RoadFix. All rights reserved.
            </p>
            <div className="flex gap-3">
              <Phone size={16} className="text-gray-500" />
              <span className="text-xs text-gray-500">+91 98765 43210</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
