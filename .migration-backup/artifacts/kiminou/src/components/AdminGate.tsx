import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const SESSION_KEY = "kiminou_admin_key";

export function getAdminKey(): string {
  return sessionStorage.getItem(SESSION_KEY) ?? "";
}

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = useState(() => sessionStorage.getItem(SESSION_KEY) ?? "");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (stored) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sessionStorage.setItem(SESSION_KEY, input.trim());
    setStored(input.trim());
    setError(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <Lock className="w-5 h-5 text-amber-400/60" />
          <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 font-medium">Admin Access</p>
        </div>
        <h1 className="font-serif text-4xl font-light text-white mb-8">Blog Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            placeholder="Enter admin key"
            autoFocus
            className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-amber-400/40 transition-colors duration-300"
            data-testid="input-admin-key"
          />
          {error && (
            <p className="text-xs text-red-400/80">Incorrect key. Check your ADMIN_SECRET environment variable.</p>
          )}
          <button
            type="submit"
            className="w-full py-3 border border-amber-400/30 text-amber-400/80 text-xs uppercase tracking-[0.2em] hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-300"
            data-testid="button-admin-login"
          >
            Unlock
          </button>
        </form>
      </motion.div>
    </div>
  );
}
