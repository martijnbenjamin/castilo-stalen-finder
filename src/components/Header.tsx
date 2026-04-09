export function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3">
            <img
              src="/castilo-logo.png"
              alt="Castilo Meubelmakers"
              className="h-10 sm:h-12 w-auto"
            />
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-text">Stalencollectie</p>
          </div>
        </div>
      </div>
    </header>
  );
}
