import { w as writable } from "./index.js";
const browser = typeof window !== "undefined";
const BACKGROUNDS = {
  TRANSPARENT: "transparent",
  MOUNTAIN: "mountain",
  NATURE: "nature",
  MINIMAL: "minimal",
  DARK: "dark",
  LIGHT: "light",
  GRADIENT: "gradient"
};
function getInitialBackground() {
  if (browser) {
    const stored = localStorage.getItem("background");
    if (stored && Object.values(BACKGROUNDS).includes(stored)) {
      return stored;
    }
  }
  return BACKGROUNDS.NATURE;
}
const background = writable(getInitialBackground());
const backgroundActions = {
  toggle: () => {
    background.update((current) => {
      const backgrounds = Object.values(BACKGROUNDS);
      const currentIndex = backgrounds.indexOf(current);
      const nextIndex = (currentIndex + 1) % backgrounds.length;
      const newBackground = backgrounds[nextIndex];
      if (browser) {
        localStorage.setItem("background", newBackground);
        updateBackground(newBackground);
      }
      return newBackground;
    });
  },
  set: (newBackground) => {
    if (Object.values(BACKGROUNDS).includes(newBackground)) {
      background.set(newBackground);
      if (browser) {
        localStorage.setItem("background", newBackground);
        updateBackground(newBackground);
      }
    }
  },
  init: () => {
    if (browser) {
      const current = getInitialBackground();
      background.set(current);
      updateBackground(current);
    }
  }
};
function updateBackground(bg) {
  if (!browser) return;
  const layout = document.querySelector(".nature-background") || document.querySelector(".mountain-background") || document.querySelector(".minimal-background");
  if (!layout) return;
  layout.classList.remove("bg-transparent", "mountain-background", "nature-background", "minimal-background", "dark-background", "light-background", "gradient-background");
  switch (bg) {
    case BACKGROUNDS.TRANSPARENT:
      layout.style.backgroundImage = "none";
      layout.style.background = "transparent";
      break;
    case BACKGROUNDS.MOUNTAIN:
      layout.classList.add("mountain-background");
      break;
    case BACKGROUNDS.NATURE:
      layout.classList.add("nature-background");
      break;
    case BACKGROUNDS.MINIMAL:
      layout.classList.add("minimal-background");
      break;
    case BACKGROUNDS.DARK:
      layout.classList.add("dark-background");
      break;
    case BACKGROUNDS.LIGHT:
      layout.classList.add("light-background");
      break;
    case BACKGROUNDS.GRADIENT:
      layout.classList.add("gradient-background");
      break;
  }
}
export {
  backgroundActions as a,
  background as b
};
