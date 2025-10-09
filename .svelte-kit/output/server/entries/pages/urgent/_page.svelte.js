import "clsx";
import { h as head } from "../../../chunks/index2.js";
import IssuesUrgentPage from "../../../chunks/IssuesUrgentPage.js";
function UrgentPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Urgent Issues - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Handle urgent maintenance and emergency issues"/>`);
  });
  IssuesUrgentPage($$renderer);
}
function _page($$renderer) {
  UrgentPage($$renderer);
}
export {
  _page as default
};
