import { useState } from "react";
import type { Swatch } from "../data/swatches";

interface Props {
  swatches: Swatch[];
  onSelect: (swatch: Swatch) => void;
}

export function SwatchGrid({ swatches, onSelect }: Props) {
  if (swatches.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="text-6xl mb-4 opacity-30">
          <svg className="w-16 h-16 mx-auto text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-text-muted font-semibold">Geen stalen gevonden</p>
        <p className="text-text-muted text-sm mt-1">Probeer andere zoektermen of filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 pt-4">
      {swatches.map((swatch) => (
        <SwatchCard key={swatch.id} swatch={swatch} onSelect={onSelect} />
      ))}
    </div>
  );
}

function SwatchCard({ swatch, onSelect }: { swatch: Swatch; onSelect: (s: Swatch) => void }) {
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(swatch.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="group text-left">
      <div
        onClick={() => onSelect(swatch)}
        className="relative aspect-square rounded-2xl overflow-hidden bg-surface mb-2 ring-1 ring-border/50 group-hover:ring-primary/30 group-hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
      >
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-surface" />
        )}
        <img
          src={swatch.image}
          alt={swatch.nameLabel}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Hover overlay met code kopieer-knop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2.5">
          <button
            onClick={handleCopyCode}
            className={`flex items-center gap-1.5 self-start px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer ${
              copied
                ? "bg-green/90 text-white"
                : "bg-white/95 text-text hover:bg-white"
            }`}
          >
            {copied ? (
              <>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Gekopieerd!
              </>
            ) : (
              <>
                <svg className="w-3 h-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="font-mono">{swatch.code}</span>
                <span className="text-text-muted font-medium">kopieer</span>
              </>
            )}
          </button>
        </div>
      </div>
      <p className="text-xs sm:text-sm font-semibold text-text truncate leading-tight">
        {swatch.nameLabel}
      </p>
      <p className="text-[10px] sm:text-xs text-text-muted truncate">
        {swatch.collectionLabel}
      </p>
    </div>
  );
}
