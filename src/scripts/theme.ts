const THEME_KEY = "theme";
const LIGHT = "light";
const DARK = "dark";

function getPreferredTheme(): string {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK
    : LIGHT;
}

let themeValue = LIGHT;

function syncThemeValue(): void {
  themeValue =
    (window as unknown as { __theme?: { value: string } }).__theme?.value ??
    getPreferredTheme();
}

function persist(): void {
  localStorage.setItem(THEME_KEY, themeValue);
  reflect();
}

function reflect(): void {
  document.firstElementChild?.setAttribute("data-theme", themeValue);
  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);

  const bg = window.getComputedStyle(document.body).backgroundColor;
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", bg);
}

export function bindThemeButton(): void {
  const btn = document.querySelector("#theme-btn");
  if (!btn || btn.getAttribute("data-theme-bound") === "true") return;

  btn.setAttribute("data-theme-bound", "true");
  btn.addEventListener("click", () => {
    themeValue = themeValue === LIGHT ? DARK : LIGHT;
    persist();
  });
}

function setup(): void {
  syncThemeValue();
  reflect();
  bindThemeButton();
}

if (typeof window !== "undefined") {
  setup();

  document.addEventListener("astro:after-swap", setup);

  document.addEventListener("astro:before-swap", event => {
    const color = document
      .querySelector("meta[name='theme-color']")
      ?.getAttribute("content");
    if (color) {
      (event as { newDocument: Document }).newDocument
        .querySelector("meta[name='theme-color']")
        ?.setAttribute("content", color);
    }
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches }) => {
      themeValue = matches ? DARK : LIGHT;
      persist();
    });
}
