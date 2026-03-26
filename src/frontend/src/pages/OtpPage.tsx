import { ChevronLeft, Loader2, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const OTP_KEYS = ["d0", "d1", "d2", "d3", "d4", "d5"];

export default function OtpPage({
  phone,
  onVerified,
  onBack,
}: {
  phone: string;
  onVerified: () => void;
  onBack: () => void;
}) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleChange = (idx: number, val: string) => {
    const d = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = d;
    setDigits(next);
    if (error) setError("");
    if (d && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      const next = [...digits];
      next[idx - 1] = "";
      setDigits(next);
      inputs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const next = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setDigits(next);
    const focusIdx = Math.min(pasted.length, 5);
    inputs.current[focusIdx]?.focus();
  };

  const allFilled = digits.every((d) => d !== "");

  const handleVerify = () => {
    if (!allFilled) {
      setError("Please enter all 6 digits");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerified();
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
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-muted-foreground mb-8 hover:text-foreground transition-colors group animate-fade-in"
          data-ocid="otp.back.button"
        >
          <ChevronLeft
            size={18}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-10 animate-slide-up">
          <div className="relative mb-5">
            <div className="w-20 h-20 bg-primary/15 border-2 border-primary/40 rounded-3xl flex items-center justify-center">
              <Smartphone size={34} className="text-primary" strokeWidth={2} />
            </div>
          </div>

          <h2 className="font-display font-black text-3xl text-foreground tracking-tight">
            Verify OTP
          </h2>
          <p className="text-muted-foreground text-sm mt-2 text-center">
            Code sent to{" "}
            <span className="text-foreground font-semibold">+91 {phone}</span>
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            (Demo: any 6-digit code works)
          </p>
        </div>

        {/* OTP boxes */}
        <div
          className="flex gap-2.5 justify-center mb-6 animate-slide-up-delay"
          onPaste={handlePaste}
        >
          {digits.map((d, i) => (
            <input
              key={OTP_KEYS[i]}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="tel"
              inputMode="numeric"
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              maxLength={1}
              className="w-12 h-14 bg-secondary border-2 border-white/10 rounded-2xl text-foreground text-center text-xl font-black focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-primary/5 transition-all caret-transparent"
              data-ocid={`otp.digit.input.${i + 1}`}
            />
          ))}
        </div>

        {error && (
          <p
            className="text-destructive text-xs text-center mb-3 flex items-center justify-center gap-1 animate-fade-in"
            data-ocid="otp.error_state"
          >
            <span>⚠</span> {error}
          </p>
        )}

        {/* Verify button */}
        <div className="animate-slide-up-delay-2">
          <button
            type="button"
            onClick={handleVerify}
            disabled={!allFilled || loading}
            className="w-full bg-primary text-primary-foreground font-black text-base rounded-full py-4 hover:opacity-90 active:scale-[0.98] transition-all duration-150 shadow-[0_4px_20px_oklch(0.89_0.195_98/30%)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
            data-ocid="otp.verify.submit_button"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Verifying…
              </>
            ) : (
              "Verify OTP"
            )}
          </button>

          {/* Resend timer */}
          <div className="text-center mt-5">
            {timer > 0 ? (
              <p className="text-muted-foreground text-sm">
                Resend OTP in{" "}
                <span className="text-primary font-bold tabular-nums">
                  {timer}s
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setTimer(30)}
                className="text-primary font-bold text-sm hover:underline active:opacity-70 transition-opacity"
                data-ocid="otp.resend.button"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>

        {/* Support footer */}
        <p className="text-center text-muted-foreground text-xs mt-8 animate-slide-up-delay-3">
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
