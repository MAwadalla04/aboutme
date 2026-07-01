const STORAGE_KEY = "knicks-mode";
const VT_DATA_ATTR = "data-knicks-vt";
const VT_DURATION_PROP = "--knicks-vt-duration";

export function isKnicksActive() {
  return document.body.classList.contains("knicks-mode");
}

export function restoreKnicksTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "true") {
      document.body.classList.add("knicks-mode");
      return true;
    }
  } catch (_) {
    // localStorage unavailable — ignore.
  }
  return false;
}

function persist(active) {
  try {
    localStorage.setItem(STORAGE_KEY, active ? "true" : "false");
  } catch (_) {
    // localStorage unavailable — ignore.
  }
}

function dispatchToggle(active) {
  document.dispatchEvent(
    new CustomEvent("knicks:toggle", { detail: { active } })
  );
}

function applyTheme(nextActive) {
  document.body.classList.toggle("knicks-mode", nextActive);
  persist(nextActive);
  dispatchToggle(nextActive);
}

export function toggleKnicksTheme(originElement) {
  const nextActive = !isKnicksActive();

  const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

  let x = viewportWidth / 2;
  let y = viewportHeight / 2;
  if (originElement) {
    const rect = originElement.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  }

  const maxRadius = Math.hypot(
    Math.max(x, viewportWidth - x),
    Math.max(y, viewportHeight - y)
  );

  // Fallback: View Transitions API unavailable → instant toggle.
  if (typeof document.startViewTransition !== "function") {
    applyTheme(nextActive);
    return;
  }

  const clipFrom = `circle(0px at ${x}px ${y}px)`;
  const clipTo = `circle(${maxRadius}px at ${x}px ${y}px)`;

  const root = document.documentElement;
  root.setAttribute(VT_DATA_ATTR, "active");
  root.style.setProperty(VT_DURATION_PROP, "550ms");

  const cleanup = () => {
    root.removeAttribute(VT_DATA_ATTR);
    root.style.removeProperty(VT_DURATION_PROP);
  };

  const transition = document.startViewTransition(() => applyTheme(nextActive));

  if (transition?.finished?.finally) {
    transition.finished.finally(cleanup);
  } else {
    cleanup();
  }

  if (transition?.ready?.then) {
    transition.ready.then(() => {
      root.animate(
        { clipPath: [clipFrom, clipTo] },
        {
          duration: 550,
          easing: "ease-in-out",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }
}
