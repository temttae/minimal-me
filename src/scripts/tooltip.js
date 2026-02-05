const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const getMainBounds = (el) => {
  const main = el.closest(".page__main") || document.querySelector(".page__main");
  if (!main) {
    return { left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight };
  }
  return main.getBoundingClientRect();
};

const measureAndClamp = (root) => {
  const panel = root.querySelector(".tt__panel");
  const pad = Number(root.dataset.pad || 8);
  const bounds = getMainBounds(root);

  panel.style.setProperty("--dx", "0px");
  panel.style.setProperty("--dy", "0px");

  requestAnimationFrame(() => {
    const r = panel.getBoundingClientRect();

    const dx =
      r.left < bounds.left + pad ? (bounds.left + pad) - r.left :
      r.right > bounds.right - pad ? (bounds.right - pad) - r.right :
      0;

    const dy =
      r.top < bounds.top + pad ? (bounds.top + pad) - r.top :
      r.bottom > bounds.bottom - pad ? (bounds.bottom - pad) - r.bottom :
      0;

    panel.style.setProperty("--dx", `${dx}px`);
    panel.style.setProperty("--dy", `${dy}px`);
  });
};

const show = (root) => {
  const panel = root.querySelector(".tt__panel");
  panel.setAttribute("aria-hidden", "false");
  measureAndClamp(root);
};

const hide = (root) => {
  const panel = root.querySelector(".tt__panel");
  panel.setAttribute("aria-hidden", "true");
  panel.style.setProperty("--dx", "0px");
  panel.style.setProperty("--dy", "0px");
};

const roots = new Set();
let globalsBound = false;

const bind = (root) => {
  if (roots.has(root)) return;
  roots.add(root);

  root.addEventListener("mouseenter", () => show(root));
  root.addEventListener("mouseleave", () => hide(root));
  root.addEventListener("focusin", () => show(root));
  root.addEventListener("focusout", () => hide(root));

  if (!globalsBound) {
    globalsBound = true;

    const onChange = () => {
      for (const r of roots) {
        const panel = r.querySelector(".tt__panel");
        if (panel.getAttribute("aria-hidden") === "false") {
          measureAndClamp(r);
        }
      }
    };

    window.addEventListener("resize", onChange, { passive: true });
    window.addEventListener("scroll", onChange, { passive: true });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-tt]").forEach(bind);
});
