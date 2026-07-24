import { use3DEnabled, toggle3D } from "@/hooks/use3D";

/**
 * Small, unobtrusive control that lets any visitor turn the site-wide 3D
 * backdrop off (or back on) instantly. Preference persists across pages and
 * sessions via the use3D store.
 */
export default function Scene3DToggle() {
  const enabled = use3DEnabled();

  return (
    <button
      type="button"
      onClick={() => toggle3D()}
      aria-pressed={enabled}
      title={enabled ? "Turn 3D background off" : "Turn 3D background on"}
      className="fixed bottom-5 left-5 z-[60] flex items-center gap-2 rounded-full border border-amber-400/25 bg-black/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-200/80 backdrop-blur-md transition-colors hover:border-amber-400/60 hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
    >
      <span
        aria-hidden="true"
        className={`inline-block h-2 w-2 rounded-full transition-colors ${
          enabled ? "bg-amber-400 shadow-[0_0_8px_2px_rgba(212,160,23,0.6)]" : "bg-white/25"
        }`}
      />
      3D {enabled ? "On" : "Off"}
    </button>
  );
}
