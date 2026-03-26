import { useState } from "react";

export default function NotificationPrefPage({
  onContinue,
}: {
  onContinue: (pref: string) => void;
}) {
  const [selected, setSelected] = useState("");

  const options = [
    { id: "sms", label: "SMS", emoji: "💬", desc: "Normal text message" },
    {
      id: "whatsapp",
      label: "WhatsApp",
      emoji: "📲",
      desc: "WhatsApp notifications",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c0e] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="text-3xl mb-3">🔔</div>
          <h2
            className="text-white font-black text-2xl"
            style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          >
            How do you want updates?
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Choose your notification preference
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelected(opt.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                selected === opt.id
                  ? "bg-[#FACC15]/10 border-[#FACC15] text-white"
                  : "bg-[#141518] border-white/10 text-gray-300 hover:border-white/20"
              }`}
              data-ocid={`notif.${opt.id}.button`}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <div>
                <p
                  className={`font-bold ${selected === opt.id ? "text-[#FACC15]" : "text-white"}`}
                >
                  {opt.label}
                </p>
                <p className="text-gray-500 text-xs">{opt.desc}</p>
              </div>
              {selected === opt.id && (
                <div className="ml-auto w-5 h-5 bg-[#FACC15] rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-bold">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => selected && onContinue(selected)}
          disabled={!selected}
          className={`w-full font-black text-base rounded-full py-3.5 transition-colors ${
            selected
              ? "bg-[#FACC15] text-black hover:bg-yellow-300"
              : "bg-[#FACC15]/30 text-black/40 cursor-not-allowed"
          }`}
          data-ocid="notif.continue.button"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
