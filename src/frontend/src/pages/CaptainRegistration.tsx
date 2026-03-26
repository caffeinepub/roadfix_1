import { Check, ChevronLeft, Upload } from "lucide-react";
import { useState } from "react";

export default function CaptainRegistration({
  onBack,
  t,
}: {
  onBack: () => void;
  t: (en: string, ta: string) => string;
}) {
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
        <div className="bg-card rounded-3xl p-8 max-w-sm w-full border-2 border-primary/30 text-center">
          <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-primary" />
          </div>
          <h2 className="text-xl font-display font-black mb-2">
            {t("Application Submitted!", "விண்ணப்பம் சமர்ப்பிக்கப்பட்டது!")}
          </h2>
          <p className="text-sm text-muted-foreground mb-2">
            {t(
              "Your documents are under review.",
              "உங்கள் ஆவணங்கள் மதிப்பாய்வு செய்யப்படுகின்றன.",
            )}
          </p>
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-3 mb-5">
            <p className="text-primary font-display font-bold text-sm">
              ⏳{" "}
              {t(
                "Status: Pending Admin Approval",
                "நிலை: நிர்வாக அனுமதி நிலுவையில் உள்ளது",
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t(
                "You will be notified within 24–48 hours.",
                "உங்களுக்கு 24-48 மணி நேரத்தில் தெரிவிக்கப்படும்.",
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="w-full bg-primary text-primary-foreground font-display font-black py-3.5 rounded-full text-sm shadow-primary"
            data-ocid="captain.reg.back.button"
          >
            {t("Back to Home", "முகப்புக்கு திரும்பு")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card border-b border-border px-4 h-14 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          data-ocid="captain.reg.back.button"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-display font-black">
          {t("Captain Registration", "கேப்டன் பதிவு")}
        </h1>
      </header>

      {/* Progress */}
      <div className="flex gap-2 p-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 h-1.5 rounded-full transition-all ${
              s <= step ? "bg-primary" : "bg-secondary"
            }`}
          />
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mb-4 font-semibold">
        {t(`Step ${step} of 3`, `படி ${step} / 3`)}
      </p>

      <div className="px-4 pb-8">
        {step === 1 && (
          <div className="space-y-3">
            <h2 className="font-display font-black text-xl mb-4">
              {t("Personal Info", "தனிப்பட்ட தகவல்")}
            </h2>
            <input
              placeholder={t("Full Name", "முழு பெயர்")}
              className="w-full bg-card border border-border rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              data-ocid="captain.reg.name.input"
            />
            <input
              placeholder={t("Phone Number", "தொலைபேசி எண்")}
              className="w-full bg-card border border-border rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              data-ocid="captain.reg.phone.input"
            />
            <input
              placeholder={t("Email Address", "மின்னஞ்சல் முகவரி")}
              className="w-full bg-card border border-border rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              data-ocid="captain.reg.email.input"
            />
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-primary text-primary-foreground font-display font-black py-4 rounded-full mt-2 shadow-primary"
              data-ocid="captain.reg.step1.submit_button"
            >
              {t("Continue", "தொடரவும்")}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <h2 className="font-display font-black text-xl mb-4">
              {t("Vehicle & Documents", "வாகனம் மற்றும் ஆவணங்கள்")}
            </h2>
            <p className="text-sm text-muted-foreground font-semibold">
              {t("Vehicle Type", "வாகன வகை")}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {["Bike", "Car", "Mechanic"].map((v) => (
                <button
                  type="button"
                  key={v}
                  onClick={() => setVehicleType(v)}
                  className={`py-2.5 rounded-full border-2 text-sm font-bold transition-all ${
                    vehicleType === v
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                  data-ocid="captain.reg.vehicle.tab"
                >
                  {v}
                </button>
              ))}
            </div>
            {[
              {
                label: t("Driving License", "ஓட்டுனர் உரிமம்"),
                key: "license",
              },
              {
                label: t("ID Proof (Aadhar/PAN)", "அடையாள சான்று"),
                key: "id",
              },
            ].map((doc) => (
              <div
                key={doc.key}
                className="border-2 border-dashed border-border rounded-2xl p-5 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/60 transition-colors"
                data-ocid={`captain.reg.${doc.key}.upload_button`}
              >
                <Upload size={24} className="text-primary" />
                <p className="text-sm font-semibold">{doc.label}</p>
                <p className="text-xs text-muted-foreground">
                  {t("Tap to upload", "அப்லோட் செய்ய தட்டவும்")}
                </p>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setStep(3)}
              className="w-full bg-primary text-primary-foreground font-display font-black py-4 rounded-full shadow-primary"
              data-ocid="captain.reg.step2.submit_button"
            >
              {t("Continue", "தொடரவும்")}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <h2 className="font-display font-black text-xl mb-4">
              {t("Selfie Verification", "செல்ஃபி சரிபார்ப்பு")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t(
                "Take a selfie to verify your identity matches your ID.",
                "உங்கள் அடையாள அட்டையுடன் உங்கள் முகம் பொருந்துகிறதா என்று சரிபார்க்க செல்ஃபி எடுக்கவும்.",
              )}
            </p>
            <div
              className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/60 transition-colors"
              data-ocid="captain.reg.selfie.upload_button"
            >
              <div className="w-20 h-20 bg-primary/15 rounded-full flex items-center justify-center">
                <span className="text-4xl">📷</span>
              </div>
              <p className="text-sm font-bold">
                {t("Take Selfie", "செல்ஃபி எடுக்கவும்")}
              </p>
              <p className="text-xs text-muted-foreground text-center">
                {t(
                  "Make sure your face is clearly visible",
                  "உங்கள் முகம் தெளிவாக தெரிய வேண்டும்",
                )}
              </p>
            </div>
            <div className="bg-primary/10 border border-primary/30 rounded-2xl p-3">
              <p className="text-primary text-xs font-bold">
                🔒{" "}
                {t(
                  "AI verification will match your selfie with your ID photo.",
                  "AI சரிபார்ப்பு உங்கள் செல்ஃபியை உங்கள் ஐடி புகைப்படத்துடன் பொருத்தும்.",
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="w-full bg-primary text-primary-foreground font-display font-black py-4 rounded-full shadow-primary"
              data-ocid="captain.reg.step3.submit_button"
            >
              {t("Submit Application", "விண்ணப்பத்தை சமர்ப்பிக்கவும்")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
