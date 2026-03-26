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
      <div className="min-h-screen bg-[#0b0c0e] text-white flex flex-col items-center justify-center p-6">
        <div className="bg-[#1c1f23] rounded-2xl p-8 max-w-sm w-full border border-orange-500/30 text-center">
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-orange-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">
            {t("Application Submitted!", "விண்ணப்பம் சமர்ப்பிக்கப்பட்டது!")}
          </h2>
          <p className="text-sm text-gray-400 mb-2">
            {t(
              "Your documents are under review.",
              "உங்கள் ஆவணங்கள் மதிப்பாய்வு செய்யப்படுகின்றன.",
            )}
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-5">
            <p className="text-yellow-400 font-semibold text-sm">
              ⏳{" "}
              {t(
                "Status: Pending Admin Approval",
                "நிலை: நிர்வாக அனுமதி நிலுவையில் உள்ளது",
              )}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {t(
                "You will be notified within 24–48 hours.",
                "உங்களுக்கு 24-48 மணி நேரத்தில் தெரிவிக்கப்படும்.",
              )}
            </p>
          </div>
          <button
            onClick={onBack}
            className="w-full bg-orange-500 text-black font-bold py-3 rounded-xl text-sm"
          >
            {t("Back to Home", "முகப்புக்கு திரும்பு")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white">
      <header className="bg-[#1c1f23] border-b border-white/10 px-4 h-14 flex items-center gap-3">
        <button type="button" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold">
          {t("Captain Registration", "கேப்டன் பதிவு")}
        </h1>
      </header>

      {/* Progress */}
      <div className="flex gap-2 p-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 h-1.5 rounded-full ${
              s <= step ? "bg-orange-500" : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p className="text-center text-xs text-gray-400 mb-4">
        {t(`Step ${step} of 3`, `படி ${step} / 3`)}
      </p>

      <div className="px-4 pb-8">
        {step === 1 && (
          <div className="space-y-3">
            <h2 className="font-bold text-lg mb-4">
              {t("Personal Info", "தனிப்பட்ட தகவல்")}
            </h2>
            <input
              placeholder={t("Full Name", "முழு பெயர்")}
              className="w-full bg-[#1c1f23] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
            />
            <input
              placeholder={t("Phone Number", "தொலைபேசி எண்")}
              className="w-full bg-[#1c1f23] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
            />
            <input
              placeholder={t("Email Address", "மின்னஞ்சல் முகவரி")}
              className="w-full bg-[#1c1f23] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg mb-4">
              {t("Vehicle & Documents", "வாகனம் & ஆவணங்கள்")}
            </h2>
            <div>
              <p className="text-sm text-gray-400 mb-2">
                {t("Vehicle Type", "வாகன வகை")}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {["Bike", "Car", "Mechanic"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setVehicleType(v)}
                    className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                      vehicleType === v
                        ? "bg-orange-500 border-orange-500 text-black"
                        : "bg-[#1c1f23] border-white/10 text-gray-300"
                    }`}
                  >
                    {v === "Bike" ? "🏍️" : v === "Car" ? "🚗" : "🔧"} {v}
                  </button>
                ))}
              </div>
            </div>
            {[
              t("Driving License", "ஓட்டுனர் உரிமம்"),
              t("ID Proof (Aadhar/PAN)", "அடையாள சான்று"),
              t("Selfie Photo", "செல்ஃபி புகைப்படம்"),
            ].map((doc) => (
              <div
                key={doc}
                className="bg-[#1c1f23] border-2 border-dashed border-white/10 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-orange-400/50 transition-colors"
              >
                <Upload size={18} className="text-orange-400" />
                <div>
                  <p className="text-sm font-medium">{doc}</p>
                  <p className="text-xs text-gray-400">
                    {t("Tap to upload", "பதிவேற்ற தட்டவும்")} (JPG, PDF)
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg mb-4">
              {t("Review & Submit", "மதிப்பாய்வு & சமர்ப்பி")}
            </h2>
            <div className="bg-[#1c1f23] rounded-2xl p-4 border border-white/10 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">
                  {t("Vehicle Type", "வாகன வகை")}
                </span>
                <span>{vehicleType || "Bike"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">
                  {t("Documents", "ஆவணங்கள்")}
                </span>
                <span className="text-green-400">
                  3 {t("uploaded", "பதிவேற்றப்பட்டது")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">
                  {t("Status after submit", "சமர்ப்பித்த பிறகு நிலை")}
                </span>
                <span className="text-yellow-400">Pending</span>
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-xs text-blue-300">
              {t(
                "All captains must be approved by admin before going online. This protects users from unverified helpers.",
                "அனைத்து கேப்டன்களும் ஆன்லைனில் செல்வதற்கு முன் நிர்வாகியால் அனுமதிக்கப்பட வேண்டும்.",
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 border border-white/20 py-3 rounded-xl text-sm"
            >
              {t("Back", "பின்")}
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 bg-orange-500 hover:bg-orange-400 text-black font-bold py-3 rounded-xl text-sm"
            >
              {t("Next", "அடுத்து")}
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="flex-1 bg-orange-500 hover:bg-orange-400 text-black font-bold py-3 rounded-xl text-sm"
            >
              {t("Submit Application", "விண்ணப்பம் சமர்ப்பி")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
