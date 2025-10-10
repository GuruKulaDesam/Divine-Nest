import { w as writable } from "./index.js";
const browser = typeof window !== "undefined";
const BACKGROUNDS = {
  TRANSPARENT: "transparent",
  MOUNTAIN: "mountain",
  NATURE: "nature",
  MINIMAL: "minimal"
};
function getInitialBackground() {
  if (browser) {
    const stored = localStorage.getItem("background");
    if (stored && Object.values(BACKGROUNDS).includes(stored)) {
      return stored;
    }
  }
  return BACKGROUNDS.MOUNTAIN;
}
writable(getInitialBackground());
