import { useEffect } from "react";
import type { Swatch } from "../data/swatches";

interface Props {
  swatch: Swatch;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function SwatchDetail({ swatch, onClose, onNavigate, hasPrev, hasNext }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate("prev");
      if (e.key === "ArrowRight" && hasNext) onNavigate("next");
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onNavigate, hasPrev, hasNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-[calc(100%-2rem)] max-h-[calc(100vh-2rem)] overflow-y-auto animate-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-text-muted hover:text-text transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-1/2 h-[250px] sm:h-[300px] md:h-auto md:min-h-[400px] bg-surface">
            <img
              src={swatch.image}
              alt={swatch.nameLabel}
              className="w-full h-full object-cover"
            />

            {/* Navigation arrows */}
            {hasPrev && (
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate("prev"); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-text-muted hover:text-text transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {hasNext && (
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate("next"); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-text-muted hover:text-text transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Info */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {swatch.collectionLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-surface text-text-muted text-xs font-bold">
                {swatch.colorGroup}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-text mb-1">
              {swatch.nameLabel}
            </h2>

            <p className="text-text-muted text-sm mb-6">
              Artikelcode: <span className="font-mono font-bold text-text">{swatch.code}</span>
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-text-muted">Collectie</span>
                <span className="font-semibold">{swatch.collectionLabel}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-text-muted">Kleurgroep</span>
                <span className="font-semibold">{swatch.colorGroup}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-text-muted">Artikelcode</span>
                <span className="font-mono font-semibold">{swatch.code}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-text-muted">Leverancier</span>
                <span className="font-semibold">{swatch.leverancier}</span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://www.castilo.nl/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Staal aanvragen
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe hint on mobile */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden text-white/60 text-xs font-medium flex items-center gap-2">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Navigeer met pijltjes
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
