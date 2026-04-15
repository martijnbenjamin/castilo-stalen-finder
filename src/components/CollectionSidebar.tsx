import type { Collection } from "../data/swatches";

interface Props {
  collections: Collection[];
  selected: string | null;
  onSelect: (id: string | null) => void;
  totalCount: number;
}

export function CollectionSidebar({ collections, selected, onSelect, totalCount }: Props) {
  return (
    <>
      {/* Mobile: horizontale scroll-rij */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide">
        <button
          onClick={() => onSelect(null)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            !selected
              ? "bg-primary text-white shadow-sm"
              : "bg-surface text-text-muted hover:bg-surface-hover hover:text-text"
          }`}
        >
          Alle ({totalCount})
        </button>
        {collections.map((col) => (
          <button
            key={col.id}
            onClick={() => onSelect(selected === col.id ? null : col.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selected === col.id
                ? "bg-primary text-white shadow-sm"
                : "bg-surface text-text-muted hover:bg-surface-hover hover:text-text"
            }`}
          >
            {col.label}
          </button>
        ))}
      </div>

      {/* Desktop: verticale sidebar */}
      <aside className="hidden md:block w-44 lg:w-52 shrink-0 self-start sticky top-24">
        <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2 px-3">
          Collecties
        </p>
        <ul className="space-y-0.5">
          <li>
            <button
              onClick={() => onSelect(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${
                !selected
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-text-muted font-medium hover:bg-surface hover:text-text"
              }`}
            >
              <span>Alle collecties</span>
              <span className={`text-xs shrink-0 ${!selected ? "text-primary/70" : "opacity-40 group-hover:opacity-60"}`}>
                {totalCount}
              </span>
            </button>
          </li>
          {collections.map((col) => (
            <li key={col.id}>
              <button
                onClick={() => onSelect(selected === col.id ? null : col.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${
                  selected === col.id
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-text-muted font-medium hover:bg-surface hover:text-text"
                }`}
              >
                <span className="truncate mr-2">{col.label}</span>
                <span className={`text-xs shrink-0 ${selected === col.id ? "text-primary/70" : "opacity-40 group-hover:opacity-60"}`}>
                  {col.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
