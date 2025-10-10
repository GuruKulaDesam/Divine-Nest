import { w as writable } from "./index.js";
const browser = typeof window !== "undefined";
const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  MINIMAL: "minimal",
  NATURE: "nature"
};
function getInitialTheme() {
  if (browser) {
    const stored = localStorage.getItem("theme");
    if (stored && Object.values(THEMES).includes(stored)) {
      return stored;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return THEMES.DARK;
    }
  }
  return THEMES.LIGHT;
}
const theme = writable(getInitialTheme());
const themeActions = {
  toggle: () => {
    theme.update((current) => {
      const themes = Object.values(THEMES);
      const currentIndex = themes.indexOf(current);
      const nextIndex = (currentIndex + 1) % themes.length;
      const newTheme = themes[nextIndex];
      if (browser) {
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
      }
      return newTheme;
    });
  },
  set: (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      theme.set(newTheme);
      if (browser) {
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
      }
    }
  },
  init: () => {
    if (browser) {
      const current = getInitialTheme();
      document.documentElement.setAttribute("data-theme", current);
      theme.set(current);
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
            const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
            themeActions.set(newTheme);
          }
        });
      }
    }
  }
};
export {
  themeActions as a,
  theme as t
};
