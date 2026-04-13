/**
 * Castilo Stalen Finder — Embed Script
 *
 * Gebruik:
 *   <div id="castilo-stalen"></div>
 *   <script src="https://stalen.castilo.nl/embed.js"></script>
 *
 * Of met een custom container:
 *   <div id="mijn-container"></div>
 *   <script src="https://stalen.castilo.nl/embed.js" data-container="mijn-container"></script>
 */
(function () {
  var script = document.currentScript;
  var containerId = (script && script.getAttribute("data-container")) || "castilo-stalen";
  var baseUrl = script ? script.src.replace(/\/embed\.js(\?.*)?$/, "") : "https://stalen.castilo.nl";

  var container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    script.parentNode.insertBefore(container, script);
  }

  var iframe = document.createElement("iframe");
  iframe.src = baseUrl + "/?embed";
  iframe.style.cssText = "width:100%;border:none;min-height:600px;display:block;";
  iframe.setAttribute("title", "Castilo Stalencollectie");
  iframe.setAttribute("loading", "lazy");
  iframe.setAttribute("allow", "clipboard-write");

  container.appendChild(iframe);

  // ---- Detail modal overlay (rendered in parent DOM) ----
  var overlay = null;

  function createOverlay(data) {
    removeOverlay();

    var s = data.swatch;
    overlay = document.createElement("div");
    overlay.id = "castilo-stalen-overlay";
    overlay.style.cssText = "position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;font-family:'Nunito',system-ui,sans-serif;";

    overlay.innerHTML =
      '<div id="cso-backdrop" style="position:absolute;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);"></div>' +
      '<div style="position:relative;background:#fff;border-radius:1.5rem;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);max-width:48rem;width:calc(100% - 2rem);max-height:calc(100vh - 2rem);overflow-y:auto;display:flex;flex-direction:column;">' +
        // Close button
        '<button id="cso-close" style="position:absolute;top:1rem;right:1rem;z-index:10;width:2.5rem;height:2.5rem;border-radius:9999px;background:rgba(255,255,255,0.9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">' +
          '<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#718096" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>' +
        '</button>' +
        '<div style="display:flex;flex-direction:row;" id="cso-content">' +
          // Image
          '<div style="position:relative;width:50%;min-height:400px;background:#f8f9fa;flex-shrink:0;" id="cso-image-wrap">' +
            '<img src="' + escapeHtml(s.image) + '" alt="' + escapeHtml(s.nameLabel) + '" style="width:100%;height:100%;object-fit:cover;display:block;">' +
            (data.hasPrev ? '<button id="cso-prev" style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);width:2.5rem;height:2.5rem;border-radius:9999px;background:rgba(255,255,255,0.9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);"><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#718096" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg></button>' : '') +
            (data.hasNext ? '<button id="cso-next" style="position:absolute;right:0.75rem;top:50%;transform:translateY(-50%);width:2.5rem;height:2.5rem;border-radius:9999px;background:rgba(255,255,255,0.9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);"><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#718096" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></button>' : '') +
          '</div>' +
          // Info
          '<div style="width:50%;padding:2rem;display:flex;flex-direction:column;justify-content:center;">' +
            '<div style="display:flex;gap:0.5rem;margin-bottom:1rem;">' +
              '<span style="padding:0.25rem 0.75rem;border-radius:9999px;background:rgba(145,60,143,0.1);color:#913C8F;font-size:0.75rem;font-weight:700;">' + escapeHtml(s.collectionLabel) + '</span>' +
              '<span style="padding:0.25rem 0.75rem;border-radius:9999px;background:#f8f9fa;color:#718096;font-size:0.75rem;font-weight:700;">' + escapeHtml(s.colorGroup) + '</span>' +
            '</div>' +
            '<h2 style="font-size:2rem;font-weight:800;color:#2d3748;margin:0 0 0.25rem;">' + escapeHtml(s.nameLabel) + '</h2>' +
            '<p style="color:#718096;font-size:0.875rem;margin:0 0 1.5rem;">Artikelcode: <span style="font-family:monospace;font-weight:700;color:#2d3748;">' + escapeHtml(s.code) + '</span></p>' +
            '<div style="font-size:0.875rem;">' +
              infoRow("Collectie", s.collectionLabel) +
              infoRow("Kleurgroep", s.colorGroup) +
              infoRow("Artikelcode", s.code, true) +
              infoRow("Leverancier", s.leverancier || "") +
            '</div>' +
            '<div style="margin-top:2rem;">' +
              '<a href="https://www.castilo.nl/contact/" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.75rem 1.5rem;background:#913C8F;color:#fff;font-weight:700;border-radius:0.75rem;text-decoration:none;font-size:0.875rem;">' +
                '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>' +
                'Staal aanvragen' +
              '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    // Event listeners
    document.getElementById("cso-backdrop").addEventListener("click", closeDetail);
    document.getElementById("cso-close").addEventListener("click", closeDetail);
    var prevBtn = document.getElementById("cso-prev");
    var nextBtn = document.getElementById("cso-next");
    if (prevBtn) prevBtn.addEventListener("click", function () { navigate("prev"); });
    if (nextBtn) nextBtn.addEventListener("click", function () { navigate("next"); });

    // Keyboard navigation
    document.addEventListener("keydown", handleKeydown);
  }

  function handleKeydown(e) {
    if (e.key === "Escape") closeDetail();
    if (e.key === "ArrowLeft") navigate("prev");
    if (e.key === "ArrowRight") navigate("next");
  }

  function removeOverlay() {
    if (overlay) {
      overlay.remove();
      overlay = null;
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);
    }
  }

  function closeDetail() {
    removeOverlay();
    iframe.contentWindow.postMessage({ type: "castilo-stalen-close" }, "*");
  }

  function navigate(direction) {
    iframe.contentWindow.postMessage({ type: "castilo-stalen-navigate", direction: direction }, "*");
  }

  function infoRow(label, value, mono) {
    return '<div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid #e5e7eb;">' +
      '<span style="color:#718096;">' + escapeHtml(label) + '</span>' +
      '<span style="font-weight:600;' + (mono ? 'font-family:monospace;' : '') + '">' + escapeHtml(value) + '</span>' +
    '</div>';
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }

  // Handle responsive: stack on mobile
  function applyResponsive() {
    if (!overlay) return;
    var content = document.getElementById("cso-content");
    var imageWrap = document.getElementById("cso-image-wrap");
    if (!content || !imageWrap) return;
    if (window.innerWidth < 768) {
      content.style.flexDirection = "column";
      imageWrap.style.width = "100%";
      imageWrap.style.height = Math.min(220, Math.round(window.innerHeight * 0.27)) + "px";
      imageWrap.style.minHeight = "";
      imageWrap.style.maxHeight = "";
      imageWrap.style.flexShrink = "0";
      var infoDiv = content.children[1];
      if (infoDiv) infoDiv.style.width = "100%";
    } else {
      content.style.flexDirection = "row";
      imageWrap.style.width = "50%";
      imageWrap.style.height = "";
      imageWrap.style.minHeight = "400px";
      imageWrap.style.maxHeight = "";
      var infoDiv = content.children[1];
      if (infoDiv) infoDiv.style.width = "50%";
    }
  }

  // ---- Message listener ----
  window.addEventListener("message", function (e) {
    if (!e.data) return;

    // Auto-resize iframe
    if (e.data.type === "castilo-stalen-resize") {
      iframe.style.height = e.data.height + "px";
    }

    // Open detail overlay in parent
    if (e.data.type === "castilo-stalen-detail") {
      createOverlay(e.data);
      applyResponsive();
    }

    // Close detail overlay
    if (e.data.type === "castilo-stalen-detail-close") {
      removeOverlay();
    }
  });

  window.addEventListener("resize", applyResponsive);
})();
