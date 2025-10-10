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
export {
  theme as t
};
