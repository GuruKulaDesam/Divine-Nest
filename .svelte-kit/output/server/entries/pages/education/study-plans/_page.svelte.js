import "clsx";
import { h as head } from "../../../../chunks/index2.js";
import { a as StudyPlanner } from "../../../../chunks/StudyPlanner.js";
function StudyPlansPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Study Plans - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Create and manage educational study plans and schedules"/>`);
  });
  StudyPlanner($$renderer, {});
}
function _page($$renderer) {
  StudyPlansPage($$renderer);
}
export {
  _page as default
};
