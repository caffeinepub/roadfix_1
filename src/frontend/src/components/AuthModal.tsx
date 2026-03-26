import { X } from "lucide-react";
import { useState } from "react";
import type { Role } from "../App";

export default function AuthModal({
  onClose,
  onLogin,
  onCaptainReg,
  t,
}: {
  onClose: () => void;
  onLogin: (role: Role) => void;
  onCaptainReg: () => void;
  t: (en: string, ta: string) => string;
}) {
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1c1f23] rounded-2xl w-full max-w-sm border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="font-bold text-lg">
            {t("Welcome to RoadFix", "RoadFix-க்கு வரவேற்கிறோம்")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex border-b border-white/10">
          {(["login", "signup"] as const).map((t2) => (
            <button
              key={t2}
              onClick={() => setTab(t2)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                tab === t2
                  ? "text-orange-400 border-b-2 border-orange-400"
                  : "text-gray-400"
              }`}
            >
              {t2 === "login" ? t("Log In", "உள்நுழை") : t("Sign Up", "பதிவு")}
            </button>
          ))}
        </div>
        <div className="p-5">
          {tab === "login" ? (
            <div className="space-y-3">
              <input
                placeholder={t("Email or Phone", "மின்னஞ்சல் அல்லது தொலைபேசி")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
              />
              <input
                type="password"
                placeholder={t("Password", "கடவுச்சொல்")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
              />
              <button
                onClick={() => onLogin("user")}
                className="w-full bg-orange-500 hover:bg-orange-400 text-black font-bold py-2.5 rounded-xl text-sm transition-all"
              >
                {t("Log In as User", "பயனராக உள்நுழை")}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                placeholder={t("Full Name", "முழு பெயர்")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
              />
              <input
                placeholder={t("Email", "மின்னஞ்சல்")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
              />
              <input
                placeholder={t("Phone Number", "தொலைபேசி எண்")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
              />
              <button
                onClick={() => onLogin("user")}
                className="w-full bg-orange-500 hover:bg-orange-400 text-black font-bold py-2.5 rounded-xl text-sm"
              >
                {t("Create Account", "கணக்கு உருவாக்கு")}
              </button>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-gray-400 text-center mb-3">
              Demo Quick Login
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(["user", "captain", "admin"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() =>
                    r === "captain" ? onCaptainReg() : onLogin(r)
                  }
                  className="text-xs py-2 rounded-lg bg-white/5 hover:bg-orange-500/20 border border-white/10 text-gray-300 capitalize font-medium"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
