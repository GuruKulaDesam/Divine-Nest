import "clsx";
import { h as head } from "../../../chunks/index2.js";
import YogaExercisePage from "../../../chunks/YogaExercisePage.js";
function YogaPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Yoga &amp; Exercise - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Practice traditional yoga and maintain physical wellness with guided exercises"/>`);
  });
  YogaExercisePage($$renderer);
}
function _page($$renderer) {
  YogaPage($$renderer);
}
export {
  _page as default
};
