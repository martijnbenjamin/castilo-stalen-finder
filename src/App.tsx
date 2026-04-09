import { useState, useMemo, useCallback, useEffect } from "react";
import { swatches, collections, colorGroups } from "./data/swatches";
import type { Swatch } from "./data/swatches";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { SwatchGrid } from "./components/SwatchGrid";
import { SwatchDetail } from "./components/SwatchDetail";
import { CollectionCards } from "./components/CollectionCards";

const isEmbed = new URLSearchParams(window.location.search).has("embed");

function App() {
  const [search, setSearch] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedColorGroup, setSelectedColorGroup] = useState<string | null>(null);
  const [selectedSwatch, setSelectedSwatch] = useState<Swatch | null>(null);

  const filtered = useMemo(() => {
    let result = swatches;
    if (selectedCollection) {
      result = result.filter((s) => s.collection === selectedCollection);
    }
    if (selectedColorGroup) {
      result = result.filter((s) => s.colorGroup === selectedColorGroup);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.nameLabel.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.collectionLabel.toLowerCase().includes(q) ||
          s.colorGroup.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, selectedCollection, selectedColorGroup]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setSelectedCollection(null);
    setSelectedColorGroup(null);
  }, []);

  const hasFilters = !!search || !!selectedCollection || !!selectedColorGroup;

  // In embed mode: send swatch detail to parent window for overlay rendering
  const sendDetailToParent = useCallback((swatch: Swatch | null) => {
    if (!isEmbed || !window.parent) return;
    if (!swatch) {
      window.parent.postMessage({ type: "castilo-stalen-detail-close" }, "*");
      return;
    }
    const idx = filtered.findIndex((s) => s.id === swatch.id);
    window.parent.postMessage({
      type: "castilo-stalen-detail",
      swatch: {
        nameLabel: swatch.nameLabel,
        code: swatch.code,
        collectionLabel: swatch.collectionLabel,
        leverancier: swatch.leverancier,
        colorGroup: swatch.colorGroup,
        image: new URL(swatch.image, window.location.origin).href,
      },
      hasPrev: idx > 0,
      hasNext: idx < filtered.length - 1,
    }, "*");
  }, [filtered]);

  const handleSelect = useCallback((swatch: Swatch) => {
    setSelectedSwatch(swatch);
    if (isEmbed) sendDetailToParent(swatch);
  }, [sendDetailToParent]);

  const handleClose = useCallback(() => {
    setSelectedSwatch(null);
    if (isEmbed) sendDetailToParent(null);
  }, [sendDetailToParent]);

  const handleNavigate = useCallback((direction: "prev" | "next") => {
    setSelectedSwatch((current) => {
      if (!current) return null;
      const idx = filtered.findIndex((s) => s.id === current.id);
      const next = direction === "next" ? idx + 1 : idx - 1;
      if (next >= 0 && next < filtered.length) {
        const newSwatch = filtered[next];
        if (isEmbed) {
          // Send after state update
          setTimeout(() => sendDetailToParent(newSwatch), 0);
        }
        return newSwatch;
      }
      return current;
    });
  }, [filtered, sendDetailToParent]);

  // Listen for navigation messages from parent (embed mode)
  useEffect(() => {
    if (!isEmbed) return;
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "castilo-stalen-navigate") {
        handleNavigate(e.data.direction);
      }
      if (e.data?.type === "castilo-stalen-close") {
        handleClose();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [isEmbed, handleNavigate, handleClose]);

  return (
    <div className={`bg-white ${isEmbed ? "min-h-0" : "min-h-screen"}`}>
      {!isEmbed && <Header />}

      <main className={`mx-auto px-4 sm:px-6 lg:px-8 pb-12 ${isEmbed ? "pt-2 max-w-none" : "max-w-7xl"}`}>
        {/* Collection overview when no filters active */}
        {!hasFilters && (
          <CollectionCards
            collections={collections}
            onSelect={setSelectedCollection}
          />
        )}

        <FilterBar
          search={search}
          onSearchChange={setSearch}
          selectedCollection={selectedCollection}
          onCollectionChange={setSelectedCollection}
          selectedColorGroup={selectedColorGroup}
          onColorGroupChange={setSelectedColorGroup}
          collections={collections}
          colorGroups={colorGroups}
          resultCount={filtered.length}
          totalCount={swatches.length}
          hasFilters={hasFilters}
          onClearFilters={clearFilters}
          isEmbed={isEmbed}
        />

        <SwatchGrid swatches={filtered} onSelect={handleSelect} />
      </main>

      {/* Only show modal inside app when NOT in embed mode */}
      {!isEmbed && selectedSwatch && (
        <SwatchDetail
          swatch={selectedSwatch}
          onClose={handleClose}
          onNavigate={handleNavigate}
          hasPrev={filtered.findIndex((s) => s.id === selectedSwatch.id) > 0}
          hasNext={
            filtered.findIndex((s) => s.id === selectedSwatch.id) <
            filtered.length - 1
          }
        />
      )}
    </div>
  );
}

export default App;
