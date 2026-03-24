import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Auto-resize: stuur hoogte naar parent window als we in een iframe draaien
if (window.parent !== window) {
  const sendHeight = () => {
    const height = document.documentElement.scrollHeight;
    window.parent.postMessage({ type: 'castilo-stalen-resize', height }, '*');
  };

  // Stuur hoogte bij elke DOM-wijziging
  const observer = new ResizeObserver(sendHeight);
  observer.observe(document.documentElement);
  sendHeight();
}
