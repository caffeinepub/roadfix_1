import { Loader2, Wrench } from "lucide-react";
import { useState } from "react";
import type { Role } from "../App";

export default function LoginPage({
  onSendOtp,
  onDemoLogin,
}: {
  onSendOtp: (phone: string) => void;
  onDemoLogin: (role: Role) => void;
}) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = phone.replace(/\D/g, "").length === 10;

  const handleSubmit = () => {
    if (!isValid) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSendOtp(phone);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Yellow radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, oklch(0.89 0.195 98 / 12%) 0%, transparent 60%)",
        }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Hero section */}
        <div className="flex flex-col items-center mb-10 animate-slide-up">
          {/* Icon badge */}
          <div className="relative mb-5">
            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-[0_8px_32px_oklch(0.89_0.195_98/40%)]">
              <Wrench
                size={36}
                className="text-primary-foreground"
                strokeWidth={2.5}
              />
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-3xl border-2 border-primary/30 scale-110 animate-pulse" />
          </div>

          <h1 className="font-display font-black text-4xl text-foreground tracking-tight">
            RoadFix
          </h1>
          <p className="text-muted-foreground text-sm mt-2 text-center max-w-[240px] leading-snug">
            Instant Help for Your Vehicle,{" "}
            <span className="text-foreground/70">Anytime Anywhere</span>
          </p>
        </div>

        {/* Login card */}
        <div className="bg-card border border-white/8 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-slide-up-delay">
          <h2 className="font-display font-bold text-foreground text-xl mb-1">
            Enter your phone
          </h2>
          <p className="text-muted-foreground text-sm mb-5">
            We'll send a one-time password to verify
          </p>

          {/* Phone input row */}
          <div className="flex gap-2 mb-3">
            <div className="flex items-center bg-secondary border border-white/10 rounded-2xl px-3 text-foreground font-bold text-sm w-16 justify-center shrink-0 select-none">
              +91
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                if (error) setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter your phone number"
              className="flex-1 bg-secondary border border-white/10 rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground text-base focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
              data-ocid="login.input"
              maxLength={10}
              autoComplete="tel"
            />
          </div>

          {error && (
            <p
              className="text-destructive text-xs mb-3 flex items-center gap-1 animate-fade-in"
              data-ocid="login.error_state"
            >
              <span>⚠</span> {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !isValid}
            className="w-full bg-primary text-primary-foreground font-black text-base rounded-full py-4 mt-1 hover:opacity-90 active:scale-[0.98] transition-all duration-150 shadow-[0_4px_20px_oklch(0.89_0.195_98/30%)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
            data-ocid="login.submit_button"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending OTP…
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </div>

        {/* Demo quick login */}
        <div className="mt-4 bg-card border border-white/8 rounded-3xl p-4 animate-slide-up-delay-2">
          <p className="text-muted-foreground text-xs text-center mb-3 uppercase tracking-widest font-bold">
            ⚡ Demo Access
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => onDemoLogin("user")}
              className="bg-primary/10 border border-primary/25 rounded-2xl py-2.5 text-primary text-xs font-bold hover:bg-primary/20 transition-colors active:scale-95"
              data-ocid="login.demo_user.button"
            >
              👤 User
            </button>
            <button
              type="button"
              onClick={() => onDemoLogin("captain")}
              className="bg-blue-500/10 border border-blue-500/25 rounded-2xl py-2.5 text-blue-400 text-xs font-bold hover:bg-blue-500/20 transition-colors active:scale-95"
              data-ocid="login.demo_captain.button"
            >
              🔧 Captain
            </button>
            <button
              type="button"
              onClick={() => onDemoLogin("admin")}
              className="bg-purple-500/10 border border-purple-500/25 rounded-2xl py-2.5 text-purple-400 text-xs font-bold hover:bg-purple-500/20 transition-colors active:scale-95"
              data-ocid="login.demo_admin.button"
            >
              🛡 Admin
            </button>
          </div>
        </div>

        {/* Support footer */}
        <p className="text-center text-muted-foreground text-xs mt-6 animate-slide-up-delay-3">
          Need help? Contact support{" "}
          <a
            href="tel:7010019390"
            className="text-primary font-bold hover:underline"
          >
            7010019390
          </a>
        </p>
      </div>
    </div>
  );
}
