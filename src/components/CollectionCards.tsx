import type { Collection } from "../data/swatches";

const COLLECTION_COLORS: Record<string, { bg: string; accent: string }> = {
  vyvafabrics_boltaflex_colourways: { bg: "bg-purple-light", accent: "text-purple" },
  vyvafabrics_silverguard: { bg: "bg-blue-light", accent: "text-blue" },
  vyvafabrics_harlow: { bg: "bg-green-light", accent: "text-green" },
  vyvafabrics_pukka: { bg: "bg-yellow-light", accent: "text-primary" },
  vyvafabrics_freckle: { bg: "bg-purple-light", accent: "text-purple" },
  amalfi: { bg: "bg-blue-light", accent: "text-blue" },
  tretford: { bg: "bg-green-light", accent: "text-green" },
};

interface Props {
  collections: Collection[];
  onSelect: (id: string) => void;
}

export function CollectionCards({ collections, onSelect }: Props) {
  return (
    <section className="py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">
        Ontdek onze stoffen
      </h2>
      <p className="text-text-muted mb-6 max-w-2xl">
        Bekijk onze complete collectie meubelbekledingen. Filter op collectie, kleur of zoek op naam of artikelcode.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((col) => {
          const colors = COLLECTION_COLORS[col.id] || { bg: "bg-surface", accent: "text-primary" };
          return (
            <button
              key={col.id}
              onClick={() => onSelect(col.id)}
              className={`${colors.bg} rounded-2xl p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group cursor-pointer`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`font-bold text-lg ${colors.accent}`}>
                    {col.label}
                  </h3>
                  <p className="text-sm text-text-muted mt-1 leading-relaxed">
                    {col.description}
                  </p>
                </div>
                <span className={`text-2xl font-extrabold ${colors.accent} opacity-40 group-hover:opacity-70 transition-opacity`}>
                  {col.count}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-text-muted group-hover:text-text transition-colors">
                Bekijk collectie
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
