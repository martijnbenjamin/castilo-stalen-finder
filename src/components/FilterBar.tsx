import type { Collection } from "../data/swatches";

const COLOR_GROUP_DOTS: Record<string, string> = {
  Rood: "#dc2626",
  Oranje: "#f97316",
  Geel: "#eab308",
  Groen: "#22c55e",
  Blauw: "#3b82f6",
  Paars: "#a855f7",
  Bruin: "#92400e",
  Neutraal: "#9ca3af",
};

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  selectedCollection: string | null;
  onCollectionChange: (v: string | null) => void;
  selectedColorGroup: string | null;
  onColorGroupChange: (v: string | null) => void;
  collections: Collection[];
  colorGroups: string[];
  resultCount: number;
  totalCount: number;
  hasFilters: boolean;
  onClearFilters: () => void;
  isEmbed?: boolean;
}

export function FilterBar({
  search,
  onSearchChange,
  selectedCollection,
  onCollectionChange,
  selectedColorGroup,
  onColorGroupChange,
  collections,
  colorGroups,
  resultCount,
  totalCount,
  hasFilters,
  onClearFilters,
  isEmbed = false,
}: Props) {
  return (
    <div className={`sticky ${isEmbed ? "top-0" : "top-16 sm:top-20"} z-20 bg-white/95 backdrop-blur-sm border-b border-border -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3`}>
      {/* Search */}
      <div className="relative mb-3">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Zoek op kleur, code of collectie..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter chips row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Collection filters */}
        <div className="flex flex-wrap gap-1.5">
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() =>
                onCollectionChange(
                  selectedCollection === col.id ? null : col.id
                )
              }
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCollection === col.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-text-muted hover:bg-surface-hover hover:text-text"
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-border hidden sm:block" />

        {/* Color group filters */}
        <div className="flex flex-wrap gap-1.5">
          {colorGroups.map((group) => (
            <button
              key={group}
              onClick={() =>
                onColorGroupChange(
                  selectedColorGroup === group ? null : group
                )
              }
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedColorGroup === group
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-text-muted hover:bg-surface-hover hover:text-text"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: COLOR_GROUP_DOTS[group] }}
              />
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* Result count + clear */}
      <div className="flex items-center justify-between mt-2 text-xs text-text-muted">
        <span>
          {resultCount} van {totalCount} stoffen
        </span>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="text-primary hover:text-primary-hover font-semibold transition-colors"
          >
            Filters wissen
          </button>
        )}
      </div>
    </div>
  );
}
