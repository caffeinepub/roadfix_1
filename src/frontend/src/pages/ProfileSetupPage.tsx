import { useState } from "react";

export default function ProfileSetupPage({
  onContinue,
}: {
  onContinue: (name: string, gender: string) => void;
}) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!name.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!gender) {
      setError("Please select your gender");
      return;
    }
    setError("");
    onContinue(name.trim(), gender);
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="text-3xl mb-3">👤</div>
          <h2
            className="text-white font-black text-2xl"
            style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          >
            Profile Setup
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Tell us a bit about yourself
          </p>
        </div>

        <div className="bg-[#141518] rounded-3xl p-6 border border-white/10 space-y-5">
          <div>
            <p className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">
              Full Name
            </p>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ravi Kumar"
              className="w-full bg-[#1e2025] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 text-base focus:outline-none focus:border-[#FACC15]/50 transition-colors"
              data-ocid="profile.name.input"
            />
          </div>

          <div>
            <p className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">
              Gender
            </p>
            <div className="flex gap-2">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2.5 rounded-full border-2 font-bold text-sm transition-all ${
                    gender === g
                      ? "bg-[#FACC15] border-[#FACC15] text-black"
                      : "border-white/10 text-gray-400 hover:border-white/30"
                  }`}
                  data-ocid={`profile.gender.${g.toLowerCase()}.button`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs" data-ocid="profile.error_state">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleContinue}
            className="w-full bg-[#FACC15] text-black font-black text-base rounded-full py-3.5 hover:bg-yellow-300 transition-colors"
            data-ocid="profile.continue.button"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
