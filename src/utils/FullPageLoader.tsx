// FullPageLoader.tsx

type FullPageLoaderProps = {
  open: boolean;            // show/hide overlay
  message?: string;         // optional text under spinner
  backdropOpacity?: number; // 0–100, default 50 -> bg-black/50
};

export default function FullPageLoader({
  open,
  message,
  backdropOpacity = 50,
}: FullPageLoaderProps) {
  if (!open) return null;

  // Build a Tailwind class like bg-black/50, bg-black/70, etc.
  const backdropClass = `bg-black/${backdropOpacity}`;

  return ( <div
      role="alert"
      aria-busy="true"
      aria-live="polite"
      className={`fixed inset-0 ${backdropClass} z-[9999] flex items-center justify-center`}
    >
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="h-12 w-12 rounded-full border-4 border-white/30 border-t-white animate-spin" />
        {message ? (
          <p className="mt-4 text-white/90 text-sm">{message}</p>
        ) : null}
      </div>
    </div>)
}
