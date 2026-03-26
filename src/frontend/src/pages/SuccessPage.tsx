import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

export default function SuccessPage({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const id = setTimeout(onDone, 1500);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <div className="min-h-screen bg-[#0b0c0e] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">
        <CheckCircle size={72} className="text-green-400" strokeWidth={1.5} />
        <h2
          className="text-white font-black text-3xl"
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
        >
          Login Successful!
        </h2>
        <p className="text-gray-400 text-sm">Welcome to RoadFix 🚗</p>
      </div>
    </div>
  );
}
