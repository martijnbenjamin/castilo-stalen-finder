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
  iframe.setAttribute("title", "Castilo Stoffencollectie");
  iframe.setAttribute("loading", "lazy");
  iframe.setAttribute("allow", "clipboard-write");

  container.appendChild(iframe);

  // Auto-resize iframe based on content height
  window.addEventListener("message", function (e) {
    if (e.data && e.data.type === "castilo-stalen-resize") {
      iframe.style.height = e.data.height + "px";
    }
  });
})();
